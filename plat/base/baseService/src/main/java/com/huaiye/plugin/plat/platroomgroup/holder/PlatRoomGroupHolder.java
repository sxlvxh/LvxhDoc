/*
 * .PlatRoomGroupHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroomgroup.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 庭室分组
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoomGroupHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 庭室组名称
	 */
    private String groupName;
    /**
	 * . 获取庭室组名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupName(){  
        return groupName;  
    }

    /**
	 * . 设置庭室组名称
	 *
	 * @column groupName
	 *        庭室组名称
	 */
    public void setGroupName(String groupName){  
        this.groupName = groupName;  
    }
    
	

	/**
	 * . 组类型
	 */
    private Integer groupType;
    /**
	 * . 获取组类型
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getGroupType(){  
        return groupType;  
    }

    /**
	 * . 设置组类型
	 *
	 * @column groupType
	 *        组类型
	 */
    public void setGroupType(Integer groupType){  
        this.groupType = groupType;  
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
	 * . 分组编码
	 */
    private String groupCode;
    /**
	 * . 获取分组编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置分组编码
	 *
	 * @column groupCode
	 *        分组编码
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
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