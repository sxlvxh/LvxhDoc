/*
 * .PlatSmsController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsms.controller;

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

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.huaiye.plugin.plat.custom.bean.ContactUserBean;
import com.huaiye.plugin.plat.custom.bean.ContactUserHolder;
import com.huaiye.plugin.plat.custom.config.PlatConfigCacheService;
import com.huaiye.plugin.plat.platcontact.holder.PlatContactHolder;
import com.huaiye.plugin.plat.platcontact.service.PlatContactService;
import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.huaiye.plugin.plat.platcontactgroup.service.PlatContactGroupService;
import com.huaiye.plugin.plat.platent.holder.PlatEntHolder;
import com.huaiye.plugin.plat.platnoreadsms.holder.ContactNoReadBean;
import com.huaiye.plugin.plat.platnoreadsms.holder.PlatNoReadSmsHolder;
import com.huaiye.plugin.plat.platnoreadsms.service.PlatNoReadSmsService;
import com.huaiye.plugin.plat.platsms.holder.PlatSmsHolder;
import com.huaiye.plugin.plat.platsms.service.PlatSmsService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserlist.service.PlatUserListService;
import com.lvxh.plugin.netty.bean.MessageContent;
import com.lvxh.plugin.netty.client.NettyClientCache;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 通讯录消息表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platsms")
@Controller
public class PlatSmsController extends BaseController<PlatSmsHolder> {

   private static final Logger LOG = Logger.getLogger(PlatSmsController.class);

   private static final  Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
	
   @Autowired
   private PlatSmsService platSmsService;
   
   @Autowired
   private PlatContactService platContactService;
   
   @Autowired
   private PlatUserListService platUserListService;
   
   @Autowired
   private PlatContactGroupService platContactGroupService;
   
	@Autowired
	private PlatConfigCacheService platConfigCacheService;
	
	@Autowired
	private PlatNoReadSmsService  platNoReadSmsService;
   
   
   /**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platsms");
    }
    
    @RequestMapping(value = "/sendMsg", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult sendMsg(@RequestBody PlatSmsHolder holder, HttpServletRequest req, HttpServletResponse resp) {
 
    	BaseResult result = new BaseResult();
    	result.setCode(0);
    	if(holder.getTargets() !=null)
    	{
    		String src = holder.getSrc();
    		String str = GSON.toJson(holder);
    		holder.setStatus(0);
    		holder.setSourceMsg(str);
    		holder.setSrc(holder.getTarget());
    		holder.setTarget(src);
    		holder.setSendType(0);
    		service.insert(holder);

    		for(String st: holder.getTargets())
    		{
    			holder.setTarget(st);
    			holder.setSendType(1);
    			holder.setStatus(1);
    			holder.setSrc(src);
    			service.insert(holder);
    			
    			MessageContent bean = new MessageContent();
    			bean.setMsgType(holder.getSmsType());
    			bean.setContent(holder.getContent());
    			bean.setGroupCode(holder.getGroupCode());
    			bean.setSrc(src);
    			bean.setTarget(st);
    			
    			List<String> list = new ArrayList<String>();
    			list.add(holder.getTarget());
    			bean.setTargets(list);
    			bean.setUid(PUtils.getUUID());
    			
    			try {
					NettyClientCache.put(bean);
				} catch (InterruptedException e) {
					LOG.error(e.getMessage(), e);
				}
    		}
    		
    	}
    	return result;
    }    @RequestMapping(value = "/sendGroupMsg", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult sendGroupMsg(@RequestBody PlatSmsHolder holder, HttpServletRequest req, HttpServletResponse resp) {
 
    	BaseResult result = new BaseResult();
    	result.setCode(0);
    	if(StringUtils.isNotBlank(holder.getTarget()))
    	{
    		PlatContactHolder h = new PlatContactHolder();
    		h.setGroupCode(holder.getTarget());
    		List<PlatContactHolder> flist = platContactService.getList(h);
    		
    		List<String> sendFriList = new ArrayList<>();
    		
    		String src = holder.getSrc();
    		String str = GSON.toJson(holder);
    		String target = holder.getTarget();
    		holder.setStatus(0);
    		holder.setSourceMsg(str);
    		holder.setSrc(holder.getTarget());
    		holder.setGroupCode(holder.getTarget());
    		holder.setTarget(src);
    		holder.setSendType(0);
    		service.insert(holder);

    		for(PlatContactHolder st: flist)
    		{
    			if(!src.equals(st.getFriendUserCode())) {
    				PlatSmsHolder newH = new PlatSmsHolder();
					newH.setTarget(st.getFriendUserCode());
    				newH.setSendType(1);
    				newH.setStatus(1);
    				newH.setGroupCode(target);
    				newH.setSrc(src);
        			service.insert(newH);
        			
        			sendFriList.add(st.getUserCode());
        			
    			}
    		}
    		
    		MessageContent bean = new MessageContent();
			bean.setMsgType(holder.getSmsType());
			bean.setContent(holder.getContent());
			bean.setGroupCode(holder.getTarget());
			bean.setSrc(src);
			bean.setTarget(holder.getTarget());
			
			bean.setTargets(sendFriList);
			bean.setUid(PUtils.getUUID());
			
			try {
				NettyClientCache.put(bean);
			} catch (InterruptedException e) {
				LOG.error(e.getMessage(), e);
			}
    		
    	}
    	return result;
    }
    
	@RequestMapping(value = "/updateStatus" , produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult updateStatus(@RequestBody PlatSmsHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
    	result.setCode(0);
		platSmsService.updateStatus(holder);
		return result;
	}
	
	@RequestMapping(value = "/getContactInfo" , produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getContactInfo(@RequestBody ContactUserBean holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
    	result.setCode(0);
    	long time = System.currentTimeMillis();
    	PlatSmsHolder _sms = new PlatSmsHolder();
    	_sms.setSrc(holder.getSrc());
    	_sms.setTarget(holder.getTarget());
    	_sms.setSort(holder.getSort());
    	_sms.setGroupCode(holder.getGroupCode());
        holder.setMsgList(platSmsService.getList(_sms));
        
    	PlatContactGroupHolder g = platContactGroupService.getCommonGroup(holder.getTarget());
    	if(g !=null)
    	{
    		List<PlatContactHolder> _cl1 = platContactService.getUserList(g.getGroupCode());
    		Map<String,PlatContactHolder> map = new HashMap<String,PlatContactHolder>();
    		if(_cl1 !=null)
    		{
    			for(PlatContactHolder _pc :_cl1)
    			{
    				map.put(_pc.getFriendUserCode(), _pc);
    			}
    		}
    		
    		if(StringUtils.isNotBlank(holder.getGroupCode()))
    		{
    			List<PlatContactHolder> _cl = platContactService.getUserList(holder.getGroupCode());
    			StringBuffer sb = new StringBuffer("");
    			if(_cl !=null)
    			{
    				for(int i=0;i<_cl.size();i++)
    				{
    					sb.append("'");
    					PlatContactHolder _con = _cl.get(i);
    					sb.append(_con.getFriendUserCode());
    					sb.append("'");
    					if(i<_cl.size() -1)
    					{
    						sb.append(",");
    					}
    				}
    			}
    			getUser(holder, map, sb.toString());
    			
    		}else
    		{
    			getUser(holder, map, "'"+holder.getSrc() + "','" + holder.getTarget()+"'");
    		}
    	}
        result.setObj(holder);
        System.out.println(System.currentTimeMillis() - time);
		return result;
	}

	public void getUser(ContactUserBean holder, Map<String, PlatContactHolder> map, String sb) {
		PlatUserListHolder _u = new PlatUserListHolder();
		_u.setUserCode(sb);
		List<PlatUserListHolder> _ul = platUserListService.getListByUserCode(_u);
		if(_ul !=null)
		{
			Map<String, PlatEntHolder> _map = platConfigCacheService.getEntMap();
			for(PlatUserListHolder _pu:_ul)
			{
				ContactUserHolder conUser = new ContactUserHolder();
				
				conUser.setDomainCode(platConfigCacheService.getDomainCode(_map, _pu.getEntCode()));
				conUser.setImgUrl(_pu.getImgUrl());
				conUser.setName(_pu.getName());
				conUser.setSex(_pu.getSex());
				conUser.setUserCode(_pu.getUserCode());
				
				PlatContactHolder _contactHolder = map.get(_pu.getUserCode());
				if(_contactHolder !=null)
				{
					conUser.setFriend(true);
					conUser.setFriendMark(_contactHolder.getFriendMark());
				}else
				{
					conUser.setFriend(false);
				}
				holder.getUserList().add(conUser);
			}
		}
	}
	

	@RequestMapping(value = "/getMsgCount", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getMsgCount(@RequestBody PlatNoReadSmsHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result =new BaseResult();
		result.setCode(0);
		
		PlatUserListHolder user = PlatConfigCacheService.getSessionUser(req);
		if (user == null) {
			result.setCode(1);
			result.setDesc("当前用户未登录！");
			return result;
		}
		ContactNoReadBean _bean = new ContactNoReadBean();
		
		
		PlatSmsHolder _notice = new PlatSmsHolder();
		_notice.setSmsType("notice");
		_notice.setStatus(1);
		_notice.setTarget(user.getUserCode());
		_bean.setNoticeCount(service.getCountOfSummary(_notice));
		
		PlatNoReadSmsHolder _sms = new PlatNoReadSmsHolder();
		_sms.setSmsType("chat");
		_sms.setTarget(user.getUserCode());
		_bean.setList(platNoReadSmsService.getList(_sms));
		_bean.setCommonCount(0);
		if(_bean.getList() !=null)
		{
			for(PlatNoReadSmsHolder _n : _bean.getList())
			{
				_bean.setCommonCount(_bean.getCommonCount() + _n.getNoReadCount());
			}
		}
		
		result.setObj(_bean);
		return result;
	}
}
