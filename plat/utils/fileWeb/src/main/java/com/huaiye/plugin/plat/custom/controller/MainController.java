package com.huaiye.plugin.plat.custom.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.huaiye.plugin.plat.custom.config.Config;
import com.huaiye.plugin.plat.custom.config.PlatConfigCacheService;
import com.huaiye.plugin.plat.platmenu.holder.PlatMenuHolder;
import com.huaiye.plugin.plat.platmenu.service.PlatMenuService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserlist.service.PlatUserListService;
import com.huaiye.plugin.plat.platuserrolemenu.holder.PlatUserRoleMenuHolder;
import com.huaiye.plugin.plat.platuserrolemenu.service.PlatUserRoleMenuService;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.service.Constants;

@RequestMapping("/main")
@Controller
public class MainController {

	private static final Logger LOG = Logger.getLogger(MainController.class);

	@Autowired
	private Config config;

	@Autowired
	private PlatConfigCacheService platConfigCacheService;

	@Autowired
	private PlatMenuService platMenuService;

	@Autowired
	private PlatUserListService platUserListService;
	
	@Autowired
	private PlatUserRoleMenuService platUserRoleMenuService;

	private boolean checkUser(PlatUserHolder holder, PlatUserListHolder user, HttpServletRequest request) {
		if(user != null)
		{
			String pwd = DigestUtils.sha256Hex(user.getUserCode() + holder.getPassword());
			if(user.getPassword().equals(pwd))
			{
				request.getSession().setAttribute(Constants.LOGIN_USER, user);
				request.getSession().setAttribute(Constants.LOGIN_USER_ID, user.getId());
				
				if("lvxh".equals(user.getUserCode()))
				{
					PlatMenuHolder _menu = new PlatMenuHolder();
					_menu.setMenuType(1);
					List<PlatMenuHolder> menuList = platMenuService.getList(_menu);
					request.getSession().setAttribute(Constants.MENU_LIST, menuList);
				}else
				{
					List<PlatMenuHolder> menuList = new ArrayList<PlatMenuHolder>();
					PlatUserRoleMenuHolder urm = new PlatUserRoleMenuHolder();
					urm.setUserCode(user.getUserCode());
					urm.setProductCode(config.productCode);
					urm.setGroupBy("MENU_CODE");
					List<PlatUserRoleMenuHolder> urmList = platUserRoleMenuService.getList(urm);
					if(urmList !=null)
					{
						for(PlatUserRoleMenuHolder _mm : urmList)
						{
							PlatMenuHolder _pm = new PlatMenuHolder();
							BeanUtils.copyProperties(_mm, _pm);
							menuList.add(_pm);
						}
					}
					request.getSession().setAttribute(Constants.MENU_LIST, menuList);
				}
				return true;
			}
			else
			{
				return false;
			}
		}else
		{
			return false;
		}
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/init")
	public ModelAndView init(HttpServletRequest req, HttpServletResponse resp) {
		removeSession(req);
		setSession(req);
		return new ModelAndView("/html/login");
	}

	private void removeSession(HttpServletRequest req) {
		HttpSession session =  req.getSession();
		session.removeAttribute(Constants.LOGIN_USER);
		session.removeAttribute(Constants.LOGIN_USER_ID);
		session.removeAttribute(Constants.MENU_LIST);
	}

	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/login")
	public ModelAndView login(PlatUserHolder holder, HttpServletRequest request, HttpServletResponse resp) {
		LOG.debug(" login user params : " + holder);
		setSession(request);
		if (StringUtils.isBlank(holder.getLoginName()) && StringUtils.isBlank(holder.getMobilePhone())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			return new ModelAndView("/html/login");
		}

		if (StringUtils.isBlank(holder.getPassword())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			return new ModelAndView("/html/login");
		}
		PlatUserListHolder _holder = new PlatUserListHolder();
		_holder.setLoginName(holder.getLoginName());
		PlatUserListHolder _holder1 = new PlatUserListHolder();
		_holder1.setMobilePhone(holder.getLoginName());
		if(checkUser(holder,platUserListService.get(_holder),request) || checkUser(holder, platUserListService.get(_holder1),request))
		{
			
		}else
		{
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			return new ModelAndView("/html/login");
		}

		return new ModelAndView("html/redirect");
	}
	
	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/appLogin")
	public BaseResult appLogin(@RequestBody PlatUserHolder holder, HttpServletRequest request, HttpServletResponse resp) {
		LOG.debug(" login user params : " + holder);
		BaseResult result = new BaseResult();
		setSession(request);
		if (StringUtils.isBlank(holder.getLoginName()) && StringUtils.isBlank(holder.getMobilePhone())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}

		if (StringUtils.isBlank(holder.getPassword())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}
		PlatUserListHolder _holder = new PlatUserListHolder();
		_holder.setLoginName(holder.getLoginName());
		PlatUserListHolder _holder1 = new PlatUserListHolder();
		_holder1.setMobilePhone(holder.getLoginName());
		if(checkUser(holder,platUserListService.get(_holder),result) || checkUser(holder, platUserListService.get(_holder1),result))
		{
			result.setCode(0);
			result.setDesc("成功！");
		}else
		{
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}
		return result;
	}
	
	private boolean checkUser(PlatUserHolder holder, PlatUserListHolder user, BaseResult result) {
		if(user != null)
		{
			Map<String,Object> map = new HashMap<String,Object>();
			result.setObj(map);
			String pwd = DigestUtils.sha256Hex(user.getUserCode() + holder.getPassword());
			if(user.getPassword().equals(pwd))
			{
				map.put(Constants.LOGIN_USER, user);
				map.put(Constants.LOGIN_USER_ID, user.getId());
				
				if("lvxh".equals(user.getUserCode()))
				{
					PlatMenuHolder _menu = new PlatMenuHolder();
					_menu.setMenuType(1);
					List<PlatMenuHolder> menuList = platMenuService.getList(_menu);
					map.put(Constants.MENU_LIST, menuList);
				}else
				{
					List<PlatMenuHolder> menuList = new ArrayList<PlatMenuHolder>();
					PlatUserRoleMenuHolder urm = new PlatUserRoleMenuHolder();
					urm.setUserCode(user.getUserCode());
					urm.setProductCode(config.productCode);
					List<PlatUserRoleMenuHolder> urmList = platUserRoleMenuService.getList(urm);
					if(urmList !=null)
					{
						for(PlatUserRoleMenuHolder _mm : urmList)
						{
							PlatMenuHolder _pm = new PlatMenuHolder();
							BeanUtils.copyProperties(_mm, _pm);
							menuList.add(_pm);
						}
					}
					map.put(Constants.MENU_LIST, menuList);
				}
				return true;
			}
			else
			{
				return false;
			}
		}else
		{
			return false;
		}
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest req, HttpServletResponse resp) {
		setSession(req);
		req.getSession().removeAttribute("LOGIN_ERROR_MESSAGE");
		return new ModelAndView("/html/login");
	}

	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/page")
	public ModelAndView page(PlatUserHolder holder, HttpServletRequest request, HttpServletResponse resp) {
		request.getSession().setAttribute("FILES_SERVER_VISIT", config.filesServerVisit);
		return new ModelAndView("html/page");
	}

	private void setSession(HttpServletRequest req) {
		Map<String, Object> map = platConfigCacheService.getConfig();
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		req.getSession().setAttribute("platConfig", gson.toJson(map));
		if(map !=null)
		{
			for(String key : map.keySet()){
				req.getSession().setAttribute(key, map.get(key));
			}
		}
	}
	
}
