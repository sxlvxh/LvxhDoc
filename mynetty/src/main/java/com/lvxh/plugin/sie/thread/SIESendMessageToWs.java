package com.lvxh.plugin.sie.thread;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.util.NettyUtils;
import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.server.SIECache;
import com.lvxh.plugin.sie.service.SIEService;

public class SIESendMessageToWs implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIESendMessageToWs.class);
	private SIEService service;
	public SIESendMessageToWs(SIEService service) {
		this.service = service;
	}
	@Override
	public void run() {
		while (true) {
			try {
				final SIEMessage bean = SIECache.SEND_MSG_WS_QUEUE.take();
				if(bean != null)
				{
					NettyUtils.submit(new Runnable() {
						@Override
						public void run() {
							try {
 								int code = service.tcpToWs(bean);
 								if(bean.getChannel() !=null && code == 0)
 								{
 									SIECache.success(bean,bean.getChannel(), 5260);
 								}else
 								{
 									SIECache.failed(bean,bean.getChannel(), 5260);
 								}
								
							} catch (Exception e) {
								LOG.error(e.getMessage(), e);
							}
						}
					});
				}
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

		}
	}

}
