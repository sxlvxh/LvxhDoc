/*
 * .PlatFieldHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platfield.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 页面属性表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatFieldHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 对应菜单
	 */
    private String menuCode;
    /**
	 * . 获取对应菜单
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuCode(){  
        return menuCode;  
    }

    /**
	 * . 设置对应菜单
	 *
	 * @column menuCode
	 *        对应菜单
	 */
    public void setMenuCode(String menuCode){  
        this.menuCode = menuCode;  
    }
    
	

	/**
	 * . 属性名称
	 */
    private String fieldName;
    /**
	 * . 获取属性名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldName(){  
        return fieldName;  
    }

    /**
	 * . 设置属性名称
	 *
	 * @column fieldName
	 *        属性名称
	 */
    public void setFieldName(String fieldName){  
        this.fieldName = fieldName;  
    }
    
	

	/**
	 * . 属性类型
	 */
    private String fieldType;
    /**
	 * . 获取属性类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldType(){  
        return fieldType;  
    }

    /**
	 * . 设置属性类型
	 *
	 * @column fieldType
	 *        属性类型
	 */
    public void setFieldType(String fieldType){  
        this.fieldType = fieldType;  
    }
    
	

	/**
	 * . 属性样式
	 */
    private String fieldStyle;
    /**
	 * . 获取属性样式
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldStyle(){  
        return fieldStyle;  
    }

    /**
	 * . 设置属性样式
	 *
	 * @column fieldStyle
	 *        属性样式
	 */
    public void setFieldStyle(String fieldStyle){  
        this.fieldStyle = fieldStyle;  
    }
    
	

	/**
	 * . 属性中文描述
	 */
    private String fieldLabel;
    /**
	 * . 获取属性中文描述
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldLabel(){  
        return fieldLabel;  
    }

    /**
	 * . 设置属性中文描述
	 *
	 * @column fieldLabel
	 *        属性中文描述
	 */
    public void setFieldLabel(String fieldLabel){  
        this.fieldLabel = fieldLabel;  
    }
    
	

	

	

	

	

	

	/**
	 * . 所属按钮
	 */
    private String buttonCode;
    /**
	 * . 获取所属按钮
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonCode(){  
        return buttonCode;  
    }

    /**
	 * . 设置所属按钮
	 *
	 * @column buttonCode
	 *        所属按钮
	 */
    public void setButtonCode(String buttonCode){  
        this.buttonCode = buttonCode;  
    }
    
	

	/**
	 * . 初始化参数
	 */
    private String fieldParams;
    /**
	 * . 获取初始化参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldParams(){  
        return fieldParams;  
    }

    /**
	 * . 设置初始化参数
	 *
	 * @column fieldParams
	 *        初始化参数
	 */
    public void setFieldParams(String fieldParams){  
        this.fieldParams = fieldParams;  
    }
    
	

	/**
	 * . 属性编号
	 */
    private String fieldCode;
    /**
	 * . 获取属性编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldCode(){  
        return fieldCode;  
    }

    /**
	 * . 设置属性编号
	 *
	 * @column fieldCode
	 *        属性编号
	 */
    public void setFieldCode(String fieldCode){  
        this.fieldCode = fieldCode;  
    }
    
	

	/**
	 * . 优先级
	 */
    private String priority;
    /**
	 * . 获取优先级
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPriority(){  
        return priority;  
    }

    /**
	 * . 设置优先级
	 *
	 * @column priority
	 *        优先级
	 */
    public void setPriority(String priority){  
        this.priority = priority;  
    }
    
	

	/**
	 * . 是否启用 0 启用 1 不启用
	 */
    private String enable;
    /**
	 * . 获取是否启用 0 启用 1 不启用
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEnable(){  
        return enable;  
    }

    /**
	 * . 设置是否启用 0 启用 1 不启用
	 *
	 * @column enable
	 *        是否启用 0 启用 1 不启用
	 */
    public void setEnable(String enable){  
        this.enable = enable;  
    }
    
	

	/**
	 * . 是否显示 0 显示 1 隐藏
	 */
    private String display;
    /**
	 * . 获取是否显示 0 显示 1 隐藏
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDisplay(){  
        return display;  
    }

    /**
	 * . 设置是否显示 0 显示 1 隐藏
	 *
	 * @column display
	 *        是否显示 0 显示 1 隐藏
	 */
    public void setDisplay(String display){  
        this.display = display;  
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