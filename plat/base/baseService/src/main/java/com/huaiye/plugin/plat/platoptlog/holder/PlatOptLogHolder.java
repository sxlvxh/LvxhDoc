/*
 * .PlatOptLogHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platoptlog.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 操作日志表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatOptLogHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 日志操作类型
	 */
    private String logType;
    /**
	 * . 获取日志操作类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogType(){  
        return logType;  
    }

    /**
	 * . 设置日志操作类型
	 *
	 * @column logType
	 *        日志操作类型
	 */
    public void setLogType(String logType){  
        this.logType = logType;  
    }
    
	

	/**
	 * . 操作对象
	 */
    private String logHolder;
    /**
	 * . 获取操作对象
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogHolder(){  
        return logHolder;  
    }

    /**
	 * . 设置操作对象
	 *
	 * @column logHolder
	 *        操作对象
	 */
    public void setLogHolder(String logHolder){  
        this.logHolder = logHolder;  
    }
    
	

	/**
	 * . 请求参数
	 */
    private String logReq;
    /**
	 * . 获取请求参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogReq(){  
        return logReq;  
    }

    /**
	 * . 设置请求参数
	 *
	 * @column logReq
	 *        请求参数
	 */
    public void setLogReq(String logReq){  
        this.logReq = logReq;  
    }
    
	

	/**
	 * . 返回参数
	 */
    private String logResp;
    /**
	 * . 获取返回参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogResp(){  
        return logResp;  
    }

    /**
	 * . 设置返回参数
	 *
	 * @column logResp
	 *        返回参数
	 */
    public void setLogResp(String logResp){  
        this.logResp = logResp;  
    }
    
	

	/**
	 * . 远程地址
	 */
    private String remoteAddr;
    /**
	 * . 获取远程地址
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRemoteAddr(){  
        return remoteAddr;  
    }

    /**
	 * . 设置远程地址
	 *
	 * @column remoteAddr
	 *        远程地址
	 */
    public void setRemoteAddr(String remoteAddr){  
        this.remoteAddr = remoteAddr;  
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