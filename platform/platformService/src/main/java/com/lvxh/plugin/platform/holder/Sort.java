package com.lvxh.plugin.platform.holder;

import java.io.Serializable;

import org.apache.commons.lang.StringUtils;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;

/**
 * . Holder排序对象定义
 * 
 * @version 1.0.0
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class Sort implements Serializable {

	/**
	 * .序列化UID
	 */
	private static final long serialVersionUID = -5775933493380482323L;
	private int fieldType;
	
	public int getFieldType() {
		return fieldType;
	}
	
	public void setFieldType(int fieldType) {
		this.fieldType = fieldType;
		if (this.fieldType == 1) {
			this.field = javaNameToTableField(this.field);
		}
	}

	/**
	 * . 当前页码
	 */
	private String field;


	/**
	 * . 排序方式
	 */
	private String order;

	/**
	 * @return the field
	 */
	public String getField() {
		return field;
	}

	/**
	 * @return the order
	 */
	public String getOrder() {
		return order;
	}

	/**
	 * @param field
	 *            the field to set
	 */
	public void setField(String field) {
		this.field = field;
		if (this.fieldType == 1) {
			field = javaNameToTableField(field);
			this.field = field;
		}
	}

	public static String javaNameToTableField(String field) {
		if (StringUtils.isNotBlank(field)) {
			for (int i = 1; i < field.length() - 1; i++) {
				if ((Character.isUpperCase(field.charAt(i)) && Character.isLowerCase(field.charAt(i + 1)))
						|| (Character.isUpperCase(field.charAt(i)) && Character.isLowerCase(field.charAt(i - 1)))) {
					field = field.substring(0, i) + "_" + field.substring(i, field.length());
					i++;
				}
			}
		}
		return field;
	}
/*
	public static void main(String[] args) {
		System.out.println(javaNameToTableField("nameDEDesc"));
	}
*/
	/**
	 * @param order
	 *            the order to set
	 */
	public void setOrder(String order) {
		this.order = order;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Sort [field=");
		builder.append(field);
		builder.append(", order=");
		builder.append(order);
		builder.append("]");
		return builder.toString();
	}

}
