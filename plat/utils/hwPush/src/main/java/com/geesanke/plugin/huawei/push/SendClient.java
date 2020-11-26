package com.geesanke.plugin.huawei.push;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.geesanke.plugin.huawei.push.api.HuaweiOauth2ApiService;
import com.geesanke.plugin.huawei.push.api.HuaweiOauth2ApiService.AccessToken;
import com.geesanke.plugin.huawei.push.api.HuaweiPushApiService;
import com.geesanke.plugin.huawei.push.api.HuaweiPushApiService.NspCtx;
import com.geesanke.plugin.huawei.push.api.HuaweiPushApiService.PushSendRequest;
import com.geesanke.plugin.huawei.push.model.Ext;
import com.geesanke.plugin.huawei.push.model.Message;
import com.geesanke.plugin.huawei.push.model.Payload;
import com.geesanke.plugin.huawei.push.model.PushPayload;
import com.geesanke.plugin.huawei.push.model.Result;
import com.geesanke.plugin.huawei.push.model.enums.ActionType;
import com.geesanke.plugin.huawei.push.model.enums.MessageType;
import com.geesanke.plugin.huawei.push.util.CommonUtils;
import com.geesanke.plugin.huawei.push.util.Object2Map;
import com.geesanke.plugin.huawei.push.util.json.JsonUtils;
import com.huaiye.plugin.plat.bean.Android;
import com.huaiye.plugin.plat.bean.Click_action;
import com.huaiye.plugin.plat.bean.HWMessage;
import com.huaiye.plugin.plat.bean.Notification;
import com.huaiye.plugin.plat.bean.Notification2;
import com.sun.javafx.binding.StringFormatter;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class SendClient {

	private static final Log logger = LogFactory.get();

	private String clientSecret;

	private String clientId;

	private Token token;
	
	private static final String PUSH_URL = "https://push-api.cloud.huawei.com/v1/%s/messages:send";

	public SendClient(String clientSecret, String clientId) {
		this.clientSecret = clientSecret;
		this.clientId = clientId;
	}

	public Result push(String[] targets, Payload payload) {

		this.getAccessToken();
		PushPayload pushPayload = PushPayload.newInstance().addAccessToken(this.token.getToken())
				.addDeviceTokenList(targets).addPayload(payload).build();

		Map<String, String> params = Object2Map.obj2StringMap(pushPayload);
		StringBuilder builder = new StringBuilder();
		for (String key : params.keySet()) {

			builder.append(key).append("=").append(params.get(key)).append("&");

		}

		logger.info("\r\n " + builder.toString());

		PushSendRequest request = PushSendRequest.newInstance()
				.addNspCtx(NspCtx.newInstance().addAppId(this.clientId).build()).addPushPayload(pushPayload).build();

		// 推送
		HuaweiPushApiService.pushSend(request);

		return null;
	}
	
	public Result pushMsg(HWMessage msg) {

		try {
			this.getAccessToken();
			
			OkHttpClient client = new OkHttpClient();

			String url = String.format(PUSH_URL, clientId);
			Request.Builder requestBuilder = new Request.Builder()
			                            .url(url).addHeader("Content-Type","application/json;charset=UTF-8");
			requestBuilder.addHeader("Authorization", "Bearer " + token.getToken());
			RequestBody body = RequestBody.create(MediaType.parse("application/json;charset=utf-8"), JsonUtils.gsonDate.toJson(msg));
			Request request = requestBuilder.post(body).build();
			logger.info("\r\n访问路径：" + url + "；request参数：" + JsonUtils.to(request));
			Response response = client.newCall(request).execute();
			if (!response.isSuccessful()) {
			    throw new IOException("Unexpected code " + response);
			}
			String resopnseStr = response.body().string();
			logger.info("\r\n访问路径：" + url + "；返回参数：" + resopnseStr);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        //return resopnseStr;
		
		/*PushPayload pushPayload = PushPayload.newInstance().addAccessToken(this.token.getToken())
				.addDeviceTokenList(targets).addPayload(payload).build();

		Map<String, String> params = Object2Map.obj2StringMap(pushPayload);
		StringBuilder builder = new StringBuilder();
		for (String key : params.keySet()) {

			builder.append(key).append("=").append(params.get(key)).append("&");

		}

		logger.info("\r\n " + builder.toString());

		PushSendRequest request = PushSendRequest.newInstance()
				.addNspCtx(NspCtx.newInstance().addAppId(this.clientId).build()).addPushPayload(pushPayload).build();

		// 推送
		HuaweiPushApiService.pushSend(request);*/

		return null;
	}

	public static void main(String[] args) {
		SendClient sender = new SendClient("fea4ea1131111c1c52aaf0fc396f1ed7e39663dda8d9b2b202c9c49479cb731c", "102134575");
		Map<String, String> map = new HashMap<String, String>();
		/*Payload payload = Payload.newInstance()
				.addMsg(Message.newInstance().addType(MessageType.NOTIFICATION).addBody("111测试推送content", "222测试推送title")
						.addAction(ActionType.APP, "").build())
				.addExt(Ext.newInstance().addCustomize(map).build()).build();*/
		HWMessage msg = new HWMessage();
		
	     Notification2 notification2 = new Notification2();
	     notification2.setBody("message title1");
	     notification2.setTitle("message title");
	     
	     Notification notification = new Notification();
	     Click_action click = new Click_action();
	     click.setIntent("intent://com.huaiye.message/deeplink?#Intent;scheme=pushscheme;launchFlags=0x4000000;i.age=180;S.name=abc;end");
	     click.setType(1);
	     notification.setClick_action(click);
	     
	     Android android = new Android();
	     android.setData("");
	     android.setNotification(notification);
	     
	     List<String> token = new ArrayList<String>();
	     token.add("AHUvrB6MgdX8VYxGnXFg-bWGGQVp179MDwzyWrQimY6yrzkcRwkSMc5TA1PeUtwP1B3BPCecLdCIigiGqLDdg27K_JKqBFYwsY85JRxKu0wCu-21-JAmVQU9PGm2wAY2qg");
		
		com.huaiye.plugin.plat.bean.Message _msg = new com.huaiye.plugin.plat.bean.Message();
		_msg.setAndroid(android);
		_msg.setData("");
		_msg.setNotification(notification2);
		_msg.setToken(token);
		
        msg.setMessage(_msg);
		sender.pushMsg(msg);
	}

	public void getAccessToken() {

		if (CommonUtils.isEmpty(this.token) || isExpired()) {
			AccessToken accessToken = HuaweiOauth2ApiService.getAccessToken(this.clientId, this.clientSecret);
			this.token = new Token(accessToken, System.currentTimeMillis() / 100);
		}

	}

	public boolean isExpired() {
		long now = System.currentTimeMillis() / 100;

		// 过期时间
		long expiredTime = this.token.getGetTime() + this.token.getAccessToken().getExpiresIn() - 600L;

		if (expiredTime >= now) {
			return true;
		}
		return false;
	}

	public static class Token {
		private AccessToken accessToken;
		// 获取时间
		private long getTime;

		public String getToken() {
			return this.accessToken.getAccessToken();
		}

		public Token(AccessToken accessToken, long getTime) {
			this.accessToken = accessToken;
			this.getTime = getTime;
		}

		public AccessToken getAccessToken() {
			return accessToken;
		}

		public void setAccessToken(AccessToken accessToken) {
			this.accessToken = accessToken;
		}

		public long getGetTime() {
			return getTime;
		}

		public void setGetTime(long getTime) {
			this.getTime = getTime;
		}

	}

	public String getClientSecret() {
		return clientSecret;
	}

	public void setClientSecret(String clientSecret) {
		this.clientSecret = clientSecret;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public Token getToken() {
		return token;
	}

	public void setToken(Token token) {
		this.token = token;
	}

}
