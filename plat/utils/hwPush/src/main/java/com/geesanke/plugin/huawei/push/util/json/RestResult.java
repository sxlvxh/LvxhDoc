package com.geesanke.plugin.huawei.push.util.json;

public class RestResult<T> {
    public int code;
    public String msg;
    public T data;
	
    public RestResult() {
	
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
    
}
