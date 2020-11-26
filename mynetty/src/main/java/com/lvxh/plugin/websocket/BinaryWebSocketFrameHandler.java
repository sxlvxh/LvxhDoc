package com.lvxh.plugin.websocket;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.BinaryWebSocketFrame;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;

/**
 * 处理二进制消息
 *
 * @author huan.fu
 * @date 2018/11/8 - 14:37
 */
public class BinaryWebSocketFrameHandler extends SimpleChannelInboundHandler<BinaryWebSocketFrame> {
	private static final Logger log = Logger.getLogger(BinaryWebSocketFrameHandler.class);

	@Override
	protected void channelRead0(ChannelHandlerContext ctx, BinaryWebSocketFrame msg) {
		Channel c = ctx.channel();
		BinaryBean status = c.attr(WebSocketServer.BAUTH).get();
		Gson gson = new Gson();
		OutputStream out = null;
		InputStream is = null;
		try {
			byte[] req = new byte[msg.content().readableBytes()];
			msg.content().readBytes(req);
			out = new FileOutputStream(status.getFilePath(), true);
			is = new ByteArrayInputStream(req);
			byte[] buff = new byte[1024];
			int len = 0;
			while ((len = is.read(buff)) != -1) {
				out.write(buff, 0, len);
			}
			out.flush();
			out.close();
			if("file".equals(status.getType()))
			{
				File ff = new File(status.getFilePath());
				if (ff.length() >= status.getSize()) {
					status.setRes(2);
					status.setEndTime(System.currentTimeMillis());
					status.setRatio(100);
					c.writeAndFlush(new TextWebSocketFrame(gson.toJson(status)));
					
					if(WebSocketServer.service !=null)
					{
						WebSocketServer.service.excutor(status);
					}
				} else {
					status.setRes(1);
					status.setRatio((int) (ff.length() * 1.0 / status.getSize() * 100));
					c.writeAndFlush(new TextWebSocketFrame(gson.toJson(status)));
				}
			}

		} catch (Exception e) {
			log.error(e.getMessage(), e);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					log.error(e.getMessage(), e);
				}
			}
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					log.error(e.getMessage(), e);
				}
			}
		}
	}
}
