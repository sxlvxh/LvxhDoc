package cn.hylexus.jt808.service.codec;

import java.util.List;

import org.apache.log4j.Logger;

import cn.hylexus.jt808.util.HexStringUtils;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

/**
 * 该解码器只是为了自己日志所用,没其他作用.<br>
 * 最终删除
 * 
 * @author hylexus
 *
 */
public class Decoder4LoggingOnly extends ByteToMessageDecoder {

	private static Logger LOG = Logger.getLogger(Decoder4LoggingOnly.class);

	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf in, List<Object> out) throws Exception {
		String hex = buf2Str(in);
		//LOG.debug("ip={},hex = {}"+ ctx.channel().remoteAddress()+ hex);		

		ByteBuf buf = Unpooled.buffer();
		while (in.isReadable()) {
			buf.writeByte(in.readByte());
		}
		out.add(buf);
	}

	private String buf2Str(ByteBuf in) {
		byte[] dst = new byte[in.readableBytes()];
		in.getBytes(0, dst);
		return HexStringUtils.toHexString(dst);
	}
}
