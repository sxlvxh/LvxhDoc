package com.huaiye.plugin.plat.custom.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:conf.properties")
public class Config {

	/**
	 * 当前产品编号
	 */
	@Value("${PRODUCT_CODE}")
	public String productCode;

	/**
	 * 当前企业编号
	 */
	@Value("${ENT_CODE}")
	public String entCode;

	/**
	 * 文件服务器地址 接收上传文件的服务地址
	 */
	@Value("${FILES_SERVER_URL}")
	public String filesServerUrl;


	/**
	 * 文件上传鉴权账号
	 */
	@Value("${FILES_SERVER_USER}")
	public String filesServerUser;

	/**
	 * 文件上传鉴权账号密码
	 */
	@Value("${FILES_SERVER_PWD}")
	public String filesServerPwd;

	/**
	 * 文件服务器对外访问路径
	 */
	@Value("${FILES_SERVER_VISIT}")
	public String filesServerVisit;

	/**
	 * 是否显示消息窗口
	 */
	@Value("${HAS_MESSAGE}")
	public boolean hasMessage;

	/**
	 * 是否显示通讯录窗口
	 */
	@Value("${HAS_CONTACT}")
	public boolean hasContact;

	/**
	 * tcp服务内网ip
	 */
	@Value("${TCP_SERVER_INTRANET_IP}")
	public String intranetIp;
	
	/**
	 * tcp服务外网ip
	 */
	@Value("${TCP_SERVER_EXTRANET_IP}")
	public String extranetIp;
	
	
	/**
	 * tcp服务端口
	 */
	@Value("${TCP_SERVER_PORT}")
	public int tcpPort;
	/**
	 * websocket服务端口
	 */
	@Value("${WEB_SOCKET_PORT}")
	public int webSocketPort;
	/**
	 * tcp服务使用账号
	 */
	@Value("${TCP_SERVER_ACCOUNT}")
	public String tcpServerAccount;
	/**
	 * tcp客户端使用账号
	 */
	@Value("${CLIENT_SERVICE_ACCOUNT}")
	public String tcpClientAccount;

	
	@Value("${IS_EXTERNAL_NETWORK}")
	public boolean isExternalNetwork;
	
	@Value("${SIE_GROUP_CODE}")
	public String sieGroupCode;
	
	@Value("${WEB_SERVER_URL}")
	public String webServerUrl;
	
	@Value("${IS_TCP_SERVER}")
	public boolean isTcpServer;
	
	/**
	 * BAIDU_MAP_URL=http://api.map.baidu.com/getscript?v=3.0&ak=ZjPPMyItrNMACFGqpGqBE3kI&services=&t=
#Latitude and longitude of map Center
MAP_CENTER_LAT_LNG=118.75554602,31.97490598
#Default map level
MAP_DEFAULT_LEVEL=14

#Streaming media IP address
SIE_IP=192.168.2.160
#Streaming media port
SIE_PORT=9001
#Streaming media signalling port
SIE_SIGNAL_WEBSOCKET_PORT=12000
#Streaming media stream port
SIE_STREAM_WEBSOCKET_PORT=5080
#Streaming media websocket prefix
SIE_WEBSOCKET_PREFIX=ws

	 */
	
	@Value("${MAP_URL}")
	public String mapUrl;
	
	@Value("${MAP_CENTER_LAT_LNG}")
	public String mapCenterLatLng;
	
	@Value("${MAP_DEFAULT_LEVEL}")
	public int mapDefaultLevel;
	
	@Value("${SIE_IP}")
	public String sieIp;
	
	@Value("${SIE_PORT}")
	public int siePort;
	
	@Value("${WEBRTC_URL}")
	public String webRtcUrl;
	
	@Value("${SIE_STREAM_URL}")
	public String sieStreamUrl;
	
	@Value("${SIE_WEBSOCKET_URL}")
	public String sieWebsocketUrl;
	
	@Value("${UPFILE_WEBSOCKET_URL}")
	public String upFileWebsocketUrl;
	
	
}
