/*
 * .PlatRoomGroupController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroomgroup.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.custom.config.PlatConfigCacheService;
import com.huaiye.plugin.plat.platentlist.holder.PlatEntListHolder;
import com.huaiye.plugin.plat.platentlist.service.PlatEntListService;
import com.huaiye.plugin.plat.platroomgroup.holder.PlatRoomGroupHolder;
import com.huaiye.plugin.plat.platroomgrouplist.holder.PlatRoomGroupListHolder;
import com.huaiye.plugin.plat.platroomgrouplist.service.PlatRoomGroupListService;
import com.huaiye.plugin.plat.platroomlist.holder.PlatRoomListHolder;
import com.huaiye.plugin.plat.platroomlist.service.PlatRoomListService;
import com.huaiye.plugin.plat.platroomnode.holder.PlatRoomNodeHolder;
import com.huaiye.plugin.plat.platroomnode.service.PlatRoomNodeService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;
import com.lvxh.plugin.platform.holder.Sort;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 庭室分组接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platroomgroup")
@Controller
public class PlatRoomGroupController extends BaseController<PlatRoomGroupHolder> {

   private static final Logger LOG = Logger.getLogger(PlatRoomGroupController.class);

   @Autowired
   private PlatRoomGroupListService groupListService;
   
   @Autowired
   private PlatRoomListService listService;
   
   @Autowired
   private PlatRoomNodeService nodeService;
   
   @Autowired
   private PlatEntListService platEntListService;
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platroomgroup");
    }
    
	@RequestMapping(value = "/getRoomTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getRoomTree(@RequestBody PlatRoomGroupHolder holder, HttpServletRequest req, HttpServletResponse resp) {
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
		PlatRoomGroupListHolder _ent = new PlatRoomGroupListHolder();
		_ent.setActiveEntCode(user.getEntCode());
		_ent.setSort(holder.getSort());
		List<PlatRoomGroupListHolder> gl =  groupListService.getList(_ent);
		PlatRoomListHolder _room  = new PlatRoomListHolder();
		_room.setSort(holder.getSort());
		List<PlatRoomListHolder> rl =  listService.getList(_room);
		if(gl !=null)
		{
			for(PlatRoomGroupListHolder _e : gl)
			{
				BaseTreeHolder _tree = getGroupTree(_e);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
				
			}
			
		}
		if(rl != null)
		{
			for(PlatRoomListHolder _r : rl)
			{
			    	BaseTreeHolder _tree = getRTree(_r);
					treeList.add(_tree);
					map.put(_tree.getId(), _tree);
			}
			
		}
		
		PlatEntListHolder _ent1 = new PlatEntListHolder();
		_ent1.setActiveEntCode(user.getEntCode());
		_ent1.setSort(holder.getSort());
		List<PlatEntListHolder> entList =  platEntListService.getList(_ent1);
		
		if(entList !=null)
		{
			for(PlatEntListHolder _e : entList)
			{
				BaseTreeHolder _tree = getEntTree(_e);
				treeList.add(_tree);
				map.put(_tree.getId(), _tree);
				
			}
			
		}
		
		List<BaseTreeHolder> resList = PUtils.getTreeList(treeList, map);
		result.setObj(map);
		result.setResult(resList);
		return result;
	}
	
	@RequestMapping(value = "/getRoomNodeByRoomCode", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getRoomNodeByRoomCode(@RequestBody PlatRoomNodeHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
		List<PlatRoomNodeHolder> rl =  nodeService.getList(holder);
		if(rl != null)
		{
			for(PlatRoomNodeHolder _r : rl)
			{
			    	BaseTreeHolder _tree = getRNTree(_r);
					treeList.add(_tree);
			}
			
		}
		result.setResult(treeList);
		return result;
	}
	
	@RequestMapping(value = "/getRoomByGroupCode", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getRoomByGroupCode(@RequestBody PlatRoomListHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
		List<PlatRoomListHolder> rl =  listService.getList(holder);
		if(rl != null)
		{
			for(PlatRoomListHolder _r : rl)
			{
			    	BaseTreeHolder _tree = getRTree(_r);
					treeList.add(_tree);
			}
			
		}
		result.setResult(treeList);
		return result;
	}
	
	private BaseTreeHolder getGroupTree(PlatRoomGroupListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_e.getEntCode());
		_tree.setId(_e.getGroupCode());
		_tree.setName(_e.getGroupName());
		_tree.setDataType("group");
		_tree.setImg("/images/shexiangtou.png");
		_tree.setHasChild(false);
		_tree.setObj(_e);
		return _tree;
	}
	
	private BaseTreeHolder getRTree(PlatRoomListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_e.getGroupCode());
		_tree.setId(_e.getRoomCode());
		_tree.setName(_e.getRoomName());
		_tree.setDataType("room");
		_tree.setImg("/images/device-room.png");
		_tree.setHasChild(false);
		_tree.setObj(_e);
		return _tree;
	}
	private BaseTreeHolder getRNTree(PlatRoomNodeHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_e.getRoomCode());
		_tree.setId(String.valueOf(_e.getId()));
		_tree.setName(_e.getRoomNodeName());
		_tree.setDataType("roomnode");
		_tree.setImg("/images/device-room-node.png");
		_tree.setHasChild(false);
		_tree.setObj(_e);
		return _tree;
	}
	
	private BaseTreeHolder getEntTree(PlatEntListHolder _e) {
		BaseTreeHolder _tree = new BaseTreeHolder();
		_tree.setPid(_e.getParentCode());
		_tree.setId(_e.getEntCode());
		_tree.setName(_e.getEntName());
		_tree.setDataType("ent");
		_tree.setImg("/tree/menu.png");
		_tree.setHasChild(false);
		return _tree;
	}
	
	
}
