package com.lvxh.plugin.websocket;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.util.Attribute;

/**
 * 处理 web socket 文本消息
 *
 * @author huan.fu
 * @date 2018/11/7 - 17:37
 */
public class TextWebSocketHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {

    private static final Logger log = Logger.getLogger(TextWebSocketHandler.class);

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) {
    	Channel ch = ctx.channel();
		Attribute<BinaryBean> attr = ch.attr(WebSocketServer.BAUTH);
		Gson gson = new Gson();
		BinaryBean status = gson.fromJson(msg.text(), BinaryBean.class);
		status.setStartTime(System.currentTimeMillis());
		status.setRes(1);
		attr.set(status);
		String today = dateToStr(new Date(),"yyyyMMdd");
		String path = WebSocketServer.path +"/userfiles/" + today;
		File file = new File(path);
		if(!file.exists())
		{
			file.mkdirs();
		}
		String paths = path +"/"+ status.getCode() + "_" + status.getName();
		status.setFilePath(paths);
		File ff = new File(paths);
		if(ff.exists())
		{
			status.setSizeX(ff.length());
			status.setRes(3);
		}
        System.out.println("接收到客户端的消息:[{}]"+msg.text());
        ch.writeAndFlush(new TextWebSocketFrame(gson.toJson(status)));
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause){
        ctx.close();
        log.error("服务器发生了异常:", cause);
    }

    @Override
    public void userEventTriggered(ChannelHandlerContext ctx, Object evt){
        if (evt instanceof WebSocketServerProtocolHandler.HandshakeComplete) {
            log.info("web socket 握手成功。");
        } else {
            try {
				super.userEventTriggered(ctx, evt);
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
        }
    }

	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
		super.channelUnregistered(ctx);
		log.info("web socket 已关闭。");
	}
    
	public static String dateToStr(Date date, String format) {

		if (date == null) {
			return "";
		} else {
			SimpleDateFormat sdf = new SimpleDateFormat(format);
			return sdf.format(date);
		}
	}
}
