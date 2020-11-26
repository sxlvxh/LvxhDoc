/*
 * . PlatButtonService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platbutton.service;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.service.BaseBusinessService;
import com.huaiye.plugin.plat.platbutton.holder.PlatButtonHolder;

/**
 * . 页面按钮表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public interface PlatButtonService extends BaseBusinessService<PlatButtonHolder> {

	BaseResult copyMenu(PlatButtonHolder holder);

	BaseResult copyButton(PlatButtonHolder holder);

}
