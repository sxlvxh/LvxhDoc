/*
 * .PlatMeetingListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmeetinglist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 会议查询列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatMeetingListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String serviceCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getServiceCode(){  
        return serviceCode;  
    }

    /**
	 * . 设置
	 *
	 * @column serviceCode
	 *        
	 */
    public void setServiceCode(String serviceCode){  
        this.serviceCode = serviceCode;  
    }
    
	

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
    private String meetingName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingName(){  
        return meetingName;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingName
	 *        
	 */
    public void setMeetingName(String meetingName){  
        this.meetingName = meetingName;  
    }
    
	

	/**
	 * . 
	 */
    private String meetingDesc;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingDesc(){  
        return meetingDesc;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingDesc
	 *        
	 */
    public void setMeetingDesc(String meetingDesc){  
        this.meetingDesc = meetingDesc;  
    }
    
	

	/**
	 * . 
	 */
    private String meetingTrunkPara;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingTrunkPara(){  
        return meetingTrunkPara;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingTrunkPara
	 *        
	 */
    public void setMeetingTrunkPara(String meetingTrunkPara){  
        this.meetingTrunkPara = meetingTrunkPara;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingMode;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingMode(){  
        return meetingMode;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingMode
	 *        
	 */
    public void setMeetingMode(Integer meetingMode){  
        this.meetingMode = meetingMode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingRecord;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingRecord(){  
        return meetingRecord;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingRecord
	 *        
	 */
    public void setMeetingRecord(Integer meetingRecord){  
        this.meetingRecord = meetingRecord;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingInviteStyle;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingInviteStyle(){  
        return meetingInviteStyle;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingInviteStyle
	 *        
	 */
    public void setMeetingInviteStyle(Integer meetingInviteStyle){  
        this.meetingInviteStyle = meetingInviteStyle;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingVoiceIntercom;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingVoiceIntercom(){  
        return meetingVoiceIntercom;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingVoiceIntercom
	 *        
	 */
    public void setMeetingVoiceIntercom(Integer meetingVoiceIntercom){  
        this.meetingVoiceIntercom = meetingVoiceIntercom;  
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
    private java.util.Date meetingStartTime;
    /**
	 * . 获取
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMeetingStartTime(){  
        return meetingStartTime;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingStartTime
	 *        
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMeetingStartTime(java.util.Date meetingStartTime){  
        this.meetingStartTime = meetingStartTime;  
    }
    
	/**
	 * . 左值
	 */
    private java.util.Date meetingStartTimeL;
    
	/**
	 * . 获取左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMeetingStartTimeL(){  
        return meetingStartTimeL;  
    }

    /**
	 * . 设置左值
	 *
	 * @column meetingStartTimeL
	 *        左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMeetingStartTimeL(java.util.Date meetingStartTime){  
        this.meetingStartTimeL = meetingStartTime;  
    }
    
	/**
	 * . 右值
	 */
    private java.util.Date meetingStartTimeR;
    
	/**
	 * . 获取右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMeetingStartTimeR(){  
        return meetingStartTimeR;  
    }

    /**
	 * . 设置右值
	 *
	 * @column meetingStartTimeR
	 *        右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMeetingStartTimeR(java.util.Date meetingStartTime){  
        this.meetingStartTimeR = meetingStartTime;  
    }
	

	/**
	 * . 
	 */
    private Integer meetingStatus;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingStatus(){  
        return meetingStatus;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingStatus
	 *        
	 */
    public void setMeetingStatus(Integer meetingStatus){  
        this.meetingStatus = meetingStatus;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingTimeDuration;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingTimeDuration(){  
        return meetingTimeDuration;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingTimeDuration
	 *        
	 */
    public void setMeetingTimeDuration(Integer meetingTimeDuration){  
        this.meetingTimeDuration = meetingTimeDuration;  
    }
    
	

	/**
	 * . 
	 */
    private Integer meetingType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingType(){  
        return meetingType;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingType
	 *        
	 */
    public void setMeetingType(Integer meetingType){  
        this.meetingType = meetingType;  
    }
    
	

	/**
	 * . 
	 */
    private Integer recordId;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getRecordId(){  
        return recordId;  
    }

    /**
	 * . 设置
	 *
	 * @column recordId
	 *        
	 */
    public void setRecordId(Integer recordId){  
        this.recordId = recordId;  
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
    private String meetingStatusName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingStatusName(){  
        return meetingStatusName;  
    }

    /**
	 * . 设置
	 *
	 * @column meetingStatusName
	 *        
	 */
    public void setMeetingStatusName(String meetingStatusName){  
        this.meetingStatusName = meetingStatusName;  
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