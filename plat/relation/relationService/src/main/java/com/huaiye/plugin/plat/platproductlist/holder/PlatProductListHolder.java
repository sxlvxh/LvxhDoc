/*
 * .PlatProductListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platproductlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 产品列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatProductListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String productName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductName(){  
        return productName;  
    }

    /**
	 * . 设置
	 *
	 * @column productName
	 *        
	 */
    public void setProductName(String productName){  
        this.productName = productName;  
    }
    
	

	/**
	 * . 
	 */
    private String productTitle;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductTitle(){  
        return productTitle;  
    }

    /**
	 * . 设置
	 *
	 * @column productTitle
	 *        
	 */
    public void setProductTitle(String productTitle){  
        this.productTitle = productTitle;  
    }
    
	

	

	

	

	

	

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
    private String productParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductParams(){  
        return productParams;  
    }

    /**
	 * . 设置
	 *
	 * @column productParams
	 *        
	 */
    public void setProductParams(String productParams){  
        this.productParams = productParams;  
    }
    
	

	/**
	 * . 
	 */
    private String modelNames;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelNames(){  
        return modelNames;  
    }

    /**
	 * . 设置
	 *
	 * @column modelNames
	 *        
	 */
    public void setModelNames(String modelNames){  
        this.modelNames = modelNames;  
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