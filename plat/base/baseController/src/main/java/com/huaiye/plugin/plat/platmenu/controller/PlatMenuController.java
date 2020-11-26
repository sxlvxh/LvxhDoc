/*
 * .PlatMenuController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platmenu.controller;

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

import com.huaiye.plugin.plat.custom.utils.PlatUtils;
import com.huaiye.plugin.plat.platbutton.holder.PlatButtonHolder;
import com.huaiye.plugin.plat.platbutton.service.PlatButtonService;
import com.huaiye.plugin.plat.platfield.holder.PlatFieldHolder;
import com.huaiye.plugin.plat.platfield.service.PlatFieldService;
import com.huaiye.plugin.plat.platmenu.holder.PlatMenuHolder;
import com.huaiye.plugin.plat.platmenu.holder.RoleDataBean;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.platuserrolemb.holder.PlatUserRoleMbHolder;
import com.huaiye.plugin.plat.platuserrolemb.service.PlatUserRoleMbService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.Sort;

/**
 * . 菜单接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platmenu")
@Controller
public class PlatMenuController extends BaseController<PlatMenuHolder> {

   private static final Logger LOG = Logger.getLogger(PlatMenuController.class);

   @Autowired
   private PlatFieldService platFieldService;
   
   @Autowired
   private PlatButtonService platButtonService;
   
   @Autowired
   private PlatUserRoleMbService platUserRoleMbService;
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platmenu");
    }
    
    /**
	 * . 插入记录
	 * 
	 * @param holder
	 *            待插入信息条件
	 * @return 插入操作结果
	 */
	@RequestMapping(value = "/getRoleData", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getRoleData(@RequestBody PlatFieldHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
		req.getSession().setAttribute("MENU_CODE", holder.getMenuCode());
		return getRoleData(holder,PlatUtils.getSessionUser(req));
	}
	

	public BaseResult getRoleData(PlatFieldHolder holder, PlatUserListHolder user) {

		BaseResult result = new BaseResult();
		result.setCode(0);
		RoleDataBean b = new RoleDataBean();
		if (user != null) {
			PlatMenuHolder menu = new PlatMenuHolder();
			menu.setMenuCode(holder.getMenuCode());
			b.setMenu(service.get(menu));

			Sort sort = new Sort();
			sort.setField(" priority asc");
			holder.setSort(sort);
			holder.setEnable("0");
			List<PlatFieldHolder> fl = platFieldService.getList(holder);
			//b.setFlist(fl);
			if ("lvxh".equals(user.getUserCode())) {
				PlatButtonHolder button = new PlatButtonHolder();
				button.setMenuCode(holder.getMenuCode());
				button.setSort(sort);
				button.setEnable("0");
				List<PlatButtonHolder> bl = platButtonService.getList(button);
				procData(result, b, fl, bl);
			}else
			{
				PlatButtonHolder button = new PlatButtonHolder();
				button.setMenuCode(holder.getMenuCode());
				button.setSort(sort);
				button.setEnable("0");
				List<PlatButtonHolder> bl = new ArrayList<PlatButtonHolder>();
				List<PlatButtonHolder> bl2 = platButtonService.getList(button);
				
				PlatUserRoleMbHolder _pur = new PlatUserRoleMbHolder();
				_pur.setUserCode(user.getUserCode());
				_pur.setGroupBy("MENU_CODE");
				List<PlatUserRoleMbHolder> purList = platUserRoleMbService.getList(_pur);
				Map<String,PlatUserRoleMbHolder> map1 = new HashMap<String,PlatUserRoleMbHolder>();
				if(purList !=null)
				{
					for(PlatUserRoleMbHolder _urmb : purList)
					{
						map1.put(_urmb.getMenuCode(),_urmb);
					}
				}
				if(bl2 !=null)
				{
					for(PlatButtonHolder _pbh : bl2)
					{
						PlatUserRoleMbHolder _urmb = map1.get(_pbh.getButtonCode());
						if(_urmb !=null)
						{
							bl.add(_pbh);
						}
					}
				}
				
				procData(result, b, fl, bl);
			}
		}
		result.setDesc("successfully");
		return result;

	}

	private void procData(BaseResult result, RoleDataBean b, List<PlatFieldHolder> fl, List<PlatButtonHolder> bl) {
		Map<String,PlatButtonHolder> map = new HashMap<String,PlatButtonHolder>();
		if(bl!=null)
		{
			for(PlatButtonHolder _b : bl)
			{
				map.put(_b.getButtonCode(), _b);
			}
			if(fl !=null)
			{
				for(PlatFieldHolder _f : fl)
				{
					PlatButtonHolder _b = map.get(_f.getButtonCode());
					if(_b !=null)
					{
						_b.getFlist().add(_f);
					}
				}
			}
			for(PlatButtonHolder _f : bl)
			{
				PlatButtonHolder _b = map.get(_f.getParentCode());
				if(_b!=null)
				{
					_b.getBlist().add(_f);
				}
			}
		}
		b.setBlist(bl);
		result.setResult(b);
	}
	
}
