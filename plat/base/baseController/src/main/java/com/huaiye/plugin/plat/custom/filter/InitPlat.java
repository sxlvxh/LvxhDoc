package com.huaiye.plugin.plat.custom.filter;

import javax.annotation.PostConstruct;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.huaiye.plugin.plat.custom.config.Config;
import com.huaiye.plugin.plat.custom.utils.EmpPositionThread;
import com.huaiye.plugin.plat.platpositionhis.service.PlatPositionHisService;
import com.lvxh.plugin.netty.client.NettyClientCache;
import com.lvxh.plugin.netty.service.NettyService;
import com.lvxh.plugin.platform.license.License;
import com.lvxh.plugin.platform.utils.PUtils;

/**
 * 
 *
 */
@Component
public final class InitPlat {
    final static Logger LOG = Logger.getLogger(InitPlat.class);

	@Autowired
	private Config config;
	
	@Autowired
	private NettyService nettyService;
	
	@Autowired
	private PlatPositionHisService platPositionHisService;
	
    @PostConstruct
    public void init() {
    	License.init();
    	if(config.isTcpServer)
    	{
    		PUtils.submit(()->{
    			NettyClientCache.init(config.intranetIp,config.entCode,config.tcpPort,nettyService);
    		});
    	}
    	
    	PUtils.submit(new EmpPositionThread(platPositionHisService));
    }

   
}
