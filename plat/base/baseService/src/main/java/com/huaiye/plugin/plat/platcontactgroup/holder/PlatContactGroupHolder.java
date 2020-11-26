/*
 * .PlatContactGroupHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontactgroup.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;
import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 联系人群组
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatContactGroupHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	private List<PlatContactHolder>contactList = new ArrayList<PlatContactHolder>();

	public List<PlatContactHolder> getContactList() {
		return contactList;
	}

	public void setContactList(List<PlatContactHolder> contactList) {
		this.contactList = contactList;
	}
	

	/**
	 * . 用户编号
	 */
    private String userCode;
    /**
	 * . 获取用户编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserCode(){  
        return userCode;  
    }

    /**
	 * . 设置用户编号
	 *
	 * @column userCode
	 *        用户编号
	 */
    public void setUserCode(String userCode){  
        this.userCode = userCode;  
    }
    
	

	/**
	 * . 群组名称
	 */
    private String groupName;
    /**
	 * . 获取群组名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupName(){  
        return groupName;  
    }

    /**
	 * . 设置群组名称
	 *
	 * @column groupName
	 *        群组名称
	 */
    public void setGroupName(String groupName){  
        this.groupName = groupName;  
    }
    
	

	/**
	 * . 群组路径
	 */
    private String groupIcon;
    /**
	 * . 获取群组路径
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupIcon(){  
        return groupIcon;  
    }

    /**
	 * . 设置群组路径
	 *
	 * @column groupIcon
	 *        群组路径
	 */
    public void setGroupIcon(String groupIcon){  
        this.groupIcon = groupIcon;  
    }
    
	

	/**
	 * . 群组类型 1:自定义群组 2 联系人组
	 */
    private Integer groupType;
    /**
	 * . 获取群组类型 1:自定义群组 2 联系人组
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getGroupType(){  
        return groupType;  
    }

    /**
	 * . 设置群组类型 1:自定义群组 2 联系人组
	 *
	 * @column groupType
	 *        群组类型 1:自定义群组 2 联系人组
	 */
    public void setGroupType(Integer groupType){  
        this.groupType = groupType;  
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
	 * . 置顶时间
	 */
    private java.util.Date topTime;
    /**
	 * . 获取置顶时间
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getTopTime(){  
        return topTime;  
    }

    /**
	 * . 设置置顶时间
	 *
	 * @column topTime
	 *        置顶时间
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setTopTime(java.util.Date topTime){  
        this.topTime = topTime;  
    }
    
	/**
	 * . 置顶时间左值
	 */
    private java.util.Date topTimeL;
    
	/**
	 * . 获取置顶时间左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getTopTimeL(){  
        return topTimeL;  
    }

    /**
	 * . 设置置顶时间左值
	 *
	 * @column topTimeL
	 *        置顶时间左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setTopTimeL(java.util.Date topTime){  
        this.topTimeL = topTime;  
    }
    
	/**
	 * . 置顶时间右值
	 */
    private java.util.Date topTimeR;
    
	/**
	 * . 获取置顶时间右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getTopTimeR(){  
        return topTimeR;  
    }

    /**
	 * . 设置置顶时间右值
	 *
	 * @column topTimeR
	 *        置顶时间右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setTopTimeR(java.util.Date topTime){  
        this.topTimeR = topTime;  
    }
	

	/**
	 * . 收到最新消息时间
	 */
    private java.util.Date msgTime;
    /**
	 * . 获取收到最新消息时间
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMsgTime(){  
        return msgTime;  
    }

    /**
	 * . 设置收到最新消息时间
	 *
	 * @column msgTime
	 *        收到最新消息时间
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMsgTime(java.util.Date msgTime){  
        this.msgTime = msgTime;  
    }
    
	/**
	 * . 收到最新消息时间左值
	 */
    private java.util.Date msgTimeL;
    
	/**
	 * . 获取收到最新消息时间左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMsgTimeL(){  
        return msgTimeL;  
    }

    /**
	 * . 设置收到最新消息时间左值
	 *
	 * @column msgTimeL
	 *        收到最新消息时间左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMsgTimeL(java.util.Date msgTime){  
        this.msgTimeL = msgTime;  
    }
    
	/**
	 * . 收到最新消息时间右值
	 */
    private java.util.Date msgTimeR;
    
	/**
	 * . 获取收到最新消息时间右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMsgTimeR(){  
        return msgTimeR;  
    }

    /**
	 * . 设置收到最新消息时间右值
	 *
	 * @column msgTimeR
	 *        收到最新消息时间右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMsgTimeR(java.util.Date msgTime){  
        this.msgTimeR = msgTime;  
    }
	

	

	

	

	

	/**
	 * . 群组备注
	 */
    private String groupMark;
    /**
	 * . 获取群组备注
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupMark(){  
        return groupMark;  
    }

    /**
	 * . 设置群组备注
	 *
	 * @column groupMark
	 *        群组备注
	 */
    public void setGroupMark(String groupMark){  
        this.groupMark = groupMark;  
    }
    
	

	/**
	 * . 群管理员编号
	 */
    private String groupAdmin;
    /**
	 * . 获取群管理员编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupAdmin(){  
        return groupAdmin;  
    }

    /**
	 * . 设置群管理员编号
	 *
	 * @column groupAdmin
	 *        群管理员编号
	 */
    public void setGroupAdmin(String groupAdmin){  
        this.groupAdmin = groupAdmin;  
    }
    
	

	

	/**
	 * . 群组配置参数
	 */
    private String groupParams;
    /**
	 * . 获取群组配置参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupParams(){  
        return groupParams;  
    }

    /**
	 * . 设置群组配置参数
	 *
	 * @column groupParams
	 *        群组配置参数
	 */
    public void setGroupParams(String groupParams){  
        this.groupParams = groupParams;  
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