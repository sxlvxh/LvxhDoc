/*
 * .PlatSoftListController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platsoftlist.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.lvxh.plugin.platform.controller.BaseController;

import com.huaiye.plugin.plat.platsoftlist.holder.PlatSoftListHolder;

/**
 * . 应用软件列表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platsoftlist")
@Controller
public class PlatSoftListController extends BaseController<PlatSoftListHolder> {

   private static final Logger LOG = Logger.getLogger(PlatSoftListController.class);

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platsoftlist");
    }
}
