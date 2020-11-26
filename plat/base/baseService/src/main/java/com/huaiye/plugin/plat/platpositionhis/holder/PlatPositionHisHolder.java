/*
 * .PlatPositionHisHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platpositionhis.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 人员当前位置历史
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatPositionHisHolder extends BaseBusinessHolder {
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
	 * . 来源状态 1 用户 2 设备 3 车辆
	 */
    private String sourceType;
    /**
	 * . 获取来源状态 1 用户 2 设备 3 车辆
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSourceType(){  
        return sourceType;  
    }

    /**
	 * . 设置来源状态 1 用户 2 设备 3 车辆
	 *
	 * @column sourceType
	 *        来源状态 1 用户 2 设备 3 车辆
	 */
    public void setSourceType(String sourceType){  
        this.sourceType = sourceType;  
    }
    
	

	/**
	 * . 经度
	 */
    private Double lng;
    /**
	 * . 获取经度
	 *
	 * @return Double
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Double getLng(){  
        return lng;  
    }

    /**
	 * . 设置经度
	 *
	 * @column lng
	 *        经度
	 */
    public void setLng(Double lng){  
        this.lng = lng;  
    }
    
	

	/**
	 * . 纬度
	 */
    private Double lat;
    /**
	 * . 获取纬度
	 *
	 * @return Double
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Double getLat(){  
        return lat;  
    }

    /**
	 * . 设置纬度
	 *
	 * @column lat
	 *        纬度
	 */
    public void setLat(Double lat){  
        this.lat = lat;  
    }
    
	

	/**
	 * . 地点位置
	 */
    private String place;
    /**
	 * . 获取地点位置
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPlace(){  
        return place;  
    }

    /**
	 * . 设置地点位置
	 *
	 * @column place
	 *        地点位置
	 */
    public void setPlace(String place){  
        this.place = place;  
    }
    
	

	/**
	 * . 附件
	 */
    private String fileUrl;
    /**
	 * . 获取附件
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFileUrl(){  
        return fileUrl;  
    }

    /**
	 * . 设置附件
	 *
	 * @column fileUrl
	 *        附件
	 */
    public void setFileUrl(String fileUrl){  
        this.fileUrl = fileUrl;  
    }
    
	

	/**
	 * . 坐标类型
	 */
    private String posType;
    /**
	 * . 获取坐标类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPosType(){  
        return posType;  
    }

    /**
	 * . 设置坐标类型
	 *
	 * @column posType
	 *        坐标类型
	 */
    public void setPosType(String posType){  
        this.posType = posType;  
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