package com.lvxh.plugin.netty.websocket;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLEngine;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.util.NettyUtils;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.ssl.SslHandler;
import io.netty.handler.stream.ChunkedWriteHandler;

public class NettyWebInitializer extends ChannelInitializer<SocketChannel> {

	private static final Logger LOG = Logger.getLogger(NettyWebInitializer.class);
	
	private String file;
	private String pwd;

	public NettyWebInitializer(String file, String pwd) {
		super();
		this.file = file;
		this.pwd = pwd;
	}




	@Override
	protected void initChannel(SocketChannel ch) {
		LOG.debug("initChannel");
		ChannelPipeline pipeline = ch.pipeline();
		
		SSLContext sslContext = NettyUtils.createSSLContext("JKS",file,pwd);
		SSLEngine engine = sslContext.createSSLEngine(); 
		engine.setUseClientMode(false); 
		pipeline.addLast(new SslHandler(engine));
			
		
		// HttpServerCodec: 针对http协议进行编解码
		pipeline.addLast("httpServerCodec", new HttpServerCodec());
		// ChunkedWriteHandler分块写处理，文件过大会将内存撑爆
		pipeline.addLast("chunkedWriteHandler", new ChunkedWriteHandler());
		/**
		 * 作用是将一个Http的消息组装成一个完成的HttpRequest或者HttpResponse，那么具体的是什么 取决于是请求还是响应,
		 * 该Handler必须放在HttpServerCodec后的后面
		 */
		pipeline.addLast("httpObjectAggregator", new HttpObjectAggregator(1024 * 1024));

		// 用于处理websocket, /ws为访问websocket时的uri
		pipeline.addLast("webSocketServerProtocolHandler", new WebSocketServerProtocolHandler("/ws"));

		pipeline.addLast("myWebSocketHandler", new NettyWebHandler());
	}
}