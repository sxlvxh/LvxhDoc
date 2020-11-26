/*
 * .PlatRoomController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platroom.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platroom.holder.PlatRoomHolder;
import com.huaiye.plugin.plat.platroom.service.PlatRoomService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * . 庭室接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platroom")
@Controller
public class PlatRoomController extends BaseController<PlatRoomHolder> {


private static final Logger LOG = Logger.getLogger(PlatRoomController.class);

   @Autowired
   private PlatRoomService platRoomService;
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platroom");
    }
    
    @RequestMapping(value = "/deleteRoomBatch", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult deleteRoomBatch(@RequestBody List<PlatRoomHolder> holder, HttpServletRequest req, HttpServletResponse resp) {
		LOG.debug("start deleteRoomBatch, params is: " + String.valueOf(holder));
		return platRoomService.deleteRoomBatch(holder);
	}
	
	@RequestMapping(value = "/insert", produces = "application/json;charset=UTF-8")
	@ResponseBody
    @Override
    public BaseResult insert(@RequestBody PlatRoomHolder holder, HttpServletRequest req, HttpServletResponse resp) {
    	// TODO Auto-generated method stub
    	holder.setRoomCode(PUtils.getUUID());
    	return super.insert(holder, req, resp);
    }
    
}
