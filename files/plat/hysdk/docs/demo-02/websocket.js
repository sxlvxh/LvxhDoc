/**
    opt.url -- websocket服务器地址  ws://192.168.3.132:8989/ws
	opt.loginName -- websocket登录名称  wcc
	this.init() -- 初始化方法 
	this.checkCon() -- 重连状态检测
	opt.loginSuccess -- 登录成功方法 
	opt.receive -- 接收消息成功方法
	opt.procClosed -- websocket连接关闭
	opt.procError -- websocket连接错误
	opt.log -- 是否打日志,默认false
**/
function NETTY_WS(opt) {
	this.url = opt.url;
	this.loginName = opt.loginName;
	this.init();
	this.checkCon();
	this.success = opt.loginSuccess; 
	this.receive = opt.receive;
	this.procClosed = opt.procClosed;
	this.procError = opt.procError;
	this.isLog = opt.log;
}

NETTY_WS.prototype.init = function() {
	if(!"WebSocket" in window){
		alert("您的浏览器不支持webSocket");	
	}else{
		var _this = this;
		if(typeof(_this.ws) == "object"){
			_this.close();
		}
		_this.t = Math.random();
		// 打开一个 web socket
		_this.ws = new WebSocket(_this.url);
		_this.ws.onopen = function() {
			// Web Socket 已连接上，使用 send() 方法发送数据
			window.console && window.console.log("链接服务器成功");
			_this.sendBaseMsg(JSON.stringify({
					"content": {
						"src": _this.loginName,
						"msgType": "login",
						"uid": Math.round(Math.random()*10000)
					},
					"msgType": "login",
					"src": _this.loginName
				}));
			_this.heartbeat = setInterval(function() {
				_this.sendBaseMsg(JSON.stringify({
					"content": {
						"src": _this.loginName,
						"msgType": "heartbeat",
						"uid": Math.round(Math.random()*10000)
					},
					"msgType": "heartbeat",
					"src": _this.loginName
				}));
			},15000);
			_this.success(_this);
		};

		_this.ws.onmessage = function(evt) {
			var received_msg = evt.data;
			_this.logView("数据已接收..." + received_msg);
			try{
			var json = JSON.parse(received_msg);		  
			   if(json.msgType == "kickout")
			   {
					_this.destory();
					_this.receive(json.content);
			   }else if(json.msgType == "forward")
			   {
				   _this.receive(json.content);
			   }
			}catch(e)
			{
				window.console && window.console.error(e);
			}						   
			
		};

		_this.ws.onclose = function() {
			window.console && window.console.log("连接已关闭...");
			if(_this.heartbeat){
				window.clearInterval(_this.heartbeat);
			}
			if(_this.procClosed){
				_this.procClosed();
			}
		};

		_this.ws.onerror = function() {
			window.console && window.console.log("连接错误...");
			if(_this.heartbeat){
				window.clearInterval(_this.heartbeat);
			}
			if(_this.procError){
				_this.procError();
			}
		};	
	}
}
//供内部使用的关闭
NETTY_WS.prototype.close = function(){
	var _this = this;
	try{
		if(_this.ws){
			_this.ws.close();
		}
	}catch(e){
		window.console && window.console.error(e);
	}
}

//供外部使用的关闭
NETTY_WS.prototype.destory = function(){
	var _this = this;
	try{
		if(_this.ws){
			_this.ws.close();
		}
		if(_this.idx){
			window.clearInterval(_this.idx);
		}
	}catch(e){
		window.console && window.console.error(e);
	}
	
}

NETTY_WS.prototype.sendMsg = function(msg) {
	var _this = this;
	try{
		var sendMsg = JSON.stringify(
			{
				"content": msg,
				"msgType": "forward",
				"src": _this.loginName
			}
		);
		_this.logView("发送数据sendMsg： " + sendMsg);
		_this.ws.send(sendMsg);
	}catch(e){
		window.console && window.console.error(e);
	}
}
NETTY_WS.prototype.sendBaseMsg = function(msg) {
	var _this = this;
	_this.logView("发送数据sendBaseMsg： " + msg);
	try{
		if(_this.ws){
			_this.ws.send(msg);	
		}
	}catch(e){
		window.console && window.console.log(e);
	}	
}

NETTY_WS.prototype.checkCon = function() {
	var _this = this;
	var scode = {
		"0" : "连接尚未建立",
		"1" : "连接已建立，可以进行通信",
		"2" : "连接正在进行关闭",
		"3" : "连接已经关闭或者连接不能打开"
	};
	_this.idx = setInterval(function() {
		try{
			var state = _this.ws.readyState;
			if (state == 3 || state == 0) {
				_this.init(_this.url);	
			}
		}catch(e){
		    window.console && window.console.error(e);
		}
	}, 5000);
}

NETTY_WS.prototype.logView = function(msg) {
	var _this = this;
	if(_this.isLog){
		window.console && window.console.log(msg);
	}
}