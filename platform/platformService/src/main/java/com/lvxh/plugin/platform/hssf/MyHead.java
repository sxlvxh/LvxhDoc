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
public class MyHead implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 7860099155220054442L;
	private int rowIdx;
	private int height;
    private List<ColumnIdx> columnIdx;
    
    public int getHeight() {
		return height;
	}
	public void setHeight(Integer height) {
		this.height = height;
	}
	public void setRowIdx(int rowIdx) {
         this.rowIdx = rowIdx;
     }
     public int getRowIdx() {
         return rowIdx;
     }

    public void setColumnIdx(List<ColumnIdx> columnIdx) {
         this.columnIdx = columnIdx;
     }
     public List<ColumnIdx> getColumnIdx() {
         return columnIdx;
     }

}