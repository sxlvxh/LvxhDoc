package chat.sie.coder;

import java.util.List;

import org.apache.log4j.Logger;

import chat.sie.bean.SIEMessage;
import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

public class SIEDecoder extends ByteToMessageDecoder {

	private static final Logger LOG = Logger.getLogger(SIEDecoder.class);

	/**
	 * <pre>
	 *  
	 * 表示数据的长度contentLength，int类型，占据4个字节.
	 * </pre>
	 */
	public final int BASE_LENGTH = 4;

	@Override
	protected void decode(ChannelHandlerContext ctx, ByteBuf buffer, List<Object> out) {
		// 可读长度必须大于基本长度
		if (buffer.readableBytes() >= BASE_LENGTH) {
			try {
				// 记录包头开始的index
				int beginReader = buffer.readerIndex();
				buffer.markReaderIndex();

				// 消息的长度
				int length = buffer.readInt();

				// 判断请求数据包数据是否到齐
				if (buffer.readableBytes() < length - 4) {
					// 还原读指针
					buffer.readerIndex(beginReader);
					return;
				}

				int msgType = buffer.readInt();
				int session = buffer.readInt();
				int msgSize = buffer.readInt();

				// 读取data数据
				byte[] data = new byte[msgSize];
				buffer.readBytes(data);

				SIEMessage msg = new SIEMessage();
				msg.setSize(length);
				msg.setMsgType(msgType);
				msg.setMsgSize(msgSize);
				msg.setSessionID(session);

				msg.setStr(new String(data, "UTF-8"));
				out.add(msg);
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			}
		} else {
			return;
		}
	}

}