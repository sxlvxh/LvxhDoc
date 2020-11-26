/**
  * Copyright 2020 bejson.com 
  */
package com.huaiye.plugin.plat.sie;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import com.google.gson.Gson;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class SieParams implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8239536044913373851L;

	private String ip;
	private int port;
	private String url;
	private String domainCode;
	private String groupCode;
	private String ws;
	private String lastUrl;
	private String params;
	private String strUserTokenID;
	
	public String getLastUrl() {
		return lastUrl;
	}

	public void setLastUrl(String lastUrl) {
		this.lastUrl = lastUrl;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public String getStrUserTokenID() {
		return strUserTokenID;
	}

	public void setStrUserTokenID(String strUserTokenID) {
		this.strUserTokenID = strUserTokenID;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getDomainCode() {
		return domainCode;
	}

	public void setDomainCode(String domainCode) {
		this.domainCode = domainCode;
	}

	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public String getWs() {
		return ws;
	}

	public void setWs(String ws) {
		this.ws = ws;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

}