function dataMsg_c2j(params){
	csSdk.acceptList.push(params);
//	  csSdk.fromCs(params);
}
function initQt( obj ){
	obj.isCs = false;
	try{
		 new QWebChannel(qt.webChannelTransport, function(channel) {
				window.QtWebObj = channel.objects.QtWebObj;
				obj.isCs = true
				csSdk.sieLog({
					"type": 3,
					"content":"============ QWebChannel初始化完成  =========="
				})
			});
        }catch(e){
           console && console.log(e,"QWebChannel 加载异常：：");
        }
}


/**
 * funcMap: c2j的消息编号
 * 	100002：检测业务服务器连通
 *  100003：登陆流媒体服务器响应通知
 *  100101：获取会议窗口信息
 *  100201：获取指定用户业务信息
 *  100301：会议状态通知
 *  100302：录像状态通知
 *  100400: 语音转写显示
 */

function CsSdk()
{
	var _this = this;
	this.funcMap = {
		"100002":"testNetResp",
		"100003":"loginSieResp",
		"100101": "gMLInfo",
		"100201":"getSInfo",
		"100301":"notifyMeetingStatus",
		"100302":"notifyMeetingRecord",
		"100400":"notifyVoiceContent",
		"100601": "messageResponse"
	};
	
	this.toCsMegobj={};
	this.acceptList = [];//接受到c端消息存放的list
    //将接受到的消息逐条执行，防止消息多时发生阻塞
	_this.acceptCMsgTimer = "";
    $.JSQueue(this.acceptList, _this.acceptCMsgTimer, function(params){
    	_this.fromCs(params)
    })
    initQt(this);
}
var csSdk = new CsSdk();
CsSdk.prototype.init = function(){
	try{
		var _this = this;
		var json = JSON2.parse(platParams.platEnt.entParams);
		var extranetHttp = json.extranetHttp;
		if(extranetHttp){
			extranetHttp = extranetHttp.split("/");
			extranetHttp = "http://"+extranetHttp[2];
		}
		_this.userParams = {
			"user": {
				"domainCode": platParams.loginUser.domainCode,
				"name": platParams.loginUser.name,
				"imgUrl": $.getImgUrl(platParams.loginUser.imgUrl),
				"userCode": platParams.loginUser.userCode,
				"sessionId": platParams.sessionId
			},
			"mediaServer":{
				"ip":json.extranet,
				"port":json.extranetPort,
				"domainCode":json.domainCode,
				"httpUrl": extranetHttp
			}
		}
	}catch(e){alert(e)}
}
/**
 * js调用客户端方
 * @param {} msg 调用参数
 */
CsSdk.prototype.toCs = function(fff,msg){
	try{
		var _this = this;
		var sessionId = Math.floor(Math.random() * 100)+1;
		var params = {req:fff*1,sessionID: sessionId,msg:JSON2.stringify(msg)};
		var opt = JSON2.stringify(params);
		_this.toCsMegobj[sessionId] = {"req": fff*1,msg: msg}
		_this.log(opt,"to cs send msg : ")    
		if(_this.isCs === true)
		{
			window.QtWebObj.dataMsg_j2c(opt);
		}else{
		   //非客户端模式
		   _this.customToCs(opt);
		}
	}catch(e){alert(e)}
}


/**
 * 无客户端模式调用方法
 * @param {} msg 调用参数
 */
CsSdk.prototype.customToCs = function(opt){
	var _this = this;
	_this.log(opt,"【CsSdk.prototype.customToCs 】")
}

/**
 * js收到客户端方法调用
 * @param {} msg 调用参数
 */
CsSdk.prototype.fromCs = function(msg){
	try{
		var _this =this;
		_this.log(msg,"recv msg : ")
		_this.snedMsgResponse({
			"reqMsg": msg.req,
			"sessionID": msg.sessionID
		});
		if(msg.req)
		{
			var opts = JSON2.parse(msg.msg);
			if(_this[_this.funcMap[msg.req]]){
				_this[_this.funcMap[msg.req]](opts);
			}else{
				_this.log(msg,"fromCs funcMap  req 未找到指定方法 : ")
			}
		}
	}catch(e){alert(e)}
}
/**
 * 日志方法
 * @param {} obj 日志内容
 * @param {} title 日志标题
 */
CsSdk.prototype.log = function(obj,title){
	var _this = this;
	console && console.log(title,obj);
}
/**
 * 业务主动调用客户端测试到指定网络是否可用，
 * @param {} url 业务提供测试网络用url
 */
CsSdk.prototype.testNet = function(url){
	var _this = this;
	_this.toCs(100001,{url:url})
}

/**
 * 测试网络结果
 * @param {} opts 参数
 */
CsSdk.prototype.testNetResp = function(opts){
	var _this = this;
}

/**
 * 查询参会人信息
 * @param {} opts 参数
 */
CsSdk.prototype.queryMeetingMemberList = function(opts){
	var _this = this;
}

/**
 * 登陆流媒体服务器响应通知
 * @param {} opts 参数
 */
CsSdk.prototype.loginSieResp = function(opts){
	try{
		var _this = this;
		if(opts){
			var msg = opts;
			_this.loginRespStatus = msg.code;
		}
	}catch(e){_this.log(e,"loginSieResp 异常: ")}
}


/**
 * 查询会议窗口，初始参数
 * @param {} opts 返回参数
 */
CsSdk.prototype.queryMeetingWinParams = function(opts){
	var _this = this;
}

/**
 * 会议状态通知
 * @param {} opts 返回参数
 */
CsSdk.prototype.notifyMeetingStatus = function(opts){
	try{
		var _this = this;
		if(opts && opts.status == 0){
			_this.log(JSON2.stringify(opts),"notifyMeetingStatus 会议状态通知 : ");
		}else if(!opts || opts.status == 1){//会议结束
			_this.log(JSON2.stringify(opts),"notifyMeetingStatus 会议状态通知 : ");
		}else if(!opts || opts.status == 3){//会议失败
			alert("会议开启失败");
		}
	}catch(e){_this.log(e,"notifyMeetingStatus 异常: ")}
}

/**
 * 语音转写内容
 * @param {} opts 返回参数
 */
CsSdk.prototype.notifyVoiceContent = function(opts){
	var _this = this;
	_this.log(JSON2.stringify(opts),"notifyVoiceContent 语音转写: ")
}

/**
 * 发起会议成功后，获取指定用户业务信息
 * @param {} opts 返回参数
 *   serviceCode 必须能区分是什么业务场景下发起的开会请求 所以做如下约定： 
   *  serviceCode需要以“固定的业务字符串”+“_”开头编码如下
   * 	"os_1001":组织架构中开启会议，使用此业务码,
	     "friend_1001":常用联系人中开启会议，使用此业务码,
	     "groupUser_1001":群组开启会议，使用此业务码
 */
CsSdk.prototype.getSInfo = function(opts){
	var _this = this;
	if(opts){
		//alert(JSON2.stringify(opts))
		if(opts.serviceCode){
			var serC = opts.serviceCode.split("_");
			_this[serC[0]+"_getSInfo"](opts);
		}
		
	}
}

/**
 *录像开启与关闭通知
 * @param {} opts
 */
CsSdk.prototype.notifyMeetingRecord = function(opts){
	var _this = this;
	if(opts){
		if(opts.status == 1){
			_this.log(JSON2.stringify(opts),"notifyMeetingRecord 会议录像通知 : ");   
		}
	}
}


/**
 * 发起会议成功后，获取指定用户业务信息
 * @param {} opts 返回参数
 *   serviceCode 必须能区分是什么业务场景下发起的开会请求 所以做如下约定： 
   *  serviceCode需要以“固定的业务字符串”+“_”开头编码如下
   * 	"os_1001":组织架构中开启会议，使用此业务码,
	     "friend_1001":常用联系人中开启会议，使用此业务码,
	     "groupUser_1001":群组开启会议，使用此业务码
 */
CsSdk.prototype.gMLInfo = function(opts){
	var _this = this;
	if(opts){
		if(opts.serviceCode){
			var serC = opts.serviceCode.split("_");
			_this[serC[0]+"_gMLInfo"](opts);
		}
		
	}
}


/**
 * 	获取会议窗口信息
 * @param {} opts 返回参数
 *  serviceCode: 业务识别码
 */
CsSdk.prototype.getMeetingLayoutInfo = function(opts){
	var _this = this;
	if(opts){
		_this[opts.serviceCode](opts)
	}
}



/**
   *通知主窗口大小
   * @param {} opts 通知主窗口大小
 */
CsSdk.prototype.sendSettingWindow = function(opts){
	var _this = this;
	_this.toCs(100100,opts);
}

/**
 * 初始化信息 用户及sie信息
 */
CsSdk.prototype.sendConfig = function(){
	var _this = this;
	_this.sieLog({
		"type": 1,
		"content":"通知客户端用户信息：："+JSON2.stringify(_this.userParams)
	})
	_this.toCs(100200,_this.userParams);
}
/**
   *开始会议
   * @param {} opts 会议参数
   * serviceCode 必须能区分是什么业务场景下发起的开会请求 所以做如下约定： 
   *  serviceCode需要以“固定的业务字符串”+“_”开头编码如下
	     "os_1001":组织架构中开启会议，使用此业务码,
	     "friend_1001":常用联系人中开启会议，使用此业务码,
	     "groupUser_1001":群组开启会议，使用此业务码
 */
CsSdk.prototype.startMeeting = function(opts){
	var _this = this;
	// {serviceCode:xxx,meetName:xxx,userList:[{userName:xxx,userDomainCode:xxx,userID:xxx,userType:xxx}],isReocord:0|1,mediaMode:0|1}
	_this.toCs(100300,opts);
	_this.sieLog({
		"type": 1,
		"content":JSON2.stringify(opts)
	})
	_this.startMeetingParam = opts;
}

/**
   *主动加入会议
   * @param {} opts 会议参数
   * serviceCode 必须能区分是什么业务场景下发起的开会请求 所以做如下约定： 
   *  serviceCode需要以“固定的业务字符串”+“_”开头编码如下
	     "os_1001":组织架构中开启会议，使用此业务码,
	     "friend_1001":常用联系人中开启会议，使用此业务码,
	     "groupUser_1001":群组开启会议，使用此业务码
 */
CsSdk.prototype.enterMeeting = function(opts){
	_this.toCs(100305,opts);
}

/**
 * 	结束会议
 * @param {} opts
 */
CsSdk.prototype.stopMeeting = function(opts){
	var _this = this;
	// {serviceCode:xxx,meetName:xxx,userList:[{userName:xxx,userDomainCode:xxx,userID:xxx,userType:xxx}],isReocord:0|1,mediaMode:0|1}
	_this.toCs(100303,opts);
}


/**
   * 好友列表发起会议成功后根据业务吗做相应操作
   * @param {} opts 会议参数
 */
CsSdk.prototype.friend_getSInfo = function(opts){
	var _this = this;
	// {serviceCode:xxx,meetName:xxx,userList:[{userName:xxx,userDomainCode:xxx,userID:xxx,userType:xxx}],isReocord:0|1,mediaMode:0|1}
	_this.toCs(100202,{
			"serviceCode": opts.serviceCode,
			"userList":opts.userList
		});
}
/**
   * 组织架构发起会议成功后根据业务吗做相应操作
   * @param {} opts 会议参数
 */
CsSdk.prototype.os_getSInfo = function(opts){
	var _this = this;
	// {serviceCode:xxx,meetName:xxx,userList:[{userName:xxx,userDomainCode:xxx,userID:xxx,userType:xxx}],isReocord:0|1,mediaMode:0|1}
	_this.toCs(100202,{
			"serviceCode": opts.serviceCode,
			"userList":opts.userList
		});
}

/**
   * 群组发起会议成功后根据业务吗做相应操作
   * @param {} opts 会议参数
 */
CsSdk.prototype.groupUser_getSInfo = function(opts){
	var _this = this;
	_this.toCs(100202,{
			"serviceCode": opts.serviceCode,
			"userList":opts.userList
		});
}

/**
   * 好友发起会议成功后获取会议窗口信息对cs端的响应
   * @param {} opts 会议参数
 */
CsSdk.prototype.friend_gMLInfo = function(opts){
	var _this = this;
	_this.toCs(100102,{});
}

/**
   *组织架构发起会议成功后获取会议窗口信息对cs端的响应
   * @param {} opts 会议参数
 */
CsSdk.prototype.os_gMLInfo = function(opts){
	var _this = this;
	_this.toCs(100102,{});
}

/**
   * 群组发起会议成功后获取会议窗口信息对cs端的响应
   * @param {} opts 会议参数
 */
CsSdk.prototype.groupUser_gMLInfo = function(opts){
	var _this = this;
	var entParams = JSON2.parse(platParams.platEnt.entParams);
	_this.toCs(100102,{});
}


/**
   * 收到socket通讯的语音转写通知
   * @param {} opts 语音转写
 */
CsSdk.prototype.receVoiceNotify =  function(opts){
	var _this = this;
	_this.toCs(100401,opts);
}

//检测版本
CsSdk.prototype.detectVersion =  function(opts){
	var _this = this;
	_this.toCs(100004,opts);
}

//开启智能检测
CsSdk.prototype.intellectDetect =  function(opts){
	var _this = this;
	_this.toCs(100500,opts);
}

//停止只能检测
CsSdk.prototype.stopIntellectDetect =  function(opts){
	var _this = this;
	_this.toCs(100501,opts);
}


//在客户端打印日志
CsSdk.prototype.sieLog =  function(opts){
	var _this = this;
	_this.toCs(100600,opts);
}

/**
 *c端发送消息调用js端方法，js端接受到消息后，发消息给c端接通知受到消息了
 * @param {} opts
 */
CsSdk.prototype.snedMsgResponse = function(opts){
	var _this = this;
	if(opts.reqMsg != 100601){
		_this.toCs(100601,opts);
	}
}

/**
 *js端发消息调用c端方法，c端接收到消息后，发消息给js通知收到消息了
 * @param {} opts
 */
CsSdk.prototype.messageResponse = function(opts){
	try{
		var _this = this;
//		if(csSdk._sieLog){
//			csSdk._sieLog("接收到回应 ：：messageResponse"+JSON2.stringify(opts));
//		}
		delete _this.toCsMegobj[opts.sessionID];
	}catch(e){
		csSdk.sieLog({
			"type": 1,
			"content": "messageResponse 异常：：："+e
		})
	}
}