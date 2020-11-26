/*
 * .PlatRoomHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroom.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 庭室
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoomHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 房间名称
	 */
    private String roomName;
    /**
	 * . 获取房间名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomName(){  
        return roomName;  
    }

    /**
	 * . 设置房间名称
	 *
	 * @column roomName
	 *        房间名称
	 */
    public void setRoomName(String roomName){  
        this.roomName = roomName;  
    }
    
	

	/**
	 * . 分组编号
	 */
    private String groupCode;
    /**
	 * . 获取分组编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置分组编号
	 *
	 * @column groupCode
	 *        分组编号
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
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
	 * . 法庭类型
	 */
    private String roomType;
    /**
	 * . 获取法庭类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomType(){  
        return roomType;  
    }

    /**
	 * . 设置法庭类型
	 *
	 * @column roomType
	 *        法庭类型
	 */
    public void setRoomType(String roomType){  
        this.roomType = roomType;  
    }
    
	

	

	/**
	 * . 法庭编号
	 */
    private String roomCode;
    /**
	 * . 获取法庭编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomCode(){  
        return roomCode;  
    }

    /**
	 * . 设置法庭编号
	 *
	 * @column roomCode
	 *        法庭编号
	 */
    public void setRoomCode(String roomCode){  
        this.roomCode = roomCode;  
    }
    
	

	/**
	 * . 所属企业
	 */
    private String entCode;
    /**
	 * . 获取所属企业
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置所属企业
	 *
	 * @column entCode
	 *        所属企业
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