package com.lvxh.plugin.netty.client;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.MessageContent;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.util.ReferenceCountUtil;

public class NettyClientHandler extends SimpleChannelInboundHandler<String> {

	private static final Logger LOG = Logger.getLogger(NettyClientHandler.class);

	@Override
	protected void channelRead0(ChannelHandlerContext ctx, String msg) throws Exception {
		LOG.debug("1111111" + msg);
	}

	@Override
	public boolean acceptInboundMessage(Object msg) throws Exception {
		return super.acceptInboundMessage(msg);
	}

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
		try {

			MessageContainer in = (MessageContainer) msg;
			LOG.debug(" channelRead " + msg);
			Message bean = NettyCache.GSON.fromJson(in.getContent(), Message.class);
			bean.setChannelType(NettyCache.TCP_SOCKET);
			bean.setChannel(ctx.channel());

			//System.out.println(msg);
			/*
			 * NettyMessage in=(NettyMessage)msg;
			 * 
			 * LOG.debug(ctx.channel().remoteAddress());
			 * LOG.debug(ctx.channel().attr(NettyCache.AUTH).get());
			 * 
			 * //LOG.debug(" channelRead " + msg); NettyMsgBean bean = new NettyMsgBean();
			 * bean.setChannel(ctx.channel()); bean.setChannelType(NettyCache.TCP_SOCKET);
			 * bean.setContent(in.getContent()); NettyCache.putClientMsgReq(bean); Gson gson
			 * = new Gson();
			 */

			try {
				if ("kickout".equals(bean.getMsgType())) {
					NettyClientCache.close();
					
					MessageContent cont = new MessageContent();
					cont.setMsgType(bean.getMsgType());
					
					NettyClientCache.putRecv(cont);
					
					//NettyCache.getClient().setStatus(1);
					// NettyCache.getClient().getEventLoopGroup().shutdownGracefully();
				}else
				{
					NettyClientCache.putRecv(bean.getContent());
				}
			} catch (Exception e1) {
				LOG.error(e1.getMessage(), e1);
			}
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		} finally {
			ReferenceCountUtil.release(msg);
		}
	}

	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		super.channelRegistered(ctx);
	}

	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) {
		try {
			super.channelUnregistered(ctx);
			LOG.error("Your connection has been disconnected " + ctx);
			ctx.close();
			Thread.sleep(2000);
			if (NettyClientCache.client != null) {
				NettyClientCache.client.conn();
			}
		} catch (Exception e) {
			LOG.error(e.getMessage());
		}

	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		super.channelActive(ctx);
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		super.channelInactive(ctx);
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		super.channelReadComplete(ctx);
	}

	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
		super.userEventTriggered(ctx, evt);
	}

	@Override
	public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
		super.channelWritabilityChanged(ctx);
	}

	@Override
	public boolean isSharable() {
		return super.isSharable();
	}

	@Override
	public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
		super.handlerAdded(ctx);
	}

	@Override
	public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
		// TODO Auto-generated method stub
		super.handlerRemoved(ctx);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
		LOG.error(cause.getMessage(), cause);
		ctx.close();
		// NettyCache.getClient().init();
	}
}
