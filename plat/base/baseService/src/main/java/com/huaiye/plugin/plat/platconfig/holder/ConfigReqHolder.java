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
public class ConfigReqHolder extends BaseBusinessHolder{

    /**
	 * 
	 */
	private static final long serialVersionUID = 7109687741585180539L;
	private int code;
    private List<Result> result;
    private Obj obj;
    public void setCode(int code) {
         this.code = code;
     }
     public int getCode() {
         return code;
     }

    public void setResult(List<Result> result) {
         this.result = result;
     }
     public List<Result> getResult() {
         return result;
     }

    public void setObj(Obj obj) {
         this.obj = obj;
     }
     public Obj getObj() {
         return obj;
     }

}