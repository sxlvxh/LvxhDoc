/*
 * .PlatConfigController.java
 * Copyright 2016. All Rights Reserved.
 */
package com.huaiye.plugin.plat.platconfig.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.huaiye.plugin.plat.custom.config.Config;
import com.huaiye.plugin.plat.platconfig.holder.ConfigReqHolder;
import com.huaiye.plugin.plat.platconfig.holder.Obj;
import com.huaiye.plugin.plat.platconfig.holder.PlatConfigHolder;
import com.huaiye.plugin.plat.platconfig.service.PlatConfigService;
import com.lvxh.plugin.platform.controller.BaseController;
import com.lvxh.plugin.platform.holder.BaseResult;

/**
 * . 系统配置表接口
 * 
 * @author 吕孝怀
 * @version V100R002C01-SNAPSHOT
 */
@RequestMapping("/platconfig")
@Controller
public class PlatConfigController extends BaseController<PlatConfigHolder> {

   private static final Logger LOG = Logger.getLogger(PlatConfigController.class);

	@Autowired
	private Config config;
	
	@Autowired
	private PlatConfigService platConfigService;
	
	/**
     * 
     * @return
     */
    @RequestMapping("/index")
    public ModelAndView index(HttpServletRequest req, HttpServletResponse resp) {
        LOG.debug(" init index page : " + req.getRemoteAddr());
        return new ModelAndView("html/platconfig");
    }
    
    
	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/getConfig")
	public BaseResult getConfig(@RequestBody PlatConfigHolder holder, HttpServletRequest request,
			HttpServletResponse resp) {
		LOG.debug(" login user params : " + holder);
		BaseResult result = new BaseResult();
		List<PlatConfigHolder> list = platConfigService.getList(new PlatConfigHolder());
		result.setResult(list);
		Map<String,Object>map =new HashMap<String,Object>();
		map.put("entCode", config.entCode);
		map.put("filesServerUrl", config.filesServerUrl);
		map.put("productCode", config.productCode);
		map.put("filesServerVisit", config.filesServerVisit);
		map.put("filesServerUser", config.filesServerUser);
		map.put("filesServerPwd", config.filesServerPwd);
		map.put("mapUrl", config.mapUrl);
		map.put("mapCenterLatLng", config.mapCenterLatLng);
		map.put("mapDefaultLevel", config.mapDefaultLevel);
		map.put("sieIp", config.sieIp);
		map.put("siePort", config.siePort);
		map.put("webRtcUrl", config.webRtcUrl);
		map.put("sieStreamUrl", config.sieStreamUrl);
		map.put("sieWebsocketUrl", config.sieWebsocketUrl);
		map.put("upFileWebsocketUrl", config.upFileWebsocketUrl);
		
		result.setObj(map);
		return result;
	}
	
	/**
	 * 
	 * 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/updateConfig")
	public BaseResult updateConfig(@RequestBody ConfigReqHolder holder, HttpServletRequest request,
			HttpServletResponse resp) {
		LOG.debug(" updateConfig user params : " + holder);
		BaseResult result = new BaseResult();
		if(holder.getObj() !=null)
		{
			Obj obj = holder.getObj();
			config.entCode = obj.getEntCode();
			config.filesServerPwd = obj.getFilesServerPwd();
			config.filesServerUrl = obj.getFilesServerUrl();
			config.filesServerUser = obj.getFilesServerUser();
			config.filesServerVisit = obj.getFilesServerVisit();
			config.productCode = obj.getProductCode();
			config.mapUrl = obj.getMapUrl();
			config.mapCenterLatLng = obj.getMapCenterLatLng();
			config.mapDefaultLevel = obj.getMapDefaultLevel();
			config.sieIp = obj.getSieIp();
			config.siePort = obj.getSiePort();
			config.webRtcUrl = obj.getWebRtcUrl();
			config.sieStreamUrl = obj.getSieStreamUrl();
			config.sieWebsocketUrl = obj.getSieWebsocketUrl();
			config.upFileWebsocketUrl = obj.getUpFileWebsocketUrl();
			
			String str = PlatConfigController.class.getClassLoader().getResource("config").getPath();
			File file = new File(new File(str).getParent() + "/conf.properties");
			Properties pro = new Properties();
			FileInputStream fis = null;
			try {
				fis = new FileInputStream(file);
				pro.load(fis);
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			} finally {
				if (fis != null) {
					try {
						fis.close();
					} catch (IOException e) {
						LOG.error(e.getMessage(), e);
					}
				}
			}

			pro.setProperty("ENT_CODE", config.entCode);
			pro.setProperty("FILES_SERVER_PWD", config.filesServerPwd);
			pro.setProperty("FILES_SERVER_URL", config.filesServerUrl);
			pro.setProperty("FILES_SERVER_USER", config.filesServerUser);
			pro.setProperty("FILES_SERVER_VISIT", config.filesServerVisit);
			pro.setProperty("PRODUCT_CODE", config.productCode);
			
			pro.setProperty("MAP_URL", config.mapUrl);
			pro.setProperty("MAP_CENTER_LAT_LNG", config.mapCenterLatLng);
			pro.setProperty("MAP_DEFAULT_LEVEL", Integer.toString(config.mapDefaultLevel));
			pro.setProperty("SIE_IP", config.sieIp);
			pro.setProperty("SIE_PORT", Integer.toString(config.siePort));
			pro.setProperty("WEBRTC_URL", config.webRtcUrl);
			pro.setProperty("SIE_STREAM_URL", config.sieStreamUrl);
			pro.setProperty("SIE_WEBSOCKET_URL", config.sieWebsocketUrl);
			pro.setProperty("UP_FILE_WEBSOCKET_RUL", config.upFileWebsocketUrl);
			
			
			FileOutputStream fos = null;
			try {
				fos = new FileOutputStream(file);
				pro.store(fos, "about:blank");
			} catch (Exception e) {
				LOG.error(e.getMessage(), e);
			} finally {
				if (fos != null) {
					try {
						fos.close();
					} catch (IOException e) {
						LOG.error(e.getMessage(), e);
					}
				}
			}
		}
		result.setCode(0);
		result.setDesc("操作成功！");
		
		return result;
	}
}
