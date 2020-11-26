/*
 * .PlatUserRoleMbHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuserrolemb.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 查询用户的权限菜单和按钮
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatUserRoleMbHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

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
    private Integer roleId;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getRoleId(){  
        return roleId;  
    }

    /**
	 * . 设置
	 *
	 * @column roleId
	 *        
	 */
    public void setRoleId(Integer roleId){  
        this.roleId = roleId;  
    }
    
	

	

	

	

	

	

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