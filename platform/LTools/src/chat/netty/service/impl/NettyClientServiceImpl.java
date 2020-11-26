package chat.netty.service.impl;

import org.apache.log4j.Logger;

import chat.netty.NettyController;
import chat.netty.bean.MessageContent;
import chat.netty.client.NettyClient;
import chat.netty.service.NettyClientService;
import javafx.application.Platform;

public class NettyClientServiceImpl implements NettyClientService {

	private static final Logger LOG = Logger.getLogger(NettyClientServiceImpl.class);
	
	private NettyController netty;
	
	public NettyClientServiceImpl(NettyController netty) {
		super();
		this.netty = netty;
	}
	@Override
	public void excutor(MessageContent message) {
		
        LOG.debug(message);
        try {
        	Platform.runLater(new Runnable() {
				
				@Override
				public void run() {
					netty.getRecvMsg().appendText(NettyClient.GSON.toJson(message));
					netty.getRecvMsg().appendText(System.getProperty("line.separator"));
				}
			});
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

}
