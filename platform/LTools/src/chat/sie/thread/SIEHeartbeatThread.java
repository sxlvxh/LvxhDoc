package chat.sie.thread;

import java.util.UUID;

import org.apache.log4j.Logger;

import chat.netty.bean.Message;
import chat.netty.bean.MessageContainer;
import chat.netty.bean.MessageContent;
import chat.netty.client.NettyClient;
import chat.sie.bean.SIEMessage;
import chat.sie.bean.SIEMsgContent;
import chat.sie.client.SIENettyClient;

public class SIEHeartbeatThread implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIEHeartbeatThread.class);
	
	private SIENettyClient client;
	
	public SIEHeartbeatThread(SIENettyClient client) {
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
						SIEMessage message = new SIEMessage();
						SIEMsgContent con = new SIEMsgContent();
						con.setStrSrcDomainCode(client.getLoginName());
						message.setStr(client.GSON.toJson(con));
						message.setMsgSize(message.getStr().getBytes("UTF-8").length);
						message.setMsgType(5262);
						message.setSessionID(1);
						message.setSize(message.getMsgSize() + 16);
						
						if(client.getChannel() !=null && client.getChannel().isActive())
						{
							client.getChannel().writeAndFlush(message);
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
