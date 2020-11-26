package com.lvxh.plugin.netty.bean;

public class MessageContainer {  

	/** 
     * 消息的长度 
     */  
    private int length;  
    
    /** 
     * 消息的内容 
     */  
    private String content;      


	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "NettyMessage [length=" + length + ", content=" + content + "]";
	}
    
}  