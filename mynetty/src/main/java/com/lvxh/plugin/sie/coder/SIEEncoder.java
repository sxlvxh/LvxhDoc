package com.lvxh.plugin.sie.coder;

import org.apache.log4j.Logger;

import com.lvxh.plugin.sie.bean.SIEMessage;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.MessageToByteEncoder;

public class SIEEncoder extends MessageToByteEncoder<SIEMessage> {

	private static final Logger LOG = Logger.getLogger(SIEEncoder.class);

	@Override
	protected void encode(ChannelHandlerContext tcx, SIEMessage msg, ByteBuf out) {

		try {
			out.writeInt(msg.getSize());
			out.writeInt(msg.getMsgType());
			out.writeInt(msg.getSessionID());
			out.writeInt(msg.getMsgSize());
			out.writeBytes(msg.getStr().getBytes("UTF-8"));
			
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	}
}