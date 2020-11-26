package com.lvxh.plugin.netty.util;

import java.io.FileInputStream;
import java.io.InputStream;
import java.security.KeyStore;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;

import org.apache.log4j.Logger;

public class NettyUtils {
	
	private static final Logger LOG = Logger.getLogger(NettyUtils.class);
	private static final ExecutorService EXECUTOR_SERVICE = Executors.newCachedThreadPool();

	
	/**
	 * @param task
	 * @return
	 * @see java.util.concurrent.ExecutorService#submit(java.util.concurrent.Callable)
	 */
	public static <T> Future<T> submit(Callable<T> task) {
		return EXECUTOR_SERVICE.submit(task);
	}

	/**
	 * @param task
	 * @return
	 * @see java.util.concurrent.ExecutorService#submit(java.lang.Runnable)
	 */
	public static Future<?> submit(Runnable task) {
		return EXECUTOR_SERVICE.submit(task);
	}
	
	
	public static SSLContext createSSLContext(String type ,String path ,String password)
	{
	    try {
			KeyStore ks = KeyStore.getInstance(type); /// "JKS"
			InputStream ksInputStream = new FileInputStream(path); /// 证书存放地址
			ks.load(ksInputStream, password.toCharArray());
			//KeyManagerFactory充当基于密钥内容源的密钥管理器的工厂。
			KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());//getDefaultAlgorithm:获取默认的 KeyManagerFactory 算法名称。
			kmf.init(ks, password.toCharArray());
			//SSLContext的实例表示安全套接字协议的实现，它充当用于安全套接字工厂或 SSLEngine 的工厂。
			SSLContext sslContext = SSLContext.getInstance("TLS");
			sslContext.init(kmf.getKeyManagers(), null, null);
			return sslContext;
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
		}
	    return null;
	}
}
