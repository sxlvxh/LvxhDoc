/**
  * Copyright 2020 bejson.com 
  */
package com.huaiye.plugin.plat.sie;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import com.google.gson.Gson;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class EntParams implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8239536044913373851L;

	private String intranet;
	private int intranetPort;
	private String extranet;
	private int extranetPort;
	private String domainCode;
	private String groupCode;
	private String intranetHttp;
	private String extranetHttp;
	private String intranetWs;
	private String extranetWs;

	public String getIntranetWs() {
		return intranetWs;
	}

	public void setIntranetWs(String intranetWs) {
		this.intranetWs = intranetWs;
	}

	public String getExtranetWs() {
		return extranetWs;
	}

	public void setExtranetWs(String extranetWs) {
		this.extranetWs = extranetWs;
	}

	public String getIntranetHttp() {
		return intranetHttp;
	}

	public void setIntranetHttp(String intranetHttp) {
		this.intranetHttp = intranetHttp;
	}

	public String getExtranetHttp() {
		return extranetHttp;
	}

	public void setExtranetHttp(String extranetHttp) {
		this.extranetHttp = extranetHttp;
	}

	public void setIntranet(String intranet) {
		this.intranet = intranet;
	}

	public String getIntranet() {
		return intranet;
	}

	public void setIntranetPort(int intranetPort) {
		this.intranetPort = intranetPort;
	}

	public int getIntranetPort() {
		return intranetPort;
	}

	public void setExtranet(String extranet) {
		this.extranet = extranet;
	}

	public String getExtranet() {
		return extranet;
	}

	public void setExtranetPort(int extranetPort) {
		this.extranetPort = extranetPort;
	}

	public int getExtranetPort() {
		return extranetPort;
	}

	public void setDomainCode(String domainCode) {
		this.domainCode = domainCode;
	}

	public String getDomainCode() {
		return domainCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public String getGroupCode() {
		return groupCode;
	}
	
	public SieParams getSieParams(String groupCode)
	{
		if(StringUtils.isNotBlank(groupCode))
		{
			SieParams sie = new SieParams();
			if(groupCode.equals(this.getGroupCode()))
			{
				sie.setIp(this.getIntranet());
				sie.setDomainCode(this.getDomainCode());
				sie.setGroupCode(this.getGroupCode());
				sie.setPort(this.getIntranetPort());
				sie.setUrl(this.getIntranetHttp());
				sie.setWs(this.getIntranetWs());
			}else
			{
				sie.setIp(this.getExtranet());
				sie.setDomainCode(this.getDomainCode());
				sie.setGroupCode(this.getGroupCode());
				sie.setPort(this.getExtranetPort());
				sie.setUrl(this.getExtranetHttp());
				sie.setWs(this.getExtranetWs());
			}
			return sie;
		}
		return null;
	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}