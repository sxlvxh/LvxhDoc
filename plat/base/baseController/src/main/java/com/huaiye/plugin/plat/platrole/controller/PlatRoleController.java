/*
 * .PlatRoleController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platrole.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.custom.config.PlatConfigCacheService;
import com.huaiye.plugin.plat.platbutton.holder.PlatButtonHolder;
import com.huaiye.plugin.plat.platbutton.service.PlatButtonService;
import com.huaiye.plugin.plat.platmenu.holder.PlatMenuHolder;
import com.huaiye.plugin.plat.platmenu.service.PlatMenuService;
import com.huaiye.plugin.plat.platrole.holder.PlatRoleHolder;
import com.huaiye.plugin.plat.platrole.service.PlatRoleService;
import com.huaiye.plugin.plat.platrolemenu.holder.PlatRoleMenuHolder;
import com.huaiye.plugin.plat.platrolemenu.service.PlatRoleMenuService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserrolemb.holder.PlatUserRoleMbHolder;
import com.huaiye.plugin.plat.platuserrolemb.service.PlatUserRoleMbService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 角色表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platrole")
@Controller
public class PlatRoleController extends BaseController<PlatRoleHolder> {

	private static final Logger LOG = Logger.getLogger(PlatRoleController.class);

	@Autowired
	private PlatButtonService platButtonService;

	@Autowired
	private PlatMenuService platMenuService;

	@Autowired
	private PlatRoleMenuService platRoleMenuService;
	
	@Autowired
	private PlatUserRoleMbService platUserRoleMbService;
	
	@Autowired
	private PlatRoleService platRoleService;

	private BaseTreeHolder getButtonTree(PlatButtonHolder _m) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		if (StringUtils.isNotBlank(_m.getParentCode())) {
			_tree.setPid(_m.getParentCode());
		} else {
			_tree.setPid(_m.getMenuCode());
		}
		_tree.setId(_m.getButtonCode());
		_tree.setName(_m.getButtonName());
		_tree.setDataType("button");
		_tree.setImg("/tree/panic_button.png");
		_tree.setHasChild(false);
		// _tree.setObj(_holder);
		return _tree;
	}

	private BaseTreeHolder getMenuTree(PlatMenuHolder _m) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_m.getParentCode());
		_tree.setId(_m.getMenuCode());
		_tree.setName(_m.getDescription());
		_tree.setDataType("menu");
		_tree.setImg("/tree/menu.png");
		_tree.setHasChild(false);
		// _tree.setObj(_holder);
		return _tree;
	}

	private void getRootUserTree(PlatRoleHolder holder, List<BaseTreeHolder> treeList, Map<String, BaseTreeHolder> map,
			Map<String, BaseTreeHolder> listMap) {
		List<PlatMenuHolder> list = platMenuService.getList(new PlatMenuHolder());
		List<PlatButtonHolder> blist = platButtonService.getList(new PlatButtonHolder());
		PlatRoleMenuHolder _role = new PlatRoleMenuHolder();
		_role.setRoleId(holder.getId());
		List<PlatRoleMenuHolder> rlist = platRoleMenuService.getList(_role);
		if (list != null) {
			for (PlatMenuHolder _m : list) {
				setMenuTree(treeList, map, listMap, _m);
			}
		}

		if (blist != null) {
			for (PlatButtonHolder _m : blist) {
				setButtonTree(treeList, map, listMap, _m);
			}
		}

		setSelectNode(map, listMap, rlist);
	}

	private void getUserTree(PlatRoleHolder holder, PlatUserListHolder user, List<BaseTreeHolder> treeList,
			Map<String, BaseTreeHolder> map, Map<String, BaseTreeHolder> listMap) {
		List<PlatMenuHolder> list = platMenuService.getList(new PlatMenuHolder());
		List<PlatButtonHolder> blist = platButtonService.getList(new PlatButtonHolder());
		PlatUserRoleMbHolder _mb = new PlatUserRoleMbHolder();
		_mb.setUserCode(user.getUserCode());
		_mb.setGroupBy("MENU_CODE");
		List<PlatUserRoleMbHolder> mbList = platUserRoleMbService.getList(_mb);
		Map<String,PlatUserRoleMbHolder> mbMap = new HashMap<String, PlatUserRoleMbHolder>();
		
		PlatRoleMenuHolder _role = new PlatRoleMenuHolder();
		_role.setRoleId(holder.getId());
		List<PlatRoleMenuHolder> rlist = platRoleMenuService.getList(_role);
		
		if(mbList !=null)
		{
			for(PlatUserRoleMbHolder _mm : mbList)
			{
				mbMap.put(_mm.getMenuCode(), _mm);
			}
		}
		
		if (list != null) {
			for (PlatMenuHolder _m : list) {
				PlatUserRoleMbHolder _mm = mbMap.get(_m.getMenuCode());
				if(_mm !=null)
				{
					setMenuTree(treeList, map, listMap, _m);
				}
			}
		}

		if (blist != null) {
			for (PlatButtonHolder _m : blist) {
				PlatUserRoleMbHolder _mm = mbMap.get(_m.getButtonCode());
				if(_mm !=null)
				{
					setButtonTree(treeList, map, listMap, _m);
				}
			}
		}
		setSelectNode(map, listMap, rlist);
	}

	private void setButtonTree(List<BaseTreeHolder> treeList, Map<String, BaseTreeHolder> map,
			Map<String, BaseTreeHolder> listMap, PlatButtonHolder _m) {
		BaseTreeHolder _tree = getButtonTree(_m);
		treeList.add(_tree);
		map.put(_tree.getId(), _tree);
		BaseTreeHolder _tree1 = getButtonTree(_m);
		listMap.put(_tree1.getId(), _tree1);
	}

	private void setMenuTree(List<BaseTreeHolder> treeList, Map<String, BaseTreeHolder> map,
			Map<String, BaseTreeHolder> listMap, PlatMenuHolder _m) {
		BaseTreeHolder _tree = getMenuTree(_m);
		treeList.add(_tree);
		map.put(_tree.getId(), _tree);
		BaseTreeHolder _tree1 = getMenuTree(_m);
		listMap.put(_tree1.getId(), _tree1);
	}

	private void setSelectNode(Map<String, BaseTreeHolder> map, Map<String, BaseTreeHolder> listMap,
			List<PlatRoleMenuHolder> rlist) {
		if (rlist != null) {
			for (PlatRoleMenuHolder _rm : rlist) {
				BaseTreeHolder _h = map.get(_rm.getMenuCode());
				if (_h != null) {
					_h.setSelected(true);
				}

				BaseTreeHolder _h1 = listMap.get(_rm.getMenuCode());
				if (_h1 != null) {
					_h1.setSelected(true);
				}
			}
		}
	}
	
	@RequestMapping(value = "/getTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getTree(@RequestBody PlatRoleHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		if (holder.getId() == null) {
			result.setCode(1);
			result.setDesc("角色编号不能为空！");
			return result;
		}
		List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
		Map<String, BaseTreeHolder> map = new HashMap<String, BaseTreeHolder>();
		Map<String, BaseTreeHolder> listMap = new HashMap<String, BaseTreeHolder>();
		if ("lvxh".equals(user.getUserCode())) {
			getRootUserTree(holder, treeList, map, listMap);
		} else {
			getUserTree(holder, user, treeList, map, listMap);
		}
		List<BaseTreeHolder> resList = PUtils.getTreeList(treeList, map);
		result.setObj(listMap);
		result.setResult(resList);
		return result;
	}

	
	/**
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug(" init index page : " + req.getRemoteAddr());
		return new ModelAndView("html/platrole");
	}

	

	@RequestMapping(value = "/setting", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult setting(@RequestBody PlatRoleHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		return platRoleService.setMenuRole(holder);
	}
}
