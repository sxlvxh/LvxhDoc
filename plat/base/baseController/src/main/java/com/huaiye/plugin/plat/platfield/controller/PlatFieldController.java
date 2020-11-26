/*
 * .PlatFieldController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platfield.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platfield.holder.PlatFieldHolder;
import com.huaiye.plugin.plat.platfield.service.PlatFieldService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;

/**
 * . 页面属性表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platfield")
@Controller
public class PlatFieldController extends BaseController<PlatFieldHolder> {

   private static final Logger LOG = Logger.getLogger(PlatFieldController.class);

   @Autowired
   private PlatFieldService platFieldService;
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platfield");
    }
    
    /**
   	 * . 插入记录
   	 * 
   	 * @param holder
   	 *            待插入信息条件
   	 * @return 插入操作结果
   	 */
   	@RequestMapping(value = "/imports", produces = "application/json;charset=UTF-8")
   	@ResponseBody
   	public BaseResult imports(@RequestBody PlatFieldHolder holder, HttpServletRequest req, HttpServletResponse resp) {
   		return platFieldService.imports(holder);
   	}
}
