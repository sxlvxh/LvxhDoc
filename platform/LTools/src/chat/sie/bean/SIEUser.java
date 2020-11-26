package chat.sie.bean;

import io.netty.channel.Channel;

public class SIEUser {
	private SIEUserStatus user;
	private Channel channel;

	public SIEUserStatus getUser() {
		return user;
	}

	public void setUser(SIEUserStatus user) {
		this.user = user;
	}

	public Channel getChannel() {
		return channel;
	}

	public void setChannel(Channel channel) {
		this.channel = channel;
	}

}
