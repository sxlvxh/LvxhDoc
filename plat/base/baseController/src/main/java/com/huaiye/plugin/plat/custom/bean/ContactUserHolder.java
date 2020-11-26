package com.huaiye.plugin.plat.custom.bean;

import org.codehaus.jackson.map.annotate.JsonSerialize;

import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;

public class ContactUserHolder extends PlatUserHolder{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3631816831239945383L;

	private String domainCode;
	
	private boolean friend;
	public boolean isFriend() {
		return friend;
	}

	public void setFriend(boolean friend) {
		this.friend = friend;
	}

	public String getDomainCode() {
		return domainCode;
	}

	public void setDomainCode(String domainCode) {
		this.domainCode = domainCode;
	}
	/**
	 * . 好友备注
	 */
    private String friendMark;
    /**
	 * . 获取好友备注
	 *
	 * @return String
	 */
	@JsonSerialize(include=JsonSerialize.Inclusion.NON_NULL)
    public String getFriendMark(){  
        return friendMark;  
    }

    /**
	 * . 设置好友备注
	 *
	 * @column friendMark
	 *        好友备注
	 */
    public void setFriendMark(String friendMark){  
        this.friendMark = friendMark;  
    }
	
}
