package com.lvxh.plugin.platform.holder;

import java.io.Serializable;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

/**
 * . 返回信息基础结构
 * 
 * @version 1.0.0
 */
public class BaseResult implements Serializable {
	/**
	 * .序列化UID
	 */
	private static final long serialVersionUID = 7080598889194847005L;

	/**
	 * .操作结果代码：0、操作失败；1、操作成功
	 */
	private int code;

	/**
	 * .操作结果描述
	 */
	private String desc;

	/**
	 * .操作结果
	 */
	private Object result;
	
	private Object obj;

	@JsonSerialize(include = Inclusion.NON_NULL)
	public Object getObj() {
		return obj;
	}

	public void setObj(Object obj) {
		this.obj = obj;
	}

	/**
	 * @return the code
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public int getCode() {
		return code;
	}

	/**
	 * @return the desc
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public String getDesc() {
		return desc;
	}

	/**
	 * @return the result
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Object getResult() {
		return result;
	}

	/**
	 * @param code
	 *            the code to set
	 */
	public void setCode(int code) {
		this.code = code;
	}

	/**
	 * @param desc
	 *            the desc to set
	 */
	public void setDesc(String desc) {
		this.desc = desc;
	}

	/**
	 * @param result
	 *            the result to set
	 */
	public void setResult(Object result) {
		this.result = result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("BaseResult [code=");
		builder.append(code);
		builder.append(", desc=");
		builder.append(desc);
		builder.append(", result=");
		builder.append(result);
		builder.append("]");
		return builder.toString();
	}

}
