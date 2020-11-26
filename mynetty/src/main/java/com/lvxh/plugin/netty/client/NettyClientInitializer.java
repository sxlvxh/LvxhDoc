package com.lvxh.plugin.netty.client;

import com.lvxh.plugin.netty.coder.Decoder;
import com.lvxh.plugin.netty.coder.Encoder;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;

public class NettyClientInitializer extends ChannelInitializer<SocketChannel>{

    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast(new Encoder());  
        pipeline.addLast(new Decoder());  
        pipeline.addLast(new NettyClientHandler());
    }
}
