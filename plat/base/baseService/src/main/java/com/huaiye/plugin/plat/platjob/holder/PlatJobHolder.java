/*
 * .PlatJobHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platjob.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 职位表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatJobHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 职位名称
	 */
    private String jobName;
    /**
	 * . 获取职位名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobName(){  
        return jobName;  
    }

    /**
	 * . 设置职位名称
	 *
	 * @column jobName
	 *        职位名称
	 */
    public void setJobName(String jobName){  
        this.jobName = jobName;  
    }
    
	

	/**
	 * . 职位编号
	 */
    private String jobCode;
    /**
	 * . 获取职位编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobCode(){  
        return jobCode;  
    }

    /**
	 * . 设置职位编号
	 *
	 * @column jobCode
	 *        职位编号
	 */
    public void setJobCode(String jobCode){  
        this.jobCode = jobCode;  
    }
    
	

	

	

	

	

	

	/**
	 * . 企业编码
	 */
    private String entCode;
    /**
	 * . 获取企业编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置企业编码
	 *
	 * @column entCode
	 *        企业编码
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
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