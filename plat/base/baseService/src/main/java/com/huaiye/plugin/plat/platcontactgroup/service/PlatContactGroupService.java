/*
 * . PlatContactGroupService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontactgroup.service;


import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;

/**
 * . 联系人群组业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatContactGroupService extends BaseBusinessService<PlatContactGroupHolder> {
	PlatContactGroupHolder getCommonGroup(String userCode);
}
