package com.lvxh.plugin.netty.thread;

import java.util.List;
import java.util.UUID;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.MessageContent;
import com.lvxh.plugin.netty.bean.NettyUserStatus;

import io.netty.channel.Channel;
import io.netty.channel.ChannelFutureListener;

public class CheckSession implements Runnable {

	private static final Logger LOG = Logger.getLogger(CheckSession.class);

	@Override
	public void run() {
		while (true) {
			try {
				List<Channel> list = NettyCache.LIST;
				for (int i = 0; i < list.size(); i++) {
					Channel c = list.get(i);
					NettyUserStatus status = c.attr(NettyCache.AUTH).get();
					LOG.debug(list.size() + " " + status);
					long now = System.currentTimeMillis();
					if (status.isLoginStatus()) {
                          if(now - status.getLastMsgTime() > 60000*3)
                          {
	  							try {
									MessageContainer msg = getBaseMsg("unhearbeat");
									c.writeAndFlush(msg);
									
								} catch (Exception e) {
									LOG.error(e.getMessage(), e);
								}
	  							c.closeFuture().addListener(ChannelFutureListener.CLOSE);
	  							c.close();
	  							list.remove(c);
	  							i--;
                          }
						
					} else {
						if (now - status.getTime() > 1000 * 2) {
							try {
								MessageContainer msg = getBaseMsg("unlogin");
								c.writeAndFlush(msg);
								
							} catch (Exception e) {
								LOG.error(e.getMessage(), e);
							}
							c.closeFuture().addListener(ChannelFutureListener.CLOSE);
							c.close();
							list.remove(c);
							i--;
						}
					}
				}
				Thread.sleep(5000);
			} catch (InterruptedException e) {
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
		message.setSrc("server");
		message.setContent(content);
		MessageContainer msg = new MessageContainer();
		msg.setContent(NettyCache.GSON.toJson(message));
		msg.setLength(msg.getContent().getBytes("UTF-8").length);
		return msg;
	}

}
