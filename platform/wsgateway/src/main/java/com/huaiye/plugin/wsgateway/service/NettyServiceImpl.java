package com.huaiye.plugin.wsgateway.service;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import com.huaiye.plugin.wsgateway.client.WsUtils;
import com.huaiye.plugin.wsgateway.config.Config;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.service.NettyService;
import com.lvxh.plugin.sie.server.SIECache;

@Service
public class NettyServiceImpl implements NettyService, ApplicationContextAware {

	@SuppressWarnings("unused")
	@Autowired
	private Config config;

	// @Autowired
	// protected WsUtils wsUtil;

	ApplicationContext applicationContext;

	@Override
	public void excutor(Message message) {
		WsUtils wsUtil = applicationContext.getBean(WsUtils.class);
		wsUtil.executor("sendTcpMsg", SIECache.GSON.toJson(message));
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;

	}

}
