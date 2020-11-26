/*
 * . PlatUserService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuser.service;


import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;
import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.service.BaseBusinessService;

/**
 * . 用户表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatUserService extends BaseBusinessService<PlatUserHolder> {

	BaseResult addUser(PlatUserHolder holder);

	BaseResult modifyUser(PlatUserHolder holder);

	BaseResult setUserRole(PlatUserHolder holder);
	
	PlatContactGroupHolder insertContactGroup(PlatUserHolder holder);
	
	boolean addFriend(PlatContactHolder holder, PlatUserHolder _user);

	boolean addCustomGroup(PlatContactGroupHolder holder, PlatUserHolder _user);

	boolean deleteFriend(PlatContactHolder holder, PlatUserHolder _user);

	boolean delGroupMember(PlatContactGroupHolder holder, PlatUserHolder _user);

	boolean quitGroup(PlatContactGroupHolder holder, PlatUserHolder _user);

	boolean modifyGroup(PlatContactGroupHolder holder);


}
