/*
 * .PlatModelHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmodel.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 模块表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatModelHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	private boolean selected = false;

	public boolean isSelected() {
		return selected;
	}

	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	/**
	 * . 模块名称
	 */
    private String modelName;
    /**
	 * . 获取模块名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelName(){  
        return modelName;  
    }

    /**
	 * . 设置模块名称
	 *
	 * @column modelName
	 *        模块名称
	 */
    public void setModelName(String modelName){  
        this.modelName = modelName;  
    }
    
	

	

	

	

	

	

	/**
	 * . 模块编码
	 */
    private String modelCode;
    /**
	 * . 获取模块编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelCode(){  
        return modelCode;  
    }

    /**
	 * . 设置模块编码
	 *
	 * @column modelCode
	 *        模块编码
	 */
    public void setModelCode(String modelCode){  
        this.modelCode = modelCode;  
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