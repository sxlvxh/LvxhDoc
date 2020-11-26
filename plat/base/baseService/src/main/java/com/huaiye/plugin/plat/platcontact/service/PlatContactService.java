/*
 * . PlatContactService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontact.service;


import com.lvxh.plugin.platform.service.BaseBusinessService;

import java.util.List;

import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;

/**
 * . 联系人表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatContactService extends BaseBusinessService<PlatContactHolder> {

	List<PlatContactHolder> getUserList(String groupCode);

}
