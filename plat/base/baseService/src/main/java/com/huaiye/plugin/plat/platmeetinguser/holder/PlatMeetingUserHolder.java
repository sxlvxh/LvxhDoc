/*
 * .PlatMeetingUserHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmeetinguser.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 会议用户表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatMeetingUserHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 发起方用户账号
	 */
    private String meetingUserCode;
    /**
	 * . 获取发起方用户账号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingUserCode(){  
        return meetingUserCode;  
    }

    /**
	 * . 设置发起方用户账号
	 *
	 * @column meetingUserCode
	 *        发起方用户账号
	 */
    public void setMeetingUserCode(String meetingUserCode){  
        this.meetingUserCode = meetingUserCode;  
    }
    
	

	/**
	 * . 会议会话域编码， 同发起方域或对方域
	 */
    private String meetingDomainCode;
    /**
	 * . 获取会议会话域编码， 同发起方域或对方域
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingDomainCode(){  
        return meetingDomainCode;  
    }

    /**
	 * . 设置会议会话域编码， 同发起方域或对方域
	 *
	 * @column meetingDomainCode
	 *        会议会话域编码， 同发起方域或对方域
	 */
    public void setMeetingDomainCode(String meetingDomainCode){  
        this.meetingDomainCode = meetingDomainCode;  
    }
    
	

	/**
	 * . 参与人域编号
	 */
    private String meetingJoinDomainCode;
    /**
	 * . 获取参与人域编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingJoinDomainCode(){  
        return meetingJoinDomainCode;  
    }

    /**
	 * . 设置参与人域编号
	 *
	 * @column meetingJoinDomainCode
	 *        参与人域编号
	 */
    public void setMeetingJoinDomainCode(String meetingJoinDomainCode){  
        this.meetingJoinDomainCode = meetingJoinDomainCode;  
    }
    
	

	/**
	 * . 参与人登录账号
	 */
    private String meetingJoinUserCode;
    /**
	 * . 获取参与人登录账号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingJoinUserCode(){  
        return meetingJoinUserCode;  
    }

    /**
	 * . 设置参与人登录账号
	 *
	 * @column meetingJoinUserCode
	 *        参与人登录账号
	 */
    public void setMeetingJoinUserCode(String meetingJoinUserCode){  
        this.meetingJoinUserCode = meetingJoinUserCode;  
    }
    
	

	/**
	 * . 对讲编号
	 */
    private Integer meetingId;
    /**
	 * . 获取对讲编号
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingId(){  
        return meetingId;  
    }

    /**
	 * . 设置对讲编号
	 *
	 * @column meetingId
	 *        对讲编号
	 */
    public void setMeetingId(Integer meetingId){  
        this.meetingId = meetingId;  
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