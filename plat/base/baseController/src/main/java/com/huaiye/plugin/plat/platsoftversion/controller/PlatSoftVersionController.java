/*
 * .PlatSoftVersionController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftversion.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platsoftversion.holder.PlatSoftVersionHolder;
import com.huaiye.plugin.plat.platsoftversion.service.PlatSoftVersionService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;

/**
 * . 软件版本表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platsoftversion")
@Controller
public class PlatSoftVersionController extends BaseController<PlatSoftVersionHolder> {

   private static final Logger LOG = Logger.getLogger(PlatSoftVersionController.class);
   
   @Autowired
   private PlatSoftVersionService platSoftVersionService;

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platsoftversion");
    }
    
    
    @RequestMapping(value = "/modify" , produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult update(@RequestBody PlatSoftVersionHolder holder, HttpServletRequest req, HttpServletResponse resp) {
    	BaseResult result = new BaseResult();
    	result.setCode(0);
    	result.setObj(platSoftVersionService.modify(holder));
        return result;
	}
    
    @RequestMapping(value = "/add" , produces = "application/json;charset=UTF-8")
  	@ResponseBody
  	public BaseResult add(@RequestBody PlatSoftVersionHolder holder, HttpServletRequest req, HttpServletResponse resp) {
      	BaseResult result = new BaseResult();
      	result.setCode(0);
      	result.setObj(platSoftVersionService.add(holder));
          return result;
  	}
    
}
