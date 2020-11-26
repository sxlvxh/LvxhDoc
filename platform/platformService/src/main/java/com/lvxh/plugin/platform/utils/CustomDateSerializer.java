package com.lvxh.plugin.platform.utils;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**.
 * 自定义时间格式化
 * 
 * @author luweijun
 *		   2015-08-14
 * @since V100R001C02
 * @version V100R001C02
 */
public class CustomDateSerializer extends JsonSerializer<Date> {

    /*
     * (non-Javadoc)
     * @see org.codehaus.jackson.map.JsonSerializer#serialize(java.lang.Object,
     * org.codehaus.jackson.JsonGenerator,
     * org.codehaus.jackson.map.SerializerProvider)
     */
    @Override
    public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException,
            JsonProcessingException {
    	if(value == null)
    	{
    		jgen.writeString("");
    		return ;
    	}else
    	{
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        jgen.writeString(format.format(value));
    	}
    }

}
