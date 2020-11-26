/*
 * .PlatButtonListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platbuttonlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 按钮列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatButtonListHolder extends BaseBusinessHolder {
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
    private String buttonType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonType(){  
        return buttonType;  
    }

    /**
	 * . 设置
	 *
	 * @column buttonType
	 *        
	 */
    public void setButtonType(String buttonType){  
        this.buttonType = buttonType;  
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
    private String buttonParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonParams(){  
        return buttonParams;  
    }

    /**
	 * . 设置
	 *
	 * @column buttonParams
	 *        
	 */
    public void setButtonParams(String buttonParams){  
        this.buttonParams = buttonParams;  
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
    private String enableDialog;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEnableDialog(){  
        return enableDialog;  
    }

    /**
	 * . 设置
	 *
	 * @column enableDialog
	 *        
	 */
    public void setEnableDialog(String enableDialog){  
        this.enableDialog = enableDialog;  
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
    private Integer buttonLevel;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getButtonLevel(){  
        return buttonLevel;  
    }

    /**
	 * . 设置
	 *
	 * @column buttonLevel
	 *        
	 */
    public void setButtonLevel(Integer buttonLevel){  
        this.buttonLevel = buttonLevel;  
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
    private String buttonTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonTypeName(){  
        return buttonTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column buttonTypeName
	 *        
	 */
    public void setButtonTypeName(String buttonTypeName){  
        this.buttonTypeName = buttonTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String parentButtonName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentButtonName(){  
        return parentButtonName;  
    }

    /**
	 * . 设置
	 *
	 * @column parentButtonName
	 *        
	 */
    public void setParentButtonName(String parentButtonName){  
        this.parentButtonName = parentButtonName;  
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