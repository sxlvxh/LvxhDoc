/*
 * . PlatSoftVersionService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftversion.service;


import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.huaiye.plugin.plat.platsoftversion.holder.PlatSoftVersionHolder;

/**
 * . 软件版本表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatSoftVersionService extends BaseBusinessService<PlatSoftVersionHolder> {

	PlatSoftVersionHolder add(PlatSoftVersionHolder holder);
	
	PlatSoftVersionHolder modify(PlatSoftVersionHolder holder);
}
