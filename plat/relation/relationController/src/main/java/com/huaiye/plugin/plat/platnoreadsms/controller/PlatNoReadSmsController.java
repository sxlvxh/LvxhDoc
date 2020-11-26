/*
 * .PlatNoReadSmsController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platnoreadsms.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platnoreadsms.holder.PlatNoReadSmsHolder;
import com.lvxh.plugin.platform.controller.BaseController;

/**
 * . 查询未读消息数接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platnoreadsms")
@Controller
public class PlatNoReadSmsController extends BaseController<PlatNoReadSmsHolder> {

   private static final Logger LOG = Logger.getLogger(PlatNoReadSmsController.class);

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platnoreadsms");
    }
}
