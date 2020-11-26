package com.lvxh.plugin.sie.thread;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.util.NettyUtils;
import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.bean.SIEMsgContent;
import com.lvxh.plugin.sie.server.SIECache;

import io.netty.channel.Channel;

public class SIESendMessageToTcp implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIESendMessageToTcp.class);

	@Override
	public void run() {
		while (true) {
			try {
				final SIEMessage bean = SIECache.SEND_MSG_TCP_QUEUE.take();
				if (bean != null) {
					NettyUtils.submit(new Runnable() {
						@Override
						public void run() {
							try {
								SIEMsgContent con = SIECache.GSON.fromJson(bean.getStr(), SIEMsgContent.class);
								Channel ch = SIECache.map.get(con.getStrDstDomainCode());
								if(ch !=null)
								{
									ch.writeAndFlush(bean);
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
