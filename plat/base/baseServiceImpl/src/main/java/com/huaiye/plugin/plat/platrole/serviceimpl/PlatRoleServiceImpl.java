/*
 * . PlatRoleService.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platrole.serviceimpl;


import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.impl.BaseBusinessServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.huaiye.plugin.plat.platrole.holder.PlatRoleHolder;
import com.huaiye.plugin.plat.platrole.service.PlatRoleService;
import com.huaiye.plugin.plat.platrolemenu.holder.PlatRoleMenuHolder;
import com.huaiye.plugin.plat.platrolemenu.service.PlatRoleMenuService;
/**
 * . 角色表业务接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
public class PlatRoleServiceImpl extends BaseBusinessServiceImpl<PlatRoleHolder> implements PlatRoleService {

	@Autowired
	private PlatRoleMenuService platRoleMenuService;
	
	@Override
	public BaseResult setMenuRole(PlatRoleHolder holder) {
		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("操作成功");
		if (holder.getId() == null) {
			result.setCode(1);
			result.setDesc("操作失败，角色编号不能为空！");
			return result;

		}

		PlatRoleMenuHolder _role = new PlatRoleMenuHolder();
		_role.setRoleId(holder.getId());
		platRoleMenuService.delete(_role);

		List<PlatRoleMenuHolder> ll = new ArrayList<PlatRoleMenuHolder>();
		List<BaseTreeHolder> treeList = holder.getTreeList();
		if (treeList != null) {
			for (BaseTreeHolder _tree : treeList) {
				PlatRoleMenuHolder _r = new PlatRoleMenuHolder();
				_r.setRoleId(holder.getId());
				_r.setMenuCode(_tree.getId());
				ll.add(_r);
			}
			platRoleMenuService.insertBatch(ll);
		}
		return result;
	}

}
