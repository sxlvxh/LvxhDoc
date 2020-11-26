package chat.sie.service.impl;

import org.apache.log4j.Logger;

import chat.netty.client.NettyClient;
import chat.sie.SieController;
import chat.sie.bean.SIEMessage;
import chat.sie.service.SIENettyClientService;
import javafx.application.Platform;

public class SIENettyClientServiceImpl implements SIENettyClientService {

	private static final Logger LOG = Logger.getLogger(SIENettyClientServiceImpl.class);
	
	private SieController netty;
	
	public SIENettyClientServiceImpl(SieController netty) {
		super();
		this.netty = netty;
	}
	@Override
	public void excutor(SIEMessage message) {
		
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
