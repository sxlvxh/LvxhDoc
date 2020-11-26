
package com.geesanke.plugin.huawei.push.model;

public class Body {
    // 消息内容体
    private String content;
    // 消息标题
    private String title;

    private Body(BodyBuilder bodyBuilder) {
        this.content = bodyBuilder.content;
        this.title = bodyBuilder.title;
    }

    public Body() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public static BodyBuilder newInstance() {
        return new BodyBuilder();
    }

    public static final class BodyBuilder {
        private String content;
        private String title;

        private BodyBuilder() {
        }

        public BodyBuilder addContent(String content) {
            this.content = content;
            return this;
        }

        public BodyBuilder addTitle(String title) {
            this.title = title;
            return this;
        }

        public Body build() {
            return new Body(this);
        }
    }

}
