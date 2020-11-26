/*
 * . PlatContactService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontact.serviceimpl;


import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

import java.util.List;

import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;
import com.huaiye.plugin.plat.platcontact.service.PlatContactService;
/**
 * . 联系人表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatContactServiceImpl extends BaseBusinessServiceImpl<PlatContactHolder> implements PlatContactService {

	@Override
	public List<PlatContactHolder> getUserList(String groupCode) {
		PlatContactHolder holder = new PlatContactHolder();
		holder.setGroupCode(groupCode);
		return getList(holder);
	}

}
