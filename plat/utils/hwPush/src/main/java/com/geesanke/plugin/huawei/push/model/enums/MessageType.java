package com.geesanke.plugin.huawei.push.model.enums;

public enum MessageType {

    /* 透传异步消息 */
    PASSTHROUGH(1),

    /* 通知栏 */
    NOTIFICATION(3),

    ;
    private Integer type;

    private MessageType(Integer type) {
        this.type = type;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

}
