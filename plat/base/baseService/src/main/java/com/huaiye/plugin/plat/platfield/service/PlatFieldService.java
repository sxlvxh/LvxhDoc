/*
 * . PlatFieldService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platfield.service;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.huaiye.plugin.plat.platfield.holder.PlatFieldHolder;

/**
 * . 页面属性表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatFieldService extends BaseBusinessService<PlatFieldHolder> {

	BaseResult imports(PlatFieldHolder holder);

}
