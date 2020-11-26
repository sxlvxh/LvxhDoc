/*
 * .PlatRoleHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platrole.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 角色表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoleHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 角色名称
	 */
    private String roleName;
    /**
	 * . 获取角色名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoleName(){  
        return roleName;  
    }

    /**
	 * . 设置角色名称
	 *
	 * @column roleName
	 *        角色名称
	 */
    public void setRoleName(String roleName){  
        this.roleName = roleName;  
    }
    
	

	/**
	 * . 角色状态
	 */
    private String roleState;
    /**
	 * . 获取角色状态
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoleState(){  
        return roleState;  
    }

    /**
	 * . 设置角色状态
	 *
	 * @column roleState
	 *        角色状态
	 */
    public void setRoleState(String roleState){  
        this.roleState = roleState;  
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
	 * . 角色类型
	 */
    private String roleType;
    /**
	 * . 获取角色类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoleType(){  
        return roleType;  
    }

    /**
	 * . 设置角色类型
	 *
	 * @column roleType
	 *        角色类型
	 */
    public void setRoleType(String roleType){  
        this.roleType = roleType;  
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