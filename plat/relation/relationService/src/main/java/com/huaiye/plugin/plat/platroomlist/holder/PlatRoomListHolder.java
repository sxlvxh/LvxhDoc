/*
 * .PlatRoomListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroomlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 房间列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoomListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String roomName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomName(){  
        return roomName;  
    }

    /**
	 * . 设置
	 *
	 * @column roomName
	 *        
	 */
    public void setRoomName(String roomName){  
        this.roomName = roomName;  
    }
    
	

	/**
	 * . 
	 */
    private String groupCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置
	 *
	 * @column groupCode
	 *        
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer priority;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getPriority(){  
        return priority;  
    }

    /**
	 * . 设置
	 *
	 * @column priority
	 *        
	 */
    public void setPriority(Integer priority){  
        this.priority = priority;  
    }
    
	

	/**
	 * . 
	 */
    private String roomType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomType(){  
        return roomType;  
    }

    /**
	 * . 设置
	 *
	 * @column roomType
	 *        
	 */
    public void setRoomType(String roomType){  
        this.roomType = roomType;  
    }
    
	

	

	/**
	 * . 
	 */
    private String roomCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomCode(){  
        return roomCode;  
    }

    /**
	 * . 设置
	 *
	 * @column roomCode
	 *        
	 */
    public void setRoomCode(String roomCode){  
        this.roomCode = roomCode;  
    }
    
	

	/**
	 * . 
	 */
    private String entCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置
	 *
	 * @column entCode
	 *        
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
    }
    
	

	/**
	 * . 
	 */
    private String depCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDepCode(){  
        return depCode;  
    }

    /**
	 * . 设置
	 *
	 * @column depCode
	 *        
	 */
    public void setDepCode(String depCode){  
        this.depCode = depCode;  
    }
    
	

	

	

	

	

	/**
	 * . 
	 */
    private String groupName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupName(){  
        return groupName;  
    }

    /**
	 * . 设置
	 *
	 * @column groupName
	 *        
	 */
    public void setGroupName(String groupName){  
        this.groupName = groupName;  
    }
    
	

	/**
	 * . 
	 */
    private String entName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntName(){  
        return entName;  
    }

    /**
	 * . 设置
	 *
	 * @column entName
	 *        
	 */
    public void setEntName(String entName){  
        this.entName = entName;  
    }
    
	

	/**
	 * . 
	 */
    private String roomTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoomTypeName(){  
        return roomTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column roomTypeName
	 *        
	 */
    public void setRoomTypeName(String roomTypeName){  
        this.roomTypeName = roomTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String activeEntCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getActiveEntCode(){  
        return activeEntCode;  
    }

    /**
	 * . 设置
	 *
	 * @column activeEntCode
	 *        
	 */
    public void setActiveEntCode(String activeEntCode){  
        this.activeEntCode = activeEntCode;  
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