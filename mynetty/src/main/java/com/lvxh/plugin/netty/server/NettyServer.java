package com.lvxh.plugin.netty.server;

import java.io.File;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import com.lvxh.plugin.netty.base.NettyCache;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;

public class NettyServer {

	private static final Logger LOG = Logger.getLogger(NettyServer.class);
	private  EventLoopGroup BASE_GROUP = null;
	private  EventLoopGroup WORKER_GROUP = null;
	private  ServerBootstrap BOOTSTRAP = null;
	private int port;

	public NettyServer(int port) {
		this.port = port;
		init();
	}

	public void init() {
		try {
			
			BASE_GROUP = new NioEventLoopGroup();
			WORKER_GROUP = new NioEventLoopGroup();
			BOOTSTRAP = new ServerBootstrap();
			BOOTSTRAP.group(BASE_GROUP, WORKER_GROUP);
			BOOTSTRAP.channel(NioServerSocketChannel.class);
			BOOTSTRAP.childHandler(new NettyServerInitializer(this));
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
		NettyCache.nettyServer(8088, 8089,null);
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
