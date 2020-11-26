package chat.netty.thread;

import org.apache.log4j.Logger;

import chat.netty.bean.Message;
import chat.netty.client.NettyClient;

public class ReceiverMessageThread implements Runnable {

	private static final Logger LOG = Logger.getLogger(ReceiverMessageThread.class);

	private NettyClient client;
	
	public ReceiverMessageThread(NettyClient client) {
		super();
		this.client = client;
	}

	
	@Override
	public void run() {
		while (true) {
			try {
				
				if(client.getStatus() == 1)
				{
					LOG.debug(" stop ReceiverMessageThread !");
					return;
				}
				
				final Message bean = client.getRecvQueue().take();
				if(bean != null)
				{
					client.getService().excutor(bean.getContent());
				}
				
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

		}
	}

}
