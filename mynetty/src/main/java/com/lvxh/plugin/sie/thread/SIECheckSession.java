package com.lvxh.plugin.sie.thread;

import java.util.List;

import org.apache.log4j.Logger;

import com.lvxh.plugin.sie.bean.SIEUserStatus;
import com.lvxh.plugin.sie.server.SIECache;

import io.netty.channel.Channel;
import io.netty.channel.ChannelFutureListener;

public class SIECheckSession implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIECheckSession.class);

	@Override
	public void run() {
		while (true) {
			try {
				List<Channel> list = SIECache.list;
				for (int i = 0; i < list.size(); i++) {
					Channel c = list.get(i);
					SIEUserStatus status = c.attr(SIECache.AUTH).get();
					LOG.debug(list.size() + " " + status);
					long now = System.currentTimeMillis();
					if (status.isLoginStatus()) {
                          if(now - status.getLastMsgTime() > 60000*3)
                          {
	  							c.closeFuture().addListener(ChannelFutureListener.CLOSE);
	  							c.close();
	  							list.remove(c);
	  							i--;
                          }
						
					} else {
						if (now - status.getTime() > 1000 * 2) {
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

}
