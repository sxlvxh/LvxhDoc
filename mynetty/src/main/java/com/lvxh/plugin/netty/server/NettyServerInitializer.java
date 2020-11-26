package com.lvxh.plugin.netty.server;

import com.lvxh.plugin.netty.coder.Decoder;
import com.lvxh.plugin.netty.coder.Encoder;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.socket.SocketChannel;

public class NettyServerInitializer extends ChannelInitializer<SocketChannel> {

	private NettyServer server;

	public NettyServerInitializer(NettyServer server) {
		super();
		this.server = server;
	}

	@Override
	public void initChannel(SocketChannel ch) {

		ch.pipeline().addLast(new Encoder());
		ch.pipeline().addLast(new Decoder());
		ch.pipeline().addLast(new NettyServerHandler(this.server));
	}

}
