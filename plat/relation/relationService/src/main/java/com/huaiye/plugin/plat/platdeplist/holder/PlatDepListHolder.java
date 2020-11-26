/*
 * .PlatDepListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platdeplist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 部门列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatDepListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String name;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getName(){  
        return name;  
    }

    /**
	 * . 设置
	 *
	 * @column name
	 *        
	 */
    public void setName(String name){  
        this.name = name;  
    }
    
	

	/**
	 * . 
	 */
    private String parentCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentCode(){  
        return parentCode;  
    }

    /**
	 * . 设置
	 *
	 * @column parentCode
	 *        
	 */
    public void setParentCode(String parentCode){  
        this.parentCode = parentCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer depType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getDepType(){  
        return depType;  
    }

    /**
	 * . 设置
	 *
	 * @column depType
	 *        
	 */
    public void setDepType(Integer depType){  
        this.depType = depType;  
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
    private String userCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserCode(){  
        return userCode;  
    }

    /**
	 * . 设置
	 *
	 * @column userCode
	 *        
	 */
    public void setUserCode(String userCode){  
        this.userCode = userCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer level;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getLevel(){  
        return level;  
    }

    /**
	 * . 设置
	 *
	 * @column level
	 *        
	 */
    public void setLevel(Integer level){  
        this.level = level;  
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
    private String depParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDepParams(){  
        return depParams;  
    }

    /**
	 * . 设置
	 *
	 * @column depParams
	 *        
	 */
    public void setDepParams(String depParams){  
        this.depParams = depParams;  
    }
    
	

	/**
	 * . 
	 */
    private String parentName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentName(){  
        return parentName;  
    }

    /**
	 * . 设置
	 *
	 * @column parentName
	 *        
	 */
    public void setParentName(String parentName){  
        this.parentName = parentName;  
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
    private String adminName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAdminName(){  
        return adminName;  
    }

    /**
	 * . 设置
	 *
	 * @column adminName
	 *        
	 */
    public void setAdminName(String adminName){  
        this.adminName = adminName;  
    }
    
	

	/**
	 * . 
	 */
    private String depTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDepTypeName(){  
        return depTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column depTypeName
	 *        
	 */
    public void setDepTypeName(String depTypeName){  
        this.depTypeName = depTypeName;  
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