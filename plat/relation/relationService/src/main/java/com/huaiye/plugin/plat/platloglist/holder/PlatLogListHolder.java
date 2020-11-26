/*
 * .PlatLogListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platloglist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 操作日志列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatLogListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String logType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogType(){  
        return logType;  
    }

    /**
	 * . 设置
	 *
	 * @column logType
	 *        
	 */
    public void setLogType(String logType){  
        this.logType = logType;  
    }
    
	

	/**
	 * . 
	 */
    private String logHolder;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogHolder(){  
        return logHolder;  
    }

    /**
	 * . 设置
	 *
	 * @column logHolder
	 *        
	 */
    public void setLogHolder(String logHolder){  
        this.logHolder = logHolder;  
    }
    
	

	/**
	 * . 
	 */
    private String logReq;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogReq(){  
        return logReq;  
    }

    /**
	 * . 设置
	 *
	 * @column logReq
	 *        
	 */
    public void setLogReq(String logReq){  
        this.logReq = logReq;  
    }
    
	

	/**
	 * . 
	 */
    private String logResp;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLogResp(){  
        return logResp;  
    }

    /**
	 * . 设置
	 *
	 * @column logResp
	 *        
	 */
    public void setLogResp(String logResp){  
        this.logResp = logResp;  
    }
    
	

	/**
	 * . 
	 */
    private String remoteAddr;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRemoteAddr(){  
        return remoteAddr;  
    }

    /**
	 * . 设置
	 *
	 * @column remoteAddr
	 *        
	 */
    public void setRemoteAddr(String remoteAddr){  
        this.remoteAddr = remoteAddr;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String classDesc;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getClassDesc(){  
        return classDesc;  
    }

    /**
	 * . 设置
	 *
	 * @column classDesc
	 *        
	 */
    public void setClassDesc(String classDesc){  
        this.classDesc = classDesc;  
    }
    
	

	/**
	 * . 
	 */
    private String optType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getOptType(){  
        return optType;  
    }

    /**
	 * . 设置
	 *
	 * @column optType
	 *        
	 */
    public void setOptType(String optType){  
        this.optType = optType;  
    }
    
	

	/**
	 * . 
	 */
    private String userName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserName(){  
        return userName;  
    }

    /**
	 * . 设置
	 *
	 * @column userName
	 *        
	 */
    public void setUserName(String userName){  
        this.userName = userName;  
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