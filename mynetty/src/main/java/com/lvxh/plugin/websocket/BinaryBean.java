package com.lvxh.plugin.websocket;

public class BinaryBean {
	private String name;
	private String code;
	private long size;
	private long startTime;
	private long endTime;
	private int res;
	private int ratio;
	private String type;
	private long sizeX;
	private String filePath;
	private String fileType;
	private String userCode;

	public String getUserCode() {
		return userCode;
	}

	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public long getSizeX() {
		return sizeX;
	}

	public void setSizeX(long sizeX) {
		this.sizeX = sizeX;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getRatio() {
		return ratio;
	}

	public void setRatio(int ratio) {
		this.ratio = ratio;
	}

	public int getRes() {
		return res;
	}

	public void setRes(int res) {
		this.res = res;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public long getEndTime() {
		return endTime;
	}

	public void setEndTime(long endTime) {
		this.endTime = endTime;
	}

	@Override
	public String toString() {
		return "BinaryBean [name=" + name + ", code=" + code + ", size=" + size + ", startTime=" + startTime
				+ ", endTime=" + endTime + ", res=" + res + ", ratio=" + ratio + ", type=" + type + ", sizeX=" + sizeX
				+ "]";
	}



}
