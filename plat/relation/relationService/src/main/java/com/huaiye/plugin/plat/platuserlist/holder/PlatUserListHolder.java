/*
 * .PlatUserListHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuserlist.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 用户列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatUserListHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	private String domainCode;
	

	public String getDomainCode() {
		return domainCode;
	}

	public void setDomainCode(String domainCode) {
		this.domainCode = domainCode;
	}



	/**
	 * . 
	 */
    private String name;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getName(){  
        return name;  
    }

    /**
	 * . 设置
	 *
	 * @column name
	 *        
	 */
    public void setName(String name){  
        this.name = name;  
    }
    
	

	/**
	 * . 
	 */
    private String loginName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLoginName(){  
        return loginName;  
    }

    /**
	 * . 设置
	 *
	 * @column loginName
	 *        
	 */
    public void setLoginName(String loginName){  
        this.loginName = loginName;  
    }
    
	

	/**
	 * . 
	 */
    private String password;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(using = org.codehaus.jackson.map.ser.std.NullSerializer.class)
    public String getPassword(){  
        return password;  
    }

    /**
	 * . 设置
	 *
	 * @column password
	 *        
	 */
    public void setPassword(String password){  
        this.password = password;  
    }
    
	

	/**
	 * . 
	 */
    private String address;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAddress(){  
        return address;  
    }

    /**
	 * . 设置
	 *
	 * @column address
	 *        
	 */
    public void setAddress(String address){  
        this.address = address;  
    }
    
	

	/**
	 * . 
	 */
    private String mobilePhone;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMobilePhone(){  
        return mobilePhone;  
    }

    /**
	 * . 设置
	 *
	 * @column mobilePhone
	 *        
	 */
    public void setMobilePhone(String mobilePhone){  
        this.mobilePhone = mobilePhone;  
    }
    
	

	/**
	 * . 
	 */
    private String email;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEmail(){  
        return email;  
    }

    /**
	 * . 设置
	 *
	 * @column email
	 *        
	 */
    public void setEmail(String email){  
        this.email = email;  
    }
    
	

	/**
	 * . 
	 */
    private Integer sex;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getSex(){  
        return sex;  
    }

    /**
	 * . 设置
	 *
	 * @column sex
	 *        
	 */
    public void setSex(Integer sex){  
        this.sex = sex;  
    }
    
	

	/**
	 * . 
	 */
    private Integer loginErrorTimes;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getLoginErrorTimes(){  
        return loginErrorTimes;  
    }

    /**
	 * . 设置
	 *
	 * @column loginErrorTimes
	 *        
	 */
    public void setLoginErrorTimes(Integer loginErrorTimes){  
        this.loginErrorTimes = loginErrorTimes;  
    }
    
	

	/**
	 * . 
	 */
    private java.util.Date lastLoginTime;
    /**
	 * . 获取
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getLastLoginTime(){  
        return lastLoginTime;  
    }

    /**
	 * . 设置
	 *
	 * @column lastLoginTime
	 *        
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setLastLoginTime(java.util.Date lastLoginTime){  
        this.lastLoginTime = lastLoginTime;  
    }
    
	/**
	 * . 左值
	 */
    private java.util.Date lastLoginTimeL;
    
	/**
	 * . 获取左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getLastLoginTimeL(){  
        return lastLoginTimeL;  
    }

    /**
	 * . 设置左值
	 *
	 * @column lastLoginTimeL
	 *        左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setLastLoginTimeL(java.util.Date lastLoginTime){  
        this.lastLoginTimeL = lastLoginTime;  
    }
    
	/**
	 * . 右值
	 */
    private java.util.Date lastLoginTimeR;
    
	/**
	 * . 获取右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getLastLoginTimeR(){  
        return lastLoginTimeR;  
    }

    /**
	 * . 设置右值
	 *
	 * @column lastLoginTimeR
	 *        右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setLastLoginTimeR(java.util.Date lastLoginTime){  
        this.lastLoginTimeR = lastLoginTime;  
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
    private String jobCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobCode(){  
        return jobCode;  
    }

    /**
	 * . 设置
	 *
	 * @column jobCode
	 *        
	 */
    public void setJobCode(String jobCode){  
        this.jobCode = jobCode;  
    }
    
	

	/**
	 * . 
	 */
    private Integer ischarge;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getIscharge(){  
        return ischarge;  
    }

    /**
	 * . 设置
	 *
	 * @column ischarge
	 *        
	 */
    public void setIscharge(Integer ischarge){  
        this.ischarge = ischarge;  
    }
    
	

	/**
	 * . 
	 */
    private Integer extNumber;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getExtNumber(){  
        return extNumber;  
    }

    /**
	 * . 设置
	 *
	 * @column extNumber
	 *        
	 */
    public void setExtNumber(Integer extNumber){  
        this.extNumber = extNumber;  
    }
    
	

	/**
	 * . 
	 */
    private String jobNo;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobNo(){  
        return jobNo;  
    }

    /**
	 * . 设置
	 *
	 * @column jobNo
	 *        
	 */
    public void setJobNo(String jobNo){  
        this.jobNo = jobNo;  
    }
    
	

	/**
	 * . 
	 */
    private Integer age;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getAge(){  
        return age;  
    }

    /**
	 * . 设置
	 *
	 * @column age
	 *        
	 */
    public void setAge(Integer age){  
        this.age = age;  
    }
    
	

	/**
	 * . 
	 */
    private java.util.Date birthday;
    /**
	 * . 获取
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getBirthday(){  
        return birthday;  
    }

    /**
	 * . 设置
	 *
	 * @column birthday
	 *        
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setBirthday(java.util.Date birthday){  
        this.birthday = birthday;  
    }
    
	/**
	 * . 左值
	 */
    private java.util.Date birthdayL;
    
	/**
	 * . 获取左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getBirthdayL(){  
        return birthdayL;  
    }

    /**
	 * . 设置左值
	 *
	 * @column birthdayL
	 *        左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setBirthdayL(java.util.Date birthday){  
        this.birthdayL = birthday;  
    }
    
	/**
	 * . 右值
	 */
    private java.util.Date birthdayR;
    
	/**
	 * . 获取右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getBirthdayR(){  
        return birthdayR;  
    }

    /**
	 * . 设置右值
	 *
	 * @column birthdayR
	 *        右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setBirthdayR(java.util.Date birthday){  
        this.birthdayR = birthday;  
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
    private String idNumber;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIdNumber(){  
        return idNumber;  
    }

    /**
	 * . 设置
	 *
	 * @column idNumber
	 *        
	 */
    public void setIdNumber(String idNumber){  
        this.idNumber = idNumber;  
    }
    
	

	/**
	 * . 
	 */
    private Integer idType;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getIdType(){  
        return idType;  
    }

    /**
	 * . 设置
	 *
	 * @column idType
	 *        
	 */
    public void setIdType(Integer idType){  
        this.idType = idType;  
    }
    
	

	/**
	 * . 
	 */
    private String telephone;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTelephone(){  
        return telephone;  
    }

    /**
	 * . 设置
	 *
	 * @column telephone
	 *        
	 */
    public void setTelephone(String telephone){  
        this.telephone = telephone;  
    }
    
	

	/**
	 * . 
	 */
    private Integer isPasswordEmpty;
    /**
	 * . 获取
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getIsPasswordEmpty(){  
        return isPasswordEmpty;  
    }

    /**
	 * . 设置
	 *
	 * @column isPasswordEmpty
	 *        
	 */
    public void setIsPasswordEmpty(Integer isPasswordEmpty){  
        this.isPasswordEmpty = isPasswordEmpty;  
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
    private String userDepCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserDepCode(){  
        return userDepCode;  
    }

    /**
	 * . 设置
	 *
	 * @column userDepCode
	 *        
	 */
    public void setUserDepCode(String userDepCode){  
        this.userDepCode = userDepCode;  
    }
    
	

	/**
	 * . 
	 */
    private String remark;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRemark(){  
        return remark;  
    }

    /**
	 * . 设置
	 *
	 * @column remark
	 *        
	 */
    public void setRemark(String remark){  
        this.remark = remark;  
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
    private String userParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserParams(){  
        return userParams;  
    }

    /**
	 * . 设置
	 *
	 * @column userParams
	 *        
	 */
    public void setUserParams(String userParams){  
        this.userParams = userParams;  
    }
    
	

	/**
	 * . 
	 */
    private String entName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntName(){  
        return entName;  
    }

    /**
	 * . 设置
	 *
	 * @column entName
	 *        
	 */
    public void setEntName(String entName){  
        this.entName = entName;  
    }
    
	

	/**
	 * . 
	 */
    private String entParams;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEntParams(){  
        return entParams;  
    }

    /**
	 * . 设置
	 *
	 * @column entParams
	 *        
	 */
    public void setEntParams(String entParams){  
        this.entParams = entParams;  
    }
    
	

	/**
	 * . 
	 */
    private String sexName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getSexName(){  
        return sexName;  
    }

    /**
	 * . 设置
	 *
	 * @column sexName
	 *        
	 */
    public void setSexName(String sexName){  
        this.sexName = sexName;  
    }
    
	

	/**
	 * . 
	 */
    private String jobName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobName(){  
        return jobName;  
    }

    /**
	 * . 设置
	 *
	 * @column jobName
	 *        
	 */
    public void setJobName(String jobName){  
        this.jobName = jobName;  
    }
    
	

	/**
	 * . 
	 */
    private String ischargeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIschargeName(){  
        return ischargeName;  
    }

    /**
	 * . 设置
	 *
	 * @column ischargeName
	 *        
	 */
    public void setIschargeName(String ischargeName){  
        this.ischargeName = ischargeName;  
    }
    
	

	/**
	 * . 
	 */
    private String idTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIdTypeName(){  
        return idTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column idTypeName
	 *        
	 */
    public void setIdTypeName(String idTypeName){  
        this.idTypeName = idTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String userTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserTypeName(){  
        return userTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column userTypeName
	 *        
	 */
    public void setUserTypeName(String userTypeName){  
        this.userTypeName = userTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String userServiceTypeName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserServiceTypeName(){  
        return userServiceTypeName;  
    }

    /**
	 * . 设置
	 *
	 * @column userServiceTypeName
	 *        
	 */
    public void setUserServiceTypeName(String userServiceTypeName){  
        this.userServiceTypeName = userServiceTypeName;  
    }
    
	

	/**
	 * . 
	 */
    private String roleNames;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRoleNames(){  
        return roleNames;  
    }

    /**
	 * . 设置
	 *
	 * @column roleNames
	 *        
	 */
    public void setRoleNames(String roleNames){  
        this.roleNames = roleNames;  
    }
    
	

	/**
	 * . 
	 */
    private String depName;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getDepName(){  
        return depName;  
    }

    /**
	 * . 设置
	 *
	 * @column depName
	 *        
	 */
    public void setDepName(String depName){  
        this.depName = depName;  
    }
    
	

	/**
	 * . 
	 */
    private String activeEntCode;
    /**
	 * . 获取
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getActiveEntCode(){  
        return activeEntCode;  
    }

    /**
	 * . 设置
	 *
	 * @column activeEntCode
	 *        
	 */
    public void setActiveEntCode(String activeEntCode){  
        this.activeEntCode = activeEntCode;  
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