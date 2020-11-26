/*
 * .PlatEntListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platentlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 查询企业列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatEntListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

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
    private String entType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntType(){  
        return entType;  
    }

    /**
	 * . 设置
	 *
	 * @column entType
	 *        
	 */
    public void setEntType(String entType){  
        this.entType = entType;  
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
    private String shortName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getShortName(){  
        return shortName;  
    }

    /**
	 * . 设置
	 *
	 * @column shortName
	 *        
	 */
    public void setShortName(String shortName){  
        this.shortName = shortName;  
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
    private String entParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntParams(){  
        return entParams;  
    }

    /**
	 * . 设置
	 *
	 * @column entParams
	 *        
	 */
    public void setEntParams(String entParams){  
        this.entParams = entParams;  
    }
    
	

	/**
	 * . 
	 */
    private String parentEntName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentEntName(){  
        return parentEntName;  
    }

    /**
	 * . 设置
	 *
	 * @column parentEntName
	 *        
	 */
    public void setParentEntName(String parentEntName){  
        this.parentEntName = parentEntName;  
    }
    
	

	/**
	 * . 
	 */
    private String entTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntTypeName(){  
        return entTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column entTypeName
	 *        
	 */
    public void setEntTypeName(String entTypeName){  
        this.entTypeName = entTypeName;  
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