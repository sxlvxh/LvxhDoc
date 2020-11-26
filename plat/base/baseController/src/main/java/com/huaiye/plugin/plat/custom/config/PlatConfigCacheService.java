package com.huaiye.plugin.plat.custom.config;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections4.map.HashedMap;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.huaiye.plugin.plat.custom.utils.PlatUtils;
import com.huaiye.plugin.plat.platconfig.holder.PlatConfigHolder;
import com.huaiye.plugin.plat.platconfig.service.PlatConfigService;
import com.huaiye.plugin.plat.platent.holder.PlatEntHolder;
import com.huaiye.plugin.plat.platent.service.PlatEntService;
import com.huaiye.plugin.plat.platproduct.holder.PlatProductHolder;
import com.huaiye.plugin.plat.platproduct.service.PlatProductService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.huaiye.plugin.plat.sie.EntParams;
import com.huaiye.plugin.plat.sie.SieParams;
import com.lvxh.plugin.platform.service.Constants;
import com.lvxh.plugin.platform.utils.PUtils;

@Service
public class PlatConfigCacheService {
	
	private static final Logger LOG = Logger.getLogger(PlatUtils.class);

	@Autowired
	private Config config;
	
	@Autowired
	private PlatProductService platProductService;
	
	@Autowired
	private PlatEntService platEntService;
	
	@Autowired
	private PlatConfigService platConfigService;
	
	public Map<String,Object> getConfig()
	{
		Map<String,Object> map = new HashedMap<String,Object>();
		PlatProductHolder _product = new PlatProductHolder();
		_product.setProductCode(config.productCode);
		PlatProductHolder product = platProductService.get(_product);
		PlatEntHolder ent = getEntHolder(config.entCode);
		
		map.put("entCode", config.entCode);
		map.put("productCode", config.productCode);
		map.put("platProduct", product);
		map.put("platEnt", ent);
		map.put("filesServerVisit", config.filesServerVisit);
		map.put("hasContact", config.hasContact);
		map.put("hasMessage", config.hasMessage);
		map.put("tcpClientAccount", config.tcpClientAccount);
		map.put("intranetIp", config.intranetIp);
		map.put("extranetIp", config.extranetIp);
		map.put("tcpPort", config.tcpPort);
		map.put("webSocketPort", config.webSocketPort);
		map.put("tcpServerAccount", config.tcpServerAccount);
		map.put("isExternalNetwork", config.isExternalNetwork);
		map.put("webServerUrl", config.webServerUrl);
		map.put("mapUrl", config.mapUrl);
		map.put("mapCenterLatLng", config.mapCenterLatLng);
		map.put("mapDefaultLevel", config.mapDefaultLevel);
		
		map.put("sieIp", config.sieIp);
		map.put("siePort", config.siePort);
		map.put("webRtcUrl", config.webRtcUrl);
		map.put("sieStreamUrl", config.sieStreamUrl);
		map.put("sieWebsocketUrl", config.sieWebsocketUrl);
		map.put("upFileWebsocketUrl", config.upFileWebsocketUrl);
		
		getPlatConfig(map);
		return map;
		
	}
	public PlatEntHolder getEntHolder(String entCode) {
		PlatEntHolder _ent = new PlatEntHolder();
		_ent.setEntCode(entCode);
		PlatEntHolder ent = platEntService.get(_ent);
		return ent;
	}
	
    public String getDomainCode(Map<String,PlatEntHolder> map,String entCode)
    {
    	PlatEntHolder _ent = map.get(entCode);
    	String domainCode = "";
		if(_ent !=null)
		{
			EntParams sie = new Gson().fromJson(_ent.getEntParams(), EntParams.class);
			if(sie !=null)
			{
				domainCode = sie.getDomainCode();
			}
		}
		return domainCode;
    }
    
    public String getDomainCode(String entCode)
    {
    	PlatEntHolder _ent = getEntMap().get(entCode);
    	String domainCode = "";
		if(_ent !=null)
		{
			EntParams sie = new Gson().fromJson(_ent.getEntParams(), EntParams.class);
			if(sie !=null)
			{
				domainCode = sie.getDomainCode();
			}
		}
		return domainCode;
    }
	
	public Map<String,PlatEntHolder> getEntMap() {
		PlatEntHolder _ent = new PlatEntHolder();
		Map<String,PlatEntHolder> map = new HashMap<String, PlatEntHolder>();
		List<PlatEntHolder>list = platEntService.getList(_ent);
		if(list!=null)
		{
			for(PlatEntHolder _e : list)
			{
				map.put(_e.getEntCode(), _e);
			}
		}
		return map;
	}
	
	public PlatConfigHolder getConfig(String key)
	{
		if(StringUtils.isNotBlank(key))
		{
			PlatConfigHolder _config = new PlatConfigHolder();
			_config.setConfigName(key);
			return platConfigService.get(_config);
		}
		return null;
	}

	public void getPlatConfig(Map<String, Object> map) {
		List<PlatConfigHolder> list = platConfigService.getList(new PlatConfigHolder());
		if(list !=null)
		{
			for(PlatConfigHolder _config : list)
			{
				map.put(_config.getConfigName(), _config.getConfigValue());
			}
		}
	}
	
	public static PlatUserListHolder getSessionUser(HttpServletRequest req) {
		Object obj = req.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			return (PlatUserListHolder) obj;
		} else {
			return null;
		}
	}
	
	/**
	 * 调用SIE接口
	 * @param holder
	 * @return
	 */
	public String getSieSingleHttp(SieParams holder) {
		LOG.debug(" getSieSingleHttp req params : " + holder);
		PlatConfigHolder _config = getConfig("HTTP_TIMEOUT");
		int timeout = 3000;
		if (_config != null) {
			timeout = Integer.parseInt(_config.getConfigValue());
		}
		String result = PUtils.sendJSONPost(holder.getUrl() + holder.getLastUrl(), holder.getParams(), timeout, null);
		LOG.debug(" getSieSingleHttp req params : 【" + holder + "】 resp params : 【" + result + "】");
		return result;
	}
	
	/**
	 * 批量查询sie接口
	 * @param list
	 * @return
	 */
	public List<String> getSieBatchHttp(List<SieParams> list) {
		List<String> resList = new ArrayList<String>();
		final CountDownLatch latch = new CountDownLatch(list.size());
		for (SieParams param : list) {
			final SieParams _param = param;
			PUtils.submit(new Runnable() {
				@Override
				public void run() {
					try {
						resList.add(getSieSingleHttp(_param));
					} catch (Exception e) {
						LOG.error(e.getMessage(), e);
					}finally
					{
						latch.countDown();
					}
				}
			});
		}
		try {
			latch.await();
		} catch (InterruptedException e) {
			LOG.error(e.getMessage(), e);
		}
		
		return resList;
	}
	
	public String getImgUrl(String url) {
		if(StringUtils.isNotBlank(url))
		{
			if(url.startsWith("/userfiles") || url.startsWith("/help"))
			{
				return config.filesServerVisit + url;
			}else if(url.startsWith("http:") || url.startsWith("https:"))
			{
				return url;
			}else
			{
				return config.filesServerVisit +"/theme/default/" + url;
			}
		}
		return url;
	}
}
