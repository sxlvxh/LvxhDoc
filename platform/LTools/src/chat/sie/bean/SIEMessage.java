package chat.sie.bean;

import io.netty.channel.Channel;

public class SIEMessage extends SIEMsg{
	private Channel channel;
	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

	@Override
	public String toString() {
		return "SIEMessage [getSize()=" + getSize() + ", getMsgType()=" + getMsgType() + ", getMsgSize()="
				+ getMsgSize() + ", getStr()=" + getStr() + ", getSessionID()=" + getSessionID() + ", getClass()="
				+ getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
}
