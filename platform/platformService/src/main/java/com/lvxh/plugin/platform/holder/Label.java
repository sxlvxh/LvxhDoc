package com.lvxh.plugin.platform.holder;

import java.io.Serializable;

public class Label implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4594862669665280684L;
	private String field;
	private String name;

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
