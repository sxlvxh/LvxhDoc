/*
 * .PlatButtonController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platbutton.controller;

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
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 页面按钮表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platbutton")
@Controller
public class PlatButtonController extends BaseController<PlatButtonHolder> {

	private static final Logger LOG = Logger.getLogger(PlatButtonController.class);

	@Autowired
	private PlatButtonService platButtonService;

	@Autowired
	private PlatMenuService platMenuService;

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug(" init index page : " + req.getRemoteAddr());
		return new ModelAndView("html/platbutton");
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/test")
	public ModelAndView test(HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug(" init index page : " + req.getRemoteAddr());
		return new ModelAndView("html/test");
	}

	/**
	 * . 将指定菜单（源菜单）下的所有按钮都复制一份到指定的另外一个菜单（目标菜单）下
	 * 
	 * @param holders 复制条件
	 * 
	 * @return 操作结果
	 */
	@RequestMapping(value = "/copy", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult copyMenu(@RequestBody PlatButtonHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		return platButtonService.copyMenu(holder);
	}

	/**
	 * . 将指定菜单（源菜单）下的所有按钮都复制一份到指定的另外一个菜单（目标菜单）下
	 * 
	 * @param holders 复制条件
	 * 
	 * @return 操作结果
	 */
	@RequestMapping(value = "/copyButton", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult copyButton(@RequestBody PlatButtonHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
		return platButtonService.copyButton(holder);
	}

	@RequestMapping(value = "/getBtnTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getBtnTree(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
		Map<String, BaseTreeHolder> map = new HashMap<String, BaseTreeHolder>();
		List<PlatMenuHolder> menu = platMenuService.getList(new PlatMenuHolder());
		if (menu != null) {
			for (PlatMenuHolder _m : menu) {
				BaseTreeHolder _tree = getMenuTree(_m);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
			}
		}
		List<PlatButtonHolder> button = platButtonService.getList(new PlatButtonHolder());
		if (button != null) {
			for (PlatButtonHolder _m : button) {
				BaseTreeHolder _tree = getButtonTree(_m);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
			}
		}
		List<BaseTreeHolder> resList = PUtils.getTreeList(treeList, map);
		result.setResult(resList);
		result.setObj(map);
		return result;
	}

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
		 _tree.setObj(_m);
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
}
