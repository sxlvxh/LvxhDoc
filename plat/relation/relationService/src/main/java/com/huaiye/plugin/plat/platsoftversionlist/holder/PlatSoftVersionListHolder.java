/*
 * .PlatSoftVersionListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftversionlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 应用软件版本列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSoftVersionListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * . 
	 */
    private String softType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftType(){  
        return softType;  
    }

    /**
	 * . 设置
	 *
	 * @column softType
	 *        
	 */
    public void setSoftType(String softType){  
        this.softType = softType;  
    }
    
	

	/**
	 * . 
	 */
    private String softName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftName(){  
        return softName;  
    }

    /**
	 * . 设置
	 *
	 * @column softName
	 *        
	 */
    public void setSoftName(String softName){  
        this.softName = softName;  
    }
    
	

	/**
	 * . 
	 */
    private String softDesc;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftDesc(){  
        return softDesc;  
    }

    /**
	 * . 设置
	 *
	 * @column softDesc
	 *        
	 */
    public void setSoftDesc(String softDesc){  
        this.softDesc = softDesc;  
    }
    
	

	/**
	 * . 
	 */
    private String softTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftTypeName(){  
        return softTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column softTypeName
	 *        
	 */
    public void setSoftTypeName(String softTypeName){  
        this.softTypeName = softTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String filePathTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFilePathTypeName(){  
        return filePathTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column filePathTypeName
	 *        
	 */
    public void setFilePathTypeName(String filePathTypeName){  
        this.filePathTypeName = filePathTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String activeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getActiveName(){  
        return activeName;  
    }

    /**
	 * . 设置
	 *
	 * @column activeName
	 *        
	 */
    public void setActiveName(String activeName){  
        this.activeName = activeName;  
    }
    
	

	/**
	 * . 
	 */
    private String mandatoryName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMandatoryName(){  
        return mandatoryName;  
    }

    /**
	 * . 设置
	 *
	 * @column mandatoryName
	 *        
	 */
    public void setMandatoryName(String mandatoryName){  
        this.mandatoryName = mandatoryName;  
    }
    
	

	

	/**
	 * . 
	 */
    private String softCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftCode(){  
        return softCode;  
    }

    /**
	 * . 设置
	 *
	 * @column softCode
	 *        
	 */
    public void setSoftCode(String softCode){  
        this.softCode = softCode;  
    }
    
	

	/**
	 * . 
	 */
    private String version;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getVersion(){  
        return version;  
    }

    /**
	 * . 设置
	 *
	 * @column version
	 *        
	 */
    public void setVersion(String version){  
        this.version = version;  
    }
    
	

	/**
	 * . 
	 */
    private Integer mandatory;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMandatory(){  
        return mandatory;  
    }

    /**
	 * . 设置
	 *
	 * @column mandatory
	 *        
	 */
    public void setMandatory(Integer mandatory){  
        this.mandatory = mandatory;  
    }
    
	

	/**
	 * . 
	 */
    private String preVersion;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPreVersion(){  
        return preVersion;  
    }

    /**
	 * . 设置
	 *
	 * @column preVersion
	 *        
	 */
    public void setPreVersion(String preVersion){  
        this.preVersion = preVersion;  
    }
    
	

	/**
	 * . 
	 */
    private String description;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDescription(){  
        return description;  
    }

    /**
	 * . 设置
	 *
	 * @column description
	 *        
	 */
    public void setDescription(String description){  
        this.description = description;  
    }
    
	

	/**
	 * . 
	 */
    private String active;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getActive(){  
        return active;  
    }

    /**
	 * . 设置
	 *
	 * @column active
	 *        
	 */
    public void setActive(String active){  
        this.active = active;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String filePath;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFilePath(){  
        return filePath;  
    }

    /**
	 * . 设置
	 *
	 * @column filePath
	 *        
	 */
    public void setFilePath(String filePath){  
        this.filePath = filePath;  
    }
    
	

	/**
	 * . 
	 */
    private String filePathType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFilePathType(){  
        return filePathType;  
    }

    /**
	 * . 设置
	 *
	 * @column filePathType
	 *        
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