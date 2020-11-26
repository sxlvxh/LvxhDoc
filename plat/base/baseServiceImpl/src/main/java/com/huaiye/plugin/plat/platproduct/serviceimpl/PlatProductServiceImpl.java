/*
 * . PlatProductService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platproduct.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.huaiye.plugin.plat.platmodelpro.holder.PlatModelProHolder;
import com.huaiye.plugin.plat.platmodelpro.service.PlatModelProService;
import com.huaiye.plugin.plat.platproduct.holder.PlatProductHolder;
import com.huaiye.plugin.plat.platproduct.service.PlatProductService;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

/**
 * . 产品表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatProductServiceImpl extends BaseBusinessServiceImpl<PlatProductHolder> implements PlatProductService {

	@Autowired
	private PlatModelProService platModelProService;

	@Override
	public BaseResult setModel(PlatProductHolder holder) {

		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("操作成功");
		if (StringUtils.isNotBlank(holder.getProductCode())) {
			PlatModelProHolder _h = new PlatModelProHolder();
			_h.setProductCode(holder.getProductCode());
			platModelProService.delete(_h);

			if (holder.getTreeList() != null) {
				List<PlatModelProHolder> ll = new ArrayList<PlatModelProHolder>();
				for (BaseTreeHolder h : holder.getTreeList()) {
					PlatModelProHolder _hh = new PlatModelProHolder();
					_hh.setProductCode(holder.getProductCode());
					_hh.setModelCode(h.getId());
					ll.add(_hh);
				}

				if (ll != null && ll.size() > 0) {
					platModelProService.insertBatch(ll);
				}
			}

		} else {
			result.setCode(1);
			result.setDesc("操作失败，产品编码不能为空");
		}
		return result;

	}

}
