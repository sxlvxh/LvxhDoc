package com.huaiye.plugin.plat.custom.filter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huaiye.plugin.plat.platoptlog.holder.PlatOptLogHolder;
import com.huaiye.plugin.plat.platoptlog.service.PlatOptLogService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.platform.service.Constants;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * .列表查询拦截
 * 
 * @version 1.0.0
 */
@Aspect
@Component
public class LogAspect implements Runnable {

	private static final BlockingQueue<PlatOptLogHolder> logQueue = new ArrayBlockingQueue<>(1000);

	private static final Logger LOG = Logger.getLogger(LogAspect.class);
	
	@Autowired
	private PlatOptLogService platOptLogService;

	@PostConstruct
	public void init() {
		PUtils.submit(this);
	}

	@Override
	public void run() {
		int batchMaxSize = 16;
		final List<PlatOptLogHolder> batch = new ArrayList<>(batchMaxSize);
		int batchSize;
		int count = 0;
		for (;;) {

			batchSize = logQueue.drainTo(batch, batchMaxSize);
			if (batchSize > 0) {
				try {
					platOptLogService.insertBatch(batch);
				} finally {
					batch.clear();
				}
			} else {
				count++;
				if (count >= 1000) {
					count = 0;
					try {
						Thread.sleep(2000);
					} catch (InterruptedException e) {
						;
					}
				}
			}
		}
	}

	// add end
	/**
	 * .列表查询
	 */
	@Pointcut("execution(* com.lvxh.plugin.platform.controller.BaseController.delete*(..))")
	void delete() {
	}

	/**
	 * .列表数查询
	 */
	@Pointcut("execution(* com.lvxh.plugin.platform.controller.BaseController.insert*(..))")
	void insert() {
	}

	/**
	 * .列表数查询
	 */
	@Pointcut("execution(* com.lvxh.plugin.platform.controller.BaseController.update*(..))")
	void update() {
	}
	
	/**
	 * .pc登录
	 */
	@Pointcut("execution(* com.huaiye.plugin.plat.custom.controller.MainController.login*(..))")
	void login() {
	}
	
	/**
	 * .app登录
	 */
	@Pointcut("execution(* com.huaiye.plugin.plat.custom.controller.MainController.appLogin*(..))")
	void appLogin() {
	}
	
	/**
	 * .设置角色权限
	 */
	@Pointcut("execution(* com.huaiye.plugin.plat.platrole.controller.PlatRoleController.setting*(..))")
	void setRole() {
	}

	/**
	 * PC登录
	 */
	/*
	 * @Pointcut("execution(* com.huaiye.plugin.conf.syslogin.controller.LoginController.main*(..))"
	 * ) void main() { }
	 * 
	 *//**
		 * APP登录
		 *//*
			 * @Pointcut("execution(* com.huaiye.plugin.conf.syslogin.controller.LoginController.appLogin*(..))"
			 * ) void appLogin() { }
			 */

	/**
	 * .列表查询拦截
	 */
	@After(value = "update()")
	public void afterUpdate(JoinPoint joinPoint) {
		// System.out.println(joinPoint.getArgs());
		Object obj = joinPoint.getArgs()[0];
		String opt = "2";
		getSession(joinPoint, obj, opt);
	}

	/**
	 * .列表查询拦截 
	 */
	@After(value = "delete()")
	public void afterDelete(JoinPoint joinPoint) {
		Object obj = joinPoint.getArgs()[0];
		String opt = "3";
		getSession(joinPoint, obj, opt);
	}

	/**
	 * .列表查询拦截
	 */
	@After(value = "insert()")
	public void afterInsert(JoinPoint joinPoint) {
		Object obj = joinPoint.getArgs()[0];
		String opt = "1";
		getSession(joinPoint, obj, opt);
	}

	
	@After(value = "login()")
	public void afterLogin(JoinPoint joinPoint) {
		Object obj = joinPoint.getArgs()[0];
		String opt = "4";
		getSession(joinPoint, obj, opt);
	}
	
	@After(value = "appLogin()")
	public void afterAppLogin(JoinPoint joinPoint) {
		Object obj = joinPoint.getArgs()[0];
		String opt = "5";
		getSession(joinPoint, obj, opt);
	}
	 
	@After(value = "setRole()")
	public void afterSetRole(JoinPoint joinPoint) {
		Object obj = joinPoint.getArgs()[0];
		String opt = "6";
		getSession(joinPoint, obj, opt);
	}
	 
	
	
	/*
	 * @After(value = "appLogin()") public void afterAppLogin(JoinPoint joinPoint) {
	 * Object obj = joinPoint.getArgs()[0]; String opt = "5"; getSession(joinPoint,
	 * obj, opt); }
	 */

	private void insert(Object obj, String opt, HttpServletRequest req,String holderName) {
		PlatUserListHolder user = null;
		final PlatOptLogHolder bean = new PlatOptLogHolder();
		bean.setCreateTime(new Date());
		if (obj instanceof PlatOptLogHolder) {

		} else {
			bean.setLogReq(obj.toString());
			bean.setLogType(opt);
			bean.setLogHolder(holderName);
			if (req != null) {
				Object oo = req.getSession().getAttribute(Constants.LOGIN_USER);
				if (oo != null) {
					user = (PlatUserListHolder) oo;
					bean.setCreateUserId(user.getId());
				}
				bean.setRemoteAddr(req.getRemoteAddr());
			}
		}
		try {
			logQueue.put(bean);
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}
	}

	private void getSession(JoinPoint joinPoint, Object obj, String opt) {
		Object[] args = joinPoint.getArgs();
		HttpServletRequest request = null;
		for (int i = 0; i < args.length; i++) {
			if (args[i] instanceof HttpServletRequest) {
				request = (HttpServletRequest) args[i];
			}
		}
		String name = joinPoint.getTarget().getClass().getSimpleName();
		name = name.replace("Controller", "Holder");
		insert(obj, opt, request,name);
	}

	public static void put(PlatOptLogHolder e) {
		try {
			logQueue.put(e);
		} catch (InterruptedException e1) {
			LOG.error(e1.getMessage(),e1);
		}
	}

}
