/*
 * . PlatRoomService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroom.service;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.service.BaseBusinessService;

import java.util.List;

import com.huaiye.plugin.plat.platroom.holder.PlatRoomHolder;

/**
 * . 庭室业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatRoomService extends BaseBusinessService<PlatRoomHolder> {

	BaseResult deleteRoomBatch(List<PlatRoomHolder> holder);

}
