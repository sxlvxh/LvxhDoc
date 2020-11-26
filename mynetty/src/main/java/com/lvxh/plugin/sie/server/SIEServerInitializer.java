package com.lvxh.plugin.sie.server;

import com.lvxh.plugin.sie.coder.SIEDecoder;
import com.lvxh.plugin.sie.coder.SIEEncoder;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.socket.SocketChannel;

public class SIEServerInitializer extends ChannelInitializer<SocketChannel> {

	private SIEServer server;

	public SIEServerInitializer(SIEServer server) {
		super();
		this.server = server;
	}

	@Override
	public void initChannel(SocketChannel ch) {

		ch.pipeline().addLast(new SIEEncoder());
		ch.pipeline().addLast(new SIEDecoder());
		ch.pipeline().addLast(new SIEServerHandler(this.server));
	}

}
