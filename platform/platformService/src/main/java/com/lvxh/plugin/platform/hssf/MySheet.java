/**
  * Copyright 2019 bejson.com 
  */
package com.lvxh.plugin.platform.hssf;
import java.io.Serializable;
import java.util.List;

/**
 * Auto-generated: 2019-09-18 16:57:5
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class MySheet implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 4332157516129969528L;
	private String sheetName;
    private List<MyHead> myHead;
    private List<Merge> mergeList;
    private DataList dataList;
    private List<ReportList> reportList;
    private List<Merge> endMergeList;
    private Integer columnWidth[];
    
    public Integer[] getColumnWidth() {
		return columnWidth;
	}
	public void setColumnWidth(Integer[] columnWidth) {
		this.columnWidth = columnWidth;
	}
	public List<Merge> getEndMergeList() {
		return endMergeList;
	}
	public void setEndMergeList(List<Merge> endMergeList) {
		this.endMergeList = endMergeList;
	}
	public List<ReportList> getReportList() {
		return reportList;
	}
	public void setReportList(List<ReportList> reportList) {
		this.reportList = reportList;
	}
	public DataList getDataList() {
		return dataList;
	}
	public void setDataList(DataList dataList) {
		this.dataList = dataList;
	}
	public List<Merge> getMergeList() {
		return mergeList;
	}
	public void setMergeList(List<Merge> mergeList) {
		this.mergeList = mergeList;
	}
	public void setSheetName(String sheetName) {
         this.sheetName = sheetName;
     }
     public String getSheetName() {
         return sheetName;
     }

    public void setMyHead(List<MyHead> myHead) {
         this.myHead = myHead;
     }
     public List<MyHead> getMyHead() {
         return myHead;
     }

}