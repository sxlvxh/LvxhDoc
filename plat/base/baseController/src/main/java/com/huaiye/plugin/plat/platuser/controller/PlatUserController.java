/*
 * .PlatUserController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platuser.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
import com.huaiye.plugin.plat.platcommuserlist.holder.PlatCommUserListHolder;
import com.huaiye.plugin.plat.platcommuserlist.service.PlatCommUserListService;
import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platcontactgroup.service.PlatContactGroupService;
import com.huaiye.plugin.plat.platdeplist.holder.PlatDepListHolder;
import com.huaiye.plugin.plat.platdeplist.service.PlatDepListService;
import com.huaiye.plugin.plat.platent.holder.PlatEntHolder;
import com.huaiye.plugin.plat.platentlist.holder.PlatEntListHolder;
import com.huaiye.plugin.plat.platentlist.service.PlatEntListService;
import com.huaiye.plugin.plat.platrole.holder.PlatRoleHolder;
import com.huaiye.plugin.plat.platrole.service.PlatRoleService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuser.service.PlatUserService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserlist.service.PlatUserListService;
import com.huaiye.plugin.plat.platuserrole.holder.PlatUserRoleHolder;
import com.huaiye.plugin.plat.platuserrole.service.PlatUserRoleService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.holder.Pages;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 用户表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platuser")
@Controller
public class PlatUserController extends BaseController<PlatUserHolder> {

	private static final Logger LOG = Logger.getLogger(PlatUserController.class);

	@Autowired
	private PlatUserService platUserService;

	@Autowired
	private PlatUserRoleService platUserRoleService;

	@Autowired
	private PlatRoleService platRoleService;

	@Autowired
	private PlatEntListService platEntListService;

	@Autowired
	private PlatDepListService platDepListService;

	@Autowired
	private PlatUserListService platUserListService;

	@Autowired
	private PlatCommUserListService platCommUserListService;

	@Autowired
	private PlatContactGroupService platContactGroupService;

	@Autowired
	private PlatConfigCacheService platConfigCacheService;

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug(" init index page : " + req.getRemoteAddr());
		return new ModelAndView("html/platuser");
	}

	@RequestMapping(value = "/addUser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult addUser(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start addUser, params is: " + String.valueOf(holder));
		holder.setCreateUserId(PUtils.getCreateUserID(req));
		return platUserService.addUser(holder);
	}

	@RequestMapping(value = "/addBatchUser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult addBatchUser(@RequestBody PlatUserHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
		LOG.debug("start addUser, params is: " + String.valueOf(holder));
		holder.setCreateUserId(PUtils.getCreateUserID(req));
		List<PlatDepListHolder> depList = platDepListService.getList(new PlatDepListHolder());
		Random random = new Random();
		for (int i = 1; i < 1000; i++) {
			try {
				platUserService.addUser(holder);
				holder.setMobilePhone(String.valueOf(Integer.parseInt(holder.getMobilePhone()) + i));
				PlatDepListHolder dep = depList.get(random.nextInt(depList.size()));
				holder.setEntCode(dep.getEntCode());
				holder.setUserDepCode(dep.getDepCode());
				// holder.setLoginName("13912010001" + i);
				holder.setName(holder.getMobilePhone());
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}
		}

		return platUserService.addUser(holder);
	}

	@RequestMapping(value = "/modifyUser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult modifyUser(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start addUser, params is: " + String.valueOf(holder));
		holder.setUpdateUserId(PUtils.getCreateUserID(req));
		return platUserService.modifyUser(holder);
	}

	@RequestMapping(value = "/getTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getTree(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		if (StringUtils.isBlank(holder.getUserCode())) {
			result.setCode(1);
			result.setDesc("用户编号不能为空！");
			return result;
		}
		List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
		Map<String, BaseTreeHolder> map = new HashMap<String, BaseTreeHolder>();
		List<PlatRoleHolder> roleList = platRoleService.getList(new PlatRoleHolder());

		PlatUserRoleHolder _ur = new PlatUserRoleHolder();
		_ur.setUserCode(holder.getUserCode());
		List<PlatUserRoleHolder> userRoleList = platUserRoleService.getList(_ur);
		if (roleList != null) {
			for (PlatRoleHolder _m : roleList) {
				BaseTreeHolder _tree = new BaseTreeHolder();
				_tree.setPid(null);
				_tree.setId(String.valueOf(_m.getId()));
				_tree.setName(_m.getRoleName());
				_tree.setDataType("role");
				_tree.setImg("/tree/leafs.png");
				_tree.setHasChild(false);
				// _tree.setObj(_holder);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
			}
		}
		if (userRoleList != null) {
			for (PlatUserRoleHolder _m : userRoleList) {

				BaseTreeHolder _rr = map.get(String.valueOf(_m.getRoleId()));
				if (_rr != null) {
					_rr.setSelected(true);
				}
			}
		}
		result.setObj(map);
		result.setResult(treeList);
		return result;
	}

	@RequestMapping(value = "/setting", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult setting(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		return platUserService.setUserRole(holder);
	}

	@RequestMapping(value = "/getOSTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getOSTree(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
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
		Map<String, PlatEntListHolder> entMap = new HashMap<String, PlatEntListHolder>();
		PlatEntListHolder _ent = new PlatEntListHolder();
		_ent.setActiveEntCode(user.getEntCode());
		List<PlatEntListHolder> entList = platEntListService.getList(_ent);
		List<PlatDepListHolder> depList = platDepListService.getList(new PlatDepListHolder());
		PlatUserListHolder _user = new PlatUserListHolder();
		_user.setActiveEntCode(user.getEntCode());
		List<PlatUserListHolder> userList = platUserListService.getList(_user);
		Map<String, BaseTreeHolder> listMap = new HashMap<String, BaseTreeHolder>();
		if (entList != null) {
			for (PlatEntListHolder _e : entList) {
				entMap.put(_e.getEntCode(), _e);
				BaseTreeHolder _tree = getEntTree(_e);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
				BaseTreeHolder _tree1 = getEntTree(_e);
				listMap.put(_tree1.getId(), _tree1);
			}
		}
		if (depList != null) {
			for (PlatDepListHolder _dep : depList) {
				PlatEntListHolder _e = entMap.get(_dep.getEntCode());
				if (_e != null) {
					BaseTreeHolder _tree = getDepTree(_dep, _e);
					treeList.add(_tree);
					map.put(_tree.getId(), _tree);
					BaseTreeHolder _tree1 = getDepTree(_dep, _e);
					listMap.put(_tree1.getId(), _tree1);
				}
			}

		}

		if (userList != null) {
			Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
			for (PlatUserListHolder _e : userList) {

				_e.setDomainCode(platConfigCacheService.getDomainCode(_map, _e.getEntCode()));
				BaseTreeHolder _tree = getUserTree(_e);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);

				BaseTreeHolder _tree1 = getUserTree(_e);
				listMap.put(_tree1.getId(), _tree1);

			}

		}

		List<BaseTreeHolder> resList = PUtils.getTreeList(treeList, map);
		/*
		 * if(resList !=null) { for(BaseTreeHolder _bth : resList) {
		 * if("dep".equals(_bth.getDataType())) { _bth.getTreeList().clear(); } } }
		 */
		result.setObj(map);
		result.setResult(resList);
		return result;
	}

	@RequestMapping(value = "/getOSUserTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getOSUserTree(@RequestBody PlatUserHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
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
		PlatUserListHolder _user = new PlatUserListHolder();
		_user.setUserDepCode(holder.getUserDepCode());
		List<PlatUserListHolder> userList = platUserListService.getList(_user);
		Map<String, BaseTreeHolder> listMap = new HashMap<String, BaseTreeHolder>();
		if (userList != null) {
			Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
			for (PlatUserListHolder _e : userList) {
				_e.setDomainCode(platConfigCacheService.getDomainCode(_map, _e.getEntCode()));
				BaseTreeHolder _tree = getUserTree(_e);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
				BaseTreeHolder _tree1 = getUserTree(_e);
				listMap.put(_tree1.getId(), _tree1);
			}
		}
		//List<BaseTreeHolder> resList = PUtils.getTreeList(treeList, map);
		result.setObj(map);
		result.setResult(treeList);
		return result;
	}

	private BaseTreeHolder getUserTree(PlatUserListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		if (StringUtils.isNotEmpty(_e.getUserDepCode())) {
			_tree.setPid(_e.getEntCode() + "_" + _e.getUserDepCode());

		} else {
			_tree.setPid(_e.getEntCode());
		}
		_tree.setId(_e.getUserCode());
		_tree.setName(_e.getName());
		_tree.setDataType("user");
		_tree.setImg(_e.getImgUrl());
		_tree.setHasChild(false);
		
		PlatUserListHolder _temp = new PlatUserListHolder();
		_temp.setDomainCode(_e.getDomainCode());
		_tree.setObj(_temp);
		return _tree;
	}

	private BaseTreeHolder getUserSearchTree(PlatUserListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_e.getEntCode());
		_tree.setId(_e.getUserCode());
		_tree.setName(_e.getName());
		_tree.setDataType("user");
		_tree.setImg(_e.getImgUrl());
		_tree.setHasChild(false);
		_tree.setLabel("<span class='search_label_mark'>[" + _e.getEntName() + "---" + _e.getDepName() + "]</span>");
		_tree.setObj(_e);
		return _tree;
	}

	private BaseTreeHolder getDepTree(PlatDepListHolder _dep, PlatEntListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		if (StringUtils.isNotEmpty(_dep.getParentCode())) {
			_tree.setPid(_dep.getEntCode() + "_" + _dep.getParentCode());

		} else {
			_tree.setPid(_dep.getEntCode());
		}
		_tree.setId(_dep.getEntCode() + "_" + _dep.getDepCode());
		_tree.setName(_dep.getName());
		_tree.setDataType("dep");
		_tree.setImg("/tree/dept.png");
		//_tree.setObj(_dep);
		_tree.setHasChild(false);
		return _tree;
	}

	private BaseTreeHolder getEntTree(PlatEntListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_e.getParentCode());
		_tree.setId(_e.getEntCode());
		_tree.setName(_e.getEntName());
		_tree.setDataType("ent");
		_tree.setImg("/tree/ent.png");
		_tree.setHasChild(false);
		//_tree.setObj(_e);
		return _tree;
	}

	@RequestMapping(value = "/search", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult search(@RequestBody PlatUserListHolder holder, HttpServletRequest req, HttpServletResponse resp) {
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

		Pages page = new Pages();
		page.setCurPage(1);
		page.setPageSize(50);
		holder.setPages(page);
		List<PlatUserListHolder> userList = platUserListService.getGrid(holder).getList();
		Map<String, BaseTreeHolder> listMap = new HashMap<String, BaseTreeHolder>();

		if (userList != null) {
			Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
			for (PlatUserListHolder _e : userList) {
				_e.setDomainCode(platConfigCacheService.getDomainCode(_map, _e.getEntCode()));
				BaseTreeHolder _tree = getUserSearchTree(_e);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);

				BaseTreeHolder _tree1 = getUserSearchTree(_e);
				listMap.put(_tree1.getId(), _tree1);

			}

		}
		result.setObj(map);
		result.setResult(treeList);
		return result;
	}

	@RequestMapping(value = "/getCommonUser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getCommonUser(@RequestBody PlatUserListHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
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

		PlatContactGroupHolder _cg = new PlatContactGroupHolder();
		_cg.setUserCode(user.getUserCode());
		_cg.setGroupType(2);
		PlatContactGroupHolder _commonGroup = platContactGroupService.get(_cg);
		Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
		if (_commonGroup != null) {
			PlatCommUserListHolder _g = new PlatCommUserListHolder();
			_g.setGroupCode(_commonGroup.getGroupCode());
			List<PlatCommUserListHolder> contactUser = platCommUserListService.getList(_g);
			if (contactUser != null) {
				for (PlatCommUserListHolder _h : contactUser) {
					_h.setDomainCode(platConfigCacheService.getDomainCode(_map, _h.getEntCode()));
					if (!_h.getFriendUserCode().equals(user.getUserCode())) {
						BaseTreeHolder _tree = getContact(_h);
						treeList.add(_tree);
						BaseTreeHolder _tree1 = getContact(_h);
						map.put(_tree1.getId(), _tree1);
					}
				}
			}
		}

		List<PlatCommUserListHolder> cl = queryGroup(user);
		if (cl != null) {
			for (PlatCommUserListHolder _h : cl) {
				_h.setDomainCode(platConfigCacheService.getDomainCode(_map, _h.getEntCode()));
				BaseTreeHolder _tree = getGroup(_h);
				treeList.add(_tree);
				BaseTreeHolder _tree1 = getGroup(_h);
				map.put(_tree1.getId(), _tree1);

			}
		}
		result.setObj(map);
		Collections.sort(treeList);
		result.setResult(treeList);
		return result;
	}

	private List<PlatCommUserListHolder> queryGroup(PlatUserListHolder user) {
		PlatCommUserListHolder _g = new PlatCommUserListHolder();
		_g.setFriendUserCode(user.getUserCode());
		_g.setGroupType(1);
		List<PlatCommUserListHolder> cl = platCommUserListService.getList(_g);
		return cl;
	}

	private BaseTreeHolder getContact(PlatCommUserListHolder contact) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(null);
		_tree.setId(String.valueOf(contact.getFriendUserCode()));
		_tree.setName(contact.getFriendMark());
		_tree.setDataType("contact");
		_tree.setImg(contact.getImgUrl());
		_tree.setHasChild(false);
		if(contact.getTopTime() != null)
		{
			_tree.setSortTime(contact.getTopTime().getTime());
		}else
		{
			_tree.setSortTime(contact.getCreateTime().getTime());
		}
		_tree.setObj(contact);
		return _tree;
	}

	private BaseTreeHolder getGroup(PlatCommUserListHolder commonGroup) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(null);
		_tree.setId(commonGroup.getGroupCode());
		_tree.setName(commonGroup.getGroupName());
		_tree.setDataType("group");
		_tree.setImg("/images/group.png");
		_tree.setHasChild(false);
		if(commonGroup.getTopTime() !=null)
		{
			_tree.setSortTime(commonGroup.getTopTime().getTime());
		}else
		{
			_tree.setSortTime(commonGroup.getCreateTime().getTime());
		}
		_tree.setObj(commonGroup);
		return _tree;
	}

	@RequestMapping(value = "/getUserListBylist", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getUserListBylist(@RequestBody List<PlatUserListHolder> list, HttpServletRequest req,
			HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		Map<String, PlatUserListHolder> map = new HashMap<String, PlatUserListHolder>();
		List<PlatUserListHolder> userList = platUserListService.getList(new PlatUserListHolder());
		// Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
		if (userList != null) {
			for (PlatUserListHolder _e : userList) {
				// _e.setDomainCode(platConfigCacheService.getDomainCode(_map,
				// _e.getEntCode()));
				map.put(_e.getUserCode(), _e);
			}
		}
		if (list != null) {
			for (PlatUserListHolder _e : list) {
				PlatUserListHolder _holder = map.get(_e.getUserCode());
				if (_holder != null) {
					_e.setImgUrl(platConfigCacheService.getImgUrl(_holder.getImgUrl()));
					_e.setUserTypeName(_holder.getUserTypeName());
					_e.setUserType(_holder.getUserType());
					_e.setUserServiceTypeName(_holder.getUserServiceTypeName());
					_e.setName(_holder.getName());
				}
			}

		}
	     result.setObj(map);
		result.setResult(list);
		return result;
	}
}
