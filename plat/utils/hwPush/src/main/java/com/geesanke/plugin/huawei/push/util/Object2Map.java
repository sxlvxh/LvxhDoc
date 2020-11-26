package com.geesanke.plugin.huawei.push.util;

import java.util.HashMap;
import java.util.Map;

import cn.hutool.core.bean.BeanUtil;

public class Object2Map {

    public static Map<String, String> obj2StringMap(Object obj) {
        Map<String, Object> map = BeanUtil.beanToMap(obj,true,true);
        Map<String, String> params = new HashMap<String, String>();
        
        if(CommonUtils.isNotEmpty(map)) {
            for(String key:map.keySet()) {
                params.put(key, (String)map.get(key));
            }
        }

        return params;
        
    }

}
