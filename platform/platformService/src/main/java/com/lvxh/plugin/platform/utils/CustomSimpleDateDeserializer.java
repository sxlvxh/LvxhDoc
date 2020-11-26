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


public class CustomSimpleDateDeserializer extends JsonDeserializer<Date> {

	private static final Logger LOG = Logger.getLogger(CustomSimpleDateDeserializer.class);
	@Override
	public Date deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
			String value = parser.getText();
			if(value == null || "".equals(value))
			{
				return null;
			}

			return format.parse(value);
		} catch (ParseException e) {
			LOG.error("Deserialize date error.", e);
		}
		return null;
	}

}
