package com.lvxh.plugin.sie.server;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.apache.log4j.Logger;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.lvxh.plugin.sie.bean.SIEMessage;
import com.lvxh.plugin.sie.bean.SIEMsgContent;
import com.lvxh.plugin.sie.bean.SIEMsgResp;
import com.lvxh.plugin.sie.bean.SIEUserStatus;
import com.lvxh.plugin.sie.service.SIEService;

import io.netty.channel.Channel;
import io.netty.util.AttributeKey;

public class SIECache {
	private static final Logger LOG = Logger.getLogger(SIECache.class);
	private static SIEServer server = new SIEServer();
	public static final BlockingQueue<SIEMessage> RECEIVER_QUEUE = new LinkedBlockingQueue<SIEMessage>(2000);
	public static final BlockingQueue<SIEMessage> SEND_MSG_WS_QUEUE = new LinkedBlockingQueue<SIEMessage>(2000);
	public static final BlockingQueue<SIEMessage> SEND_MSG_TCP_QUEUE = new LinkedBlockingQueue<SIEMessage>(2000);
	public static AttributeKey<SIEUserStatus> AUTH = AttributeKey.newInstance("sieData");
	public static String SUCCESS = "success";
	public static final Map<String, Channel> map = new HashMap<String, Channel>();
	public static final List<Channel> list = new ArrayList<Channel>();
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

	public static void start(int port, SIEService service) {
		server.setPort(port);
		server.setService(service);
		server.init();
		server.start();
	}

	public static void success(final SIEMessage bean, Channel ch, int msgType) {
		try {
			int code = 0;
			recv(bean, ch, msgType, code);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	public static void failed(final SIEMessage bean, Channel ch, int msgType) {
		try {
			int code = 1;
			recv(bean, ch, msgType, code);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}

	public static void sendSms(SIEMessage bean) {
		try {
			SIEMsgContent con = SIECache.GSON.fromJson(bean.getStr(), SIEMsgContent.class);
			Channel oldCh = SIECache.map.get(con.getStrDstDomainCode());
			if (oldCh != null) {
				bean.setChannel(oldCh);
			}
			SEND_MSG_TCP_QUEUE.put(bean);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}

	}
	
	private static void recv(final SIEMessage bean, Channel ch, int msgType, int code)
			throws UnsupportedEncodingException {
		SIEUserStatus status = ch.attr(SIECache.AUTH).get();
		if(status.isLoginStatus())
		{
			status.setLastMsgTime(System.currentTimeMillis());
		}

		SIEMessage _resp = new SIEMessage();
		_resp.setSessionID(bean.getSessionID());

		SIEMsgResp resp = new SIEMsgResp();
		resp.setnResultCode(code);
		resp.setStrResultDescribe(SIECache.SUCCESS);
		_resp.setStr(SIECache.GSON.toJson(resp));

		_resp.setMsgType(msgType);
		_resp.setMsgSize(_resp.getStr().getBytes("UTF-8").length);
		_resp.setSize(16 + _resp.getMsgSize());
		ch.writeAndFlush(_resp);
	}
}
