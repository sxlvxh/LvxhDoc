package chat.netty.client;


import chat.netty.coder.Decoder;
import chat.netty.coder.Encoder;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;

public class NettyClientInitializer extends ChannelInitializer<SocketChannel>{

private NettyClient client;
	
    public NettyClientInitializer(NettyClient client) {
		super();
		this.client = client;
	}

    
    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast(new Encoder());  
        pipeline.addLast(new Decoder());  
        pipeline.addLast(new NettyClientHandler(client));
    }
}
