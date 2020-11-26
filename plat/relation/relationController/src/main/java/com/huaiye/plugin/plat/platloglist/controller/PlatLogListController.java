/*
 * .PlatLogListController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platloglist.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.lvxh.plugin.platform.controller.BaseController;

import com.huaiye.plugin.plat.platloglist.holder.PlatLogListHolder;

/**
 * . 操作日志列表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platloglist")
@Controller
public class PlatLogListController extends BaseController<PlatLogListHolder> {

   private static final Logger LOG = Logger.getLogger(PlatLogListController.class);

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platloglist");
    }
}
