package com.lvxh.plugin.platform.holder;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.message.BasicNameValuePair;
import org.apache.log4j.Logger;

/**
 * . 键值对对象 2015-9-22
 * 
 * @author yaokang
 * @since V100R001C02
 * @version V100R001C02 @
 */
public class NameValuePairList {
	/**
	 * 日志
	 */
	private static final Logger LOG = Logger.getLogger(NameValuePairList.class);

	/**
	 * . 列表
	 */
	private List<BasicNameValuePair> list;

	/**
	 * . 构造函数
	 */
	public NameValuePairList() {
		list = new ArrayList<BasicNameValuePair>();
	}

	/**
	 * . 构造函数
	 * 
	 * @param bean
	 *            对象
	 */
	public NameValuePairList(Object bean) {
		list = new ArrayList<BasicNameValuePair>();
		Class<?> clazz = bean.getClass();
		Field[] fields = clazz.getDeclaredFields();
		for (Field field : fields) {
			addNameValuePair(field, bean);
		}
	}

	/**
	 * . 增加键值对
	 * 
	 * @param field
	 *            属性
	 * 
	 * @param bean
	 *            对象
	 * 
	 * @return
	 */
	private void addNameValuePair(Field field, Object bean) {
		field.setAccessible(true);
		if (!Modifier.isStatic(field.getModifiers())) {
			try {
				String value = "";
				if (field.get(bean) != null) {
					value = field.get(bean).toString();
				}
				addNameValuePair(field.getName(), value);
			} catch (Exception e) {
				LOG.error("Create NameValuePair error.", e);
			}
		}
	}

	/**
	 * . 增加键值对
	 * 
	 * @param name
	 *            属性名
	 * 
	 * @param value
	 *            值
	 * 
	 * @return
	 */
	public void addNameValuePair(String name, String value) {
		if (list == null) {
			list = new ArrayList<BasicNameValuePair>();
		}
		list.add(new BasicNameValuePair(name, value));
	}

	/**
	 * . 获取列表
	 * 
	 * @return 列表
	 */
	public List<BasicNameValuePair> getList() {
		return list;
	}
}
