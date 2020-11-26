package com.lvxh.plugin.netty.thread;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.NettyUserStatus;
import com.lvxh.plugin.netty.util.NettyUtils;

import io.netty.channel.Channel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

public class SendTcpMessage implements Runnable {

	private static final Logger LOG = Logger.getLogger(SendTcpMessage.class);
	@Override
	public void run() {
		while (true) {
			try {
				final Message bean = NettyCache.SEND_MSG_TCP_QUEUE.take();
				if(bean != null)
				{
					NettyUtils.submit(new Runnable() {
						@Override
						public void run() {
							try {
 								Channel c = NettyCache.MAP.get(bean.getContent().getTarget());
 								if(c !=null)
 								{
 									NettyUserStatus status = c.attr(NettyCache.AUTH).get();
 									
 									if(status.getChannelType() == NettyCache.TCP_SOCKET)
 									{
 										MessageContainer msg = new MessageContainer();
 										msg.setContent(NettyCache.GSON.toJson(bean));
 										msg.setLength(msg.getContent().getBytes("UTF-8").length);
 										c.writeAndFlush(msg);
 										
 									}else if(status.getChannelType() == NettyCache.WEB_SOCKET)
 									{
 										TextWebSocketFrame ws = new TextWebSocketFrame(NettyCache.GSON.toJson(bean));
 										c.writeAndFlush(ws);
 									}
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
