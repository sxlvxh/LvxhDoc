/*
 * .PlatConfigHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platconfig.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 系统配置表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatConfigHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 配置项
	 */
    private String configName;
    /**
	 * . 获取配置项
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getConfigName(){  
        return configName;  
    }

    /**
	 * . 设置配置项
	 *
	 * @column configName
	 *        配置项
	 */
    public void setConfigName(String configName){  
        this.configName = configName;  
    }
    
	

	/**
	 * . 值
	 */
    private String configValue;
    /**
	 * . 获取值
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getConfigValue(){  
        return configValue;  
    }

    /**
	 * . 设置值
	 *
	 * @column configValue
	 *        值
	 */
    public void setConfigValue(String configValue){  
        this.configValue = configValue;  
    }
    
	

	/**
	 * . 节点类型
	 */
    private String configType;
    /**
	 * . 获取节点类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getConfigType(){  
        return configType;  
    }

    /**
	 * . 设置节点类型
	 *
	 * @column configType
	 *        节点类型
	 */
    public void setConfigType(String configType){  
        this.configType = configType;  
    }
    
	

	/**
	 * . 节点编号
	 */
    private String configCode;
    /**
	 * . 获取节点编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getConfigCode(){  
        return configCode;  
    }

    /**
	 * . 设置节点编号
	 *
	 * @column configCode
	 *        节点编号
	 */
    public void setConfigCode(String configCode){  
        this.configCode = configCode;  
    }
    
	

	/**
	 * . 参数说明
	 */
    private String description;
    /**
	 * . 获取参数说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDescription(){  
        return description;  
    }

    /**
	 * . 设置参数说明
	 *
	 * @column description
	 *        参数说明
	 */
    public void setDescription(String description){  
        this.description = description;  
    }
    
	

	/**
	 * . 缓存有效期 单位：秒
	 */
    private Integer validSpan;
    /**
	 * . 获取缓存有效期 单位：秒
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getValidSpan(){  
        return validSpan;  
    }

    /**
	 * . 设置缓存有效期 单位：秒
	 *
	 * @column validSpan
	 *        缓存有效期 单位：秒
	 */
    public void setValidSpan(Integer validSpan){  
        this.validSpan = validSpan;  
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