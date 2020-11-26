package com.huaiye.plugin.plat.custom.bean;

import java.util.ArrayList;
import java.util.List;

import com.huaiye.plugin.plat.platsms.holder.PlatSmsHolder;
import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

public class ContactUserBean extends BaseBusinessHolder{

	/**
	 * 
	 */
	private static final long serialVersionUID = 8784865306416887235L;
	
	private List<PlatSmsHolder> msgList = new ArrayList<PlatSmsHolder>();
	private List<ContactUserHolder> userList = new ArrayList<ContactUserHolder>();
	
	private String src;
	private String target;
	private String groupCode;
	public List<PlatSmsHolder> getMsgList() {
		return msgList;
	}
	public void setMsgList(List<PlatSmsHolder> msgList) {
		this.msgList = msgList;
	}
	public List<ContactUserHolder> getUserList() {
		return userList;
	}
	public void setUserList(List<ContactUserHolder> userList) {
		this.userList = userList;
	}
	public String getSrc() {
		return src;
	}
	public void setSrc(String src) {
		this.src = src;
	}
	public String getTarget() {
		return target;
	}
	public void setTarget(String target) {
		this.target = target;
	}
	public String getGroupCode() {
		return groupCode;
	}
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	
	

}
