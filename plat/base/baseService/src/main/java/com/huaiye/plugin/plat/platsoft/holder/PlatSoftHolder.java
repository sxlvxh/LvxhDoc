/*
 * .PlatSoftHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoft.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 版本产品表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSoftHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 应用编码
	 */
    private String softCode;
    /**
	 * . 获取应用编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftCode(){  
        return softCode;  
    }

    /**
	 * . 设置应用编码
	 *
	 * @column softCode
	 *        应用编码
	 */
    public void setSoftCode(String softCode){  
        this.softCode = softCode;  
    }
    
	

	/**
	 * . 应用名称
	 */
    private String softName;
    /**
	 * . 获取应用名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftName(){  
        return softName;  
    }

    /**
	 * . 设置应用名称
	 *
	 * @column softName
	 *        应用名称
	 */
    public void setSoftName(String softName){  
        this.softName = softName;  
    }
    
	

	/**
	 * . 应用类型 windows android ios 
	 */
    private String softType;
    /**
	 * . 获取应用类型 windows android ios 
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftType(){  
        return softType;  
    }

    /**
	 * . 设置应用类型 windows android ios 
	 *
	 * @column softType
	 *        应用类型 windows android ios 
	 */
    public void setSoftType(String softType){  
        this.softType = softType;  
    }
    
	

	/**
	 * . 应用说明
	 */
    private String softDesc;
    /**
	 * . 获取应用说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftDesc(){  
        return softDesc;  
    }

    /**
	 * . 设置应用说明
	 *
	 * @column softDesc
	 *        应用说明
	 */
    public void setSoftDesc(String softDesc){  
        this.softDesc = softDesc;  
    }
    
	

	/**
	 * . 应用图标
	 */
    private String softImg;
    /**
	 * . 获取应用图标
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftImg(){  
        return softImg;  
    }

    /**
	 * . 设置应用图标
	 *
	 * @column softImg
	 *        应用图标
	 */
    public void setSoftImg(String softImg){  
        this.softImg = softImg;  
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