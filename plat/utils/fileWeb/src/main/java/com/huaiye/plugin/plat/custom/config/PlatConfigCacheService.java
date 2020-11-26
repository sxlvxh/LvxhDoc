package com.huaiye.plugin.plat.custom.config;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.huaiye.plugin.plat.platproduct.holder.PlatProductHolder;
import com.huaiye.plugin.plat.platproduct.service.PlatProductService;
import com.huaiye.plugin.plat.platuserlist.holder.PlatUserListHolder;
import com.lvxh.plugin.platform.service.Constants;

@Service
public class PlatConfigCacheService {

	@Autowired
	private Config config;
	
	@Autowired
	private PlatProductService platProductService;
	
	public Map<String,Object> getConfig()
	{
		Map<String,Object> map = new HashedMap<String,Object>();
		PlatProductHolder _product = new PlatProductHolder();
		_product.setProductCode(config.productCode);
		PlatProductHolder product = platProductService.get(_product);
		
		map.put("entCode", config.entCode);
		map.put("productCode", config.productCode);
		map.put("platProduct", product);
		map.put("filesServerVisit", config.filesServerVisit);
		return map;
		
	}
	
	public static PlatUserListHolder getSessionUser(HttpServletRequest req) {
		Object obj = req.getSession().getAttribute(Constants.LOGIN_USER);
		if (obj != null) {
			return (PlatUserListHolder) obj;
		} else {
			return null;
		}
	}
	
	
	
}
