package com.lvxh.plugin.netty.client;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.bean.MessageContent;
import com.lvxh.plugin.netty.util.NettyUtils;

public class SendMessage implements Runnable {

	private static final Logger LOG = Logger.getLogger(SendMessage.class);
	@Override
	public void run() {
		while (true) {
			try {
				final MessageContent bean =NettyClientCache.take();
				if(bean != null)
				{
					NettyUtils.submit(new Runnable() {
						@Override
						public void run() {
							try {
								if(NettyClientCache.client !=null)
								{
									NettyClientCache.client.getChannel().writeAndFlush(NettyClientCache.getSendMsg(bean));
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
