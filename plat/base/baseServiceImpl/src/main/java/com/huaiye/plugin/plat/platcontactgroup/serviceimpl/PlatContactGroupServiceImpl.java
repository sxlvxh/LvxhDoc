/*
 * . PlatContactGroupService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontactgroup.serviceimpl;


import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

import org.apache.commons.lang.StringUtils;

import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platcontactgroup.service.PlatContactGroupService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
/**
 * . 联系人群组业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatContactGroupServiceImpl extends BaseBusinessServiceImpl<PlatContactGroupHolder> implements PlatContactGroupService {

	@Override
	public PlatContactGroupHolder getCommonGroup(String userCode) {
		PlatContactGroupHolder _g = new PlatContactGroupHolder();
    	_g.setUserCode(userCode);
    	_g.setGroupType(2);
    	return get(_g);
	}
}
