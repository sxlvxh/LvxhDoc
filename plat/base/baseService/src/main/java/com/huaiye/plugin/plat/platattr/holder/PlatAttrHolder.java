/*
 * .PlatAttrHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platattr.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 业务表字段属表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatAttrHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 对象名称
	 */
    private String className;
    /**
	 * . 获取对象名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getClassName(){  
        return className;  
    }

    /**
	 * . 设置对象名称
	 *
	 * @column className
	 *        对象名称
	 */
    public void setClassName(String className){  
        this.className = className;  
    }
    
	

	/**
	 * . 字段名称
	 */
    private String attrName;
    /**
	 * . 获取字段名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAttrName(){  
        return attrName;  
    }

    /**
	 * . 设置字段名称
	 *
	 * @column attrName
	 *        字段名称
	 */
    public void setAttrName(String attrName){  
        this.attrName = attrName;  
    }
    
	

	/**
	 * . 字段中文描述
	 */
    private String attrLabel;
    /**
	 * . 获取字段中文描述
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAttrLabel(){  
        return attrLabel;  
    }

    /**
	 * . 设置字段中文描述
	 *
	 * @column attrLabel
	 *        字段中文描述
	 */
    public void setAttrLabel(String attrLabel){  
        this.attrLabel = attrLabel;  
    }
    
	

	/**
	 * . 字段类型
	 */
    private String attrType;
    /**
	 * . 获取字段类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAttrType(){  
        return attrType;  
    }

    /**
	 * . 设置字段类型
	 *
	 * @column attrType
	 *        字段类型
	 */
    public void setAttrType(String attrType){  
        this.attrType = attrType;  
    }
    
	

	

	

	

	

	

	/**
	 * . 类说明
	 */
    private String classDesc;
    /**
	 * . 获取类说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getClassDesc(){  
        return classDesc;  
    }

    /**
	 * . 设置类说明
	 *
	 * @column classDesc
	 *        类说明
	 */
    public void setClassDesc(String classDesc){  
        this.classDesc = classDesc;  
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