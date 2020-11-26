/*
 * . PlatSmsService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsms.service;


import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.huaiye.plugin.plat.platsms.holder.PlatSmsHolder;

/**
 * . 通讯录消息表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatSmsService extends BaseBusinessService<PlatSmsHolder> {
	int updateStatus(PlatSmsHolder holder);
}
