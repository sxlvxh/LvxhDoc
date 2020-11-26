package com.lvxh.plugin.tdx.server;

import cn.hylexus.jt808.service.JT808Service;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.socket.SocketChannel;

public class NettyTdxServerInitializer extends ChannelInitializer<SocketChannel> {

	private JT808Service service;
	
	public NettyTdxServerInitializer(JT808Service service) {
		super();
		this.service = service;
	}


	@Override
	public void initChannel(SocketChannel ch) {

		ch.pipeline().addLast(new NettyTdxMessageEncoder());
		ch.pipeline().addLast(new NettyTdxMessageDecoder());
		ch.pipeline().addLast(new NettyTdxServerHandler(service));
	}

}
