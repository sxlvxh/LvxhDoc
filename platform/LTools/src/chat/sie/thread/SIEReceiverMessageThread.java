package chat.sie.thread;

import org.apache.log4j.Logger;

import chat.netty.bean.Message;
import chat.sie.bean.SIEMessage;
import chat.sie.client.SIENettyClient;

public class SIEReceiverMessageThread implements Runnable {

	private static final Logger LOG = Logger.getLogger(SIEReceiverMessageThread.class);

	private SIENettyClient client;
	
	public SIEReceiverMessageThread(SIENettyClient client) {
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
				
				final SIEMessage bean = client.getRecvQueue().take();
				if(bean != null)
				{
					client.getService().excutor(bean);
				}
				
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}

		}
	}

}
