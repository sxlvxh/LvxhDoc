package com.huaiye.plugin.plat.custom.filter;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.platmenu.holder.PlatMenuHolder;
import com.lvxh.plugin.platform.service.Constants;
import com.lvxh.plugin.platform.utils.PUtils;

@Component
public class MyInterceptor implements HandlerInterceptor {

	private final Logger LOG = Logger.getLogger(MyInterceptor.class);

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception e)
			throws Exception {

	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView arg3)
			throws Exception {

	}

	/**
	 * 如果返回false 从当前拦截器往回执行所有拦截器的afterCompletion方法，再退回拦截器链 如果返回true
	 * 执行下一个拦截器，直到所有拦截器都执行完毕 再运行被拦截的Controller
	 * 然后进入拦截器链从最后一个拦截器往回运行所有拦截器的postHandle方法
	 * 接着依旧是从最后一个拦截器往回执行所有拦截器的afterCompletion方法
	 */
	@SuppressWarnings("unchecked")
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String url = request.getServletPath();
		LOG.info(" request url : " + url);

		Object obj = request.getSession().getAttribute(Constants.MENU_LIST);
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String> map1 = new HashMap<String, String>();
		if (obj != null) {
			List<Object> list = (List<Object>) obj;
			for (Object menu : list) {
				if (menu instanceof PlatMenuHolder) {
					PlatMenuHolder m = (PlatMenuHolder) menu;
					map.put(m.getMenuUrl(), menu);
					map1.put(String.valueOf(m.getMenuCode()), m.getName());
				}
			}

		}

		Object menuObj = map.get(url);
		if (menuObj != null) {
			if (menuObj instanceof PlatMenuHolder) {
				PlatMenuHolder m = (PlatMenuHolder) menuObj;
				request.getSession().setAttribute("web_paretn_id", m.getParentCode());
				request.getSession().setAttribute("web_active_id", m.getMenuCode());
				request.getSession().setAttribute("web_active_name", m.getName());
				request.getSession().setAttribute("web_parent_name", map1.get(String.valueOf(m.getParentCode())));
			} 
		}
		if (request.getSession(false) == null) {
			LOG.debug(" Session has been invalidated! " + url);
		} else {
			request.getSession().setAttribute("system_time", PUtils.dateToStr(new Date()));
		}

		return true;
	}
}