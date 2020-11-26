/*
 * .PlatCommUserListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcommuserlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 查询群组联系人列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatCommUserListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	private String domainCode;
	

	public String getDomainCode() {
		return domainCode;
	}

	public void setDomainCode(String domainCode) {
		this.domainCode = domainCode;
	}

	/**
	 * . 
	 */
    private String userCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserCode(){  
        return userCode;  
    }

    /**
	 * . 设置
	 *
	 * @column userCode
	 *        
	 */
    public void setUserCode(String userCode){  
        this.userCode = userCode;  
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
    private String friendMark;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendMark(){  
        return friendMark;  
    }

    /**
	 * . 设置
	 *
	 * @column friendMark
	 *        
	 */
    public void setFriendMark(String friendMark){  
        this.friendMark = friendMark;  
    }
    
	

	/**
	 * . 
	 */
    private String isAdmin;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIsAdmin(){  
        return isAdmin;  
    }

    /**
	 * . 设置
	 *
	 * @column isAdmin
	 *        
	 */
    public void setIsAdmin(String isAdmin){  
        this.isAdmin = isAdmin;  
    }
    
	

	/**
	 * . 
	 */
    private Integer priority;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getPriority(){  
        return priority;  
    }

    /**
	 * . 设置
	 *
	 * @column priority
	 *        
	 */
    public void setPriority(Integer priority){  
        this.priority = priority;  
    }
    
	

	/**
	 * . 
	 */
    private java.util.Date smsTime;
    /**
	 * . 获取
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getSmsTime(){  
        return smsTime;  
    }

    /**
	 * . 设置
	 *
	 * @column smsTime
	 *        
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setSmsTime(java.util.Date smsTime){  
        this.smsTime = smsTime;  
    }
    
	/**
	 * . 左值
	 */
    private java.util.Date smsTimeL;
    
	/**
	 * . 获取左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getSmsTimeL(){  
        return smsTimeL;  
    }

    /**
	 * . 设置左值
	 *
	 * @column smsTimeL
	 *        左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setSmsTimeL(java.util.Date smsTime){  
        this.smsTimeL = smsTime;  
    }
    
	/**
	 * . 右值
	 */
    private java.util.Date smsTimeR;
    
	/**
	 * . 获取右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getSmsTimeR(){  
        return smsTimeR;  
    }

    /**
	 * . 设置右值
	 *
	 * @column smsTimeR
	 *        右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setSmsTimeR(java.util.Date smsTime){  
        this.smsTimeR = smsTime;  
    }
	

	/**
	 * . 
	 */
    private java.util.Date topTime;
    /**
	 * . 获取
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getTopTime(){  
        return topTime;  
    }

    /**
	 * . 设置
	 *
	 * @column topTime
	 *        
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setTopTime(java.util.Date topTime){  
        this.topTime = topTime;  
    }
    
	/**
	 * . 左值
	 */
    private java.util.Date topTimeL;
    
	/**
	 * . 获取左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getTopTimeL(){  
        return topTimeL;  
    }

    /**
	 * . 设置左值
	 *
	 * @column topTimeL
	 *        左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setTopTimeL(java.util.Date topTime){  
        this.topTimeL = topTime;  
    }
    
	/**
	 * . 右值
	 */
    private java.util.Date topTimeR;
    
	/**
	 * . 获取右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getTopTimeR(){  
        return topTimeR;  
    }

    /**
	 * . 设置右值
	 *
	 * @column topTimeR
	 *        右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setTopTimeR(java.util.Date topTime){  
        this.topTimeR = topTime;  
    }
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String friendUserCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendUserCode(){  
        return friendUserCode;  
    }

    /**
	 * . 设置
	 *
	 * @column friendUserCode
	 *        
	 */
    public void setFriendUserCode(String friendUserCode){  
        this.friendUserCode = friendUserCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer feiendStatus;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getFeiendStatus(){  
        return feiendStatus;  
    }

    /**
	 * . 设置
	 *
	 * @column feiendStatus
	 *        
	 */
    public void setFeiendStatus(Integer feiendStatus){  
        this.feiendStatus = feiendStatus;  
    }
    
	

	/**
	 * . 
	 */
    private Integer groupType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getGroupType(){  
        return groupType;  
    }

    /**
	 * . 设置
	 *
	 * @column groupType
	 *        
	 */
    public void setGroupType(Integer groupType){  
        this.groupType = groupType;  
    }
    
	

	/**
	 * . 
	 */
    private String groupName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupName(){  
        return groupName;  
    }

    /**
	 * . 设置
	 *
	 * @column groupName
	 *        
	 */
    public void setGroupName(String groupName){  
        this.groupName = groupName;  
    }
    
	

	/**
	 * . 
	 */
    private String groupIcon;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupIcon(){  
        return groupIcon;  
    }

    /**
	 * . 设置
	 *
	 * @column groupIcon
	 *        
	 */
    public void setGroupIcon(String groupIcon){  
        this.groupIcon = groupIcon;  
    }
    
	

	/**
	 * . 
	 */
    private String userName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserName(){  
        return userName;  
    }

    /**
	 * . 设置
	 *
	 * @column userName
	 *        
	 */
    public void setUserName(String userName){  
        this.userName = userName;  
    }
    
	

	/**
	 * . 
	 */
    private String imgUrl;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getImgUrl(){  
        return imgUrl;  
    }

    /**
	 * . 设置
	 *
	 * @column imgUrl
	 *        
	 */
    public void setImgUrl(String imgUrl){  
        this.imgUrl = imgUrl;  
    }
    
    

	/**
	 * . 
	 */
    private String entCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置
	 *
	 * @column entCode
	 *        
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
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