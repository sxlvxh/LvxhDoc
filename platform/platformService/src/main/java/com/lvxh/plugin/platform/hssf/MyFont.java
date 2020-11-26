package com.lvxh.plugin.platform.hssf;

public class MyFont {
	private String fontName = "宋体";
	private short fontHeight = 100;
	private short fontHeightInPoints = 10;
	private boolean wrapText = false;
	private String align="center";

	public String getAlign() {
		return align;
	}

	public void setAlign(String align) {
		this.align = align;
	}

	public boolean isWrapText() {
		return wrapText;
	}

	public void setWrapText(boolean wrapText) {
		this.wrapText = wrapText;
	}

	public String getFontName() {
		return fontName;
	}

	public void setFontName(String fontName) {
		this.fontName = fontName;
	}

	public short getFontHeight() {
		return fontHeight;
	}

	public void setFontHeight(short fontHeight) {
		this.fontHeight = fontHeight;
	}

	public short getFontHeightInPoints() {
		return fontHeightInPoints;
	}

	public void setFontHeightInPoints(short fontHeightInPoints) {
		this.fontHeightInPoints = fontHeightInPoints;
	}

}
