package com.lvxh.plugin.platform.holder;

import java.io.Serializable;
import java.util.List;

public class ExportReqHolder implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4300034681947893252L;
	private String sheetName;
	private int total;
	private String dateFormat;
	private List<Label> list;
	private String sort;
	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}

	public String getSheetName() {
		return sheetName;
	}

	public void setSheetName(String sheetName) {
		this.sheetName = sheetName;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<Label> getList() {
		return list;
	}

	public void setList(List<Label> list) {
		this.list = list;
	}

}
