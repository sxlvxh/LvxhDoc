/*
 * .PlatSoftVersionHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftversion.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 软件版本表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSoftVersionHolder extends BaseBusinessHolder {
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
	 * . 版本
	 */
    private String version;
    /**
	 * . 获取版本
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getVersion(){  
        return version;  
    }

    /**
	 * . 设置版本
	 *
	 * @column version
	 *        版本
	 */
    public void setVersion(String version){  
        this.version = version;  
    }
    
	

	/**
	 * . 强制升级 是否强制升级 0否 1是
	 */
    private Integer mandatory;
    /**
	 * . 获取强制升级 是否强制升级 0否 1是
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMandatory(){  
        return mandatory;  
    }

    /**
	 * . 设置强制升级 是否强制升级 0否 1是
	 *
	 * @column mandatory
	 *        强制升级 是否强制升级 0否 1是
	 */
    public void setMandatory(Integer mandatory){  
        this.mandatory = mandatory;  
    }
    
	

	/**
	 * . 上一个版本
	 */
    private String preVersion;
    /**
	 * . 获取上一个版本
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPreVersion(){  
        return preVersion;  
    }

    /**
	 * . 设置上一个版本
	 *
	 * @column preVersion
	 *        上一个版本
	 */
    public void setPreVersion(String preVersion){  
        this.preVersion = preVersion;  
    }
    
	

	/**
	 * . 版本升级说明
	 */
    private String description;
    /**
	 * . 获取版本升级说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDescription(){  
        return description;  
    }

    /**
	 * . 设置版本升级说明
	 *
	 * @column description
	 *        版本升级说明
	 */
    public void setDescription(String description){  
        this.description = description;  
    }
    
	

	/**
	 * . 是否激活，0 否 1是
	 */
    private String active;
    /**
	 * . 获取是否激活，0 否 1是
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getActive(){  
        return active;  
    }

    /**
	 * . 设置是否激活，0 否 1是
	 *
	 * @column active
	 *        是否激活，0 否 1是
	 */
    public void setActive(String active){  
        this.active = active;  
    }
    
	

	

	

	

	

	

	/**
	 * . 文件路径
	 */
    private String filePath;
    /**
	 * . 获取文件路径
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFilePath(){  
        return filePath;  
    }

    /**
	 * . 设置文件路径
	 *
	 * @column filePath
	 *        文件路径
	 */
    public void setFilePath(String filePath){  
        this.filePath = filePath;  
    }
    
	

	/**
	 * . 文件路径说明： 0 本地文件服务器 1 第三方服务器
	 */
    private String filePathType;
    /**
	 * . 获取文件路径说明： 0 本地文件服务器 1 第三方服务器
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFilePathType(){  
        return filePathType;  
    }

    /**
	 * . 设置文件路径说明： 0 本地文件服务器 1 第三方服务器
	 *
	 * @column filePathType
	 *        文件路径说明： 0 本地文件服务器 1 第三方服务器
	 */
    public void setFilePathType(String filePathType){  
        this.filePathType = filePathType;  
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