/*
 * . ${className?cap_first}Service.java
 * Copyright 2016. All Rights Reserved.
 */
package ${pro.package}.${pro.url_prefix}${className?lower_case}.service;

import org.springframework.stereotype.Service;

import com.huaiye.plugin.portal.business.service.BusinessService;
import ${pro.package}.${pro.url_prefix}${className?lower_case}.holder.${pro.url_prefix?cap_first}${className?cap_first}Holder;

/**
 * . ${comment}业务接口
 * 
 * @author ${pro.author}
 * @version ${pro.version}
 */
@Service
public class ${pro.url_prefix?cap_first}${className?cap_first}Service extends BusinessService<${pro.url_prefix?cap_first}${className?cap_first}Holder> {

}
