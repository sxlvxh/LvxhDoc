package com.lvxh.plugin.netty.client;

import java.io.File;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.MessageContent;

import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;

public class NettyClient {
	private static final Logger LOG = Logger.getLogger(NettyClient.class);
	private EventLoopGroup eventLoopGroup;// = new NioEventLoopGroup();
	private  Bootstrap bootstrap;// = new Bootstrap();
	private Channel channel = null;
	private String ip;
	private int port;
	private String loginName;
	/**
	 * status == 1 被踢 0 默认状态
	 */
	private int status = 0; 
	
    public static void main(String[] args) throws Exception{
    	final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/rsources/log4j.properties");
		//NettyCache.getClient().start("192.168.2.113","A40-102-2-A",8088,new NettyClientServiceImpl());
    }

	public NettyClient(String ip,String loginName,int port) {
		setIp(ip);
		setPort(port);
		setLoginName(loginName);
		init();
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public boolean init() {
			try{
				eventLoopGroup = new NioEventLoopGroup();
				bootstrap = new Bootstrap();
				bootstrap.group(eventLoopGroup).channel(NioSocketChannel.class).handler(new NettyClientInitializer());
				conn();
			}catch(Exception e){
				LOG.error(e.getMessage(), e);
			}finally {
				//eventLoopGroup.shutdownGracefully();
			}
			return false;
	}

	public void conn() throws InterruptedException {
		ChannelFuture future = bootstrap.connect(ip,port).sync();
		channel = future.channel();
		if(future.isSuccess())
		{
			MessageContainer cont = new MessageContainer();
			
			Message msg =new Message();
			msg.setMsgType("login");
			
			MessageContent mc = new MessageContent();
			mc.setSrc(loginName);
			msg.setContent(mc);
			
			cont.setContent(NettyClientCache.GSON.toJson(msg));
			
			channel.writeAndFlush(cont);
		}
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

	public void close() {
		eventLoopGroup.shutdownGracefully();
		NettyClientCache.client = null;
	}
	
	
}
