package com.lvxh.plugin.sie.thread;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.util.NettyUtils;
import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.bean.SIEMsgContent;
import com.lvxh.plugin.sie.bean.SIEUserStatus;
import com.lvxh.plugin.sie.server.SIECache;

import io.netty.channel.Channel;

public class SIEReceiveSms implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIEReceiveSms.class);

	@Override
	public void run() {
		while (true) {
			try {
				final SIEMessage bean = SIECache.RECEIVER_QUEUE.take();
				if(bean != null)
				{
					NettyUtils.submit(new Runnable() {
						@Override
						public void run() {
							try {
								// procRece(bean, content);
								Channel ch = bean.getChannel();
								// 心跳
								if (5262 == bean.getMsgType()) {
									
									SIECache.success(bean, ch,5264);
									ch.writeAndFlush(bean);
									
								}
								//登录
								else if (5250 == bean.getMsgType()) {
									login(bean, ch);
									SIECache.success(bean, ch, 5252);
								}
								//透传
								else if (5258 == bean.getMsgType()) {
									SIECache.SEND_MSG_WS_QUEUE.put(bean);
								}
								//退出
								else if (5254 == bean.getMsgType()) {
									SIECache.success(bean, ch, 5256);
									SIEMsgContent con = SIECache.GSON.fromJson(bean.getStr(), SIEMsgContent.class);
									Channel oldCh = SIECache.map.get(con.getStrSrcDomainCode());
									if (oldCh != null) {
										SIEUserStatus status = oldCh.attr(SIECache.AUTH).get();
										status.setLoginStatus(false);
									}
								}
							} catch (Exception e) {
								LOG.error(e.getMessage(), e);
							}
						}

						private void login(final SIEMessage bean, Channel ch) {
							SIEMsgContent con = SIECache.GSON.fromJson(bean.getStr(), SIEMsgContent.class);
							Channel oldCh = SIECache.map.get(con.getStrSrcDomainCode());
							if (oldCh != null) {
								SIEUserStatus status = oldCh.attr(SIECache.AUTH).get();
								status.setLoginStatus(false);

							}
							SIEUserStatus status = ch.attr(SIECache.AUTH).get();
							status.setTime(System.currentTimeMillis());
							status.setLastMsgTime(System.currentTimeMillis());
							status.setLoginStatus(true);
							status.setSrc(con.getStrSrcDomainCode());
							SIECache.map.put(con.getStrSrcDomainCode(), ch);
						}
						
					});
				}
				
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

		}
	}

}
