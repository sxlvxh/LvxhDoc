package com.lvxh.plugin.platform.utils;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

/**.
 * 自定义时间格式化
 * 
 * @author luweijun
 *		   2015-08-14
 * @since V100R001C02
 * @version V100R001C02
 */
public class CustomDateDeserializer extends JsonDeserializer<Date> {
	/**
	 * 日志
	 */
	private static final Logger LOG = Logger.getLogger(CustomDateDeserializer.class);
	
	/*
	 * (non-Javadoc)
	 * @see org.codehaus.jackson.map.JsonDeserializer#deserialize(org.codehaus.jackson.JsonParser, org.codehaus.jackson.map.DeserializationContext)
	 */
    @Override
	public Date deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
			String value = parser.getText();
			if(value == null || "".equals(value))
			{
				return null;
			}
			String name = parser.getCurrentName();
        	if(value.length() >= 10 && value.length() <= 19) {
        		value = value + (name == null || !name.endsWith("R") ? " 00:00:00" : " 23:59:59").substring(value.length() - 10);
			}
			return format.parse(value);
		} catch (ParseException e) {
			LOG.error("Deserialize date error.", e);
		}
		return null;
	}

}
