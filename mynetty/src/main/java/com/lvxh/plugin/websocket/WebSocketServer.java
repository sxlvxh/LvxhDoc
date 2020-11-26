package com.lvxh.plugin.websocket;

import java.io.File;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketFrameAggregator;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.codec.http.websocketx.extensions.compression.WebSocketServerCompressionHandler;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.util.AttributeKey;

/**
 * netty 整合 websocket
 *
 * @author huan.fu
 * @date 2018/11/7 - 17:25
 */
public class WebSocketServer {

	private static final Logger log = Logger.getLogger(WebSocketServer.class);
	
	public static AttributeKey<BinaryBean> BAUTH = AttributeKey.newInstance("filesData");
	
	public static String path = "d:/";
	
	public static int port = 9898;
	
	public static NettyBinaryService service = null;
	
    public static void main(String[] args){
    	final String filePath = new File("").getAbsolutePath();
		PropertyConfigurator.configure(filePath + "/rsources/log4j.properties");
		
    	init("d:/",9898,null);
    }
    
    public static void init(String path,int port,NettyBinaryService service)
    {
    	WebSocketServer.path = path;
    	WebSocketServer.port = port;
    	WebSocketServer.service = service;
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        EventLoopGroup workGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap bootstrap = new ServerBootstrap();
            bootstrap.group(bossGroup, workGroup)
                    .option(ChannelOption.SO_BACKLOG, 128)
                    .childOption(ChannelOption.TCP_NODELAY, true)
                    .childOption(ChannelOption.SO_KEEPALIVE, true)
                    .handler(new LoggingHandler(LogLevel.TRACE))
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new ChannelInitializer<SocketChannel>() {
                        @Override
                        protected void initChannel(SocketChannel ch) throws Exception {
                            ch.pipeline()
                                    .addLast(new LoggingHandler(LogLevel.TRACE))
                                    // HttpRequestDecoder和HttpResponseEncoder的一个组合，针对http协议进行编解码
                                    .addLast(new HttpServerCodec())
                                    // 分块向客户端写数据，防止发送大文件时导致内存溢出， channel.write(new ChunkedFile(new File("bigFile.mkv")))
                                    .addLast(new ChunkedWriteHandler())
                                    // 将HttpMessage和HttpContents聚合到一个完成的 FullHttpRequest或FullHttpResponse中,具体是FullHttpRequest对象还是FullHttpResponse对象取决于是请求还是响应
                                    // 需要放到HttpServerCodec这个处理器后面
                                    .addLast(new HttpObjectAggregator(10240))
                                    // webSocket 数据压缩扩展，当添加这个的时候WebSocketServerProtocolHandler的第三个参数需要设置成true
                                    .addLast(new WebSocketServerCompressionHandler())
                                    // 聚合 websocket 的数据帧，因为客户端可能分段向服务器端发送数据
                                    // https://github.com/netty/netty/issues/1112 https://github.com/netty/netty/pull/1207
                                    .addLast(new WebSocketFrameAggregator(10 * 1024 * 1024))
                                    // 服务器端向外暴露的 web socket 端点，当客户端传递比较大的对象时，maxFrameSize参数的值需要调大
                                    .addLast(new WebSocketServerProtocolHandler("/upload", null, true, 10485760))
                                    // 自定义处理器 - 处理 web socket 文本消息
                                    .addLast(new TextWebSocketHandler())
                                    // 自定义处理器 - 处理 web socket 二进制消息
                                    .addLast(new BinaryWebSocketFrameHandler());
                        }
                    });
            ChannelFuture channelFuture = bootstrap.bind(WebSocketServer.port).sync();
            channelFuture.channel().closeFuture().sync();
        }catch(Exception e) {
        	log.error(e.getMessage(), e);
        } finally {
            bossGroup.shutdownGracefully();
            workGroup.shutdownGracefully();
        }
    
    }
}
