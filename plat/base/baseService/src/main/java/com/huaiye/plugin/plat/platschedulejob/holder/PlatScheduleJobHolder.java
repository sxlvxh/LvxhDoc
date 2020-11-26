/*
 * .PlatScheduleJobHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platschedulejob.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 任务调度表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatScheduleJobHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 任务组
	 */
    private String groupName;
    /**
	 * . 获取任务组
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupName(){  
        return groupName;  
    }

    /**
	 * . 设置任务组
	 *
	 * @column groupName
	 *        任务组
	 */
    public void setGroupName(String groupName){  
        this.groupName = groupName;  
    }
    
	

	/**
	 * . 任务名称
	 */
    private String jobName;
    /**
	 * . 获取任务名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobName(){  
        return jobName;  
    }

    /**
	 * . 设置任务名称
	 *
	 * @column jobName
	 *        任务名称
	 */
    public void setJobName(String jobName){  
        this.jobName = jobName;  
    }
    
	

	/**
	 * . 任务类全路径
	 */
    private String className;
    /**
	 * . 获取任务类全路径
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getClassName(){  
        return className;  
    }

    /**
	 * . 设置任务类全路径
	 *
	 * @column className
	 *        任务类全路径
	 */
    public void setClassName(String className){  
        this.className = className;  
    }
    
	

	/**
	 * . 任务方法名称
	 */
    private String methodName;
    /**
	 * . 获取任务方法名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMethodName(){  
        return methodName;  
    }

    /**
	 * . 设置任务方法名称
	 *
	 * @column methodName
	 *        任务方法名称
	 */
    public void setMethodName(String methodName){  
        this.methodName = methodName;  
    }
    
	

	/**
	 * . 任务执行计划
	 */
    private String cronExp;
    /**
	 * . 获取任务执行计划
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getCronExp(){  
        return cronExp;  
    }

    /**
	 * . 设置任务执行计划
	 *
	 * @column cronExp
	 *        任务执行计划
	 */
    public void setCronExp(String cronExp){  
        this.cronExp = cronExp;  
    }
    
	

	/**
	 * . 任务延迟实行时间（单位：秒）
	 */
    private Integer delaySecond;
    /**
	 * . 获取任务延迟实行时间（单位：秒）
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getDelaySecond(){  
        return delaySecond;  
    }

    /**
	 * . 设置任务延迟实行时间（单位：秒）
	 *
	 * @column delaySecond
	 *        任务延迟实行时间（单位：秒）
	 */
    public void setDelaySecond(Integer delaySecond){  
        this.delaySecond = delaySecond;  
    }
    
	

	/**
	 * . 任务是否启用  0：不启用  1：启用
	 */
    private Integer enable;
    /**
	 * . 获取任务是否启用  0：不启用  1：启用
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getEnable(){  
        return enable;  
    }

    /**
	 * . 设置任务是否启用  0：不启用  1：启用
	 *
	 * @column enable
	 *        任务是否启用  0：不启用  1：启用
	 */
    public void setEnable(Integer enable){  
        this.enable = enable;  
    }
    
	

	/**
	 * . 任务初始化参数(JSON数据)
	 */
    private String params;
    /**
	 * . 获取任务初始化参数(JSON数据)
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParams(){  
        return params;  
    }

    /**
	 * . 设置任务初始化参数(JSON数据)
	 *
	 * @column params
	 *        任务初始化参数(JSON数据)
	 */
    public void setParams(String params){  
        this.params = params;  
    }
    
	

	/**
	 * . 任务说明
	 */
    private String remark;
    /**
	 * . 获取任务说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRemark(){  
        return remark;  
    }

    /**
	 * . 设置任务说明
	 *
	 * @column remark
	 *        任务说明
	 */
    public void setRemark(String remark){  
        this.remark = remark;  
    }
    
	
    /*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return GSON.toJson(this);
	}
}    