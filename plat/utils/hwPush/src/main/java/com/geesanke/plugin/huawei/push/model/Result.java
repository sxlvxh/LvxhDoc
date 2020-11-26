
package com.geesanke.plugin.huawei.push.model;

public class Result {

    private String requestId;
    private String msg;
    private String code;
    private String ext;
    private Result(ResultBuilder resultBuilder) {
        this.requestId = resultBuilder.requestId;
        this.msg = resultBuilder.msg;
        this.code = resultBuilder.code;
        this.ext = resultBuilder.ext;
    }
    
    
    
    public Result() {    }



    public String getRequestId() {
        return requestId;
    }



    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }



    public String getMsg() {
        return msg;
    }



    public void setMsg(String msg) {
        this.msg = msg;
    }



    public String getCode() {
        return code;
    }



    public void setCode(String code) {
        this.code = code;
    }



    public String getExt() {
        return ext;
    }



    public void setExt(String ext) {
        this.ext = ext;
    }



    public static ResultBuilder newInstance() {
        return new ResultBuilder();
    }
    
    
    public static final class ResultBuilder {
        private String requestId;
        private String msg;
        private String code;
        private String ext;

        private ResultBuilder() {
        }

        public ResultBuilder addRequestId(String requestId) {
            this.requestId = requestId;
            return this;
        }

        public ResultBuilder addMsg(String msg) {
            this.msg = msg;
            return this;
        }

        public ResultBuilder addCode(String code) {
            this.code = code;
            return this;
        }

        public ResultBuilder addExt(String ext) {
            this.ext = ext;
            return this;
        }

        public Result build() {
            return new Result(this);
        }
    }
    
    
    
}
