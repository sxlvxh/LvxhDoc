package com.lvxh.plugin.netty.websocket;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.NettyUserStatus;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.Attribute;

public class NettyWebHandler extends SimpleChannelInboundHandler<TextWebSocketFrame>{

	private static final Logger LOG = Logger.getLogger(NettyWebHandler.class);
	
    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg){
        LOG.debug(msg.text());
    	try {
			Message bean =  NettyCache.GSON.fromJson(msg.text(), Message.class);
			bean.setChannel(ctx.channel());
			bean.setChannelType(NettyCache.WEB_SOCKET);
			NettyCache.RECEIVER_QUEUE.put(bean);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
        
       // ReferenceCountUtil.release(msg);
    }
    
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        LOG.debug("ChannelId" + ctx.channel().id().asLongText());
    }
    
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        LOG.debug("用户下线: " + ctx.channel().id().asLongText());
        Channel c = ctx.channel();
        NettyUserStatus status = c.attr(NettyCache.AUTH).get();
        status.setLoginStatus(false);
    }
    
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        ctx.channel().close();
    }

	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		super.channelRegistered(ctx);
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		super.channelActive(ctx);
		Channel ch = ctx.channel();
		Attribute<NettyUserStatus> attr = ch.attr(NettyCache.AUTH);
		NettyUserStatus status = new NettyUserStatus();
		status.setTime(System.currentTimeMillis());
		status.setLastMsgTime(System.currentTimeMillis());
		status.setLoginStatus(false);
		status.setChannelType(NettyCache.WEB_SOCKET);
		attr.set(status);
		NettyCache.LIST.add(ctx.channel());
	}
    
    
}