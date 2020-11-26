/*
 * .PlatSoftListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 应用软件列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSoftListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

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
    private String softImg;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSoftImg(){  
        return softImg;  
    }

    /**
	 * . 设置
	 *
	 * @column softImg
	 *        
	 */
    public void setSoftImg(String softImg){  
        this.softImg = softImg;  
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