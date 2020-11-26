/*
 * .SpringUtils.java
 * Copyright 2014 Huaiye Tech. Co. Ltd. All Rights Reserved.
 */
package com.lvxh.plugin.platform.utils;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * . Spring工具类
 * 
 * @author luweijun
 * @since V100R001C02
 * @version V100R001C02
 */
@Component
public class SpringUtils implements ApplicationContextAware {

	/**
	 * .Spring应用上下文环境
	 */
	private static ApplicationContext applicationContext;

	/**
	 * @return ApplicationContext
	 */
	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	/**
	 * 根据bean类型 从ApplicationContext获取实例
	 * 
	 * @param clazz
	 *            bean类型
	 * @return bean对象
	 */
	public static <T> T getBean(Class<T> clazz) {
		return getApplicationContext().getBean(clazz);
	}

	/**
	 * 根据bean名称 从ApplicationContext获取实例
	 * 
	 * @param name
	 *            bean名称
	 * @return bean对象
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) {
		return (T) getApplicationContext().getBean(name);
	}

	/**
	 * 实现ApplicationContextAware接口的回调方法，设置上下文环境
	 * 
	 * @param applicationContext
	 */
	public void setApplicationContext(ApplicationContext applicationContext) {
		SpringUtils.applicationContext = applicationContext;
	}
}
