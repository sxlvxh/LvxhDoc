package com.huaiye.plugin.plat.custom.controller;

import java.io.IOException;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.huaiye.plugin.plat.custom.config.Config;
import com.huaiye.plugin.plat.custom.config.PlatConfigCacheService;
import com.huaiye.plugin.plat.custom.utils.PlatUtils;
import com.huaiye.plugin.plat.platent.holder.PlatEntHolder;
import com.huaiye.plugin.plat.platfiles.holder.PlatFilesHolder;
import com.huaiye.plugin.plat.platmenu.holder.PlatMenuHolder;
import com.huaiye.plugin.plat.platmenu.service.PlatMenuService;
import com.huaiye.plugin.plat.platsoftlist.holder.PlatSoftListHolder;
import com.huaiye.plugin.plat.platsoftlist.service.PlatSoftListService;
import com.huaiye.plugin.plat.platuser.holder.PlatUserHolder;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserlist.service.PlatUserListService;
import com.huaiye.plugin.plat.platuserrolemenu.holder.PlatUserRoleMenuHolder;
import com.huaiye.plugin.plat.platuserrolemenu.service.PlatUserRoleMenuService;
import com.huaiye.plugin.plat.sie.EntParams;
import com.huaiye.plugin.plat.sie.SieParams;
import com.huaiye.plugin.plat.sie.SieReqBean;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.license.License;
import com.lvxh.plugin.platform.service.Constants;
import com.lvxh.plugin.platform.utils.PUtils;

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
	
	@Autowired
	private PlatSoftListService platSoftListService;

	private boolean checkUser(PlatUserHolder holder, PlatUserListHolder user, HttpServletRequest request) {
		if (user != null) {
			//System.out.println(user.getUserCode() +  holder.getPassword()+ user.getMobilePhone());
			String pwd = DigestUtils.sha256Hex(user.getUserCode() + holder.getPassword());
			if (user.getPassword().equals(pwd)) {
				request.getSession().setAttribute(Constants.LOGIN_USER, user);
				request.getSession().setAttribute(Constants.LOGIN_USER_ID, user.getId());

				if ("lvxh".equals(user.getUserCode())) {
					PlatMenuHolder _menu = new PlatMenuHolder();
				/*	_menu.setMenuType(1);*/
					List<PlatMenuHolder> menuList = platMenuService.getList(_menu);
					request.getSession().setAttribute(Constants.MENU_LIST, menuList);
				} else {
					List<PlatMenuHolder> menuList = new ArrayList<PlatMenuHolder>();
					PlatUserRoleMenuHolder urm = new PlatUserRoleMenuHolder();
					urm.setUserCode(user.getUserCode());
					urm.setProductCode(config.productCode);
					urm.setGroupBy("MENU_CODE");
					List<PlatUserRoleMenuHolder> urmList = platUserRoleMenuService.getList(urm);
					if (urmList != null) {
						for (PlatUserRoleMenuHolder _mm : urmList) {
							PlatMenuHolder _pm = new PlatMenuHolder();
							BeanUtils.copyProperties(_mm, _pm);
							menuList.add(_pm);
						}
					}
					request.getSession().setAttribute(Constants.MENU_LIST, menuList);
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@RequestMapping(value = "/upFormReq")
	public ModelAndView doUpLoadReq(HttpServletRequest request) {
		return new ModelAndView("html/upLoadReq");
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

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/csInit")
	public ModelAndView csInit(HttpServletRequest req, HttpServletResponse resp) {
		removeSession(req);
		setSession(req);
		return new ModelAndView("/html/csLogin");
	}

	
	private void removeSession(HttpServletRequest req) {
		HttpSession session = req.getSession();
		session.removeAttribute(Constants.LOGIN_USER);
		session.removeAttribute(Constants.LOGIN_USER_ID);
		session.removeAttribute(Constants.MENU_LIST);
		session.removeAttribute("MENU_CODE");
	}

	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/login")
	public ModelAndView login(PlatUserHolder holder, HttpServletRequest request, HttpServletResponse resp) {
		setSession(request);

		if (License.getCode() > 0) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", License.getDesc());
			return new ModelAndView("/html/login");
		}

		if (StringUtils.isBlank(holder.getLoginName()) && StringUtils.isBlank(holder.getMobilePhone())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			return new ModelAndView("/html/login");
		}

		if (StringUtils.isBlank(holder.getPassword())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			return new ModelAndView("/html/login");
		}
		PlatUserListHolder _holder = new PlatUserListHolder();
		PlatUserListHolder _holder1 = new PlatUserListHolder();
		if(StringUtils.isNotBlank(holder.getMobilePhone()))
		{
			_holder.setLoginName(holder.getMobilePhone());
			_holder1.setMobilePhone(holder.getMobilePhone());
		}else {
			_holder.setLoginName(holder.getLoginName());
			_holder1.setMobilePhone(holder.getLoginName());
		}
		if (checkUser(holder, platUserListService.get(_holder), request)
				|| checkUser(holder, platUserListService.get(_holder1), request)) {

		} else {
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
	@RequestMapping("/wxLogin")
	public ModelAndView wxLogin(PlatUserHolder holder, HttpServletRequest request, HttpServletResponse resp) {

		BaseResult result = new BaseResult();

		Map<String, Object> map = platConfigCacheService.getConfig();
		// Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		result.setObj(map);

		if (StringUtils.isBlank(holder.getLoginName()) && StringUtils.isBlank(holder.getMobilePhone())) {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
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
		if (checkUser(holder, platUserListService.get(_holder), request)
				|| checkUser(holder, platUserListService.get(_holder1), request)) {

		} else {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			return new ModelAndView("/html/login");
		}

		return new ModelAndView("html/redirect");
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/logout")
	public ModelAndView logout(HttpServletRequest req, HttpServletResponse resp) {
		setSession(req);
		req.getSession().removeAttribute("LOGIN_ERROR_MESSAGE");
		removeSession(req);
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
		return new ModelAndView("html/page");
	}

	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/sie")
	public ModelAndView sie(PlatUserHolder holder, HttpServletRequest request, HttpServletResponse resp) {
		setSession(request);
		PlatEntHolder ent = platConfigCacheService.getEntHolder(holder.getEntCode());
		request.getSession().setAttribute("PlatEntHolder", new Gson().toJson(ent));
		return new ModelAndView("html/sie");
	}

	private void setSession(HttpServletRequest req) {
		Map<String, Object> map = platConfigCacheService.getConfig();
		map.put("sessionId", req.getSession().getId());
		Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
		req.getSession().setAttribute("platConfig", gson.toJson(map));
		if (map != null) {
			for (String key : map.keySet()) {
				req.getSession().setAttribute(key, map.get(key));
			}
		}
		Long days = License.getAvailableDays();
		if (days < 10) {
			req.setAttribute("LICENSE_DAYS", "License 将于 " + days + " 天后到期！");
		}
	}

	@RequestMapping(value = "upFormFile", method = RequestMethod.POST)
	public ModelAndView upFormFile(@RequestParam(value = "upfile") MultipartFile[] upfiles, HttpServletRequest request,
			HttpServletResponse resp) {
		ModelAndView mav = new ModelAndView("html/uploadResp");
		Object obj = request.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			PlatUserListHolder user = (PlatUserListHolder) obj;
			ModelMap modelMap = mav.getModelMap();
			try {
				Gson gson = new Gson();
				modelMap.put("UPLOAD_RESP_INFO", gson.toJson(PUtils.doUpload(config.filesServerUrl + "/doUpload.action",
						config.filesServerUser, config.filesServerPwd, user.getUserCode(), upfiles)));
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}
		}
		return mav;
	}
	
	

	@RequestMapping(value = "upJsonFile", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult upJsonFile(@RequestParam(value = "upfile") MultipartFile[] upfiles, HttpServletRequest request,
			HttpServletResponse resp) {
		BaseResult br = new BaseResult();
		br.setCode(1);
		br.setDesc("上传失败");
		Object obj = request.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			PlatUserListHolder user = (PlatUserListHolder) obj;
			br = PUtils.doUpload(config.filesServerUrl + "/doUpload.action", config.filesServerUser,
					config.filesServerPwd, user.getUserCode(), upfiles);
		}
		return br;
	}
	
	@RequestMapping(value = "upHtmlFile", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult upHtmlFile(@RequestBody PlatFilesHolder holder, HttpServletRequest request,
			HttpServletResponse resp) {
		BaseResult br = new BaseResult();
		br.setCode(1);
		br.setDesc("上传失败");
		Object obj = request.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			PlatUserListHolder user = (PlatUserListHolder) obj;
			br = PUtils.doUpload(config.filesServerUrl + "/doUpload.action", config.filesServerUser,
					config.filesServerPwd, user.getUserCode(), holder.getFileName(),holder.getFileParams());
		}
		return br;
	}
	
	@RequestMapping(value = "doUploadBase64Img", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult doUploadBase64Img(@RequestBody PlatFilesHolder holder, HttpServletRequest request,
			HttpServletResponse resp) {
		BaseResult br = new BaseResult();
		br.setCode(1);
		br.setDesc("上传失败");
		Object obj = request.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			PlatUserListHolder user = (PlatUserListHolder) obj;
			br = PUtils.doUploadBase64ImgAndAlpha(config.filesServerUrl + "/doUpload.action", config.filesServerUser,
					config.filesServerPwd, user.getUserCode(), holder.getFileName(),holder.getFileParams());
		}
		return br;
	}


	@RequestMapping(value = "converter", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult converter(@RequestBody PlatFilesHolder holder, HttpServletRequest request,
			HttpServletResponse resp) {
		BaseResult br = new BaseResult();
		Gson gson = new Gson();
		br.setCode(1);
		br.setDesc("上传失败");
		Object obj = request.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			String str = PUtils.sendJSONPost(config.filesServerUrl + "/converter.action", gson.toJson(holder), 3000, null);
			br = new Gson().fromJson(str, BaseResult.class);
		}
		return br;
	}
	
	@RequestMapping("/getQRCode")
	@ResponseBody
	public void getQRCode( HttpServletRequest request, HttpServletResponse resp) {
		LOG.info("getQRCode in.");
		String softCode = request.getParameter("softCode");
		if(StringUtils.isNotBlank(softCode))
		{
			PlatSoftListHolder _holder = new PlatSoftListHolder();
			_holder.setSoftCode(softCode);
			PlatSoftListHolder soft = platSoftListService.get(_holder);
			if(soft !=null)
			{
				try {
					if(StringUtils.isNotBlank(soft.getFilePath()))
					{
						if(soft.getFilePath().startsWith("/userfile"))
						{
							PlatUtils.getQRCode(config.filesServerVisit + soft.getFilePath(), resp.getOutputStream());
						}else
						{
							PlatUtils.getQRCode(soft.getFilePath(), resp.getOutputStream());
						}
					}
					
				} catch (IOException e) {
					LOG.error(e.getMessage(), e);
				}
			}
		}
		LOG.info("getQRCode out.");
	}
	
	@RequestMapping("/getSoftUrl")
	@ResponseBody
	public BaseResult getSoftUrl(@RequestBody PlatSoftListHolder holder, HttpServletRequest request, HttpServletResponse resp) {
		
		LOG.info("getSoftUrl in.");
		BaseResult result = new BaseResult();
		result.setCode(0);
		PlatSoftListHolder soft = platSoftListService.get(holder);
		if(soft !=null)
		{
			try {
				if(StringUtils.isNotBlank(soft.getFilePath()))
				{
					if(soft.getFilePath().startsWith("/userfile"))
					{
						soft.setFilePath(config.filesServerVisit + soft.getFilePath());
					}
				}
				
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
				result.setCode(1);
			}
		}else
		{
			result.setCode(1);
		}
		
		result.setObj(soft);
		LOG.info("getSoftUrl out.");
		return result;
	}
	

	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/appLogin")
	public BaseResult appLogin(@RequestBody PlatUserHolder holder, HttpServletRequest request,
			HttpServletResponse resp) {
		LOG.debug(" login user params : " + holder);
		BaseResult result = new BaseResult();
		if (License.getCode() > 0) {
			result.setCode(1);
			result.setDesc(License.getDesc());
			return result;
		}

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
		PlatUserListHolder _holder1 = new PlatUserListHolder();
		if(StringUtils.isNotBlank(holder.getMobilePhone()))
		{
			_holder.setLoginName(holder.getMobilePhone());
			_holder1.setMobilePhone(holder.getMobilePhone());
			
		}else {
			_holder.setLoginName(holder.getLoginName());
			_holder1.setMobilePhone(holder.getLoginName());
		}
		if (checkUser(holder, platUserListService.get(_holder), result,request)
				|| checkUser(holder, platUserListService.get(_holder1), result,request)) {
			result.setCode(0);
			result.setDesc("成功！");
		} else {
			request.getSession().setAttribute("LOGIN_ERROR_MESSAGE", "登录账号或密码错误！");
			result.setCode(1);
			result.setDesc("登录账号或密码错误！");
			return result;
		}
		return result;
	}

	/**
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/appLogout")
	public BaseResult appLogout(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		removeSession(req);
		req.getSession().removeAttribute("LOGIN_ERROR_MESSAGE");
		BaseResult result = new BaseResult();
		result.setCode(0);
		result.setDesc("操作成功");
		return result;
	}

	private boolean checkUser(PlatUserHolder holder, PlatUserListHolder user, BaseResult result,HttpServletRequest request) {
		if (user != null) {
			Map<String, Object> map = new HashMap<String, Object>();
			result.setObj(map);
		//	System.out.println(user.getUserCode() +  holder.getPassword());
			String pwd = DigestUtils.sha256Hex(user.getUserCode() + holder.getPassword());
			if (user.getPassword().equals(pwd)) {
				map.put(Constants.LOGIN_USER, user);
				map.put(Constants.LOGIN_USER_ID, user.getId());
                map.put("platConfig", platConfigCacheService.getConfig());
                
                user.setDomainCode(platConfigCacheService.getDomainCode(user.getEntCode()));
                
                request.getSession().setAttribute(Constants.LOGIN_USER, user);
				request.getSession().setAttribute(Constants.LOGIN_USER_ID, user.getId());

				
				if ("lvxh".equals(user.getUserCode())) {
					PlatMenuHolder _menu = new PlatMenuHolder();
					/*_menu.setMenuType(1);*/
					List<PlatMenuHolder> menuList = platMenuService.getList(_menu);
					map.put(Constants.MENU_LIST, menuList);
					request.getSession().setAttribute(Constants.MENU_LIST, menuList);
				} else {
					List<PlatMenuHolder> menuList = new ArrayList<PlatMenuHolder>();
					PlatUserRoleMenuHolder urm = new PlatUserRoleMenuHolder();
					urm.setUserCode(user.getUserCode());
					urm.setProductCode(config.productCode);
					urm.setGroupBy("MENU_CODE");
					List<PlatUserRoleMenuHolder> urmList = platUserRoleMenuService.getList(urm);
					if (urmList != null) {
						for (PlatUserRoleMenuHolder _mm : urmList) {
							PlatMenuHolder _pm = new PlatMenuHolder();
							BeanUtils.copyProperties(_mm, _pm);
							menuList.add(_pm);
						}
					}
					map.put(Constants.MENU_LIST, menuList);
					request.getSession().setAttribute(Constants.MENU_LIST, menuList);
				}
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	@RequestMapping(value = "testConn", method = RequestMethod.POST)
	@ResponseBody
	public BaseResult testConn(@RequestBody PlatUserHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult ret = new BaseResult();
		ret.setCode(0);
		ret.setDesc("连接成功,你执行的是测试连接!");
		return ret;
	}
	
	@RequestMapping(value = "/getSieData", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getSieData(@RequestBody SieReqBean holder, HttpServletRequest req) {
		BaseResult result = new BaseResult();
		result.setCode(0);
		PlatEntHolder _ent = platConfigCacheService.getEntHolder(holder.getEntCode());
		if(StringUtils.isNotBlank(_ent.getEntParams()))
		{
			EntParams p = new Gson().fromJson(_ent.getEntParams(), EntParams.class);
			SieParams _p = p.getSieParams(config.sieGroupCode);
			_p.setLastUrl(holder.getUrl());
			_p.setParams(holder.getParams());
			result.setObj(platConfigCacheService.getSieSingleHttp(_p));
		}else
		{
			result.setCode(1);
			result.setDesc(" 参数错误 ");
		}
  
		return result;
	}
}
