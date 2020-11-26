package chat.netty.client;

import org.apache.log4j.Logger;

import chat.netty.bean.Message;
import chat.netty.bean.MessageContainer;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.util.ReferenceCountUtil;

public class NettyClientHandler extends SimpleChannelInboundHandler<String> {
	
	private static final Logger LOG = Logger.getLogger(NettyClientHandler.class);
	
	private NettyClient client;
	
    public NettyClientHandler(NettyClient client) {
		super();
		this.client = client;
	}


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
			MessageContainer in=(MessageContainer)msg;
			/*
			 * LOG.debug(ctx.channel().remoteAddress());
			 * LOG.debug(ctx.channel().attr(NettyCache.AUTH).get());
			 */
			//LOG.debug(" channelRead " + msg);
			Message bean = NettyClient.GSON.fromJson(in.getContent(), Message.class);
	        bean.setChannel(ctx.channel());
	        bean.setChannelType(0);
	        client.getRecvQueue().put(bean);
	        if("kickout".equals(bean.getMsgType()))
	        {
	        	client.close();
	        }
	        //System.out.println(bean);
	        /*try{
	        	NettyMsgContent mss  = gson.fromJson(in.getContent(), NettyMsgContent.class);
	        	if("kickout".equals(mss.getMsgType()))
	        	{
	        		NettyCache.getClient().setStatus(1);
	        		//NettyCache.getClient().getEventLoopGroup().shutdownGracefully();
	        	}
	        }catch(Exception e1)
	        {
	        	LOG.error(e1.getMessage(),e1);
	        }*/
		} catch(Exception e){
			LOG.error(e.getMessage(),e);
		}finally {
			ReferenceCountUtil.release(msg);
		}
	}


	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		super.channelRegistered(ctx);
	}


	@Override
	public void channelUnregistered(ChannelHandlerContext ctx){
		try {
			super.channelUnregistered(ctx);
			LOG.error("Your connection has been disconnected " + ctx);
			ctx.close();
			client.getEventLoopGroup().shutdownGracefully();
			Thread.sleep(2000);
			if(client.getStatus() == 0)
			{
				client.init();
			}
		}catch (Exception e) {
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
        //NettyCache.getClient().init();
    }
}
