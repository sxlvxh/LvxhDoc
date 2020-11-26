package com.huaiye.plugin.wsgateway.service;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huaiye.plugin.wsgateway.config.Config;
import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.service.NettyService;
import com.lvxh.plugin.platform.utils.PUtils;
import com.lvxh.plugin.sie.server.SIECache;
import com.lvxh.plugin.sie.service.SIEService;

@Component
public class Initialization {

	private final static Logger LOG = Logger.getLogger(Initialization.class);


	@Autowired
	private Config config;

	
	@Autowired
	private NettyService service;
	
	@Autowired
	private SIEService sieService;

	@PostConstruct
	public void index() {
		LOG.debug("start tcp server: ");
		PUtils.submit(()-> {
			NettyCache.nettyServer(config.tcpPort,config.webSocketPort,service);
		});
		PUtils.submit(()-> {
			SIECache.start(config.sieTcpServerPort, sieService);
		});
	}
}
