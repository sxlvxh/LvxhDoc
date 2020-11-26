

package com.geesanke.plugin.huawei.push.model;

import com.geesanke.plugin.huawei.push.model.enums.ActionType;

public class Action {

    private Integer type;

    private Param param;

    private Action(ActionBuilder actionBuilder) {
        this.type = actionBuilder.type;
        this.param = actionBuilder.param;
    }

    public Action() {    }


    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Param getParam() {
        return param;
    }

    public void setParam(Param param) {
        this.param = param;
    }




    public static ActionBuilder newInstance() {
        return new ActionBuilder();
    }

    public static final class ActionBuilder {
        private Integer type;
        private Param param;

        private ActionBuilder() {}

        public ActionBuilder addType(ActionType actionType) {
            this.type = actionType.getType();
            return this;
        }
        
        public ActionBuilder addType(Integer type) {
            this.type = type;
            return this;
        }

        public ActionBuilder addParam(Param param) {
            this.param = param;
            return this;
        }

        public Action build() {
            return new Action(this);
        }
    }
    
    public static class Param {

        private String intent;

        private String url;

        private String appPkgName;

        
        
        public Param() {        }

        private Param(ParamBuilder paramBuilder) {
            this.intent = paramBuilder.intent;
            this.url = paramBuilder.url;
            this.appPkgName = paramBuilder.appPkgName;
        }

        
        
        public String getIntent() {
            return intent;
        }



        public void setIntent(String intent) {
            this.intent = intent;
        }



        public String getUrl() {
            return url;
        }



        public void setUrl(String url) {
            this.url = url;
        }



        public String getAppPkgName() {
            return appPkgName;
        }



        public void setAppPkgName(String appPkgName) {
            this.appPkgName = appPkgName;
        }



        public static ParamBuilder newInstance() {
            return new ParamBuilder();
        }

        public static final class ParamBuilder {
            private String intent;
            private String url;
            private String appPkgName;

            private ParamBuilder() {
            }

            public ParamBuilder addParam(ActionType type, String action) {
                switch (type) {
                case INTENT:
                    this.intent = action;
                    break;
                case URL:
                    this.url = action;
                    break;
                case APP:
                    this.appPkgName = action;
                    break;
                default:
                    break;
                }
                return this;
            }

            public ParamBuilder addIntent(String intent) {
                this.intent = intent;
                return this;
            }

            public ParamBuilder addUrl(String url) {
                this.url = url;
                return this;
            }

            public ParamBuilder addAppPkgName(String appPkgName) {
                this.appPkgName = appPkgName;
                return this;
            }

            public Param build() {
                return new Param(this);
            }
        }

    }

}
