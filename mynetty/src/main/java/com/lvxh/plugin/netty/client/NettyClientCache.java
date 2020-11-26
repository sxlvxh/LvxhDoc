package com.lvxh.plugin.netty.client;

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
import com.lvxh.plugin.netty.base.NettyCache;
import com.lvxh.plugin.netty.bean.Message;
import com.lvxh.plugin.netty.bean.MessageContainer;
import com.lvxh.plugin.netty.bean.MessageContent;
import com.lvxh.plugin.netty.service.NettyService;
import com.lvxh.plugin.netty.util.NettyUtils;

import io.netty.channel.Channel;

public class NettyClientCache {
	private static final Logger LOG = Logger.getLogger(NettyCache.class);
	public static final BlockingQueue<MessageContent> RECEIVER_QUEUE = new LinkedBlockingQueue<MessageContent>(2000);
	public static final BlockingQueue<MessageContent> SEND_MSG_QUEUE = new LinkedBlockingQueue<MessageContent>(2000);
	public static final Map<String, Channel> MAP = new HashMap<String, Channel>();
	public static final List<Channel> LIST = new Vector<Channel>();
	public static NettyClient client = null;
	public static NettyService service = null;
	public static final Gson GSON = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").setExclusionStrategies(new ExclusionStrategy() {  
	    @Override
	    public boolean shouldSkipField(FieldAttributes f) {
	        return false;
	    }

	    @Override
	    public boolean shouldSkipClass(Class<?> incomingClass) {
	        return incomingClass == Channel.class/* || incomingClass == boolean.class*/;
	    }
	}).create();
	static
	{
		NettyUtils.submit(()->{
			new Thread(new SendHeatbeat()).start();
		});
		NettyUtils.submit(()->{
			new Thread(new SendMessage()).start();
		});
		NettyUtils.submit(()->{
			new Thread(new ReceiveSms()).start();
		});
	}
	
	public static void init(String ip,String user,int webPort,NettyService service)
	{
		LOG.info("NettyClientCache  init !");
		NettyClientCache.service = service;
		if(client == null)
		{
			client = new NettyClient(ip,user ,webPort);
		}
	}

	public static void close() {
		if(client == null)
		{
			client.close();
		}
		
	}
	
	public static void main(String[] args) {
		NettyClientCache.init("192.168.2.132", "c91b454168bc4790bc1c515f47b1dd9c", 8088,null);
	}
	
	
    public static MessageContainer getSendMsg(MessageContent content) throws Exception {
		
		Message message = new Message();
		message.setChannelType(0);
		message.setMsgType("forward");
		if(NettyClientCache.client !=null)
		{
			message.setSrc(NettyClientCache.client.getLoginName());
		}
		message.setContent(content);
		MessageContainer msg = new MessageContainer();
		msg.setContent(NettyCache.GSON.toJson(message));
		msg.setLength(msg.getContent().getBytes("UTF-8").length);
		return msg;
	}

	public static void putRecv(MessageContent e) throws InterruptedException {
		RECEIVER_QUEUE.put(e);
	}

	public static MessageContent takeRecv() throws InterruptedException {
		return RECEIVER_QUEUE.take();
	}

	public static void put(MessageContent e) throws InterruptedException {
		SEND_MSG_QUEUE.put(e);
	}

	public static MessageContent take() throws InterruptedException {
		return SEND_MSG_QUEUE.take();
	}
	
	
	
	/*
	 * new Thread(new NettyClientHeartbeanThread()).start(); new Thread(new
	 * NettyClientSendMessageThread()).start(); new Thread(new
	 * NettyClientMessageThread()).start();
	 */
}
