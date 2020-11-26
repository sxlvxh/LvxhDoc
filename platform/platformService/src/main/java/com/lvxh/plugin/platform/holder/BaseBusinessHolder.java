package com.lvxh.plugin.platform.holder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lvxh.plugin.platform.utils.CustomDateDeserializer;
import com.lvxh.plugin.platform.utils.CustomDateSerializer;

/**
 * . Holder抽象基类
 * 
 * @version 1.0.0
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public abstract class BaseBusinessHolder implements Serializable {

	/**
	 * .序列化UID
	 */
	private static final long serialVersionUID = -5775933493380482323L;

	protected static final  Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
	
	private List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
	
	public List<BaseTreeHolder> getTreeList() {
		return treeList;
	}

	public void setTreeList(List<BaseTreeHolder> treeList) {
		this.treeList = treeList;
	}


	/**
	 * . 创建时间
	 */
	private Date createTime;
	/**
	 * . 创建时间左值
	 */
	private Date createTimeL;
	/**
	 * . 创建时间右值
	 */
	private Date createTimeR;

	/**
	 * . 创建者
	 */
	private Integer createUserId;
	
	private int nofuzzy;

	/**
	 * . ID
	 */
	private Integer id;

	/**
	 * . 是否删除
	 */
	private Integer isdel;

	/**
	 * .分页信息
	 */
	private Pages pages;

	/**
	 * 。排序设置
	 */
	private Sort sort;

	/**
	 * . 更新时间
	 */
	private Date updateTime;

	/**
	 * . 更新时间左值
	 */
	private Date updateTimeL;

	/**
	 * . 更新时间右值
	 */
	private Date updateTimeR;

	/**
	 * . groupBy子句参数
	 */
	private String groupBy;

	/**
	 * . 更新者
	 */
	private Integer updateUserId;

    /**
     * .该对象对应的记录被其他记录引用的次数
     * 
     */
    private Integer refCount;
    
    
    private String reportJson;
	
    public String getReportJson() {
		return reportJson;
	}

	public void setReportJson(String reportJson) {
		this.reportJson = reportJson;
	}

	/**
     */
    private Set<String> negativeFields = new HashSet<String>();

    public Set<String> getNegativeFields() {
        return negativeFields;
    }

    public void setNegativeFields(Set<String> negativeFields) {
        this.negativeFields = negativeFields;
    }

	private ExportReqHolder export;
	
	public ExportReqHolder getExport() {
		return export;
	}

	public void setExport(ExportReqHolder export) {
		this.export = export;
	}

    public int getNofuzzy() {
		return nofuzzy;
	}

	public void setNofuzzy(int nofuzzy) {
		this.nofuzzy = nofuzzy;
	}

	/**
	 * @return the createTime
	 */
	@JsonSerialize(using = CustomDateSerializer.class, include=Inclusion.NON_NULL)
	public Date getCreateTime() {
		return createTime;
	}

	/**
	 * @return the createTimeL
	 */
	@JsonSerialize(using = CustomDateSerializer.class, include=Inclusion.NON_NULL)
	public Date getCreateTimeL() {
		return createTimeL;
	}

	/**
	 * @return the createTimeR
	 */
	@JsonSerialize(using = CustomDateSerializer.class, include=Inclusion.NON_NULL)
	public Date getCreateTimeR() {
		return createTimeR;
	}

	/**
	 * @return the createUserId
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getCreateUserId() {
		return createUserId;
	}

	/**
	 * @return the id
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getId() {
		return id;
	}

	/**
	 * @return the isdel
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getIsdel() {
		return isdel;
	}


	/**
	 * @return the sort
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Sort getSort() {
		return sort;
	}

	/**
	 * @return the updateTime
	 */
	@JsonSerialize(using = CustomDateSerializer.class, include=Inclusion.NON_NULL)
	public Date getUpdateTime() {
		return updateTime;
	}

	/**
	 * @return the updateTimeL
	 */
	@JsonSerialize(using = CustomDateSerializer.class, include=Inclusion.NON_NULL)
	public Date getUpdateTimeL() {
		return updateTimeL;
	}

	/**
	 * @return the updateTimeR
	 */
	@JsonSerialize(using = CustomDateSerializer.class, include=Inclusion.NON_NULL)
	public Date getUpdateTimeR() {
		return updateTimeR;
	}

	/**
	 * @return the updateUserId
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Integer getUpdateUserId() {
		return updateUserId;
	}

	/**
	 * @param createTime
	 *            the createTime to set
	 */
	@JsonDeserialize(using = CustomDateDeserializer.class)
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * @param createTimeL
	 *            the createTimeL to set
	 */
	@JsonDeserialize(using = CustomDateDeserializer.class)
	public void setCreateTimeL(Date createTimeL) {
		this.createTimeL = createTimeL;
	}

	/**
	 * @param createTimeR
	 *            the createTimeR to set
	 */
	@JsonDeserialize(using = CustomDateDeserializer.class)
	public void setCreateTimeR(Date createTimeR) {
		this.createTimeR = createTimeR;
	}

	/**
	 * @param createUserId
	 *            the createUserId to set
	 */
	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * @param isdel
	 *            the isdel to set
	 */
	public void setIsdel(Integer isdel) {
		this.isdel = isdel;
	}
	
	@JsonSerialize(include = Inclusion.NON_NULL)
	public Pages getPages() {
		return pages;
	}

	public void setPages(Pages pages) {
		this.pages = pages;
	}

	/**
	 * @param sort
	 *            the sort to set
	 */
	public void setSort(Sort sort) {
		this.sort = sort;
	}

	/**
	 * @param updateTime
	 *            the updateTime to set
	 */
	@JsonDeserialize(using = CustomDateDeserializer.class)
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	/**
	 * @param updateTimeL
	 *            the updateTimeL to set
	 */
	@JsonDeserialize(using = CustomDateDeserializer.class)
	public void setUpdateTimeL(Date updateTimeL) {
		this.updateTimeL = updateTimeL;
	}

	/**
	 * @param updateTimeR
	 *            the updateTimeR to set
	 */
	@JsonDeserialize(using = CustomDateDeserializer.class)
	public void setUpdateTimeR(Date updateTimeR) {
		this.updateTimeR = updateTimeR;
	}

	/**
	 * @param updateUserId
	 *            the updateUserId to set
	 */
	public void setUpdateUserId(Integer updateUserId) {
		this.updateUserId = updateUserId;
	}

	/**
	 * @return the groupBy
	 */
	@JsonSerialize(include = Inclusion.NON_NULL)
	public String getGroupBy() {
		return groupBy;
	}

	/**
	 * @param groupBy the groupBy to set
	 */
	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

    public Integer getRefCount() {
        return refCount;
    }

    public void setRefCount(Integer refCount) {
        this.refCount = refCount;
    }

    /*
     * (non-Javadoc)
     * 
     * @see java.lang.Object#toString()
     */
	@Override
	public String toString() {
		return GSON.toJson(this);
	}

}
