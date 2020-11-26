/*
 * .PlatDictHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platdict.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 基础数据表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatDictHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 数据ID
	 */
    private String dataId;
    /**
	 * . 获取数据ID
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDataId(){  
        return dataId;  
    }

    /**
	 * . 设置数据ID
	 *
	 * @column dataId
	 *        数据ID
	 */
    public void setDataId(String dataId){  
        this.dataId = dataId;  
    }
    
	

	/**
	 * . 数据名称
	 */
    private String dataName;
    /**
	 * . 获取数据名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDataName(){  
        return dataName;  
    }

    /**
	 * . 设置数据名称
	 *
	 * @column dataName
	 *        数据名称
	 */
    public void setDataName(String dataName){  
        this.dataName = dataName;  
    }
    
	

	/**
	 * . 分组ID
	 */
    private String groupId;
    /**
	 * . 获取分组ID
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupId(){  
        return groupId;  
    }

    /**
	 * . 设置分组ID
	 *
	 * @column groupId
	 *        分组ID
	 */
    public void setGroupId(String groupId){  
        this.groupId = groupId;  
    }
    
	

	/**
	 * . 分组名称
	 */
    private String groupName;
    /**
	 * . 获取分组名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupName(){  
        return groupName;  
    }

    /**
	 * . 设置分组名称
	 *
	 * @column groupName
	 *        分组名称
	 */
    public void setGroupName(String groupName){  
        this.groupName = groupName;  
    }
    
	

	/**
	 * . 分组类型
	 */
    private String groupType;
    /**
	 * . 获取分组类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupType(){  
        return groupType;  
    }

    /**
	 * . 设置分组类型
	 *
	 * @column groupType
	 *        分组类型
	 */
    public void setGroupType(String groupType){  
        this.groupType = groupType;  
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