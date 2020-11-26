package com.lvxh.plugin.platform.holder;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

/**
 * 。分页查询结果
 * 
 * @version 1.0.0
 */
public class GridResult extends BaseResult {

	/**
	 * .序列化UID
	 */
	private static final long serialVersionUID = 5557396473073115876L;

	/**
	 * 。分页设置
	 */
	private Pages pages;

	/**
	 * @return the pages
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Pages getPages() {
		return pages;
	}

	/**
	 * @param pages
	 *            the pages to set
	 */
	public void setPages(Pages pages) {
		this.pages = pages;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("GridResult [pages=");
		builder.append(pages);
		builder.append("]");
		return builder.toString();
	}

}
