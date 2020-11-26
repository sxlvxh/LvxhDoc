/*
 * . PlatProductService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platproduct.service;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.huaiye.plugin.plat.platproduct.holder.PlatProductHolder;

/**
 * . 产品表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatProductService extends BaseBusinessService<PlatProductHolder> {

	BaseResult setModel(PlatProductHolder holder);

}
