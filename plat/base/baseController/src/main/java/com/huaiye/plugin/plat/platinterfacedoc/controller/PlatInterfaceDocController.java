/*
 * .PlatInterfaceDocController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platinterfacedoc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.huaiye.plugin.plat.platinterfacedoc.holder.PlatInterfaceDocHolder;
import com.huaiye.plugin.plat.platinterfacedoc.service.PlatInterfaceDocService;

/**
 * . 系统接口表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platinterfacedoc")
@Controller
public class PlatInterfaceDocController extends BaseController<PlatInterfaceDocHolder> {

	private static final Logger LOG = Logger.getLogger(PlatInterfaceDocController.class);

	@Autowired
	private PlatInterfaceDocService platInterfaceDocService;

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug(" init index page : " + req.getRemoteAddr());
		return new ModelAndView("html/platinterfacedoc");
	}

	@RequestMapping("/addIntfc")
	@ResponseBody
	public BaseResult addIntfc(@RequestBody PlatInterfaceDocHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
		LOG.debug("start addIntfc, params is: " + String.valueOf(holder));
		BaseResult result = new BaseResult();
		if (holder != null) {
			PlatInterfaceDocHolder info = new PlatInterfaceDocHolder();
			info.setName(holder.getName());
			info.setIntfcGroup(holder.getIntfcGroup());
			info.setIsdel(0);
			PlatInterfaceDocHolder intFc = platInterfaceDocService.get(info);
			if (intFc == null) {
				holder.setCreateTime(new Date());
				platInterfaceDocService.insert(holder);
				result.setCode(0);
				result.setDesc("操作成功");
			} else {
				result.setCode(1);
				result.setDesc("操作失败，接口已存在");
			}
		} else {
			result.setCode(1);
			result.setDesc("参数为空，请重新输入");
		}
		return result;
	}

	@RequestMapping("/updateIntfc")
	@ResponseBody
	public BaseResult updateIntfc(@RequestBody PlatInterfaceDocHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {
		LOG.debug("start updateIntfc, params is: " + String.valueOf(holder));
		BaseResult result = new BaseResult();
		if (holder != null) {
			holder.setUpdateTime(new Date());
			platInterfaceDocService.update(holder);
			result.setCode(0);
			result.setDesc("操作成功");
		} else {
			result.setCode(1);
			result.setDesc("接口重复，请重新输入");
		}

		return result;
	}


	@RequestMapping("/deleteBatchIntfc")
	@ResponseBody
	public BaseResult deleteBatchIntfc(@RequestBody List<PlatInterfaceDocHolder> holders, HttpServletRequest req,
			HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		if (holders != null) {
			for (PlatInterfaceDocHolder info : holders) {
				info.setIsdel(1);
				platInterfaceDocService.update(info);
			}
			result.setCode(0);
			result.setDesc("操作成功");
		}
		return result;
	}
}
