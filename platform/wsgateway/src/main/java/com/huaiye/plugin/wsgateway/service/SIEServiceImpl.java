package com.huaiye.plugin.wsgateway.service;

import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import com.huaiye.plugin.wsgateway.client.WsUtils;
import com.huaiye.plugin.wsgateway.config.Config;
import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.server.SIECache;
import com.lvxh.plugin.sie.service.SIEService;

@Service
public class SIEServiceImpl implements SIEService,ApplicationContextAware {

	private static final Logger LOG = Logger.getLogger(SIEServiceImpl.class);
	
	@Autowired
	protected Config config;

    private ApplicationContext applicationContext;

//	@Autowired
//	protected WsUtils wsUtil;
	
	
	@Override
	public int tcpToWs(SIEMessage bean) {
		LOG.debug(bean);
		WsUtils wsUtil = applicationContext.getBean(WsUtils.class);
		wsUtil.executor( "sendSieMsg", SIECache.GSON.toJson(bean));
		return 0;
	}


    @Override
    public void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
       this.applicationContext=applicationContext;
        
    }
}
