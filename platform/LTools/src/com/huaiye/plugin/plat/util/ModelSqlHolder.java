package com.huaiye.plugin.plat.util;

import java.util.Date;

public class ModelSqlHolder  extends BaseHolder {

	private String id;// (256),
	private String modelID;// (256) DEFAULT (null) ,
	private String comment;// (256),
	private String className;// (32),
	private String name;// (32) DEFAULT (null) ,
	private String sql;// (32) DEFAULT (null) ,
	private String dataID;// (32) DEFAULT (null) ,
	private String dataName;// (32) DEFAULT (null) ,
	private String params[];
	private String createTime;
	
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String[] getParams() {
		return params;
	}
	public void setParams(String[] params) {
		this.params = params;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getModelID() {
		return modelID;
	}
	public void setModelID(String modelID) {
		this.modelID = modelID;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getClassName() {
		return className;
	}
	public void setClassName(String className) {
		this.className = className;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSql() {
		return sql;
	}
	public void setSql(String sql) {
		this.sql = sql;
	}
	public String getDataID() {
		return dataID;
	}
	public void setDataID(String dataID) {
		this.dataID = dataID;
	}
	public String getDataName() {
		return dataName;
	}
	public void setDataName(String dataName) {
		this.dataName = dataName;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("ModelSqlHolder [id=");
		builder.append(id);
		builder.append(", modelID=");
		builder.append(modelID);
		builder.append(", comment=");
		builder.append(comment);
		builder.append(", className=");
		builder.append(className);
		builder.append(", name=");
		builder.append(name);
		builder.append(", sql=");
		builder.append(sql);
		builder.append(", dataID=");
		builder.append(dataID);
		builder.append(", dataName=");
		builder.append(dataName);
		builder.append("]");
		return builder.toString();
	}
	
	
}