package com.lvxh.plugin.netty.base;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.log4j.Logger;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.NettyUserStatus;
import com.lvxh.plugin.netty.server.NettyServer;
import com.lvxh.plugin.netty.service.NettyService;
import com.lvxh.plugin.netty.thread.CheckSession;
import com.lvxh.plugin.netty.thread.ReceiveSms;
import com.lvxh.plugin.netty.thread.SendMessage;
import com.lvxh.plugin.netty.thread.SendTcpMessage;
import com.lvxh.plugin.netty.util.NettyUtils;
import com.lvxh.plugin.netty.websocket.NettyWebServer;

import io.netty.channel.Channel;
import io.netty.util.AttributeKey;

public class NettyCache {
	private static final Logger LOG = Logger.getLogger(NettyCache.class);
	public static final BlockingQueue<Message> RECEIVER_QUEUE = new LinkedBlockingQueue<Message>(2000);
	public static final BlockingQueue<Message> SEND_MSG_QUEUE = new LinkedBlockingQueue<Message>(2000);
	public static final BlockingQueue<Message> SEND_MSG_TCP_QUEUE = new LinkedBlockingQueue<Message>(2000);
	public static final Map<String, Channel> MAP = new HashMap<String, Channel>();
	public static final List<Channel> LIST = new Vector<Channel>();
	public static NettyService service;
	public static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss")
			.setExclusionStrategies(new ExclusionStrategy() {
				@Override
				public boolean shouldSkipField(FieldAttributes f) {
					return false;
				}

				@Override
				public boolean shouldSkipClass(Class<?> incomingClass) {
					return incomingClass == Channel.class/* || incomingClass == boolean.class */;
				}
			}).create();

	public static AttributeKey<NettyUserStatus> AUTH = AttributeKey.newInstance("authData");
	/**
	 * WEB_SOCKET
	 */
	public static final int WEB_SOCKET = 1;

	/**
	 * TCP_SOCKET
	 */
	public static final int TCP_SOCKET = 0;

	public static void removeListChannel(Channel ch) {
		for (int i = 0; i < LIST.size(); i++) {
			if (LIST.get(i).equals(ch)) {
				LIST.remove(i);
				i--;
			}
		}
	}

	public static void nettyServer(int tcpPort, int webPort, NettyService ser, String file, String pwd) {
		LOG.debug("start init neetty server.");
		NettyUtils.submit(new Runnable() {

			@Override
			public void run() {
				NettyServer server = new NettyServer(tcpPort);
				server.start();
			}
		});
		NettyUtils.submit(new Runnable() {

			@Override
			public void run() {
				NettyWebServer.init(webPort, file, pwd);

			}
		});
		NettyCache.service = ser;
		NettyUtils.submit(new CheckSession());
		NettyUtils.submit(new ReceiveSms());
		NettyUtils.submit(new SendMessage());
		NettyUtils.submit(new SendTcpMessage());

		LOG.debug("init neetty server end.");
	}

	public static NettyService getService() {
		return service;
	}

	public static void nettyServer(int tcpPort, int webPort, NettyService ser) {
		LOG.debug("start init neetty server.");
		NettyUtils.submit(new Runnable() {

			@Override
			public void run() {
				NettyServer server = new NettyServer(tcpPort);
				server.start();
			}
		});
		NettyUtils.submit(new Runnable() {

			@Override
			public void run() {
				NettyWebServer.init(webPort);

			}
		});
		NettyCache.service = ser;
		NettyUtils.submit(new CheckSession());
		NettyUtils.submit(new ReceiveSms());
		NettyUtils.submit(new SendMessage());
		NettyUtils.submit(new SendTcpMessage());

		LOG.debug("init neetty server end.");
	}

	public static void wsToTcp(Message msg) {
		try {
			SEND_MSG_TCP_QUEUE.put(msg);
		} catch (Exception e) {
			LOG.debug(e.getMessage(), e);
		}
	}

}
