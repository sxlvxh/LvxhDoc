/**
  * Copyright 2020 bejson.com 
  */
package com.huaiye.plugin.plat.bean;
import java.util.List;

/**
 * Auto-generated: 2020-05-11 17:44:1
 *
 * @author bejson.com (i@bejson.com)
 * @website http://www.bejson.com/java2pojo/
 */
public class Message {

    private String data;
    private Notification2 notification;
    private Android android;
    private List<String> token;
    public void setData(String data) {
         this.data = data;
     }
     public String getData() {
         return data;
     }

    public void setNotification(Notification2 notification) {
         this.notification = notification;
     }
     public Notification2 getNotification() {
         return notification;
     }

    public void setAndroid(Android android) {
         this.android = android;
     }
     public Android getAndroid() {
         return android;
     }

    public void setToken(List<String> token) {
         this.token = token;
     }
     public List<String> getToken() {
         return token;
     }

}