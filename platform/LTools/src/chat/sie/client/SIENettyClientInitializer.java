package chat.sie.client;


import chat.sie.coder.SIEDecoder;
import chat.sie.coder.SIEEncoder;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;

public class SIENettyClientInitializer extends ChannelInitializer<SocketChannel>{

private SIENettyClient client;
	
    public SIENettyClientInitializer(SIENettyClient client) {
		super();
		this.client = client;
	}

    
    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        pipeline.addLast(new SIEEncoder());  
        pipeline.addLast(new SIEDecoder());  
        pipeline.addLast(new SIENettyClientHandler(client));
    }
}
