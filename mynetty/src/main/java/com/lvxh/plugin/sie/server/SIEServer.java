package com.lvxh.plugin.sie.server;

import java.io.File;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.lvxh.plugin.netty.util.NettyUtils;
import com.lvxh.plugin.sie.service.SIEService;
import com.lvxh.plugin.sie.service.SIEServiceImpl;
import com.lvxh.plugin.sie.thread.SIECheckSession;
import com.lvxh.plugin.sie.thread.SIEReceiveSms;
import com.lvxh.plugin.sie.thread.SIESendMessageToTcp;
import com.lvxh.plugin.sie.thread.SIESendMessageToWs;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

public class SIEServer {

	private static final Logger LOG = Logger.getLogger(SIEServer.class);
	private  EventLoopGroup BASE_GROUP = null;
	private  EventLoopGroup WORKER_GROUP = null;
	private  ServerBootstrap BOOTSTRAP = null;
	private int port;

	public void setService(SIEService service) {
		NettyUtils.submit(new SIECheckSession());
		NettyUtils.submit(new SIEReceiveSms());
		NettyUtils.submit(new SIESendMessageToTcp());
		NettyUtils.submit(new SIESendMessageToWs(service));
	}
	public SIEServer() {
		
	}
	public void init() {
		try {
			
			BASE_GROUP = new NioEventLoopGroup();
			WORKER_GROUP = new NioEventLoopGroup();
			BOOTSTRAP = new ServerBootstrap();
			BOOTSTRAP.group(BASE_GROUP, WORKER_GROUP);
			BOOTSTRAP.channel(NioServerSocketChannel.class);
			BOOTSTRAP.childHandler(new SIEServerInitializer(this));
			BOOTSTRAP.option(ChannelOption.SO_BACKLOG, 1024);
			BOOTSTRAP.childOption(ChannelOption.SO_KEEPALIVE, true);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	public void close() {
		BASE_GROUP.shutdownGracefully();
		WORKER_GROUP.shutdownGracefully();
	}

	public void start() {
		try {
			ChannelFuture f = BOOTSTRAP.bind(this.port).sync();
			f.channel().closeFuture().sync();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	public static void main(String[] args) {
		final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/rsources/log4j.properties");
		SIECache.start(9999,new SIEServiceImpl());
	}
	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public  EventLoopGroup getBaseGroup() {
		return BASE_GROUP;
	}

	public  EventLoopGroup getWorkerGroup() {
		return WORKER_GROUP;
	}

	public  ServerBootstrap getBootstrap() {
		return BOOTSTRAP;
	}
	
}
