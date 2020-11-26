/*
 * .PlatGroupUserHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platgroupuser.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 查询群组成员
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatGroupUserHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 
	 */
    private String groupCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getGroupCode(){  
        return groupCode;  
    }

    /**
	 * . 设置
	 *
	 * @column groupCode
	 *        
	 */
    public void setGroupCode(String groupCode){  
        this.groupCode = groupCode;  
    }
    
	

	/**
	 * . 
	 */
    private String friendMark;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendMark(){  
        return friendMark;  
    }

    /**
	 * . 设置
	 *
	 * @column friendMark
	 *        
	 */
    public void setFriendMark(String friendMark){  
        this.friendMark = friendMark;  
    }
    
	

	/**
	 * . 
	 */
    private String friendUserCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendUserCode(){  
        return friendUserCode;  
    }

    /**
	 * . 设置
	 *
	 * @column friendUserCode
	 *        
	 */
    public void setFriendUserCode(String friendUserCode){  
        this.friendUserCode = friendUserCode;  
    }
    
	

	/**
	 * . 
	 */
    private String isAdmin;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIsAdmin(){  
        return isAdmin;  
    }

    /**
	 * . 设置
	 *
	 * @column isAdmin
	 *        
	 */
    public void setIsAdmin(String isAdmin){  
        this.isAdmin = isAdmin;  
    }
    
	

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
    private String entCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntCode(){  
        return entCode;  
    }

    /**
	 * . 设置
	 *
	 * @column entCode
	 *        
	 */
    public void setEntCode(String entCode){  
        this.entCode = entCode;  
    }
    
	

	/**
	 * . 
	 */
    private String userServiceType;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserServiceType(){  
        return userServiceType;  
    }

    /**
	 * . 设置
	 *
	 * @column userServiceType
	 *        
	 */
    public void setUserServiceType(String userServiceType){  
        this.userServiceType = userServiceType;  
    }
    
	

	/**
	 * . 
	 */
    private Integer userType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getUserType(){  
        return userType;  
    }

    /**
	 * . 设置
	 *
	 * @column userType
	 *        
	 */
    public void setUserType(Integer userType){  
        this.userType = userType;  
    }
    
	

	/**
	 * . 
	 */
    private String domainCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDomainCode(){  
        return domainCode;  
    }

    /**
	 * . 设置
	 *
	 * @column domainCode
	 *        
	 */
    public void setDomainCode(String domainCode){  
        this.domainCode = domainCode;  
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