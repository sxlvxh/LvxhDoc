package com.geesanke.plugin.huawei.push.model.enums;

public enum ActionType {
    /* 自定义行为 */
    INTENT(1),
    /* 打开 URL */
    URL(2),
    /* 打开app */
    APP(3),;
    private Integer type;

    private ActionType(Integer type) {
        this.type = type;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

}
