package com.huaiye.plugin.plat.util;

import java.util.List;
import java.util.Properties;

public class Table {
	private List<Field> field;

	private String name;

	private String comment;

	private String className;
	
	private Properties pro;
	
	private String sqlType;
	
	private String sql;

	public String getSqlType() {
		return sqlType;
	}

	public void setSqlType(String sqlType) {
		this.sqlType = sqlType;
	}

	public String getSql() {
		return sql;
	}

	public void setSql(String sql) {
		this.sql = sql;
	}

	public Properties getPro() {
		return pro;
	}

	public void setPro(Properties pro) {
		this.pro = pro;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public void setField(List<Field> field) {
		this.field = field;
	}

	public List<Field> getField() {
		return this.field;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getComment() {
		return this.comment;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Table [field=");
		builder.append(field);
		builder.append(", name=");
		builder.append(name);
		builder.append(", comment=");
		builder.append(comment);
		builder.append(", className=");
		builder.append(className);
		builder.append("]");
		return builder.toString();
	}

}