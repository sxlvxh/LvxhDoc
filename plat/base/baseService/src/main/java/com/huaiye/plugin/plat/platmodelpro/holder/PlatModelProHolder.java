/*
 * .PlatModelProHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmodelpro.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 模块关系
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatModelProHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

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
    
	

	/**
	 * . 产品编码
	 */
    private String productCode;
    /**
	 * . 获取产品编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductCode(){  
        return productCode;  
    }

    /**
	 * . 设置产品编码
	 *
	 * @column productCode
	 *        产品编码
	 */
    public void setProductCode(String productCode){  
        this.productCode = productCode;  
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