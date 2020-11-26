package com.huaiye.plugin.plat.util;

import java.util.List;
import java.util.Properties;

public class DataBase {
	private String name;

	private List<Table> table;

	private List<Procedure> procedure;

	private Properties pro;
	
	private Table bean;
	
	private String packageUrl;
	
	public String getPackageUrl() {
		return packageUrl;
	}

	public void setPackageUrl(String packageUrl) {
		this.packageUrl = packageUrl;
	}

	public Table getBean() {
		return bean;
	}

	public void setBean(Table bean) {
		this.bean = bean;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return this.name;
	}

	public void setTable(List<Table> table) {
		this.table = table;
	}

	public List<Table> getTable() {
		return this.table;
	}

	public void setProcedure(List<Procedure> procedure) {
		this.procedure = procedure;
	}

	public List<Procedure> getProcedure() {
		return this.procedure;
	}

	public Properties getPro() {
		return pro;
	}

	public void setPro(Properties pro) {
		this.pro = pro;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DataBase [name=");
		builder.append(name);
		builder.append(", table=");
		builder.append(table);
		builder.append(", procedure=");
		builder.append(procedure);
		builder.append(", pro=");
		builder.append(pro);
		builder.append("]");
		return builder.toString();
	}
	
	

}