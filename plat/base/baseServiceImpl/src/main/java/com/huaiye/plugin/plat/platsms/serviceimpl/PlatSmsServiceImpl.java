/*
 * . PlatSmsService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsms.serviceimpl;


import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;
import com.huaiye.plugin.plat.platsms.holder.PlatSmsHolder;
import com.huaiye.plugin.plat.platsms.holder.PlatSmsMapper;
import com.huaiye.plugin.plat.platsms.service.PlatSmsService;
/**
 * . 通讯录消息表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSmsServiceImpl extends BaseBusinessServiceImpl<PlatSmsHolder> implements PlatSmsService {

	@Override
	public int updateStatus(PlatSmsHolder holder) {
		return ((PlatSmsMapper)mapper).updateStatus(holder);
	}

}
