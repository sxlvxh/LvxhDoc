/*
 * . PlatUserListService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuserlist.serviceimpl;


import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

import java.util.List;

import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListMapper;
import com.huaiye.plugin.plat.platuserlist.service.PlatUserListService;
/**
 * . 用户列表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatUserListServiceImpl extends BaseBusinessServiceImpl<PlatUserListHolder> implements PlatUserListService {

	@Override
	public List<PlatUserListHolder> getListByUserCode(PlatUserListHolder holder) {
		return ((PlatUserListMapper)mapper).getListByUserCode(holder);
	}

}
