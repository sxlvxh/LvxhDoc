package com.geesanke.plugin.huawei.push.api;

import java.util.Map;

import com.geesanke.plugin.huawei.push.http.ThirdApiCommonHttpUtil;
import com.geesanke.plugin.huawei.push.util.Object2Map;
import com.geesanke.plugin.huawei.push.util.json.JsonUtils;
import com.google.gson.reflect.TypeToken;

import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;

public class HuaweiOauth2ApiService {

    private static final String ACCESSTOKEN_URL = "https://login.cloud.huawei.com/oauth2/v2/token";
    
    private static final Log logger = LogFactory.get();
    
    public static AccessToken getAccessToken(AccessTokenRequest request) {
        try {
            Map<String, String> params = Object2Map.obj2StringMap(request);
            String responStr = ThirdApiCommonHttpUtil.formPost(params, ACCESSTOKEN_URL, null);
            
            return JsonUtils.gsonToUnderlineCase.fromJson(responStr, new TypeToken<AccessToken>(){}.getType());
            
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return null;
    }

    public static AccessToken getAccessToken(String clientId, String clientSecret) {
        AccessTokenRequest request = AccessTokenRequest.newInstance().addClientId(clientId)
                .addClientSecret(clientSecret).build();
        return getAccessToken(request);
    }

    public static class AccessToken {
        private String accessToken;
        private long expiresIn;
        private String tokenType;
        public AccessToken() {        }
        public String getAccessToken() {
            return accessToken;
        }
        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }
        public long getExpiresIn() {
            return expiresIn;
        }
        public void setExpiresIn(long expiresIn) {
            this.expiresIn = expiresIn;
        }
        public String getTokenType() {
            return tokenType;
        }
        public void setTokenType(String tokenType) {
            this.tokenType = tokenType;
        }
        
        
        
    }

    public static class AccessTokenRequest {
        private String grantType = "client_credentials";
        private String clientId;
        private String clientSecret;
        private String scope;

        
        public AccessTokenRequest() {        }

        private AccessTokenRequest(AccessTokenRequestBuilder accessTokenRequestBuilder) {
            this.grantType = accessTokenRequestBuilder.grantType;
            this.clientId = accessTokenRequestBuilder.clientId;
            this.clientSecret = accessTokenRequestBuilder.clientSecret;
            this.scope = accessTokenRequestBuilder.scope;
        }

        
        public String getGrantType() {
            return grantType;
        }

        public void setGrantType(String grantType) {
            this.grantType = grantType;
        }

        public String getClientId() {
            return clientId;
        }

        public void setClientId(String clientId) {
            this.clientId = clientId;
        }

        public String getClientSecret() {
            return clientSecret;
        }

        public void setClientSecret(String clientSecret) {
            this.clientSecret = clientSecret;
        }

        public String getScope() {
            return scope;
        }

        public void setScope(String scope) {
            this.scope = scope;
        }

        public static AccessTokenRequestBuilder newInstance() {
            return new AccessTokenRequestBuilder();
        }

        public static final class AccessTokenRequestBuilder {
            private String grantType = "client_credentials";
            private String clientId;
            private String clientSecret;
            private String scope;

            private AccessTokenRequestBuilder() {
            }

            public AccessTokenRequestBuilder addGrantType(String grantType) {
                this.grantType = grantType;
                return this;
            }

            public AccessTokenRequestBuilder addClientId(String clientId) {
                this.clientId = clientId;
                return this;
            }

            public AccessTokenRequestBuilder addClientSecret(String clientSecret) {
                this.clientSecret = clientSecret;
                return this;
            }

            public AccessTokenRequestBuilder addScope(String scope) {
                this.scope = scope;
                return this;
            }

            public AccessTokenRequest build() {
                return new AccessTokenRequest(this);
            }
        }

    }

}
