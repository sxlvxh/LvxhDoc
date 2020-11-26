package com.huaiye.plugin.wsgateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "classpath:conf.properties")
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
	 * webservice消息透传地址
	 */
	@Value("${GATEWAY_WS_URL}")
	public String gatewayWsUrl;

	/**
	 * 流媒体消息透传服务端口号
	 */
	@Value("${SIE_TCP_SERVER_PORT}")
	public int sieTcpServerPort;
	
	   /**
     * 文件存储基准目录
     */
    @Value("${FILE_SAVE_DIR}")
    public String fileSaveDir;
	
}
