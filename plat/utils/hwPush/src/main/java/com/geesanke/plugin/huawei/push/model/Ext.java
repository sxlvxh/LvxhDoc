package com.geesanke.plugin.huawei.push.model;

import java.util.Map;

import com.geesanke.plugin.huawei.push.util.json.JsonUtils;

public class Ext {

    // 设置消息标签，如果带了这个标签，会在回执中推送给 CP 用于检测某种类型消息的到达率和状态。
    private String biTag;
    // 扩展样例：[{"season":"Spring"},{"weather":"raining"}]说明：这个字段类型必须是 JSON Array，里面是
    // key-value 的一组扩展信息。
    private String[] customize;

    public Ext() {
    }

    private Ext(ExtBuilder extBuilder) {
        this.biTag = extBuilder.biTag;
        this.customize = extBuilder.customize;
    }

    public String getBiTag() {
        return biTag;
    }

    public void setBiTag(String biTag) {
        this.biTag = biTag;
    }

    public String[] getCustomize() {
        return customize;
    }

    public void setCustomize(String[] customize) {
        this.customize = customize;
    }

    public static ExtBuilder newInstance() {
        return new ExtBuilder();
    }

    public static final class ExtBuilder {
        private String biTag;
        private String[] customize;

        private ExtBuilder() {
        }

        public ExtBuilder addBiTag(String biTag) {
            this.biTag = biTag;
            return this;
        }

        public ExtBuilder addCustomize(Map<String, String> customize) {
            this.customize = new String[] { JsonUtils.to(customize) };
            return this;
        }

        public Ext build() {
            return new Ext(this);
        }
    }

}
