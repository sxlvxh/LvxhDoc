package com.lvxh.plugin.netty.bean;

import io.netty.channel.Channel;

public class Message {
	
	private MessageContent content;
	/**
	 * 消息类型
	 * forward 转发
	 * login 登陆
	 * heartbeat 心跳
	 * logout 退出
	 * kickout 提出
	 * reconn 重连
	 * unhearbeat 没有心跳
	 * unlogin 未登录
	 */
	private String msgType;
	
	private Channel channel;
	
	public Channel getChannel() {
		return channel;
	}


	public void setChannel(Channel channel) {
		this.channel = channel;
	}


	/**
	 * 消息来源账号
	 */
	private String src;
	
	/**
	 * 0 默认tcp协议 ，1 websocket协议
	 */
	private int channelType;


	public MessageContent getContent() {
		return content;
	}


	public void setContent(MessageContent content) {
		this.content = content;
	}


	public String getMsgType() {
		return msgType;
	}


	public void setMsgType(String smsType) {
		this.msgType = smsType;
	}


	public int getChannelType() {
		return channelType;
	}


	public void setChannelType(int channelType) {
		this.channelType = channelType;
	}


	public String getSrc() {
		return src;
	}


	public void setSrc(String src) {
		this.src = src;
	}

	@Override
	public String toString() {
		return "ReceiveMessage [content=" + content + ", smsType=" + msgType + ", channel=" + channel + ", src=" + src
				+ ", channelType=" + channelType + "]";
	}
	
}
