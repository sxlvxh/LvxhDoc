package com.lvxh.plugin.platform.holder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.codehaus.jackson.map.annotate.JsonSerialize.Inclusion;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonSerialize(include = Inclusion.NON_NULL)
public class BaseTreeHolder implements Serializable,Comparable<BaseTreeHolder>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 7018741626489005041L;

	private String pid;
	private String id;
	private String name;
	private String img;
	private String dataType;
	private boolean selected = false;
	private boolean hasChild = false;
	private int selectedCount;
	private int noSelectCount;
	private String label;
	private Object obj;
	private long sortTime;
	
	public long getSortTime() {
		return sortTime;
	}
	public void setSortTime(long sortTime) {
		this.sortTime = sortTime;
	}
	private List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
	
	public String getLabel() {
		return label;
	}
	public void setLabel(String label) {
		this.label = label;
	}
	public int getSelectedCount() {
		return selectedCount;
	}
	public void setSelectedCount(int selectedCount) {
		this.selectedCount = selectedCount;
	}
	public int getNoSelectCount() {
		return noSelectCount;
	}
	public void setNoSelectCount(int noSelectCount) {
		this.noSelectCount = noSelectCount;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public boolean isHasChild() {
		return hasChild;
	}
	public void setHasChild(boolean hasChild) {
		this.hasChild = hasChild;
	}
	public Object getObj() {
		return obj;
	}
	public void setObj(Object obj) {
		this.obj = obj;
	}
	public List<BaseTreeHolder> getTreeList() {
		return treeList;
	}
	public void setTreeList(List<BaseTreeHolder> treeList) {
		this.treeList = treeList;
	}
	@Override
	public int compareTo(BaseTreeHolder _h) {
		return (int) (_h.getSortTime() - this.getSortTime());
	}
}
