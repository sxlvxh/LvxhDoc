package com.lvxh.plugin.sie.bean;

import com.lvxh.plugin.netty.base.NettyCache;

public class SIEUserStatus {
	private Long time;
	private String src;
	private boolean loginStatus;
	private Long lastMsgTime;
	/**
	 * 0 默认tcp协议 ，1 websocket协议
	 */
	private int channelType;

	public int getChannelType() {
		return channelType;
	}

	public void setChannelType(int channelType) {
		this.channelType = channelType;
	}

	public Long getLastMsgTime() {
		return lastMsgTime;
	}

	public void setLastMsgTime(Long lastMsgTime) {
		this.lastMsgTime = lastMsgTime;
	}

	public Long getTime() {
		return time;
	}

	public void setTime(Long time) {
		this.time = time;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

	public boolean isLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(boolean loginStatus) {
		this.loginStatus = loginStatus;
	}
	
	@Override
	public String toString() {
		return NettyCache.GSON.toJson(this);
	}

}
