package cn.hylexus.jt808.server;

import java.io.File;
import java.util.concurrent.TimeUnit;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import cn.hylexus.jt808.common.TPMSConsts;
import cn.hylexus.jt808.service.JT808Service;
import cn.hylexus.jt808.service.TestJt808Service;
import cn.hylexus.jt808.service.codec.Decoder4LoggingOnly;
import cn.hylexus.jt808.service.handler.TCPServerHandler;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.DelimiterBasedFrameDecoder;
import io.netty.handler.timeout.IdleStateHandler;
import io.netty.util.concurrent.Future;

public class JT808Server {

	private static Logger LOG = Logger.getLogger(JT808Server.class);
	private volatile boolean isRunning = false;

	private EventLoopGroup bossGroup = null;
	private EventLoopGroup workerGroup = null;
	private int port;
	private JT808Service service;

	public JT808Server() {
	}

	public JT808Server(int port,JT808Service service) {
		this();
		this.port = port;
		this.service = service;
	}

	private void bind() throws Exception {
		this.bossGroup = new NioEventLoopGroup();
		this.workerGroup = new NioEventLoopGroup();
		ServerBootstrap serverBootstrap = new ServerBootstrap();
		serverBootstrap.group(bossGroup, workerGroup)//
				.channel(NioServerSocketChannel.class) //
				.childHandler(new ChannelInitializer<SocketChannel>() { //
					@Override
					public void initChannel(SocketChannel ch) throws Exception {
						ch.pipeline().addLast("idleStateHandler",
								new IdleStateHandler(TPMSConsts.tcp_client_idle_minutes, 0, 0, TimeUnit.MINUTES));
						ch.pipeline().addLast(new Decoder4LoggingOnly());
						// 1024表示单条消息的最大长度，解码器在查找分隔符的时候，达到该长度还没找到的话会抛异常
						ch.pipeline().addLast(
								new DelimiterBasedFrameDecoder(1024, Unpooled.copiedBuffer(new byte[] { 0x7e }),
										Unpooled.copiedBuffer(new byte[] { 0x7e, 0x7e })));
						// ch.pipeline().addLast(new PackageDataDecoder());
						ch.pipeline().addLast(new TCPServerHandler(service));
					}
				}).option(ChannelOption.SO_BACKLOG, 128) //
				.childOption(ChannelOption.SO_KEEPALIVE, true);

		LOG.info("TCP服务启动完毕,port= " + this.port);
		ChannelFuture channelFuture = serverBootstrap.bind(port).sync();

		channelFuture.channel().closeFuture().sync();
	}

	public synchronized void startServer() {
		if (this.isRunning) {
			throw new IllegalStateException(this.getName() + " is already started .");
		}
		this.isRunning = true;

		new Thread(() -> {
			try {
				this.bind();
			} catch (Exception e) {
				LOG.error("TCP服务启动出错:"+ e.getMessage());
			}
		}, this.getName()).start();
	}

	public synchronized void stopServer() {
		if (!this.isRunning) {
			throw new IllegalStateException(this.getName() + " is not yet started .");
		}
		this.isRunning = false;

		try {
			Future<?> future = this.workerGroup.shutdownGracefully().await();
			if (!future.isSuccess()) {
				LOG.error("workerGroup 无法正常停止:{}", future.cause());
			}

			future = this.bossGroup.shutdownGracefully().await();
			if (!future.isSuccess()) {
				LOG.error("bossGroup 无法正常停止:{}", future.cause());
			}
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		LOG.error("TCP服务已经停止...");
	}

	private String getName() {
		return "TCP-Server";
	}

	public static void main(String[] args) throws Exception {
		final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/rsources/log4j.properties");
		JT808Service service = new  TestJt808Service();
		JT808Server server = new JT808Server(20048,service);
		server.startServer();

		// Thread.sleep(3000);
		// server.stopServer();
	}
}