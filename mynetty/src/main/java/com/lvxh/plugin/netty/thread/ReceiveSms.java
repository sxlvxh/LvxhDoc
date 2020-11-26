package com.lvxh.plugin.netty.thread;

import java.util.List;
import java.util.UUID;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.google.gson.Gson;
import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.MessageContent;
import com.lvxh.plugin.netty.bean.NettyUserStatus;
import com.lvxh.plugin.netty.util.NettyUtils;

import io.netty.channel.Channel;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

public class ReceiveSms implements Runnable {

	private static final Logger LOG = Logger.getLogger(ReceiveSms.class);

	@Override
	public void run() {
		while (true) {
			try {
				final Message bean = NettyCache.RECEIVER_QUEUE.take();
				if(bean != null)
				{
					NettyUtils.submit(new Runnable() {
						@Override
						public void run() {
							try {
							//procRece(bean, content);
							Channel ch = bean.getChannel();
							if("heartbeat".equals(bean.getMsgType()))
							{
								NettyUserStatus status = ch.attr(NettyCache.AUTH).get();
								if(status.isLoginStatus())
								{
									status.setLastMsgTime(System.currentTimeMillis());
								}
								MessageContainer msg = new MessageContainer();
								msg.setContent(NettyCache.GSON.toJson(bean));
								msg.setLength(msg.getContent().getBytes("UTF-8").length);
								
								if(bean.getChannelType() == 0)
								{
									ch.writeAndFlush(msg);
									
								}else if(bean.getChannelType() == 1)
								{
									TextWebSocketFrame ws = new TextWebSocketFrame(NettyCache.GSON.toJson(msg));
									ch.writeAndFlush(ws);
								}
								
							}
							else if("login".equals(bean.getMsgType()))
							{
								LOG.debug(ch.toString());
								Channel oldCh = NettyCache.MAP.get(bean.getContent().getSrc());
								if( oldCh != null)
								{
									//NettyCache.MAP.remove(content.getSrc());
									NettyUserStatus status = oldCh.attr(NettyCache.AUTH).get();
									kickout(oldCh,status);
									status.setLoginStatus(false);
									
								}
								NettyUserStatus status = ch.attr(NettyCache.AUTH).get();
								status.setTime(System.currentTimeMillis());
								status.setLastMsgTime(System.currentTimeMillis());
								status.setLoginStatus(true);
								status.setSrc(bean.getContent().getSrc());
								NettyCache.MAP.put(bean.getContent().getSrc(), ch);
							}else if("forward".equals(bean.getMsgType()))
							{
								List<String> list = bean.getContent().getTargets();
								if(list !=null)
								{
									for(String target : list)
									{
										Message _bean =new Message();
										MessageContent _mc = new MessageContent();
										BeanUtils.copyProperties(_mc,bean.getContent());
										_bean.setContent(_mc);
										_bean.setMsgType(bean.getMsgType());
										_bean.getContent().setTarget(target);
										NettyCache.SEND_MSG_QUEUE.put(_bean);
									}
								}
							}else if("logout".equals(bean.getMsgType()))
							{
								List<Channel> list = NettyCache.LIST;
								for (int i = 0; i < list.size(); i++) {
									Channel c = list.get(i);
									NettyUserStatus status = c.attr(NettyCache.AUTH).get();
									if (StringUtils.isNotBlank(status.getSrc()) && status.getSrc().equals(bean.getContent().getSrc())) {
										list.remove(i);
										break;
									}
								}
							}
							}catch(Exception e)
							{
								LOG.error(e.getMessage(), e);
							}
						}

						public void kickout(Channel ch,NettyUserStatus bean) {
							
							try {
								
								MessageContent content = new MessageContent();
								content.setMsgType("kickout");
								content.setUid(UUID.randomUUID().toString());
								
								
								Message message = new Message();
								message.setChannelType(0);
								message.setMsgType("kickout");
								message.setSrc("server");
								message.setContent(content);
								
								MessageContainer msg = new MessageContainer();
								msg.setContent(new Gson().toJson(message));
								msg.setLength(msg.getContent().getBytes("UTF-8").length);
								
								if(bean.getChannelType() == 0)
								{
									ch.writeAndFlush(msg);
									
								}else if(bean.getChannelType() == 1)
								{
									TextWebSocketFrame ws = new TextWebSocketFrame(NettyCache.GSON.toJson(message));
									ch.writeAndFlush(ws);
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
