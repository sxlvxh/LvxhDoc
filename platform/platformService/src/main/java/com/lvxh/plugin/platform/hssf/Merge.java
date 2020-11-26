/**
  * Copyright 2019 bejson.com 
  */
package com.lvxh.plugin.platform.hssf;

import java.io.Serializable;

/**
 * Auto-generated: 2019-09-18 17:35:11
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class Merge implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -276880598335665770L;
	private int startRow;
    private int endRow;
    private int startColumn;
    private int endColumn;
    public void setStartRow(int startRow) {
         this.startRow = startRow;
     }
     public int getStartRow() {
         return startRow;
     }

    public void setEndRow(int endRow) {
         this.endRow = endRow;
     }
     public int getEndRow() {
         return endRow;
     }

    public void setStartColumn(int startColumn) {
         this.startColumn = startColumn;
     }
     public int getStartColumn() {
         return startColumn;
     }

    public void setEndColumn(int endColumn) {
         this.endColumn = endColumn;
     }
     public int getEndColumn() {
         return endColumn;
     }

}