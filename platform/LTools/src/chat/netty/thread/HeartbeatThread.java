package chat.netty.thread;

import java.util.UUID;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import chat.netty.bean.Message;
import chat.netty.bean.MessageContainer;
import chat.netty.bean.MessageContent;
import chat.netty.client.NettyClient;

public class HeartbeatThread implements Runnable {

	private static final Logger LOG = Logger.getLogger(HeartbeatThread.class);
	
	private NettyClient client;
	
	public HeartbeatThread(NettyClient client) {
		super();
		this.client = client;
	}


	@Override
	public void run() {
				while(true)
				{

					if(client.getStatus() == 1)
					{
						LOG.debug(" stop HeartbeatThread !");
						return;
					}
					try {
						MessageContent content = new MessageContent();
						content.setMsgType("heartbeat");
						content.setUid(UUID.randomUUID().toString());
						Message message = new Message();
						message.setChannelType(0);
						message.setMsgType("heartbeat");
						message.setSrc("server");
						message.setContent(content);
						
						MessageContainer msg = new MessageContainer();
						msg.setContent(NettyClient.GSON.toJson(message));
						msg.setLength(msg.getContent().getBytes("UTF-8").length);
						if(client.getChannel() !=null && client.getChannel().isActive())
						{
							client.getChannel().writeAndFlush(msg);
						}
					} catch (Exception e) {
						LOG.error(e.getMessage(),e);
					}
					try {
						Thread.sleep(1000*10);
					} catch (InterruptedException e) {
						LOG.error(e.getMessage(), e);
					}
					
				}
				
		}


}
