/*
 * .PlatUserHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuser.holder;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 用户表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatUserHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 用户名称
	 */
    private String name;
    /**
	 * . 获取用户名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getName(){  
        return name;  
    }

    /**
	 * . 设置用户名称
	 *
	 * @column name
	 *        用户名称
	 */
    public void setName(String name){  
        this.name = name;  
    }
    
	

	/**
	 * . 用户登录名
	 */
    private String loginName;
    /**
	 * . 获取用户登录名
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getLoginName(){  
        return loginName;  
    }

    /**
	 * . 设置用户登录名
	 *
	 * @column loginName
	 *        用户登录名
	 */
    public void setLoginName(String loginName){  
        this.loginName = loginName;  
    }
    
	

	/**
	 * . 用户密码
	 */
    private String password;
    /**
	 * . 获取用户密码
	 *
	 * @return String
	 */
	@JsonSerialize(using = org.codehaus.jackson.map.ser.std.NullSerializer.class)
    public String getPassword(){  
        return password;  
    }

    /**
	 * . 设置用户密码
	 *
	 * @column password
	 *        用户密码
	 */
    public void setPassword(String password){  
        this.password = password;  
    }
    
	

	/**
	 * . 办公地址
	 */
    private String address;
    /**
	 * . 获取办公地址
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getAddress(){  
        return address;  
    }

    /**
	 * . 设置办公地址
	 *
	 * @column address
	 *        办公地址
	 */
    public void setAddress(String address){  
        this.address = address;  
    }
    
	

	/**
	 * . 用户联系电话
	 */
    private String mobilePhone;
    /**
	 * . 获取用户联系电话
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getMobilePhone(){  
        return mobilePhone;  
    }

    /**
	 * . 设置用户联系电话
	 *
	 * @column mobilePhone
	 *        用户联系电话
	 */
    public void setMobilePhone(String mobilePhone){  
        this.mobilePhone = mobilePhone;  
    }
    
	

	/**
	 * . 邮箱
	 */
    private String email;
    /**
	 * . 获取邮箱
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getEmail(){  
        return email;  
    }

    /**
	 * . 设置邮箱
	 *
	 * @column email
	 *        邮箱
	 */
    public void setEmail(String email){  
        this.email = email;  
    }
    
	

	/**
	 * . 性别
	 */
    private Integer sex;
    /**
	 * . 获取性别
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getSex(){  
        return sex;  
    }

    /**
	 * . 设置性别
	 *
	 * @column sex
	 *        性别
	 */
    public void setSex(Integer sex){  
        this.sex = sex;  
    }
    
	

	/**
	 * . 车辆类型：0：市级 1 ：区级  2：街道
	 */
    private Integer loginErrorTimes;
    /**
	 * . 获取车辆类型：0：市级 1 ：区级  2：街道
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getLoginErrorTimes(){  
        return loginErrorTimes;  
    }

    /**
	 * . 设置车辆类型：0：市级 1 ：区级  2：街道
	 *
	 * @column loginErrorTimes
	 *        车辆类型：0：市级 1 ：区级  2：街道
	 */
    public void setLoginErrorTimes(Integer loginErrorTimes){  
        this.loginErrorTimes = loginErrorTimes;  
    }
    
	

	/**
	 * . 最后一次登录时间
	 */
    private java.util.Date lastLoginTime;
    /**
	 * . 获取最后一次登录时间
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getLastLoginTime(){  
        return lastLoginTime;  
    }

    /**
	 * . 设置最后一次登录时间
	 *
	 * @column lastLoginTime
	 *        最后一次登录时间
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setLastLoginTime(java.util.Date lastLoginTime){  
        this.lastLoginTime = lastLoginTime;  
    }
    
	/**
	 * . 最后一次登录时间左值
	 */
    private java.util.Date lastLoginTimeL;
    
	/**
	 * . 获取最后一次登录时间左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getLastLoginTimeL(){  
        return lastLoginTimeL;  
    }

    /**
	 * . 设置最后一次登录时间左值
	 *
	 * @column lastLoginTimeL
	 *        最后一次登录时间左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setLastLoginTimeL(java.util.Date lastLoginTime){  
        this.lastLoginTimeL = lastLoginTime;  
    }
    
	/**
	 * . 最后一次登录时间右值
	 */
    private java.util.Date lastLoginTimeR;
    
	/**
	 * . 获取最后一次登录时间右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getLastLoginTimeR(){  
        return lastLoginTimeR;  
    }

    /**
	 * . 设置最后一次登录时间右值
	 *
	 * @column lastLoginTimeR
	 *        最后一次登录时间右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setLastLoginTimeR(java.util.Date lastLoginTime){  
        this.lastLoginTimeR = lastLoginTime;  
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
	 * . 职位编号
	 */
    private String jobCode;
    /**
	 * . 获取职位编号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobCode(){  
        return jobCode;  
    }

    /**
	 * . 设置职位编号
	 *
	 * @column jobCode
	 *        职位编号
	 */
    public void setJobCode(String jobCode){  
        this.jobCode = jobCode;  
    }
    
	

	/**
	 * . 是否主管 0：是 1 否
	 */
    private Integer ischarge;
    /**
	 * . 获取是否主管 0：是 1 否
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getIscharge(){  
        return ischarge;  
    }

    /**
	 * . 设置是否主管 0：是 1 否
	 *
	 * @column ischarge
	 *        是否主管 0：是 1 否
	 */
    public void setIscharge(Integer ischarge){  
        this.ischarge = ischarge;  
    }
    
	

	/**
	 * . 分机号
	 */
    private Integer extNumber;
    /**
	 * . 获取分机号
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getExtNumber(){  
        return extNumber;  
    }

    /**
	 * . 设置分机号
	 *
	 * @column extNumber
	 *        分机号
	 */
    public void setExtNumber(Integer extNumber){  
        this.extNumber = extNumber;  
    }
    
	

	/**
	 * . 工号
	 */
    private String jobNo;
    /**
	 * . 获取工号
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getJobNo(){  
        return jobNo;  
    }

    /**
	 * . 设置工号
	 *
	 * @column jobNo
	 *        工号
	 */
    public void setJobNo(String jobNo){  
        this.jobNo = jobNo;  
    }
    
	

	/**
	 * . 年龄
	 */
    private Integer age;
    /**
	 * . 获取年龄
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getAge(){  
        return age;  
    }

    /**
	 * . 设置年龄
	 *
	 * @column age
	 *        年龄
	 */
    public void setAge(Integer age){  
        this.age = age;  
    }
    
	

	/**
	 * . 生日
	 */
    private java.util.Date birthday;
    /**
	 * . 获取生日
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(using = com.lvxh.plugin.platform.utils.CustomDateSerializer.class, include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getBirthday(){  
        return birthday;  
    }

    /**
	 * . 设置生日
	 *
	 * @column birthday
	 *        生日
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setBirthday(java.util.Date birthday){  
        this.birthday = birthday;  
    }
    
	/**
	 * . 生日左值
	 */
    private java.util.Date birthdayL;
    
	/**
	 * . 获取生日左值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getBirthdayL(){  
        return birthdayL;  
    }

    /**
	 * . 设置生日左值
	 *
	 * @column birthdayL
	 *        生日左值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setBirthdayL(java.util.Date birthday){  
        this.birthdayL = birthday;  
    }
    
	/**
	 * . 生日右值
	 */
    private java.util.Date birthdayR;
    
	/**
	 * . 获取生日右值
	 *
	 * @return java.util.Date
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public java.util.Date getBirthdayR(){  
        return birthdayR;  
    }

    /**
	 * . 设置生日右值
	 *
	 * @column birthdayR
	 *        生日右值
	 */
	@JsonDeserialize(using = com.lvxh.plugin.platform.utils.CustomDateDeserializer.class)
    public void setBirthdayR(java.util.Date birthday){  
        this.birthdayR = birthday;  
    }
	

	/**
	 * . 头像路径
	 */
    private String imgUrl;
    /**
	 * . 获取头像路径
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getImgUrl(){  
        return imgUrl;  
    }

    /**
	 * . 设置头像路径
	 *
	 * @column imgUrl
	 *        头像路径
	 */
    public void setImgUrl(String imgUrl){  
        this.imgUrl = imgUrl;  
    }
    
	

	/**
	 * . 证件号码
	 */
    private String idNumber;
    /**
	 * . 获取证件号码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIdNumber(){  
        return idNumber;  
    }

    /**
	 * . 设置证件号码
	 *
	 * @column idNumber
	 *        证件号码
	 */
    public void setIdNumber(String idNumber){  
        this.idNumber = idNumber;  
    }
    
	

	/**
	 * . 证件类型：1 身份证 2 驾驶证 3 学生证 关联plat_dict表数据
	 */
    private Integer idType;
    /**
	 * . 获取证件类型：1 身份证 2 驾驶证 3 学生证 关联plat_dict表数据
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getIdType(){  
        return idType;  
    }

    /**
	 * . 设置证件类型：1 身份证 2 驾驶证 3 学生证 关联plat_dict表数据
	 *
	 * @column idType
	 *        证件类型：1 身份证 2 驾驶证 3 学生证 关联plat_dict表数据
	 */
    public void setIdType(Integer idType){  
        this.idType = idType;  
    }
    
	

	/**
	 * . 固定电话
	 */
    private String telephone;
    /**
	 * . 获取固定电话
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getTelephone(){  
        return telephone;  
    }

    /**
	 * . 设置固定电话
	 *
	 * @column telephone
	 *        固定电话
	 */
    public void setTelephone(String telephone){  
        this.telephone = telephone;  
    }
    
	

	/**
	 * . 是否需要修改密码：0：是，1：否
	 */
    private Integer isPasswordEmpty;
    /**
	 * . 获取是否需要修改密码：0：是，1：否
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getIsPasswordEmpty(){  
        return isPasswordEmpty;  
    }

    /**
	 * . 设置是否需要修改密码：0：是，1：否
	 *
	 * @column isPasswordEmpty
	 *        是否需要修改密码：0：是，1：否
	 */
    public void setIsPasswordEmpty(Integer isPasswordEmpty){  
        this.isPasswordEmpty = isPasswordEmpty;  
    }
    
	

	/**
	 * . 用户类型：关联plat_dict表数据
	 */
    private Integer userType;
    /**
	 * . 获取用户类型：关联plat_dict表数据
	 *
	 * @return Integer
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public Integer getUserType(){  
        return userType;  
    }

    /**
	 * . 设置用户类型：关联plat_dict表数据
	 *
	 * @column userType
	 *        用户类型：关联plat_dict表数据
	 */
    public void setUserType(Integer userType){  
        this.userType = userType;  
    }
    
	

	/**
	 * . 用户业务类型： 关联plat_dict表数据
	 */
    private String userServiceType;
    /**
	 * . 获取用户业务类型： 关联plat_dict表数据
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserServiceType(){  
        return userServiceType;  
    }

    /**
	 * . 设置用户业务类型： 关联plat_dict表数据
	 *
	 * @column userServiceType
	 *        用户业务类型： 关联plat_dict表数据
	 */
    public void setUserServiceType(String userServiceType){  
        this.userServiceType = userServiceType;  
    }
    
	

	/**
	 * . 所属部门
	 */
    private String userDepCode;
    /**
	 * . 获取所属部门
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserDepCode(){  
        return userDepCode;  
    }

    /**
	 * . 设置所属部门
	 *
	 * @column userDepCode
	 *        所属部门
	 */
    public void setUserDepCode(String userDepCode){  
        this.userDepCode = userDepCode;  
    }
    
	

	/**
	 * . 备注
	 */
    private String remark;
    /**
	 * . 获取备注
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRemark(){  
        return remark;  
    }

    /**
	 * . 设置备注
	 *
	 * @column remark
	 *        备注
	 */
    public void setRemark(String remark){  
        this.remark = remark;  
    }
    
	

	/**
	 * . 用户编码
	 */
    private String userCode;
    /**
	 * . 获取用户编码
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserCode(){  
        return userCode;  
    }

    /**
	 * . 设置用户编码
	 *
	 * @column userCode
	 *        用户编码
	 */
    public void setUserCode(String userCode){  
        this.userCode = userCode;  
    }
    
	

	/**
	 * . 用户配置项
	 */
    private String userParams;
    /**
	 * . 获取用户配置项
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getUserParams(){  
        return userParams;  
    }

    /**
	 * . 设置用户配置项
	 *
	 * @column userParams
	 *        用户配置项
	 */
    public void setUserParams(String userParams){  
        this.userParams = userParams;  
    }

	@Override
	public String toString() {
		return "PlatUserHolder [loginName=" + loginName + ", mobilePhone=" + mobilePhone + ", entCode=" + entCode
				+ ", userCode=" + userCode + "]";
	}
    
	
}    