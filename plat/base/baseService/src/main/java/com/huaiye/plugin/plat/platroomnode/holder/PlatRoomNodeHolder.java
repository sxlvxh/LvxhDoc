/*
 * .PlatRoomNodeHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroomnode.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 采集点表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoomNodeHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 采集点名称
	 */
    private String roomNodeName;
    /**
	 * . 获取采集点名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomNodeName(){  
        return roomNodeName;  
    }

    /**
	 * . 设置采集点名称
	 *
	 * @column roomNodeName
	 *        采集点名称
	 */
    public void setRoomNodeName(String roomNodeName){  
        this.roomNodeName = roomNodeName;  
    }
    
	

	/**
	 * . 房间编码
	 */
    private String roomCode;
    /**
	 * . 获取房间编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomCode(){  
        return roomCode;  
    }

    /**
	 * . 设置房间编码
	 *
	 * @column roomCode
	 *        房间编码
	 */
    public void setRoomCode(String roomCode){  
        this.roomCode = roomCode;  
    }
    
	

	/**
	 * . 采集点类型
	 */
    private String roomNodeType;
    /**
	 * . 获取采集点类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomNodeType(){  
        return roomNodeType;  
    }

    /**
	 * . 设置采集点类型
	 *
	 * @column roomNodeType
	 *        采集点类型
	 */
    public void setRoomNodeType(String roomNodeType){  
        this.roomNodeType = roomNodeType;  
    }
    
	

	/**
	 * . SIE域编号
	 */
    private String domainCode;
    /**
	 * . 获取SIE域编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDomainCode(){  
        return domainCode;  
    }

    /**
	 * . 设置SIE域编号
	 *
	 * @column domainCode
	 *        SIE域编号
	 */
    public void setDomainCode(String domainCode){  
        this.domainCode = domainCode;  
    }
    
	

	/**
	 * . SIE域名称
	 */
    private String domainName;
    /**
	 * . 获取SIE域名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDomainName(){  
        return domainName;  
    }

    /**
	 * . 设置SIE域名称
	 *
	 * @column domainName
	 *        SIE域名称
	 */
    public void setDomainName(String domainName){  
        this.domainName = domainName;  
    }
    
	

	/**
	 * . SIE设备编号
	 */
    private String devCode;
    /**
	 * . 获取SIE设备编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDevCode(){  
        return devCode;  
    }

    /**
	 * . 设置SIE设备编号
	 *
	 * @column devCode
	 *        SIE设备编号
	 */
    public void setDevCode(String devCode){  
        this.devCode = devCode;  
    }
    
	

	/**
	 * . SIE设备名称
	 */
    private String devName;
    /**
	 * . 获取SIE设备名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDevName(){  
        return devName;  
    }

    /**
	 * . 设置SIE设备名称
	 *
	 * @column devName
	 *        SIE设备名称
	 */
    public void setDevName(String devName){  
        this.devName = devName;  
    }
    
	

	/**
	 * . SIE通道编号
	 */
    private String videoChannelCode;
    /**
	 * . 获取SIE通道编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getVideoChannelCode(){  
        return videoChannelCode;  
    }

    /**
	 * . 设置SIE通道编号
	 *
	 * @column videoChannelCode
	 *        SIE通道编号
	 */
    public void setVideoChannelCode(String videoChannelCode){  
        this.videoChannelCode = videoChannelCode;  
    }
    
	

	/**
	 * . SIE通道名称
	 */
    private String videoChannelName;
    /**
	 * . 获取SIE通道名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getVideoChannelName(){  
        return videoChannelName;  
    }

    /**
	 * . 设置SIE通道名称
	 *
	 * @column videoChannelName
	 *        SIE通道名称
	 */
    public void setVideoChannelName(String videoChannelName){  
        this.videoChannelName = videoChannelName;  
    }
    
	

	/**
	 * . SIE流编号
	 */
    private String videoStreamCode;
    /**
	 * . 获取SIE流编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getVideoStreamCode(){  
        return videoStreamCode;  
    }

    /**
	 * . 设置SIE流编号
	 *
	 * @column videoStreamCode
	 *        SIE流编号
	 */
    public void setVideoStreamCode(String videoStreamCode){  
        this.videoStreamCode = videoStreamCode;  
    }
    
	

	/**
	 * . SIE流名称
	 */
    private String videoStreamName;
    /**
	 * . 获取SIE流名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getVideoStreamName(){  
        return videoStreamName;  
    }

    /**
	 * . 设置SIE流名称
	 *
	 * @column videoStreamName
	 *        SIE流名称
	 */
    public void setVideoStreamName(String videoStreamName){  
        this.videoStreamName = videoStreamName;  
    }
    
	

	/**
	 * . 主副码流标志位  1：主码流   其他为辅码流
	 */
    private Integer videoStreamType;
    /**
	 * . 获取主副码流标志位  1：主码流   其他为辅码流
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getVideoStreamType(){  
        return videoStreamType;  
    }

    /**
	 * . 设置主副码流标志位  1：主码流   其他为辅码流
	 *
	 * @column videoStreamType
	 *        主副码流标志位  1：主码流   其他为辅码流
	 */
    public void setVideoStreamType(Integer videoStreamType){  
        this.videoStreamType = videoStreamType;  
    }
    
	

	/**
	 * . 是否播放声音  0 是 1 否
	 */
    private Integer voiceFlag;
    /**
	 * . 获取是否播放声音  0 是 1 否
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getVoiceFlag(){  
        return voiceFlag;  
    }

    /**
	 * . 设置是否播放声音  0 是 1 否
	 *
	 * @column voiceFlag
	 *        是否播放声音  0 是 1 否
	 */
    public void setVoiceFlag(Integer voiceFlag){  
        this.voiceFlag = voiceFlag;  
    }
    
	

	/**
	 * . 合成画面标识   0 是 1 否
	 */
    private Integer synthesisFlag;
    /**
	 * . 获取合成画面标识   0 是 1 否
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getSynthesisFlag(){  
        return synthesisFlag;  
    }

    /**
	 * . 设置合成画面标识   0 是 1 否
	 *
	 * @column synthesisFlag
	 *        合成画面标识   0 是 1 否
	 */
    public void setSynthesisFlag(Integer synthesisFlag){  
        this.synthesisFlag = synthesisFlag;  
    }
    
	

	/**
	 * . 传输协议 0 : UDP 1: TCP
	 */
    private Integer transProtocol;
    /**
	 * . 获取传输协议 0 : UDP 1: TCP
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getTransProtocol(){  
        return transProtocol;  
    }

    /**
	 * . 设置传输协议 0 : UDP 1: TCP
	 *
	 * @column transProtocol
	 *        传输协议 0 : UDP 1: TCP
	 */
    public void setTransProtocol(Integer transProtocol){  
        this.transProtocol = transProtocol;  
    }
    
	

	/**
	 * . 是否支持手机端副码流观摩 0 是 1 否
	 */
    private Integer streamViceFlag;
    /**
	 * . 获取是否支持手机端副码流观摩 0 是 1 否
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getStreamViceFlag(){  
        return streamViceFlag;  
    }

    /**
	 * . 设置是否支持手机端副码流观摩 0 是 1 否
	 *
	 * @column streamViceFlag
	 *        是否支持手机端副码流观摩 0 是 1 否
	 */
    public void setStreamViceFlag(Integer streamViceFlag){  
        this.streamViceFlag = streamViceFlag;  
    }
    
	

	/**
	 * . RTSP地址
	 */
    private String rtspUrl;
    /**
	 * . 获取RTSP地址
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRtspUrl(){  
        return rtspUrl;  
    }

    /**
	 * . 设置RTSP地址
	 *
	 * @column rtspUrl
	 *        RTSP地址
	 */
    public void setRtspUrl(String rtspUrl){  
        this.rtspUrl = rtspUrl;  
    }
    
	

	/**
	 * . 经度
	 */
    private String lng;
    /**
	 * . 获取经度
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLng(){  
        return lng;  
    }

    /**
	 * . 设置经度
	 *
	 * @column lng
	 *        经度
	 */
    public void setLng(String lng){  
        this.lng = lng;  
    }
    
	

	/**
	 * . 纬度
	 */
    private String lat;
    /**
	 * . 获取纬度
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLat(){  
        return lat;  
    }

    /**
	 * . 设置纬度
	 *
	 * @column lat
	 *        纬度
	 */
    public void setLat(String lat){  
        this.lat = lat;  
    }
    
	

	/**
	 * . 编号
	 */
    private String roomNodeCode;
    /**
	 * . 获取编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomNodeCode(){  
        return roomNodeCode;  
    }

    /**
	 * . 设置编号
	 *
	 * @column roomNodeCode
	 *        编号
	 */
    public void setRoomNodeCode(String roomNodeCode){  
        this.roomNodeCode = roomNodeCode;  
    }
    
	

	/**
	 * . 扩展参数
	 */
    private String extParams;
    /**
	 * . 获取扩展参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getExtParams(){  
        return extParams;  
    }

    /**
	 * . 设置扩展参数
	 *
	 * @column extParams
	 *        扩展参数
	 */
    public void setExtParams(String extParams){  
        this.extParams = extParams;  
    }
    
	

	

	

	

	

	

	/**
	 * . 企业编码
	 */
    private String entCode;
    /**
	 * . 获取企业编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置企业编码
	 *
	 * @column entCode
	 *        企业编码
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
    }
    
	

	/**
	 * . 部门编号
	 */
    private String depCode;
    /**
	 * . 获取部门编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDepCode(){  
        return depCode;  
    }

    /**
	 * . 设置部门编号
	 *
	 * @column depCode
	 *        部门编号
	 */
    public void setDepCode(String depCode){  
        this.depCode = depCode;  
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