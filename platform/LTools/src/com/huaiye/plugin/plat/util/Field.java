package com.huaiye.plugin.plat.util;

public class Field {
	private String name;

	private String type;
	
	private String javaName;

	private String javaType;

	private String collation;

	private String isNull;

	private String key;

	private String defaultValue;

	private String extra;

	private String privileges;

	private String comment;
	


	public String getJavaName() {
		return javaName;
	}

	public void setJavaName(String javaName) {
		this.javaName = javaName;
	}

	public String getJavaType() {
		return javaType;
	}

	public void setJavaType(String javaType) {
		this.javaType = javaType;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType() {
		return this.type;
	}

	public void setCollation(String collation) {
		this.collation = collation;
	}

	public String getCollation() {
		return this.collation;
	}

	public void setIsNull(String isNull) {
		this.isNull = isNull;
	}

	public String getIsNull() {
		return this.isNull;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getKey() {
		return this.key;
	}

	public void setDefaultValue(String defaultValue) {
		this.defaultValue = defaultValue;
	}

	public String getDefaultValue() {
		return this.defaultValue;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public String getExtra() {
		return this.extra;
	}

	public void setPrivileges(String privileges) {
		this.privileges = privileges;
	}

	public String getPrivileges() {
		return this.privileges;
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
		builder.append("Field [name=");
		builder.append(name);
		builder.append(", type=");
		builder.append(type);
		builder.append(", collation=");
		builder.append(collation);
		builder.append(", isNull=");
		builder.append(isNull);
		builder.append(", key=");
		builder.append(key);
		builder.append(", defaultValue=");
		builder.append(defaultValue);
		builder.append(", extra=");
		builder.append(extra);
		builder.append(", privileges=");
		builder.append(privileges);
		builder.append(", comment=");
		builder.append(comment);
		builder.append("]");
		return builder.toString();
	}

}