/**
  * Copyright 2019 bejson.com 
  */
package com.lvxh.plugin.platform.hssf;

import java.io.Serializable;

/**
 * Auto-generated: 2019-09-18 16:57:5
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class ColumnIdx implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -6034187317303386997L;
	private int idx;
    private String value;
    private MyFont myFont;
    
    public MyFont getMyFont() {
		return myFont;
	}
	public void setMyFont(MyFont myFont) {
		this.myFont = myFont;
	}
	public void setIdx(int idx) {
         this.idx = idx;
     }
     public int getIdx() {
         return idx;
     }

    public void setValue(String value) {
         this.value = value;
     }
     public String getValue() {
         return value;
     }

}