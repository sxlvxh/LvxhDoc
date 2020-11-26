package com.geesanke.plugin.huawei.push.api;

import java.net.URLEncoder;
import java.util.Map;

import com.geesanke.plugin.huawei.push.http.ThirdApiCommonHttpUtil;
import com.geesanke.plugin.huawei.push.model.PushPayload;
import com.geesanke.plugin.huawei.push.model.Result;
import com.geesanke.plugin.huawei.push.util.Object2Map;
import com.geesanke.plugin.huawei.push.util.json.JsonUtils;
import com.google.gson.reflect.TypeToken;

public class HuaweiPushApiService {

    private static final String PUSH_URL = "https://push-api.cloud.huawei.com/v1/%s/messages:send";
    
    public static Result pushSend(PushSendRequest request) {

        try {
            String nspCtx = URLEncoder.encode(JsonUtils.to(request.getNspCtx()), "UTF-8");
            String url = String.format(PUSH_URL, nspCtx);

            Map<String, String> params = Object2Map.obj2StringMap(request.getPushPayload());

            String responStr = ThirdApiCommonHttpUtil.formPost(params, url, null);
            return JsonUtils.gsonToUnderlineCase.fromJson(responStr, new TypeToken<Result>() {
            }.getType());

        } catch (Exception e) {
            return Result.newInstance().addCode("9001").addMsg(e.getMessage()).build();
        }

    }

    public static class PushSendRequest {
        private NspCtx nspCtx;
        private PushPayload pushPayload;

        public PushSendRequest() {
        }

        public NspCtx getNspCtx() {
            return nspCtx;
        }

        public void setNspCtx(NspCtx nspCtx) {
            this.nspCtx = nspCtx;
        }

        public PushPayload getPushPayload() {
            return pushPayload;
        }

        public void setPushPayload(PushPayload pushPayload) {
            this.pushPayload = pushPayload;
        }

        private PushSendRequest(PushSendRequestBuilder pushSendRequestBuilder) {
            this.nspCtx = pushSendRequestBuilder.nspCtx;
            this.pushPayload = pushSendRequestBuilder.pushPayload;
        }

        public static PushSendRequestBuilder newInstance() {
            return new PushSendRequestBuilder();
        }

        public static final class PushSendRequestBuilder {
            private NspCtx nspCtx;
            private PushPayload pushPayload;

            private PushSendRequestBuilder() {
            }

            public PushSendRequestBuilder addNspCtx(NspCtx nspCtx) {
                this.nspCtx = nspCtx;
                return this;
            }

            public PushSendRequestBuilder addPushPayload(PushPayload pushPayload) {
                this.pushPayload = pushPayload;
                return this;
            }

            public PushSendRequest build() {
                return new PushSendRequest(this);
            }
        }

    }

    public static class NspCtx {
        private String ver = "1";
        private String appId;

        public NspCtx() {
        }

        private NspCtx(NspCtxBuilder nspCtxBuilder) {
            this.ver = nspCtxBuilder.ver;
            this.appId = nspCtxBuilder.appId;
        }

        public String getVer() {
            return ver;
        }

        public void setVer(String ver) {
            this.ver = ver;
        }

        public String getAppId() {
            return appId;
        }

        public void setAppId(String appId) {
            this.appId = appId;
        }

        public static NspCtxBuilder newInstance() {
            return new NspCtxBuilder();
        }

        public static final class NspCtxBuilder {
            private String ver = "1";
            private String appId;

            private NspCtxBuilder() {
            }

            public NspCtxBuilder addVer(String ver) {
                this.ver = ver;
                return this;
            }

            public NspCtxBuilder addAppId(String appId) {
                this.appId = appId;
                return this;
            }

            public NspCtx build() {
                return new NspCtx(this);
            }
        }

    }

}
