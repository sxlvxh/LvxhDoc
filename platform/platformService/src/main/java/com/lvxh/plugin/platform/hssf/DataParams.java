/**
  * Copyright 2019 bejson.com 
  */
package com.lvxh.plugin.platform.hssf;

import java.io.Serializable;

/**
 * Auto-generated: 2019-09-23 10:31:13
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class DataParams implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = -2819684164892370829L;
	private int startColumn;
    private String field;
    private String calType;
    private String value;
    private Double calValue;
    private MyFont myFont;
    private int textLength;
    private String defStr;
    
    /**
     * 后缀
     */
    private String suffix;
    
    
    
    public String getSuffix() {
		return suffix;
	}
	public void setSuffix(String suffix) {
		this.suffix = suffix;
	}
	/**
     * cell的文本类型
     */
    private String textType;
    
    /**
     * 除数
     */
    private String divisor;
    
    /**
     * 被除数
     */
    private String dividend;
    
    
    
    public String getDivisor() {
		return divisor;
	}
	public void setDivisor(String divisor) {
		this.divisor = divisor;
	}
	public String getDividend() {
		return dividend;
	}
	public void setDividend(String dividend) {
		this.dividend = dividend;
	}
	public String getTextType() {
		return textType;
	}
	public void setTextType(String textType) {
		this.textType = textType;
	}
	public String getDefStr() {
		return defStr;
	}
	public void setDefStr(String defStr) {
		this.defStr = defStr;
	}
	public int getTextLength() {
		return textLength;
	}
	public void setTextLength(int textLength) {
		this.textLength = textLength;
	}
	public MyFont getMyFont() {
		return myFont;
	}
	public void setMyFont(MyFont myFont) {
		this.myFont = myFont;
	}
	public void setStartColumn(int startColumn) {
         this.startColumn = startColumn;
     }
     public int getStartColumn() {
         return startColumn;
     }

    public void setField(String field) {
         this.field = field;
     }
     public String getField() {
         return field;
     }

    public void setCalType(String calType) {
         this.calType = calType;
     }
     public String getCalType() {
         return calType;
     }

    public void setValue(String value) {
         this.value = value;
     }
     public String getValue() {
         return value;
     }

    public void setCalValue(Double calValue) {
         this.calValue = calValue;
     }
     public Double getCalValue() {
         return calValue;
     }

}