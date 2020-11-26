package com.lvxh.plugin.tdx.server;

import org.apache.log4j.Logger;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public class NettyTdxMessageEncoder extends MessageToByteEncoder<String> {

	private static final Logger LOG = Logger.getLogger(NettyTdxMessageEncoder.class);

	@Override
	protected void encode(ChannelHandlerContext tcx, String msg, ByteBuf out) {

		try {
			out.writeBytes(("#"+msg+"#").getBytes("UTF-8"));
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
}