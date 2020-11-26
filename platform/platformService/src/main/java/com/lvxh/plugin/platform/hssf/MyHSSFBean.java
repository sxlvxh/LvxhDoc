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
public class MyHSSFBean implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -2344995445743167308L;
	private String fileName;
    private List<MySheet> mySheet;
    public void setFileName(String fileName) {
         this.fileName = fileName;
     }
     public String getFileName() {
         return fileName;
     }

    public void setMySheet(List<MySheet> mySheet) {
         this.mySheet = mySheet;
     }
     public List<MySheet> getMySheet() {
         return mySheet;
     }

}