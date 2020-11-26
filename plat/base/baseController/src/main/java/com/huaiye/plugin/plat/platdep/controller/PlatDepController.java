/*
 * .PlatDepController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platdep.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.huaiye.plugin.plat.platdep.holder.PlatDepHolder;
import com.huaiye.plugin.plat.platdep.service.PlatDepService;

/**
 * . 部门表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platdep")
@Controller
public class PlatDepController extends BaseController<PlatDepHolder> {

   private static final Logger LOG = Logger.getLogger(PlatDepController.class);
   
   @Autowired
   private PlatDepService platDepService;

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platdep");
    }
    
    
    @RequestMapping("/deleteDepBactch")
    @ResponseBody
    public BaseResult deleteDepBactch(@RequestBody List<PlatDepHolder> holders,HttpServletRequest req, HttpServletResponse resp) {
    	BaseResult result=new BaseResult();
    	result.setCode(0);
    	result.setDesc("操作成功！");
    	
    	List<PlatDepHolder> delDeps=new ArrayList<PlatDepHolder>();
    	
    	if(CollectionUtils.isNotEmpty(holders)) {
    		for(PlatDepHolder d:holders) {
    			PlatDepHolder dep_holder=new PlatDepHolder();
    			dep_holder.setId(d.getId());
    			PlatDepHolder dep=platDepService.get(d);
    			
    			PlatDepHolder dep_holder2=new PlatDepHolder();
    			dep_holder2.setParentCode(dep.getDepCode());
    			List<PlatDepHolder> deps=platDepService.getList(dep_holder2);
    			if(CollectionUtils.isEmpty(deps)) {
    				delDeps.add(dep);
    			}
    		}
    		
    		if(delDeps.size()==holders.size()) {
    			platDepService.deleteBatch(holders);
    		}else {
    			result.setCode(1);
            	result.setDesc("所选企业有子企业，无法删除！");
    		}
    	}else {
    		result.setCode(1);
        	result.setDesc("请选择需要删除的记录！");
    	}
    	
		return result;
    	
    }
    
}
