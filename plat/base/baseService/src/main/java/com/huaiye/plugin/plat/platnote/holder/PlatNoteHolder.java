/*
 * .PlatNoteHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platnote.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 庭审笔录表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatNoteHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 关联编号
	 */
    private String relateCode;
    /**
	 * . 获取关联编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRelateCode(){  
        return relateCode;  
    }

    /**
	 * . 设置关联编号
	 *
	 * @column relateCode
	 *        关联编号
	 */
    public void setRelateCode(String relateCode){  
        this.relateCode = relateCode;  
    }
    
	

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
	 * . 庭审笔录内容
	 */
    private String content;
    /**
	 * . 获取庭审笔录内容
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getContent(){  
        return content;  
    }

    /**
	 * . 设置庭审笔录内容
	 *
	 * @column content
	 *        庭审笔录内容
	 */
    public void setContent(String content){  
        this.content = content;  
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