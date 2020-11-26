/*
 * .PlatProductHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platproduct.holder;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;

/**
 * . 产品表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatProductHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * . 产品名称名称
	 */
    private String productName;
    /**
	 * . 获取产品名称名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductName(){  
        return productName;  
    }

    /**
	 * . 设置产品名称名称
	 *
	 * @column productName
	 *        产品名称名称
	 */
    public void setProductName(String productName){  
        this.productName = productName;  
    }
    
	

	/**
	 * . 产品标题
	 */
    private String productTitle;
    /**
	 * . 获取产品标题
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductTitle(){  
        return productTitle;  
    }

    /**
	 * . 设置产品标题
	 *
	 * @column productTitle
	 *        产品标题
	 */
    public void setProductTitle(String productTitle){  
        this.productTitle = productTitle;  
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
    
	

	/**
	 * . 产品配置参数
	 */
    private String productParams;
    /**
	 * . 获取产品配置参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductParams(){  
        return productParams;  
    }

    /**
	 * . 设置产品配置参数
	 *
	 * @column productParams
	 *        产品配置参数
	 */
    public void setProductParams(String productParams){  
        this.productParams = productParams;  
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