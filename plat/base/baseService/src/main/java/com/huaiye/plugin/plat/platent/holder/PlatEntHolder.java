/*
 * .PlatEntHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platent.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 企业信息表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatEntHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

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
    
	

	/**
	 * . 企业名称
	 */
    private String entName;
    /**
	 * . 获取企业名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntName(){  
        return entName;  
    }

    /**
	 * . 设置企业名称
	 *
	 * @column entName
	 *        企业名称
	 */
    public void setEntName(String entName){  
        this.entName = entName;  
    }
    
	

	/**
	 * . 企业类型 1 业务 2 流媒体
	 */
    private String entType;
    /**
	 * . 获取企业类型 1 业务 2 流媒体
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntType(){  
        return entType;  
    }

    /**
	 * . 设置企业类型 1 业务 2 流媒体
	 *
	 * @column entType
	 *        企业类型 1 业务 2 流媒体
	 */
    public void setEntType(String entType){  
        this.entType = entType;  
    }
    
	

	/**
	 * . 上级企业编码
	 */
    private String parentCode;
    /**
	 * . 获取上级企业编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentCode(){  
        return parentCode;  
    }

    /**
	 * . 设置上级企业编码
	 *
	 * @column parentCode
	 *        上级企业编码
	 */
    public void setParentCode(String parentCode){  
        this.parentCode = parentCode;  
    }
    
	

	/**
	 * . 优先级
	 */
    private Integer priority;
    /**
	 * . 获取优先级
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getPriority(){  
        return priority;  
    }

    /**
	 * . 设置优先级
	 *
	 * @column priority
	 *        优先级
	 */
    public void setPriority(Integer priority){  
        this.priority = priority;  
    }
    
	

	/**
	 * . 企业简称
	 */
    private String shortName;
    /**
	 * . 获取企业简称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getShortName(){  
        return shortName;  
    }

    /**
	 * . 设置企业简称
	 *
	 * @column shortName
	 *        企业简称
	 */
    public void setShortName(String shortName){  
        this.shortName = shortName;  
    }
    
	

	/**
	 * . 级别
	 */
    private Integer level;
    /**
	 * . 获取级别
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getLevel(){  
        return level;  
    }

    /**
	 * . 设置级别
	 *
	 * @column level
	 *        级别
	 */
    public void setLevel(Integer level){  
        this.level = level;  
    }
    
	

	

	

	

	

	

	/**
	 * . 企业配置参数
	 */
    private String entParams;
    /**
	 * . 获取企业配置参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntParams(){  
        return entParams;  
    }

    /**
	 * . 设置企业配置参数
	 *
	 * @column entParams
	 *        企业配置参数
	 */
    public void setEntParams(String entParams){  
        this.entParams = entParams;  
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