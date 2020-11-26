/*
 * .PlatModelByProductHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmodelbyproduct.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 根据产品编号查询模块
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatModelByProductHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * . 
	 */
    private String productCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductCode(){  
        return productCode;  
    }

    /**
	 * . 设置
	 *
	 * @column productCode
	 *        
	 */
    public void setProductCode(String productCode){  
        this.productCode = productCode;  
    }
    
	

	

	/**
	 * . 
	 */
    private String modelName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelName(){  
        return modelName;  
    }

    /**
	 * . 设置
	 *
	 * @column modelName
	 *        
	 */
    public void setModelName(String modelName){  
        this.modelName = modelName;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String modelCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelCode(){  
        return modelCode;  
    }

    /**
	 * . 设置
	 *
	 * @column modelCode
	 *        
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