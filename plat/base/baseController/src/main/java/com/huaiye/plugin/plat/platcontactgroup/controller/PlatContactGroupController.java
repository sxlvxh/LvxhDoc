/*
 * .PlatContactGroupController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platcontactgroup.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platcontactgroup.holder.PlatContactGroupHolder;
import com.lvxh.plugin.platform.controller.BaseController;

/**
 * . 联系人群组接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platcontactgroup")
@Controller
public class PlatContactGroupController extends BaseController<PlatContactGroupHolder> {

   private static final Logger LOG = Logger.getLogger(PlatContactGroupController.class);

   
  /* @Autowired
	private PlatContactGroupService platContactGroupService;*/

   
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platcontactgroup");
    }
    
}
