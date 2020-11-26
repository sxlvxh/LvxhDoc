/*
 * . PlatFieldService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platfield.serviceimpl;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.huaiye.plugin.plat.platattr.holder.PlatAttrHolder;
import com.huaiye.plugin.plat.platattr.service.PlatAttrService;
import com.huaiye.plugin.plat.platfield.holder.PlatFieldHolder;
import com.huaiye.plugin.plat.platfield.service.PlatFieldService;
/**
 * . 页面属性表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatFieldServiceImpl extends BaseBusinessServiceImpl<PlatFieldHolder> implements PlatFieldService {

	@Autowired
	private PlatAttrService platAttrService;
	
	@Override
	public BaseResult imports(PlatFieldHolder holder) {

		PlatAttrHolder bean = new PlatAttrHolder();
   		bean.setClassName(holder.getFieldName());
   		List<PlatAttrHolder> list = platAttrService.getList(bean);
   		/*PlatButtonHolder b = new PlatButtonHolder();
   		b.setMenuCode(holder.getMenuCode());*/
   		List<PlatFieldHolder> ll = new ArrayList<PlatFieldHolder>();
   		for(PlatAttrHolder h:list)
   		{
   				PlatFieldHolder hh = new PlatFieldHolder();
   				hh.setMenuCode(holder.getMenuCode());
   				hh.setFieldName(h.getAttrName());
   				hh.setFieldLabel(h.getAttrLabel());
   				hh.setButtonCode(holder.getButtonCode());
   				hh.setEnable("1");
   				hh.setDisplay("0");
   				hh.setIsdel(0);
   				ll.add(hh);
   		}
   		super.insertBatch(ll);
   		return toBaseResult(0, "success");
	
	}

}
