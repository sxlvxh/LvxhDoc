/*
 * .PlatSmsListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsmslist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 消息列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSmsListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String src;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSrc(){  
        return src;  
    }

    /**
	 * . 设置
	 *
	 * @column src
	 *        
	 */
    public void setSrc(String src){  
        this.src = src;  
    }
    
	

	/**
	 * . 
	 */
    private String target;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTarget(){  
        return target;  
    }

    /**
	 * . 设置
	 *
	 * @column target
	 *        
	 */
    public void setTarget(String target){  
        this.target = target;  
    }
    
	

	/**
	 * . 
	 */
    private String content;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getContent(){  
        return content;  
    }

    /**
	 * . 设置
	 *
	 * @column content
	 *        
	 */
    public void setContent(String content){  
        this.content = content;  
    }
    
	

	/**
	 * . 
	 */
    private Integer status;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getStatus(){  
        return status;  
    }

    /**
	 * . 设置
	 *
	 * @column status
	 *        
	 */
    public void setStatus(Integer status){  
        this.status = status;  
    }
    
	

	/**
	 * . 
	 */
    private String smsType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSmsType(){  
        return smsType;  
    }

    /**
	 * . 设置
	 *
	 * @column smsType
	 *        
	 */
    public void setSmsType(String smsType){  
        this.smsType = smsType;  
    }
    
	

	/**
	 * . 
	 */
    private Integer contentType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getContentType(){  
        return contentType;  
    }

    /**
	 * . 设置
	 *
	 * @column contentType
	 *        
	 */
    public void setContentType(Integer contentType){  
        this.contentType = contentType;  
    }
    
	

	/**
	 * . 
	 */
    private Integer sendType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getSendType(){  
        return sendType;  
    }

    /**
	 * . 设置
	 *
	 * @column sendType
	 *        
	 */
    public void setSendType(Integer sendType){  
        this.sendType = sendType;  
    }
    
	

	/**
	 * . 
	 */
    private String groupCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置
	 *
	 * @column groupCode
	 *        
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
    }
    
	

	/**
	 * . 
	 */
    private String uid;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUid(){  
        return uid;  
    }

    /**
	 * . 设置
	 *
	 * @column uid
	 *        
	 */
    public void setUid(String uid){  
        this.uid = uid;  
    }
    
	

	/**
	 * . 
	 */
    private String sourceMsg;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSourceMsg(){  
        return sourceMsg;  
    }

    /**
	 * . 设置
	 *
	 * @column sourceMsg
	 *        
	 */
    public void setSourceMsg(String sourceMsg){  
        this.sourceMsg = sourceMsg;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String srcName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSrcName(){  
        return srcName;  
    }

    /**
	 * . 设置
	 *
	 * @column srcName
	 *        
	 */
    public void setSrcName(String srcName){  
        this.srcName = srcName;  
    }
    
	

	/**
	 * . 
	 */
    private String srcImgUrl;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSrcImgUrl(){  
        return srcImgUrl;  
    }

    /**
	 * . 设置
	 *
	 * @column srcImgUrl
	 *        
	 */
    public void setSrcImgUrl(String srcImgUrl){  
        this.srcImgUrl = srcImgUrl;  
    }
    
	

	/**
	 * . 
	 */
    private String targetName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTargetName(){  
        return targetName;  
    }

    /**
	 * . 设置
	 *
	 * @column targetName
	 *        
	 */
    public void setTargetName(String targetName){  
        this.targetName = targetName;  
    }
    
	

	/**
	 * . 
	 */
    private String targetImgUrl;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTargetImgUrl(){  
        return targetImgUrl;  
    }

    /**
	 * . 设置
	 *
	 * @column targetImgUrl
	 *        
	 */
    public void setTargetImgUrl(String targetImgUrl){  
        this.targetImgUrl = targetImgUrl;  
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