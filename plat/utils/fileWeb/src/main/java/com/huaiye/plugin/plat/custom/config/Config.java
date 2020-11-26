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
	 * 文件存储位置，磁盘绝对路径
	 */
	@Value("${FILES_SERVER_BASE}")
	public String filesServerBase;


	/**
	 * 文件服务器对外访问路径
	 */
	@Value("${FILES_SERVER_VISIT}")
	public String filesServerVisit;


	/**
	 * 文件服务器对外访问路径
	 */
	@Value("${LIBRE_OFFICE_HOME}")
	public String officeHome;
	
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
	 * websocket服务端口
	 */
	@Value("${UPFILE_SOCKET_PORT}")
	public int upFileSocketPort;
	
	
}
