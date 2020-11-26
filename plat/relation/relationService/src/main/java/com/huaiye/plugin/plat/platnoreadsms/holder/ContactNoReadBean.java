package com.huaiye.plugin.plat.platnoreadsms.holder;

import java.util.ArrayList;
import java.util.List;

public class ContactNoReadBean extends PlatNoReadSmsHolder {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5275808220426430536L;

	private int noticeCount;
	private int commonCount;
	private List<PlatNoReadSmsHolder> list = new ArrayList<PlatNoReadSmsHolder>();

	public int getNoticeCount() {
		return noticeCount;
	}

	public void setNoticeCount(int noticeCount) {
		this.noticeCount = noticeCount;
	}

	public int getCommonCount() {
		return commonCount;
	}

	public void setCommonCount(int commonCount) {
		this.commonCount = commonCount;
	}

	public List<PlatNoReadSmsHolder> getList() {
		return list;
	}

	public void setList(List<PlatNoReadSmsHolder> list) {
		this.list = list;
	}

}
