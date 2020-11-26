
package com.lvxh.plugin.netty.server;
 
import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.NettyUserStatus;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.Attribute;
import io.netty.util.ReferenceCountUtil;
public class NettyServerHandler extends ChannelInboundHandlerAdapter {
	
	private static final Logger LOG = Logger.getLogger(NettyServerHandler.class);
	
	@SuppressWarnings("unused")
	private NettyServer server;
	
	public NettyServerHandler(NettyServer server) {
		super();
		this.server = server;
	}

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg){
		try {
			MessageContainer in=(MessageContainer)msg;
			LOG.debug(" channelRead " + msg);
			Message bean = NettyCache.GSON.fromJson(in.getContent(), Message.class);
	        bean.setChannelType(NettyCache.TCP_SOCKET);
	        bean.setChannel(ctx.channel());
	        NettyCache.RECEIVER_QUEUE.put(bean);
	        
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
		System.out.println(1111);
		Channel channel = ctx.channel();
		Attribute<NettyUserStatus> attr = channel.attr(NettyCache.AUTH);
		NettyUserStatus status = new NettyUserStatus();
		status.setTime(System.currentTimeMillis());
		status.setLastMsgTime(System.currentTimeMillis());
		status.setLoginStatus(false);
		status.setChannelType(NettyCache.TCP_SOCKET);
		attr.set(status);
		NettyCache.LIST.add(channel);
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
