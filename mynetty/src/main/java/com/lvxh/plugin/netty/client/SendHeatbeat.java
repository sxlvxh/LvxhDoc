package com.lvxh.plugin.netty.client;

import java.util.UUID;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.MessageContent;

public class SendHeatbeat implements Runnable {

	private static final Logger LOG = Logger.getLogger(SendHeatbeat.class);

	@Override
	public void run() {
		while (true) {
			try {
				if(NettyClientCache.client !=null)
				{
					if(NettyClientCache.client.getChannel() !=null)
					{
						NettyClientCache.client.getChannel().writeAndFlush(getBaseMsg("heartbeat"));
					}
				}
				try {
					Thread.sleep(1000*15);
				} catch (InterruptedException e) {
					LOG.error(e.getMessage(), e);
				}
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}
		}
	}

	private MessageContainer getBaseMsg(String smsType) throws Exception {
		
		MessageContent content = new MessageContent();
		content.setMsgType(smsType);
		content.setUid(UUID.randomUUID().toString());
		
		Message message = new Message();
		message.setChannelType(0);
		message.setMsgType(smsType);
		if(NettyClientCache.client !=null)
		{
			message.setSrc(NettyClientCache.client.getLoginName());
		}
		message.setContent(content);
		MessageContainer msg = new MessageContainer();
		msg.setContent(NettyCache.GSON.toJson(message));
		msg.setLength(msg.getContent().getBytes("UTF-8").length);
		return msg;
	}

}
