/**
  * Copyright 2019 bejson.com 
  */
package com.lvxh.plugin.platform.hssf;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;

/**
 * Auto-generated: 2019-09-23 10:31:13
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class ReportList implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -5030004975166672409L;
	private int diffRow;
    private List<DataParams> dataParams;
    private Map<String,DataParams> map = new HashedMap<String,DataParams>();
    
    public Map<String, DataParams> getMap() {
		return map;
	}
	public void setMap(Map<String, DataParams> map) {
		this.map = map;
	}
	public void setDiffRow(int diffRow) {
         this.diffRow = diffRow;
     }
     public int getDiffRow() {
         return diffRow;
     }

    public void setDataParams(List<DataParams> dataParams) {
         this.dataParams = dataParams;
     }
     public List<DataParams> getDataParams() {
         return dataParams;
     }

}