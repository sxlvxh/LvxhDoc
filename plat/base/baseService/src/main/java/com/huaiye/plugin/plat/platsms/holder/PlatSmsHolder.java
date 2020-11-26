/*
 * .PlatSmsHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsms.holder;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import java.util.List;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 通讯录消息表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSmsHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	private List<String> targets;

	public List<String> getTargets() {
		return targets;
	}

	public void setTargets(List<String> targets) {
		this.targets = targets;
	}

	/**
	 * . 发送者登录名
	 */
    private String src;
    /**
	 * . 获取发送者登录名
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSrc(){  
        return src;  
    }

    /**
	 * . 设置发送者登录名
	 *
	 * @column src
	 *        发送者登录名
	 */
    public void setSrc(String src){  
        this.src = src;  
    }
    
	

	/**
	 * . 接受者登录名
	 */
    private String target;
    /**
	 * . 获取接受者登录名
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTarget(){  
        return target;  
    }

    /**
	 * . 设置接受者登录名
	 *
	 * @column target
	 *        接受者登录名
	 */
    public void setTarget(String target){  
        this.target = target;  
    }
    
	

	/**
	 * . 消息内容
	 */
    private String content;
    /**
	 * . 获取消息内容
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getContent(){  
        return content;  
    }

    /**
	 * . 设置消息内容
	 *
	 * @column content
	 *        消息内容
	 */
    public void setContent(String content){  
        this.content = content;  
    }
    
	

	/**
	 * . 消息状态 0 已读 1 未读
	 */
    private Integer status;
    /**
	 * . 获取消息状态 0 已读 1 未读
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getStatus(){  
        return status;  
    }

    /**
	 * . 设置消息状态 0 已读 1 未读
	 *
	 * @column status
	 *        消息状态 0 已读 1 未读
	 */
    public void setStatus(Integer status){  
        this.status = status;  
    }
    
	

	/**
	 * . 消息类型
	 */
    private String smsType;
    /**
	 * . 获取消息类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSmsType(){  
        return smsType;  
    }

    /**
	 * . 设置消息类型
	 *
	 * @column smsType
	 *        消息类型
	 */
    public void setSmsType(String smsType){  
        this.smsType = smsType;  
    }
    
	

	/**
	 * . 消息内容类型
	 */
    private Integer contentType;
    /**
	 * . 获取消息内容类型
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getContentType(){  
        return contentType;  
    }

    /**
	 * . 设置消息内容类型
	 *
	 * @column contentType
	 *        消息内容类型
	 */
    public void setContentType(Integer contentType){  
        this.contentType = contentType;  
    }
    
	

	/**
	 * . 发送状态 0 发送 1 接收
	 */
    private Integer sendType;
    /**
	 * . 获取发送状态 0 发送 1 接收
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getSendType(){  
        return sendType;  
    }

    /**
	 * . 设置发送状态 0 发送 1 接收
	 *
	 * @column sendType
	 *        发送状态 0 发送 1 接收
	 */
    public void setSendType(Integer sendType){  
        this.sendType = sendType;  
    }
    
	

	/**
	 * . 群组编号
	 */
    private String groupCode;
    /**
	 * . 获取群组编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置群组编号
	 *
	 * @column groupCode
	 *        群组编号
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
    }
    
	

	/**
	 * . 消息号
	 */
    private String uid;
    /**
	 * . 获取消息号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUid(){  
        return uid;  
    }

    /**
	 * . 设置消息号
	 *
	 * @column uid
	 *        消息号
	 */
    public void setUid(String uid){  
        this.uid = uid;  
    }
    
	

	/**
	 * . 源消息内容
	 */
    private String sourceMsg;
    /**
	 * . 获取源消息内容
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSourceMsg(){  
        return sourceMsg;  
    }

    /**
	 * . 设置源消息内容
	 *
	 * @column sourceMsg
	 *        源消息内容
	 */
    public void setSourceMsg(String sourceMsg){  
        this.sourceMsg = sourceMsg;  
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