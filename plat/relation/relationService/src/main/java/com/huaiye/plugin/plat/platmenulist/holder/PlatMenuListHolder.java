/*
 * .PlatMenuListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmenulist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 菜单列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatMenuListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String menuCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuCode(){  
        return menuCode;  
    }

    /**
	 * . 设置
	 *
	 * @column menuCode
	 *        
	 */
    public void setMenuCode(String menuCode){  
        this.menuCode = menuCode;  
    }
    
	

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
    private String description;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDescription(){  
        return description;  
    }

    /**
	 * . 设置
	 *
	 * @column description
	 *        
	 */
    public void setDescription(String description){  
        this.description = description;  
    }
    
	

	/**
	 * . 
	 */
    private String menuUrl;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuUrl(){  
        return menuUrl;  
    }

    /**
	 * . 设置
	 *
	 * @column menuUrl
	 *        
	 */
    public void setMenuUrl(String menuUrl){  
        this.menuUrl = menuUrl;  
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
    private String imgUrl;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getImgUrl(){  
        return imgUrl;  
    }

    /**
	 * . 设置
	 *
	 * @column imgUrl
	 *        
	 */
    public void setImgUrl(String imgUrl){  
        this.imgUrl = imgUrl;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String modelCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelCode(){  
        return modelCode;  
    }

    /**
	 * . 设置
	 *
	 * @column modelCode
	 *        
	 */
    public void setModelCode(String modelCode){  
        this.modelCode = modelCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer menuType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMenuType(){  
        return menuType;  
    }

    /**
	 * . 设置
	 *
	 * @column menuType
	 *        
	 */
    public void setMenuType(Integer menuType){  
        this.menuType = menuType;  
    }
    
	

	/**
	 * . 
	 */
    private String menuParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuParams(){  
        return menuParams;  
    }

    /**
	 * . 设置
	 *
	 * @column menuParams
	 *        
	 */
    public void setMenuParams(String menuParams){  
        this.menuParams = menuParams;  
    }
    
	

	/**
	 * . 
	 */
    private String modelName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelName(){  
        return modelName;  
    }

    /**
	 * . 设置
	 *
	 * @column modelName
	 *        
	 */
    public void setModelName(String modelName){  
        this.modelName = modelName;  
    }
    
	

	/**
	 * . 
	 */
    private String menuTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuTypeName(){  
        return menuTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column menuTypeName
	 *        
	 */
    public void setMenuTypeName(String menuTypeName){  
        this.menuTypeName = menuTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String productCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getProductCode(){  
        return productCode;  
    }

    /**
	 * . 设置
	 *
	 * @column productCode
	 *        
	 */
    public void setProductCode(String productCode){  
        this.productCode = productCode;  
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