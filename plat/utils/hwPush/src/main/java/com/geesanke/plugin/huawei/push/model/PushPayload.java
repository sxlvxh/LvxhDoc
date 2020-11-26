package com.geesanke.plugin.huawei.push.model;

import com.geesanke.plugin.huawei.push.util.json.JsonUtils;

public class PushPayload {

    private String accessToken;
    private String nspTs;
    private String nspSvc;
    private String deviceTokenList;
    private String expireTime;
    private String payload;
    
    private PushPayload(PushPayloadBuilder pushPayloadBuilder) {
        this.accessToken = pushPayloadBuilder.accessToken;
        this.nspTs = pushPayloadBuilder.nspTs;
        this.nspSvc = pushPayloadBuilder.nspSvc;
        this.deviceTokenList = pushPayloadBuilder.deviceTokenList;
        this.expireTime = pushPayloadBuilder.expireTime;
        this.payload = pushPayloadBuilder.payload;
    }
    
    public PushPayload() {    }


    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getNspTs() {
        return nspTs;
    }

    public void setNspTs(String nspTs) {
        this.nspTs = nspTs;
    }

    public String getNspSvc() {
        return nspSvc;
    }

    public void setNspSvc(String nspSvc) {
        this.nspSvc = nspSvc;
    }

    public String getDeviceTokenList() {
        return deviceTokenList;
    }

    public void setDeviceTokenList(String deviceTokenList) {
        this.deviceTokenList = deviceTokenList;
    }

    public String getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(String expireTime) {
        this.expireTime = expireTime;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public static PushPayloadBuilder newInstance() {
        return new PushPayloadBuilder();
    }

    public static final class PushPayloadBuilder {
        private String accessToken;
        private String nspTs = String.valueOf(System.currentTimeMillis() / 1000);
        private String nspSvc = "openpush.message.api.send";
        private String deviceTokenList;
        private String expireTime;
        private String payload;

        private PushPayloadBuilder() { }

        public PushPayloadBuilder addAccessToken(String accessToken) {
            this.accessToken = accessToken;
            return this;
        }

        public PushPayloadBuilder addNspTs(String nspTs) {
            this.nspTs = nspTs;
            return this;
        }

        public PushPayloadBuilder addNspSvc(String nspSvc) {
            this.nspSvc = nspSvc;
            return this;
        }

        public PushPayloadBuilder addDeviceTokenList(String[] deviceTokenList) {
            this.deviceTokenList = JsonUtils.to(deviceTokenList);
            return this;
        }

        public PushPayloadBuilder addExpireTime(String expireTime) {
            this.expireTime = expireTime;
            return this;
        }

        public PushPayloadBuilder addPayload(Payload payload) {
            this.payload = JsonUtils.to(payload);
            return this;
        }

        public PushPayload build() {
            return new PushPayload(this);
        }
    }

}
