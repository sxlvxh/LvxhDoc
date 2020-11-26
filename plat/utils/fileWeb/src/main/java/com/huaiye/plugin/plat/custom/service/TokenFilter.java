/*
 * 文件名：AuthorityFilter.java
 * 版权：Copyright 2006-2013 lvxh Tech. Co. Ltd. All Rights Reserved. 
 * 描述： AuthorityFilter.java
 * 修改人：lxh
 * 修改时间：2013年11月4日
 * 修改内容：新增
 */
package com.huaiye.plugin.plat.custom.service;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.lvxh.plugin.platform.service.Constants;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * .
 * 
 * @author lxh
 * @since V100R001C01
 * @version V100R001C01
 */
public class TokenFilter implements Filter {
	/**
	 * 初始化日志类
	 */
	private static final Logger LOG = Logger.getLogger(TokenFilter.class);
    
	/**
	 * .忽略拦截的URL
	 */
    private List<String> ignoreList = null;



	/**
	 * 执行过滤器
	 * 
	 * @param request
	 *            request
	 * 
	 * @param response
	 *            response
	 * 
	 * @param chain
	 *            chain
	 * 
	 * @return
	 * 
	 * @throws ServletException
	 *             ServletException
	 * 
	 * @throws IOException
	 *             IOException
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse rsp = (HttpServletResponse) response;
		String servletPath = req.getServletPath();
		LOG.debug("==========servletPath============="+servletPath);
        boolean isInIgnoreList = false;
		for(String url : this.ignoreList)
		{
			if(servletPath.contains(url))
			{
				LOG.debug("This is login action. Go ahead");
                isInIgnoreList = true;
                break;
			}
		}
        if (isInIgnoreList) {
            LOG.debug("the uri is in the ignoreList:" + servletPath);
            chain.doFilter(request, response);
            return;
        }

		Object obj = PUtils.getSessionScopeByKey( req,Constants.LOGIN_USER);
        if (null == obj)
		{
			if (req.getHeader("x-requested-with") != null
                    && req.getHeader("x-requested-with").equalsIgnoreCase(
                            "XMLHttpRequest"))// 如果是ajax请求响应头会有，x-requested-with；
            {
                rsp.setHeader("sessionstatus", "timeout");// 在响应头设置session状态
                return;
            }
            else
            {
                rsp.sendRedirect(req.getContextPath() + "/main/logout.action");
                return;
            }
			
		}
        chain.doFilter(request, response);
	}



	/**
	 * 初始化过滤器
	 * 
	 * @param config
	 *            config
	 * 
	 * @return
	 * 
	 * @throws ServletException
	 *             ServletException
	 */
	@Override
	public void init(FilterConfig config) throws ServletException {
	    String ignores = config.getInitParameter("ignore-url");
        this.ignoreList = makeIgnoreList(ignores, null);
	}

    private List<String> makeIgnoreList(String clientIgnoreURIS, String ecs2ecsIgnoreURIs) {
        List<String> ret = new LinkedList<>();
        StringBuilder sbd = new StringBuilder();
        if (!StringUtils.isBlank(clientIgnoreURIS)) {
            sbd.append(StringUtils.trim(clientIgnoreURIS));
        }
        if (!StringUtils.isBlank(ecs2ecsIgnoreURIs)) {
            sbd.append(";");
            sbd.append(StringUtils.trim(ecs2ecsIgnoreURIs));
        }
        for (String uri : StringUtils.split(sbd.toString(), ';')) {
            ret.add(StringUtils.trim(uri));
        }
        return ret;
    }


    @Override
	public void destroy() {
	}

}
