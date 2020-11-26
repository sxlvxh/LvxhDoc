
package com.lvxh.plugin.sie.server;
 
import org.apache.log4j.Logger;

import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.bean.SIEUserStatus;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.Attribute;
import io.netty.util.ReferenceCountUtil;
public class SIEServerHandler extends ChannelInboundHandlerAdapter {
	
	private static final Logger LOG = Logger.getLogger(SIEServerHandler.class);
	
	public SIEServerHandler(SIEServer server) {
		super();
	}

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg){
		try {
			SIEMessage in=(SIEMessage)msg;
			in.setChannel(ctx.channel());
			LOG.debug(" channelRead " + msg);
	        SIECache.RECEIVER_QUEUE.put(in);
	        
		} catch(Exception e){
			LOG.error(e.getMessage(),e);
		}finally {
			ReferenceCountUtil.release(msg);
		}
	}
	
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		cause.printStackTrace();
		ctx.close();
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		super.channelActive(ctx);
		Channel channel = ctx.channel();
		Attribute<SIEUserStatus> attr = channel.attr(SIECache.AUTH);
		SIEUserStatus status = new SIEUserStatus();
		status.setTime(System.currentTimeMillis());
		status.setLastMsgTime(System.currentTimeMillis());
		status.setLoginStatus(false);
		status.setChannelType(1);
		attr.set(status);		
		SIECache.list.add(channel);
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelInactive");
		super.channelInactive(ctx);
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		//LOG.debug("channelReadComplete");
		super.channelReadComplete(ctx);
	}

	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelRegistered");
		super.channelRegistered(ctx);
	}

	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelUnregistered");
		super.channelUnregistered(ctx);
	}

	@Override
	public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelWritabilityChanged");
		super.channelWritabilityChanged(ctx);
	}

	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
		LOG.debug("userEventTriggered");
		super.userEventTriggered(ctx, evt);
	}
	
	
}
