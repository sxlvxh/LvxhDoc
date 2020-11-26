/*
 * .PlatMeetingHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmeeting.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 会议表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatMeetingHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 会议编号
	 */
    private String serviceCode;
    /**
	 * . 获取会议编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getServiceCode(){  
        return serviceCode;  
    }

    /**
	 * . 设置会议编号
	 *
	 * @column serviceCode
	 *        会议编号
	 */
    public void setServiceCode(String serviceCode){  
        this.serviceCode = serviceCode;  
    }
    
	

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
	 * . 会议标题
	 */
    private String meetingName;
    /**
	 * . 获取会议标题
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingName(){  
        return meetingName;  
    }

    /**
	 * . 设置会议标题
	 *
	 * @column meetingName
	 *        会议标题
	 */
    public void setMeetingName(String meetingName){  
        this.meetingName = meetingName;  
    }
    
	

	/**
	 * . 会议描述
	 */
    private String meetingDesc;
    /**
	 * . 获取会议描述
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingDesc(){  
        return meetingDesc;  
    }

    /**
	 * . 设置会议描述
	 *
	 * @column meetingDesc
	 *        会议描述
	 */
    public void setMeetingDesc(String meetingDesc){  
        this.meetingDesc = meetingDesc;  
    }
    
	

	/**
	 * . 透明参数
	 */
    private String meetingTrunkPara;
    /**
	 * . 获取透明参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMeetingTrunkPara(){  
        return meetingTrunkPara;  
    }

    /**
	 * . 设置透明参数
	 *
	 * @column meetingTrunkPara
	 *        透明参数
	 */
    public void setMeetingTrunkPara(String meetingTrunkPara){  
        this.meetingTrunkPara = meetingTrunkPara;  
    }
    
	

	/**
	 * . 会议模式 1： 自由模式 2： 主持模式（大小画面）
	 */
    private Integer meetingMode;
    /**
	 * . 获取会议模式 1： 自由模式 2： 主持模式（大小画面）
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingMode(){  
        return meetingMode;  
    }

    /**
	 * . 设置会议模式 1： 自由模式 2： 主持模式（大小画面）
	 *
	 * @column meetingMode
	 *        会议模式 1： 自由模式 2： 主持模式（大小画面）
	 */
    public void setMeetingMode(Integer meetingMode){  
        this.meetingMode = meetingMode;  
    }
    
	

	/**
	 * . 是否录像 0 不录像 1： 录像
	 */
    private Integer meetingRecord;
    /**
	 * . 获取是否录像 0 不录像 1： 录像
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingRecord(){  
        return meetingRecord;  
    }

    /**
	 * . 设置是否录像 0 不录像 1： 录像
	 *
	 * @column meetingRecord
	 *        是否录像 0 不录像 1： 录像
	 */
    public void setMeetingRecord(Integer meetingRecord){  
        this.meetingRecord = meetingRecord;  
    }
    
	

	/**
	 * . 参加方式（1 正常 2 强制）
	 */
    private Integer meetingInviteStyle;
    /**
	 * . 获取参加方式（1 正常 2 强制）
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingInviteStyle(){  
        return meetingInviteStyle;  
    }

    /**
	 * . 设置参加方式（1 正常 2 强制）
	 *
	 * @column meetingInviteStyle
	 *        参加方式（1 正常 2 强制）
	 */
    public void setMeetingInviteStyle(Integer meetingInviteStyle){  
        this.meetingInviteStyle = meetingInviteStyle;  
    }
    
	

	/**
	 * . 对讲模式 0： 音视频 1 语音
	 */
    private Integer meetingVoiceIntercom;
    /**
	 * . 获取对讲模式 0： 音视频 1 语音
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingVoiceIntercom(){  
        return meetingVoiceIntercom;  
    }

    /**
	 * . 设置对讲模式 0： 音视频 1 语音
	 *
	 * @column meetingVoiceIntercom
	 *        对讲模式 0： 音视频 1 语音
	 */
    public void setMeetingVoiceIntercom(Integer meetingVoiceIntercom){  
        this.meetingVoiceIntercom = meetingVoiceIntercom;  
    }
    
	

	/**
	 * . 会议id
	 */
    private Integer meetingId;
    /**
	 * . 获取会议id
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingId(){  
        return meetingId;  
    }

    /**
	 * . 设置会议id
	 *
	 * @column meetingId
	 *        会议id
	 */
    public void setMeetingId(Integer meetingId){  
        this.meetingId = meetingId;  
    }
    
	

	/**
	 * . 会议开始时间
	 */
    private java.util.Date meetingStartTime;
    /**
	 * . 获取会议开始时间
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMeetingStartTime(){  
        return meetingStartTime;  
    }

    /**
	 * . 设置会议开始时间
	 *
	 * @column meetingStartTime
	 *        会议开始时间
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMeetingStartTime(java.util.Date meetingStartTime){  
        this.meetingStartTime = meetingStartTime;  
    }
    
	/**
	 * . 会议开始时间左值
	 */
    private java.util.Date meetingStartTimeL;
    
	/**
	 * . 获取会议开始时间左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMeetingStartTimeL(){  
        return meetingStartTimeL;  
    }

    /**
	 * . 设置会议开始时间左值
	 *
	 * @column meetingStartTimeL
	 *        会议开始时间左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMeetingStartTimeL(java.util.Date meetingStartTime){  
        this.meetingStartTimeL = meetingStartTime;  
    }
    
	/**
	 * . 会议开始时间右值
	 */
    private java.util.Date meetingStartTimeR;
    
	/**
	 * . 获取会议开始时间右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getMeetingStartTimeR(){  
        return meetingStartTimeR;  
    }

    /**
	 * . 设置会议开始时间右值
	 *
	 * @column meetingStartTimeR
	 *        会议开始时间右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setMeetingStartTimeR(java.util.Date meetingStartTime){  
        this.meetingStartTimeR = meetingStartTime;  
    }
	

	/**
	 * . 对讲状态 1 正在进行 2 已经结束
	 */
    private Integer meetingStatus;
    /**
	 * . 获取对讲状态 1 正在进行 2 已经结束
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingStatus(){  
        return meetingStatus;  
    }

    /**
	 * . 设置对讲状态 1 正在进行 2 已经结束
	 *
	 * @column meetingStatus
	 *        对讲状态 1 正在进行 2 已经结束
	 */
    public void setMeetingStatus(Integer meetingStatus){  
        this.meetingStatus = meetingStatus;  
    }
    
	

	/**
	 * . 会议时长， 单位为秒
	 */
    private Integer meetingTimeDuration;
    /**
	 * . 获取会议时长， 单位为秒
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingTimeDuration(){  
        return meetingTimeDuration;  
    }

    /**
	 * . 设置会议时长， 单位为秒
	 *
	 * @column meetingTimeDuration
	 *        会议时长， 单位为秒
	 */
    public void setMeetingTimeDuration(Integer meetingTimeDuration){  
        this.meetingTimeDuration = meetingTimeDuration;  
    }
    
	

	/**
	 * . 会议类型。0:普通会议,1:一键求助
	 */
    private Integer meetingType;
    /**
	 * . 获取会议类型。0:普通会议,1:一键求助
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMeetingType(){  
        return meetingType;  
    }

    /**
	 * . 设置会议类型。0:普通会议,1:一键求助
	 *
	 * @column meetingType
	 *        会议类型。0:普通会议,1:一键求助
	 */
    public void setMeetingType(Integer meetingType){  
        this.meetingType = meetingType;  
    }
    
	

	/**
	 * . 录像id
	 */
    private Integer recordId;
    /**
	 * . 获取录像id
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getRecordId(){  
        return recordId;  
    }

    /**
	 * . 设置录像id
	 *
	 * @column recordId
	 *        录像id
	 */
    public void setRecordId(Integer recordId){  
        this.recordId = recordId;  
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