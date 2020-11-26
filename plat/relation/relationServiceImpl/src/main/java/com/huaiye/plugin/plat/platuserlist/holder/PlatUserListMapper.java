/*
 * .PlatUserListMapper.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuserlist.holder;

import java.util.List;

import com.lvxh.plugin.platform.holder.BaseBusinessMapper;

/**
 * . 用户列表
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatUserListMapper extends BaseBusinessMapper<PlatUserListHolder> {
	List<PlatUserListHolder> getListByUserCode(PlatUserListHolder holder);
}
