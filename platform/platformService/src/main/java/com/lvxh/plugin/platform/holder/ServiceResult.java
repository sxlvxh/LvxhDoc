package com.lvxh.plugin.platform.holder;

import java.util.List;

public class ServiceResult<T extends BaseBusinessHolder> extends GridResult {

	/**
	 * 
	 */
	private static final long serialVersionUID = 7506676255165728211L;
	
	private T holder;
	private List<T> list;
	public T getHolder() {
		return holder;
	}
	public void setHolder(T holder) {
		this.holder = holder;
	}
	public List<T> getList() {
		return list;
	}
	public void setList(List<T> list) {
		this.list = list;
	}

}
