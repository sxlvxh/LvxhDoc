/*
 * .PlatInterfaceDocHolder.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platinterfacedoc.holder;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * . 系统接口表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatInterfaceDocHolder extends BaseBusinessHolder {
	/**
	 * . 序列化ID
	 */
	private static final long serialVersionUID = 1L;

	

	/**
	 * . 接口名称
	 */
    private String name;
    /**
	 * . 获取接口名称
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getName(){  
        return name;  
    }

    /**
	 * . 设置接口名称
	 *
	 * @column name
	 *        接口名称
	 */
    public void setName(String name){  
        this.name = name;  
    }
    
	

	/**
	 * . 接口分组
	 */
    private String intfcGroup;
    /**
	 * . 获取接口分组
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIntfcGroup(){  
        return intfcGroup;  
    }

    /**
	 * . 设置接口分组
	 *
	 * @column intfcGroup
	 *        接口分组
	 */
    public void setIntfcGroup(String intfcGroup){  
        this.intfcGroup = intfcGroup;  
    }
    
	

	/**
	 * . 请求地址
	 */
    private String reqUrl;
    /**
	 * . 获取请求地址
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getReqUrl(){  
        return reqUrl;  
    }

    /**
	 * . 设置请求地址
	 *
	 * @column reqUrl
	 *        请求地址
	 */
    public void setReqUrl(String reqUrl){  
        this.reqUrl = reqUrl;  
    }
    
	

	/**
	 * . 请求方式
	 */
    private String reqWay;
    /**
	 * . 获取请求方式
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getReqWay(){  
        return reqWay;  
    }

    /**
	 * . 设置请求方式
	 *
	 * @column reqWay
	 *        请求方式
	 */
    public void setReqWay(String reqWay){  
        this.reqWay = reqWay;  
    }
    
	

	/**
	 * . 接口说明
	 */
    private String intfcDesc;
    /**
	 * . 获取接口说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getIntfcDesc(){  
        return intfcDesc;  
    }

    /**
	 * . 设置接口说明
	 *
	 * @column intfcDesc
	 *        接口说明
	 */
    public void setIntfcDesc(String intfcDesc){  
        this.intfcDesc = intfcDesc;  
    }
    
	

	/**
	 * . 请求参数说明
	 */
    private String reqParamsDesc;
    /**
	 * . 获取请求参数说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getReqParamsDesc(){  
        return reqParamsDesc;  
    }

    /**
	 * . 设置请求参数说明
	 *
	 * @column reqParamsDesc
	 *        请求参数说明
	 */
    public void setReqParamsDesc(String reqParamsDesc){  
        this.reqParamsDesc = reqParamsDesc;  
    }
    
	

	/**
	 * . 请求参数
	 */
    private String reqParams;
    /**
	 * . 获取请求参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getReqParams(){  
        return reqParams;  
    }

    /**
	 * . 设置请求参数
	 *
	 * @column reqParams
	 *        请求参数
	 */
    public void setReqParams(String reqParams){  
        this.reqParams = reqParams;  
    }
    
	

	/**
	 * . 返回参数
	 */
    private String respParams;
    /**
	 * . 获取返回参数
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRespParams(){  
        return respParams;  
    }

    /**
	 * . 设置返回参数
	 *
	 * @column respParams
	 *        返回参数
	 */
    public void setRespParams(String respParams){  
        this.respParams = respParams;  
    }
    
	

	/**
	 * . 返回参数说明
	 */
    private String respParamsDesc;
    /**
	 * . 获取返回参数说明
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getRespParamsDesc(){  
        return respParamsDesc;  
    }

    /**
	 * . 设置返回参数说明
	 *
	 * @column respParamsDesc
	 *        返回参数说明
	 */
    public void setRespParamsDesc(String respParamsDesc){  
        this.respParamsDesc = respParamsDesc;  
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