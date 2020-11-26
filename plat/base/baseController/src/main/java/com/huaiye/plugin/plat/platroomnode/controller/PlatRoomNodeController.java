/*
 * .PlatRoomNodeController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroomnode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.utils.PUtils;
import com.huaiye.plugin.plat.platroomnode.holder.PlatRoomNodeHolder;

/**
 * . 采集点表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platroomnode")
@Controller
public class PlatRoomNodeController extends BaseController<PlatRoomNodeHolder> {

   private static final Logger LOG = Logger.getLogger(PlatRoomNodeController.class);

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platroomnode");
    }

	@RequestMapping(value = "/insert", produces = "application/json;charset=UTF-8")
	@ResponseBody
	@Override
	public BaseResult insert(@RequestBody PlatRoomNodeHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		// TODO Auto-generated method stub
		holder.setRoomNodeCode(PUtils.getUUID());
		return super.insert(holder, req, resp);
	}
}
