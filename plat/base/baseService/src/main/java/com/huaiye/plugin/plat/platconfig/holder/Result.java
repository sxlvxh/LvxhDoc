/**
  * Copyright 2020 bejson.com 
  */
package com.huaiye.plugin.plat.platconfig.holder;
import java.util.List;

import com.lvxh.plugin.platform.holder.BaseBusinessHolder;

/**
 * Auto-generated: 2020-04-14 10:53:25
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class Result extends BaseBusinessHolder{

    /**
	 * 
	 */
	private static final long serialVersionUID = -4022869279863700344L;
    private String configName;
    private String configValue;
    private String configType;
    private String configCode;

    public void setConfigName(String configName) {
         this.configName = configName;
     }
     public String getConfigName() {
         return configName;
     }

    public void setConfigValue(String configValue) {
         this.configValue = configValue;
     }
     public String getConfigValue() {
         return configValue;
     }

    public void setConfigType(String configType) {
         this.configType = configType;
     }
     public String getConfigType() {
         return configType;
     }

    public void setConfigCode(String configCode) {
         this.configCode = configCode;
     }
     public String getConfigCode() {
         return configCode;
     }

}