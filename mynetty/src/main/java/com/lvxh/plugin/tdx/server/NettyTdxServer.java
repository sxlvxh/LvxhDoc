package com.lvxh.plugin.tdx.server;

import java.io.File;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.util.NettyUtils;
import com.lvxh.plugin.netty.websocket.NettyWebServer;

import cn.hylexus.jt808.service.JT808Service;
import cn.hylexus.jt808.service.TestJt808Service;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

public class NettyTdxServer {

	private static final Logger LOG = Logger.getLogger(NettyTdxServer.class);
	private static final EventLoopGroup BASE_GROUP = new NioEventLoopGroup();
	private static final EventLoopGroup WORKER_GROUP = new NioEventLoopGroup();
	private static final ServerBootstrap BOOTSTRAP = new ServerBootstrap();

	private int tcpPort;
	
	private JT808Service service;
	
	public NettyTdxServer() {
		init();
	}
	
	public NettyTdxServer(int port,JT808Service service) {
		this.tcpPort = port;
		this.service = service;
		init();
	}
	

	public void init() {
		try {
			BOOTSTRAP.group(BASE_GROUP, WORKER_GROUP);
			BOOTSTRAP.channel(NioServerSocketChannel.class);
			BOOTSTRAP.childHandler(new NettyTdxServerInitializer(this.service));
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
			ChannelFuture f = BOOTSTRAP.bind(this.tcpPort).sync();
			f.channel().closeFuture().sync();
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}

	public static void main(String[] args) {
		
		final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/rsources/log4j.properties");
		
		NettyUtils.submit(new Runnable() {

			@Override
			public void run() {
				JT808Service service = new  TestJt808Service();
				NettyTdxServer server = new NettyTdxServer(7092,service);
				server.start();
			}
		});

	}

	public int getTcpPort() {
		return tcpPort;
	}

	public void setTcpPort(int tcpPort) {
		this.tcpPort = tcpPort;
	}

	public static EventLoopGroup getBaseGroup() {
		return BASE_GROUP;
	}

	public static EventLoopGroup getWorkerGroup() {
		return WORKER_GROUP;
	}

	public static ServerBootstrap getBootstrap() {
		return BOOTSTRAP;
	}

}
