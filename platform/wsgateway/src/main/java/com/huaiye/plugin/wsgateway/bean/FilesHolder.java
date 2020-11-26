/*
 * .PlatFilesHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.wsgateway.bean;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 文档表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class FilesHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 文件编码
	 */
    private String fileCode;
    /**
	 * . 获取文件编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFileCode(){  
        return fileCode;  
    }

    /**
	 * . 设置文件编码
	 *
	 * @column fileCode
	 *        文件编码
	 */
    public void setFileCode(String fileCode){  
        this.fileCode = fileCode;  
    }
    
	

	/**
	 * . 文件名称
	 */
    private String fileName;
    /**
	 * . 获取文件名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFileName(){  
        return fileName;  
    }

    /**
	 * . 设置文件名称
	 *
	 * @column fileName
	 *        文件名称
	 */
    public void setFileName(String fileName){  
        this.fileName = fileName;  
    }
    
	

	/**
	 * . 描述
	 */
    private String description;
    /**
	 * . 获取描述
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDescription(){  
        return description;  
    }

    /**
	 * . 设置描述
	 *
	 * @column description
	 *        描述
	 */
    public void setDescription(String description){  
        this.description = description;  
    }
    
	

	/**
	 * . 文件路径
	 */
    private String fileUrl;
    /**
	 * . 获取文件路径
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFileUrl(){  
        return fileUrl;  
    }

    /**
	 * . 设置文件路径
	 *
	 * @column fileUrl
	 *        文件路径
	 */
    public void setFileUrl(String fileUrl){  
        this.fileUrl = fileUrl;  
    }
    
	

	/**
	 * . 文件类型
	 */
    private String fileType;
    /**
	 * . 获取文件类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFileType(){  
        return fileType;  
    }

    /**
	 * . 设置文件类型
	 *
	 * @column fileType
	 *        文件类型
	 */
    public void setFileType(String fileType){  
        this.fileType = fileType;  
    }
    
	

	/**
	 * . 授权用户编号
	 */
    private String userCode;
    /**
	 * . 获取授权用户编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserCode(){  
        return userCode;  
    }

    /**
	 * . 设置授权用户编号
	 *
	 * @column userCode
	 *        授权用户编号
	 */
    public void setUserCode(String userCode){  
        this.userCode = userCode;  
    }
    
	

	/**
	 * . 上传用户编号
	 */
    private String upUserCode;
    /**
	 * . 获取上传用户编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUpUserCode(){  
        return upUserCode;  
    }

    /**
	 * . 设置上传用户编号
	 *
	 * @column upUserCode
	 *        上传用户编号
	 */
    public void setUpUserCode(String upUserCode){  
        this.upUserCode = upUserCode;  
    }
    
	

	/**
	 * . 文件类型(大类)
	 */
    private String oneType;
    /**
	 * . 获取文件类型(大类)
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getOneType(){  
        return oneType;  
    }

    /**
	 * . 设置文件类型(大类)
	 *
	 * @column oneType
	 *        文件类型(大类)
	 */
    public void setOneType(String oneType){  
        this.oneType = oneType;  
    }
    
	

	/**
	 * . 文件大小
	 */
    private Long fileSize;
    /**
	 * . 获取文件大小
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Long getFileSize(){  
        return fileSize;  
    }

    /**
	 * . 设置文件大小
	 *
	 * @column fileSize
	 *        文件大小
	 */
    public void setFileSize(Long fileSize){  
        this.fileSize = fileSize;  
    }
    
	

	/**
	 * . 优先级
	 */
    private Integer priority;
    /**
	 * . 获取优先级
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getPriority(){  
        return priority;  
    }

    /**
	 * . 设置优先级
	 *
	 * @column priority
	 *        优先级
	 */
    public void setPriority(Integer priority){  
        this.priority = priority;  
    }
    
	

	

	

	

	

	

	/**
	 * . 文件参数
	 */
    private String fileParams;
    /**
	 * . 获取文件参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFileParams(){  
        return fileParams;  
    }

    /**
	 * . 设置文件参数
	 *
	 * @column fileParams
	 *        文件参数
	 */
    public void setFileParams(String fileParams){  
        this.fileParams = fileParams;  
    }
    
	

	/**
	 * . 文件转换状态 0 默认状态 1 已转换为word 2已转换为pdf 3 已转换为图片 4 已转化为word和pdf 5已转换为pdf和图片 6 已转换为图片 7 已转换为word，pdf和图片
	 */
    private Integer fileConverterStatus;
    /**
	 * . 获取文件转换状态 0 默认状态 1 已转换为word 2已转换为pdf 3 已转换为图片 4 已转化为word和pdf 5已转换为pdf和图片 6 已转换为图片 7 已转换为word，pdf和图片
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getFileConverterStatus(){  
        return fileConverterStatus;  
    }

    /**
	 * . 设置文件转换状态 0 默认状态 1 已转换为word 2已转换为pdf 3 已转换为图片 4 已转化为word和pdf 5已转换为pdf和图片 6 已转换为图片 7 已转换为word，pdf和图片
	 *
	 * @column fileConverterStatus
	 *        文件转换状态 0 默认状态 1 已转换为word 2已转换为pdf 3 已转换为图片 4 已转化为word和pdf 5已转换为pdf和图片 6 已转换为图片 7 已转换为word，pdf和图片
	 */
    public void setFileConverterStatus(Integer fileConverterStatus){  
        this.fileConverterStatus = fileConverterStatus;  
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