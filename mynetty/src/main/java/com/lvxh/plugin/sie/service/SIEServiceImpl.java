package com.lvxh.plugin.sie.service;

import org.apache.log4j.Logger;

import com.lvxh.plugin.sie.bean.SIEMessage;

public class SIEServiceImpl implements SIEService {

	private static final Logger LOG = Logger.getLogger(SIEServiceImpl.class);
	@Override
	public int tcpToWs(SIEMessage bean) {
		LOG.debug(bean);
		return 0;
	}
}
