package chat.netty.client;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.UUID;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import chat.netty.bean.Message;
import chat.netty.bean.MessageContainer;
import chat.netty.bean.MessageContent;
import chat.netty.service.NettyClientService;
import chat.netty.service.impl.NettyClientServiceImpl;
import chat.netty.thread.HeartbeatThread;
import chat.netty.thread.ReceiverMessageThread;
import chat.netty.thread.SendMessageThread;
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;

public class NettyClient {
	private static final Logger LOG = Logger.getLogger(NettyClient.class);
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
	
	private  final BlockingQueue<Message> recvQueue = new LinkedBlockingQueue<Message>(2000);
	private  final BlockingQueue<Message> sendQueue = new LinkedBlockingQueue<Message>(2000);
	
	private EventLoopGroup eventLoopGroup = null;
	private Bootstrap bootstrap = null;
	private Channel channel = null;
	private String ip;
	private int port;
	private String loginName;
	private NettyClientService service;
	/**
	 * status == 1 被踢  0 默认状态
	 */
	private int status = 0; 
	
    public static void main(String[] args) throws Exception{
    	final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/resource/conf/log4j.properties");
		new NettyClient().start("192.168.2.111","A40-102-2-A",8088,new NettyClientServiceImpl(null));
    }

	public void start(String ip,String loginName,int port,NettyClientService service) {
		setIp(ip);
		setPort(port);
		setLoginName(loginName);
		setService(service);
		init();
		new Thread(new HeartbeatThread(this)).start();
		new Thread(new SendMessageThread(this)).start();
		new Thread(new ReceiverMessageThread(this)).start();
		
	}
	public void close()
	{
		setStatus(1);
		stopReceiverThread();
		stopSendThread();
	}

	private void stopReceiverThread() {
		try {
			MessageContent content = new MessageContent();
			content.setMsgType("logout");
			content.setUid(UUID.randomUUID().toString());
			
			Message message = new Message();
			message.setChannelType(0);
			message.setMsgType("logout");
			message.setSrc("server");
			message.setContent(content);
			recvQueue.put(message);
			recvQueue.put(message);
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}
	}

	private void stopSendThread() {
		try {
			MessageContent content = new MessageContent();
			content.setSrc(loginName);
			content.setMsgType("logout");
			content.setUid(UUID.randomUUID().toString());
			
			Message message = new Message();
			message.setChannelType(0);
			message.setMsgType("logout");
			message.setSrc("server");
			message.setContent(content);
			sendQueue.put(message);
			sendQueue.put(message);
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(),e);
		}
	}
	
	public void sendMsg(MessageContent content) {
		try {
			Message message = new Message();
			message.setChannelType(0);
			message.setMsgType("forward");
			message.setSrc("server");
			message.setContent(content);
			sendQueue.put(message);
		} catch (InterruptedException e) {
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
				.handler(new NettyClientInitializer(this));
				
				ChannelFuture future = bootstrap.connect(ip,port).sync();
				channel = future.channel();
				if(future.isSuccess())
				{
					LOG.debug(" connection tcp server successfuly! ");
					MessageContainer msg = getSystemMessage("login");
					channel.writeAndFlush(msg);
				}
			}catch(Exception e){
				LOG.error(e.getMessage(), e);
			}finally {
				//eventLoopGroup.shutdownGracefully();
			}
	}

	public MessageContainer getSystemMessage(String msgType) throws UnsupportedEncodingException {
		MessageContent content = new MessageContent();
		content.setSrc(loginName);
		content.setMsgType(msgType);
		content.setUid(UUID.randomUUID().toString());
		
		Message message = new Message();
		message.setChannelType(0);
		message.setMsgType(msgType);
		message.setSrc("server");
		message.setContent(content);
		
		MessageContainer msg = new MessageContainer();
		msg.setContent(new Gson().toJson(message));
		msg.setLength(msg.getContent().getBytes("UTF-8").length);
		return msg;
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

	public NettyClientService getService() {
		return service;
	}

	public void setService(NettyClientService service) {
		this.service = service;
	}

	public EventLoopGroup getEventLoopGroup() {
		return eventLoopGroup;
	}

	public BlockingQueue<Message> getRecvQueue() {
		return recvQueue;
	}

	public BlockingQueue<Message> getSendQueue() {
		return sendQueue;
	}

	
}
