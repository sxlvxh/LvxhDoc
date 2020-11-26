/*
 * . PlatSoftVersionService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftversion.serviceimpl;


import java.util.List;

import com.huaiye.plugin.plat.platsoftversion.holder.PlatSoftVersionHolder;
import com.huaiye.plugin.plat.platsoftversion.service.PlatSoftVersionService;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;
/**
 * . 软件版本表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatSoftVersionServiceImpl extends BaseBusinessServiceImpl<PlatSoftVersionHolder> implements PlatSoftVersionService {

	@Override
	public PlatSoftVersionHolder add(PlatSoftVersionHolder holder) {
		if(holder !=null)
		{
			holder.setIsdel(0);
			modifyActive(holder);
			mapper.insert(holder);
		}
		return holder;
	}

	private void modifyActive(PlatSoftVersionHolder holder) {
		if("0".equals(holder.getActive()))
		{
			PlatSoftVersionHolder _h = new PlatSoftVersionHolder();
			_h.setSoftCode(holder.getSoftCode());
			_h.setActive("0");
			List<PlatSoftVersionHolder> list = mapper.getList(_h);
			if(list !=null)
			{
				for(PlatSoftVersionHolder _hh : list)
				{
					PlatSoftVersionHolder _h1 = new PlatSoftVersionHolder();
					_h1.setActive("1");
					_h1.setId(_hh.getId());
					mapper.update(_h1);
				}
			}
			
		}
	}

	@Override
	public PlatSoftVersionHolder modify(PlatSoftVersionHolder holder) {
		if(holder !=null)
		{
			modifyActive(holder);
			mapper.update(holder);
		}
		return holder;
	}

}
