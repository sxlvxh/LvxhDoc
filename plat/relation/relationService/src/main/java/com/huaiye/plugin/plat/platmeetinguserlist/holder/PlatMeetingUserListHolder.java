/*
 * .PlatMeetingUserListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmeetinguserlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 会议人员查询
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatMeetingUserListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String meetingUserCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingUserCode(){  
        return meetingUserCode;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingUserCode
	 *        
	 */
    public void setMeetingUserCode(String meetingUserCode){  
        this.meetingUserCode = meetingUserCode;  
    }
    
	

	/**
	 * . 
	 */
    private String meetingDomainCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingDomainCode(){  
        return meetingDomainCode;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingDomainCode
	 *        
	 */
    public void setMeetingDomainCode(String meetingDomainCode){  
        this.meetingDomainCode = meetingDomainCode;  
    }
    
	

	/**
	 * . 
	 */
    private String meetingJoinDomainCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingJoinDomainCode(){  
        return meetingJoinDomainCode;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingJoinDomainCode
	 *        
	 */
    public void setMeetingJoinDomainCode(String meetingJoinDomainCode){  
        this.meetingJoinDomainCode = meetingJoinDomainCode;  
    }
    
	

	/**
	 * . 
	 */
    private String meetingJoinUserCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingJoinUserCode(){  
        return meetingJoinUserCode;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingJoinUserCode
	 *        
	 */
    public void setMeetingJoinUserCode(String meetingJoinUserCode){  
        this.meetingJoinUserCode = meetingJoinUserCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingId;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingId(){  
        return meetingId;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingId
	 *        
	 */
    public void setMeetingId(Integer meetingId){  
        this.meetingId = meetingId;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String joinUserName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJoinUserName(){  
        return joinUserName;  
    }

    /**
	 * . 设置
	 *
	 * @column joinUserName
	 *        
	 */
    public void setJoinUserName(String joinUserName){  
        this.joinUserName = joinUserName;  
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