package com.lvxh.plugin.tdx.server;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.log4j.Logger;

import com.lvxh.plugin.netty.bean.MessageContainer;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandlerContext;
import io.netty.handler.codec.ByteToMessageDecoder;

public class NettyTdxMessageDecoder extends ByteToMessageDecoder {  
  
	private static final Logger LOG = Logger.getLogger(NettyTdxMessageDecoder.class);
    
	/** 
     * <pre> 
     * 表示数据的长度contentLength，int类型，占据4个字节. 
     * </pre> 
     */  
    public final int BASE_LENGTH = 4;  
  
    @Override  
    protected void decode(ChannelHandlerContext ctx, ByteBuf buffer, List<Object> out){ 
    	
    	 byte[] data1 = new byte[buffer.readableBytes()]; 
    	 
    	 // 记录包头开始的index  
         int idx = buffer.readerIndex();  
         buffer.markReaderIndex();  
         buffer.readBytes(data1);
         
        try {
        	String str  = new String(data1,"UTF-8");
        	LOG.debug(" ===== " + str);
        	int start = str.indexOf("*#");
        	int end = str.indexOf("*X");
        	buffer.readerIndex(idx); 
        	if(end != -1 && start !=-1)
        	{
        		 if(start > 0 )
        		 {
        			 buffer.readBytes(new byte[start]);
        		 }
        		 byte []temp = str.substring(start,end+2).getBytes("UTF-8");
        		 byte[] bt = new byte[temp.length]; 
        		 buffer.readBytes(bt);  
        		 out.add(new String(bt,"UTF-8"));
        	}
        	else
        	{
        		return;
        	}
		} catch (Exception e) {
		    LOG.error(e.getMessage(), e);
		}
    }
  
}  