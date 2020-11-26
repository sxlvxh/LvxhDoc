package com.geesanke.plugin.huawei.push.http;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.geesanke.plugin.huawei.push.util.CommonUtils;
import com.geesanke.plugin.huawei.push.util.json.JsonUtils;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import okhttp3.FormBody;
import okhttp3.FormBody.Builder;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ThirdApiCommonHttpUtil  {

    private static final Log logger = LogFactory.get();
    
    public static String jsonPost(String params, String url, Map<String, String> header) throws Exception {
        OkHttpClient client = new OkHttpClient();

        Request.Builder requestBuilder = new Request.Builder()
                                    .url(url).addHeader("Content-Type","application/json;charset=UTF-8");
        
        if(CommonUtils.isNotEmpty(header)) {
            for(String key:header.keySet()) {
                if(CommonUtils.isNotEmpty(header.get(key))) {
                    requestBuilder.addHeader(key, header.get(key));
                }
            }
        }
        RequestBody body = RequestBody.create(MediaType.parse("application/json;charset=utf-8"), params);
        Request request = requestBuilder.post(body).build();
        logger.info("\r\n访问路径：" + url + "；request参数：" + JsonUtils.to(request));
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("Unexpected code " + response);
        }
        String resopnseStr = response.body().string();
        logger.info("\r\n访问路径：" + url + "；返回参数：" + resopnseStr);
        return resopnseStr;
    }
    
    
    public static String formPost(Map<String, String> params, String url, Map<String, String> header) throws Exception {
        
        OkHttpClient client = new OkHttpClient().newBuilder().connectTimeout(60, TimeUnit.SECONDS).build();

        Request.Builder requestBuilder = new Request.Builder().url(url);
        
        if(CommonUtils.isNotEmpty(header)) {
            for(String key:header.keySet()) {
                if(CommonUtils.isNotEmpty(header.get(key))) {
                    requestBuilder.addHeader(key, header.get(key));
                }
            }
        }
        
        Builder formBody = new FormBody.Builder();
        
        if(CommonUtils.isNotEmpty(params)) {
            for(String key:params.keySet()) {
                formBody.add(key, params.get(key));
            }
        }
     
        Request request = requestBuilder.post(formBody.build()).build();
        
        logger.info("\r\n访问路径：" + url + "；request参数：" + JsonUtils.to(request));
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("Unexpected code " + response);
        }
        String resopnseStr = response.body().string();
        logger.info("\r\n访问路径：" + url + "；返回参数：" + resopnseStr);
        return resopnseStr;
    }
    

}
