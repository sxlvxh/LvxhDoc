package com.huaiye.plugin.plat.util;

import java.util.List;

public class DbRoot {
	private List<DataBase> dataBase;

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DbRoot [dataBase=");
		builder.append(dataBase);
		builder.append("]");
		return builder.toString();
	}

	public void setDataBase(List<DataBase> dataBase) {
		this.dataBase = dataBase;
	}

	public List<DataBase> getDataBase() {
		return this.dataBase;
	}

}