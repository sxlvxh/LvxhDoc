/*
 * .PlatNoReadSmsHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platnoreadsms.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 查询未读消息数
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatNoReadSmsHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * . 
	 */
    private String src;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSrc(){  
        return src;  
    }

    /**
	 * . 设置
	 *
	 * @column src
	 *        
	 */
    public void setSrc(String src){  
        this.src = src;  
    }
    
	

	/**
	 * . 
	 */
    private String target;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTarget(){  
        return target;  
    }

    /**
	 * . 设置
	 *
	 * @column target
	 *        
	 */
    public void setTarget(String target){  
        this.target = target;  
    }
    
	

	/**
	 * . 
	 */
    private String smsType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSmsType(){  
        return smsType;  
    }

    /**
	 * . 设置
	 *
	 * @column smsType
	 *        
	 */
    public void setSmsType(String smsType){  
        this.smsType = smsType;  
    }
    
	

	/**
	 * . 
	 */
    private String groupCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置
	 *
	 * @column groupCode
	 *        
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer noReadCount;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getNoReadCount(){  
        return noReadCount;  
    }

    /**
	 * . 设置
	 *
	 * @column noReadCount
	 *        
	 */
    public void setNoReadCount(Integer noReadCount){  
        this.noReadCount = noReadCount;  
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