/*
 * .PlatPositionController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platposition.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.custom.utils.PlatUtils;
import com.huaiye.plugin.plat.platposition.holder.PlatPositionHolder;
import com.huaiye.plugin.plat.platpositionhis.holder.PlatPositionHisHolder;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 人员当前位置接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platposition")
@Controller
public class PlatPositionController extends BaseController<PlatPositionHolder> {

	private static final Logger LOG = Logger.getLogger(PlatPositionController.class);

	/**
	 * 
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug(" init index page : " + req.getRemoteAddr());
		return new ModelAndView("html/platposition");
	}

	@RequestMapping(value = "/subPoint", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult subPoint(@RequestBody PlatPositionHisHolder holder, HttpServletRequest req,
			HttpServletResponse resp) {

		BaseResult rest = new BaseResult();
		holder.setCreateTime(new Date());
		holder.setCreateUserId(PUtils.getCreateUserID(req));
		holder.setIsdel(0);
		try {
			PlatUtils.put(holder);
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}
		rest.setCode(0);
		rest.setDesc("操作成功!");
		return rest;
	}
}
