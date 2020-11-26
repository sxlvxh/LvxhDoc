
package com.lvxh.plugin.tdx.server;
 
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.google.gson.Gson;

import cn.hylexus.jt808.service.JT808Service;
import cn.hylexus.jt808.service.codec.MsgDecoder;
import cn.hylexus.jt808.vo.PackageData.MsgHeader;
import cn.hylexus.jt808.vo.req.LocationInfoUploadMsg;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.util.ReferenceCountUtil;
public class NettyTdxServerHandler extends ChannelInboundHandlerAdapter {
	
	private static final Logger LOG = Logger.getLogger(NettyTdxServerHandler.class);
	
	private JT808Service service;
	
	public static final Map<String,String> map = new HashMap<String,String>();
	static {
		map.put("302", "进出入区域");
		map.put("16", "ACC开启报警");
	}
	
	public NettyTdxServerHandler(JT808Service service) {
		super();
		this.service = service;
	}

	@Override
	public void channelRead(ChannelHandlerContext ctx, Object msg){
		try {
			LOG.debug(" channelRead " + msg);
			String str = (String) msg;
			String strs[] = str.split("\\|");
			Gson gson = new Gson();
			MsgDecoder dec = new MsgDecoder();
			//gps坐标
			if("*#007".equals(strs[0]))
			{
				LocationInfoUploadMsg holder = procGps(strs, dec);
				service.executor(holder);
				
			}else if("*#008".equals(strs[0])) //告警消息
			{
				LocationInfoUploadMsg holder = procGps(strs, dec);
				holder.setAlarm(strs[18]);
				holder.setInType(Integer.parseInt(strs[22]));
				holder.setStopTime(Integer.parseInt(strs[21]));
				service.executor(holder);
			}
	        
		} catch(Exception e){
			LOG.error(e.getMessage(),e);
		}finally {
			ReferenceCountUtil.release(msg);
		}
	}

	private LocationInfoUploadMsg procGps(String[] strs, MsgDecoder dec) {
		LocationInfoUploadMsg holder = new LocationInfoUploadMsg();
		MsgHeader msgHeader = new MsgHeader();
		msgHeader.setTerminalPhone(strs[1]);
		holder.setLongitude(Float.parseFloat(strs[3]));
		holder.setLatitude(Float.parseFloat(strs[4]));
		holder.setMsgHeader(msgHeader);
		holder.setSpeed(Float.parseFloat(strs[5]));
		holder.setDirection(Integer.parseInt(strs[6]));
		holder.setOil(Float.parseFloat(strs[7]));
		holder.setMileage(Float.parseFloat(strs[8]));
		holder.setStatus(dec.toTwo(Integer.parseInt(strs[10])));
		try {
			Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(strs[2]);
			holder.setTime(date);
		} catch (ParseException e) {
			LOG.error("", e);
		}
		return holder;
	}
	
	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		cause.printStackTrace();
		ctx.close();
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		super.channelActive(ctx);
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelInactive");
		super.channelInactive(ctx);
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		//LOG.debug("channelReadComplete");
		super.channelReadComplete(ctx);
	}

	@Override
	public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelRegistered");
		super.channelRegistered(ctx);
	}

	@Override
	public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelUnregistered");
		super.channelUnregistered(ctx);
	}

	@Override
	public void channelWritabilityChanged(ChannelHandlerContext ctx) throws Exception {
		LOG.debug("channelWritabilityChanged");
		super.channelWritabilityChanged(ctx);
	}

	@Override
	public void userEventTriggered(ChannelHandlerContext ctx, Object evt) throws Exception {
		LOG.debug("userEventTriggered");
		super.userEventTriggered(ctx, evt);
	}
	
	
}
