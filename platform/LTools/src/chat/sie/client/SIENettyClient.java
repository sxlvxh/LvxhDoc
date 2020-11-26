package chat.sie.client;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import chat.sie.bean.SIEMessage;
import chat.sie.bean.SIEMsgContent;
import chat.sie.service.SIENettyClientService;
import chat.sie.service.impl.SIENettyClientServiceImpl;
import chat.sie.thread.SIEHeartbeatThread;
import chat.sie.thread.SIEReceiverMessageThread;
import chat.sie.thread.SIESendMessageThread;
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;

public class SIENettyClient {
	private static final Logger LOG = Logger.getLogger(SIENettyClient.class);
	public static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").setExclusionStrategies(new ExclusionStrategy() {  
	    @Override
	    public boolean shouldSkipField(FieldAttributes f) {
	        return false;
	    }

	    @Override
	    public boolean shouldSkipClass(Class<?> incomingClass) {
	        return incomingClass == Channel.class/* || incomingClass == boolean.class*/;
	    }
	}).create();
	
	private  final BlockingQueue<SIEMessage> recvQueue = new LinkedBlockingQueue<SIEMessage>(2000);
	private  final BlockingQueue<SIEMessage> sendQueue = new LinkedBlockingQueue<SIEMessage>(2000);
	
	private EventLoopGroup eventLoopGroup = null;
	private Bootstrap bootstrap = null;
	private Channel channel = null;
	private String ip;
	private int port;
	private String loginName;
	private SIENettyClientService service;
	/**
	 * status == 1 被踢  0 默认状态
	 */
	private int status = 0; 
	
    public static void main(String[] args) throws Exception{
    	final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/resource/conf/log4j.properties");
		new SIENettyClient().start("192.168.2.111","A40-102-2-A",9999,new SIENettyClientServiceImpl(null));
    }

	public void start(String ip,String loginName,int port,SIENettyClientService service) {
		setIp(ip);
		setPort(port);
		setLoginName(loginName);
		setService(service);
		init();
		new Thread(new SIEHeartbeatThread(this)).start();
		new Thread(new SIESendMessageThread(this)).start();
		new Thread(new SIEReceiverMessageThread(this)).start();
		
	}
	public void close()
	{
		setStatus(1);
		stopReceiverThread();
		stopSendThread();
	}

	private void stopReceiverThread() {
		try {
			
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
	}

	private void stopSendThread() {
		try {
			
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
	}
	
	public void sendMsg(String string) {
		try {
			SIEMessage message = new SIEMessage();
			message.setStr(string);
			message.setMsgSize(string.getBytes("UTF-8").length);
			message.setMsgType(5258);
			message.setSessionID(1);
			message.setSize(message.getMsgSize() + 16);
			sendQueue.put(message);
		} catch (Exception e) {
			LOG.error(e.getMessage(),e);
		}
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public void init() {
			try{
				
				LOG.debug(" start try connection tcp server ... ");
				
				eventLoopGroup = new NioEventLoopGroup();
				bootstrap = new Bootstrap();
				bootstrap.group(eventLoopGroup).channel(NioSocketChannel.class)
				.handler(new SIENettyClientInitializer(this));
				
				ChannelFuture future = bootstrap.connect(ip,port).sync();
				channel = future.channel();
				if(future.isSuccess())
				{
					LOG.debug(" connection tcp server successfuly! ");
					SIEMessage msg = getSystemMessage(5250);
					channel.writeAndFlush(msg);
				}
			}catch(Exception e){
				LOG.error(e.getMessage(), e);
			}finally {
				//eventLoopGroup.shutdownGracefully();
			}
	}

	public SIEMessage getSystemMessage(int msgType) throws UnsupportedEncodingException {
		SIEMessage message = new SIEMessage();
		SIEMsgContent con = new SIEMsgContent();
		con.setStrSrcDomainCode(loginName);
		message.setStr(GSON.toJson(con));
		message.setMsgSize(message.getStr().getBytes("UTF-8").length);
		message.setMsgType(msgType);
		message.setSessionID(1);
		message.setSize(message.getMsgSize() + 16);
		return message;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public Channel getChannel() {
		return channel;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public SIENettyClientService getService() {
		return service;
	}

	public void setService(SIENettyClientService service) {
		this.service = service;
	}

	public EventLoopGroup getEventLoopGroup() {
		return eventLoopGroup;
	}

	public BlockingQueue<SIEMessage> getRecvQueue() {
		return recvQueue;
	}

	public BlockingQueue<SIEMessage> getSendQueue() {
		return sendQueue;
	}

	
}
