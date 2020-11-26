package com.lvxh.plugin.platform.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class CustomSimpleDateSerializer extends JsonSerializer<Date> {

	@Override
	public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider)
			throws IOException, JsonProcessingException {
    	if(value == null)
    	{
    		jgen.writeString("");
    		return ;
    	}else
    	{
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        jgen.writeString(format.format(value));
    	}
		
	}

}
