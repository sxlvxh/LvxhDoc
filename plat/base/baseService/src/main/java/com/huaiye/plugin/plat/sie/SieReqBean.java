package com.huaiye.plugin.plat.sie;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import com.google.gson.Gson;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class SieReqBean implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 321695176969912483L;
	private String url;
	private String params;
	private String entCode;
	private String strUserTokenID;

	public String getEntCode() {
		return entCode;
	}

	public void setEntCode(String entCode) {
		this.entCode = entCode;
	}

	public String getStrUserTokenID() {
		return strUserTokenID;
	}

	public void setStrUserTokenID(String strUserTokenID) {
		this.strUserTokenID = strUserTokenID;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	@Override
	public String toString() {
		return new Gson().toJson(this);
	}

	
}
