/*
 * . PlatRoomService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroom.serviceimpl;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.huaiye.plugin.plat.platroom.holder.PlatRoomHolder;
import com.huaiye.plugin.plat.platroom.service.PlatRoomService;
import com.huaiye.plugin.plat.platroomnode.holder.PlatRoomNodeHolder;
import com.huaiye.plugin.plat.platroomnode.service.PlatRoomNodeService;
/**
 * . 庭室业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoomServiceImpl extends BaseBusinessServiceImpl<PlatRoomHolder> implements PlatRoomService {

	@Autowired
	private PlatRoomNodeService platRoomNodeService;
	
	@Override
	public BaseResult deleteRoomBatch(List<PlatRoomHolder> holder) {
		// TODO Auto-generated method stub
		BaseResult res = new BaseResult();
		for(PlatRoomHolder a : holder) {
			PlatRoomHolder newh = get(a);
			PlatRoomNodeHolder dh = new PlatRoomNodeHolder();
			dh.setRoomCode(newh.getRoomCode());
			platRoomNodeService.delete(dh);
			delete(a);
		}
		res.setCode(0);
		res.setDesc("删除成功");;
		return res;
	}

}
