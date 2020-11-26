/*
 * .PlatProductController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platproduct.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platmodel.holder.PlatModelHolder;
import com.huaiye.plugin.plat.platmodel.service.PlatModelService;
import com.huaiye.plugin.plat.platmodelbyproduct.holder.PlatModelByProductHolder;
import com.huaiye.plugin.plat.platmodelbyproduct.service.PlatModelByProductService;
import com.huaiye.plugin.plat.platproduct.holder.PlatProductHolder;
import com.huaiye.plugin.plat.platproduct.service.PlatProductService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;
import com.lvxh.plugin.platform.holder.BaseTreeHolder;

/**
 * . 产品表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platproduct")
@Controller
public class PlatProductController extends BaseController<PlatProductHolder> {

   private static final Logger LOG = Logger.getLogger(PlatProductController.class);

   @Autowired
   private PlatModelService platModelService;
   
   @Autowired
   private PlatModelByProductService platModelByProductService;
   
   @Autowired
   private PlatProductService platProductService;
   
   
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platproduct");
    }
    
	@RequestMapping(value = "/getModelTree", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult getModelTree(@RequestBody PlatProductHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		BaseResult result = new BaseResult();
		result.setCode(SUCCESS);
		List<PlatModelHolder> modelList = platModelService.getList(new PlatModelHolder());
		
		PlatModelByProductHolder _h = new PlatModelByProductHolder();
		_h.setProductCode(holder.getProductCode());
		List<PlatModelByProductHolder> tlist =  platModelByProductService.getList(_h); 
		Map<String,PlatModelByProductHolder> map = new HashMap<String,PlatModelByProductHolder>();
		if(tlist !=null)
		{   for(PlatModelByProductHolder _holder : tlist)
			{
				
				map.put(_holder.getModelCode(),_holder);
		    }
		}
		List<BaseTreeHolder> treeList = new ArrayList<BaseTreeHolder>();
		Map<String,BaseTreeHolder> map1 = new HashMap<String,BaseTreeHolder>();
		if(modelList !=null)
		{
			for(PlatModelHolder _holder : modelList)
			{
				PlatModelByProductHolder bean = map.get(_holder.getModelCode());
				if(bean !=null)
				{
					_holder.setSelected(true);
				}
				
				BaseTreeHolder _tree = new BaseTreeHolder();
				_tree.setPid(null);
				_tree.setId(_holder.getModelCode());
				_tree.setName(_holder.getModelName());
				_tree.setSelected(_holder.isSelected());
				_tree.setImg("/tree/leafs.png");
				_tree.setHasChild(false);
				//_tree.setObj(_holder);
				treeList.add(_tree);
				map1.put(_tree.getId(), _tree);
			}
		}
		result.setResult(treeList);
		result.setObj(map1);
		return result;
	}
	
	@RequestMapping(value = "/setting", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public BaseResult setting(@RequestBody PlatProductHolder holder, HttpServletRequest req, HttpServletResponse resp) {
		return platProductService.setModel(holder);
	}
}
