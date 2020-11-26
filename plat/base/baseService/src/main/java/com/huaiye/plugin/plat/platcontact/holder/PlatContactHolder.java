/*
 * .PlatContactHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontact.holder;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 联系人表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatContactHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;


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
	 * . 好友备注
	 */
    private String friendMark;
    /**
	 * . 获取好友备注
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendMark(){  
        return friendMark;  
    }

    /**
	 * . 设置好友备注
	 *
	 * @column friendMark
	 *        好友备注
	 */
    public void setFriendMark(String friendMark){  
        this.friendMark = friendMark;  
    }
    
	

	/**
	 * . 是否管理员：0 是 1 否
	 */
    private String isAdmin;
    /**
	 * . 获取是否管理员：0 是 1 否
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIsAdmin(){  
        return isAdmin;  
    }

    /**
	 * . 设置是否管理员：0 是 1 否
	 *
	 * @column isAdmin
	 *        是否管理员：0 是 1 否
	 */
    public void setIsAdmin(String isAdmin){  
        this.isAdmin = isAdmin;  
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
	 * . 最后收到消息时间
	 */
    private java.util.Date smsTime;
    /**
	 * . 获取最后收到消息时间
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getSmsTime(){  
        return smsTime;  
    }

    /**
	 * . 设置最后收到消息时间
	 *
	 * @column smsTime
	 *        最后收到消息时间
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setSmsTime(java.util.Date smsTime){  
        this.smsTime = smsTime;  
    }
    
	/**
	 * . 最后收到消息时间左值
	 */
    private java.util.Date smsTimeL;
    
	/**
	 * . 获取最后收到消息时间左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getSmsTimeL(){  
        return smsTimeL;  
    }

    /**
	 * . 设置最后收到消息时间左值
	 *
	 * @column smsTimeL
	 *        最后收到消息时间左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setSmsTimeL(java.util.Date smsTime){  
        this.smsTimeL = smsTime;  
    }
    
	/**
	 * . 最后收到消息时间右值
	 */
    private java.util.Date smsTimeR;
    
	/**
	 * . 获取最后收到消息时间右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getSmsTimeR(){  
        return smsTimeR;  
    }

    /**
	 * . 设置最后收到消息时间右值
	 *
	 * @column smsTimeR
	 *        最后收到消息时间右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setSmsTimeR(java.util.Date smsTime){  
        this.smsTimeR = smsTime;  
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
	 * . 好友编号
	 */
    private String friendUserCode;
    /**
	 * . 获取好友编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendUserCode(){  
        return friendUserCode;  
    }

    /**
	 * . 设置好友编号
	 *
	 * @column friendUserCode
	 *        好友编号
	 */
    public void setFriendUserCode(String friendUserCode){  
        this.friendUserCode = friendUserCode;  
    }
    
	

	/**
	 * . 是否已同意  0 是 1 否
	 */
    private Integer feiendStatus;
    /**
	 * . 获取是否已同意  0 是 1 否
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getFeiendStatus(){  
        return feiendStatus;  
    }

    /**
	 * . 设置是否已同意  0 是 1 否
	 *
	 * @column feiendStatus
	 *        是否已同意  0 是 1 否
	 */
    public void setFeiendStatus(Integer feiendStatus){  
        this.feiendStatus = feiendStatus;  
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