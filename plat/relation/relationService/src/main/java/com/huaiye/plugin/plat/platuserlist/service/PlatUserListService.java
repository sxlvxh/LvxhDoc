/*
 * . PlatUserListService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuserlist.service;


import com.lvxh.plugin.platform.service.BaseBusinessService;

import java.util.List;

import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;

/**
 * . 用户列表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatUserListService extends BaseBusinessService<PlatUserListHolder> {
	List<PlatUserListHolder> getListByUserCode(PlatUserListHolder holder);
}
