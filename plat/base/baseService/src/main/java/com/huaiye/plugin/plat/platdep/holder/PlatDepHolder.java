/*
 * .PlatDepHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platdep.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 部门表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatDepHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 部门名称
	 */
    private String name;
    /**
	 * . 获取部门名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getName(){  
        return name;  
    }

    /**
	 * . 设置部门名称
	 *
	 * @column name
	 *        部门名称
	 */
    public void setName(String name){  
        this.name = name;  
    }
    
	

	/**
	 * . 父部门编号
	 */
    private String parentCode;
    /**
	 * . 获取父部门编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentCode(){  
        return parentCode;  
    }

    /**
	 * . 设置父部门编号
	 *
	 * @column parentCode
	 *        父部门编号
	 */
    public void setParentCode(String parentCode){  
        this.parentCode = parentCode;  
    }
    
	

	/**
	 * . 部门类型   对应数据字典：DEP_TYPE类型 1:默认类型 2 ：渣土
	 */
    private Integer depType;
    /**
	 * . 获取部门类型   对应数据字典：DEP_TYPE类型 1:默认类型 2 ：渣土
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getDepType(){  
        return depType;  
    }

    /**
	 * . 设置部门类型   对应数据字典：DEP_TYPE类型 1:默认类型 2 ：渣土
	 *
	 * @column depType
	 *        部门类型   对应数据字典：DEP_TYPE类型 1:默认类型 2 ：渣土
	 */
    public void setDepType(Integer depType){  
        this.depType = depType;  
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
	 * . 企业编号
	 */
    private String entCode;
    /**
	 * . 获取企业编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置企业编号
	 *
	 * @column entCode
	 *        企业编号
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
    }
    
	

	/**
	 * . 部门负责人
	 */
    private String userCode;
    /**
	 * . 获取部门负责人
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserCode(){  
        return userCode;  
    }

    /**
	 * . 设置部门负责人
	 *
	 * @column userCode
	 *        部门负责人
	 */
    public void setUserCode(String userCode){  
        this.userCode = userCode;  
    }
    
	

	/**
	 * . 部门级别
	 */
    private Integer level;
    /**
	 * . 获取部门级别
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getLevel(){  
        return level;  
    }

    /**
	 * . 设置部门级别
	 *
	 * @column level
	 *        部门级别
	 */
    public void setLevel(Integer level){  
        this.level = level;  
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
    
	

	/**
	 * . 部门参数
	 */
    private String depParams;
    /**
	 * . 获取部门参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDepParams(){  
        return depParams;  
    }

    /**
	 * . 设置部门参数
	 *
	 * @column depParams
	 *        部门参数
	 */
    public void setDepParams(String depParams){  
        this.depParams = depParams;  
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