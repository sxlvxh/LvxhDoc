package chat.netty.thread;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import chat.netty.bean.Message;
import chat.netty.bean.MessageContainer;
import chat.netty.client.NettyClient;
import io.netty.channel.Channel;

public class SendMessageThread implements Runnable {

	private static final Logger LOG = Logger.getLogger(SendMessageThread.class);

	private NettyClient client;

	public SendMessageThread(NettyClient client) {
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
				
				final Message bean = client.getSendQueue().take();
				if (bean != null) {

					Channel c = client.getChannel();
					MessageContainer msg = new MessageContainer();
					msg.setContent(NettyClient.GSON.toJson(bean));
					msg.setLength(msg.getContent().getBytes("UTF-8").length);
					c.writeAndFlush(msg);

				}
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

		}
	}

}
