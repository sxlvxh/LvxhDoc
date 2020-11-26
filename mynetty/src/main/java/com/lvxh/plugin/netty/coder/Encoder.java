package com.lvxh.plugin.netty.coder;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.bean.MessageContainer;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public class Encoder extends MessageToByteEncoder<MessageContainer> {

	private static final Logger LOG = Logger.getLogger(Encoder.class);

	@Override
	protected void encode(ChannelHandlerContext tcx, MessageContainer msg, ByteBuf out) {

		try {
			byte[] content = msg.getContent().getBytes("UTF-8");

			out.writeInt(4 + content.length);

			out.writeBytes(msg.getContent().getBytes("UTF-8"));
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
}