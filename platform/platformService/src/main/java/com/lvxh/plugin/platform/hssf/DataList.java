/**
  * Copyright 2019 bejson.com 
  */
package com.lvxh.plugin.platform.hssf;
import java.io.Serializable;
import java.util.List;

/**
 * Auto-generated: 2019-09-18 18:13:39
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class DataList implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 8578936409943586878L;
	private int startRow;
    private List<DataParams> dataParams;
    public void setStartRow(int startRow) {
         this.startRow = startRow;
     }
     public int getStartRow() {
         return startRow;
     }

    public void setDataParams(List<DataParams> dataParams) {
         this.dataParams = dataParams;
     }
     public List<DataParams> getDataParams() {
         return dataParams;
     }

}