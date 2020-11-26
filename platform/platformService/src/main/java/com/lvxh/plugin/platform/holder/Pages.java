package com.lvxh.plugin.platform.holder;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

/**
 * . Holder分页包装对象
 * 
 * @version 1.0.0
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Pages implements Serializable {

	/**
	 * .序列化UID
	 */
	private static final long serialVersionUID = -5775933493380482323L;

	/**
	 * . 当前页码
	 */
	private Integer curPage = 1;

	/**
	 * . 每页数量
	 */
	private Integer pageCount;

	/**
	 * . 每页数量
	 */
	private Integer pageSize = 10;

	/**
	 * . 每页数量
	 */
	private Integer totalCount;

	/**
	 * . 每页数量
	 */
	private Integer startNo;

	/**
	 * @return the startNo
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getStartNo() {
		return startNo;
	}

	/**
	 * @param startNo the startNo to set
	 */
	public void setStartNo(Integer startNo) {
		this.startNo = startNo;
	}

	/**
	 * @return the curPage
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getCurPage() {
		return curPage;
	}

	/**
	 * @return the pageCount
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getPageCount() {
		return pageCount;
	}

	/**
	 * @return the pageSize
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getPageSize() {
		return pageSize;
	}

	/**
	 * @return the totalCount
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getTotalCount() {
		return totalCount;
	}

	/**
	 * @param curPage
	 *            the curPage to set
	 */
	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}

	/**
	 * @param pageCount
	 *            the pageCount to set
	 */
	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	/**
	 * @param pageSize
	 *            the pageSize to set
	 */
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	/**
	 * @param totalCount
	 *            the totalCount to set
	 */
	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
		this.pageCount = (this.totalCount + this.pageSize - 1) / this.pageSize;
		if (this.curPage < 1 || this.curPage > this.pageCount) {
			this.curPage = 1;
		}
		this.startNo = (this.curPage - 1) * this.pageSize;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Pages [curPage=");
		builder.append(curPage);
		builder.append(", pageCount=");
		builder.append(pageCount);
		builder.append(", pageSize=");
		builder.append(pageSize);
		builder.append(", totalCount=");
		builder.append(totalCount);
		builder.append(", startNo=");
		builder.append(startNo);
		builder.append("]");
		return builder.toString();
	}

}
