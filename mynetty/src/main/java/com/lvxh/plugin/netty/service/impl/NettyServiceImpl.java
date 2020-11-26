package com.lvxh.plugin.netty.service.impl;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.service.NettyService;

public class NettyServiceImpl implements NettyService {

	private static final Logger LOG = Logger.getLogger(NettyServiceImpl.class);
	
	@Override
	public void excutor(Message message) {
		
        LOG.debug(message);
	}

}
