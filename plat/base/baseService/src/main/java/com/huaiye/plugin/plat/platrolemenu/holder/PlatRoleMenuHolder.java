/*
 * .PlatRoleMenuHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platrolemenu.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 角色菜单表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoleMenuHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 角色ID(对应T_ROLE表ID字段)
	 */
    private Integer roleId;
    /**
	 * . 获取角色ID(对应T_ROLE表ID字段)
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getRoleId(){  
        return roleId;  
    }

    /**
	 * . 设置角色ID(对应T_ROLE表ID字段)
	 *
	 * @column roleId
	 *        角色ID(对应T_ROLE表ID字段)
	 */
    public void setRoleId(Integer roleId){  
        this.roleId = roleId;  
    }
    
	

	/**
	 * . 菜单编号/按钮编号
	 */
    private String menuCode;
    /**
	 * . 获取菜单编号/按钮编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuCode(){  
        return menuCode;  
    }

    /**
	 * . 设置菜单编号/按钮编号
	 *
	 * @column menuCode
	 *        菜单编号/按钮编号
	 */
    public void setMenuCode(String menuCode){  
        this.menuCode = menuCode;  
    }
    
	

	

	

	

	

	

	/**
	 * . 菜单类型
	 */
    private Integer menuType;
    /**
	 * . 获取菜单类型
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getMenuType(){  
        return menuType;  
    }

    /**
	 * . 设置菜单类型
	 *
	 * @column menuType
	 *        菜单类型
	 */
    public void setMenuType(Integer menuType){  
        this.menuType = menuType;  
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