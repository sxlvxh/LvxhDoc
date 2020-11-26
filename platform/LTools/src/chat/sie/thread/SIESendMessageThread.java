package chat.sie.thread;

import org.apache.log4j.Logger;

import chat.sie.bean.SIEMessage;
import chat.sie.client.SIENettyClient;
import io.netty.channel.Channel;

public class SIESendMessageThread implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIESendMessageThread.class);

	private SIENettyClient client;

	public SIESendMessageThread(SIENettyClient client) {
		super();
		this.client = client;
	}

	@Override
	public void run() {
		while (true) {
			try {
				
				if(client.getStatus() == 1)
				{
					LOG.debug(" stop SendMessageThread !");
					client.getEventLoopGroup().shutdownGracefully();
					return;
				}
				
				final SIEMessage bean = client.getSendQueue().take();
				if (bean != null) {

					Channel c = client.getChannel();
					c.writeAndFlush(bean);

				}
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

		}
	}

}
