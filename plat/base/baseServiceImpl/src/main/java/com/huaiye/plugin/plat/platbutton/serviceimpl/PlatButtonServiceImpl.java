/*
 * . PlatButtonService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platbutton.serviceimpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.huaiye.plugin.plat.platbutton.holder.PlatButtonHolder;
import com.huaiye.plugin.plat.platbutton.service.PlatButtonService;
import com.huaiye.plugin.plat.platfield.holder.PlatFieldHolder;
import com.huaiye.plugin.plat.platfield.service.PlatFieldService;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 页面按钮表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatButtonServiceImpl extends BaseBusinessServiceImpl<PlatButtonHolder> implements PlatButtonService {

	@Autowired
	private PlatFieldService platFieldService;

	@Override
	public BaseResult copyMenu(PlatButtonHolder holder) {

		BaseResult result = new BaseResult();
		result.setDesc("操作成功");
		result.setCode(0);
		String srcMenuCode = holder.getSrcMenuCode();
		String targetMenuCode = holder.getTargetMenuCode();
		if (srcMenuCode.equals(targetMenuCode)) {
			result.setCode(1);
			result.setDesc("目标菜单不能和源菜单相同");
			return result;
		}
		PlatButtonHolder queryHolder = new PlatButtonHolder();
		queryHolder.setMenuCode(srcMenuCode);

		List<PlatButtonHolder> blist = getList(queryHolder);
		Map<String, PlatButtonHolder> map = new HashMap<String, PlatButtonHolder>();
		if (blist != null) {
			for (PlatButtonHolder _b : blist) {
				map.put(_b.getButtonCode(), _b);
				_b.setButtonCode(PUtils.getUUID());
				_b.setMenuCode(targetMenuCode);
				_b.setId(null);
			}
			for (PlatButtonHolder _b : blist) {
				PlatButtonHolder _p = map.get(_b.getParentCode());
				if (_p != null) {
					_b.setParentCode(_p.getButtonCode());
				}
			}
		}

		PlatFieldHolder fholder = new PlatFieldHolder();
		fholder.setMenuCode(srcMenuCode);
		List<PlatFieldHolder> flist = platFieldService.getList(fholder);
		if (flist != null) {
			for (PlatFieldHolder _b : flist) {
				_b.setMenuCode(targetMenuCode);
				_b.setId(null);
				PlatButtonHolder _p = map.get(_b.getButtonCode());
				if (_p != null) {
					_b.setButtonCode(_p.getButtonCode());
				}
			}

		}
		insertBatch(blist);
		platFieldService.insertBatch(flist);
		return result;

	}

	@Override
	public BaseResult copyButton(PlatButtonHolder holder) {
		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("操作成功");
		if (StringUtils.isNotBlank(holder.getButtonCode()) && StringUtils.isNotBlank(holder.getTargetMenuCode())) {

			PlatButtonHolder _holder = new PlatButtonHolder();
			_holder.setButtonCode(holder.getButtonCode());
			PlatButtonHolder btn = get(_holder);
			if (btn != null) {
				btn.setMenuCode(holder.getTargetMenuCode());
				btn.setButtonCode(PUtils.getUUID());
				btn.setButtonName(holder.getButtonName());
				btn.setParentCode(null);
				btn.setId(null);

				PlatFieldHolder _field = new PlatFieldHolder();
				_field.setButtonCode(holder.getButtonCode());
				List<PlatFieldHolder> list = platFieldService.getList(_field);

				for (PlatFieldHolder f : list) {
					f.setButtonCode(btn.getButtonCode());
					f.setMenuCode(holder.getTargetMenuCode());
					f.setId(null);
				}
				insert(btn);
				platFieldService.insertBatch(list);
			}
		} else {
			result.setCode(1);
			result.setDesc("按钮编号或目标菜单编号不能为空");
		}
		return result;
	}

}
