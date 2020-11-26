package com.huaiye.plugin.plat.custom.job;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.huaiye.plugin.plat.platschedulejob.holder.PlatScheduleJobHolder;
import com.huaiye.plugin.plat.platschedulejob.service.PlatScheduleJobService;
import com.lvxh.plugin.platform.holder.Sort;

/**
 * ECS通用定时任务调度
 * 
 * @author huangwenhai
 *
 */
@Component
public class ScheduledTaskManager implements ApplicationContextAware {

    private static final int DEFAULT_DEALY = 1 * 60;// Unit: seconds

    protected static final Pattern REG_EXP_COLON = Pattern.compile(":");


    static Logger LOG = Logger.getLogger(ScheduledTaskManager.class);

    @Autowired
    PlatScheduleJobService confScheduleJobService;

    ScheduledThreadPoolExecutor scheduledExecutor;
    TaskScheduler taskScheduler;

    private ApplicationContext appContext;

    //@PostConstruct
    public void init() {
        LOG.info("init...");
        PlatScheduleJobHolder holder = new PlatScheduleJobHolder();
        holder.setEnable(1); // 启用状态的任务
        Sort sort = new Sort();
        sort.setField("GROUP_NAME ASC");
        holder.setSort(sort);

        List<PlatScheduleJobHolder> taskJobsList = confScheduleJobService
                .getList(holder);
        if (0 == taskJobsList.size()) {
            LOG.info("No scheduled task jobs configured!");
            return;
        }

        int numOfTaskJobs = taskJobsList.size();
        taskScheduler = createTaskScheduler(numOfTaskJobs);
        scheduleTaskJobs(taskJobsList);
    }

    //@PreDestroy
    public void destroy() {
        LOG.info("shutting down scheduledExecutor...");
        scheduledExecutor.shutdownNow();
    }

    protected TaskScheduler createTaskScheduler(int numOfTaskJobs) {
        TaskScheduler taskScheduler;
        // 平均每2个定时任务共用1个线程，额外补偿1个共用线程
        int corePoolSize = numOfTaskJobs / 2 + 1;

        int nCPU = Runtime.getRuntime().availableProcessors();
        if (corePoolSize > nCPU) {
            corePoolSize = nCPU;
        }
        LOG.info(String.format("corePoolSize:%s", corePoolSize));

        // TODO: check RejectedExecutionHandler
        this.scheduledExecutor = new ScheduledThreadPoolExecutor(
                corePoolSize, new ThreadFactory() {
                    final AtomicInteger SEQ = new AtomicInteger(0);
                    @Override
                    public Thread newThread(Runnable r) {
                        Thread t = new Thread(r);
                        t.setName("ecs.job-" + SEQ.getAndIncrement());
                        return t;
                    }

                }, new ThreadPoolExecutor.DiscardOldestPolicy());
        taskScheduler = new ConcurrentTaskScheduler(scheduledExecutor);
        return taskScheduler;
    }

    private void scheduleTaskJobs(
            List<PlatScheduleJobHolder> taskJobsList) {
        for (PlatScheduleJobHolder taskJob : taskJobsList) {
            doScheduleTaskJob(taskJob);
        }
    }

    private void doScheduleTaskJob(final PlatScheduleJobHolder taskJob) {
        LOG.info(String.format("Processing task job:%s%n", taskJob));
        Date now = new Date();
        Integer delaySeconds = taskJob.getDelaySecond();
        if (null == delaySeconds) {
            delaySeconds = new Integer(0);
        }
        int intDelaySeconds = delaySeconds.intValue();
        // 默认延迟执行
        if (0 == intDelaySeconds) {
            intDelaySeconds = DEFAULT_DEALY;
        }

        Runnable task = new Runnable() {

            @Override
            public void run() {
                // 定时任务不能抛出任何异常
                try {
                    invokeTaskJob(taskJob);
                } catch (Exception e) {
                    LOG.error("", e);
                }
            }
        };

        // 立即执行
        if (-1 == intDelaySeconds) {
            // 先立即执行一次 ， 再提交定时执行
            LOG.info(
                    String.format("Immediately execute task job for once:%s.%s",
                            taskJob.getGroupName(), taskJob.getJobName()));
            scheduledExecutor.schedule(task, 0, TimeUnit.SECONDS);

            delaySchedule(now, DEFAULT_DEALY, taskJob, task);
        } else {
            delaySchedule(now, intDelaySeconds, taskJob, task);
        }

    }

    private void delaySchedule(Date now, int intDelaySeconds,
            final PlatScheduleJobHolder taskJob, final Runnable task) {

        Runnable delayedTask = new Runnable() {
            @Override
            public void run() {
                String cronExp = taskJob.getCronExp();
                Trigger trigger = new CronTrigger(cronExp);
                LOG.info(String.format("Schedule task job:%s.%s,%s",
                        taskJob.getGroupName(), taskJob.getJobName(), cronExp));
                taskScheduler.schedule(task, trigger);
            }

        };
        Date startTime = new Date();
        startTime.setTime(now.getTime() + intDelaySeconds * 1000);
        taskScheduler.schedule(delayedTask, startTime);
    }

    @SuppressWarnings("unchecked")
    private void invokeTaskJob(final PlatScheduleJobHolder taskJob)
            throws Exception {
        LOG.info(String.format("Invoking task job: %s.%s",
                taskJob.getGroupName(), taskJob.getJobName()));
        String taskObjExpr = taskJob.getClassName();
        if (StringUtils.isBlank(taskObjExpr)) {
            LOG.error("Task object expression name is blank!");
            return;
        }

        String[] parts = REG_EXP_COLON.split(taskObjExpr);

        String prefix;
        String objName;
        if (2 == parts.length) {
            prefix = parts[0];
            objName = parts[1];
        } else {
            prefix = "class";
            objName = taskObjExpr;
        }
        Object targetObj = null;
        Class<?> clazz = null;

        prefix = StringUtils.trim(prefix);
        objName = StringUtils.trim(objName);

        // 可能值: class/beanName
        switch (prefix) {
        case "beanName":
            // targetObj = SpringUtils.getBean(objName);
            targetObj = this.appContext.getBean(objName);
            // if (null == targetObj) {
            // LOG.error(String.format("Cannot find bean with name:%s",
            // objName));
            // return;
            // }
            clazz = targetObj.getClass();
            break;
        default:
            clazz = Class.forName(objName);
            break;
        }

        String cmdName = taskJob.getMethodName();
        HashMap<String, ?> paramsMap = new HashMap<String, Object>();
        if (StringUtils.isNotBlank(taskJob.getParams())) {
        	Gson gson = new Gson();
            paramsMap = gson.fromJson(taskJob.getParams(),HashMap.class);
        }
        Method targetMethod;

        targetMethod = clazz.getMethod(cmdName,
                HashMap.class);
        if (!targetMethod.isAccessible()) {
            targetMethod.setAccessible(true);
        }
        if (Modifier.isStatic(targetMethod.getModifiers())) {
            targetMethod.invoke(null, paramsMap);
        } else {
            if (null == targetObj) {
                targetObj = clazz.newInstance();
            }
            targetMethod.invoke(targetObj, paramsMap);
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
    	LOG.info(applicationContext.toString());
    	//System.out.println(applicationContext.toString());
        this.appContext = applicationContext;

    }

}
