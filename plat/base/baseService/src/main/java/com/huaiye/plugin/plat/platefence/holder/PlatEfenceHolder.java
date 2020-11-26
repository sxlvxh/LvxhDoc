/*
 * .PlatEfenceHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platefence.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 电子围栏
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatEfenceHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 企业编号
	 */
    private String entCode;
    /**
	 * . 获取企业编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置企业编号
	 *
	 * @column entCode
	 *        企业编号
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
    }
    
	

	/**
	 * . 部门编号 部门表dep_code
	 */
    private String deptId;
    /**
	 * . 获取部门编号 部门表dep_code
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDeptId(){  
        return deptId;  
    }

    /**
	 * . 设置部门编号 部门表dep_code
	 *
	 * @column deptId
	 *        部门编号 部门表dep_code
	 */
    public void setDeptId(String deptId){  
        this.deptId = deptId;  
    }
    
	

	/**
	 * . 名称
	 */
    private String efenceName;
    /**
	 * . 获取名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEfenceName(){  
        return efenceName;  
    }

    /**
	 * . 设置名称
	 *
	 * @column efenceName
	 *        名称
	 */
    public void setEfenceName(String efenceName){  
        this.efenceName = efenceName;  
    }
    
	

	/**
	 * . 简称(保留字段)
	 */
    private String shortName;
    /**
	 * . 获取简称(保留字段)
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getShortName(){  
        return shortName;  
    }

    /**
	 * . 设置简称(保留字段)
	 *
	 * @column shortName
	 *        简称(保留字段)
	 */
    public void setShortName(String shortName){  
        this.shortName = shortName;  
    }
    
	

	/**
	 * . 区域类型, 1 区域  2 岗点 3 巡查路线，4大区域
	 */
    private String areaType;
    /**
	 * . 获取区域类型, 1 区域  2 岗点 3 巡查路线，4大区域
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAreaType(){  
        return areaType;  
    }

    /**
	 * . 设置区域类型, 1 区域  2 岗点 3 巡查路线，4大区域
	 *
	 * @column areaType
	 *        区域类型, 1 区域  2 岗点 3 巡查路线，4大区域
	 */
    public void setAreaType(String areaType){  
        this.areaType = areaType;  
    }
    
	

	/**
	 * . 排序号
	 */
    private Integer orderSeq;
    /**
	 * . 获取排序号
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getOrderSeq(){  
        return orderSeq;  
    }

    /**
	 * . 设置排序号
	 *
	 * @column orderSeq
	 *        排序号
	 */
    public void setOrderSeq(Integer orderSeq){  
        this.orderSeq = orderSeq;  
    }
    
	

	/**
	 * . 备注
	 */
    private String remark;
    /**
	 * . 获取备注
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRemark(){  
        return remark;  
    }

    /**
	 * . 设置备注
	 *
	 * @column remark
	 *        备注
	 */
    public void setRemark(String remark){  
        this.remark = remark;  
    }
    
	

	

	

	

	

	

	/**
	 * . 状态
	 */
    private String status;
    /**
	 * . 获取状态
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getStatus(){  
        return status;  
    }

    /**
	 * . 设置状态
	 *
	 * @column status
	 *        状态
	 */
    public void setStatus(String status){  
        this.status = status;  
    }
    
	

	/**
	 * . 中心点经度
	 */
    private Double lng;
    /**
	 * . 获取中心点经度
	 *
	 * @return Double
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Double getLng(){  
        return lng;  
    }

    /**
	 * . 设置中心点经度
	 *
	 * @column lng
	 *        中心点经度
	 */
    public void setLng(Double lng){  
        this.lng = lng;  
    }
    
	

	/**
	 * . 中心点纬度
	 */
    private Double lat;
    /**
	 * . 获取中心点纬度
	 *
	 * @return Double
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Double getLat(){  
        return lat;  
    }

    /**
	 * . 设置中心点纬度
	 *
	 * @column lat
	 *        中心点纬度
	 */
    public void setLat(Double lat){  
        this.lat = lat;  
    }
    
	

	/**
	 * . 中心位置
	 */
    private String place;
    /**
	 * . 获取中心位置
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPlace(){  
        return place;  
    }

    /**
	 * . 设置中心位置
	 *
	 * @column place
	 *        中心位置
	 */
    public void setPlace(String place){  
        this.place = place;  
    }
    
	

	/**
	 * . 电子围栏标注
	 */
    private String tags;
    /**
	 * . 获取电子围栏标注
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTags(){  
        return tags;  
    }

    /**
	 * . 设置电子围栏标注
	 *
	 * @column tags
	 *        电子围栏标注
	 */
    public void setTags(String tags){  
        this.tags = tags;  
    }
    
	

	/**
	 * . 区域业务类型
	 */
    private Integer areaServiceType;
    /**
	 * . 获取区域业务类型
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getAreaServiceType(){  
        return areaServiceType;  
    }

    /**
	 * . 设置区域业务类型
	 *
	 * @column areaServiceType
	 *        区域业务类型
	 */
    public void setAreaServiceType(Integer areaServiceType){  
        this.areaServiceType = areaServiceType;  
    }
    
	

	/**
	 * . 父级ID
	 */
    private Integer parentId;
    /**
	 * . 获取父级ID
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getParentId(){  
        return parentId;  
    }

    /**
	 * . 设置父级ID
	 *
	 * @column parentId
	 *        父级ID
	 */
    public void setParentId(Integer parentId){  
        this.parentId = parentId;  
    }
    
	

	/**
	 * . 参数(包括区域样式，岗点范围数据)
	 */
    private String efenceParams;
    /**
	 * . 获取参数(包括区域样式，岗点范围数据)
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEfenceParams(){  
        return efenceParams;  
    }

    /**
	 * . 设置参数(包括区域样式，岗点范围数据)
	 *
	 * @column efenceParams
	 *        参数(包括区域样式，岗点范围数据)
	 */
    public void setEfenceParams(String efenceParams){  
        this.efenceParams = efenceParams;  
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