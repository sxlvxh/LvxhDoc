/*
 * .PlatMenuHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmenu.holder;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.huaiye.plugin.plat.platbutton.holder.PlatButtonHolder;
import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 菜单
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatMenuHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;


	
	/**
	 * . 菜单编码
	 */
    private String menuCode;
    /**
	 * . 获取菜单编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuCode(){  
        return menuCode;  
    }

    /**
	 * . 设置菜单编码
	 *
	 * @column menuCode
	 *        菜单编码
	 */
    public void setMenuCode(String menuCode){  
        this.menuCode = menuCode;  
    }
    
	

	/**
	 * . 菜单名称
	 */
    private String name;
    /**
	 * . 获取菜单名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getName(){  
        return name;  
    }

    /**
	 * . 设置菜单名称
	 *
	 * @column name
	 *        菜单名称
	 */
    public void setName(String name){  
        this.name = name;  
    }
    
	

	/**
	 * . 菜单描述
	 */
    private String description;
    /**
	 * . 获取菜单描述
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDescription(){  
        return description;  
    }

    /**
	 * . 设置菜单描述
	 *
	 * @column description
	 *        菜单描述
	 */
    public void setDescription(String description){  
        this.description = description;  
    }
    
	

	/**
	 * . 菜单请求地址
	 */
    private String menuUrl;
    /**
	 * . 获取菜单请求地址
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuUrl(){  
        return menuUrl;  
    }

    /**
	 * . 设置菜单请求地址
	 *
	 * @column menuUrl
	 *        菜单请求地址
	 */
    public void setMenuUrl(String menuUrl){  
        this.menuUrl = menuUrl;  
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
	 * . 父节点编号
	 */
    private String parentCode;
    /**
	 * . 获取父节点编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentCode(){  
        return parentCode;  
    }

    /**
	 * . 设置父节点编号
	 *
	 * @column parentCode
	 *        父节点编号
	 */
    public void setParentCode(String parentCode){  
        this.parentCode = parentCode;  
    }
    
	

	/**
	 * . 菜单层级
	 */
    private Integer level;
    /**
	 * . 获取菜单层级
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getLevel(){  
        return level;  
    }

    /**
	 * . 设置菜单层级
	 *
	 * @column level
	 *        菜单层级
	 */
    public void setLevel(Integer level){  
        this.level = level;  
    }
    
	

	/**
	 * . 菜单图片
	 */
    private String imgUrl;
    /**
	 * . 获取菜单图片
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getImgUrl(){  
        return imgUrl;  
    }

    /**
	 * . 设置菜单图片
	 *
	 * @column imgUrl
	 *        菜单图片
	 */
    public void setImgUrl(String imgUrl){  
        this.imgUrl = imgUrl;  
    }
    
	

	

	

	

	

	

	/**
	 * . 模块编码
	 */
    private String modelCode;
    /**
	 * . 获取模块编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getModelCode(){  
        return modelCode;  
    }

    /**
	 * . 设置模块编码
	 *
	 * @column modelCode
	 *        模块编码
	 */
    public void setModelCode(String modelCode){  
        this.modelCode = modelCode;  
    }
    
	

	/**
	 * . 菜单类型 0: Pc 1:移动应用
	 */
    private Integer menuType;
    /**
	 * . 获取菜单类型 0: Pc 1:移动应用
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMenuType(){  
        return menuType;  
    }

    /**
	 * . 设置菜单类型 0: Pc 1:移动应用
	 *
	 * @column menuType
	 *        菜单类型 0: Pc 1:移动应用
	 */
    public void setMenuType(Integer menuType){  
        this.menuType = menuType;  
    }
    
	

	/**
	 * . 菜单配置项
	 */
    private String menuParams;
    /**
	 * . 获取菜单配置项
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuParams(){  
        return menuParams;  
    }

    /**
	 * . 设置菜单配置项
	 *
	 * @column menuParams
	 *        菜单配置项
	 */
    public void setMenuParams(String menuParams){  
        this.menuParams = menuParams;  
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