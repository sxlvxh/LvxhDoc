/*
 * .PlatContactController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontact.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.custom.config.PlatConfigCacheService;
import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;
import com.huaiye.plugin.plat.platcontact.service.PlatContactService;
import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platent.holder.PlatEntHolder;
import com.huaiye.plugin.plat.platgroupuser.holder.PlatGroupUserHolder;
import com.huaiye.plugin.plat.platgroupuser.service.PlatGroupUserService;
import com.huaiye.plugin.plat.platsms.holder.PlatSmsHolder;
import com.huaiye.plugin.plat.platsms.service.PlatSmsService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuser.service.PlatUserService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.netty.bean.MessageContent;
import com.lvxh.plugin.netty.client.NettyClientCache;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 联系人表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platcontact")
@Controller
public class PlatContactController extends BaseController<PlatContactHolder> {

   private static final Logger LOG = Logger.getLogger(PlatContactController.class);
   
   @Autowired
   private PlatUserService platUserService;
   
   @Autowired
   private PlatGroupUserService platGroupUserService;
   
  /* @Autowired
   private PlatContactGroupService platContactGroupService;*/
   
	@Autowired
	private PlatConfigCacheService platConfigCacheService;
	
	@Autowired
	private PlatContactService platContactService;
	
	@Autowired
	private PlatSmsService platSmsService;
   
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platcontact");
    }
    
    @RequestMapping(value = "/addFriend", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult addFriend(@RequestBody PlatContactHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		PlatUserHolder _user = new PlatUserHolder();
		BeanUtils.copyProperties(user, _user);
		
		if(platUserService.addFriend(holder, _user))
		{
			result.setCode(0);
			result.setDesc("操作成功!");
			addFriendSendNoticeMsg(holder, user);
		}else
		{
			result.setCode(1);
			result.setDesc("操作失败！");
		}
		return result;
	}
    
    @RequestMapping(value = "/deleteFriend", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult deleteFriend(@RequestBody PlatContactHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		PlatUserHolder _user = new PlatUserHolder();
		BeanUtils.copyProperties(user, _user);
		
		if(platUserService.deleteFriend(holder, _user))
		{
			result.setCode(0);
			result.setDesc("操作成功!");
			delFriendSendNoticeMsg(holder, user);
		}else
		{
			result.setCode(1);
			result.setDesc("操作失败！");
		}
		return result;
	}
    
	private void delFriendSendNoticeMsg(PlatContactHolder holder, PlatUserListHolder user) {
		List<String> list = new ArrayList<String>();
		list.add(holder.getUserCode());
		sendNoticeMsg(holder.getUserCode(), user,"{\"type\":\"deleteFriend\",\"content\":\""+user.getName()+"已将您从常用联系人中删除！\",\"creatTime\":\""+PUtils.dateTimeToStr(new Date())+"\"}",list);
	}

	private void addFriendSendNoticeMsg(PlatContactHolder holder, PlatUserListHolder user) {
		List<String> list = new ArrayList<String>();
		list.add(holder.getUserCode());
		sendNoticeMsg(holder.getUserCode(), user,"{\"type\":\"addFriend\",\"content\":\""+user.getName()+"已将您加为常用联系人！\",\"creatTime\":\""+PUtils.dateTimeToStr(new Date())+"\"}",list);
	}

	private void sendNoticeMsg(String code, PlatUserListHolder user,String content,List<String> sendList) {
		for(String a :sendList) {
			PlatSmsHolder _sms = new PlatSmsHolder();
			_sms.setSrc(user.getUserCode());
			_sms.setTarget(a);
			_sms.setContent(content);
			_sms.setSmsType("notice");
			_sms.setStatus(1);
			platSmsService.insert(_sms);
		}
		
		MessageContent bean = new MessageContent();
		bean.setMsgType("notice");
		bean.setContent(content);
		bean.setSrc(user.getUserCode());
		bean.setTarget(code);
		
		bean.setTargets(sendList);
		
		bean.setUid(PUtils.getUUID());
		
		try {
			NettyClientCache.put(bean);
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(), e);
		}
	}

    @RequestMapping(value = "/addCustomGroup", produces = "application/json;charset=UTF-8")
   	@ResponseBody
   	public BaseResult addCustomGroup(@RequestBody PlatContactGroupHolder holder, HttpServletRequest req, HttpServletResponse resp) {
   		BaseResult result = new BaseResult();
   		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
   		if (user == null) {
   			result.setCode(1);
   			result.setDesc("当前用户未登录！");
   			return result;
   		}
   		PlatUserHolder _user = new PlatUserHolder();
   		BeanUtils.copyProperties(user, _user);
   		
   		if(platUserService.addCustomGroup(holder, _user))
   		{
   			result.setCode(0);
   			result.setDesc("操作成功!");
   			List<String> list = null ;
   			if(StringUtils.isNotBlank(holder.getGroupCode())) {//添加群成员
   				 list = initSendList(holder, _user);
   			}else {//创建群组
   				String member = "";
   	   			int i=0;
   	   			for(PlatContactHolder a : holder.getContactList()) {
   	   				if(i>0) {
   	   					member = member +"，"+a.getFriendMark();
   	   				}else {
   	   					list =  new ArrayList<String>();
   	   					member = a.getFriendMark();
   	   				}
   	   				i++;
   	   				
   	   				if(!_user.getUserCode().equals(a.getUserCode())) {
   	   					list.add(a.getUserCode());
   	   				}
   	   			}
   	   			String content = user.getName()+"将"+member+"拉进群聊";
   	   			sendNoticeMsg(holder.getUserCode(), user,"{\"type\":\"addCustomGroup\",\"content\":\""+content+"！\",\"creatTime\":\""+PUtils.dateTimeToStr(new Date())+"\"}",list);
   			}
   		}else
   		{
   			result.setCode(1);
   			result.setDesc("操作失败！");
   		}
   		return result;
   	}
    
    @RequestMapping(value = "/getGroupUser", produces = "application/json;charset=UTF-8")
   	@ResponseBody
   	public BaseResult getGroupUser(@RequestBody PlatGroupUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
   		BaseResult result = new BaseResult();
   		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
   		if (user == null) {
   			result.setCode(1);
   			result.setDesc("当前用户未登录！");
   			return result;
   		}
   		List<PlatGroupUserHolder> list = platGroupUserService.getList(holder);
   		if(list !=null)
   		{
   			Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
   			for(PlatGroupUserHolder _h: list)
   			{
   				_h.setDomainCode(platConfigCacheService.getDomainCode(_map, _h.getEntCode()));
   			}
   		}
   		
   		result.setCode(0);
   		result.setDesc("操作成功!");
   		result.setResult(list);
   		return result;
   	}
    
    @RequestMapping(value = "/delGroupMember", produces = "application/json;charset=UTF-8")
   	@ResponseBody
   	public BaseResult delGroupMember(@RequestBody PlatContactGroupHolder holder, HttpServletRequest req, HttpServletResponse resp) {
   		BaseResult result = new BaseResult();
   		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
   		if (user == null) {
   			result.setCode(1);
   			result.setDesc("当前用户未登录！");
   			return result;
   		}
   		PlatUserHolder _user = new PlatUserHolder();
   		BeanUtils.copyProperties(user, _user);
   		
   		List<String> list = initSendList(holder, _user);
   		
   		if(platUserService.delGroupMember(holder, _user))
   		{
   			result.setCode(0);
   			result.setDesc("操作成功!");
   			String member = "";
   			int i=0;
   			for(PlatContactHolder a : holder.getContactList()) {
   				if(i>0) {
   					member = member +"，"+a.getFriendMark();
   				}else {
   					member = a.getFriendMark();
   				}
   				i++;
   			}
   			String content = user.getName()+"将"+member+"移出群聊";
   			sendNoticeMsg(holder.getUserCode(), user,"{\"type\":\"delGroupMember\",\"content\":\""+content+"！\",\"creatTime\":\""+PUtils.dateTimeToStr(new Date())+"\"}",list);
   		}else
   		{
   			result.setCode(1);
   			result.setDesc("操作失败！");
   		}
   		return result;
   	}
    
    
    @RequestMapping(value = "/modifyGroup", produces = "application/json;charset=UTF-8")
   	@ResponseBody
   	public BaseResult modifyGroup(@RequestBody PlatContactGroupHolder holder, HttpServletRequest req, HttpServletResponse resp) {
   		BaseResult result = new BaseResult();
   		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
   		if (user == null) {
   			result.setCode(1);
   			result.setDesc("当前用户未登录！");
   			return result;
   		}
   		PlatUserHolder _user = new PlatUserHolder();
   		BeanUtils.copyProperties(user, _user);
   		
   		List<String> list = initSendList(holder, _user);
   		
   		if(platUserService.modifyGroup(holder))
   		{
   			result.setCode(0);
   			result.setDesc("操作成功!");
   			sendNoticeMsg(holder.getUserCode(), user,"{\"type\":\"modifyGroup\",\"content\":\""+user.getName()+"修改了群组名称为"+holder.getGroupName()+"！\",\"creatTime\":\""+PUtils.dateTimeToStr(new Date())+"\"}",list);
   		}else
   		{
   			result.setCode(1);
   			result.setDesc("操作失败,未传入groupCode");
   		}
   		return result;
   	}
    
    
    @RequestMapping(value = "/quitGroup", produces = "application/json;charset=UTF-8")
   	@ResponseBody
   	public BaseResult quitGroup(@RequestBody PlatContactGroupHolder holder, HttpServletRequest req, HttpServletResponse resp) {
   		BaseResult result = new BaseResult();
   		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
   		if (user == null) {
   			result.setCode(1);
   			result.setDesc("当前用户未登录！");
   			return result;
   		}
   		PlatUserHolder _user = new PlatUserHolder();
   		BeanUtils.copyProperties(user, _user);
   		
   		List<String> list = initSendList(holder, _user);
   		
   		if(platUserService.quitGroup(holder,  _user))
   		{
   			result.setCode(0);
   			result.setDesc("操作成功!");
   			String type = "quitGroup";
   			String content = _user.getName()+"退出群组";
   			if(holder.getUserCode().equals(_user.getUserCode())) {
   				type = "disbandGroup";
   				content = _user.getName()+"解散群组";
   			}
   			
			sendNoticeMsg(holder.getGroupCode(), user,"{\"type\":\""+type +"\",\"content\":\""+content+"！\",\"creatTime\":\""+PUtils.dateTimeToStr(new Date())+"\"}",list);
   		}else
   		{
   			result.setCode(1);
   			result.setDesc("操作失败,未传入groupCode");
   		}
   		return result;
   	}

	private List<String> initSendList(PlatContactGroupHolder holder, PlatUserHolder _user) {
		PlatContactHolder a = new PlatContactHolder();
		a.setGroupCode(holder.getGroupCode());
		List<PlatContactHolder> l = platContactService.getList(a);
		List<String> list = new ArrayList<String>();
		for(PlatContactHolder b :l) {
			if(!b.getFriendUserCode().equals(_user.getUserCode())) {
				list.add(b.getFriendUserCode());
			}
		}
		return list;
	}
    
}
