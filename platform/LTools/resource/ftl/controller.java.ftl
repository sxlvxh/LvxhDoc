/*
 * .${className?cap_first}Controller.java
 * Copyright 2016. All Rights Reserved.
 */
package ${pro.package}.${pro.url_prefix}${className?lower_case}.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import com.lvxh.plugin.platform.controller.BaseController;

import ${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder;

/**
 * . ${comment}接口
 * 
 * @author ${pro.author}
 * @version ${pro.version}
 */
@RequestMapping("/${pro.url_prefix}${className?lower_case}")
@Controller
public class ${pro.url_prefix?cap_first}${className?cap_first}Controller extends BaseController<${pro.url_prefix?cap_first}${className?cap_first}Holder> {

   private static final Logger LOG = Logger.getLogger(${pro.url_prefix?cap_first}${className?cap_first}Controller.class);

	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/${pro.url_prefix?lower_case}${className?lower_case}");
    }
}