/*
 * .PlatButtonHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platbutton.holder;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.huaiye.plugin.plat.platfield.holder.PlatFieldHolder;
import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 页面按钮表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatButtonHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	private List<PlatFieldHolder> flist = new ArrayList<PlatFieldHolder>();
	
	private List<PlatButtonHolder> blist = new ArrayList<PlatButtonHolder>();
	
	public List<PlatFieldHolder> getFlist() {
		return flist;
	}

	public void setFlist(List<PlatFieldHolder> flist) {
		this.flist = flist;
	}

	public List<PlatButtonHolder> getBlist() {
		return blist;
	}

	public void setBlist(List<PlatButtonHolder> blist) {
		this.blist = blist;
	}

	/**
	 * . 源菜单编号
	 */
    private String srcMenuCode;

    /**
	 * . 目标菜单编号
	 */
    private String targetMenuCode;
    

	public String getSrcMenuCode() {
		return srcMenuCode;
	}

	public void setSrcMenuCode(String srcMenuCode) {
		this.srcMenuCode = srcMenuCode;
	}

	public String getTargetMenuCode() {
		return targetMenuCode;
	}

	public void setTargetMenuCode(String targetMenuCode) {
		this.targetMenuCode = targetMenuCode;
	}

	/**
	 * . 菜单编号
	 */
    private String menuCode;
    /**
	 * . 获取菜单编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMenuCode(){  
        return menuCode;  
    }

    /**
	 * . 设置菜单编号
	 *
	 * @column menuCode
	 *        菜单编号
	 */
    public void setMenuCode(String menuCode){  
        this.menuCode = menuCode;  
    }
    
	

	/**
	 * . 按钮类型
	 */
    private String buttonType;
    /**
	 * . 获取按钮类型
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonType(){  
        return buttonType;  
    }

    /**
	 * . 设置按钮类型
	 *
	 * @column buttonType
	 *        按钮类型
	 */
    public void setButtonType(String buttonType){  
        this.buttonType = buttonType;  
    }
    
	

	/**
	 * . 按钮名称
	 */
    private String buttonName;
    /**
	 * . 获取按钮名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonName(){  
        return buttonName;  
    }

    /**
	 * . 设置按钮名称
	 *
	 * @column buttonName
	 *        按钮名称
	 */
    public void setButtonName(String buttonName){  
        this.buttonName = buttonName;  
    }
    
	

	

	

	

	

	

	/**
	 * . 按钮参数
	 */
    private String buttonParams;
    /**
	 * . 获取按钮参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonParams(){  
        return buttonParams;  
    }

    /**
	 * . 设置按钮参数
	 *
	 * @column buttonParams
	 *        按钮参数
	 */
    public void setButtonParams(String buttonParams){  
        this.buttonParams = buttonParams;  
    }
    
	

	/**
	 * . 是否启用 0 启用 1不启用
	 */
    private String enable;
    /**
	 * . 获取是否启用 0 启用 1不启用
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEnable(){  
        return enable;  
    }

    /**
	 * . 设置是否启用 0 启用 1不启用
	 *
	 * @column enable
	 *        是否启用 0 启用 1不启用
	 */
    public void setEnable(String enable){  
        this.enable = enable;  
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
	 * . 是否隐藏 0 显示 1 隐藏
	 */
    private String display;
    /**
	 * . 获取是否隐藏 0 显示 1 隐藏
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDisplay(){  
        return display;  
    }

    /**
	 * . 设置是否隐藏 0 显示 1 隐藏
	 *
	 * @column display
	 *        是否隐藏 0 显示 1 隐藏
	 */
    public void setDisplay(String display){  
        this.display = display;  
    }
    
	

	/**
	 * . 是否弹窗 0 是 1 查询 2 删除 3 保存 4.取消
	 */
    private String enableDialog;
    /**
	 * . 获取是否弹窗 0 是 1 查询 2 删除 3 保存 4.取消
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEnableDialog(){  
        return enableDialog;  
    }

    /**
	 * . 设置是否弹窗 0 是 1 查询 2 删除 3 保存 4.取消
	 *
	 * @column enableDialog
	 *        是否弹窗 0 是 1 查询 2 删除 3 保存 4.取消
	 */
    public void setEnableDialog(String enableDialog){  
        this.enableDialog = enableDialog;  
    }
    
	

	/**
	 * . 按钮编号
	 */
    private String buttonCode;
    /**
	 * . 获取按钮编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getButtonCode(){  
        return buttonCode;  
    }

    /**
	 * . 设置按钮编号
	 *
	 * @column buttonCode
	 *        按钮编号
	 */
    public void setButtonCode(String buttonCode){  
        this.buttonCode = buttonCode;  
    }
    
	

	/**
	 * . 父按钮编号
	 */
    private String parentCode;
    /**
	 * . 获取父按钮编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getParentCode(){  
        return parentCode;  
    }

    /**
	 * . 设置父按钮编号
	 *
	 * @column parentCode
	 *        父按钮编号
	 */
    public void setParentCode(String parentCode){  
        this.parentCode = parentCode;  
    }
    
	

	/**
	 * . 按钮级别
	 */
    private Integer buttonLevel;
    /**
	 * . 获取按钮级别
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getButtonLevel(){  
        return buttonLevel;  
    }

    /**
	 * . 设置按钮级别
	 *
	 * @column buttonLevel
	 *        按钮级别
	 */
    public void setButtonLevel(Integer buttonLevel){  
        this.buttonLevel = buttonLevel;  
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