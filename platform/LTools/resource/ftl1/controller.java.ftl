/*
 * .${className?cap_first}Controller.java
 * Copyright 2016. All Rights Reserved.
 */
package ${pro.package}.${pro.url_prefix}${className?lower_case}.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import org.springframework.stereotype.Controller;

import com.huaiye.plugin.portal.business.controller.BusinessController;
import ${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder;

/**
 * . ${comment}接口
 * 
 * @author ${pro.author}
 * @version ${pro.version}
 */
@RequestMapping("/${pro.url_prefix}${className?lower_case}")
@Controller
public class ${pro.url_prefix?cap_first}${className?cap_first}Controller extends BusinessController<${pro.url_prefix?cap_first}${className?cap_first}Holder> {

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index() {
        return new ModelAndView("html/${pro.url_prefix?lower_case}${className?lower_case}/index");
    }
}
