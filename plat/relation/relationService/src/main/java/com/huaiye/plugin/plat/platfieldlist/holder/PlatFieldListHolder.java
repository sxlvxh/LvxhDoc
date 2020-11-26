/*
 * .PlatFieldListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platfieldlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 属性列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatFieldListHolder extends BaseBusinessHolder {
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
    private String fieldName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldName(){  
        return fieldName;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldName
	 *        
	 */
    public void setFieldName(String fieldName){  
        this.fieldName = fieldName;  
    }
    
	

	/**
	 * . 
	 */
    private String fieldType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldType(){  
        return fieldType;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldType
	 *        
	 */
    public void setFieldType(String fieldType){  
        this.fieldType = fieldType;  
    }
    
	

	/**
	 * . 
	 */
    private String fieldStyle;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldStyle(){  
        return fieldStyle;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldStyle
	 *        
	 */
    public void setFieldStyle(String fieldStyle){  
        this.fieldStyle = fieldStyle;  
    }
    
	

	/**
	 * . 
	 */
    private String fieldLabel;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldLabel(){  
        return fieldLabel;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldLabel
	 *        
	 */
    public void setFieldLabel(String fieldLabel){  
        this.fieldLabel = fieldLabel;  
    }
    
	

	

	

	

	

	

	/**
	 * . 
	 */
    private String buttonCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonCode(){  
        return buttonCode;  
    }

    /**
	 * . 设置
	 *
	 * @column buttonCode
	 *        
	 */
    public void setButtonCode(String buttonCode){  
        this.buttonCode = buttonCode;  
    }
    
	

	/**
	 * . 
	 */
    private String fieldParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldParams(){  
        return fieldParams;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldParams
	 *        
	 */
    public void setFieldParams(String fieldParams){  
        this.fieldParams = fieldParams;  
    }
    
	

	/**
	 * . 
	 */
    private String fieldCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldCode(){  
        return fieldCode;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldCode
	 *        
	 */
    public void setFieldCode(String fieldCode){  
        this.fieldCode = fieldCode;  
    }
    
	

	/**
	 * . 
	 */
    private String priority;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getPriority(){  
        return priority;  
    }

    /**
	 * . 设置
	 *
	 * @column priority
	 *        
	 */
    public void setPriority(String priority){  
        this.priority = priority;  
    }
    
	

	/**
	 * . 
	 */
    private String enable;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEnable(){  
        return enable;  
    }

    /**
	 * . 设置
	 *
	 * @column enable
	 *        
	 */
    public void setEnable(String enable){  
        this.enable = enable;  
    }
    
	

	/**
	 * . 
	 */
    private String display;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDisplay(){  
        return display;  
    }

    /**
	 * . 设置
	 *
	 * @column display
	 *        
	 */
    public void setDisplay(String display){  
        this.display = display;  
    }
    
	

	/**
	 * . 
	 */
    private String menuName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuName(){  
        return menuName;  
    }

    /**
	 * . 设置
	 *
	 * @column menuName
	 *        
	 */
    public void setMenuName(String menuName){  
        this.menuName = menuName;  
    }
    
	

	/**
	 * . 
	 */
    private String fieldTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFieldTypeName(){  
        return fieldTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column fieldTypeName
	 *        
	 */
    public void setFieldTypeName(String fieldTypeName){  
        this.fieldTypeName = fieldTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String buttonName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonName(){  
        return buttonName;  
    }

    /**
	 * . 设置
	 *
	 * @column buttonName
	 *        
	 */
    public void setButtonName(String buttonName){  
        this.buttonName = buttonName;  
    }
    
	

	/**
	 * . 
	 */
    private String displayName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDisplayName(){  
        return displayName;  
    }

    /**
	 * . 设置
	 *
	 * @column displayName
	 *        
	 */
    public void setDisplayName(String displayName){  
        this.displayName = displayName;  
    }
    
	

	/**
	 * . 
	 */
    private String enableName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEnableName(){  
        return enableName;  
    }

    /**
	 * . 设置
	 *
	 * @column enableName
	 *        
	 */
    public void setEnableName(String enableName){  
        this.enableName = enableName;  
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