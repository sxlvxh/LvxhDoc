/*
 * .PlatSmsMapper.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsms.holder;

import com.lvxh.plugin.platform.holder.BaseBusinessMapper;

/**
 * . 通讯录消息表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatSmsMapper extends BaseBusinessMapper<PlatSmsHolder> {

	/**
	 * . 更新对象
	 * 
	 * @param holder
	 *            待更新对象
	 * @return 更新行数
	 */
	int updateStatus(PlatSmsHolder holder);

	
}
