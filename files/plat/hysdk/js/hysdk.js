var activeHyVideo;
String.prototype.replaceAll = function(src, reg) {
    return this.replace(new RegExp(src, "gm"), reg);
}
window.onresize = function(ex) {
   
};
function HY_SDK_WS(opts) {
	this.Mplayer = {};//用于缓存所有新建player
	this.sie = {};
	this.opts= {log:false};
	this.calledMt={};
	this.calledTk={};
	this.calledTC={};
	this.timeOutDuration= opts&&opts.timeOutDuration?opts.timeOutDuration:20000;
	this.errorCode = {
	    1720100001:"服务器检测到客户端网络断连 ",
		1720100002:"消息解码失败",
		1720200001:"用户名或密码错误",
		1720200002:"用户重复登录",
		1720200007:"用户不存在或用户忙",
		1720210002:"流媒体服务器故障",
		1720210005:"任务不存在",
		1720230001:"所请求的域不存在",
		1720310001:"会议服务器故障，请稍后再试 ",
		1720310002:"无法获取采集的流地址 ",
		1720310003:"会议信息会话不存在",
		1720310004:"达到最大与会人数",
		1720310006:"达到最大会议个数",
		1720310007:"用户忙",
		1720310008:"主持人不在线或忙",
		1720310009:"不支持的操作",
		1720410001:"对讲不存在",
		1720410002:"用户未授权",
		1720410003:"对讲入库失败",
		1720410004:"会议入库失败",
		1720410005:"对讲正在进行，不可删除",
		1720410006:"会议正在进行，不可删除",
		1720410007:"该账号已有客户端接听对讲",
		1720410008:"对讲已达最大人员个数限制，加入失败",
		1720410009:"对讲发言已锁定，请稍后再试 ",
		1720410010:"对讲发言未锁定，请先锁定",
		1720410010:"会议正在进行，不可修改",
		1720410011:"会议时间有误，预约失败",
		1720280001:"录像已上传，重复上传 ",
		1720410012:"会议不存在",
		1720410013:"会议没有白板分享",
		1720410014:"重复开启白板",
		1720410015:"不是白板分享发起者",
		1720410016:"会议已存在白板分享",
		1720410017:"用户不在会议中 ",
		1720510001:"集群对讲不存在 ",
		1720510002:"默认集群对讲不允许踢人",
		1720510003:"用户已存在，勿重复增加",
		1720510004:"用户不存在集群对讲中 ",
		1720510005:"集群对讲发言限时少于6秒 ",
		1720510006:"不可结束非本人的发言 ",
		1720510007:"不可删除默认集群对讲中的人员",
		1720510008:"默认集群对讲不存在",
		1720510009:"默认集群对讲不允许增加",
		1720510010:"默认集群对讲不允许删除",
		1720510011:"集群对讲名称重复",
		1720510011:"达到最大集群对讲个数 ",
		1720510012:"集群对讲人数达到最大个数",
		1720510013:"不可开始非本人的发言 ",
		1720510014:"用户数超过了lincese允许的最大量",
		1720510015:"已存在桌面采集共享者 "
	}
};
HY_SDK_WS.prototype.setConfig = function (opt) {
	this.opts = opt;	
};
HY_SDK_WS.prototype.getErrorDesc = function (code) {
	return this.errorCode[code];
};
HY_SDK_WS.prototype.init = function (opt) {
	//检查是否已经初始化，已初始化则销毁之前的对象
	this.destory();
	//初始化检查websocket连接
	this.checkCon();
	this.opts = opt;
	this.seqNo = 1;
	this.backFunc = {};
	this.sie = {userStatus:2};	//1 在线 2 不在线	
	this.log("----------------开始初始化HY_SDK_WS对象，并登录------------------------ ",JSON.stringify(opt));
	if (!"WebSocket" in window) {
			bootbox.alert("您的浏览器不支持webSocket");
	} else {
		var _this = this;
		//_this.log(_this.status);
		_this.t = Math.random();
		_this.ws = new WebSocket(_this.opts.url);
		_this.status = "default";
		_this.ws.binaryType="arraybuffer";		
		_this.ws.onopen = function () {	
			_this.status = "connected";
			_this.loginReq();
			_this.log("----------------------初始化HY_SDK_WS对象，连接建立成功，已发送登录请求----------------------");
			
		};

		_this.ws.onmessage = function (evt) {				
			try {
				var bu = evt.data;			
				var dv = new DataView(bu, 0);			
				var array = new Uint8Array(evt.data);			
				var size =  parseInt(_this.to16Str(array[0])+_this.to16Str(array[1])+_this.to16Str(array[2])+_this.to16Str(array[3]), 16);			
				var msyType =  parseInt(_this.to16Str(array[4])+_this.to16Str(+array[5])+_this.to16Str(array[6])+_this.to16Str(array[7]), 16);			
				var strSize =  parseInt(_this.to16Str(array[8])+_this.to16Str(+array[9])+_this.to16Str(array[10])+_this.to16Str(array[11]), 16);					
				var inType = (_this.to16Str(array[strSize+12])+_this.to16Str(array[strSize+13])+_this.to16Str(array[strSize+14])+_this.to16Str(array[strSize+15]));
				var innerMsgType = parseInt(inType, 16);
				var content =  _this.binayUtf8ToString(array,12,strSize+12);//String.fromCharCode.apply(null, new Uint16Array(array));
				
				var no = (_this.to16Str(array[strSize+16])+_this.to16Str(array[strSize+17])+_this.to16Str(array[strSize+18])+_this.to16Str(array[strSize+19]));
				var seqNo = parseInt(no, 16);
				//_this.log(" -------------- " + seqNo);
				var msgBody = content;
				//_this.log(" innerMsgType: "+ innerMsgType  + " msgBody: " + msgBody);
				var json = {
					"msgType": innerMsgType,
					"msgBody": JSON.parse(msgBody)
				};
				json.msgBody["seqNo"] = seqNo;
				_this.rollBack(json);	//接受消息			
			} catch (e) {
				window.console && window.console.error(e);
			}

		};

		_this.ws.onclose = function () {
			window.console && window.console.log("HY_SDK_WS 连接已关闭...");
		};

		_this.ws.onerror = function () {
			_this.status = "error";
		};
	}
};
HY_SDK_WS.prototype.initWebRtc = function () {
	var _this  = this;
	_this.log("初始化webrtc服务参数 ");
    //var server = opts.server;//"wss://192.168.2.176:8989";
	this.hyWebRtc = new hyWebRtc({
		server: _this.opts.webrtcUrl,
		plugin:"janus.plugin.cmf_agent",
		initError:function(){_this.log(" init hy webrtc error! ")},
		loginName:_this.opts.loginName,
		log:_this.opts.log,
		strServerIP: _this.opts.svrIp,
		nServerPort: _this.opts.svrPort,
		iceServers : _this.opts.iceServers,
		hySdk:_this
	});
	this.hyWebRtc.init();
   		
}  
HY_SDK_WS.prototype.isConnected = function (opts) {
	return this.hyWebRtc.isConnected();
} 

HY_SDK_WS.prototype.callMeeting = function (opts) {
	this.log("主叫发起会议：" +JSON.stringify(opts));
	opts.hySdk = this;
	opts.meetingRole = 1;
	this.callMt = new HY_MEETING(opts);
	this.log("主叫会议对象：", this.callMt);
	return this.callMt;
} 


HY_SDK_WS.prototype.exitMeetOrTalk = function(currMt, callBack){
	var _this = this;
	var arr = Object.keys(_this.calledMt);
	var len = arr.length;
	
	var talkarr = Object.keys(_this.calledTk);
	var talklen = talkarr.length;
	
	var channelarr = Object.keys(_this.calledTC);
	var channellen = channelarr.length;
	if(_this.callMt){
		if(_this.callMt){
			_this.callMt.stopMeeting(function(){
				callBack&&callBack();
			});
		}
	}else if(len> 1){
		for(var key in _this.calledMt){
			len--;
			if(key !=(currMt.nMeetingID+"_"+currMt.strMeetingDomainCode)){
				_this.calledMt[key].quitMeeting(function(){
					if(len == 0){
						callBack&&callBack();
					}
				});
			}
		}
	}else if(_this.callTk){
		_this.callTk.quitReq(function(){
			callBack&&callBack();
		});
	}else if(talklen> 1){
		for(var key in _this.calledTk){
			len--;
			if(key !=(currMt.nTalkbackID+"_"+currMt.strTalkbackDomainCode)){
				_this.calledTk[key].quitReq(function(){
					if(len == 0){
						callBack&&callBack();
					}
				});
			}
		}
	}else if(_this.callTC){
		_this.callTC.leaveReq(function(){
			callBack&&callBack();
		});
	}else if(channellen> 1){
		for(var key in _this.calledTC){
			len--;
			if(key !=(currMt.nTrunkChannelID+"_"+currMt.strTrunkChannelDomainCode)){
				_this.calledTC[key].leaveReq(function(){
					if(len == 0){
						callBack&&callBack();
					}
				});
			}
		}
	} else{
		callBack&&callBack();	
	}
	
} 

HY_SDK_WS.prototype.beforeJoing = function(){
	var _this = this;
} 

HY_SDK_WS.prototype.beforeRefuse = function(calledMt){
	
};

HY_SDK_WS.prototype.calledMeeting = function (opts) {
	

	/*var strTrunkPara;
	if(opts.meet.strTrunkPara){
		strTrunkPara = JSON.parse( opts.meet.strTrunkPara);
		opts.lstMeetingUserInfo = strTrunkPara.lstMeetingUserInfo;
	}*/
	this.log("calledMeeting::",JSON.stringify(opts));
	opts.hySdk = this;
	opts.meetingInfo = opts.meet;
	opts.meetingRole = 2;
	opts.nSetSpeakForAll = 1;
	var calledMt = new HY_MEETING(opts);
	calledMt.nMeetingID = opts.meet.nMeetingID;
	calledMt.strMeetingDomainCode = opts.meet.strMeetingDomainCode;
	//this.callMt.calledStart();
	if(opts.meet.defaultJoin){
		this.agree(calledMt);
	}else{
		this.agreeMeetBox(calledMt);
	}
	this.log("######", calledMt);
	return calledMt;
}
HY_SDK_WS.prototype.agreeMeetBox = function (calledMt) {
	var _this  = this;
	var opts =calledMt.opt;
	var msg = opts.meet.strInviteUserName;
	var msg2 = opts.meet.strMeetingName;
	calledMt.incomingDialog = bootbox.dialog({
		message:  msg+ "发起的"+msg2,
		title: "会议邀请",
		closeButton: false,
		buttons: {
			success: {
				label: "接听",
				className: "btn-success",
				callback: function() {
					clearTimeout(calledMt.callTimeOutTimer);
					calledMt.incomingDialog = null;
					//calledMt.starCapture();
					_this.agree(calledMt);
				}
			},
			danger: {
				label: "挂断",
				className: "btn-danger",
				callback: function() {
					_this.beforeRefuse(calledMt);
					calledMt.incomingDialog = null;
					calledMt.joinMeetingReq(0, function(res){
						calledMt.joinCallBack_0(res);
					});
					var key = calledMt.nMeetingID+"_"+calledMt.strMeetingDomainCode;
					delete _this.calledMt[key];
				}
			}
		}
	});
	clearTimeout(calledMt.callTimeOutTimer);
	calledMt.callTimeOutTimer = setTimeout(function(){
		if(calledMt.incomingDialog){
			calledMt.incomingDialog.modal('hide');
			calledMt.incomingDialog = null;
		}
		calledMt.joinMeetingReq(0, function(res){
			calledMt.joinCallBack_0(res);
		});
	},_this.timeOutDuration);
	
}

HY_SDK_WS.prototype.agree = function (calledMt) {
	var _this  = this;
	_this.getMeetingInfoReq({strDomainCode: calledMt.strMeetingDomainCode,
			nMeetingID: calledMt.nMeetingID
		},function(res){
			if(res.nResultCode == 0){
				_this.beforeJoing();
				_this.exitMeetOrTalk(calledMt,function(){
					calledMt.opt.meetingInfo.lstMeetingUserInfo = res.listUser;
					
					var flag = calledMt.opt.meetingInfo.lstMeetingUserInfo.some(function(user,index,arr){
						var key =user.strUserDomainCode+"_"+user.strUserID
						if(key == (_this.sie.strUserDomainCode+"_"+_this.opts.loginName)){
							return user;
						}
					});
					if(!flag||flag==0){
						calledMt.opt.meetingInfo.lstMeetingUserInfo.push({
							strUserDomainCode:_this.sie.strUserDomainCode,
							strUserID: _this.opts.loginName,
							strUserName: _this.opts.userName
						});
					}
					_this.drawCalledPanel(calledMt);
				});
			}else{
				console.error("获取会议信息失败：：：",res);
			}
	});
}
HY_SDK_WS.prototype.refuse = function (opts) {
	var _this  = this;
}
HY_SDK_WS.prototype.drawCalledPanel = function (calledMt) {
	this.log("drawCalledPanel  exce::请重载此方法");
}

HY_SDK_WS.prototype.startCapture = function (opts) {
	try{
		var _this  = this;
		_this.log(" 开始本地采集：",opts);
	    //var server = opts.server;//"wss://192.168.2.176:8989";
		var map = this.hyWebRtc.startCapture(opts);
	   	opts.videoNode.attach = map;
		opts.videoNode.setVideoParam(opts);	
		return map;
	}catch(e){console.error("HY_SDK_WS.prototype.startCapture:::"+e)}
} 

HY_SDK_WS.prototype.playRtc = function (opts) {
	var _this  = this;
	_this.log(" 开始用rtc模式播放：" ,opts);
    //var server = opts.server;//"wss://192.168.2.176:8989";
	var map = this.hyWebRtc.playAttach(opts);
	opts.videoNode.attach = map;
	opts.videoNode.setVideoParam(opts);
	return map;
	
} 
HY_SDK_WS.prototype.close = function () {
	var _this = this;
	try {
		clearInterval(_this.idx);
		if (_this.ws) {
			_this.ws.close();
		}
	} catch (e) {
		window.console && window.console.error(e);
	}
};

//供外部使用的关闭
HY_SDK_WS.prototype.destory = function (callback) {
	var _this = this;
	try {
		if (_this.ws) {	
			_this.log("HY_SDK_WS.prototype.destory " ,_this.ws);
			_this.logout();
			_this.ws.close();
			if(_this.sie)
			{
				_this.sie.userStatus = 2;
			}
			if(callback)
			{
				callback();
			}
		}
		if (_this.idx) {
			window.clearInterval(_this.idx);
		}
	} catch (e) {
		window.console && window.console.error(e);
	}

};
HY_SDK_WS.prototype.logout = function () {
	var _this = this;
	try {
		if (_this.ws) {			
			_this.sendMsg({					
					msgType: 54005,
					msgBody: JSON.stringify({
						"strUserTokenID": _this.sie.strUserTokenID
			})});			
			//_this.destory();
		}
	} catch (e) {
		window.console && window.console.error(e);
	}
};
HY_SDK_WS.prototype.getCommonMsg = function (json,seqNo) {
	try{
		var _this = this;
		var seq = 0;
		if(seqNo && seqNo>0)
		{
			seq = seqNo;
		}
		var res = _this.string2buffer(json);
		_this.log("发送消息给到流媒体服务器：",json);
		var buffer = new ArrayBuffer(res.byteLength);
		var dv = new DataView(res, 0);	
		var size = res.byteLength;
		dv.setUint32(0, size-4);
		dv.setUint32(4, 35);
		dv.setUint32(8, size-25);
		dv.setUint32(size-13, json.msgType);			
		dv.setUint32(size-9, seq);
		dv.setUint32(size-5, 1);
		return dv;
	}catch(e){
	  console && console.error("初始化通用消息错误",e,json);
	}
};
HY_SDK_WS.prototype.rollBack = function (json) {
	try{
		var _this = this;	
        _this.log("收到流媒体发送的消息：",json);
        var body = json.msgBody;
		switch (json.msgType) {
			//用户不存在或用户忙 ,未登录
			case 1720200007:
				_this.userReConnectReq();
				break;	
				//3.1.	用户注册响应
			case 54003:
			   // alert(2);
				_this.loginResp(body);
				_this.opts.loginSuccess(body);
				break;
				//4.1.	获取域列表响应
			case 265:
				_this.getDomainResp(body);
				break;
				//4.2.	获取组列表响应
			case 4846:
				_this.getDomainGroupResp(body);
				break;
				//4.3.	按组获取固定设备列表响应
			case 4848:
				_this.getDeviceResp(body);
				break;
				//根據域编码获取设备列表响应
			case 4901:
				_this.getDeviceByDomainResp(body);
				break;
				//4.5.	获取固定设备播放地址响应
			case 384:
				_this.getDeviceUrlResp(body);
				break;
				//3.9.	用户状态通知
			case 54035:
				_this.notifyUserStatus(body);
				break;
				//3.5.	踢出用户响应
		    case 54019:
		        _this.kickOutResp(body);
		        break;
		        //3.3.	用户保活
		     case 54011:
		        _this.sendHeatbeatResp(body);
		        break;
		     case 54033:
		     	_this.setUserUseIPCRsp(body);
		     	 break;
     	     case 54403:
		     	_this.startMeetingRsp(body);
		     	 break;
		     case 54405:
		     	_this.notifyInviteUserJoinMeeting(body);
		     	 break;	
	     	 case 54411:
		     	_this.notifyPeerUserMeetingInfo(body);
		     	 break;	
	     	 case 54409:
	     		_this.joinMeetingRsp(body);
	     	 	break;	
	     	 case 54433:
	     		_this.stopMeetingRsp(body);
	     	 	break;	
     	 	 case 54447:
	     		_this.notifyMeetingStatusInfo(body);
	     	 	break;	
     	 	 case 4715:
	     		_this.getMobileDynamicUrlRsp(body);
	     	 	break;	
		        //3.6.	通知用户被踢出
		     case 54021:
		        _this.notifyKickOut(body);
		        break;
		        //3.7.	获取人员状态
		      case 54025:
		        _this.queryUserListResp(body);
		        break;
		         //7.5.	邀请别人参加会议
		      case 54415:
		        _this.inviteUserMeetingRsp(body);
		        break;
		          //7.7	请出会议
		      case 54423:
		        _this.kickMeetingUserRsp(body);
		        break;
		            //7.8.	通知用户被请出会议
		      case 54425:
		        _this.notifyKickUserMeeting(body);
		        break;
		          //7.13.	会议禁言/解禁言
		      case 54471:
		        _this.meetingSpeakSetRsp(body);
		        break;
	       	  case 54429:
		        _this.quitMeetingRsp(body);
		        break;
	          case 386:
		        _this.startRecordRsp(body);
		        break;
	          case 388:
		        _this.stopStorageRsp(body);
		        break;
	       	  case 397:
		        _this.getRecordingStatusRsp(body);
		        break;
		      case 54029:
		        _this.setUserFriendRsp(body);
		        break;
	          case 55047:
		        _this.setUseNotifyUrlRsp(body);
		        break;
		      case 423:
		        _this.getRecordUrlListSTCRsp(body);
	         	break;
     	 	  case 358:
		        _this.PTZControlRsp(body);
	         	break;
	         case 54501:
		        _this.notifyMsg(body);
	         	break;
	         case 54521:
		        _this.sendMsgToMultiUserResp(body);
	         	break;
	         case 55230:
	         	_this.cancelInviteUserMeetingRsp(body);
	         	break;
	         case 54455:
	         	_this.getMeetingInfoRsp(body);
	         	break;
         	case 55214:
	         	_this.beginMeetingRecordRsp(body);
	         	break;
	         case 55713:
	         	_this.stopMeetingRecordRsp(body);
	         	break;
	         case 54495:
	         	_this.meetingUserRaiseRsp(body);
	         	break;
	         case 54497:
	         	_this.notifyMeetingRaiseInfo(body);
	         	break;
          	 case 55266:
	         	_this.lockMeetingRsp(body);
	         	break;
	         case 55236:
	         	_this.setMeetingKeynoteSpeakerRsp(body);
	         	break;
          	 case 55248:
	         	_this.turnOnOffCameraRsp(body);
	         	break;
         	 case 55250:
	         	_this.notifyTurnOnOffCamera(body);
	         	break;
	         case 54451:	
	         	_this.getMeetingListResp(body);
	         	break;
	         case 55232:	
	         	_this.notifyInviteUserCancelJoinMeeting(body);
	         	break;
	         case 54459:	
	         	_this.delMeetingInfoResp(body);
	         	break;
	         case 54015:
	            _this.userReConnectResp(body);
	            break;
	         case 54515:
	            _this.offlineMsg(body);  
	            break;
          	 case 54487:
	            _this.setPredetermineMeetingResp(body);  
	            break;
	          case 419:
	            _this.playbackSTCRsp(body);  
	            break;
	          case 54039:
	            _this.setKeepAliveIntervalResp(body);  
	            break; 
	          case 54303:
	            _this.startTalkbackRsp(body);  
	            break; 
	          case 54305:
	            _this.notifyUserJoinTalkback(body);  
	            break;
	          case 54309:
	            _this.joinTalkbackRsp(body);  
	            break;
	          case 54311:
	            _this.notifyTalkbackPeerUserOption(body);  
	            break;
	          case 54319:
	            _this.quitTalkbackRsp(body);  
	            break;
              case 54321:
	            _this.notifyTalkbackStatusInfo(body);  
	            break;
	          case 54331:
	            _this.getTalkbackInfoRsp(body);  
	            break;
              case 55244:
	            _this.setMeetingDesktopSharerRsp(body);  
	            break;
	          case 55254:
	            _this.getMeetingDesktopShareAuthRsp(body);  
	            break;
           	  case 54327:
	            _this.getTalkbackListRsp(body);  
	            break;
			  case 55415:
	            _this.createTrunkChannelRsp(body);  
	            break;
           	  case 55423:
	            _this.deleteTrunkChannelRsp(body);  
	            break;
	          case 55427:
	            _this.queryTrunkChannelListRsp(body);  
	            break;
              case 55419:
	            _this.modifyTrunkChannelRsp(body);  
	            break;
	          case 55431:
	            _this.getTrunkChannelInfoRsp(body);  
	            break;
	          case 55435:
	            _this.joinTrunkChannelRsp(body);  
	            break;
	          case 55459:
	            _this.notifyTrunkChannelStatus(body);  
	            break;
	          case 55439:
	            _this.leaveTrunkChannelRsp(body);  
	            break;
              case 55463:
	            _this.kickoutTrunkChannelRsp(body);  
	            break;
	          case 55469:
	            _this.inviteUserTrunkChannelRsp(body);  
	            break;
	          case 55465:
	            _this.notifyUserKickTrunkChannel(body);  
	            break; 
	          case 55471:
	            _this.notifyUserInviteTrunkChanne(body);  
	            break;
	          case 54357:
	            _this.getTalkbackRecordInfoRsp(body);  
	            break;
	          case 54335:
	            _this.delTalkbackInfoRsp(body);  
	            break;
	          case 54341:
	            _this.kickTalkbackUserRsp(body);  
	            break;
	          case 54315:
	            _this.inviteUserTalkbackRsp(body);  
	            break;
	          case 54351:
	            _this.talkbackSpeakSetRsp(body);  
	            break;
	          case 54337:
	            _this.notifyKickUserTalkback(body);  
	            break;
              case 54353:
	            _this.notifyUserSpeakSet(body);  
	            break;
	          case 55443:
	            _this.getSpeakRightRsp(body);  
	            break;
	          case 55447:
	            _this.startTrunkChannelSpeakRsp(body);  
	            break;
	          case 55451:
	            _this.stopTrunkChannelSpeakRsp(body);  
	            break;
	          case 55475:
	            _this.observerTrunkChannelRsp(body);  
	            break;
	          case 55455:
	            _this.trunkChannelRecordControlRsp(body);  
	            break;
			default:
				_this.log(" 未知消息！", json);
		}
	}catch(e){
	  console && console.error(" rollBack ",e,json);
	}
};
HY_SDK_WS.prototype.offlineMsg = function(msg) {
	this.log(" HY_SDK_WS.prototype.offlineMsg ",msg);
};

HY_SDK_WS.prototype.loginReq = function() {
	var _this = this;
	try{		
		var m = {					            
					msgType: 54001,
					msgBody: JSON.stringify({
						"strUserID": _this.opts.loginName,
						"strUserName": _this.opts.userName,
						"nDevType": 4,
						"strMacAddr": _this.mac,
						"strServerIP": _this.opts.svrIp,
						"nServerPort": _this.opts.svrPort,
						"nPriority": 0
			})};
       		//_this.log(" HY_SDK_WS.prototype.loginReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" loginReq ",e);
	}
};

HY_SDK_WS.prototype.loginResp = function (json) {
	try{
		var _this = this;		
		//_this.log(" ============= "+ (json.nResultCode === 0));
		if(json.nResultCode === 0)
		{
			_this.sie.strUserDomainCode = json.strUserDomainCode;
			_this.sie.strUserDomainName = json.strUserDomainName;
			_this.sie.strUserTokenID = json.strUserTokenID;
			_this.sie.userStatus = 1;
			_this.setKeepAliveIntervalReq();
		}	
		_this.log(" 用户登录返回结果 : ",_this);
	}catch(e){
	  console && console.error(" HY_SDK_WS.prototype.loginResp ",e,json);
	}
};
HY_SDK_WS.prototype.kickOut = function(msg) {
	var _this = this;
	try{		
		var m = {					
					msgType: 54017,
					msgBody: JSON.stringify({
						"strUserID": _this.opts.loginName,
						"strUserName": _this.opts.userName,
						"strMacAddr":_this.mac,
						"nDevType": 4,
						"strKickUserTokenID": msg.strUserTokenID.split(":")[1],
						"strKickReason": ""
			})};
       		_this.log(" 踢出用户： "+ msg.strUserTokenID);	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" kickOut ",e);
	}
};
HY_SDK_WS.prototype.kickOutResp = function (json) {
	try{
		var _this = this;		
		if(json.nResultCode === 0)
		{
			_this.loginReq();
		}		
		_this.log(" HY_SDK_WS.prototype.kickOutResp HY_SDK_WS : ",_this);
	}catch(e){
	  console && console.error(" HY_SDK_WS.prototype.kickOutResp ",e,json);
	}
};

HY_SDK_WS.prototype.getDomainReq = function( rollBack ) {
	var _this = this;
	try{
        _this.getDomainResp = rollBack;		
		var m = {					
					msgType: 264,
					msgBody: JSON.stringify({
						"strDomainCode": _this.sie.strUserDomainCode,
						"nDomainType":0
			})};
       	//_this.log(" HY_SDK_WS.prototype.getDomainReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" getDomainReq ",e);
	}
};

HY_SDK_WS.prototype.getDomainResp = function (json) {
	this.log(" HY_SDK_WS.prototype.getDomainResp " + json);
};

HY_SDK_WS.prototype.getDomainGroupReq = function(domainCode,rollBack) {
	var _this = this;
	try{	
        _this.getDomainGroupResp = rollBack;		
		var m = {					
					msgType: 4845,
					msgBody: JSON.stringify({
						"domainCode": domainCode
			})};
       //	_this.log(" HY_SDK_WS.prototype.getDomainGroupReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" getDomainGroupReq ",e);
	}
};

HY_SDK_WS.prototype.getDomainGroupResp = function (json) {
	this.log(" HY_SDK_WS.prototype.getDomainGroupResp " + json);
};

HY_SDK_WS.prototype.getDeviceReq = function(opts,rollBack) {
	var _this = this;
	_this.log("获取设备：",opts);
	try{	
        _this.getDeviceResp = rollBack;		
		var m = {					
					msgType: 4847,
					msgBody: JSON.stringify({						
						domainCode:opts.domainCode,
						groupCode:opts.groupCode,
						nPage:opts.nPage,
						nSize:opts.nSize
			})};
       //	_this.log(" HY_SDK_WS.prototype.getDeviceReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" getDeviceReq ",e);
	}
};

HY_SDK_WS.prototype.getDeviceResp = function (json) {
	this.log(" HY_SDK_WS.prototype.getDeviceResp " + json);
};
HY_SDK_WS.prototype.getDeviceByDomainReq = function(opts,rollBack) {
	var _this = this;
	try{	
        _this.getDeviceByDomainResp = rollBack;		
		var m = {					
					msgType: 4900,
					msgBody: JSON.stringify({						
						strDomainCode:opts.domainCode,
						nPage:opts.nPage,
						nSize:opts.nSize
			})};
       //	_this.log(" HY_SDK_WS.prototype.getDeviceResp ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" getDeviceResp ",e);
	}
};

HY_SDK_WS.prototype.getDeviceByDomainResp = function (json) {
	this.log(" HY_SDK_WS.prototype.getDeviceByDomainResp " + json);
};

HY_SDK_WS.prototype.getDeviceUrlReq = function(opts,rollBack) {
	var _this = this;
	_this.log("获取设备播放地址：",opts);
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
					msgType: 383,
					msgBody: JSON.stringify({					
						serviceUrl:{
							strDomainCode :opts.strDomainCode,
							strDeviceCode  :opts.strDeviceCode,
							strChannelCode :opts.strChannelCode,
							strStreamCode  :opts.strStreamCode
						},
						tokenID:_this.sie.strUserTokenID

			})};
//       	_this.log(" HY_SDK_WS.prototype.getDeviceUrlReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m,_this.seqNo));			
	}catch(e){
	  console && console.error(" getDeviceUrlReq ",e);
	}
};

HY_SDK_WS.prototype.getDeviceUrlResp = function (json) {
	this.log(" HY_SDK_WS.prototype.getDeviceUrlResp ", json);
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

HY_SDK_WS.prototype.queryUserListReq = function(opts,rollBack) {
	var _this = this;
	try{	
        _this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;	
		var m = {					
					msgType: 54023,
					msgBody: JSON.stringify({					
							strUserDomainCode :opts.strDomainCode,
							listUser  :opts.listUser

			})};
       //	_this.log(" HY_SDK_WS.prototype.queryUserListReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m, _this.seqNo));			
	}catch(e){
	  console && console.error(" queryUserListReq ",e);
	}
};
HY_SDK_WS.prototype.queryUserListResp = function (json) {
	this.log(" HY_SDK_WS.prototype.queryUserListResp ", json);
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

HY_SDK_WS.prototype.setUseNotifyUrlReq = function(opts,rollBack) {
	var _this = this;
	try{	
        _this.setUseNotifyUrlRsp = rollBack;		
		var m = {					
					msgType: 55045,
					msgBody: JSON.stringify({	
							strUserTokenID:opts.strUserTokenID,
							strNotifyUrl:opts.strNotifyUrl,
							strNotifyDomainCode:opts.strNotifyDomainCode
			})};
       //	_this.log(" HY_SDK_WS.prototype.setUseNotifyUrlReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" setUseNotifyUrlReq ",e);
	}
};
HY_SDK_WS.prototype.setUseNotifyUrlRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.setUseNotifyUrlRsp ", json);
};



//开始录像
HY_SDK_WS.prototype.startStorageReq = function(opt, rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 385,
				msgBody: JSON.stringify({
					serviceUrlList:opt.serviceUrlList ,
					nRecordType:opt.nRecordType ? opt.nRecordType: 2,
					nRecordDomainType:opt.nRecordDomainType ?opt.nRecordDomainType:1,
					nRecordLocation:opt.nRecordLocation ?opt.nRecordLocation:1,
					strScheduleID:opt.strScheduleID ?opt.strScheduleID:"",
					strFileName:opt.strFileName?opt.strFileName:uuid(),
					unDuration:opt.unDuration? opt.unDuration:0,
					nIsRepeat:opt.nIsRepeat? opt.nIsRepeat:1
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" startStorageReq ",e);
	}
}

//开始响应
HY_SDK_WS.prototype.startRecordRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.startRecordRsp ", json);
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//停止录像
HY_SDK_WS.prototype.stopStorageReq = function(opt, rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 387,
				msgBody: JSON.stringify({
					serviceUrl:opt.serviceUrl ,
					nRecordLocation:opt.nRecordLocation ? opt.nRecordLocation: 1,
					strDomainCode:opt.strDomainCode ?opt.strDomainCode:1,
					strRecordID:opt.strRecordID
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" stopStorageReq ",e);
	}
}

//停止录像响应
HY_SDK_WS.prototype.stopStorageRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.stopStorageRsp ", json);
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//获取设备状态
HY_SDK_WS.prototype.getRecordingStatus = function(opt, rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 396,
				msgBody: JSON.stringify({
					serviceUrl:opt.serviceUrl
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" getRecordingStatus ",e);
	}
}

//查询设备状态响应
HY_SDK_WS.prototype.getRecordingStatusRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.getRecordingStatusRsp ", json);
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

HY_SDK_WS.prototype.setUserFriendReq  = function(opts,rollBack) {
	var _this = this;
	try{	
        _this.setUserFriendRsp = rollBack;		
		var m = {					
					msgType: 54027,
					msgBody: JSON.stringify({
						strUserTokenID:opts.strUserTokenID,
						strUserDomainCode:opts.strUserDomainCode,
						strUserID:opts.strUserID,
						listUser:opts.listUser
			})};
       	//_this.log(" HY_SDK_WS.prototype.setUserFriendReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" setUserFriendReq ",e);
	}
};
HY_SDK_WS.prototype.setUserFriendRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.setUserFriendRsp ", json);
};

//获取固定设备录像
HY_SDK_WS.prototype.getRecordUrlListCTSReq = function(opt, rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 422,
				msgBody: JSON.stringify({
					serviceUrl:opt.serviceUrl,
					tokenID: _this.sie.strUserTokenID,
					strRecordLocation:opt.strRecordLocation ? opt.strRecordLocation: "1",
					nRecordDomain:opt.nRecordDomain ? opt.nRecordDomain: 1,
					unRecordType:opt.unRecordType ? opt.unRecordType: 2,
					strStartTime: opt.strStartTime,
					strEndTime: opt.strEndTime,
					nPage:opt.nPage?opt.nPage:0,
					nSize: opt.nPage?opt.nPage:100
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" getRecordUrlListCTSReq ",e);
	}
}

//查询设备状态响应
HY_SDK_WS.prototype.getRecordUrlListSTCRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.getRecordUrlListSTCRsp ", json);
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


HY_SDK_WS.prototype.sendMsgToMultiUserReq = function(opt, rollBack){
	var _this = this;
	_this.log(" 发送自定义消息请求参数：",JSON.stringify(opt));
	try{
		_this.sendMsgToMultiUserResp = rollBack;
		var m = {					
				msgType: 54519,
				msgBody: JSON.stringify({
					        nMsgSessionID:1,
							strMsg :opt.strMsg,
							nImportant:opt.nImportant,
							listUser  :opt.listUser

			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" sendMsgToMultiUserReq ",e);
	}
}

HY_SDK_WS.prototype.sendMsgToMultiUserResp = function (json) {
	this.log(" HY_SDK_WS.prototype.sendMsgToMultiUserResp ", json);
};

HY_SDK_WS.prototype.notifyMsg = function (json) {
	this.log(" HY_SDK_WS.prototype.notifyMsg ", json);
};

HY_SDK_WS.prototype.setKeepAliveIntervalReq = function() {
	var _this = this;
	try{	
		var m = {					
					msgType: 54037,
					msgBody: JSON.stringify({						
						strUserTokenID:_this.sie.strUserTokenID,
						nKeepAliveInterval:10
				})};
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" setKeepAliveIntervalReq ",e);
	}
};
HY_SDK_WS.prototype.setKeepAliveIntervalResp = function (json) {
	this.log(" HY_SDK_WS.prototype.setKeepAliveIntervalResp " , json);
};
HY_SDK_WS.prototype.sendHeatbeatReq = function(opts) {
	var _this = this;
	try{	
		var m = {					
					msgType: 54009,
					msgBody: JSON.stringify({						
						strUserTokenID:_this.sie.strUserTokenID
				})};
       	_this.log("发送心跳消息 ");	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" sendHeatbeatReq ",e);
	}
};
HY_SDK_WS.prototype.sendHeatbeatResp = function (json) {
	//this.log(" HY_SDK_WS.prototype.sendHeatbeatResp " , json);
	if(json.nResultCode == 1720200007)
	{
		this.userReConnectReq();
	}
};
HY_SDK_WS.prototype.notifyUserStatus= function (json) {
	this.log(" 收到推送，用户状态消息： " , json);
	if(json.nOnline == 2 && json.strUserID == this.opts.loginName)
	{
		this.sie.userStatus = json.nOnline;
		console.log(" 收到推送，用户状态消息： " , json);
		this.userReConnectReq();
	}
};

HY_SDK_WS.prototype.notifyKickOut= function (json) {
	this.log(" HY_SDK_WS.prototype.notifyKickOut " , json);
	clearInterval(this.idx);
	this.destoryAllPlay();
	this.close();
	this.opts.notifyKickOut && this.opts.notifyKickOut();
	this.notifyKickOutEx();
};
HY_SDK_WS.prototype.notifyKickOutEx= function (json) {
};


HY_SDK_WS.prototype.userReConnectReq = function () {
	this.log(" HY_SDK_WS.prototype.userReConnectReq ");
	var _this = this;
	try{	
		var m = {					
					msgType: 54013,
					msgBody: JSON.stringify({						
						strUserTokenID:_this.sie.strUserTokenID
				})};
       	//_this.log(" HY_SDK_WS.prototype.userReConnectReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" userReConnectReq ",e);
	}
};
HY_SDK_WS.prototype.userReConnectResp = function (res) {
	this.log(" HY_SDK_WS.prototype.userReConnectResp ",res);
	
};
//设置用户ipc并存储到本地
HY_SDK_WS.prototype.setUserUseIPC = function(opt, rollback){
	var _this = this;
	_this.setUserUseIPCReq(opt,rollback);
	var info = window.localStorage.getItem('HY_SDK_USER_IPC');
	if(info){
		info = JSON.parse(info);
		info.ipc = opt;
		info.deviceType = 1;
		window.localStorage.setItem('HY_SDK_USER_IPC', JSON.stringify(info));
	}else{
		window.localStorage.setItem('HY_SDK_USER_IPC', JSON.stringify({"ipc":opt,"deviceType": 1}));
	}
};
//获取本地存储的ipc信息
HY_SDK_WS.prototype.getUserUseIPC = function(opt){
	var _this = this;
	var ipcINfo = window.localStorage.getItem('HY_SDK_USER_IPC');
	if(ipcINfo){
		ipcINfo = JSON.parse(ipcINfo);
	}
	return ipcINfo;
};
//设置用户是否使用网络摄像头
HY_SDK_WS.prototype.setUserUseIPCReq = function (opt,rollBack) {
	this.log(" HY_SDK_WS.prototype.setUserUseIPCReq ::" +JSON.stringify(opt));
	var _this = this;
	_this.setUserUseIPCRsp = rollBack?rollBack: function(res){this.log(" HY_SDK_WS.prototype.setUserUseIPCRsp ::"+JSON.stringify(res))};
	try{
		if(opt){
			var m = {					
					msgType: 54031,
					msgBody: JSON.stringify({						
						strUserTokenID:_this.sie.strUserTokenID,
						strDeviceCode: opt.strDeviceCode,
						strDomainCode: opt.strDomainCode,
						strChannelCode:opt.strChannelCode,
						strStreamCode: opt.strStreamCode,
						nIsUse: opt.nIsUse
				})};
	       	_this.sendMsg(m);
		}else{
			_this.log(" HHY_SDK_WS.prototype.setUserUseIPCReq 四元组信息:: ",opt);
		}
       	//_this.log(" HHY_SDK_WS.prototype.setUserUseIPCReq ",_this.getCommonMsg(m));	
	}catch(e){
	  console && console.error(" setUserUseIPCReq ",e);
	}
};

//设置用户是否使用网络摄像头消息响应
HY_SDK_WS.prototype.setUserUseIPCRsp = function (json) {
	//console.error("*********",json);
	this.log(" HY_SDK_WS.prototype.setUserUseIPCRsp ::" +JSON.stringify(json));
};

HY_SDK_WS.prototype.setUserUsb = function(opt){
	var _this = this;
	var info = window.localStorage.getItem('HY_SDK_USER_IPC');
	if(info){
		info = JSON.parse(info);
		info.deviceType = 2;
		if(info.ipc){
			info.ipc.nIsUse = 0;
		}
		if(info.usb){
			if(info.usb.video){
				if(opt.video){
					Object.assign(info.usb.video, opt.video);
				}
			}else{
				info.usb.video = opt.video;
			}
			if(info.usb.audio){
				if(opt.audio){
					Object.assign(info.usb.audio, opt.audio);
				}
			}else{
				info.usb.audio = opt.audio;
			}
			info.usb.bitrate = opt.bitrate
			//Object.assign(info.usb, opt);	
		}else{
			info.usb = opt;
		}
		if(info.ipc){
			_this.setUserUseIPCReq(info.ipc);
		}
		window.localStorage.setItem('HY_SDK_USER_IPC',JSON.stringify(info));
	}else{
		window.localStorage.setItem('HY_SDK_USER_IPC', JSON.stringify({"deviceType": 2,"usb":opt}))
	}
};

//云台控制
/*
 * nCommand 1:云台上仰  2:云台下俯3:云台左转 4:云台右转5:云台上仰和左转6:云台下俯和左转
	7:云台上仰和右转8:云台下俯和右转9:焦距变大(倍率变大)10:焦距变小(倍率变小)11:焦点前调 12:焦点后调
 */
HY_SDK_WS.prototype.PTZControlReq = function (opt, rollBack) {
	this.log(" HY_SDK_WS.prototype.PTZControlReq ::" +JSON.stringify(opt));
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 357,
				msgBody: JSON.stringify({						
					serviceUrl:opt.serviceUrl,
					nCommand: opt.nCommand,
					nStop: opt.nStop ? opt.nStop: 0,//停止标识0：非停止 1：停止
					nSpeed:opt.nSpeed?opt.nSpeed:5 //1-10
			})};
       	//_this.log(" HHY_SDK_WS.prototype.PTZControlReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m,_this.seqNo);
	}catch(e){
	  console && console.error(" PTZControlReq ",e);
	}
};

//设置用户是否使用网络摄像头消息响应
HY_SDK_WS.prototype.PTZControlRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.PTZControlRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

/********************************会议相关操作************************************************/
//发起会议
HY_SDK_WS.prototype.startMeetingReq = function (opt) {
	var _this = this;
	try{	
		var m = {					
				msgType: 54401,
				msgBody: JSON.stringify({
					strInitiaterUserDomainCode:_this.sie.strUserDomainCode,
					strInitiaterUserTokenID:_this.sie.strUserTokenID,
					strInitiaterUserName:_this.opts.userName,
					strMeetingDomainCode:_this.sie.strUserDomainCode,
					strMeetingName: opt.strMeetingName,
					strMeetingDesc:opt.strMeetingDesc,
					strTrunkPara: opt.strTrunkPara ? JSON.stringify(opt.strTrunkPara):JSON.stringify({}),
					strMainUserDomainCode: opt.strMainUserDomainCode?opt.strMainUserDomainCode:_this.sie.strUserDomainCode,
					strMainUserID: opt.strMainUserID ?opt.strMainUserID: _this.opts.loginName,
					nMeetingMode:opt.nMeetingMode ? opt.nMeetingMode: 1,
					nRecord: opt.nRecord ? opt.nRecord:0,
					nInviteStyle: opt.nInviteStyle ? opt.nInviteStyle: 1,
					nForceInvite: opt.nForceInvite ? opt.nForceInvite: 1,//是否总是邀请发起者
					nEncrypt:opt.nEncrypt ,//可选，是否加密
					nVoiceIntercom: opt.nVoiceIntercom ? opt.nVoiceIntercom: 0,
					nSynthesise: opt.nSynthesise ? opt.nSynthesise:0,
					nFixedLayout: opt.nFixedLayout,
					lstMeetingUserInfo: opt.lstMeetingUserInfo ? opt.lstMeetingUserInfo:[],
					lstMeetingStreamType: opt.lstMeetingStreamType
			})};
		this.log(" HY_SDK_WS.prototype.startMeetingReq ::" +JSON.stringify(m));
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" startMeetingReq ",e);
	}
};

//发起会议响应
HY_SDK_WS.prototype.startMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.startMeetingRsp ::" +JSON.stringify(json));
	if(this.callMt)
	{
		this.callMt.startRsp(json);
	}
};

//获取会议信息
HY_SDK_WS.prototype.getMeetingInfoReq = function (opt, rollBack) {
	this.log(" HY_SDK_WS.prototype.getMeetingInfoReq ::" +JSON.stringify(opt));
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54453,
				msgBody: JSON.stringify({						
					strDomainCode:opt.strDomainCode,
					nMeetingID: opt.nMeetingID,
					nListMode : 1//返回所有受邀人
			})};
       	_this.sendMsg(m,_this.seqNo);
	}catch(e){
	  console && console.error(" getMeetingInfoReq ",e);
	}
};

//获取会议信息响应
HY_SDK_WS.prototype.getMeetingInfoRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.getMeetingInfoRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//收到会议呼叫
HY_SDK_WS.prototype.notifyInviteUserJoinMeeting = function (json) {
	this.log(" HY_SDK_WS.prototype.notifyInviteUserJoinMeeting ::" +JSON.stringify(json));
	if(json.nMeetingStatus == 1){//会议正常开始
		if(this.callMt)
		{
			if(this.callMt.nMeetingID == json.nMeetingID && this.callMt.strMeetingDomainCode == json.strMeetingDomainCode)
			{
				this.callMt.notifyCallJoin(json);
			}else
			{
				var key = json.nMeetingID+"_"+json.strMeetingDomainCode;
				var meet= this.calledMt[key];
				//被叫
				if(meet){
					this.agreeMeetBox(meet);
				}else{
					var p = {
				        meet: json
					}
					this.calledMt[key] = this.calledMeeting(p);
					//this.agreeMeetBox(this.calledMt[key]);
				}
			}
		}
		else
		{
			var key = json.nMeetingID+"_"+json.strMeetingDomainCode;
			var meet= this.calledMt[key];
			//被叫
			if(meet){
				this.agreeMeetBox(meet);
			}else{
				var p = {
			        meet: json
				}
				this.calledMt[key] = this.calledMeeting(p);
				//this.agreeMeetBox(this.calledMt[key]);
			}
		}
	}
	
};

//通知邀请方对方参加会议意见
HY_SDK_WS.prototype.notifyPeerUserMeetingInfo = function (json) {
	if(this.callMt){
		this.callMt.notifyPeerUserMeetingInfo(json);
	}
};

//通知用户打开/关闭摄像头
HY_SDK_WS.prototype.notifyTurnOnOffCamera = function (json) {
	var meet ;
	if(this.callMt)
	{
		if(this.callMt.nMeetingID == json.nMeetingID && this.callMt.strMeetingDomainCode == json.strMeetingDomainCode)
		{
			meet = this.callMt;
		}else
		{
			//被叫
			meet = this.calledMt[json.nMeetingID+"_"+json.strMeetingDomainCode]
		}
	}
	else
	{
		meet = this.calledMt[json.nMeetingID+"_"+json.strMeetingDomainCode]
	}
	if(meet){
		meet.notifyTurnOnOffCamera(json);
	}
};

//参加会议
HY_SDK_WS.prototype.joinMeetingReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54407,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strUserName:_this.opts.userName,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID,
					nPicMode:opt.nPicMode,
					strInviteUserDomainCode: opt.strInviteUserDomainCode,
					strInviteUserTokenID: opt.strInviteUserTokenID,
					nIsAgree: opt.nIsAgree
			})};
		this.log(" HY_SDK_WS.prototype.joinMeetingReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" joinMeetingReq ",e);
	}
};

//参加会议响应
HY_SDK_WS.prototype.joinMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.joinMeetingRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
	//_this.callMt.joinMeetingRsp(json);
};

//获取用户
HY_SDK_WS.prototype.getMobileDynamicUrlReq = function(opt, rollBack){
	var _this = this;
	_this.log(" 获取用户直播地址请求参数 : " , opt);
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 4714,
				msgBody: JSON.stringify({
					domainCode:opt.domainCode,
					tokenID:_this.sie.strUserTokenID,
					strUserTokenID:opt.strUserTokenID
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" getMobileDynamicUrlReq ",e);
	}
};

HY_SDK_WS.prototype.getMobileDynamicUrlRsp = function(json){
	this.log(" HY_SDK_WS.prototype.getMobileDynamicUrlRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//结束会议
HY_SDK_WS.prototype.stopMeetingReq = function(opt, rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54431,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID 
			})};
       	_this.log(" HHY_SDK_WS.prototype.stopMeetingReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m,_this.seqNo);
	}catch(e){
	  console && console.error(" stopMeetingReq ",e);
	}
};

//结束响应
HY_SDK_WS.prototype.stopMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.stopMeetingRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
	//_this.callMt.stopMeetingRsp(json);
};

//退出会议
HY_SDK_WS.prototype.quitMeetingReq = function(opt, rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54427,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID 
			})};
       	_this.log(" HHY_SDK_WS.prototype.quitMeetingReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" quitMeetingReq ",e);
	}
};

//结束响应
HY_SDK_WS.prototype.quitMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.quitMeetingRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//通知用户状态
HY_SDK_WS.prototype.notifyMeetingStatusInfo = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyMeetingStatusInfo ::" +JSON.stringify(json));
	
	var meet ;
	if(this.callMt)
	{
		if(this.callMt.nMeetingID == json.nMeetingID && this.callMt.strMeetingDomainCode == json.strMeetingDomainCode)
		{
			//this.callMt.notifyCallStatusInfo(json);
			meet = this.callMt;
			meet.notifyCallStatusInfo(json);
		}else
		{
			//被叫
			meet = this.calledMt[json.nMeetingID+"_"+json.strMeetingDomainCode]
			if(meet){
				meet.notifyCalledStatusInfo(json);
			}
		}
	}
	else
	{
		
		meet = this.calledMt[json.nMeetingID+"_"+json.strMeetingDomainCode]
		if(meet){
			meet.notifyCalledStatusInfo(json);
		}
	}
	
		//delete _this.callMt;
};

//邀请人员
HY_SDK_WS.prototype.inviteUserMeetingReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54413,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strUserName: _this.opts.userName,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID,
					lstMeetingUserInfo: opt.lstMeetingUserInfo
			})};
       	_this.log(" HHY_SDK_WS.prototype.inviteUserMeetingReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m,_this.seqNo);
	}catch(e){
	  console && console.error(" inviteUserMeetingReq ",e);
	}
};

//邀请人员响应
HY_SDK_WS.prototype.inviteUserMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.inviteUserMeetingRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//请出人员
HY_SDK_WS.prototype.kickMeetingUserReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54421,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID,
					strKickUserDomainCode: opt.strKickUserDomainCode,
					strKickUserID:opt.strKickUserID
			})};
       	_this.log(" HHY_SDK_WS.prototype.kickMeetingUserReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" kickMeetingUserReq ",e);
	}
};

//请出人员响应
HY_SDK_WS.prototype.kickMeetingUserRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.kickMeetingUserRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//取消邀请响应
HY_SDK_WS.prototype.cancelInviteUserMeetingReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55228,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID,
					lstMeetingUserInfo: opt.lstMeetingUserInfo
			})};
       	_this.log(" HHY_SDK_WS.prototype.cancelInviteUserMeetingReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m,_this.seqNo);
	}catch(e){
	  console && console.error(" cancelInviteUserMeetingReq ",e);
	}
};

//取消邀请响应
HY_SDK_WS.prototype.cancelInviteUserMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.cancelInviteUserMeetingRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};
//禁言/解禁
HY_SDK_WS.prototype.meetingSpeakSetReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54469,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID,
					nSetSpeakForAll: opt.nSetSpeakForAll,
					listUser:opt.listUser
			})};
       	_this.log(" HHY_SDK_WS.prototype.meetingSpeakSetReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" meetingSpeakSetReq ",e);
	}
};

//禁言/解禁响应
HY_SDK_WS.prototype.meetingSpeakSetRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.meetingSpeakSetRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//打开/关闭视频
HY_SDK_WS.prototype.turnOnOffCameraReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55246,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID,
					strDestUserDomainCode: opt.strDestUserDomainCode,
					strDestUserTokenID:opt.strDestUserTokenID,
					nCameraAuth:opt.nCameraAuth
			})};
       	_this.log(" HHY_SDK_WS.prototype.turnOnOffCameraReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" turnOnOffCameraReq ",e);
	}
};

//打开/关闭视频响应
HY_SDK_WS.prototype.turnOnOffCameraRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.turnOnOffCameraRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//被从会议中请出
HY_SDK_WS.prototype.notifyKickUserMeeting = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyKickUserMeeting ::" +JSON.stringify(json));
	var key = json.nMeetingID+"_"+json.strMeetingDomainCode;
	if(_this.calledMt[key]){
		_this.calledMt[key].notifyKickUserMeeting(json);
	}
};

//会议中举手
HY_SDK_WS.prototype.meetingUserRaiseReq = function(opt,rollBack){
	var _this = this;
	try{	
		var m = {					
				msgType: 54493,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID
			})};
       	_this.log(" HHY_SDK_WS.prototype.meetingUserRaiseReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" meetingUserRaiseReq ",e);
	}
};


//会议中举手响应
HY_SDK_WS.prototype.meetingUserRaiseRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.meetingUserRaiseRsp ::" +JSON.stringify(json));
};

//通知主持人举手消息
HY_SDK_WS.prototype.notifyMeetingRaiseInfo = function(json){
	if(this.callMt)
	{
		if(this.callMt.nMeetingID == json.nMeetingID && this.callMt.strMeetingDomainCode == json.strMeetingDomainCode)
		{
			this.callMt.notifyRaiseInfo(json);
		}
	}
};

//开始录像
HY_SDK_WS.prototype.beginMeetingRecordReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55212,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					nMeetingID:opt.nMeetingID,
					strMeetingDomainCode: opt.strMeetingDomainCode
			})};
       	_this.log(" HHY_SDK_WS.prototype.beginMeetingRecordReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" beginMeetingRecordReq ",e);
	}
};


//开始录像响应
HY_SDK_WS.prototype.beginMeetingRecordRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.beginMeetingRecordRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//停止录像
HY_SDK_WS.prototype.stopMeetingRecordReq = function(opt,rollBack){
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55711,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					nMeetingID:opt.nMeetingID,
					strMeetingDomainCode: opt.strMeetingDomainCode,
					nMeetingRecordID: opt.nMeetingRecordID
			})};
       	_this.log(" HHY_SDK_WS.prototype.stopMeetingRecordReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" stopMeetingRecordReq ",e);
	}
};


//停止录像响应
HY_SDK_WS.prototype.stopMeetingRecordRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.stopMeetingRecordRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//锁定/解锁会议
HY_SDK_WS.prototype.lockMeetingReq = function(opt,rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55264,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					nMeetingID:opt.nMeetingID,
					strMeetingDomainCode: opt.strMeetingDomainCode,
					nLock:opt.nLock
			})};
       	_this.log(" HHY_SDK_WS.prototype.lockMeetingReq ",_this.getCommonMsg(m));	
    	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" lockMeetingReq ",e);
	}
};

//锁定/解锁会议响应
HY_SDK_WS.prototype.lockMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.lockMeetingRsp ::" +JSON.stringify(json));
	if(json.seqNo){
		this.backFunc[json.seqNo](json);
	}
};

//设置主持人
HY_SDK_WS.prototype.setMeetingKeynoteSpeakerReq = function(opt,rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55234,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					nMeetingID:opt.nMeetingID,
					strMeetingDomainCode: opt.strMeetingDomainCode,
					strKeynoteSpeakerDomainCode: opt.strKeynoteSpeakerDomainCode,
					strKeynoteSpeakerTokenID:opt.strKeynoteSpeakerTokenID
			})};
       	_this.log(" HHY_SDK_WS.prototype.setMeetingKeynoteSpeakerReq ",_this.getCommonMsg(m));	
    	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" setMeetingKeynoteSpeakerReq ",e);
	}
};

//设置主讲人响应
HY_SDK_WS.prototype.setMeetingKeynoteSpeakerRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.setMeetingKeynoteSpeakerRsp ::" +JSON.stringify(json));
	if(json.seqNo){
		this.backFunc[json.seqNo](json);
	}
};

/********************************会议操作结束*************************************/
//根据recordId获取录像信息
HY_SDK_WS.prototype.playbackCTSReq = function (opt,rollBack) {
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 418,
				msgBody: JSON.stringify({
					serviceUrl:{
						strDomainCode:opt.strDomainCode,
						strDeviceCode:opt.strDeviceCode?opt.strDeviceCode:"",
						strChannelCode:opt.strChannelCode?opt.strChannelCode:"",
						strStreamCode:opt.strStreamCode?opt.strStreamCode:""
					},
					strUserTokenID:_this.sie.strUserTokenID,
					unRecordId:opt.unRecordId
				})};
       	_this.log(" HHY_SDK_WS.prototype.playbackCTSReq ",_this.getCommonMsg(m));	
    	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" playbackCTSReq ",e);
	}
};

//根据recordId获取录像信息响应
HY_SDK_WS.prototype.playbackSTCRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.playbackSTCRsp ::" +JSON.stringify(json));
	if(json.seqNo){
		this.backFunc[json.seqNo](json);
	}
};

HY_SDK_WS.prototype.sendMsg = function (msg,seqNo) {
	var _this = this;
	try {
		_this.ws.send(_this.getCommonMsg(msg,seqNo));
	} catch (e) {
		window.console && window.console.error(e);
	}
};
HY_SDK_WS.prototype.sendBaseMsg = function (msg) {
	var _this = this;
	//_this.log("发送数据sendBaseMsg： " + msg);
	try {
		if (_this.ws) {
			_this.ws.send(msg);
		}
	} catch (e) {
		window.console && window.console.log(e);
	}
};

HY_SDK_WS.prototype.checkCon = function () {
	var _this = this;
	var scode = {
		"0": "连接尚未建立",
		"1": "连接已建立，可以进行通信",
		"2": "连接正在进行关闭",
		"3": "连接已经关闭或者连接不能打开"
	};
	_this.idx = setInterval(function () {
			try {
				//_this.log(" HY_SDK_WS.prototype.checkCon " + _this.ws.readyState);
				var state = _this.ws.readyState;
				if (state == 3 || state == 0) {
					_this.init(_this.opts);
				}
				if(_this.sie && _this.sie.userStatus == 1)
				{
					_this.sendHeatbeatReq();
				}
			} catch (e) {
				window.console && window.console.error(e);
			}
		}, 5000);
};

HY_SDK_WS.prototype.log = function() {
	var _this = this;
	if (_this.opts.log === true) {		
		for(var i = 0; i< arguments.length; i++)
		{
	    	 window.console && window.console.log(arguments[i]);				
		}
	}
};
HY_SDK_WS.prototype.code2utf8 = function(uni) {
  var uni2 = uni.toString(2);
  if (uni < 128) {
    return uni.toString(16);
  } else if (uni < 2048) {
    uni2 = ('00000000000000000' + uni2).slice(-11);
    var s1 =  parseInt("110" + uni2.substring(0, 5), 2);
    var s2 =  parseInt("10" + uni2.substring(5), 2);
    return s1.toString(16) + ',' + s2.toString(16);
  } else {
    uni2 = ('00000000000000000' + uni2).slice(-16);
    var s1 = parseInt('1110' + uni2.substring(0, 4),2 );
    var s2 = parseInt('10' + uni2.substring(4, 10), 2 );
    var s3 = parseInt('10' + uni2.substring(10), 2);
    return s1.toString(16) + ',' + s2.toString(16) + ',' + s3.toString(16);
  }
};
HY_SDK_WS.prototype.string2buffer= function(m) {
  var _this = this;
  var val = "00,00,00,00,00,00,00,00,00,00,00,00";
  var str = m.msgBody;
  for (var i = 0; i < str.length; i++) {
    val += ',' + _this.code2utf8(str.charCodeAt(i));
  }
  val += ',00,00,00,00,00,00,00,00,00,00,00,00,00,00,00,00';
  var temp = new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16);
  }));
  return temp.buffer;
};

HY_SDK_WS.prototype.binayUtf8ToString = function(buf, begin,end){
  var i = 0;
  var pos = 0;
  var str ="";
  var unicode = 0 ;
  var flag = 0;
  var size = buf.length;
  if(end > 0 && end < size)
  {
	  size = end;
  }
  for (pos = begin; pos < size;){
    flag= buf[pos];
    if ((flag >>>7) === 0 ) {
      str+= String.fromCharCode(buf[pos]);
      pos += 1;
      
    }
    else if ((flag &0xFC) === 0xFC ){
      unicode = (buf[pos] & 0x3) << 30;
      unicode |= (buf[pos+1] & 0x3F) << 24;
      unicode |= (buf[pos+2] & 0x3F) << 18;
      unicode |= (buf[pos+3] & 0x3F) << 12;
      unicode |= (buf[pos+4] & 0x3F) << 6;
      unicode |= (buf[pos+5] & 0x3F);
      str+= String.fromCharCode(unicode) ;
      pos += 6;
      
    }else if ((flag &0xF8) === 0xF8 ){
      unicode = (buf[pos] & 0x7) << 24;
      unicode |= (buf[pos+1] & 0x3F) << 18;
      unicode |= (buf[pos+2] & 0x3F) << 12;
      unicode |= (buf[pos+3] & 0x3F) << 6;
      unicode |= (buf[pos+4] & 0x3F);
      str+= String.fromCharCode(unicode) ;
      pos += 5;
      
    }
    else if ((flag &0xF0) === 0xF0 ){
      unicode = (buf[pos] & 0xF) << 18;
      unicode |= (buf[pos+1] & 0x3F) << 12;
      unicode |= (buf[pos+2] & 0x3F) << 6;
      unicode |= (buf[pos+3] & 0x3F);
      str+= String.fromCharCode(unicode) ;
      pos += 4;
      
    }
   
    else if ((flag &0xE0) === 0xE0 ){
      unicode = (buf[pos] & 0x1F) << 12;;
      unicode |= (buf[pos+1] & 0x3F) << 6;
      unicode |= (buf[pos+2] & 0x3F);
      str+= String.fromCharCode(unicode) ;
      pos += 3;
      
    }
    else if ((flag &0xC0) === 0xC0 ){ //110
      unicode = (buf[pos] & 0x3F) << 6;
      unicode |= (buf[pos+1] & 0x3F);
      str+= String.fromCharCode(unicode) ;
      pos += 2;
      
    }
    else{
      str+= String.fromCharCode(buf[pos]);
      pos += 1;
    }
 }
 return str;
};
HY_SDK_WS.prototype.to16Str = function(data)
{
	var temp = ""+data.toString(16,2);
	if(temp.length == 1)
	{
		temp ="0" + temp;
	}
	return temp;
	
};


/********************播放器相关操作**************************** */
//初始化播放器
HY_SDK_WS.prototype.getPlayer = function(opts)
{
	var _this = this;
	this.log(opts);
	opts.sdk = this;
	opts.log = _this.opts.log;
	var mainp = new mainPlayer(opts);
	var ui = uuid();
	mainp.id = ui;
	_this.Mplayer[ui] = mainp;
	return mainp;
};
//多个固定设备同步播放
HY_SDK_WS.prototype.playVideoList = function(opts)
{
	var _this = this;
	var pla = {				
		layout:opts.videolist.length,
		pnode:opts.pnode,
		log:_this.opts.log
	};
	var mainPlay = HYSDK.getPlayer(pla);
	
	opts.loadingTip && opts.loadingTip();
	var total = opts.videolist.length;
	var exeCount = 0;
	var successCount = 0;
	$.each(opts.videolist,function(i, e){
		//mainPlay.players[i].setTitle({"title": e.name});
		
		var oo = {
		    strDomainCode :e.strDomainCode,
			strDeviceCode  :e.strDeviceCode,
			strChannelCode :e.strChannelCode,
			strStreamCode  :e.strStreamCode
		};
		
		_this.getDeviceUrlReq(oo,function(urlRes){
			exeCount++;
		     if(urlRes.nResultCode === 0)
			 {		
			 	successCount++;
		 		var pla = {				
			        wsserver: opts.url ? opts.url: _this.opts.sieStreamUrl,
					rtspurl: urlRes.strDynamicUrl,
					hyVideo: mainPlay.players[i],
                    videoParam:{
                        palyParam:e
                    },
					log:true
				};
		 		mainPlay.playByVideo(pla);
			 }else
			 {
			    console.log("playVideoList:::"+urlRes.strResultDescribe);
			 }
			 if(exeCount == total){
			 	
			 	opts.loadingResp && opts.loadingResp(successCount);
			 }
		});
	});
	return mainPlay;
};

//停止播放
HY_SDK_WS.prototype.stopPlay = function(mainPlay)
{
	var _this = this;
	if(mainPlay){
		mainPlay.stopPlay();
		delete _this.Mplayer[mainPlay.id];
	}
};

//销毁所有播放器
HY_SDK_WS.prototype.destoryAllPlay = function(mainPlay)
{
	var _this = this;
	//console.log(_this.Mplayer);
	if(_this.Mplayer){
		$.each(_this.Mplayer, function(i, e){
			_this.stopPlay(e);
		});
	}
};

//添加布局
HY_SDK_WS.prototype.addLayout = function(mainPlay)
{
	var _this = this;
	mainPlay.addLayout();
};

//减少布局
HY_SDK_WS.prototype.reduceLayout = function(opt)
{
	var _this = this;
	if(opt.mainPlay && opt.hyVideo){
		opt.mainPlay.reduceLayout(opt.hyVideo);
	}else{
		console.log("未传入 mainplay 或者 要删除的video布局")
	}
	
};

/**************************** 结束 ***************************************/
 

HY_SDK_WS.prototype.drawVideo = function(opts){ 
  var video = document.createElement("video");
  video.setAttribute("width",opts.width);
  video.setAttribute("height",opts.height);
  if(opts.controls)
  {
	  video.setAttribute("controls","controls");
  }
  return video;  
};

HY_SDK_WS.prototype.drawCanvas = function(opts){ 
  var canvas = document.createElement("canvas");
  return canvas;  
};

HY_SDK_WS.prototype.getUsbList =  function (opt){
	var _this = this;
	var config =  opt.config;
	var callback = opt.callback;
	if (config == null) config = { audio: true, video: true };
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		//先调用设备，再获取设备列表可以获取到设备label
		navigator.mediaDevices.getUserMedia(config)
		.then(function(stream) {
			navigator.mediaDevices.enumerateDevices().then(function(devices) {
				callback(devices);
				_this.stopAllTracks(stream)
			});
		}).catch(function(err) {
			console.error("getUsbList::" +err);
			callback([]);
		});
	} else {
		console.error("navigator.mediaDevices unavailable");
		callback([]);
	}
};

// Stop all tracks from a given stream
HY_SDK_WS.prototype.stopAllTracks = function(stream) {
	var _this = this;
	try {
		// Try a MediaStreamTrack.stop() for each track
		var tracks = stream.getTracks();
		for(var mst of tracks) {
			_this.log(mst);
			if(mst) {
				mst.stop();
			}
		}
	} catch(e) {
		// Do nothing if this fails
	}
};


HY_SDK_WS.prototype.getCanvas = function(opt){
	return new HYCanvas(opt); 
};

HY_SDK_WS.prototype.getMeetingListReq = function(opts,callback){
	var _this = this;
	try{	
        _this.getMeetingListResp = callback;		
		var m = {					
					msgType: 54449,
					msgBody: JSON.stringify({
						strDomainCode:opts.strDomainCode,
						strQueryStartTime:opts.startTime,
						strQueryEndTime:opts.endTime,
						nStatus:opts.nStatus,
						strUserDomainCode:opts.nStatus,
						strUserID:opts.strUserID,
						nMode:opts.strUserID,
						strMeetingKeywords:opts.keywords,
						nPage:1,
						nSize:100,
						nReverse:2
			})};
       	//_this.log(" HY_SDK_WS.prototype.setUserFriendReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" setUserFriendReq ",e);
	}
};
HY_SDK_WS.prototype.getMeetingListResp = function(opt){
	this.log(" HY_SDK_WS.prototype.setUserFriendRsp ", json);
};

HY_SDK_WS.prototype.notifyInviteUserCancelJoinMeeting = function(json){
	this.log(" HY_SDK_WS.prototype.notifyInviteUserCancelJoinMeeting ::" +JSON.stringify(json));
	if(this.callMt)
	{
		if(this.callMt.nMeetingID == json.nMeetingID && this.callMt.strMeetingDomainCode == json.strMeetingDomainCode)
		{
		}else
		{
			
		}
	}
	else
	{
		var key = json.nMeetingID+"_"+json.strMeetingDomainCode;
		var meet= this.calledMt[key];
		//被叫
		if(meet && meet.incomingDialog){
			clearTimeout(meet.callTimeOutTimer);
			meet.incomingDialog.modal('hide');
			meet.incomingDialog = null;
			meet.joinMeetingReq(0, function(res){
				meet.joinCallBack_0(res);
			});
		}
	}
};
HY_SDK_WS.prototype.delMeetingInfoReq = function(opts,callback){
	var _this = this;
	try{	
        _this.delMeetingInfoResp = callback;		
		var m = {					
					msgType: 54457,
					msgBody: JSON.stringify({
						strDomainCode:opts.strDomainCode,
						nMeetingID:opts.nMeetingID
			})};
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" delMeetingInfoReq ",e);
	}
};
HY_SDK_WS.prototype.delMeetingInfoResp = function(opt){
	this.log(" HY_SDK_WS.prototype.setUserFriendRsp ", json);
};

HY_SDK_WS.prototype.setPredetermineMeetingReq = function(opt,callback){
	console.error(opt);
	var _this = this;
	try{	
        _this.setPredetermineMeetingResp = callback;		
		var m = {					
					msgType: 54485,
					msgBody: JSON.stringify({
						nMeetingID:0,
						dtMeetingStartTime:opt.startTime,
						nMeetingDuration:opt.duration,
						nStartImmediately:0,
						strInitiaterUserDomainCode:_this.sie.strUserDomainCode,
						strInitiaterUserTokenID:_this.sie.strUserTokenID,
						strInitiaterUserName:_this.opts.userName,
						strMeetingDomainCode:_this.sie.strUserDomainCode,
						strMeetingName: opt.strMeetingName,
						strMeetingDesc:opt.strMeetingDesc,
						strTrunkPara: opt.strTrunkPara ? JSON.stringify(opt.strTrunkPara):JSON.stringify({}),
						strMainUserDomainCode: opt.strMainUserDomainCode?opt.strMainUserDomainCode:_this.sie.strUserDomainCode,
						strMainUserID: opt.strMainUserID ?opt.strMainUserID: _this.opts.loginName,
						nMeetingMode:opt.nMeetingMode ? opt.nMeetingMode: 1,
						nRecord: opt.nRecord ? opt.nRecord:0,
						nInviteStyle: opt.nInviteStyle ? opt.nInviteStyle: 1,
						nForceInvite: opt.nForceInvite ? opt.nForceInvite: 1,//是否总是邀请发起者
						nEncrypt:opt.nEncrypt ,//可选，是否加密
						nVoiceIntercom: opt.nVoiceIntercom ? opt.nVoiceIntercom: 0,
						nSynthesise: opt.nSynthesise ? opt.nSynthesise:0,
						nFixedLayout: opt.nFixedLayout,
						lstMeetingUserInfo: opt.lstMeetingUserInfo ? opt.lstMeetingUserInfo:[],
						lstMeetingStreamType: opt.lstMeetingStreamType
						
						
			})};
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" setPredetermineMeetingReq ",e);
	}
};
HY_SDK_WS.prototype.setPredetermineMeetingResp = function(opt){
	this.log(" HY_SDK_WS.prototype.setPredetermineMeetingResp ", json);
};

//	设置桌面共享者
HY_SDK_WS.prototype.setMeetingDesktopSharerReq = function(opts,rollBack){
	var _this = this;
	_this.log("setMeetingDesktopSharerReq：",opts);
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
					msgType: 55242,
					msgBody: JSON.stringify({					
						strUserDomainCode:_this.sie.strUserDomainCode,
						strUserTokenID:_this.sie.strUserTokenID,
						strDesktopSharerDomainCode:opts.strDesktopSharerDomainCode,
						strDesktopSharerTokenID:opts.strDesktopSharerTokenID,
						strMeetingDomainCode: opts.strMeetingDomainCode,
						nMeetingID:opts.nMeetingID,
						nDesktopSharerMainStreamNum:opts.nDesktopSharerMainStreamNum?opts.nDesktopSharerMainStreamNum: 2

			})};
		_this.ws.send(_this.getCommonMsg(m,_this.seqNo));			
	}catch(e){
	  console && console.error(" setMeetingDesktopSharerReq ",e);
	}

};

//设置桌面共享者响应
HY_SDK_WS.prototype.setMeetingDesktopSharerRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.setMeetingDesktopSharerRsp ::" +JSON.stringify(json));
	if(json.seqNo){
		this.backFunc[json.seqNo](json);
	}
};

//	获取桌面共享权限
HY_SDK_WS.prototype.getMeetingDesktopShareAuthReq= function(opts,rollBack){
	var _this = this;
	_this.log("getMeetingDesktopShareAuthReq：",opts);
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
					msgType: 55252,
					msgBody: JSON.stringify({						
						strUserDomainCode:_this.sie.strUserDomainCode,
						strUserTokenID:_this.sie.strUserTokenID,
						strDesktopSharerDomainCode:opts.strDesktopSharerDomainCode,
						strDesktopSharerTokenID:opts.strDesktopSharerTokenID,
						strMeetingDomainCode: opts.strMeetingDomainCode,
						nMeetingID:opts.nMeetingID

				})};
		_this.ws.send(_this.getCommonMsg(m,_this.seqNo));			
	}catch(e){
	  console && console.error(" getMeetingDesktopShareAuthReq ",e);
	}

};


//	获取桌面共享权限响应
HY_SDK_WS.prototype.getMeetingDesktopShareAuthRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.getMeetingDesktopShareAuthRsp ::" +JSON.stringify(json));
	if(json.seqNo){
		this.backFunc[json.seqNo](json);
	}
};
/*****************************对讲************************************/

HY_SDK_WS.prototype.callTalk = function (opts) {
	this.log("主叫发起对讲：" +JSON.stringify(opts));
	opts.hySdk = this;
	opts.meetingRole = 1;
	this.callTk = new HY_TALK(opts);
	this.log("主叫对讲：", this.callTk);
	return this.callTk;
} 
//获取对讲信息
HY_SDK_WS.prototype.getTalkbackInfoReq = function(opt,rollBack){
	this.log(" HY_SDK_WS.prototype.getTalkbackInfoReq ::" +JSON.stringify(opt));
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54329,
				msgBody: JSON.stringify({						
					strDomainCode:opt.strDomainCode,
					nTalkbackID: opt.nTalkbackID
			})};
       	_this.sendMsg(m,_this.seqNo);
	}catch(e){
	  console && console.error(" getTalkbackInfoReq ",e);
	}
};

//获取对讲信息响应
HY_SDK_WS.prototype.getTalkbackInfoRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.getTalkbackInfoRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

HY_SDK_WS.prototype.calledTalk = function (opts) {
	this.log("calledTalk::",JSON.stringify(opts));
	opts.hySdk = this;
	opts.talkInfo = opts.talk;
	opts.talkRole = 2;
	var calledTk = new HY_TALK(opts);
	calledTk.nTalkbackID = opts.talkInfo.nTalkbackID;
	calledTk.strTalkbackDomainCode = opts.talkInfo.strTalkbackDomainCode;
	this.agreeTalkBox(calledTk);
	this.log("######", calledTk);
	return calledTk;
};

HY_SDK_WS.prototype.agreeTalkBox = function (calledTk) {
	var _this  = this;
	var opts =calledTk.opt;
	var msg = opts.talk.strFromUserName;
	var msg2 = opts.talk.strTalkbackName;
	calledTk.incomingDialog = bootbox.dialog({
		message:  msg+ "发起的"+msg2,
		title: "对讲邀请",
		closeButton: false,
		buttons: {
			success: {
				label: "接听",
				className: "btn-success",
				callback: function() {
					clearTimeout(calledTk.callTimeOutTimer);
					calledTk.incomingDialog = null;
					//_this.agree(calledTk);
					_this.talkAgree(calledTk);
				}
			},
			danger: {
				label: "挂断",
				className: "btn-danger",
				callback: function() {
					_this.beforeTalkRefuse(calledTk);
					calledTk.incomingDialog = null;
					calledTk.joinReq(0, function(res){
						//calledTk.joinCallBack_0(res);
					});
					var key = calledTk.nTalkbackID+"_"+calledTk.strTalkbackDomainCode;
					delete _this.calledTk[key];
				}
			}
		}
	});
	clearTimeout(calledTk.callTimeOutTimer);
	calledTk.callTimeOutTimer = setTimeout(function(){
		if(calledTk.incomingDialog){
			calledTk.incomingDialog.modal('hide');
			calledTk.incomingDialog = null;
		}
		calledTk.joinReq(0, function(res){
			//calledTk.joinCallBack_0(res);
		});
	},_this.timeOutDuration);
	
}


HY_SDK_WS.prototype.talkAgree = function (calledTk) {
	var _this  = this;
	_this.getTalkbackInfoReq({strDomainCode: calledTk.strTalkbackDomainCode,
			nTalkbackID: calledTk.nTalkbackID
		},function(res){
			if(res.nResultCode == 0){
				_this.beforeJoing();
				_this.exitMeetOrTalk(calledTk,function(){
					calledTk.opt.talkInfo.listToUser = res.listUserInfo;
					
					var flag = calledTk.opt.talkInfo.listToUser.some(function(user,index,arr){
						var key =user.strUserDomainCode+"_"+user.strUserID
						if(key == _this.sie.strUserDomainCode+"_"+_this.opts.loginName){
							calledTk.nPriority = user.nPriority;
							return user;
						}
					});
					
					
					if(!flag){
						calledTk.opt.talkInfo.listToUser.push({
							strUserDomainCode:_this.sie.strUserDomainCode,
							strUserID: _this.opts.loginName,
							strUserName: _this.opts.userName
						});
						calledTk.nPriority = calledTk.opt.talkInfo.listToUser.length;
					}
					_this.drawTalkCalledPanel(calledTk);
				});
			}else{
				console.error("获取会议信息失败：：：",res);
			}
	});
}

HY_SDK_WS.prototype.beforeTalkRefuse = function(){
}

//发起对讲
HY_SDK_WS.prototype.startTalkbackReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54301,
				msgBody: JSON.stringify({
					strTalkbackDomainCode:_this.sie.strUserDomainCode,
					strFromUserDomainCode:_this.sie.strUserDomainCode,
					strFromUserTokenID:_this.sie.strUserTokenID,
					strFromUserName:_this.opts.userName,
					strTalkbackName: opt.strTalkbackName,
					strTalkbackDesc:opt.strTalkbackDesc,
					strTrunkPara: opt.strTrunkPara ? JSON.stringify(opt.strTrunkPara):JSON.stringify({}),
					nTalkbackMode: opt.nTalkbackMode?opt.nTalkbackMode:1,
					nRecord: opt.nRecord ? opt.nRecord:0,
					nInviteStyle: opt.nInviteStyle ? opt.nInviteStyle: 1,
					nNoneDevice: opt.nNoneDevice ? opt.nNoneDevice:0,
					nVoiceIntercom: opt.nVoiceIntercom ? opt.nVoiceIntercom:0,
					listToUser: opt.listToUser ? opt.listToUser:[]
			})};
		this.log(" HY_SDK_WS.prototype.startTalkbackReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" startTalkbackReq ",e);
	}
};

//发起对讲响应
HY_SDK_WS.prototype.startTalkbackRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.startTalkbackRsp ::" +JSON.stringify(json));
	if(json.seqNo){
		this.backFunc[json.seqNo](json);
	}
};

//加入对讲
HY_SDK_WS.prototype.joinTalkbackReq = function (opt) {
	var _this = this;
	try{	
		var m = {					
				msgType: 54307,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTalkbackDomainCode:opt.strTalkbackDomainCode,
					nIsAgree:opt.nIsAgree,
					nTalkbackID: opt.nTalkbackID,
					nVoiceIntercom:opt.nVoiceIntercom
			})};
		this.log(" HY_SDK_WS.prototype.joinTalkbackReq ::" +JSON.stringify(m));
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" joinTalkbackReq ",e);
	}
};

//加入对讲响应
HY_SDK_WS.prototype.joinTalkbackRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.joinTalkbackRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//退出对讲
HY_SDK_WS.prototype.quitTalkbackReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54317,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strUserName:_this.opts.userName,
					strTalkbackDomainCode:opt.strTalkbackDomainCode,
					nTalkbackID: opt.nTalkbackID
			})};
		this.log(" HY_SDK_WS.prototype.quitTalkbackReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" quitTalkbackReq ",e);
	}
};

//退出对讲响应
HY_SDK_WS.prototype.quitTalkbackRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.quitTalkbackRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};
//通知发起方对方接听对讲意见
HY_SDK_WS.prototype.notifyTalkbackPeerUserOption = function(json){
	if(this.callTk){
		this.callTk.notifyTalkbackPeerUserOption(json);
	}
}
//通知对讲状态信息
HY_SDK_WS.prototype.notifyTalkbackStatusInfo = function(json){
	var _this = this;
	this.log(" HHY_SDK_WS.prototype.notifyTalkbackStatusInfo ::" +JSON.stringify(json));
	var talk ;
	if(this.callTk)
	{
		if(this.callTk.nTalkbackID == json.nTalkbackID && this.callTk.strTalkbackDomainCode == json.strTalkbackDomainCode)
		{
			talk = this.callTk;
			talk.notifyCallStatusInfo(json);
		}else
		{
			//被叫
			talk = this.calledTk[json.nTalkbackID+"_"+json.strTalkbackDomainCode]
			if(talk){
				talk.notifyCalledStatusInfo(json);
			}
		}
	}
	else
	{
		
		talk = this.calledTk[json.nTalkbackID+"_"+json.strTalkbackDomainCode]
		if(talk){
			talk.notifyCalledStatusInfo(json);
		}
	}
};

//通知对端参加对讲
HY_SDK_WS.prototype.notifyUserJoinTalkback = function(json){
	this.log(" HY_SDK_WS.prototype.notifyUserJoinTalkback ::" +JSON.stringify(json));
	if(this.callTk)
		{
			if(this.callTk.nTalkbackID == json.nTalkbackID && this.callTk.strTalkbackDomainCode == json.strTalkbackDomainCode)
			{
				this.callTk.notifyCallJoin(json);
			}else
			{
				var key = json.nTalkbackID+"_"+json.strTalkbackDomainCode;
				var talk= this.calledTk[key];
				//被叫
				if(talk){
					this.agreeTalkBox(meet);
				}else{
					var p = {
				        talk: json
					}
					this.calledTk[key] = this.calledTalk(p);
					//this.agreeMeetBox(this.calledMt[key]);
				}
			}
		}
		else
		{
			var key = json.nTalkbackID+"_"+json.strTalkbackDomainCode;
			var talk= this.calledTk[key];
			//被叫
			if(talk){
				this.agreeTalkBox(meet);
			}else{
				var p = {
			        talk: json
				}
				this.calledTk[key] = this.calledTalk(p);
				//this.agreeMeetBox(this.calledMt[key]);
			}
		}
}



//获取对讲列表
HY_SDK_WS.prototype.getTalkbackListReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54325,
				msgBody: JSON.stringify({
					strDomainCode:opt.strDomainCode,
					nMode: opt.nMode,
					strUserDomainCode:opt.strUserDomainCode,
					strUserID: opt.strUserID ,
					strQueryStartTime: opt.strQueryStartTime?opt.strQueryStartTime:1,
					strQueryEndTime: opt.strQueryEndTime ? opt.strQueryEndTime:0,
					nStatus: opt.nStatus,
					nRecordStatus: opt.nRecordStatus,
					nPage: opt.nPage ? opt.nPage:0,
					nSize: opt.nSize ? opt.nSize:100,
					nReverse: opt.nReverse?opt.nReverse: 1
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" getTalkbackListReq ",e);
	}
};

//获取对讲列表响应
HY_SDK_WS.prototype.getTalkbackListRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.getTalkbackListRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//获取对讲录像信息
HY_SDK_WS.prototype.getTalkbackRecordInfoReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54355,
				msgBody: JSON.stringify({
					strDomainCode:opt.strDomainCode,
					nTalkbackID: opt.nTalkbackID
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" getTalkbackRecordInfoReq ",e);
	}
};

//获取对讲录像信息响应
HY_SDK_WS.prototype.getTalkbackRecordInfoRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.getTalkbackRecordInfoRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//删除对讲
HY_SDK_WS.prototype.delTalkbackInfoReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54333,
				msgBody: JSON.stringify({
					strDomainCode:opt.strDomainCode,
					nTalkbackID: opt.nTalkbackID
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" delTalkbackInfoReq ",e);
	}
};

//删除对讲响应
HY_SDK_WS.prototype.delTalkbackInfoRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.delTalkbackInfoRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//请出对讲
HY_SDK_WS.prototype.kickTalkbackUserReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54339,
				msgBody: JSON.stringify({
					strFromUserDomainCode:opt.strFromUserDomainCode?opt.strFromUserDomainCode:_this.sie.strUserDomainCode,
					strFromUserTokenID: opt.strFromUserTokenID?opt.strFromUserTokenID: _this.sie.strUserTokenID,
					strFromUserName:opt.strFromUserName?opt.strFromUserName: _this.opts.userName,
					strTalkbackDomainCode:opt.strTalkbackDomainCode,
					nTalkbackID:opt.nTalkbackID,
					strKickUserDomainCode:opt.strKickUserDomainCode,
					strKickUserID: opt.strKickUserID
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" kickTalkbackUserReq ",e);
	}
};

//请出对讲响应
HY_SDK_WS.prototype.kickTalkbackUserRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.kickTalkbackUserRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//请出对讲
HY_SDK_WS.prototype.inviteUserTalkbackReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54313,
				msgBody: JSON.stringify({
					strFromUserDomainCode:opt.strFromUserDomainCode?opt.strFromUserDomainCode:_this.sie.strUserDomainCode,
					strFromUserTokenID: opt.strFromUserTokenID?opt.strFromUserTokenID: _this.sie.strUserTokenID,
					strFromUserName:opt.strFromUserName?opt.strFromUserName: _this.opts.userName,
					strTalkbackDomainCode:opt.strTalkbackDomainCode,
					nTalkbackID:opt.nTalkbackID,
					listToUser:opt.listToUser
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" inviteUserTalkbackReq ",e);
	}
};

//请出对讲响应
HY_SDK_WS.prototype.inviteUserTalkbackRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.inviteUserTalkbackRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//对讲禁言
HY_SDK_WS.prototype.talkbackSpeakSetReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 54349,
				msgBody: JSON.stringify({
					strUserDomainCode:opt.strFromUserDomainCode?opt.strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID: opt.strFromUserTokenID?opt.strUserTokenID:_this.sie.strUserTokenID,
					strUserName :opt.strFromUserName?opt.strUserName:_this.opts.userName,
					strDomainCode:opt.strDomainCode,
					nTalkbackID:opt.nTalkbackID,
					listUser:opt.listUser
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" talkbackSpeakSetReq ",e);
	}
};

//对讲禁言响应
HY_SDK_WS.prototype.talkbackSpeakSetRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.talkbackSpeakSetRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//对讲禁言响应
HY_SDK_WS.prototype.notifyKickUserTalkback = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyKickUserTalkback ::" +JSON.stringify(json));
	if(_this.callTk &&_this.callTk.nTalkbackID == json.nTalkbackID && _this.callTk.strTalkbackDomainCode == json.strTalkbackDomainCode){
		_this.callTk.notifyKickUser(json);
	}else{
		var key = json.nTalkbackID+"_"+json.strTalkbackDomainCode;
		if(_this.calledTk[key]){
			_this.calledTk[key].notifyKickUser(json);
		}
	}
};

//对讲禁言响应
HY_SDK_WS.prototype.notifyUserSpeakSet = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyUserSpeakSet ::" +JSON.stringify(json));
	if(_this.callTk &&_this.callTk.nTalkbackID == json.nTalkbackID && _this.callTk.strTalkbackDomainCode == json.strTalkbackDomainCode){
		_this.callTk.notifyUserSpeakSet(json);
	}else{
		var key = json.nTalkbackID+"_"+json.strTalkbackDomainCode;
		if(_this.calledTk[key]){
			_this.calledTk[key].notifyUserSpeakSet(json);
		}
	}
};

/**==========================集群对讲====================================*/

HY_SDK_WS.prototype.callTChannel = function (opts) {
	this.log("发起集群对讲：" +JSON.stringify(opts));
	opts.hySdk = this;
	this.callTC = new HY_TChannel(opts);
	this.callTC.tChannelRole = 1;
	this.log("发起集群对讲：：", this.callTC);
	return this.callTC;
} 

HY_SDK_WS.prototype.calledTChannel = function (opts) {
	this.log("calledTChannel::",JSON.stringify(opts));
	opts.hySdk = this;
	opts.tChannelInfo = opts.tChannel;
	var calledTC = new HY_TChannel(opts);
	calledTC.nTrunkChannelID = opts.tChannelInfo.nTrunkChannelID;
	calledTC.strTrunkChannelDomainCode = opts.tChannelInfo.strTrunkChannelDomainCode;
	if(opts.tChannel.forceIn){
		this.tChannelAgree(calledTC);
	}else{
		this.agreeTChannelBox(calledTC);
	}
	
	return calledTC;
};
HY_SDK_WS.prototype.agreeTChannelBox = function (calledTC) {
	var _this  = this;
	var opts =calledTC.opt;
	var msg = opts.tChannel.strTrunkChannelName;
	calledTC.incomingDialog = bootbox.dialog({
		message:  msg+"邀请您加入",
		title: "集群邀请",
		closeButton: false,
		buttons: {
			success: {
				label: "接听",
				className: "btn-success",
				callback: function() {
					clearTimeout(calledTC.callTimeOutTimer);
					calledTC.incomingDialog = null;
					//_this.agree(calledTk);
					_this.tChannelAgree(calledTC);
				}
			},
			danger: {
				label: "挂断",
				className: "btn-danger",
				callback: function() {
					_this.beforeTalkRefuse(calledTC);
					calledTC.incomingDialog = null;
					//calledTC.leaveReq();
					var key = calledTC.nTrunkChannelID+"_"+calledTC.strTrunkChannelDomainCode;
					delete _this.calledTC[key];
				}
			}
		}
	});
	clearTimeout(calledTC.callTimeOutTimer);
	calledTC.callTimeOutTimer = setTimeout(function(){
		if(calledTC.incomingDialog){
			calledTC.incomingDialog.modal('hide');
			calledTC.incomingDialog = null;
		}
	},_this.timeOutDuration);
	
}

HY_SDK_WS.prototype.tChannelAgree = function (calledTC) {
	var _this  = this;
	_this.nowTChannel = calledTC;
	_this.getTrunkChannelInfoReq({strTrunkChannelDomainCode: calledTC.strTrunkChannelDomainCode,
			nTrunkChannelID: calledTC.nTrunkChannelID
		},function(res){
			if(res.nResultCode == 0){
				_this.beforeJoing();
				_this.exitMeetOrTalk(calledTC,function(){
					calledTC.opt.tChannelInfo.lstTrunkChannelUser = res.lstTrunkChannelUser;
					
					var flag = calledTC.opt.tChannelInfo.lstTrunkChannelUser.some(function(user,index,arr){
						var key =user.strTcUserDomainCode+"_"+user.strTcUserID
						if(key == _this.sie.strUserDomainCode+"_"+_this.opts.loginName){
							return user;
						}
					});
					if(!flag){
						calledTC.opt.tChannelInfo.lstTrunkChannelUser.push({
							strTcUserDomainCode:_this.sie.strUserDomainCode,
							strTcUserID: _this.opts.loginName,
							strTcUserName: _this.opts.userName
						});
					}
					_this.drawTChannelCalledPanel(calledTC);
				});
			}else{
				console.error("获取会议信息失败：：：",res);
			}
	});
}

HY_SDK_WS.prototype.drawTChannelCalledPanel = function(){
	
}

//增加集群人员
HY_SDK_WS.prototype.createTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55413,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID: _this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode?opt.strTrunkChannelDomainCode:_this.sie.strUserDomainCode,
					strTrunkChannelName: opt.strTrunkChannelName,
					nTrunkChannelType: opt.nTrunkChannelType?opt.nTrunkChannelType:1,
					nRecordStatus: opt.nRecordStatus?opt.nRecordStatus: 0,
					nSpeakTimeout: opt.nSpeakTimeout?opt.nSpeakTimeout: 60,
					lstTrunkChannelUser:opt.lstTrunkChannelUser
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" createTrunkChannelReq ",e);
	}
};

//增加集群人员响应
HY_SDK_WS.prototype.createTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.createTrunkChannelRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//获取集群频道列表
HY_SDK_WS.prototype.queryTrunkChannelListReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55425,
				msgBody: JSON.stringify({
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelKey:opt.strTrunkChannelKey,
					strTcUserDomainCode:opt.strTcUserDomainCode,
					strTcUserID:opt.strTcUserID,
					strBeginCreateTime:opt.strBeginCreateTime,
					strEndCreateTime: opt.strEndCreateTime ,
					nTrunkChannelType: opt.nTrunkChannelType,
					nRecordStatus: opt.nRecordStatus? opt.nRecordStatus:0,
					nPage: opt.nPage ? opt.nPage:1,
					nSize: opt.nSize ? opt.nSize:100,
					nReverse: opt.nReverse?opt.nReverse: 0
			})};
		//this.log(" HY_SDK_WS.prototype.queryTrunkChannelListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" queryTrunkChannelListReq ",e);
	}
};

//获取集群频道列表响应
HY_SDK_WS.prototype.queryTrunkChannelListRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.queryTrunkChannelListRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//删除集群
HY_SDK_WS.prototype.deleteTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.deleteTrunkChannelRsp = rollBack;
		var m = {					
				msgType: 55421,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID: _this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID: opt.nTrunkChannelID
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" deleteTrunkChannelReq ",e);
	}
};

//删除集群响应
HY_SDK_WS.prototype.deleteTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.deleteTrunkChannelRsp ::" +JSON.stringify(json));
};

//修改集群
HY_SDK_WS.prototype.modifyTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.modifyTrunkChannelRsp = rollBack;
		var m = {					
				msgType: 55417,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID: _this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID: opt.nTrunkChannelID,
					nSpeakTimeout: opt.nSpeakTimeout,
					strTrunkChannelName: opt.strTrunkChannelName
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" modifyTrunkChannelReq ",e);
	}
};

//修改集群响应
HY_SDK_WS.prototype.modifyTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.modifyTrunkChannelRsp ::" +JSON.stringify(json));
};


//获取集群频道信息
HY_SDK_WS.prototype.getTrunkChannelInfoReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55429,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID
			})};
		//this.log(" HY_SDK_WS.prototype.queryTrunkChannelListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("getTrunkChannelInfoReq ",e);
	}
};

//获取集群频道信息响应
HY_SDK_WS.prototype.getTrunkChannelInfoRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.getTrunkChannelInfoRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//进入频道
HY_SDK_WS.prototype.joinTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.joinTrunkChannelRsp = rollBack;
		var m = {					
				msgType: 55433,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID: _this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID: opt.nTrunkChannelID,
					nPriority: opt.nPriority
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" JoinTrunkChannelReq ",e);
	}
};

//进入频道响应
HY_SDK_WS.prototype.joinTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.joinTrunkChannelRsp ::" +JSON.stringify(json));
};

//离开频道
HY_SDK_WS.prototype.leaveTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.leaveTrunkChannelRsp = rollBack;
		var m = {					
				msgType: 55437,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID: _this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID: opt.nTrunkChannelID
			})};
		//this.log(" HY_SDK_WS.prototype.getTalkbackListReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error(" leaveTrunkChannelReq ",e);
	}
};

//离开频道响应
HY_SDK_WS.prototype.leaveTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.leaveTrunkChannelRsp ::" +JSON.stringify(json));
};

HY_SDK_WS.prototype.notifyTrunkChannelStatus = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyTrunkChannelStatus ::" +JSON.stringify(json));
	
	var tChannel ;
	if(this.callTC)
	{
		if(this.callTC.nTrunkChannelID == json.nTrunkChannelID && this.callTC.strTrunkChannelDomainCode == json.strTrunkChannelDomainCode)
		{
			tChannel = this.callTC;
			tChannel.notifyCallStatusInfo(json);
		}else
		{
			var key = json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode;
			tChannel = this.calledTC[json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode];
			if(tChannel &&_this.nowTChannel&& json.nTrunkChannelID == _this.nowTChannel.nTrunkChannelID&&json.strTrunkChannelDomainCode == _this.nowTChannel.strTrunkChannelDomainCode){
				tChannel.notifyCalledStatusInfo(json);
			}
			
			if(tChannel && json.nChangeType== 2){
				tChannel.notifyCalledStatusInfo(json);
			}
		}
	}
	else
	{
		var key = json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode;
		tChannel = this.calledTC[json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode];
		if(tChannel &&_this.nowTChannel&& json.nTrunkChannelID == _this.nowTChannel.nTrunkChannelID&&json.strTrunkChannelDomainCode == _this.nowTChannel.strTrunkChannelDomainCode){
			tChannel.notifyCalledStatusInfo(json);
		}
		
		if(tChannel && json.nChangeType== 2){
			tChannel.notifyCalledStatusInfo(json);
		}
	}
}


//集群踢人
HY_SDK_WS.prototype.kickoutTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55461,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID,
					lstTrunkChannelUser: opt.lstTrunkChannelUser
			})};
		//this.log(" HY_SDK_WS.prototype.kickoutTrunkChannelReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("kickoutTrunkChannelReq ",e);
	}
};

//集群踢人响应
HY_SDK_WS.prototype.kickoutTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.kickoutTrunkChannelRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};

//集群邀请
HY_SDK_WS.prototype.inviteUserTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 55467,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID,
					lstTrunkChannelUser: opt.lstTrunkChannelUser
			})};
		//this.log(" HY_SDK_WS.prototype.kickoutTrunkChannelReq ::" +JSON.stringify(m));
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("inviteUserTrunkChannelReq ",e);
	}
};

//集群邀请响应
HY_SDK_WS.prototype.inviteUserTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.inviteUserTrunkChannelRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//集群踢人通知
HY_SDK_WS.prototype.notifyUserKickTrunkChannel = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyUserKickTrunkChannel ::" +JSON.stringify(json));
	
	var tChannel ;
	if(this.callTC)
	{
		if(this.callTC.nTrunkChannelID == json.nTrunkChannelID && this.callTC.strTrunkChannelDomainCode == json.strTrunkChannelDomainCode)
		{
			tChannel = this.callTC;
			
		}else
		{
			tChannel = this.calledTC[json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode];
		}
	}
	else
	{
		tChannel = this.calledTC[json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode];
	}
	if(tChannel){
		tChannel.notifyUserKick(json);
	}
};

//集群邀请响应
HY_SDK_WS.prototype.notifyUserInviteTrunkChanne = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyUserInviteTrunkChanne ::" +JSON.stringify(json));
	if(json.strInviterDomainCode == _this.sie.strUserDomainCode && json.strInviterUserID ==_this.opts.loginName ){
	}else{
		var key = json.nTrunkChannelID+"_"+json.strTrunkChannelDomainCode;
		if(json.nEnforce == 1){
			json.forceIn = true;
			var p = {
		        tChannel: json
			}
			_this.calledTC[key] = _this.calledTChannel(p);
		}else{
			var p = {
		        tChannel: json
			}
			_this.calledTC[key] = _this.calledTChannel(p);
		}
	}
};


//抢占集群话权
HY_SDK_WS.prototype.getSpeakRightReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.getSpeakRightRsp = rollBack;
		var m = {					
				msgType: 55441,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("getSpeakRightReq ",e);
	}
};

//抢占集群话权响应
HY_SDK_WS.prototype.getSpeakRightRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.getSpeakRightRsp ::" +JSON.stringify(json));
};

//开始集群发言
HY_SDK_WS.prototype.startTrunkChannelSpeakReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.startTrunkChannelSpeakRsp = rollBack;
		var m = {					
				msgType: 55445,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("startTrunkChannelSpeakReq ",e);
	}
};

//开始集群发言响应
HY_SDK_WS.prototype.startTrunkChannelSpeakRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.startTrunkChannelSpeakRsp ::" +JSON.stringify(json));
};


//开始集群发言
HY_SDK_WS.prototype.stopTrunkChannelSpeakReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.stopTrunkChannelSpeakRsp = rollBack;
		var m = {					
				msgType: 55449,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("stopTrunkChannelSpeakReq ",e);
	}
};

//开始集群发言响应
HY_SDK_WS.prototype.stopTrunkChannelSpeakRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.stopTrunkChannelSpeakRsp ::" +JSON.stringify(json));
};

//开始监听频道
HY_SDK_WS.prototype.observerTrunkChannelReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.observerTrunkChannelRsp = rollBack;
		var m = {					
				msgType: 55473,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID,
					nEnable: opt.nEnable
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("observerTrunkChannelReq ",e);
	}
};

//监听频道响应
HY_SDK_WS.prototype.observerTrunkChannelRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.observerTrunkChannelRsp ::" +JSON.stringify(json));
};

//频道录音控制
HY_SDK_WS.prototype.trunkChannelRecordControlReq = function (opt,rollBack) {
	var _this = this;
	try{	
		_this.trunkChannelRecordControlRsp = rollBack;
		var m = {					
				msgType: 55453,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strTrunkChannelDomainCode:opt.strTrunkChannelDomainCode,
					nTrunkChannelID:opt.nTrunkChannelID,
					nRecordStatus:opt.nRecordStatus
			})};
       	_this.sendMsg(m, _this.seqNo);
	}catch(e){
	  console && console.error("trunkChannelRecordControlReq ",e);
	}
};

//录音控制响应
HY_SDK_WS.prototype.trunkChannelRecordControlRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.trunkChannelRecordControlRsp ::" +JSON.stringify(json));
};

/**==============================================================*/
function HY_PLAYER_WS(opts){	
		this.wsserverurl = opts.wsserver;
		this.rtspurl = opts.rtspurl;
		this.queue = [];
		this.mediaplayer = opts.mediaplayer;
		this.needsend = false;
		this.openws = this.openws.bind(this);
		this.stop = this.stop.bind(this);
		this.loadvideo = this.loadvideo.bind(this);
		this.onUpdateEnd = this.onUpdateEnd.bind(this);
		this.onCanPlay = this.onCanPlay.bind(this);
		this.onMediaSourceOpen = this.onMediaSourceOpen.bind(this);
		this.openws();
		this.checkCon();
		this.logflag = false;
		if(opts.log === true)
		{
			this.logflag = true;
		}
};
HY_PLAYER_WS.prototype.log = function() {
	var _this = this;
	if (_this.logflag === true) {		
		for(var i = 0; i< arguments.length; i++)
		{
	    	 window.console && window.console.log(arguments[i]);				
		}
	}
};
//检查是否连接
HY_PLAYER_WS.prototype.checkCon = function(){
	var _this = this;
	var scode = {
		"0" : "连接尚未建立",
		"1" : "连接已建立，可以进行通信",
		"2" : "连接正在进行关闭",
		"3" : "连接已经关闭或者连接不能打开"
	};
	_this.idx = setInterval(function() {
		try{
			var state = _this.websocket.readyState;
			if (state == 3 || state == 0) {
				if(_this.websocket.closeFlag){
					clearInterval(_this.idx);
					_this.wsclose();
					console.log("主动停止====");
				}else{
					_this.openws();	
				}
			}
		}catch(e){
		    window.console && window.console.error(e);
		}
	}, 5000);
};

HY_PLAYER_WS.prototype.openws = function() {
	    this.log(" HY_PLAYER_WS.prototype.openws ");
        this.websocket = new WebSocket(this.wsserverurl);
        this.websocket.closeFlag = false;//用于判断是否手动停止
        this.websocket.onopen =  this.onOpen.bind(this); 
        this.websocket.onclose = this.onClose.bind(this); 
        this.websocket.onmessage = this.onMessage.bind(this); 
        this.websocket.onerror = this.onError.bind(this); 
};
	
HY_PLAYER_WS.prototype.onOpen = function(evt) { 
		this.websocket.binaryType="arraybuffer";
        this.log("HY_PLAYER_WS CONNECTED 连接服务器成功"); 
		var sendurl = {"id":2,"url":this.rtspurl};
		this.doSend(JSON.stringify(sendurl)); 
    };
/**
 *     CTRL_ID_START=2,
		CTRL_ID_STOP=3,
		CTRL_ID_PAUSE=4,
		CTRL_ID_RESUME=5
 * @param {} evt
 */
HY_PLAYER_WS.prototype.wsclose = function() { 
        this.log("发送关闭webocket消息,并关闭socket连接"); 
        this.queue = [];
		var sendurl = {"cmd":3,"id":4};
		this.doSend(JSON.stringify(sendurl)); 
		this.websocket.close();
    };	
HY_PLAYER_WS.prototype.onClose= function(evt) { 
    this.log("HY_PALAYER_WS.prototype.onClose DISCONNECTED"); 
	//this.websocket.close();
	clearInterval(this.idx);
} ;
	
HY_PLAYER_WS.prototype.onMessage= function(evt) { 
		if(typeof(evt.data) == "string")            //服务器传过来的可能是字符串，判断是不是
        {
            var str = evt.data;
			this.log("HY_PLAYER_WS --- onMessage:::"+str);
			if(str){
				var json = JSON.parse(str);
				if(json.id == 1)
				{
						var mimestr = json.open;//strs[0];
						this.playurl(mimestr);
				}
			}else{
				console.error("HY_PLAYER_WS --- onMessage:::"+JSON.stringify(evt));
			}
        }
        else
        {
			var result = new Uint8Array(evt.data);
			this.queue.push(result);
			if (this.needsend == true)
			{
				this.loadvideo();
			}
        }
    };
HY_PLAYER_WS.prototype.onError= function(evt) { 
        this.log('HY_PLAYER_WS ERROR:'+ evt.data); 
		this.stop();
    } ;
  
HY_PLAYER_WS.prototype.doSend= function(message) { 
        this.log(" HY_PLAYER_WS SENT: " + message);  
        this.websocket.send(message); 
    };
	
HY_PLAYER_WS.prototype.playurl= function(mimestr){
	    var _this = this;
		this.supportstr = 'video/mp4; codecs=\"' + mimestr + '\"'; 
		_this.log("call playurl:", this.supportstr);
		if (MediaSource.isTypeSupported(this.supportstr)) {
			this.mediaSource = new MediaSource;
			this.mediaSource.addEventListener('sourceopen',this.onMediaSourceOpen);
			this.mediaplayer.src = URL.createObjectURL(this.mediaSource);
			this.mediaplayer.addEventListener("canplay", this.onCanPlay);
			var video = this.mediaplayer;
					
		    video.addEventListener('pause', function(e) {
		      _this.log('暂停播放');
		      video.play();
		    });
    
		   /* video.addEventListener('volumechange', function(e) {
		      _this.log('volumechange:::'+ video.volume);
		    });*/
		}else{
			_this.log("Unsupported MIME type or codec: ", + this.supportstr);
		}
	};
	
HY_PLAYER_WS.prototype.onCanPlay= function(){
		//console.log("!!!!!!!!HY_PLAYER_WS play");
		this.mediaplayer.play();
	};
	
HY_PLAYER_WS.prototype.onMediaSourceOpen= function(e){
		this.mediaSource.removeEventListener('sourceopen', this.onMediaSourceOpen);
		this.log("sourceopen" + this.supportstr);
		this.sourceBuffer = this.mediaSource.addSourceBuffer(this.supportstr);
		this.loadvideo();
		this.sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
	};
	
HY_PLAYER_WS.prototype.onUpdateEnd= function(e){
		this.sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
		this.loadvideo();
	};
	
HY_PLAYER_WS.prototype.stop= function(){
		this.log('HY_PLAYER_WS stop,服务连接失败停止播放');
		this.mediaplayer.pause();
		if(this.sourceBuffer){
			this.sourceBuffer.abort();
		}
		if(this.mediaSource){
			this.mediaSource.endOfStream();
		}
	};
HY_PLAYER_WS.prototype.loadvideo= function(){
		if (this.queue && this.queue.length){
			if (!this.sourceBuffer.updating){
				try{
					this.needsend = false;
					var newBuffer = this.queue.shift();				
					this.sourceBuffer.appendBuffer(newBuffer);
					if(this.sourceBuffer.buffered.length > 0)
					{
						var t = this.sourceBuffer.buffered.end(0);
					    var s = this.mediaplayer.currentTime;
					    if(t - s > 5)
					    {
					    	this.log("播放时间与视频时间相差5秒： " + t + "-" + s);
					    	this.wsclose();
					    	this.openws();
					    }
					}
				}catch(e){
				  this.log(e);
				}
				newBuffer = null;
			}else{
				this.needsend = true;
			}		
		}else{
			this.needsend = true;
		}
};
function mainPlayer(opts)
{
	var _this = this;
	_this.maxNumber = 25;
	this.players = [];
	var defaultO = {
		screenchangeBtn: true,
		changeVoiceBtn: true,
		closeBtn:true ,
		recordBtn:false,
		fillBtn: true
	}
	_this.isFill = true;
	Object.assign(defaultO, opts.videoControl);
	this.videoControl = defaultO;
	this.opts = opts;
	
	this.sdk = opts.sdk;
	this.setLayoutModel();
	this.setMeetLayoutModel();
	if(opts.pnode)
	{
	    var pnode = document.getElementById(opts.pnode);
	    while(pnode.hasChildNodes())
		　　{
		　　　　pnode.removeChild(pnode.firstChild);
		　　}
	    if(this.opts.width){}else{
		    this.opts.width = pnode.offsetWidth-2;
	    }
	    if(this.opts.height){}else{
		    this.opts.height = pnode.offsetHeight-2;
	    }
	    if(this.opts.layout){}else{
		    this.opts.layout = 1;
	    }
	    
	    var div = document.createElement("div");
	    div.style.width  = (pnode.offsetWidth)-2+"px";
	    div.style.height  = (pnode.offsetHeight)-2+"px";
	    div.style.border  = "1px solid #aaa";
	    div.style.overflow = "hidden";
	    div.style.backgroundColor  = "#f3f3f3";
	    div.style.position  = "relative";
	    div.style.boxSizing = 'border-box';
	    this.opts.pnode = div;
	    this.initControlAllBar();
	    pnode.appendChild(div);
	    var pre = ""
	    if(typeof(opts.layout) == "string" && opts.layout.indexOf("Meet")!=-1){
	    	_this.layoutNum = opts.layout.split("Meet")[1];
	    	pre = "Meet";
	    }else if (typeof(opts.layout) == "string" && opts.layout.indexOf("Meeting")!=-1){
	    	_this.layoutNum = opts.layout.split("Meeting")[1];
	    	pre = "Meeting";
	    }else{
	    	_this.layoutNum = opts.layout;
	    }
	    if(_this.layoutNum>_this.maxNumber){
	    	this["setLayout"+pre+"25"]();
	    	var len = _this.layoutNum;
	    	for(i=0;i<len;i++){
	    		 var p1 = {width:"100%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this};
	    		 var newVideo = new hyVideo(p1);
    			 _this.players.push(newVideo);
    			 newVideo.videoPanel.style.display='none';
	    	}
	    }else{
	    	this["setLayout"+opts.layout]();
	    }
    	
	   
	}else
	{
		hy_error(" parent node is null.");
		return null;
	}
};

mainPlayer.prototype.initControlAllBar = function()
{
	var _this = this;
	var root = this.opts.pnode;
	var bar = hyVideo.prototype.setToolBar({obj:_this,type:"all"});
	root.appendChild(bar);
	root.onmousemove = function(ev){
		ev = ev||window.event;
		var tTop = 0;
	  	var obj = root;
	  	 while(obj.offsetParent)
	    {
		    tTop+=obj.offsetTop;
		    obj=obj.offsetParent;
	    } 
	 // var s = root.getBoundingClientRect();
//	console.error("top:"+root.offsetTop+"height"+root.clientHeight+"clientY:::"+ev.clientY+"pageY:::"+ev.pageY);
	//console.error("res:"+(root.clientHeight-(ev.pageY- root.offsetTop)));
		if(root.offsetTop >0 &&(root.clientHeight-(ev.pageY- root.offsetTop)<= _this.barHeight)){
			bar.style.display = 'block';
		}else if(root.offsetTop == 0 && (root.clientHeight-ev.clientY <= _this.barHeight)){
			bar.style.display = 'block';
		}else{
			
			if(hyVideo.prototype.isSettingPlay(_this)){
			}else{
				bar.style.display = 'none';
			}
		}
	}
	root.onmouseleave = function(){
		bar.style.display = 'none';
		/*_this.soundControl.style.display = 'none';
		_this.bitWarp.style.display = 'none';
		_this.isSettingVoice = false;
		_this.isSettingBit = false;
		_this.isSettingAudio = false;
		_this.isSettingVideo = false;
		_this.isSettingCurres= false;*/
		hyVideo.prototype.hideBtnAndWarp(_this);
	}
	this.toolBar = bar;
	this.setButton();
	hyVideo.prototype.setAvailableBtn({obj: _this});
};

mainPlayer.prototype.setButton = function(){
	try{
		var _this = this;
		hyVideo.prototype.setButtonAction({
			type: "allControl",
			obj: _this,
			pnode:_this.opts.pnode,
			closeFunc: function(){
				_this.stopPlay();
			},
			fillFun:function(){
				for(var i=0;i<_this.players.length;i++){
					(function(video){
						video.isFill = _this.isFill;
						if(_this.isFill){
						 	video.videoElement.style.objectFit ="fill";
						}else{
							 video.videoElement.style.objectFit ="";
						}
					})(_this.players[i]);
				}
			},
			soundFunc:function(res){
				var topV = res.top;
				var maxHeight = res.maxHeight;
				var valueH =  _this.soundHeight -topV;
				_this.soundBtn.style.top= topV+"px";
				_this.soundValue.style.height =valueH+"px";
				var volume = (maxHeight -topV)/maxHeight;	
				for(var i=0;i<_this.players.length;i++){
					(function(video){
						video.soundBtn.style.top= topV+"px";
						video.soundValue.style.height = valueH+"px";
						video.videoElement.volume = volume;
					})(_this.players[i]);
				}
			},
			bitFunc: function(info){
			},
			startRecordFunc: function(){
				_this.recordBtn.style.display = "none";
				_this.stopWarp.style.display = "block";
		      	for(var i=0;i<_this.players.length;i++){
					(function(video){
						if(!video.recordFlag){
							video.recordBtn.click();
						}
					})(_this.players[i]);
				}
			},
			stopRecordFunc:function(){
				_this.recordBtn.style.display = "none";
				_this.stopWarp.style.display = "block";
				for(var i=0;i<_this.players.length;i++){
					(function(video){
						if(video.recordFlag ){
							video.stopReocrd.click();
						}
					})(_this.players[i]);
				}
			}
		});

	  //页面切换
	  _this.observeSizeChange({node:_this.opts.pnode, clickImg:_this.fullImg, obj: _this});

	}catch(e){console.error("mainPlayer setButton:::"+e)}
};

mainPlayer.prototype.observeSizeChange = function(opt){
	var observeNode = opt.node;
	var _this = opt.obj;
	var clickImg = opt.clickImg;
	try{
		 _this.myObserver = new ResizeObserver(entries => {
	        entries.forEach(entry => {
	        	var typ = observeNode.getAttribute("layoutType");
	        	//console.log('大小位置', typ);
	        	
	//          	console.log('监听的DOM', entry.target)
	        	var wh = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
	        	if(entry.contentRect.width == (wh-2)){
	        		clickImg.src = 'data:image/png;base64,'+imgMap["fullscreen_exit"];
	        		_this.full = 2;
	        		if(typ&& typ > 0){
	        			var tf  = document.getElementById("meeting_video_tf_"+typ);
	        			tf.style.height= observeNode.getAttribute("allHeight");
	        		}
	        		
	        		if(_this.videoTopDiv){
	        			_this.videoTopDiv.style.height = _this.videoTopDiv.allHeight;
	        		}
	        		
	        		if(_this.videoBottomDiv){
	        			_this.videoBottomDiv.style.height = _this.videoBottomDiv.allHeight;
	        		}
	        		
	        		if(_this.mianVideoDiv){
	        			_this.mianVideoDiv.style.width = _this.mianVideoDiv.allWidth;
	        			_this.mianVideoDiv.style.height = _this.mianVideoDiv.allHeight;
	        		}
	        		
	        	}else{
	        		clickImg.src = 'data:image/png;base64,'+imgMap["fullscreen"];
	        		_this.full = 1;
	        		if(typ&& typ > 0){
	        			var h = observeNode.getAttribute("srcHeight");
	        			var tf  = document.getElementById("meeting_video_tf_"+typ);
	        			if(tf){
		        			tf.style.height=h;
	        			}
	        		}
	        		
	        		if(_this.videoTopDiv){
	        			_this.videoTopDiv.style.height = _this.videoTopDiv.srcHeight;
	        		}
	        		
	        		if(_this.videoBottomDiv){
	        			_this.videoBottomDiv.style.height = _this.videoBottomDiv.srcHeight;
	        		}
	        		
	        		if(_this.mianVideoDiv){
	        			_this.mianVideoDiv.style.width = _this.mianVideoDiv.srcWidth;
	        			_this.mianVideoDiv.style.height = _this.mianVideoDiv.srcHeight;
	        		}
	        	}
	        })
	      });
	    _this.myObserver.observe(observeNode);
	}
	catch(e){
      sdk.log(" ResizeObserver 调用失败", e);
    }
}

mainPlayer.prototype.stopPlay = function(opt){
	var _this = this;
	for(var i=0;i<_this.players.length;i++){
		(function(video){
			video.close();
		})(_this.players[i]);
	}
	
};

mainPlayer.prototype.setLayout1 = function()
{
	 var _this = this;
	  var p = {
		  width:"100%",
		  height:"100%",
		  pnode:_this.opts.pnode,
		  mainPlay: _this
	  }; 
	  _this.players.push(new hyVideo(p));
};
mainPlayer.prototype.setLayout2 = function()
{
	  var _this = this;
	  var p = {width:"50%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p));
	    	  
	  var p1 = {width:"50%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p1));
};
mainPlayer.prototype.setLayout3 = function()
{
	  var _this = this;
	  var p = {width:"60%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p));
	  for(var i= 0;i<2;i++)
	  {
    	  var p1 = {width:"40%",height:"50%",pnode:_this.opts.pnode, mainPlay: _this}; 
		  _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout4 = function()
{
	  var _this = this;
	  for(var i= 0;i<4;i++)
	  {
    	  var p1 = {width:"50%",height:"50%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout5 = function()
{
	  var _this = this;
	  var p = {width:"70%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p));
	  for(var i= 0;i<4;i++)
	  {
    	  var p1 = {width:"30%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout6 = function()
{
	  var _this = this;
	  var p = {width:"66.66%",height:"66.65%",pnode:_this.opts.pnode, mainPlay: _this}; 
	 _this.players.push(new hyVideo(p));

	  for(var i= 0;i<5;i++)
	  {
    	  var p1 = {width:"33.33%",height:"33.33%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	  
	  
};
mainPlayer.prototype.setLayout7 = function()
{
	  var _this = this;
	  var p = {width:"75%",height:"67.99%",pnode:_this.opts.pnode, mainPlay: _this}; 
	 _this.players.push(new hyVideo(p));
	  for(var i= 0;i<6;i++)
	  {
    	  var p1 = {width:"25%",height:"34%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout8 = function()
{
	  var _this = this;
	   var p = {width:"75%",height:"75%",pnode:_this.opts.pnode, mainPlay: _this}; 
	 _this.players.push(new hyVideo(p));
	  for(var i= 0;i<7;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout9 = function()
{
	 var _this = this;
	  for(var i= 0;i<9;i++)
	  {
    	  var p1 = {width:"33.33%",height:"33.33%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout10 = function()
{
	 var _this = this;
	  for(var i= 0;i<10;i++)
	  {
    	  var p1 = {width:"50%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout11= function()
{
	  var _this = this;
	  for(var i= 0;i<12;i++)
	  {
    	  var p1 = {width:"33.33%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout12 = function()
{
	  var _this = this;
	  for(var i= 0;i<12;i++)
	  {
    	  var p1 = {width:"33.33%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout13 = function()
{
	  var _this = this;
	  for(var i= 0;i<14;i++)
	  {
    	  var p1 = {width:"50%",height:"17.5%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout14 = function()
{
	 var _this = this;
	  for(var i= 0;i<14;i++)
	  {
    	  var p1 = {width:"50%",height:"17.5%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout15 = function()
{
	  var _this = this;
	 for(var i= 0;i<15;i++)
	  {
    	  var p1 = {width:"33.33%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout16 = function()
{
	  var _this = this;
	 for(var i= 0;i<16;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};

mainPlayer.prototype.setLayout17 = function()
{
	  var _this = this;
	  for(var i= 0;i<18;i++)
	  {
    	  var p1 = {width:"33.3%",height:"16.6%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout18 = function()
{
	   var _this = this;
	  for(var i= 0;i<18;i++)
	  {
    	  var p1 = {width:"33.3%",height:"16.6%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout19 = function()
{
	  var _this = this;
	  for(var i= 0;i<20;i++)
	  {
    	  var p1 = {width:"25%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout20 = function()
{
	  var _this = this;
	  for(var i= 0;i<20;i++)
	  {
    	  var p1 = {width:"25%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout21 = function()
{
	  var _this = this;
	  for(var i= 0;i<21;i++)
	  {
    	  var p1 = {width:"33.3%",height:"14.5%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout22 = function()
{
	  var _this = this;
	  for(var i= 0;i<24;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout23 = function()
{
	   var _this = this;
	  for(var i= 0;i<24;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout24 = function()
{
	   var _this = this;
	  for(var i= 0;i<24;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout25 = function()
{
	   var _this = this;
	  for(var i= 0;i<25;i++)
	  {
    	  var p1 = {width:"20%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.getTransform = function(json)
{
	 var d = document.createElement("div");
	  d.style.height = json.h;
	  d.style.width =json.w;
	  //d.style.backgroundColor  = "green";
	  d.style.position = "absolute";
	  d.style.top = json.t;
	  d.style.left = "50%";
	  d.setAttribute("id","meeting_video_tf_"+json.tfi);
	  d.style.transform = "translate(-50%,-50%)";
	  this.transformDiv = d;
	  return d;
}
mainPlayer.prototype.setLayoutMeet2 = function()
{
	  var _this = this;
	  var w = _this.opts.pnode.clientWidth;
	  var h = _this.opts.pnode.clientHeight;
	  var hh = w*0.5*(9/16)/h*100 +"%";
	  var h = "100%";
	  _this.opts.pnode.setAttribute("layoutType","2");
	  _this.opts.pnode.setAttribute("srcHeight",hh);
	   _this.opts.pnode.setAttribute("allHeight","50%");
	  var d = _this.getTransform({h:hh, w:"100%",t:"50%",tfi:2});
	  _this.opts.pnode.appendChild(d);
	  for(var i= 0;i<2;i++)
	  {
    	  var p1 = {width:"50%",height:h, pnode:d, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeet3 = function()
{
	 var _this = this;
	  var w = _this.opts.pnode.clientWidth;
	  var h = _this.opts.pnode.clientHeight;
	  var hh = w*0.5*(9/16)/h*2*100 +"%";
	  var h = "50%";
	  var lay = 3;
	  _this.opts.pnode.setAttribute("layoutType",lay);
	  _this.opts.pnode.setAttribute("srcHeight",hh);
	  _this.opts.pnode.setAttribute("allHeight","100%");
	  
	 var d = _this.getTransform({h:hh, w:"100%",t:"50%",tfi:lay});
	  _this.opts.pnode.appendChild(d);
	  for(var i= 0;i<2;i++)
	  {
    	  var p1 = {width:"50%",height:h,pnode:d, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	  
	 /* var dd = _this.getTransform({h:h, w:"50%",t:"75%"});
	  d.appendChild(dd);*/
	  
	   var p2 = {width:"50%",height:"50%",pnode:d, mainPlay: _this}; 
	   var pp = new hyVideo(p2);
	   pp.videoPanel.style.marginLeft = "25%";
	  _this.players.push(pp);
	  /* pp.videoPanel.style.position = "absolute";
	   pp.videoPanel.style.top = "75%";
	   pp.videoPanel.style.left = "50%";
	   pp.videoPanel.style.transform = "translate(-50%,-50%)";*/
};
mainPlayer.prototype.setLayoutMeet4 = function()
{
	  var _this = this;
	  var w = _this.opts.pnode.clientWidth;
	  var h = _this.opts.pnode.clientHeight;
	  var hh = w*0.5*(9/16)/h*2*100 +"%";
	  var h = "50%";
	  _this.opts.pnode.setAttribute("layoutType","4");
	  _this.opts.pnode.setAttribute("srcHeight",hh);
	   _this.opts.pnode.setAttribute("allHeight","100%");
	  
	  var d = _this.getTransform({h:hh, w:"100%",t:"50%",tfi:4});
	  _this.opts.pnode.appendChild(d);
	  for(var i= 0;i<4;i++)
	  {
    	  var p1 = {width:"50%",height:h, pnode:d, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};

mainPlayer.prototype.setLayoutMeet5 = function()
{
	 var _this = this;
	  var w = _this.opts.pnode.clientWidth;
	  var h = _this.opts.pnode.clientHeight;
	  var hh = w*0.3333*(9/16)/h*2*100 +"%";
	  var h = "50%";
	  _this.opts.pnode.setAttribute("layoutType","5");
	  _this.opts.pnode.setAttribute("srcHeight",hh);
	   _this.opts.pnode.setAttribute("allHeight","66.666%");
	  var d = _this.getTransform({h:hh, w:"100%",t:"50%",tfi:5});
	  _this.opts.pnode.appendChild(d);
	  for(var i= 0;i<3;i++)
	  {
    	  var p1 = {width:"33.33%",height:h,pnode:d, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	  
	 /* var dd = _this.getTransform({h:"50%", w:"66.66%",t:"75%"});
	  d.appendChild(dd);*/
	  for(var i= 0;i<2;i++)
	  {
    	 var p2 = {width:"33.33%",height:"50%",pnode:d, mainPlay: _this}; 
	  	 var pp = new hyVideo(p2);
	  	 if(i==0){
	  	 	 pp.videoPanel.style.marginLeft = "16.665%";
	  	 }
	  	 _this.players.push(pp);
	  }
};

mainPlayer.prototype.setLayoutMeet6 = function()
{
	  var _this = this;
	  var w = _this.opts.pnode.clientWidth;
	  var h = _this.opts.pnode.clientHeight;
	  var hh = w*0.3333*(9/16)/h*2*100 +"%";
	  var h = "50%";
	  
	  var lay = 6;
	  _this.opts.pnode.setAttribute("layoutType",lay);
	  _this.opts.pnode.setAttribute("srcHeight",hh);
	  _this.opts.pnode.setAttribute("allHeight","66.666%");
	  
	  var d = _this.getTransform({h:hh, w:"100%",t:"50%",tfi:lay});
	  _this.opts.pnode.appendChild(d);
	  for(var i= 0;i<6;i++)
	  {
    	  var p1 = {width:"33.33%",height:h, pnode:d, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};

mainPlayer.prototype.setLayoutMeeting1 = function()
{
	 var _this = this;
	  var p = {
		  width:"100%",
		  height:"100%",
		  pnode:_this.opts.pnode,
		  mainPlay: _this
	  }; 
	  _this.players.push(new hyVideo(p));
};
mainPlayer.prototype.setLayoutMeeting2 = function()
{
	  var _this = this;
	  var p = {width:"50%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p));
	    	  
	  var p1 = {width:"50%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p1));
};
mainPlayer.prototype.setLayoutMeeting3 = function()
{
	  var _this = this;
	  var p = {width:"60%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p));
	  for(var i= 0;i<2;i++)
	  {
    	  var p1 = {width:"40%",height:"50%",pnode:_this.opts.pnode, mainPlay: _this}; 
		  _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting4 = function()
{
	  var _this = this;
	  for(var i= 0;i<4;i++)
	  {
    	  var p1 = {width:"50%",height:"50%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting5 = function()
{
	  var _this = this;
	  var p = {width:"70%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
	  _this.players.push(new hyVideo(p));
	  for(var i= 0;i<4;i++)
	  {
    	  var p1 = {width:"30%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting6 = function()
{
	  var _this = this;
	  var p = {width:"66.66%",height:"66.65%",pnode:_this.opts.pnode, mainPlay: _this}; 
	 _this.players.push(new hyVideo(p));

	  for(var i= 0;i<5;i++)
	  {
    	  var p1 = {width:"33.33%",height:"33.33%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	  
	  
};
mainPlayer.prototype.setLayoutMeeting7 = function()
{
	  var _this = this;
	  var p = {width:"75%",height:"67.99%",pnode:_this.opts.pnode, mainPlay: _this}; 
	 _this.players.push(new hyVideo(p));
	  for(var i= 0;i<6;i++)
	  {
    	  var p1 = {width:"25%",height:"34%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting8 = function()
{
	  var _this = this;
	   var p = {width:"75%",height:"75%",pnode:_this.opts.pnode, mainPlay: _this}; 
	 _this.players.push(new hyVideo(p));
	  for(var i= 0;i<7;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting9 = function()
{
	 var _this = this;
	  for(var i= 0;i<9;i++)
	  {
    	  var p1 = {width:"33.33%",height:"33.33%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting10 = function()
{
	 var _this = this;
	  for(var i= 0;i<10;i++)
	  {
    	  var p1 = {width:"50%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting11= function()
{
	  var _this = this;
	  for(var i= 0;i<12;i++)
	  {
    	  var p1 = {width:"33.33%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayoutMeeting12 = function()
{
	  var _this = this;
	  for(var i= 0;i<12;i++)
	  {
    	  var p1 = {width:"33.33%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting13 = function()
{
	  var _this = this;
	  for(var i= 0;i<14;i++)
	  {
    	  var p1 = {width:"50%",height:"17.5%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting14 = function()
{
	 var _this = this;
	  for(var i= 0;i<14;i++)
	  {
    	  var p1 = {width:"50%",height:"17.5%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting15 = function()
{
	  var _this = this;
	 for(var i= 0;i<15;i++)
	  {
    	  var p1 = {width:"33.33%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting16 = function()
{
	  var _this = this;
	 for(var i= 0;i<16;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};

mainPlayer.prototype.setLayoutMeeting17 = function()
{
	  var _this = this;
	  for(var i= 0;i<18;i++)
	  {
    	  var p1 = {width:"33.3%",height:"16.6%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting18 = function()
{
	   var _this = this;
	  for(var i= 0;i<18;i++)
	  {
    	  var p1 = {width:"33.3%",height:"16.6%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting19 = function()
{
	  var _this = this;
	  for(var i= 0;i<20;i++)
	  {
    	  var p1 = {width:"25%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting20 = function()
{
	  var _this = this;
	  for(var i= 0;i<20;i++)
	  {
    	  var p1 = {width:"25%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting21 = function()
{
	  var _this = this;
	  for(var i= 0;i<21;i++)
	  {
    	  var p1 = {width:"33.3%",height:"14.5%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting22 = function()
{
	  var _this = this;
	  for(var i= 0;i<24;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting23 = function()
{
	   var _this = this;
	  for(var i= 0;i<24;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting24 = function()
{
	   var _this = this;
	  for(var i= 0;i<24;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayoutMeeting25 = function()
{
	   var _this = this;
	  for(var i= 0;i<25;i++)
	  {
    	  var p1 = {width:"20%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};

mainPlayer.prototype.playByVideo = function(opts)
{
	  var _this = this;
	  var oop = {
    	    wsserver:opts.wsserver ? opts.wsserver:_this.sdk.opts.sieStreamUrl,
    	    rtspurl:opts.rtspurl,
    	    log:opts.log
    	  };
   	  opts.hyVideo.setVideoParam(opts);
	  opts.hyVideo.play(oop);	
};
mainPlayer.prototype.play = function(opts)
{
	  var _this = this;
	  if(activeHyVideo)
	  {
	  	 var oop = {
    	    wsserver:opts.wsserver?opts.wsserver:_this.sdk.opts.sieStreamUrl ,
    	    rtspurl:opts.rtspurl,
    	    log:opts.log
    	  };
    	activeHyVideo.setVideoParam(opts);
	  	activeHyVideo.play(oop);	  
	  }else
	  {
	  	alert("未选择播放器!");
	  }
};

mainPlayer.prototype.fullScreen = function()
{
	var _this = this;
	var node = _this.opts.pnode;
	 if (node.requestFullscreen) {
	 node.requestFullscreen();
    } else if (node.mozRequestFullScreen) {
    	node.mozRequestFullScreen();
    } else if (node.webkitRequestFullScreen) {
    	node.webkitRequestFullScreen();
    }
};

/*
 * 定义布局模型
 * layoutModel={
 * 	5:{//总布局数为5
 * 		shapeNum：2 //宽高不一样的布局的个数
 * 		0:{width : "70%","height" : "100%"} 定义的第一种布局的宽为70% 高为"100%"
 * 		1: {width : "30%","height" : "25%"}	定义的第二种布局的宽为30% 高为"25%"
 * 		layShapeRelate:{//video布局的顺序与布局宽高的关联,总共几个布局就得有几个对应关系
 * 			0:0,第一个video的对应自定义layoutModel的key为0的属性
 * 			1:1,第二个video的对应自定义layoutModel的key为1的属性
 * 			2:1,第三个video的对应自定义layoutModel的key为1的属性
 * 			3:1,第四个video的对应自定义layoutModel的key为1的属性
 * 			3:1,第五个video的对应自定义layoutModel的key为1的属性
 * 		},
 * 		same:,//等同于，追加布局的时候用,
 * reduceNum//减少布局时使用，一次减少多少个
 * 	  }
 * }
 * 
 * 
 */
mainPlayer.prototype.setLayoutModel = function(){
	this.layoutModel = {
		1 : {0:{width : "100%","height" : "100%"}},
	    2:{shapeNum: 1,0: {width : "50%","height" : "100%"}},
	    3:{shapeNum: 2,0: {width : "60%","height" : "100%"},1: {width : "40%","height" : "50%"}},
	    4:{shapeNum: 1,0: {width : "50%","height" : "50%"}},
	    5:{shapeNum: 2,layShapeRelate:{0:0,1:1,2:1,3:1,4:1},0: {width : "70%","height" : "100%"},1: {width : "30%","height" : "25%"}},
	    6:{shapeNum: 2,0: {width : "66.66%","height" :"66.65%"},1: {width : "33.33%","height" :"33.33%"}},
	    7:{shapeNum: 2,0: {width : "75%","height" : "67.99%"},1: {width : "25%","height" : "34%"}},
	    8:{shapeNum: 2,0: {width : "75%","height" : "75%"},1: {width : "25%","height" : "25%"}},
	    9:{shapeNum: 1,0: {width : 100/3+"%","height":100/3+"%"}},
	    10:{shapeNum: 1,0: {width : "50%","height":"20%"},"reduceNum":2},
     	11:{shapeNum: 1,0: {width : 100/3+"%","height":"25%"},"same":12},
	    12:{shapeNum: 1,0: {width : 100/3+"%","height":"25%"},"reduceNum":2},
	    13:{shapeNum: 1,0: {width : "50%","height":"17.5%"},"same":14},
	    14:{shapeNum: 1,0: {width : "50%","height":"17.5%"}},
	    15:{shapeNum: 1,0: {width : "33.33%","height":"20%"}},
	    16:{shapeNum: 1,0: {width : "25%","height":"25%"},"reduceNum":2},
     	17:{shapeNum: 1,0: {width : "33.33%","height":"16.6%"},"same":18},
      	18:{shapeNum: 1,0: {width : "33.33%","height":"16.6%"},"reduceNum":2},
   		19:{shapeNum: 1,0: {width : "25%","height":"20%"},"same":20},
        20:{shapeNum: 1,0: {width : "25%","height":"20%"}},
        21:{shapeNum: 1,0: {width : "33.33%","height":"14.5%"},"reduceNum":3},
        22:{shapeNum: 1,0: {width : "25%","height":100/6+"%"},"same":24},
        23:{shapeNum: 1,0: {width : "25%","height":100/6+"%"},"same":24},
	    24:{shapeNum: 1,0: {width : "25%","height":100/6+"%"}},
	    25:{shapeNum: 1,0: {width : "20%","height":"20%"}}
	};
};

//重置布局
mainPlayer.prototype.resetLayout = function(opt){
	var _this = this;
	var lm = _this.layoutModel[_this.players.length];
	if(lm){
		for(var i=0; i< _this.players.length;i++){
			(function(ii){
				var videoObj = _this.players[ii];
				videoObj.playIndex = ii;//删除某个video需要重新更新每个video的位置
				if(lm.shapeNum){
					var lenObj;
					if(lm.shapeNum == 1){
						lenObj= lm[0];
					}else{
						if(lm.layShapeRelate){
							//console.log(ii+"！！！！"+JSON.stringify(lm.layShapeRelate))
							if(lm.layShapeRelate[ii] || lm.layShapeRelate[ii] == 0){
								lenObj = lm[lm.layShapeRelate[ii+""]];
							}else{
								console.log("第"+ii+"布局未找到对应的宽高对象");
							}
							
						}else{
							if(ii == 0){
								lenObj = lm[0];
							}else{
								lenObj = lm[1];
							}
						}
					}
					//console.log("@@@@@@"+JSON.stringify(lenObj));
					videoObj.videoPanel.style.width = lenObj.width;
					videoObj.videoPanel.style.height = lenObj.height;
				}else{
					var lenObj = lm[ii]
					videoObj.videoPanel.style.width = lenObj.width;
					videoObj.videoPanel.style.height = lenObj.height;
				}
				videoObj.videoPanel.style.display = 'block';
			})(i);
		}
	}else{
		console.log("layoutModel 未找到"+_this.players.length+"的布局")
	}
}

//追加布局
mainPlayer.prototype.addLayout = function(){
	var _this = this;
	var returnNode;
	
	if(_this.layoutNum<25){
		_this.layoutNum++;
		if(_this.layoutNum > _this.players.length){
			var lm = _this.layoutModel[_this.layoutNum];
			var num = 1;
			if(lm.same){
				num = lm.same-_this.layoutNum+1;
			}
			for(var i=0;i<num; i++){
				(function(ii){
					var p1 = {width:"100%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
					var newVideo = new hyVideo(p1);
					if(ii==0){
						returnNode = newVideo;
					}
					_this.players.push(newVideo);
				})(i);
			}
			_this.resetLayout();
			return returnNode;
		}
	}else{
		var p1 = {width:"100%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
		var newVideo = new hyVideo(p1);
		_this.players.push(newVideo);
		newVideo.videoPanel.style.display='none';
	}
};

//删除布局
mainPlayer.prototype.reduceLayout = function(hyVideoSelect){
	var _this = this;

	//删除数组缓存中的节点
	if( _this.players.length >1){
		_this.layoutNum--;
		var lm = _this.layoutModel[_this.layoutNum];
		if(lm.reduceNum){//减少布局时,如果存在指定减少个数，就减少添加在最后的播放器，因为11布局展示为12布局
			for(var i=1;i<lm.reduceNum;i++){
				 var rmNode =  _this.players[_this.players.length-1].videoPanel;
				 if(rmNode){
				 	rmNode.parentNode.removeChild(rmNode);
				 }
				 _this.players.splice(_this.players.length-1, 1);
			}
		}
		 _this.players.splice(hyVideoSelect.playIndex, 1);
		 hyVideoSelect.close();//停止播放
		 
		 //删除节点
		 var rmNode =  hyVideoSelect.videoPanel;
		 if(rmNode){
		 	rmNode.parentNode.removeChild(rmNode);
		 }
		 var lm = _this.layoutModel[_this.layoutNum];
		 if(lm.same){//如果存在，应该添加一个布局，使布局展示争取，例如 11布局展示为12,22和23展示为24
		 	var p1 = {width:"100%",height:"100%",pnode:_this.opts.pnode, mainPlay: _this}; 
			var newVideo = new hyVideo(p1);
			_this.players.push(newVideo);
		 }
		 _this.resetLayout();
	}else{
		console.log('仅剩1布局');
	}
};

mainPlayer.prototype.setMeetLayoutModel = function(){
	this.meetLayoutModel = {
		1:{col:1,width:1,height:"100%",allHeight:"100%"},
	    2:{col:1,width:0.5,height:"100%",allHeight:"100%"},
	    3:{col:2,width:0.5,height:"50%",allHeight:"100%", marginP:{"value":"25%","idx":2}},
	    4:{col:2,width:0.5,height:"50%",allHeight:"100%"},
	    5:{col:2,width:0.3333,height:"50%",allHeight:"66.666%", marginP:{"value":"16.665%","idx":3}},
	    6:{col:2,width:0.3333,height:"50%",allHeight:"66.666%"},
	    7:{col:3,width:0.3333,height:"33.3333%",allHeight:"66.666%", marginP:{"value":"33.333%","idx":6}},
	    8:{col:3,width:0.3333,height:"33.3333%",allHeight:"100%", marginP:{"value":"16.665%","idx":6}},
	    9:{col:3,width:0.3333,height:"33.3333%",allHeight:"100%"}
	};
	
};

mainPlayer.prototype.calcWidthAndHeight = function(param){
	var pNode = param.pNode;
	var pW = pNode.clientWidth;
	var pH = pNode.clientHeight;
	var hopeW = param.hopeW;
	var width = hopeW*100+"%";
	var height="100%";
	if(hopeW> 1){
		width ='100%';
		height = pW*9/16/pH*100+"%";
	}
	return {w:width,h:height}
}

mainPlayer.prototype.initDiv = function(json){
	var node = document.createElement(json.nodeType);
	if(json.cssStyle){
		forEachX(json.cssStyle,function(cssv){
			node.style[cssv.attr] = cssv.value;
		});
	}
	return node;
};
mainPlayer.prototype.changeVideoShow = function(type){
	var _this = this;
	var count = _this.showNum;
	var showList = _this.players;
	if(type=='add'){
		if(_this.lastShowIndex == showList[showList.length-1].playIndex){
			return;
		}
		
		var showVideoList = showList.slice(_this.lastShowIndex+1,_this.lastShowIndex+_this.showNum+1);
		//console.error("_this.lastShowIndex:::"+_this.lastShowIndex+"_this.showNum:::"+_this.showNum+"||showVideoList len::"+showVideoList.length);
		
		if(showVideoList.length<_this.showNum){
			var len = _this.showNum-showVideoList.length;
			for(var i =0;i<len; i++){
				showVideoList.unshift(showList[showVideoList[0].playIndex-1]);
			}
		}
		var findM = showVideoList.find(function(v, index){if(_this.mainVideo.playIndex == v.playIndex){
				return v;
			}
		});
		if(findM){
			var nowLast = showVideoList[showVideoList.length-1].playIndex;
			if(nowLast< showList[showList.length-1].playIndex){
				showVideoList.push(showList[nowLast+1]);
			}else{
				showVideoList.unshift(showList[showVideoList[0].playIndex-1]);
			}
		}
	}else{
		var start = _this.lastShowIndex-showList.length-_this.showNum;
		var end = start-_this.showNum+1;
	
		if((end +showList.length)<=1){
			var showVideoList = showList.slice(0,_this.showNum);
		}else{
			var showVideoList = showList.slice(end,start);
			if(start == -1){
				showVideoList.push(showList[showList.length-1]);
			}else{
				
			}
		}
		//console.error("end:"+end+"start::"+start+"_this.lastShowIndex:::"+_this.lastShowIndex+"_this.showNum:::"+_this.showNum+"||showVideoList len::"+showVideoList.length);
		if(showVideoList.length < _this.showNum){
			var len = _this.showNum-showVideoList.length;
			for(var i =0;i<len; i++){
				showVideoList.push(showList[showVideoList[showVideoList.length-1].playIndex+1]);
			}
		}
		var findM = showVideoList.find(function(v){if(_this.mainVideo.playIndex == v.playIndex){
					return v;
				}
			});
		if(findM){
			var nowLast = showVideoList[0].playIndex ;
			if(nowLast == 0){
				showVideoList.push(showList[showVideoList[showVideoList.length-1].playIndex+1]);
			}else{
				showVideoList.unshift(showList[showVideoList[0].playIndex-1]);
			}
			
		}
	}
	
	
	_this.lastShowIndex = showVideoList[showVideoList.length-1].playIndex
	//console.error("!!!!!!_this.lastShowIndex::"+_this.lastShowIndex+"::::showVideoList 0:idx::"+showVideoList[0].playIndex, showVideoList);
	forEachX(_this.players, function(videoObj, i){
		var videoPanel =  videoObj.videoPanel;
		videoObj.videoControl = {}
		videoObj.setTitle({"title": videoObj.playIndex})
		var findInShow = showVideoList.find(function(v){
			if(videoObj.playIndex == v.playIndex){
				return v;
			}
		});
		
		if(findInShow){
			videoPanel.style.display = 'block';
		}else{
			if(_this.mainVideo.playIndex == videoObj.playIndex){
				videoPanel.style.display = 'block';
			}else{
				videoPanel.style.display = 'none';
			}		
		}
		
	});
};
mainPlayer.prototype.setSizeScreenLayout = function(param){
	var _this = this;
	var mainVideo = param.mainVideo;
	_this.mainVideo = mainVideo;
	var showNum = param.showNum;
	_this.showNum = showNum;
	if(_this.players.length<2){
		console.error("设置大小布局失败，布局数不能小于2");
		return;
	}
	if(!mainVideo){
		console.error("设置大小布局失败，未选中最大布局！");
		return;
	}
	var w = _this.opts.pnode.clientWidth;
	var h = _this.opts.pnode.clientHeight;
	var eachw = w/showNum;
	var eachH = eachw*9/16;
	var eachWperc = 1/showNum*100+"%";
	var eachHperc = eachw*9/16/h*100+"%";
	var bigHperc =( h- eachH)/h*100+"%";
	
	if(_this.videoTopDiv){
		_this.opts.pnode.removeChild(_this.videoTopDiv);
		_this.videoTopDiv = '';
	}
	var videoTopDiv = document.createElement('div');
	videoTopDiv.style.width = "100%";
	videoTopDiv.style.position = "relative";
	videoTopDiv.style.height = eachHperc;
	_this.videoTopDiv = videoTopDiv;
	_this.videoTopDiv.srcHeight = eachHperc;
	_this.videoTopDiv.allHeight = 1/showNum*100+"%";
	_this.opts.pnode.appendChild(_this.videoTopDiv);
	
	if(_this.videoBottomDiv){
		_this.opts.pnode.removeChild(_this.videoBottomDiv);
		_this.videoBottomDiv = '';
	}
	var leftBtn = _this.initDiv({nodeType: "div",
	cssStyle:[{attr: "width",value: "20px"},{attr: "height",value: "30px"},
		{attr: "position",value: "absolute"},{attr: "left",value: "0px"},
		{attr: "top",value: "50%"},{attr: "borderRadius",value: "10%"},{attr: "display",value: "none"},
		{attr: "marginTop",value: "-20px"},{attr: "zIndex",value: "10000"},
		{attr: "background",value: "rgba(255,255,255,0.8)"},{attr: "cursor",value: "pointer"}]});
	var leftImg = hyVideo.prototype.initImgBtn({imgUrl:imgMap["left"], title:"向前",width:"18px",height:"18px",margin:"6px 1px","display": "block",floatv: "false"});
		leftBtn.appendChild(leftImg);
	var rightBtn = _this.initDiv({nodeType: "div",
	cssStyle:[{attr: "width",value: "20px"},{attr: "height",value: "30px"},
		{attr: "position",value: "absolute"},{attr: "right",value: "0px"},{attr: "display",value: "none"},
		{attr: "top",value: "50%"},{attr: "borderRadius",value: "10%"},
		{attr: "marginTop",value: "-20px"},{attr: "zIndex",value: "10000"},
		//{attr: "background",value: "url('data:image/png;base64,"+imgMap['right']+"') no-repeat "},
		{attr: "background",value: "rgba(255,255,255,0.8)"},
			{attr: "cursor",value: "pointer"}]});
			
	var rightImg = hyVideo.prototype.initImgBtn({imgUrl:imgMap["right"], title:"向后",width:"18px",height:"18px",margin:"6px 1px","display": "block",floatv: "false"});
		rightBtn.appendChild(rightImg);
	videoTopDiv.appendChild(rightBtn);
	videoTopDiv.appendChild(leftBtn);
	
	leftBtn.onclick = function(ev){
		_this.changeVideoShow("reduce");
		return false;
	}
	
	rightBtn.onclick = function(ev){
		_this.changeVideoShow("add");
		return false;
	}
	
	videoTopDiv.onmousemove = function(ev){
		var tleft = 0;
	  	var obj = videoTopDiv;
	  	
	  	 while(obj.offsetParent)
	    {
		    tleft+=obj.offsetLeft;
		    obj=obj.offsetParent;
	    } 
	   
	    if(ev.clientX - tleft<20){
	    	leftBtn.style.display = "block";
	    }else{
	    	leftBtn.style.display = "none";
	    }
	    if(videoTopDiv.clientWidth -(ev.clientX - tleft)<20 ){
	    	rightBtn.style.display = "block";
	    }else{
	    	rightBtn.style.display = "none";
	    }
	}
	
	var videoBottomDiv = document.createElement('div');
	videoBottomDiv.style.width = "100%";
	videoBottomDiv.style.height = bigHperc;
	videoBottomDiv.style.position = "absolute";
	_this.videoBottomDiv = videoBottomDiv;
	_this.videoBottomDiv.srcHeight = bigHperc;
	_this.videoBottomDiv.allHeight = (1-1/showNum)*100+"%";
	_this.opts.pnode.appendChild(_this.videoBottomDiv);
	
	
	var obj = _this.calcWidthAndHeight({"pNode": videoBottomDiv,hopeW:16*( h- eachH)/9/w});
	
//	var mianVideoDiv = _this.getTransform({w:16*( h- eachH)/9/w*100+"%",h:'100%',t:'50%'});
	var mianVideoDiv = _this.getTransform({w:obj.w,h:obj.h,t:'50%'});
	
	_this.videoBottomDiv.appendChild(mianVideoDiv);
	_this.mianVideoDiv = mianVideoDiv;
	_this.mianVideoDiv.srcWidth = obj.w;
	_this.mianVideoDiv.allWidth = (showNum-1)/showNum*100+"%";
	_this.mianVideoDiv.srcHeight = obj.h;
	_this.mianVideoDiv.allHeight = "100%";
	
	var i = 1;
	forEachX(_this.players, function(videoObj){
		var videoPanel =  videoObj.videoPanel;
		if(_this.players.length == 2){
			if(videoObj.id == mainVideo.id){
				videoPanel.style.width = eachWperc;
				videoPanel.style.height = "100%";
				videoPanel.style.display = 'block';
				_this.videoTopDiv.appendChild(videoPanel);
			}else{
				videoPanel.style.width = "100%";
				videoPanel.style.height = "100%";
				videoPanel.style.display = 'block';
				mianVideoDiv.appendChild(videoPanel);
			}
		}else{
			if(videoObj.id != mainVideo.id){
				videoPanel.style.width = eachWperc;
				videoPanel.style.height = "100%";
				videoPanel.style.display = 'block';
				_this.videoTopDiv.appendChild(videoPanel);
				if(i==showNum){
					_this.lastShowIndex= videoObj.playIndex;
				}
				if( i>showNum){
					videoPanel.style.display = 'none';
				}
				i++;
			}else{
				videoPanel.style.width = "100%";
				videoPanel.style.height = "100%";
				videoPanel.style.display = 'block';
				mianVideoDiv.appendChild(videoPanel);
			}
		}
	});
};

//重置布局
mainPlayer.prototype.resetMeetLayout = function(opt){
	var _this = this;
	var plen = _this.players.length;
	var lm = _this.meetLayoutModel[plen];
	
	var w = _this.opts.pnode.clientWidth;
	var h = _this.opts.pnode.clientHeight;
	var hh = w*lm.width*(9/16)/h*100*lm.col +"%";
	if(lm){
		for(var i=0; i< _this.players.length;i++){
			(function(ii){
				var videoObj = _this.players[ii];
				videoObj.playIndex = ii;//删除某个video需要重新更新每个video的位置
				
				_this.opts.pnode.setAttribute("layoutType",plen);
	 			_this.opts.pnode.setAttribute("srcHeight",hh);
	   			_this.opts.pnode.setAttribute("allHeight",lm.allHeight);
	   			_this.transformDiv.style.height = hh;
				_this.transformDiv.setAttribute("id","meeting_video_tf_"+plen);
				
				videoObj.videoPanel.style.width = lm.width*100+"%";
				videoObj.videoPanel.style.height = lm.height;
				
				if(lm.marginP){
					if(lm.marginP.idx == ii){
						videoObj.videoPanel.style.marginLeft = lm.marginP.value;
					}else{
						videoObj.videoPanel.style.marginLeft = 0;
					}
				}else{
					videoObj.videoPanel.style.marginLeft = 0;
				}
			})(i);
		}
	}else{
		console.log("layoutModel 未找到"+_this.players.length+"的布局")
	}
}

//追加布局
mainPlayer.prototype.addMeetLayout = function(){
	var _this = this;
	var returnNode;
	if(_this.layoutNum<25){
		var p1 = {width:"100%",height:"100%",pnode:_this.transformDiv, mainPlay: _this}; 
		var newVideo = new hyVideo(p1);
		_this.players.push(newVideo);
		_this.resetMeetLayout();
		return newVideo;
	}else{
		
	}
};

//删除布局
mainPlayer.prototype.reduceMeetLayout = function(hyVideoSelect){
	var _this = this;
	//删除数组缓存中的节点
	if( _this.players.length >1){
		_this.layoutNum--;
		
		 _this.players.splice(hyVideoSelect.playIndex, 1);
		 hyVideoSelect.close();//停止播放
		 //删除节点
		 var rmNode =  hyVideoSelect.videoPanel;
		 if(rmNode){
		 	rmNode.parentNode.removeChild(rmNode);
		 }
		 _this.resetMeetLayout();
	}else{
		console.log('仅剩1布局');
	}
};


//恢复布局
mainPlayer.prototype.restoreLayout= function(){
	var _this = this;
	forEachX(_this.players, function(videoObj){
		var videoPanel =  videoObj.videoPanel;
		_this.opts.pnode.appendChild(videoPanel);
	});
	if(_this.videoTopDiv){
		_this.opts.pnode.removeChild(_this.videoTopDiv);
		_this.videoTopDiv = '';
	}
	if(_this.videoBottomDiv){
		_this.opts.pnode.removeChild(_this.videoBottomDiv);
		_this.videoBottomDiv = '';
	}
	_this.mainVideo ='';
	_this.resetLayout();
};

function hyVideo(opts)
{
	//console.error(opts);
	this.id = uuid();
	this.opts = opts;
	this.setVideoPanel();
};
hyVideo.prototype.play= function(opts){
	var _this = this;
	if(this.hyPlayerWs)
	{
		this.hyPlayerWs.onClose();
		_this.hyPlayerWs = null;
	}
	
	var oop = {
	    mediaplayer:this.videoElement,
	    wsserver:opts.wsserver?opts.wsserver:_this.opts.mainPlay.sdk.opts.sieStreamUrl,
	    rtspurl:opts.rtspurl,
	    log:_this.opts.mainPlay.opts.log
	  };
	this.hyPlayerWs = new HY_PLAYER_WS(oop);  
     

	
	if(_this.videoControl.syncRecordStats == true &&_this.palyParam){
	 //查询设备状态
 	 _this.opts.mainPlay.sdk.getRecordingStatus({
      	"serviceUrl": {
			"strDomainCode":_this.palyParam.strDomainCode,
			"strDeviceCode":_this.palyParam.strDeviceCode,
			"strChannelCode":_this.palyParam.strChannelCode,
			"strStreamCode": _this.palyParam.strStreamCode
		}
      }, function(res){
			if(res){
				if(res.m_nIsRecording == 1){
					_this.recordBtn.style.display = 'none';
					_this.stopWarp.style.display = 'block';
				}else{
					
				}
			}
      });
	}
	
};

hyVideo.prototype.setVideoPanel= function(){
	  var _this = this;
	  var videoPanel = document.createElement("div");
	  videoPanel.style.width  = this.opts.width;
	  videoPanel.style.height  = this.opts.height;
	  videoPanel.style.border  = "1px solid #aaa";
	  videoPanel.style.padding  = "0px";
	  videoPanel.style.float  = "left";
	  videoPanel.style.boxSizing= 'border-box';
	  videoPanel.style.position = "relative";
      this.videoPanel = videoPanel;
      this.setVideoElement();
      this.setToolBar({obj:_this});
      this.initTitleDiv();
      this.setButton();
      videoPanel.appendChild(this.videoElement); 
	  videoPanel.appendChild(this.toolBar);
	  this.videoElement.onclick = function(evn){
	     activeHyVideo = _this;
	    // _this.log(activeHyVideo);
	  };
	  	
	  videoPanel.onmousemove = function(ev){
	  	ev = ev||window.event;
	  	//_this.toolBar.style.display = 'block';
	  	var tTop = 0;
	  	var obj = videoPanel;
	  	 while(obj.offsetParent)
	    {
		    tTop+=obj.offsetTop;
		    obj=obj.offsetParent;
	    } 
//	  	console.log(" hyVideo Y:::"+ev.clientY+"  pt||::"+videoPanel.offsetParent.offsetTop+" top::"+videoPanel.offsetTop+"|||||"+tTop);
//	  	console.log(" hyVideo Y:::"+ev.pageY+"top::::"+tTop+"res:::"+(ev.pageY-tTop)+"offsetX::"+ev.offsetY);
//	  	if(ev.pageY-tTop<=_this.barHeight){
  		if(ev.offsetY <=_this.barHeight){
		  	_this.toolBar.style.display = 'block';
	  	}else{
	  		if(hyVideo.prototype.isSettingPlay(_this)){
			}else{
		  		_this.toolBar.style.display = 'none';
		  		hyVideo.prototype.hideBtnAndWarp(_this);
			}
	  	}
	  };
	  videoPanel.onmouseleave = function(){
	  	_this.toolBar.style.display = 'none';
	  	hyVideo.prototype.hideBtnAndWarp(_this);
	  };
      this.opts.pnode.appendChild(videoPanel);  
	  this.clientWidth = this.videoElement.clientWidth;
	   //用于减少布局时删除
	  if(_this.opts && _this.opts.mainPlay){
		 _this.playIndex = _this.opts.mainPlay.players.length;
	      _this.opts.mainPlay.observeSizeChange({node:videoPanel, clickImg:_this.fullImg, obj: _this});
	  }
};
hyVideo.prototype.setVideoElement= function(){
	  var video = document.createElement("video");
	  video.setAttribute("width","100%");
	  video.setAttribute("height","100%");
	  //video.setAttribute("controls","controls");
	  video.setAttribute("poster",'data:image/png;base64,'+imgMap["gabg"]);
	  video.setAttribute("autoplay","autoplay");
	  video.style.backgroundColor  = "#3f3f3f";
	  video.style.display="block";
	  video.style.objectFit ="fill";
	   video.addEventListener('pause', function(e) {
		      console.log('暂停播放');
		      video.play();
		    });
	  this.videoElement = video;
};
hyVideo.prototype.setToolBar= function(param){
	  var _this = param.obj;
	   _this.barHeight = 18;
	   var toolbar = document.createElement("div");
	   toolbar.style.width= "100%";
	   toolbar.style.height=　_this.barHeight+"px";
	   toolbar.style.position = "absolute";
	   if(param.type && param.type=="all"){
		   toolbar.style.bottom = "0px";
		   toolbar.style.zIndex = '99999';
	   }else{
	   	   toolbar.style.top = "0px";
	   }
	   toolbar.style.textAlign = "right";
	   toolbar.style.display = 'none';
	   
	   toolbar.style.backgroundColor  = "rgba(255,255,255,0.8)";
	   _this.toolBar = toolbar;
	   
	   return toolbar;
};

hyVideo.prototype.initTitleDiv= function(opt){
	try{
		var _this = this;
	   var titleDiv = document.createElement("div");
	   titleDiv.style.position ="absolute";
	   titleDiv.style.left ="6px";
	   titleDiv.style.color =opt &&opt.color ? opt.color: "#000";
	   titleDiv.style.fontWeight="bold";
	   titleDiv.style.fontSize="8px";
	   titleDiv.style.lineHeight="18px";
	   _this.titleDiv = titleDiv;
	   this.toolBar.appendChild(titleDiv);
	}catch(e){console.error("setTitle:: "+e);}
};

hyVideo.prototype.setTitle= function(opt){
	try{
	   var _this = this;
	   var title = opt && opt.title ? opt.title: "";
	   _this.titleDiv.title = title;
	   if(_this.videoControl &&_this.videoControl.curresFlag ||_this.videoControl.bitrateFlag){
	   	  _this.titleDiv.style.left ="18px";
	   }
	  	if(opt && opt.len){
	   		_this.titleDiv.innerHTML = title.substring(0, opt.len);
		}else{
			_this.titleDiv.innerHTML =title;
		}
		_this.titleDiv.style.display='block';
	}catch(e){console.error("setTitle:: "+e);}
};

hyVideo.prototype.setButton= function(){
	var _this = this;
	this.setButtonAction({
		obj: _this,
		pnode:_this.videoPanel,
		closeFunc: function(){
			_this.close();
		},
		//屏幕放大缩小
		fillFun:function(){
			if(_this.isFill){
				 _this.videoElement.style.objectFit ="fill";
			}else{
				 _this.videoElement.style.objectFit ="";
			}
		},
		screenFunc: function(){},
		//调节声音
		soundFunc:function(res){
			var topV = res.top;
			_this.soundBtn.style.top= topV+"px";
			_this.soundValue.style.height = _this.soundHeight -topV+"px";
			var volume = (res.maxHeight -topV)/res.maxHeight;	
			_this.videoElement.volume = volume;
		},
		//切换码率
		bitFunc: function(info){
			_this.bitValue = info.value;
			_this.setBitBtn.innerHTML = info.name;
	  	 	var bit = parseInt(info.value)*1000;
	  	 	 _this.attach.setBit(bit);
		},
		//切换分辨率
		curresFunc: function(info){
			_this.curresValue = info.value;
			_this.setCurresBtn.innerHTML = info.name;
			var sendP = {
				video: {
					width: info.value.width,
					height:info.value.height
				},
				replaceVideo: true
			}
			 _this.attach.devOperateFun(sendP);
		},
		//切换设备
		devFunc:function(info){
			var sdk =  _this.opts.mainPlay.sdk;
			var p = {};
			var sendP = {};
			if(info.kind == "videoinput"){
				var v = {
					deviceId:{
						exact: info.deviceId
					}
				};
				p.video = v;
				sendP.video = {
					"deviceId": info.deviceId
				}
				sendP.replaceVideo = true;
			}else{
				var a =  {
					deviceId:{
						exact: info.deviceId
					}
				};
				p.audio =a;
				sendP.audio = {
					"deviceId": info.deviceId
				}
				sendP.replaceAudio = true;
			}
			sdk.setUserUsb(p);
		    _this.attach.devOperateFun(sendP, "changeDev");
		},
		//打开/关闭自己的音频
		switchAudioFun:function(){
			if(_this.attach.publishFlag){
				_this.audioSwitch  = !_this.audioSwitch;
				var sendP = {};
				if(_this.audioSwitch == false){
					sendP = {removeAudio: true}
				}else{
					sendP = {addAudio: true}
				}
				_this.attach.devOperateFun(sendP);
			}else{
				console.error("未采集成功无法进行操作");
			}
		},
		//打开/关闭自己的视频
		switchVideoFun:function(){
			if(_this.attach.publishFlag){
				_this.videoSwitch  = !_this.videoSwitch;
				var sendP = {};
				if(_this.videoSwitch == false){
					sendP = {removeVideo: true}
				}else{
					sendP = {addVideo: true}
				}
				_this.attach.devOperateFun(sendP);			
				
			}else{
				console.error("未采集成功无法进行操作");
			}
		},
		//打开/关闭他人的音频
		switchOtherAoFun: function(){
			if(_this.palyParam && _this.palyParam.user){
				var sendp = {"uuid":_this.palyParam.user.userCode,video: _this.videoSwitch}
				if(_this.audioSwitch == false){
					sendp.audio = false;
				}else{
					sendp.audio = true;
				}
				_this.attach.playBackControl(sendp);
			}else{
				console.error("缺少use 信息：：：：",_this.palyParam)
			}
		},
		//打开/关闭他人的视频
		switchOtherVoFun: function(){
			if(_this.palyParam && _this.palyParam.user){
				var sendp = {"uuid":_this.palyParam.user.userCode,audio:_this.audioSwitch}
				if(_this.videoSwitch == false){
					sendp.video = false;
				}else{
					sendp.video = true;
				}
				_this.attach.playBackControl(sendp);
			}else{
				console.error("缺少user信息：：：：",_this.palyParam)
			}
		},
		//是否降码播放
		changeDefFun: function(){
			if(_this.palyParam && _this.palyParam.user){
				_this.isLowDef = !_this.isLowDef;
				var sendp = {"uuid":_this.palyParam.user.userCode,value:_this.isLowDef}
				_this.attach.playbackDefinition(sendp);
			}else{
				console.error("缺少user信息：：：：",_this.palyParam)
			}
		},
		//四元组-录像
		startRecordFunc: function(){
	      	if(_this.palyParam){
	  			var so = {
	  				serviceUrlList:[{
	  					"strDomainCode":_this.palyParam.strDomainCode,
	  					"strDeviceCode":_this.palyParam.strDeviceCode,
	  					"strChannelCode":_this.palyParam.strChannelCode,
	  					"strStreamCode": _this.palyParam.strStreamCode
	  				}],
	  				strFileName: _this.palyParam.name
	  			};
	      		_this.opts.mainPlay.sdk.startStorageReq(so,function(res){
	      			_this.recordInfo = res;
	      			
	      			if(res.nResultCode == 0){
	      				_this.recordFlag = true;
	      				_this.recordBtn.style.display = "none";
	      				_this.stopWarp.style.display = "block";
	      			}else{
	      				
	      			}
	      			console.log("开始录像响应：：："+JSON.stringify(res))
	      			_this.palyParam.startResp && _this.palyParam.startResp(res);
	      		});
	  		}else{
	  			console.log('没有四元组信息，无法录像');
	  		}
		},
		//四元组-停止录像
		stopRecordFunc:function(){
			if(_this.palyParam){
				var so = {
					serviceUrl:{
						"strDomainCode":_this.palyParam.strDomainCode,
						"strDeviceCode":_this.palyParam.strDeviceCode,
						"strChannelCode":_this.palyParam.strChannelCode,
						"strStreamCode": _this.palyParam.strStreamCode
					},
					strDomainCode: _this.recordInfo.strDomainCode,
					strRecordID:_this.recordInfo.strRecordID
				};
		  		_this.opts.mainPlay.sdk.stopStorageReq(so,function(res){
		  			_this.recordFlag = false;
	      			_this.stopWarp.style.display = "none";
		  			_this.recordBtn.style.display = "block";
		  			console.log("停止录像响应：：："+JSON.stringify(res))
		  			_this.palyParam.stopResp && _this.palyParam.stopResp(res);
		  		});
			}else{
				console.log('没有四元组信息，无法停止录像');
			}
		}
	});
};

hyVideo.prototype.initImgBtn = function(json){
	  var img = document.createElement("img");
	  img.setAttribute("src",'data:image/png;base64,'+json.imgUrl);
	  img.style.float = json.floatv? json.floatv:"right";
	  img.style.margin = json.margin? json.margin: "2px 5px 0 0";
	  img.style.width = json.width?json.width:"14px";
	  img.style.height = json.height?json.height:"14px";
	  //img.style.border = "1px solid red";
	  img.setAttribute("ondragstart","return false");
	  img.style.cursor = 'pointer';
	  img.style.display = json.display?json.display:'none';
	  img.title = json.title?json.title:"";
	  return img;
}

hyVideo.prototype.initTextBtn = function(json){
	 var div = document.createElement('div');
	 
      div.style.float = json.floatv==false ?"":(json.floatv?json.floatv:"right");	
      div.style.background = json.background? json.background:"transparent";
      div.style.color= json.color? json.color:"black";
      div.style.fontSize='8px';
     // div.style.height='14px';
      div.style.padding=json.padding? json.padding:"1px 4px";
      div.style.margin = json.margin ? json.margin: "2px 6px 0 0";
      //div.style.lineHeight='14px';
      div.innerHTML = json.name;
      div.style.display = 'none';
      div.style.cursor = 'pointer';
      div.title = json.title?json.title:"";
	  return div;
}
hyVideo.prototype.defaultOperate = function(param, evt){
	var _this = param.obj;
	_this.toolBar.style.display='block';
	if(!(param.type && param.type=='allControl')){
	  	activeHyVideo = _this;
  	}
  	evt = evt||window.event;
  	evt.stopPropagation();
  	evt.preventDefault();
  	evt.cancelBubble = true;
	hyVideo.prototype.hideBtnAndWarp(_this);
};

hyVideo.prototype.isSettingPlay =function(obj){
	var _this = obj;
	return _this.isSettingVoice||_this.isSettingBit||_this.isSettingAudio||_this.isSettingVideo||_this.isSettingCurres||_this.isSettingRate||_this.isShowRateInfo;
};

hyVideo.prototype.hideBtnAndWarp = function(obj){
	var _this = obj;
	_this.isSettingVoice = false;
  	if(_this.soundWarp){
	  	_this.soundWarp.style.display = 'none';
  	}
	
	_this.isSettingBit = false;
	if(_this.bitWarp){
	  	_this.bitWarp.style.display = 'none';
  	}
  	
  	_this.isSettingAudio = false;
  	if(_this.audioWarp){
	  	_this.audioWarp.style.display = 'none';
  	}
  	
  	_this.isSettingVideo = false;
  	if(_this.videoWarp){
	  	_this.videoWarp.style.display = 'none';
  	}
  	
  	_this.isSettingCurres = false;
  	if(_this.curresWarp){
	  	_this.curresWarp.style.display = 'none';
  	}
  	
  	_this.isSettingRate = false;
  	if(_this.rateWarp){
	  	_this.rateWarp.style.display = 'none';
  	}
  	
  	_this.isShowRateInfo = false;
  	if(_this.rateInfoWarp){
	  	_this.rateInfoWarp.style.display = 'none';
  	}
};
hyVideo.prototype.drawInfoRow = function(data){
	var root = data.root;
	var _this = data.obj;
	forEachX(data.list, function(info){
		var row = document.createElement('div');
		row.style.width = '100%';
		row.style.height = '18px';
		row.style.lineHeight = '18px';
		row.style.padding = '0 4px';
		row.style.margin= '4px 4px';
		var tit = document.createElement('div');
		tit.innerHTML = info.name+": ";
		tit.innerHTML = info.name+": ";
		tit.style.float = "left";
		tit.style.fontSize = "8px";
		row.appendChild(tit);
		row.appendChild(_this[info.filed]);
		root.appendChild(row);
	});
};

hyVideo.prototype.showBtnWarp = function(param){
	var _this = param.obj;
	var btn = _this[param.btn];
	var warp = _this[param.btnType+"Warp"];
	_this[param.flagName] = true;
	if(warp){
		if(param.type&&param.type=="add" ){
			warp.style.left = btn.offsetLeft+parseInt(btn.style.width)+8+"px";
		}else{
			var leftv1 = btn.offsetLeft-parseInt(warp.style.width)/2+btn.clientWidth/2+"px";
		  	warp.style.left = leftv1;
		  	var warpL = hyVideo.prototype.getAttrValue(warp, "left");
		  	var warpW = hyVideo.prototype.getAttrValue(warp, "width");
		  	var right = warpL+warpW ;	
		  	var pnode = param.objType&& param.objType=="allControl"?  _this.opts.pnode:_this.opts.mainPlay.opts.pnode;
		  	if(pnode.offsetLeft+pnode.clientWidth - right < 5 ){
		  		leftv = pnode.offsetLeft+pnode.clientWidth - warpW-5+"px";
		  		warp.style.left = leftv;
		  		_this[param.btnType+"UpImg"].style.left = warpW/2-6+parseInt(leftv1)-parseInt(leftv)+"px";
		  	}
		}
	  	warp.style.display = 'block';
	}
  	return false;
};
hyVideo.prototype.getAttrValue = function(obj, attr){
	return parseInt(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]);
};

hyVideo.prototype.setButtonAction = function(param){
	try{
		  var that = this;
		  var _this = param.obj;
		  var node = param.pnode;
		  _this.full = 1;
		  var img = that.initImgBtn({imgUrl:imgMap["fullscreen"], title:"最大化"});
		  img.onclick=function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
		  	if( _this.full == 1)
		  	{
			  	_this.fullScreen(_this.videoPanel);
		  	}else
		  	{
			  	hyVideo.prototype.exitFullscreen();
		  	}
		  	param.screenFunc && param.screenFunc();
		  };
		  _this.fullImg = img;
	  
		  var soundImg = that.initImgBtn({imgUrl:imgMap["sound"], title:"音量调节"});
		  _this.soundImg = soundImg;
		  hyVideo.prototype.initSoundPandel(param);
		  soundImg.onclick = function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
		  	hyVideo.prototype.showBtnWarp({objType:param.type,obj: _this, flagName:"isSettingVoice",btnType:"sound",btn:"soundImg"});
		  };
	  
		  //停止播放
		  var closeImg = that.initImgBtn({imgUrl:imgMap["close"], title:"停止播放"});
		  _this.closeImg = closeImg;
		  closeImg.onclick = function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
		  	param.closeFunc&&param.closeFunc();
		  	return false;
		  };
   	 
	  
	 	  var stopWarp = document.createElement('div');
		  stopWarp.style.width ='78px';
		  stopWarp.style.height ='100%';
		  stopWarp.style.float = "right";
		  stopWarp.style.display = "none";
		  stopWarp.style.marginRight = '12px';
		  var recordTip = document.createElement('span');
		  recordTip.innerHTML = '录像中...';
		  recordTip.style.fontSize = '8px';
		  recordTip.style.marginTop = '1px';
		  recordTip.style.color = 'black';
		  recordTip.style.float = "right";
		  var stopReocrd = that.initImgBtn({imgUrl:imgMap["recording"],"margin": "2px 6px 0 0"});
	      _this.stopWarp = stopWarp;
	     
		  stopReocrd.onclick = function(){
		  	param.stopRecordFunc && param.stopRecordFunc();
	      };
	     _this.stopReocrd = stopReocrd;
	      stopReocrd.onmouseover = function(){
	      	 stopReocrd.src = 'data:image/png;base64,'+imgMap["stop"];
		 	 recordTip.innerHTML = '结束录像';
	      };
	      stopReocrd.onmouseleave = function(){
	      	stopReocrd.src = 'data:image/png;base64,'+imgMap["recording"];
		 	recordTip.innerHTML = '录像中...';
	      };
	       _this.stopReocrd.style.display = "block";
		  stopWarp.appendChild(recordTip);
	      stopWarp.appendChild(stopReocrd);
		  var recordBtn = that.initImgBtn({imgUrl:imgMap["record"]});
	      _this.recordBtn = recordBtn;
	      recordBtn.onclick = function(){
	      	param.startRecordFunc && param.startRecordFunc();
	      };
	      
  		 //码率显示
	      var bitrate =that.initTextBtn({name: "",padding: "0px","margin": "0 2px 0 4px","floatv": "left"});
	      _this.bitrate = bitrate;
	      
	      //分辨率显示
	     var curres = that.initTextBtn({name: 0,padding: "0px","margin": "0 2px 0 4px","floatv": "left"});
	     _this.curres = curres;
	      
	     var rateInfo = that.initImgBtn({imgUrl:imgMap["info"], floatv: "left","margin":"2px 0 0 2px", title:"视频信息"});
	     _this.rateInfo = rateInfo;
	     var rateInfoCont = hyVideo.prototype.drawDivshowWarp(param,{type:"rateInfo",width:"116px",height:"56px"}); 
	     var list = [{"name": "分辨率","filed":"curres"},{"name": "码率","filed":"bitrate"}]
	     hyVideo.prototype.drawInfoRow({"root":rateInfoCont,"list":list,obj: _this});
	     
	     rateInfo.onclick = function(evt){
	     	hyVideo.prototype.defaultOperate(param, evt);
	  		_this.isShowRateInfo = true;
	  		_this.rateInfoUpImg.style.left = "8px";
	    	_this.rateInfoWarp.style.left = "3px";
		    _this.rateInfoWarp.style.display = 'block';
		  	 return false;
	     };
	     
	     
	      //码率设置，分辨率设置的
	     var rateSet = that.initImgBtn({imgUrl:imgMap["rate_set"], title:"设置参数"});
	     _this.rateSet = rateSet;
	     var rateCont = hyVideo.prototype.drawDivshowWarp(param,{type:"rate",width:"66px",height:"46px"}); 
	     rateSet.onclick = function(evt){
	     	hyVideo.prototype.defaultOperate(param, evt);
	     	hyVideo.prototype.showBtnWarp({objType:param.type,obj: _this, flagName:"isSettingRate",btnType:"rate",btn:"rateSet"});
	     };
	     
	     
	     var device = param.type && param.type=="allControl" ? _this.sdk.getUserUseIPC():_this.opts.mainPlay.sdk.getUserUseIPC();
		 var selectUsb = device && device.usb ?device.usb: ""; 
		 if(selectUsb ){
		 	if(selectUsb.bitrate !=null){
		 		_this.bitValue = selectUsb.bitrate*1;
		 	}
		 	
		 	if(selectUsb.video && selectUsb.video.width){
		 		_this.curresValue = selectUsb.video.width+"x"+selectUsb.video.height;
		 	}
		 }
		  //设置码率
	      var setBitBtn = that.initTextBtn({name: "不限制","margin": "2px 0px","floatv":false,"background":"#2bc1ff", "color": "#fff", title:"设置码率"});
	      _this.setBitBtn = setBitBtn;
		  setBitBtn.onclick = function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
		  	_this.rateWarp.style.display = 'block';
		  	_this.bitUpImg.style.top = setBitBtn.offsetTop+5+"px";
		  	hyVideo.prototype.showBtnWarp({objType:param.type,obj: _this, flagName:"isSettingBit",btnType:"bit",btn:"rateWarp",type: "add"});
		  };
		  var list = [{name:"不限制" ,value:0},{name:"128Kbit" ,value:128},{name:"256Kbit" ,value:256},
			  {name:"512Kbit" ,value:512},{name:"1Mbit" ,value:1024},{name:"1.5Mbit" ,value:1500},{name:"2Mbit" ,value:2000}];
		  hyVideo.prototype.initTextSelectPandel(param,{list: list,"type":"bit"});
	      rateCont.appendChild(setBitBtn);
	      
		  //设置分辨率
	      var setCurresBtn = that.initTextBtn({name: "","margin": "2px 0px","floatv":false,"background":"#2bc1ff", "color": "#fff", title:"设置分辨率"});
	      _this.setCurresBtn = setCurresBtn;
		  setCurresBtn.onclick = function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
		  	_this.rateWarp.style.display = 'block';
	  		_this.curresUpImg.style.top = setCurresBtn.offsetTop+5+"px";
		  	hyVideo.prototype.showBtnWarp({objType:param.type,obj: _this, flagName:"isSettingCurres",btnType:"curres",btn:"rateWarp",type: "add"});
		  };
		 var list = [{name:"320x180" ,value:{width:320,height: 180}},{name:"320x240" ,value:{width:320,height: 240}},{name:"640x360" ,value:{width:640,height: 360}},{name:"640x480" ,value:{width:640,height: 480}},
		  {name:"1280x720" ,value:{width:1280,height: 720}},{name:"1920x1080" ,value:{width:1920,height: 1080}}];
		 hyVideo.prototype.initTextSelectPandel(param,{list: list,"type":"curres","width": "76px"});
		 rateCont.appendChild(setCurresBtn);
		 //音频设备
		 var audiobtn = document.createElement('div');
		 var setAudioBtn = that.initImgBtn({imgUrl:imgMap["audio_open"],"margin": "2px 0px 0 0",width: "14px",height: "14px", title:"音频开关"});
		 var selectAudioBtn = that.initImgBtn({imgUrl:imgMap["down"],"margin": "8px 4px 0 0",width: "8px",height: "8px", title:"切换音频设备"});
		 audiobtn.appendChild(selectAudioBtn);
		 audiobtn.appendChild(setAudioBtn);
		 _this.setAudioBtn = setAudioBtn;
	     _this.selectAudioBtn = selectAudioBtn;
		 //打开/关闭 音频采集
		 setAudioBtn.onclick = function(evt){
		 	hyVideo.prototype.defaultOperate(param, evt);
		 	param.switchAudioFun && param.switchAudioFun();
		 	if(_this.audioSwitch== false){
		 		setAudioBtn.src = 'data:image/png;base64,'+imgMap["audio_close"];
		 	}else{
		 		setAudioBtn.src = 'data:image/png;base64,'+imgMap["audio_open"];
		 	}
		 };
	 
		 //选择音频设备
		 selectAudioBtn.onclick = function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
			hyVideo.prototype.showBtnWarp({objType:param.type,obj: _this, flagName:"isSettingAudio",btnType:"audio",btn:"selectAudioBtn"});
		 };
	 
		 //视频设备
		 var videobtn = document.createElement('div');
		 var setVideoBtn = that.initImgBtn({imgUrl:imgMap["video_open"],"margin": "1px 0px 0 0", title:"视频开关"});
		 var selectVideoBtn = that.initImgBtn({imgUrl:imgMap["down"],"margin": "8px 4px 0 0",width: "8px",height: "8px", title:"切换视频设备"});
		 videobtn.appendChild(selectVideoBtn);
		 videobtn.appendChild(setVideoBtn);
		 _this.setVideoBtn = setVideoBtn;
	     _this.selectVideoBtn = selectVideoBtn;
		 //打开/关闭 视频采集
		 setVideoBtn.onclick = function(evt){
		 	hyVideo.prototype.defaultOperate(param, evt);
		 	param.switchVideoFun && param.switchVideoFun();
		 	if(_this.videoSwitch== false){
		 		setVideoBtn.src = 'data:image/png;base64,'+imgMap["video_close"];
		 	}else{
		 		setVideoBtn.src = 'data:image/png;base64,'+imgMap["video_open"];
		 	}
		 };
	 
		 //选择视频设备
		 selectVideoBtn.onclick = function(evt){
		  	hyVideo.prototype.defaultOperate(param, evt);
		  	hyVideo.prototype.showBtnWarp({objType:param.type,obj: _this, flagName:"isSettingVideo",btnType:"video",btn:"selectVideoBtn"});
		 };
	    if(!(param.type && param.type=="allControl")){
			 hyVideo.prototype.initDevPanel(param,"audio");
			 hyVideo.prototype.initDevPanel(param,"video");
	  	}
    
	    //画面填充
	  	var fillImg = that.initImgBtn({imgUrl:imgMap["fill"], title:"画面填充开关"});
	  	_this.fillImg = fillImg;
	  	fillImg.onclick = function(evt){
		 	hyVideo.prototype.defaultOperate(param, evt);
		 	_this.isFill  = !_this.isFill;
		 	param.fillFun && param.fillFun();
		 };
  	
		 var otherAoBtn = that.initImgBtn({imgUrl:imgMap["audio_open"], title:"音频开关"});
		 _this.otherAoBtn = otherAoBtn;
		 //打开/关闭 其他人的音频
		 otherAoBtn.onclick = function(evt){
		 	hyVideo.prototype.defaultOperate(param, evt);
		 	_this.audioSwitch  = !_this.audioSwitch;
		 	param.switchOtherAoFun && param.switchOtherAoFun();
		 	if(_this.audioSwitch== false){
		 		otherAoBtn.src = 'data:image/png;base64,'+imgMap["audio_close"];
		 	}else{
		 		otherAoBtn.src = 'data:image/png;base64,'+imgMap["audio_open"];
		 	}
		 };
	 
		 var otherVoBtn = that.initImgBtn({imgUrl:imgMap["video_open"], title:"视频开关"});
		 _this.otherVoBtn = otherVoBtn;
		 //打开/关闭 其他人的音频
		 otherVoBtn.onclick = function(evt){
		 	hyVideo.prototype.defaultOperate(param, evt);
		 	_this.videoSwitch  = !_this.videoSwitch;
		 	param.switchOtherVoFun && param.switchOtherVoFun();
		 	if(_this.videoSwitch== false){
		 		otherVoBtn.src = 'data:image/png;base64,'+imgMap["video_close"];
		 	}else{
		 		otherVoBtn.src = 'data:image/png;base64,'+imgMap["video_open"];
		 	}
		 };
	 
		 //清晰度切换
		 var definition = that.initImgBtn({imgUrl:imgMap["definition"], title:"清晰度切换"});
		 _this.definition = definition;
		 definition.onclick = function(evt){
		 	hyVideo.prototype.defaultOperate(param, evt);
		 	param.changeDefFun && param.changeDefFun();
		 	if(_this.isLowDef== false){
		 		definition.src = 'data:image/png;base64,'+imgMap["definition"];
		 	}else{
		 		definition.src = 'data:image/png;base64,'+imgMap["definition"];
		 	}
		 };
		 
		_this.toolBar.appendChild(closeImg);
		_this.toolBar.appendChild(fillImg);
	    _this.toolBar.appendChild(img);
	    _this.toolBar.appendChild(soundImg);
	    _this.toolBar.appendChild(recordBtn);
	    _this.toolBar.appendChild(stopWarp);
	    _this.toolBar.appendChild(definition);
	    _this.toolBar.appendChild(otherAoBtn);
	    _this.toolBar.appendChild(otherVoBtn);
	    _this.toolBar.appendChild(audiobtn);
	    _this.toolBar.appendChild(videobtn);
	    _this.toolBar.appendChild(rateSet);
	    _this.toolBar.appendChild(rateInfo);
	}catch(e){console.error("setButtonAction:::"+e)}
}

hyVideo.prototype.changeButton = function(json){
	var _this = this;
	_this[json.btnName].src = 'data:image/png;base64,'+imgMap[json.srcName];
}

hyVideo.prototype.initSoundPandel = function(param){
	try{
		
	 var _this = param.obj;
	 var node = param.pnode;
	  //总音量
	  _this.soundHeight = 80;
	  _this.soundBtnHeight = 14;
	  var soundContent = hyVideo.prototype.drawDivshowWarp(param,{type:"sound", width: "35px",height:_this.soundHeight+20+"px"});
	  
	    var totalDiv = document.createElement("div");
	  totalDiv.style.height = _this.soundHeight+'px';
	  totalDiv.style.width = '6px';
	  totalDiv.style.margin = '10px auto';
	  totalDiv.style.background = "#abadae";
	  totalDiv.style.borderRadius = '3px';
	  totalDiv.style.position = 'relative';
	  soundContent.appendChild(totalDiv);
	  
	  //实际音量
	  var soundValue = document.createElement('div');
	  soundValue.style.position ='absolute';
	  soundValue.style.width ='100%';
	  soundValue.style.height = '30px';
	  soundValue.style.background='#2bc1ff';
	  soundValue.style.borderRadius = '3px';
	  soundValue.style.bottom = 0;
	  _this.soundValue = soundValue;
	  totalDiv.appendChild(soundValue);
	 
	  var soundBtn = document.createElement('div');
      soundBtn.style.width='14px';
	  soundBtn.style.height = _this.soundBtnHeight+'px';
	  soundBtn.style.background='url(data:image/png;base64,'+imgMap["soundbtn"]+') no-repeat';
	  soundBtn.style.position = 'absolute';
	  soundBtn.style.bottom = '24px';
	  soundBtn.style.marginLeft = '-4px';
	  soundBtn.style.cursor='pointer';
	  totalDiv.appendChild(soundBtn);
	  _this.soundBtn = soundBtn;
	  
	  soundBtn.onmousedown = function(e){
	  	var evt =e||window.event;
	  	evt = evt||window.event;
	  	evt.stopPropagation();
	  	evt.preventDefault();
		var y =evt.clientY;
		var downTop = soundBtn.offsetTop;
		var maxHeight = _this.soundHeight -_this.soundBtnHeight;
		_this.soundWarp.onmousemove = function(me){
			var evt = me||window.event;
			var topV = evt.clientY -y  +downTop;
			
			if(topV < 0){
				topV = 0;
				
			}else if(topV>maxHeight){
				topV = maxHeight;
			}
			param.soundFunc && param.soundFunc({"top": topV,maxHeight: maxHeight});
		};
		
		document.onmouseup=function(){
			_this.soundWarp.onmousemove=null;
			_this.isSettingVoice = false;
			_this.soundWarp.style.display = 'none';
			_this.toolBar.style.display = 'none';
			
		};
	  };

	}catch(e){console.error("initSoundPandel::"+e);}
};
hyVideo.prototype.drawDivshowWarp = function(param,btnParam){
	 var _this = param.obj;
	 var node = param.pnode;
	//声音控制版面
	  var warp= document.createElement("div");
	  warp.style.background='#ddd';
	  warp.style.width = btnParam.width?btnParam.width:"54px";
	  warp.style.height = btnParam.height?btnParam.height:"140px";
	  warp.style.position = 'absolute';
	  var barH = _this.toolBar.style.height;
   	  warp.style.top=parseInt(barH)+7+"px";
	  warp.style.textAlign = 'center';
	  warp.style.display = "none";
	  warp.style.borderRadius = "5px";
	  warp.style.zIndex = 99999;
	  _this[btnParam.type+"Warp"]= warp;
	 
	  var contentDiv = document.createElement('div');
   	  contentDiv.style.position = "absolute";
 	  contentDiv.style.width='100%';	
   	  contentDiv.style.height='100%';
   	 // contentDiv.style.borderRadius = '4px';
      warp.appendChild(contentDiv);  
      
	  //soundPanel.style.borderRadius = '10px';
	  var upImg = document.createElement("div");
	  upImg.style.height = '7px';
	  upImg.style.width = '12px';
	  upImg.style.position = 'absolute';
	  upImg.style.top = "-7px";
	  upImg.style.left =  btnParam.width?(parseInt(btnParam.width)/2-6+"px"):"19px";
	  upImg.style.background = 'url(data:image/png;base64,'+imgMap["up"]+') no-repeat';
	  warp.appendChild(upImg);
	  
	  if(param.type && param.type=="allControl"){
	  	 upImg.style.transform = 'rotate(180deg)';
	  	 upImg.style.top = btnParam.height?btnParam.height:"120px";
	  	 warp.style.top='';
	  	 warp.style.bottom=parseInt(barH)+7+"px";
	  }else if(btnParam.type == "bit"||btnParam.type == "curres"){
	  	 var a = btnParam.type.slice(0,1).toUpperCase()+btnParam.type.slice(1);
	  	 upImg.style.transform = 'rotate(270deg)';
	  	 upImg.style.top = "0px";
	  	 upImg.style.left = "-9px";
	  }
  	  _this[btnParam.type+"UpImg"] = upImg;
	  _this.toolBar.appendChild(warp);
	  return contentDiv;
}
hyVideo.prototype.initTextSelectPandel = function(param, btnParam){
	try{
			
	 var _this = param.obj;
	 var node = param.pnode;
	 var bitrateSelect = hyVideo.prototype.drawDivshowWarp(param,btnParam);
	  
	  _this["active"+btnParam.type]= "";
	  _this[btnParam.type+"Obj"]= {};
	  forEachX(btnParam.list, function(info){
	  	 var row = document.createElement('div');
	  	 //row.style.color="#abadae";
	  	 row.style.cursor="pointer";
	  	 row.innerHTML=info.name;
	  	 row.style.padding="0 4px";
	  	 row.style.color='black';
	  	 if(typeof(info.value) == "number"){
	  	 	var key = btnParam.type+"_"+info
	  	 	 _this[btnParam.type+"Obj"][key]= {node: row, info: info};
	  	 }else{
	  	 	var key = btnParam.type+"_"+info.value.width+"_"+info.value.height
	  	 	 _this[btnParam.type+"Obj"][key]= {node: row, info: info};
	  	 }
	  	 row.onmouseover = function(){
	  	 	row.style.background='#2bc1ff';
	  	 	row.style.color='#fff';
	  	 }
	  	 row.onmouseout = function(){
	  	 	if(_this[btnParam.type+"Value"] != info.value){
		  	 	row.style.background='transparent';
		  	 	row.style.color='black';
	  	 	}
	  	 }
	  	 if(_this[btnParam.type+"Value"] && _this[btnParam.type+"Value"] == info.value){
	  	 	row.style.background='#2bc1ff';
	  	 	row.style.color='#fff';
	  	 	_this["active"+btnParam.type] = row;
	  	 	if(btnParam.type=="bit"){
		  	 	_this.setBitBtn.innerHTML = info.name;
	  	 	}else{
	  	 		_this.setCurresBtn.innerHTML = info.name;
	  	 	}
	  	 }
	  	 
	  	 row.onclick = function(e){
	  	 	var evt =e||window.event;
		  	evt = evt||window.event;
		  	evt.stopPropagation();
		  	evt.preventDefault();
		  	_this[btnParam.type+"Warp"].style.display = "none";
		  	_this.toolBar.style.display = "none";
		  	_this[btnParam.type+"Value"] = info.value;
		  	if(_this["active"+btnParam.type]){
		  		_this["active"+btnParam.type].style.background='transparent';
		  	 	_this["active"+btnParam.type].style.color='black';
		  	}
		  	_this["active"+btnParam.type] = row;
		  	_this["active"+btnParam.type].style.background='#2bc1ff';
	  	 	_this["active"+btnParam.type].style.color='#fff';
		   	param[btnParam.type+"Func"] && param[btnParam.type+"Func"](info);
	  	 }
	  	 bitrateSelect.appendChild(row);
	  });
	  
	}catch(e){console.error("initTextSelectPandel"+e)}
};

hyVideo.prototype.setCurresValue = function(info){
	var _this = this;
	_this.setCurresBtn.innerHTML =info.width+'x'+info.height;
	if(_this.activecurres){
		_this.activecurres.style.background='transparent';
		_this.activecurres.style.color='black';
	}
	var id = "curres_"+info.width+"_"+info.height
	var node = _this.curresObj[id].node;
	_this.curresValue = _this.curresObj[id].info.value
	node.style.background='#2bc1ff';
	node.style.color='#fff';
	_this.activecurres = node;
}

hyVideo.prototype.initDevPanel = function(param,panelName){
	try{
		
	 var _this = param.obj;
	 var node = param.pnode;
	 var sdk = _this.opts.mainPlay.sdk;
	 var cont = hyVideo.prototype.drawDivshowWarp(param,{"type": panelName,"width": "220px","height": "160px"});
	 _this[panelName+"WarpCont"] = cont;
     _this.devFun = param.devFunc;
     
	}catch(e){console.error("initDevPandel::"+e)}
};

hyVideo.prototype.initDevData = function(){
	try{
	  var _this = this;
	  var sdk = _this.opts.mainPlay.sdk;
	  var device = sdk.getUserUseIPC();
	  var selectUsb = device && device.usb ?device.usb: "";  
	  if(selectUsb){
  	 	if(selectUsb.video && selectUsb.video.deviceId&& selectUsb.video.deviceId.exact){
  	 		_this.videoDevId = selectUsb.video.deviceId.exact;
  	 	}else{
  	 		
  	 	}
  	 	if(selectUsb.audio && selectUsb.audio.deviceId&& selectUsb.audio.deviceId.exact){
  	 		_this.audioDevId = selectUsb.audio.deviceId.exact;
  	 	}else{
  	 		
  	 	}
	  }
	  sdk.getUsbList({
        callback: function(list) {
            if (list) {
        	 	 forEachX(list, function(info){
				  	 var row = document.createElement('div');
				  	 //row.style.color="#abadae";
				  	 row.style.cursor="pointer";
				  	 row.innerHTML=info.label;
				  	 row.style.padding="0 4px";
				  	 row.style.color='black';
				  	 row.style.textAlign='left';
				  	 row.style.wordBreak='break-all';
				  	 row.onmouseover = function(){
				  	 	row.style.background='#2bc1ff';
				  	 	row.style.color='#fff';
				  	 }
				  	 row.onmouseout = function(){
				  	 	if(!(_this.videoDevId == info.deviceId ||_this.audioDevId == info.deviceId)){
					  	 	row.style.background='transparent';
					  	 	row.style.color='black';
				  	 	}
				  	 }
				  	 
				  	 row.onclick = function(e){
				  	 	var evt =e||window.event;
					  	evt = evt||window.event;
					  	evt.stopPropagation();
					  	evt.preventDefault();
					  	if(info.kind == "videoinput"){
					  		_this.videoDevId = info.deviceId;
					  		if(_this.activeVideo){
						  		_this.activeVideo.style.background='transparent';
						  	 	_this.activeVideo.style.color='black';
						  	}
						  	_this.activeVideo = row;
						  	_this.activeVideo.style.background='#2bc1ff';
					  	 	_this.activeVideo.style.color='#fff';
					  	}else{
					  		_this.audioDevId = info.deviceId;
					  		if(_this.activeAudio){
						  		_this.activeAudio.style.background='transparent';
						  	 	_this.activeAudio.style.color='black';
						  	}
						  	_this.activeAudio = row;
						  	_this.activeAudio.style.background='#2bc1ff';
					  	 	_this.activeAudio.style.color='#fff';
					  	}
					  	 _this.audioWarp.style.display ='none';
					  	 _this.videoWarp.style.display ='none';
					   	 _this.devFun &&  _this.devFun(info );
				  	 }
				  	 
				  	 
				  	 if(info.kind == "videoinput"){
				  	 	_this.videoWarpCont.appendChild(row);
				  	 	if(selectUsb){
					  	 	if(selectUsb.video && selectUsb.video.deviceId){
					  	 		if(selectUsb.video.deviceId.exact&& selectUsb.video.deviceId.exact == info.deviceId){
					  	 			row.style.background='#2bc1ff';
							  	 	row.style.color='#fff';
							  	 	_this.activeVideo = row;
					  	 		}
					  	 	}
					  	 }
        	 	 	 }else if( info.kind == "audioinput"){
        	 	 	 	_this.audioWarpCont.appendChild(row);
        	 	 	 	if(selectUsb){
					  	 	if(selectUsb.audio && selectUsb.audio.deviceId){
					  	 		if(selectUsb.audio.deviceId.exact&&selectUsb.audio.deviceId.exact == info.deviceId){
					  	 			row.style.background='#2bc1ff';
							  	 	row.style.color='#fff';
							  	 	_this.activeAudio = row;
					  	 		}
					  	 	}
					  	 }
        	 	 	 }
			  	});
            }
        }
    });

	}catch(e){console.error("hyVideo.prototype.initDevData:::"+e)}
}

hyVideo.prototype.setAvailableBtn = function(opt){
	var _this = opt.obj;
	if(_this.videoControl.screenchangeBtn == true){
	  	_this.fullImg.style.display = 'block';
  	}else{
  		_this.fullImg.style.display = 'none';
  	}
	  
   	if(_this.videoControl.changeVoiceBtn == true){
  		_this.soundImg.style.display = 'block';
	}else{
		_this.soundImg.style.display = 'none';
	}
	
	if(_this.videoControl.fillBtn == true){
  		_this.fillImg.style.display = 'block';
	}else{
		_this.fillImg.style.display = 'none';
	}
	
	  
	if(_this.videoControl.closeBtn == true){
	  _this.closeImg.style.display = 'block';
	}
	  
	if(_this.videoControl.recordBtn == true){
	  	_this.recordBtn.style.display = 'block';
	}else{
		_this.recordBtn.style.display = 'none';
	}
	
	if(_this.videoControl.bitrateFlag == true||_this.videoControl.curresFlag == true){
		_this.rateInfo.style.display = 'block';
		if(_this.videoControl.bitrateFlag == true){
		  	_this.bitrate.style.display = 'block';
		}else{
			_this.bitrate.style.display = 'none';
		}
		if(_this.videoControl.curresFlag == true){
		  	_this.curres.style.display = 'block';
		}else{
			_this.curres.style.display = 'none';
		}
	}else{
		_this.rateInfo.style.display = 'none';
	}
	
	
	if(_this.videoControl.setBitFlag == true||_this.videoControl.setCurresFlag == true){
		_this.rateSet.style.display = 'block';
		
		if(_this.videoControl.setCurresFlag == true){
			_this.setCurresBtn.style.display = 'block';
		}else{
			_this.setCurresBtn.style.display = 'none';
		}
		
		if(_this.videoControl.setBitFlag == true){
		  	_this.setBitBtn.style.display = 'block';
		}else{
			_this.setBitBtn.style.display = 'none';
		}
		
	}else{
		_this.rateSet.style.display = 'none';
	}
	
	
	if(_this.videoControl.setAudioFlag == true){
	  	_this.setAudioBtn.style.display = 'block';
	  	_this.selectAudioBtn.style.display = 'block';
	  	_this.initDevData();
	}else{
		_this.setAudioBtn.style.display = 'none';
	  	_this.selectAudioBtn.style.display = 'none';
	}
	
	
	if(_this.videoControl.setVideoFlag == true){
	  	_this.setVideoBtn.style.display = 'block';
        _this.selectVideoBtn.style.display = 'block';
        if(!_this.videoControl.setAudioFlag){
        	_this.initDevData();
        }
	}else{
	  	_this.setVideoBtn.style.display = 'none';
        _this.selectVideoBtn.style.display = 'none';
	}
	
	if(_this.videoControl.setOtherAudio == true){
		_this.otherAoBtn.style.display = 'block';
	}else{
		_this.otherAoBtn.style.display = 'none';
	}
	
	if(_this.videoControl.setOtherVideo == true){
		_this.otherVoBtn.style.display = 'block';
	}else{
		_this.otherVoBtn.style.display = 'none';
	}
	
	if(_this.videoControl.definitionFlag == true){
		_this.definition.style.display = 'block';
	}else{
		_this.definition.style.display = 'none';
	}
};

hyVideo.prototype.checkFullScreen = function(ele) {  
	var _this = this;
	
	var wh = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
//	if(_this.clientWidth == _this.videoElement.clientWidth)
	if((wh-2) != _this.videoElement.clientWidth)
  	{
  		_this.fullImg.setAttribute("src",'data:image/png;base64,'+imgMap["fullscreen"]);
  		 _this.full = 1;
  	}else
  	{
  		_this.fullImg.setAttribute("src",'data:image/png;base64,'+imgMap["fullscreen_exit"]);
	  	 _this.full = -1;
  	}
};
hyVideo.prototype.fullScreen = function(ele) {  
    if (ele.requestFullscreen) {
        ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullScreen) {
        ele.webkitRequestFullScreen();
    }
};
//退出全屏
hyVideo.prototype.exitFullscreen = function() {
    var de = document;
    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    }
    
};
hyVideo.prototype.close = function() {
   var _this = this;
   if(this.hyPlayerWs)
   {
   	//console.log("/////////////////////// 关闭流和socket连接");
   	 //关闭传送流的
   	 this.hyPlayerWs.websocket.closeFlag = true;
   	 this.hyPlayerWs.wsclose();
   	 //this.hyPlayerWs = null;
   }
   _this.isplay = false;
   if(this.attach && this.attach.pluginHandle){
   		this.attach.pluginHandle.hangup &&this.attach.pluginHandle.hangup();
   }
   
   this.videoElement.pause();
   this.videoElement.src = '';
   this.palyParam&& this.palyParam.afterClose&& this.palyParam.afterClose();
   for(var i=0;i<this.toolBar.childNodes.length;i++){
   		(function(){
   			var node = _this.toolBar.childNodes[i];
   			node.style.display = 'none';
   		})(i);
   };
};

/*
 * opts：{
 * 	wsserver：服务器地址
 * 	rtspurl： 播放的url
 * 	log：是否打印日志
 * 	videoParam：{播放器的一些参数
 * 		palyParam：{//播放参数
 * 		
 * 		},
 * 		videoControl: {播放器的一些按钮控制参数
 * 			screenchangeBtn： //全屏按钮 true：启用false：不启用 默认启用
 * 			changeVoiceBtn： //音量调节按钮 true：启用false：不启用默认启用
 * 			closeBtn： //停止播放按钮  true：启用false：不启用   默认启用
 * 			recordBtn： //录像按钮  true：启用false：不启用  默认不启用
 * 			syncRecordStats：  //播放时同步查询设备状态   true：启用false：不启用  默认不启用
 * 			bitrateFlag:false,//是否启用显示码率 true：启用false：不启用  默认不启用
            curresFlag: false,//是否启用显示分辨率 true：启用false：不启用  默认不启用
            setBitFlag: false,//是否启用设置码率 true：启用false：不启用  默认不启用
            setCurresFlag: false,//是否启用设置分辨率 true：启用false：不启用  默认不启用
            setAudioFlag:false,//是否启用设置自己的音频 true：启用false：不启用  默认不启用
            setVideoFlag:false,//是否启用设置自己的视频  true：启用false：不启用  默认不启用
            setOtherVideo: false,//是否启用打开/关闭别人的视频   true：启用false：不启用  默认不启用
            setOtherAudio: false//是否启用打开/关闭别人的音频   true：启用false：不启用  默认不启用
            definitionFlag: false//是否启用降码播放按钮  true：启用false：不启用  默认不启用
 * 		}
 * 
 * 	}
 * }
 * 
 */
//设置播放器相关参数
hyVideo.prototype.setVideoParam = function(opts){
	try{
		var _this = this;
        var newOpt = {
            screenchangeBtn: true,
            changeVoiceBtn:true,
            closeBtn:true,
            fillBtn: true,
            recordBtn:false,
            syncRecordStats:false,
            bitrateFlag:false,
            curresFlag: false,
            setBitFlag: false,
            setCurresFlag: false,
            setAudioFlag:false,
            setVideoFlag:false,
            setOtherVideo: false,
            setOtherAudio: false,
            definitionFlag: false
        }
        
   		var videoControl = {};
        if(opts && opts.videoParam){
        	//播放参数
        	if(opts.videoParam.palyParam){
        		_this.palyParam = opts.videoParam.palyParam; 
        	}else{
        		_this.palyParam = {}; 
        	}
        	
        	if(opts.videoParam && opts.videoParam.videoControl){
	        	videoControl = opts.videoParam.videoControl ;
        	}
        }
    
    	Object.assign(newOpt, videoControl);
    	//播放器参数
  		_this.videoControl = newOpt;
  		_this.videoSwitch = true;//视频开关标志位true：打开 false关闭
  		_this.audioSwitch = true;//音频开关标志位true：打开 false关闭
  		_this.isLowDef = false;//码流清晰度标志位true：高清 false降码
  		_this.isFill = true;//画面填充标志位true：填充 false原始
		_this.setAvailableBtn({obj: _this});
  		_this.setTitle(_this.palyParam);
	}catch(e){console.log("setVideoParam 异常:::"+e);}
};

function uuid(){
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; 
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
														
	s[8] = s[13] = s[18] = s[23] = "";

	var uuid = s.join("");
	return uuid;
};
function hy_error(){
	for(var i = 0; i< arguments.length; i++)
	{
    	 window.console && window.console.error(arguments[i]);				
	}
};
function hy_log(){
	for(var i = 0; i< arguments.length; i++)
	{
    	 window.console && window.console.log(arguments[i]);				
	}
};

/**============================== 会议 ================================*/
function HY_MEETING(opt){
	this.hySdk = opt.hySdk;
	this.opt = opt;
	this.lockStatus = 0;//会议锁定状态
	this.nSetSpeakForAll = 1;
	this.meetingRole = opt.meetingRole;
	
};
HY_MEETING.prototype.start = function(callback){
	var _this =this;
	this.addSelf();
	this.startCallback = callback ? callback: function(){_this.log("创建会议回调");};
	this.initPlay();//初始化播放器
	this.initUserPanel();
	this.starCapture();
}
HY_MEETING.prototype.addSelf = function(){
	var _this =this;
	var sdk = this.hySdk;
	var ls = _this.opt.meetingInfo.lstMeetingUserInfo;
	var findSelf = ls.find(function(ele){
		if(ele.strUserDomainCode == sdk.sie.strUserDomainCode&& ele.strUserID == sdk.opts.userName){
			return ele;
		}
	});
	
	if(ls){
		if(!findSelf){
			ls.unshift({
	        "strUserDomainCode": sdk.sie.strUserDomainCode,
	        "strUserID": sdk.opts.loginName,
	        "strUserName": sdk.opts.userName,
	        "nDevType": 1
	   	 	});
		}
	}else{
		ls = [];
		ls.push({
        "strUserDomainCode": sdk.sie.strUserDomainCode,
        "strUserID": sdk.opts.loginName,
        "strUserName": sdk.opts.userName,
        "nDevType": 1
   	 	});
	}
	_this.opt.meetingInfo.lstMeetingUserInfo = ls;
	
};

HY_MEETING.prototype.calledStart = function(){
	this.initPlay();//初始化播放器
	this.initUserPanel();
	this.starCapture();
}

//初始化播放器
HY_MEETING.prototype.initPlay = function(){
	var _this = this;
	var opt = _this.opt;
	var lstMeetingUserInfo = opt.meetingInfo.lstMeetingUserInfo
	var pla = {				
       // layout:"Meet" + lstMeetingUserInfo.length,
        layout:lstMeetingUserInfo.length,
        pnode:opt.pnode
	};
	this.meetPlayer = this.hySdk.getPlayer(pla);
	var players = this.meetPlayer.players;
	this.userInfo = {};
	for(var i = 0; i<lstMeetingUserInfo.length;i++){
		(function(ii){
			var user = lstMeetingUserInfo[ii];
			_this.userInfo[user.strUserDomainCode+"_"+user.strUserID] = {"video": players[ii],info: user}
		})(i);
	}
};


//发起会议
HY_MEETING.prototype.startReq = function(){
	this.hySdk.startMeetingReq(this.opt.meetingInfo);
};

//被叫加入
HY_MEETING.prototype.startCalledReq = function(){
	var _this = this;
	this.joinMeetingReq(1, function(res){
		_this.joinCallBack_1(res);
	});
};
//发起会议响应
HY_MEETING.prototype.startRsp = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log(" 创建的会议信息响应： "+JSON.stringify(json))
	if(sdk.callMt && json.nResultCode === 0)
	{
		sdk.callMt.strMeetingDomainCode = json.strMeetingDomainCode;
		sdk.callMt.nMeetingID = json.nMeetingID;
		//sdk.callMt.opt.meetingInfo = json;
        var newInfo = sdk.callMt.opt.meetingInfo;
        Object.assign(newInfo, json);
        sdk.callMt.opt.meetingInfo =  newInfo;
	}
	_this.startCallback({"code": json.nResultCode},sdk.callMt);
	sdk.log(" 创建的会议信息： ", sdk.callMt);
};

HY_MEETING.prototype.notifyCallJoin = function(json){
	//json.nIsAgree = 1;//同意加入会议
	var _this = this;
	_this.joinMeetingReq(1, function(res){
		//_this.joinCallBack_1(res);
	});
}
//拒绝
HY_MEETING.prototype.joinCallBack_0 = function(res){
	
}
//同意
HY_MEETING.prototype.joinCallBack_1 = function(res){
	var _this = this;
	var sdk = this.hySdk;
	if(this.meetingRole==2){//被叫
		_this.callBackByUser(function(uu){ 
			if(!(uu.info.strUserDomainCode == sdk.sie.strUserDomainCode && uu.info.strUserID == sdk.opts.loginName)){
		        if(uu.info.strUserTokenID && !uu.info.isShareDesk){
					_this.getUserUrlReq({
						"domainCode": uu.info.strUserDomainCode,
						"strUserTokenID":uu.info.strUserTokenID,
						'strUserID': uu.info.strUserID
					});
		        }
			}
      	});
	}
}
//无人接听
HY_MEETING.prototype.joinCallBack_2 = function(res){
}


HY_MEETING.prototype.joinCallBack = function(){

}

//通知邀请方对方参加会议意见
HY_MEETING.prototype.notifyPeerUserMeetingInfo = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("###notifyPeerUserMeetingInfo####"+JSON.stringify(json));
	
		var userobj = _this.userInfo[json.strToUserDomainCode+"_"+json.strUserID];
		 userobj.status = json.nIsAgree;
		//userobj.status = 1;
      	 _this.ctr.updateStatus(userobj);
      	 
      /*	if(!(json.strToUserDomainCode == sdk.sie.strUserDomainCode && json.strUserID == sdk.opts.loginName)){
        	_this.getUserUrlReq({
				"domainCode": json.strToUserDomainCode,
				"strUserTokenID":json.strUserTokenID,
				'strUserID': json.strUserID,
				"strUserName": json.strToUserName
			});
		}*/
	
};

//判断自己是采集还是使用ipc
HY_MEETING.prototype.starCapture= function(){
	try{
		
		var _this = this;
		var sdk = this.hySdk;
		var device = sdk.getUserUseIPC();
		var key = sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName;
	   if(device && device.deviceType && device.deviceType == 1){//使用的是ipc
	   		var opts={domainCode: sdk.sie.strUserDomainCode,strUserID: sdk.opts.loginName};
		   	_this.getUserUrlReq(opts);
		   	_this.enterMeetAction(key);
	   }else{//使用的是usb
	   	    
	   		var video = _this.userInfo[key].video;
	   		var p = {
		        videoNode: video,
		        videoParam:{palyParam:{title: sdk.opts.userName},videoControl:{setBitFlag: true,setAudioFlag: true,setVideoFlag: true}},
		        success:function(res){
		          if(res.code===0){
	          	 	_this.enterMeetAction(key);
		          }else{
		          	bootbox.alert(res.desc);
		          }
		          
		        }
		    };
		    if(device && device.deviceType && device.deviceType == 2 && device.usb){
		    	p.media = device.usb;
		    }
		    if(_this.opt.meetingInfo.nVoiceIntercom && _this.opt.meetingInfo.nVoiceIntercom==1){
		    	p.media.video = false;
			    if( p.videoParam &&  p.videoParam.videoControl){
				    p.videoParam.videoControl.setVideoFlag = false;
			    }
		    }
	   		_this.captureMap = sdk.startCapture(p);
	   }
	}catch(e){console.error("HY_MEETING.prototype.starCapture:::"+e);}
};

HY_MEETING.prototype.enterMeetAction = function(key){
	var _this = this;
	if(_this.meetingRole ==1){
      	_this.ctr.host({key:key});
      	_this.userInfo[key].isHost = true;
      	_this.callBackByUser(function(uu){ 
	          //console.log("/////////// 采集成功", uu);
	          uu.status = -1;
          	 _this.ctr.updateStatus(uu);
      	});
      	_this.startReq();
  	}else{
		_this.ctr.selfMe({key:key});
      	//_this.userInfo[key].isHost = true;
  		_this.startCalledReq();
  	}
}

HY_MEETING.prototype.callBackByUser = function(back){
	var _this = this;
	for(var key in _this.userInfo){
			(function(user){
				back(user,key);
			})(_this.userInfo[key]);
		}
}	

//获取用户的url
HY_MEETING.prototype.getUserUrlReq = function(opt){
	var _this = this;
	var sdk = this.hySdk;
	//console.error("!#####getUserUrlReq##", JSON.stringify(opt));
    if(opt.domainCode && opt.strUserID){
    	var uu = _this.userInfo[opt.domainCode+"_"+opt.strUserID];
    	if(opt.isShareDesk){
    		uu = _this.userInfo[opt.domainCode+"_"+opt.strUserID+"_desk"];
    	}
    	if(uu.video){
	    	if(uu.video.isplay == true){
	    		return;
	    	}else{
	    		uu.video.isplay = true;
	    	}
    	}
    }
   
    if(opt.nDevType == 3){//设备
    	 var devL = opt.strUserID.split("-");	
    	 var oo = {
            strDomainCode: devL[0],
            strDeviceCode: devL[1],
            strChannelCode: devL[2],
            strStreamCode: devL[3]
        };
        _this.hySdk.getDeviceUrlReq(oo,function(urlRes) {
        	var json = {dynamicUrl: urlRes.strDynamicUrl};
        	Object.assign(json, urlRes);
        	_this.getUserUrlRspByRtc(json,opt);
        });
    }else{
    	var opt1 = {
	        strDomainCode: opt.domainCode,
	        "listUser": [{"strUserID": opt.strUserID}]
	    };
		_this.hySdk.queryUserListReq(opt1,function(res) {
	        if(res.listUser){
		        var opt11 = {strUserTokenID: res.listUser[0].strUserTokenID,domainCode: opt.domainCode};
		        _this.hySdk.getMobileDynamicUrlReq(opt11, function(json) {
		        	_this.getUserUrlRspByRtc(json,opt);
		        });
	        }
	    });
    }
};

//获取用户url的响应
HY_MEETING.prototype.getUserUrlRsp = function(json,user){
	var _this = this;
	var sdk = this.hySdk;
	var video ='';				
	if(!(user.domainCode && user.strUserID)){
		video = _this.userInfo[sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName].video
	}else{
		video = _this.userInfo[user.domainCode+"_"+user.strUserID].video
	}
	if(json.nResultCode == 0){
		var pla = {	
			    wsserver: sdk.opts.sieStreamUrl,
		        //wsserver:"ws://192.168.2.160:5080",
				rtspurl:json.dynamicUrl,
				hyVideo: video,
				log:true
		};
		sdk.mainPlay.playByVideo(pla);
	}
};

//获取用户url的响应
HY_MEETING.prototype.getUserUrlRspByRtc = function(json,user){
	var _this = this;
	var sdk = this.hySdk;
	var video ='';		
	//console.error("获取用户url的响应  getUserUrlRspByRtc:::", user,json);
	var userInfo = _this.userInfo[sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName];
	if(!(user.domainCode && user.strUserID)){
		video = userInfo.video
	}else{
		userInfo = _this.userInfo[user.domainCode+"_"+user.strUserID];
		video = userInfo.video;
	}
	
	if(user.isShareDesk){
		userInfo = _this.userInfo[user.domainCode+"_"+user.strUserID+"_desk"];
		video = userInfo.video;
	}
	
	if(json.nResultCode == 0){
		var url = json.dynamicUrl;
		//console.error("getUserUrlRspByRtc:::"+JSON.stringify(json));
		if(user.isShareDesk){
			url = json.desktopDynamicUrl;
		}
		video.close();
		//console.error("getUserUrlRspByRtc:::"+userInfo.info.strUserName+":::"+url);
		var map =  sdk.playRtc({
			videoNode: video,
			playUrl:url,
			videoParam:{palyParam:{title:userInfo.info.strUserName,user:userInfo.info},videoControl:{curresFlag:true,bitrateFlag:true}}
		});
	}else{
		video.isplay = false;
	}
};


//参加会议
HY_MEETING.prototype.joinMeetingReq = function(nIsAgree,callBack){
	try{
	var _this = this;
	var sdk = this.hySdk;
	var json =  _this.opt.meetingInfo;
	sdk.log("joinMeetingReq nIsAgree:::"+nIsAgree);
	var joinParam = {
			strMeetingDomainCode:json.strMeetingDomainCode,
			nMeetingID: json.nMeetingID,
			nPicMode:json.nSynthesise == 1 ? 1: 0,
			strInviteUserDomainCode: json.strInviteUserDomainCode,
			strInviteUserTokenID: json.strInviteUserTokenID,
			nIsAgree: nIsAgree
		};
	sdk.joinMeetingReq(joinParam, callBack);
	}catch(e){
	 sdk.log(e);
	}
};
//参加会议响应
HY_MEETING.prototype.joinMeetingRsp = function(json){
	var _this = this;
	var sdk = this.hySdk;
	if(json.nResultCode == 0){
		sdk.log('*********进入会议成功');
	}
};

//初始化参会人员面板
HY_MEETING.prototype.initUserPanel = function(){
	var _this = this;
	
	_this.ctr = new HY_MEETING_CTR(_this);
	_this.ctr.draw();
};

//邀请人员
HY_MEETING.prototype.inviteUserAction = function(user){
	var _this = this;
	_this.hySdk.log("inviteUserAction:::"+JSON.stringify(user));
	var  list = [];
	list.push(user);
	var p = {
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID:_this.nMeetingID,
		lstMeetingUserInfo:list
	}
	this.hySdk.inviteUserMeetingReq(p, function(json){
		_this.inviteUserMeetingRsp(json, user);
	});
};

//邀请人员响应
HY_MEETING.prototype.inviteUserMeetingRsp = function(json, user){
	var _this = this;
	_this.hySdk.log("inviteUserMeetingReq:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
		 userobj.status = -1;
      	 _this.ctr.updateStatus(userobj);
	}
};

//请出人员
HY_MEETING.prototype.kitOurUserAction = function(user){
	var _this = this;
	_this.hySdk.log("kitOurUserAction:::"+JSON.stringify(user));
	var  list = [];
	list.push(user);
	var p = {
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID:_this.nMeetingID,
		strKickUserDomainCode:user.strUserDomainCode,
		strKickUserID: user.strUserID
	}
	this.hySdk.kickMeetingUserReq(p, function(json){
		_this.kickMeetingUserRsp(json, user);
	});
};


//请出人员响应
HY_MEETING.prototype.kickMeetingUserRsp = function(json, user){
	var _this = this;
	_this.hySdk.log("kickMeetingUserRsp:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
		 userobj.status = 2;
      	 _this.ctr.updateStatus(userobj);
      	 
		_this.stopVideo({
			domainCode:user.strUserDomainCode,
			strUserID: user.strUserID
		});
	}
};

//取消邀请
HY_MEETING.prototype.cancelAction = function(user){
	var _this = this;
	_this.hySdk.log("cancelAction:::"+JSON.stringify(user));
	var p = {
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID:_this.nMeetingID,
		lstMeetingUserInfo:[{
			strUserDomainCode:user.strUserDomainCode,
			strUserID: user.strUserID
		}]
	}
	_this.hySdk.cancelInviteUserMeetingReq(p, function(json){
		_this.cancelActionRsp(json, user);
	});
};
//取消邀请
HY_MEETING.prototype.cancelActionRsp = function(json, user){
	var _this = this;
	_this.hySdk.log("cancelActionRsp !!!!!!!!",json);
	if(json.nResultCode == 0){
		var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
		 userobj.status = 2;
      	 _this.ctr.updateStatus(userobj);
	}
};

//被从会议中请出通知
HY_MEETING.prototype.notifyKickUserMeeting = function(json){
	var _this = this;
	_this.hySdk.log("notifyKickUserMeeting:::"+JSON.stringify(json));
	var key = json.nMeetingID+"_"+json.strMeetingDomainCode;
	_this.hySdk.calledMt[key].quitMeetingRsp();
	bootbox.alert("您已被踢出会议！ ");
};

//禁言，解禁操作
HY_MEETING.prototype.speekChangeAction =function(nSetSpeak,user,func){
	var _this = this;
	var  list = [];
	var p = {
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID:_this.nMeetingID
	}
	if(user){
		list.push({
			strUserDomainCode:user.strUserDomainCode,
			strUserID:user.strUserID,
			nSetSpeak:nSetSpeak
		});
		p.listUser = list;
	}else{
		_this.nSetSpeakForAll == 1 ? 0:1;
		p.nSetSpeakForAll = _this.nSetSpeakForAll;
	}
	
	
	this.hySdk.meetingSpeakSetReq(p,func);
}

//对人员禁言
HY_MEETING.prototype.speekChangeNo = function(user){
	var _this = this;
	_this.hySdk.log("speekChangeNo:::"+JSON.stringify(user));
	
	_this.speekChangeAction(0,user, function(json){
		_this.meetingSpeakSetRsp(json, user,0);
	});
};

//对人员解禁
HY_MEETING.prototype.speekChangeOk = function(user){
	var _this = this;
	_this.hySdk.log("speekChangeOk:::"+JSON.stringify(user));
	
	_this.speekChangeAction(1,user, function(json){
		_this.meetingSpeakSetRsp(json, user, 1);
	});
};

//对人员禁言响应
HY_MEETING.prototype.meetingSpeakSetRsp = function(json, user,type){
	try{
		var _this = this;
		_this.hySdk.log("meetingSpeakSetRsp:::"+JSON.stringify(user));
		if(json.nResultCode == 0){
			var userObj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
			if(type == 0){//禁言
				 userObj.status = 5;
	      	 	_this.ctr.updateStatus(userObj);
			}else{
				userObj.status = 6;
	      	 	_this.ctr.updateStatus(userObj);
			}
		}
	}catch(e){console.error("meetingSpeakSetRsp:::"+e)}
};


//关闭人员视频
HY_MEETING.prototype.videoChangeNo = function(user){
	var _this = this;
	_this.turnOnOffCamera(0,user);
};

//打开人员视频
HY_MEETING.prototype.videoChangeOk = function(user){
	var _this = this;
	_this.turnOnOffCamera(1,user);
};

HY_MEETING.prototype.turnOnOffCamera = function(type, user){
	var _this = this;
	var userObj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
	_this.hySdk.log("videoChangeOk:::"+JSON.stringify(userObj.info));
	_this.hySdk.turnOnOffCameraReq({
		strDestUserDomainCode: userObj.info.strUserDomainCode,
		strDestUserTokenID: userObj.info.strUserTokenID,
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID:_this.nMeetingID,
		nCameraAuth: type
	}, function(json){
		if(json.nResultCode == 0){
			var userObj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
			if(type == 0){//关闭视频
				 userObj.status = 13;
	      	 	_this.ctr.updateStatus(userObj);
			}else{//打开视频
				userObj.status = 14;
	      	 	_this.ctr.updateStatus(userObj);
			}
		}
	});
}

//举手
HY_MEETING.prototype.raiseHandAction = function(user){
	var _this = this;
	_this.hySdk.meetingUserRaiseReq({
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID: _this.nMeetingID
	});
};

//通知主持人举手消息
HY_MEETING.prototype.notifyRaiseInfo= function(json){
	var _this = this;
	_this.hySdk.log("notifyRaiseInfo:::"+JSON.stringify(json));
	bootbox.alert("接收到 "+json.strUserName+"举手消息！");
};
//取消主讲人
HY_MEETING.prototype.cancelSpeakerAction= function(user){
	this.setSpeakerAction(user,"cancel");
};

//设置主讲人
HY_MEETING.prototype.setSpeakerAction = function(user,type){
	var _this = this;
	var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID].info;
	var sdk  =_this.hySdk;
	var p = {
		strKeynoteSpeakerDomainCode:uu.strUserDomainCode,
		strKeynoteSpeakerTokenID: uu.strUserTokenID,
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID: _this.nMeetingID
	};
	if(type == "cancel"){
		p.strKeynoteSpeakerDomainCode ='';
		p.strKeynoteSpeakerTokenID ='';
	}
	
	sdk.setMeetingKeynoteSpeakerReq(p,function(json){
		if(json.nResultCode == 0){
			var self = _this.userInfo[sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName];
			if(sdk.sie.strUserDomainCode == user.strUserDomainCode && sdk.opts.loginName == user.strUserID){
				if(type != "cancel"){
					self.status = 15;
				}else{
					self.status = 11;
				}
				_this.ctr.updateStatus(self);
			}else{
				if(type != "cancel"){
					self.status = 11;
					_this.ctr.updateStatus(self);
					var host = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
					host.status = 12;
					_this.ctr.updateStatus(host);
				}
			}
		}
		
	});
};

//屏幕分享
HY_MEETING.prototype.shareDesktopAction = function(user){
	var _this = this;
	var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
	var uu = userobj.info;
	//console.error("!!!!!shareDesktopAction!!!"+JSON.stringify(uu));
	var p = {
		strDesktopSharerDomainCode:uu.strUserDomainCode,
		strDesktopSharerTokenID:uu.strUserTokenID,
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID: _this.nMeetingID
	}
	_this.hySdk.getMeetingDesktopShareAuthReq(p,function(json){
		if(json.nResultCode == 0){
			userobj.status = 18;
			_this.ctr.updateStatus(userobj);
			_this.startDeskShare(user, function(){
				_this.hySdk.setMeetingDesktopSharerReq(p,function(sjson){
					if(sjson.nResultCode == 0){
						_this.hySdk.log("setMeetingDesktopSharerReq:::",sjson);
					}
				});
			});
		}
	});
};

//添加分享窗口
HY_MEETING.prototype.setMeetSizeScreen = function(video){
	var _this = this;
	_this.meetPlayer.setSizeScreenLayout({
		mainVideo: video,
		showNum:_this.meetPlayer.players.length >10?5: Math.floor(_this.meetPlayer.players.length/2)
	});
};

//添加分享窗口
HY_MEETING.prototype.addShareLayout = function(user){
	var _this = this;
	var key = user.strUserDomainCode+"_"+user.strUserID+"_desk";
	if(_this.userInfo[key]){
		var video = _this.userInfo[key].video;
		var info  = _this.userInfo[key].info;
	}else{
		//_this.addUser({strUserDomainCode: uu.strUserDomainCode, "strUserID": uu.strUserTokenID+"_desk","user": uu.userName});
		var video = _this.meetPlayer.addLayout();
		var newInfo = $.extend({},_this.userInfo[user.strUserDomainCode+"_"+user.strUserID].info) ;
		newInfo.strUserName = newInfo.strUserName+"_分享";
		newInfo.isShareDesk = true;
		var info  = {"video": video,info: newInfo};
		_this.userInfo[key] = info;
	}
	_this.setMeetSizeScreen(video);
	
	return video;
};

HY_MEETING.prototype.startDeskShare = function(user,func){
	try{
		var _this = this;
		var sdk = _this.hySdk;
		
		var video = _this.addShareLayout(user);
		var p = {
			media:{data: true,video:"screen",screenshareFrameRate: 25},
			capture_type:2,
	        videoNode: video,
	        simulcast: false,
	        videoParam:{palyParam:{title: sdk.opts.userName+"_分享"},videoControl:{setBitFlag: true}},
	        success:function(res){
	          if(res.code===0){
	          	func&&func();
	          }else{
	          	bootbox.alert(res.desc);
	          }
	          
	        }
	    };
		_this.deskCaptureMap = _this.hySdk.hyWebRtc.startCapture(p);
	   	video.attach = _this.deskCaptureMap;
		video.setVideoParam(p);	
		
	}catch(e){console.error(e);}
}; 

//屏幕分享
HY_MEETING.prototype.cancelShareAction = function(user){
	var _this = this;
	var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
	var uu = userobj.info;
	var p = {
		strDesktopSharerDomainCode:'',
		strDesktopSharerTokenID:'',
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nMeetingID: _this.nMeetingID
	}
	_this.hySdk.setMeetingDesktopSharerReq(p,function(json){
		if(json.nResultCode == 0){
			userobj.status = 19;
			_this.ctr.updateStatus(userobj);
			//_this.reduceShareLayout(user);
		}
	});
};

//将分享画面去掉
HY_MEETING.prototype.reduceShareLayout = function(user){
	var _this = this;
	var key = user.strUserDomainCode+"_"+user.strUserID+"_desk";
	var shareObj =  _this.userInfo[key];
	if(shareObj){
		_this.meetPlayer.reduceLayout(shareObj.video);
	}
	delete _this.userInfo[key];
	//恢复布局
	_this.meetPlayer.restoreLayout();
};

//停止会议请求
HY_MEETING.prototype.stopMeeting = function(func){
	var _this = this;
	_this.hySdk.log("stopMeeting:::",_this);
	var meet = {
		strMeetingDomainCode:_this.strMeetingDomainCode,
		nMeetingID: _this.nMeetingID 
	}
	this.hySdk.stopMeetingReq(meet, function(json){
		_this.stopMeetingRsp(json, meet);
		func && func();
	});
};
//停止会议响应
HY_MEETING.prototype.stopMeetingRsp = function(resp,meet){
	var _this = this;
	if(resp.nResultCode == 0){
		if(meet.nMeetingID == _this.nMeetingID &&meet.strMeetingDomainCode == _this.strMeetingDomainCode){
			_this.stopVideo({"type": "all"});
			_this.stopMeetAction();
			_this.hySdk.callMt = null;
		}
	}
};

//结束会议后根据自己业务所需做操作
HY_MEETING.prototype.stopMeetAction = function(){
};

//停止
HY_MEETING.prototype.stopVideo  =function(opt){
	var _this = this;
	if(opt.obj){
		_this = opt.obj;
	}
	if(opt.type&&opt.type == 'all'){
		for(var key in _this.userInfo){
			var user = _this.userInfo[key];
			user.video.close();
		}
	}else{
		var user = _this.userInfo[opt.domainCode+"_"+opt.strUserID];
		user.video.close();
	}
	
};

HY_MEETING.prototype.notifyCallStatusInfo = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("notifyCallStatusInfo 11111",json);
	if(json.nMeetingStatus == 1){//正在进行
		if(json.lstMeetingUser){
			forEachX(json.lstMeetingUser, function(user){
				user.domainCode = user.strUserDomainCode;
				var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
				if(uu){
					var userInfo = uu.info;
					$.extend(userInfo, user);
					_this.userInfo[user.strUserDomainCode+"_"+user.strUserID].info = userInfo;
				}
				if(uu){
					uu.info = user;
					if(!(uu.info.strUserDomainCode == sdk.sie.strUserDomainCode && uu.info.strUserID == sdk.opts.loginName)){//主持人自己的状态更新
				      	 _this.hostUpdateUserStauts(user,json);
					}else{//主持人界面的其他用户状态变更
						 if(user.strUserDomainCode == json.strKeynoteSpeakerDomainCode && user.strUserID == json.strKeynoteSpeakerUserID){
							uu.status = 15;
							_this.ctr.updateStatus(uu);
						 }else{
						 	uu.status = 11;
							_this.ctr.updateStatus(uu);
						 }
					}
				}else{
					_this.addUser(user);
					_this.getUserUrlReq(user);
					var uu1 = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
					uu1.status = 1;
					_this.ctr.updateStatus(uu1);
				    //_this.hostUpdateUserStauts(user, json);
				}
			});
		}
		_this.resetMtLayoutByNotify(json);
	}else{//结束
		_this.hySdk.stopPlay(_this.meetPlayer);
	}
	
};
HY_MEETING.prototype.hostUpdateUserStauts = function(user,json){
	var _this = this;
	var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
	if(uu.video){
     	if(user.nPartType == 0){//加入
     		_this.getUserUrlReq(user);
         	
         	 if(user.nMuteStatus == 0){//麦克风非静音
	          	uu.status = 6;
	         }else{//麦克风静音
	          	uu.status = 5;
	         }
	         _this.ctr.updateStatus(uu);
	         
	         if(user.nCameraAuth != 1){
		 		uu.status = 13;
		     }else{
		     	uu.status = 14;
		     }
		  	 _this.ctr.updateStatus(uu);
	         
     	}else if(user.nPartType == 1){//退出
     		uu.video.close();
     		uu.status = 0;
     		_this.ctr.updateStatus(uu);
     	}else{//正常参会
     		 if(user.nMuteStatus == 0){//麦克风非静音
	          	uu.status = 6;
	         }else{//麦克风静音
	          	uu.status = 5;
	         }
	          _this.ctr.updateStatus(uu);
	          
	         if(user.nCameraAuth != 1){
		 		uu.status = 13;
		     }else{
		     	uu.status = 14;
		     }
		  	 _this.ctr.updateStatus(uu);
     	}
     }
     
  	
  	 if(user.strUserDomainCode == json.strKeynoteSpeakerDomainCode && user.strUserID == json.strKeynoteSpeakerUserID){
		uu.status = 12;
		_this.ctr.updateStatus(uu);
	 }else{
	 	if(user.nPartType !=1){
	 		uu.status = 11;
			_this.ctr.updateStatus(uu);
	 	}
	 }
};

HY_MEETING.prototype.notifyCalledStatusInfo = function(json){
	var _this = this;
	var  sdk = _this.hySdk;
	if(json.nMeetingStatus == 1){//正在进行
		if(json.lstMeetingUser){
			forEachX(json.lstMeetingUser, function(user){
				user.domainCode = user.strUserDomainCode;
				var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
				if(uu){
					var userInfo = uu.info;
					$.extend(userInfo, user);
					_this.userInfo[user.strUserDomainCode+"_"+user.strUserID].info = userInfo;
				}
				if(uu){//已经缓存起来的与会人
					if(!(uu.info.strUserDomainCode == sdk.sie.strUserDomainCode && uu.info.strUserID == sdk.opts.loginName)){//参会者更新其他人状态
			         	if(user.nPartType == 0){//加入
		         		   _this.getUserUrlReq(user);
				         	
				         	 if(user.nMuteStatus == 0){//麦克风非静音
					          	uu.status = 8;
					         }else{//麦克风静音
					          	uu.status = 7;
					          	_this.ctr.updateStatus(uu);
					         }
				         	
			         	}else if(user.nPartType == 1){//退出
			         		uu.video.close();
			         	}else{//正常参会
			         		if(user.nMuteStatus == 0){//麦克风非静音
					          	uu.status = 8;
					         }else{//麦克风静音
					          	uu.status = 7;
					          	_this.ctr.updateStatus(uu);
					         }
			         		_this.getUserUrlReq(user);
			         	}
			         	
					}else{//参会者更新自己状态
						 if(user.nMuteStatus == 0){//麦克风非静音
				          	uu.status = 10;
				          	if(_this.captureMap){
					          	_this.captureMap.pluginHandle.send({ message: { request: "mute",audio: true , uuid: _this.hySdk.sie.strUserTokenID}});
				          	}
				         }else{//麦克风静音
				          	uu.status = 9;
			          		if(_this.captureMap){
					          	_this.captureMap.pluginHandle.send({ message: {request: "mute", audio: false , uuid: _this.hySdk.sie.strUserTokenID}});
				          	}
				         }
				         _this.ctr.updateStatus(uu);
				          
				    	if(user.nCameraAuth == 0){
					    	if(_this.captureMap){
						      	_this.captureMap.pluginHandle.send({ message: { request: "mute",video: false , uuid: _this.hySdk.sie.strUserTokenID}});
						  	}
				    	}else{
				    		if(_this.captureMap){
						      	_this.captureMap.pluginHandle.send({ message: { request: "mute",video: true , uuid: _this.hySdk.sie.strUserTokenID}});
						  	}
				    	}
					}
				}else{//后来邀请的人
					//console.error("新增人员");
					_this.addUser(user);
					var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
					 if(user.nMuteStatus == 0){//麦克风非静音
			          	uu.status = 8;
			         }else{//麦克风静音
			          	uu.status = 7;
			         }
					 _this.ctr.updateStatus(uu);
				    _this.getUserUrlReq(user);
				}
				
				if(user.strUserDomainCode == json.strKeynoteSpeakerDomainCode && user.strUserID == json.strKeynoteSpeakerUserID){
					uu.status = 16;
					 _this.ctr.updateStatus(uu);
				}else{
					uu.status = 17;
					 _this.ctr.updateStatus(uu);
				}
				
			});
		}
		_this.lockStatus = json.nLockStatus;
		
		_this.resetMtLayoutByNotify(json);
	}else{//结束
		//_this.hySdk.stopPlay(_this.meetPlayer);
		_this.stopAfter(json);
		bootbox.alert("会议已结束！ ");
	}
};

HY_MEETING.prototype.resetMtLayoutByNotify = function(json){
	var _this = this;
	if(!(json.strKeynoteSpeakerDomainCode && json.strKeynoteSpeakerUserID)&&!(json.strDesktopSharerDomainCode && json.strDesktopSharerUserID)){//没有主讲人时
		if(!(json.strDesktopSharerDomainCode && json.strDesktopSharerUserID)){
			_this.callBackByUser(function(uu,key){ 
				var info = uu.info;
				if(info.isShareDesk){
					_this.reduceShareLayout(info);
				}
	      	});
		}
		_this.meetPlayer.restoreLayout();
	}else{
		 if(json.strDesktopSharerDomainCode && json.strDesktopSharerUserID){//有桌面分享
			if(json.strDesktopSharerDomainCode == sdk.sie.strUserDomainCode && json.strDesktopSharerUserID == sdk.opts.loginName){
			
			}else{
				_this.showDeskShareByNotify(json);
			}
		}else {//没有屏幕分享
			_this.callBackByUser(function(uu){ 
				var info = uu.info;
				if(info.isShareDesk){
					_this.reduceShareLayout(info);
				}
	      	});
	      	//_this.meetPlayer.restoreLayout();
			 if(json.strKeynoteSpeakerDomainCode && json.strKeynoteSpeakerUserID){
				var mainUser = _this.userInfo[json.strKeynoteSpeakerDomainCode+"_"+json.strKeynoteSpeakerUserID];
				_this.setMeetSizeScreen(mainUser.video);
			}
				
		}
	}
};

HY_MEETING.prototype.stopAfter = function(json){
	var _this = this;
	var key = json.nMeetingID+"_"+json.strMeetingDomainCode;
	var meet= _this.hySdk.calledMt[key];
	//被叫
	if(meet && meet.incomingDialog){
		clearTimeout(meet.callTimeOutTimer);
		meet.incomingDialog.modal('hide');
		meet.incomingDialog = null;
	}
	this.quitMeetingRsp();
}

HY_MEETING.prototype.showDeskShareByNotify = function(json){
	try{
		var _this = this;
		_this.addShareLayout({
			strUserDomainCode: json.strDesktopSharerDomainCode,
			strUserID: json.strDesktopSharerUserID
		});
		var srcObj = _this.userInfo[json.strDesktopSharerDomainCode+"_"+json.strDesktopSharerUserID+"_desk"];
		var opts={domainCode: json.strDesktopSharerDomainCode,strUserID: json.strDesktopSharerUserID,strUserName:srcObj.info.strUserName,"isShareDesk": true};
	   	_this.getUserUrlReq(opts);

	}catch(e){console.error("HY_MEETING.prototype.showDeskShareByNotify:::"+e);}
};

//通知会议状态信息-会议中主持人操作
HY_MEETING.prototype.notifyMStatusHostAction = function(json){
	var _this = this;
	if(json.lstMeetingUser){
		for(var i=0;i<json.lstMeetingUser.length;i++){
			(function(user){
				if(!(user.strUserDomainCode == sdk.sie.strUserDomainCode &&
				user.strUserID == sdk.opts.loginName)){//如果是自己进会不做操作
					if(user.nPartType == 1){// 0 加入 1 退出 2 正常与会
						_this.stopVideo({
							domainCode:user.strUserDomainCode,
							strUserID: user.strUserID
						});
						
						var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
						userobj.callStatus.style.display = 'none';
						userobj.kitOutBtn.style.display = 'none';
						userobj.speakBtnToOK.style.display = 'none';
						userobj.speakBtnToNo.style.display = 'none';
						userobj.inviteBtn.style.display = 'block';
						
						_this.ctr.userListP.innerHTML = '';
						delete _this.hySdk.callMt;
						
					}
				}else{//自己
					
				}
			})(json.lstMeetingUser[i]);
		}
	}
}

//退出会议
HY_MEETING.prototype.quitMeeting = function(func){
	var _this = this;
	_this.hySdk.log("quitMeeting:::"+JSON.stringify(this.opt.meetingInfo));
	this.hySdk.quitMeetingReq(_this.opt.meetingInfo, function(){
		_this.quitMeetingRsp();
		func&& func(_this);
	});
	
};

//退出会议响应
HY_MEETING.prototype.quitMeetingRsp = function(){
	var _this = this;
	_this.hySdk.log("quitMeetingRsp:::"+JSON.stringify(_this.opt.meetingInfo));
	_this.stopVideo({type:"all"});
	var info = _this.opt.meetingInfo;
	var key = info.nMeetingID+"_"+info.strMeetingDomainCode;
	delete _this.hySdk.calledMt[key];
	_this.quitMeetAction();
};

//退出会议后根据自己业务所需做操作
HY_MEETING.prototype.quitMeetAction = function(){
};
//开始录像
HY_MEETING.prototype.beginRecord = function(func){
	var _this = this;
	_this.hySdk.beginMeetingRecordReq({
		nMeetingID:_this.nMeetingID,
		strMeetingDomainCode: _this.strMeetingDomainCode
	}, function(json){
		if(json.nResultCode == 0){
			_this.recordInfo = json;
		}
		func&& func(json);
	});
};
//开始录像
HY_MEETING.prototype.stopRecord = function(func){
	var _this = this;
	if(_this.recordInfo && _this.recordInfo.nMeetingRecordID){
		_this.hySdk.stopMeetingRecordReq({
			nMeetingID:_this.nMeetingID,
			strMeetingDomainCode: _this.strMeetingDomainCode,
			nMeetingRecordID: _this.recordInfo.nMeetingRecordID
		}, function(json){
			_this.recordInfo = "";
			func && func(json);
		});
	}else{
		_this.hySdk.log("没有录像信息：：：",_this.recordInfo);
	}
};

//开始录像
HY_MEETING.prototype.lockToggle = function(){
	var _this = this;
	_this.hySdk.lockMeetingReq({
		nMeetingID:_this.nMeetingID,
		strMeetingDomainCode: _this.strMeetingDomainCode,
		nLock: _this.lockStatus == 1?0:1
	}, function(json){
		if(json.nResultCode == 0){
			if(_this.lockStatus == 1){
				_this.lockStatus = 0;
				bootbox.alert("会议解锁成功");
				_this.lockBtn.html("锁定");
			}else{
				_this.lockStatus = 1;
				bootbox.alert("会议锁定成功");
				_this.lockBtn.html("解锁");
			}
		}
	});
};

//新增邀请人员
HY_MEETING.prototype.addUser = function(user){
	var _this = this;
	var key = user.strUserDomainCode+"_"+user.strUserID;
	if(!_this.userInfo[key]){
		//var video = _this.meetPlayer.addMeetLayout();
		var video = _this.meetPlayer.addLayout();
		var info  = {"video": video,info: user};
		_this.userInfo[key] = info;
		_this.ctr.initUserRow(info);
		//console.error("###",_this.meetPlayer.mainVideo);
		if(_this.meetPlayer.mainVideo){
			_this.setMeetSizeScreen(_this.meetPlayer.mainVideo);
		}
		
	}else{
		_this.hySdk.log("addUser 用户已在列表中：：：",JSON.stringify(user));
	}
};

HY_MEETING.prototype.inviteNewUser = function(user){
	var _this = this;
	_this.addUser(user);
	_this.inviteUserAction(user);
};


							           		
//新增邀请人员
HY_MEETING.prototype.notifyTurnOnOffCamera = function(json){
	var _this = this;
	var flag;
	if(json.nCameraAuth == 1){
		flag = true;
	}else{
		flag = false;
	}
	
	if(_this.captureMap){
      	_this.captureMap.pluginHandle.send({ message: { request: "mute",video: flag , uuid: _this.hySdk.sie.strUserTokenID}});
  	}
};

/**============================== 会议控制面板 ================================*/

function HY_MEETING_CTR(opts)
{
	this.meet = opts;
}
HY_MEETING_CTR.prototype.draw = function()
{
	var _this = this;
	var userPanel = document.getElementById(_this.meet.opt.userPanel);
	userPanel.innerHtml='';
	var userListP = document.createElement('div');
	_this.userListP = userListP;
	userPanel.appendChild(_this.userListP);
	for(var key in _this.meet.userInfo){
		(function(user){
			_this.initUserRow(user);
		})(_this.meet.userInfo[key]);
	}
}
HY_MEETING_CTR.prototype.host = function(opp)
{
	var _this = this;
	var u = _this.meet.userInfo[opp.key];
	_this.hideAll(u);
	_this.show(u.hostLabel);
	_this.show(u.setSpeaker);
	_this.show(u.shareDesktop);
}

HY_MEETING_CTR.prototype.selfMe = function(opp)
{
	var _this = this;
	var u = _this.meet.userInfo[opp.key];
	_this.hideAll(u);
	u.hostLabel.innerHTML='自己';
	_this.show(u.hostLabel);
	_this.show(u.raiseHand);
	_this.show(u.shareDesktop);
}

HY_MEETING_CTR.prototype.updateStatus = function(user)
{
	var _this = this;
	//console.error("updateStatus:::"+user.info.strUserID+"||"+user.status);
	if(user.isHost === true)
	{
		//_this.hideAll(user);
		_this.show(user.hostLabel);
		if(user.status == 11){
			_this.hide(user.cancelSpeaker);
			_this.show(user.setSpeaker);
		}else if(user.status == 15){
			_this.hide(user.setSpeaker);
			_this.show(user.cancelSpeaker);
		}else if(user.status == 18){
			_this.hide(user.shareDesktop);
			_this.show(user.cancelShare);
		}else if(user.status == 19){
			_this.hide(user.cancelShare);
			_this.show(user.shareDesktop);
		}else{
			_this.show(user.setSpeaker);
		}
	}else
	{
		_this.meet.hySdk.log(user.status);
		switch(user.status)
		{
			case -1://主持人，用户呼叫中
				_this.hideAll(user);
				_this.show(user.callStatus);
				_this.show(user.cancelBtn);
			 	break;
			 case 0://主持人，用户未加入会议
				_this.hideAll(user);
				_this.show(user.inviteBtn);
			 	break;
			 case 4:
				;
			 case 1://主持人，用户加入会议
			 	_this.hideAll(user);
				_this.show(user.kitOutBtn);
				_this.show(user.speakBtnToNo);
				_this.show(user.videoBtnToNo);
				_this.show(user.setSpeaker);
			 	break;
			 case 2://主持人，用户未加入会议
			 ;
			 case 3://主持人，用户未加入会议
				_this.hideAll(user);
				_this.show(user.inviteBtn);
			 	break;
			 case 5://主持人，用户未禁言
			 	_this.hide(user.inviteBtn);
				_this.hide(user.speakBtnToNo);
				_this.show(user.speakBtnToOK);
				_this.show(user.kitOutBtn);
			 	break;
			 case 6://主持人，用户解禁
			    _this.hide(user.inviteBtn);
				_this.hide(user.speakBtnToOK);
				_this.show(user.speakBtnToNo);
				_this.show(user.kitOutBtn);
			 	break;
			 case 9://非主持人，自己显示禁言中
			 	//_this.hideAll(user);
				_this.show(user.hostLabel);
				_this.show(user.raiseHand);
				_this.show(user.speakTip);
				break;
			 case 10://非主持人，显示非禁言
			 	//_this.hideAll(user);
			 	_this.hide(user.speakTip);
				_this.show(user.hostLabel);
				_this.show(user.raiseHand);
				break;
		 	 case 7://非主持人，显示非禁言
				_this.show(user.speakTip);
			 	break;
			 case 11://主持人，用户变非主讲人
				_this.hide(user.cancelSpeaker);
				_this.show(user.setSpeaker);
				break;
			 case 12://主持人，用户变更为主讲人
				_this.hide(user.setSpeaker);
				_this.show(user.cancelSpeaker);
				break;
			 case 13://主持人，用户关闭视频
				_this.hide(user.videoBtnToNo);
				_this.show(user.videoBtnToOk);
				break;
			 case 14://主持人，用户打开视频
				_this.hide(user.videoBtnToOk);
				_this.show(user.videoBtnToNo);
				break;
			 case 16://非主持人，为主讲人
				_this.show(user.speakLabel);
				break;
			 case 17://非主持人，为非主讲人
				_this.hide(user.speakLabel);
				break;
			 case 18://非主持人，屏幕分享中
				_this.hide(user.shareDesktop);
				_this.show(user.cancelShare);
				break;
			 case 19://非主持人，取消屏幕分享
				_this.hide(user.cancelShare);
				_this.show(user.shareDesktop);
				break;
		}
	}
	
}

HY_MEETING_CTR.prototype.invite = function()
{
	
}
HY_MEETING_CTR.prototype.kickout = function()
{
	
}
HY_MEETING_CTR.prototype.noWords = function()
{
	
}
HY_MEETING_CTR.prototype.noSound = function()
{
	
}
HY_MEETING_CTR.prototype.show = function(ele)
{
	ele.style.display = "block";
}
HY_MEETING_CTR.prototype.hide = function(ele)
{
	ele.style.display = "none";
}
HY_MEETING_CTR.prototype.hideAll = function(u)
{
	var _this = this;
	_this.hide(u.hostLabel);
	_this.hide(u.callStatus);
	_this.hide(u.inviteBtn);
	_this.hide(u.kitOutBtn);
	_this.hide(u.cancelBtn);
	_this.hide(u.speakBtnToNo);
	_this.hide(u.speakBtnToOK);
	_this.hide(u.speakTip);
	_this.hide(u.speakLabel);
	_this.hide(u.raiseHand);
	_this.hide(u.setSpeaker);
	_this.hide(u.videoBtnToOk);
	_this.hide(u.videoBtnToNo);
	_this.hide(u.cancelSpeaker);
}
//初始化每一个人员
HY_MEETING_CTR.prototype.initUserRow = function(user){
	var _this = this;
	var info = user.info;
	var row =document.createElement("li");
	var img = document.createElement('img');
	if(info.imgUrl){
		img.src = info.imgUrl;
	}else{
		img.src = 'data:image/png;base64,'+imgMap["record"];
	}
	var nameS = document.createElement('span');
	img.style.width="20px";
	img.style.height="20px";
	img.style.marginRight="5px";
	
	nameS.innerHTML= substringByPoint(info.strUserName, 6);
	nameS.title = info.strUserName;
	//row.appendChild(img);
	row.appendChild(nameS);
	_this.userListP.appendChild(row);
	_this.meet.userInfo[info.strUserDomainCode+"_"+info.strUserID]["li"] =row;
	
	var hostBtnList = [
	{"name": "呼叫中","funcName":'',"id": 'callStatus',"display": 'none'},
	{"name": "邀请","funcName":'inviteUserAction',"id": 'inviteBtn',"display": 'none'},
	{"name": "请出","funcName":'kitOurUserAction',"id": 'kitOutBtn',"display": 'none'},
	{"name": "挂断","funcName":'cancelAction',"id": 'cancelBtn',"display": 'none'},
	{"name": "禁言","funcName":'speekChangeNo',"id": 'speakBtnToNo',"display": 'none'},
	{"name": "解禁","funcName":'speekChangeOk',"id": 'speakBtnToOK',"display": 'none'},
	{"name": "禁言中","funcName":'',"id": 'speakTip',"display": 'none'},
	{"name": "开视频","funcName":'videoChangeOk',"id": 'videoBtnToOk',"display": 'none'},
	{"name": "关视频","funcName":'videoChangeNo',"id": 'videoBtnToNo',"display": 'none'},
	{"name": "举手","funcName":'raiseHandAction',"id": 'raiseHand',"display": 'none'},
	{"name": "屏幕分享","funcName":'shareDesktopAction',"id": 'shareDesktop',"display": 'none'},
	{"name": "取消分享","funcName":'cancelShareAction',"id": 'cancelShare',"display": 'none'},
	{"name": "设为主讲人","funcName":'setSpeakerAction',"id": 'setSpeaker',"display": 'none'},
	{"name": "取消主讲人","funcName":'cancelSpeakerAction',"id": 'cancelSpeaker',"display": 'none'},
	{"name": "主讲人","funcName":'',"id": 'speakLabel',"display": 'none'},
	{"name": "主持人","funcName":'',"id": 'hostLabel',"display": 'none'}
	];
	for(var i=0;i<hostBtnList.length;i++){
		(function(i){
			var btnInfo = hostBtnList[i];
			var btn = document.createElement('a');
			
			if(btnInfo.type && btnInfo.type == 'tip'){
				btn= document.createElement('span');
			}
			btn.style.display = btnInfo.display;
			btn.innerHTML = btnInfo.name;
			btn.style.marginLeft = '10px';
			btn.style.float = 'right';
			btn.onclick = function(){
				btnInfo.funcName && _this.meet[btnInfo.funcName](info);
			}
			row.appendChild(btn);
			_this.meet.userInfo[info.strUserDomainCode+"_"+info.strUserID][btnInfo.id] =btn; 
		})(i);
	}
	
};

/**=========================== 对讲 ===================================*/
function HY_TALK(opt){
	this.hySdk = opt.hySdk;
	this.opt = opt;
	this.talkRole = opt.talkRole;
};

HY_TALK.prototype.start = function(callback){
	var _this =this;
	var s = this.addSelf();
	this.startCallback = callback ? callback: function(){_this.log("创建对讲回调");};
	if(s){
		this.initPlay();//初始化播放器
		this.initUserPanel();
		this.starCapture();
	}else{
		this.startCallback({"code": 1,desc:"请添加对讲人员"},_this);
	}
}

HY_TALK.prototype.calledStart = function(){
	this.initPlay();//初始化播放器
	this.initUserPanel();
	this.starCapture();
}

HY_TALK.prototype.addSelf = function(){
	var _this =this;
	var sdk = this.hySdk;
	var ls = _this.opt.talkInfo.listToUser;
	var flag = true;
	var findSelf = ls.find(function(ele){
		if(ele.strToUserDomainCode == sdk.sie.strUserDomainCode&& ele.strToUserID == sdk.opts.userName){
			return ele;
		}
	});
	
	if(ls){
		if(!findSelf){
			ls.unshift({
	        "strToUserDomainCode": sdk.sie.strUserDomainCode,
	        "strToUserID": sdk.opts.loginName,
	        "strToUserName": sdk.opts.userName
	   	 	});
		}
	}else{
		ls = [];
		ls.push({
        "strToUserDomainCode": sdk.sie.strUserDomainCode,
        "strToUserID": sdk.opts.loginName,
        "strToUserName": sdk.opts.userName
   	 	});
	}
	_this.opt.talkInfo.listToUser = ls;
	
	if(ls.length<=1){
		var flag = false;
	}
	return flag;
};

//初始化集群人员面板
HY_TALK.prototype.initUserPanel = function(){
	var _this = this;
	_this.ctr = new HY_TALK_CTR(_this);
	_this.ctr.draw();
};

//初始化播放器
HY_TALK.prototype.initPlay = function(){
	var _this = this;
	var opt = _this.opt;
	var listToUser = opt.talkInfo.listToUser
	var pla = {				
       // layout:"Meet" + lstMeetingUserInfo.length,
        layout:listToUser.length,
        pnode:opt.pnode
	};
	this.talkPlayer = this.hySdk.getPlayer(pla);
	var players = this.talkPlayer.players;
	this.userInfo = {};
	for(var i = 0; i<listToUser.length;i++){
		(function(ii){
			var user = listToUser[ii];
			if(user.strToUserDomainCode){
				user.strUserDomainCode = user.strToUserDomainCode;
				user.strUserID = user.strToUserID;
				user.strUserName = user.strToUserName;
			}
			_this.userInfo[user.strUserDomainCode+"_"+user.strUserID] = {"video": players[ii],info: user}
		})(i);
	}
};

//判断自己是采集还是使用ipc
HY_TALK.prototype.starCapture= function(){
	try{
		var _this = this;
		var sdk = this.hySdk;
		var device = sdk.getUserUseIPC();
		var key = sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName;
	   if(device && device.deviceType && device.deviceType == 1){//使用的是ipc
	   		var opts={domainCode: sdk.sie.strUserDomainCode,strUserID: sdk.opts.loginName};
		   	_this.getUserUrlReq(opts);
		   	_this.enterTalkAction(key);
	   }else{//使用的是usb
	   	    
	   		var video = _this.userInfo[key].video;
	   		var p = {
		        videoNode: video,
		        videoParam:{palyParam:{title: sdk.opts.userName},videoControl:{setBitFlag: true,setAudioFlag: true,setVideoFlag:true}},
		        success:function(res){
		          if(res.code===0){
	          	 	_this.enterTalkAction(key);
		          }else{
		          	bootbox.alert(res.desc);
		          }
		          
		        }
		    };
		    if(device && device.deviceType && device.deviceType == 2 && device.usb){
		    	p.media = device.usb;
		    }
		    
		    if(_this.opt.talkInfo.nVoiceIntercom && _this.opt.talkInfo.nVoiceIntercom==1){
		    	p.media.video = false;
			    if( p.videoParam &&  p.videoParam.videoControl){
				    p.videoParam.videoControl.setVideoFlag = false;
			    }
		    }
		    
	   		_this.captureMap = sdk.startCapture(p);
	   }
	}catch(e){console.error("HY_MEETING.prototype.starCapture:::"+e);}
};


HY_TALK.prototype.enterTalkAction = function(key){
	var _this = this;
	var sdk = _this.hySdk;
	if(_this.talkRole ==1){
      
      	var key = sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName;
		_this.ctr.host({key:key});
	  	_this.userInfo[key].isHost = true;
	  	_this.callBackByUser(function(uu){ 
	          //console.log("/////////// 采集成功", uu);
	          uu.status = -1;
          	 _this.ctr.updateStatus(uu);
      	});
  		_this.startReq();
  	}else{
  		_this.startCalledReq();
  	}
}
HY_TALK.prototype.callBackByUser = function(back){
	var _this = this;
	for(var key in _this.userInfo){
		(function(user){
			back(user,key);
		})(_this.userInfo[key]);
	}
}	

HY_TALK.prototype.startReq = function(){
	var _this = this;
	var sdk = _this.hySdk;
	sdk.log("HY_TALK.prototype.startReq",this.opt.talkInfo);
	sdk.startTalkbackReq(this.opt.talkInfo, function(json){
		sdk.log(" 创建的对讲信息响应： "+JSON.stringify(json))
		if(sdk.callTk && json.nResultCode === 0)
		{
			sdk.callTk.nTalkbackID = json.nTalkbackID;
			sdk.callTk.strTalkbackDomainCode = json.strTalkbackDomainCode;
			//sdk.callMt.opt.meetingInfo = json;
	        var newInfo = sdk.callTk.opt.talkInfo;
	        Object.assign(newInfo, json);
	        sdk.callTk.opt.talkInfo =  newInfo;
			_this.startCallback({"code": 0},sdk.callTk);
		}
		sdk.log(" 创建的对讲信息： ", sdk.callTk);
	});
}

//被叫加入
HY_TALK.prototype.startCalledReq = function(){
	var _this = this;
	var sdk = _this.hySdk;
	this.joinReq(1, function(res){
		console.error("HY_TALK.prototype.startCalledReq",res);
	});
};

//参加对讲
HY_TALK.prototype.joinReq = function(nIsAgree,callBack){
	try{
		var _this = this;
		var sdk = this.hySdk;
		var json =  _this.opt.talkInfo;
		sdk.log("HY_TALK.prototype.joinReq nIsAgree:::"+nIsAgree);
		var joinParam = {
				strTalkbackDomainCode:json.strTalkbackDomainCode,
				nTalkbackID: json.nTalkbackID,
				nVoiceIntercom:json.nVoiceIntercom,
				nIsAgree: nIsAgree
			};
		sdk.joinTalkbackReq(joinParam, callBack);
	}catch(e){
	 	sdk.log(e);
	}
};

//退出对讲
HY_TALK.prototype.quitReq = function(){
	try{
		var _this = this;
		var sdk = this.hySdk;
		var json =  _this.opt.talkInfo;
		var joinParam = {
				strTalkbackDomainCode:json.strTalkbackDomainCode,
				nTalkbackID: json.nTalkbackID
			};
		sdk.quitTalkbackReq(joinParam, function(json){
			_this.quitRsp(json);
		});
	}catch(e){
	 	sdk.log(e);
	}
};


//退出会议响应
HY_TALK.prototype.quitRsp = function(){
	var _this = this;
	_this.hySdk.log("HY_TALK.prototype.quitRsp:::"+JSON.stringify(_this.opt.talkInfo));
	HY_MEETING.prototype.stopVideo({type:"all",obj:_this});
	var info = _this.opt.talkInfo;
	var key = info.nTalkbackID+"_"+info.strTalkbackDomainCode;
	if(_this.hySdk.calledTk[key]){
		delete _this.hySdk.calledTk[key];
	}
	if(_this.hySdk.callTk){
		_this.hySdk.callTk = null;
	}
	_this.quitTalkAction();
};

//退出对讲后根据自己业务所需做操作
HY_TALK.prototype.quitTalkAction = function(){
};

HY_TALK.prototype.notifyTalkbackPeerUserOption = function(json){
	var _this = this;
	_this.hySdk.log("HY_TALK.prototype.notifyTalkbackPeerUserOption:::",json);
}

HY_TALK.prototype.notifyCallStatusInfo = function(json){
	var _this = this;
	_this.hySdk.log("HY_TALK.prototype.notifyCallStatusInfo:::",json);
	if(json.nTalkbackStatus == 1){//正在进行
		if(json.lstTalkbackUser){
			forEachX(json.lstTalkbackUser, function(user){
				user.domainCode = user.strUserDomainCode;
				var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
				if(uu){
					uu.info = user;
					if(!(uu.info.strUserDomainCode == sdk.sie.strUserDomainCode && uu.info.strUserID == sdk.opts.loginName)){//不是自己
						//获取播放的url
						_this.getUserUrlReq(user);
						if(user.nMuteStatus == 0){
							uu.status = 1;
							_this.ctr.updateStatus(uu);
						}else{
							uu.status = 2;
							_this.ctr.updateStatus(uu);
						}
						
					}else{//自己
					}
				}else{
					_this.addUser(user);
					var uu1 = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
					uu1.status = 1;
					_this.ctr.updateStatus(uu1);
				}
			});
		}
	}else{//结束
		_this.hySdk.stopPlay(_this.talkPlayer);
		_this.quitRsp();
	}
}

HY_TALK.prototype.notifyCalledStatusInfo = function(json){
	var _this = this;
	_this.hySdk.log("HY_TALK.prototype.notifyCalledStatusInfo:::",json);
	var  sdk = _this.hySdk;
	if(json.nTalkbackStatus == 1){//正在进行
		if(json.lstTalkbackUser){
			forEachX(json.lstTalkbackUser, function(user){
				user.domainCode = user.strUserDomainCode;
				var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
				if(uu){//已经缓存起来的与会人
					
					if(!(uu.info.strUserDomainCode == sdk.sie.strUserDomainCode && uu.info.strUserID == sdk.opts.loginName)){//参会者更新其他人状态
			         	_this.getUserUrlReq(user);
			         	if(user.nMuteStatus == 0){
			         		uu.status = 3;
			         	}else{
			         		uu.status = 4;
			         	}
			         	_this.ctr.updateStatus(uu);
					}else{//参会者更新自己状态
						 
					}
				}else{//后来邀请的人
					//console.error("新增人员");
					_this.addUser(user);
					var uu = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
					 if(user.nMuteStatus == 0){//麦克风非静音
			          	uu.status = 3;
			         }else{//麦克风静音
			          	uu.status = 4;
			         }
					 _this.ctr.updateStatus(uu);
				}
			});
		}
		_this.lockStatus = json.nLockStatus;
	}else{//结束
		//_this.hySdk.stopPlay(_this.meetPlayer);
		_this.stopAfter(json);
		console.log("对讲已结束！ ");
	}

}


//新增邀请人员
HY_TALK.prototype.addUser = function(user){
	var _this = this;
	var key = user.strUserDomainCode+"_"+user.strUserID;
	if(!_this.userInfo[key]){
		//var video = _this.meetPlayer.addMeetLayout();
		var video = _this.talkPlayer.addLayout();
		var info  = {"video": video,info: user};
		_this.userInfo[key] = info;
		_this.ctr.initUserRow(info);
		//console.error("###",_this.meetPlayer.mainVideo);
/*		if(_this.meetPlayer.mainVideo){
			_this.setMeetSizeScreen(_this.meetPlayer.mainVideo);
		}
		
*/	}else{
		_this.hySdk.log("HY_TALK.prototype.addUser 用户已在列表中：：：",JSON.stringify(user));
	}
};

HY_TALK.prototype.stopAfter = function(json){
	var _this = this;
	var key = json.nTalkbackID+"_"+json.strTalkbackDomainCode;
	var talk= _this.hySdk.calledTk[key];
	//被叫
	if(talk && talk.incomingDialog){
		clearTimeout(talk.callTimeOutTimer);
		talk.incomingDialog.modal('hide');
		talk.incomingDialog = null;
	}
	this.quitRsp();
}
//通知主叫加入会议
HY_TALK.prototype.notifyCallJoin = function(json){
	var _this = this;
	var sdk = this.hySdk;
	_this.joinReq(1, function(res){
		//_this.joinCallBack_1(res);
	});
}

//获取用户的url
HY_TALK.prototype.getUserUrlReq = function(opt){
	var _this = this;
	var sdk = this.hySdk;
	if(opt.obj){
		
	}
    //sdk.log("!!!!!!!!!!", opt);
    if(opt.domainCode && opt.strUserID){
    	var uu = _this.userInfo[opt.domainCode+"_"+opt.strUserID];
    	if(uu.video){
	    	if(uu.video.isplay == true){
	    		return;
	    	}else{
	    		uu.video.isplay = true;
	    	}
    	}
    }
   
    if(opt.nDevType == 3){//设备
    	 var devL = opt.strUserID.split("-");	
    	 var oo = {
            strDomainCode: devL[0],
            strDeviceCode: devL[1],
            strChannelCode: devL[2],
            strStreamCode: devL[3]
        };
        _this.hySdk.getDeviceUrlReq(oo,function(urlRes) {
        	var json = {dynamicUrl: urlRes.strDynamicUrl};
        	Object.assign(json, urlRes);
        	_this.getUserUrlRspByRtc(json,opt);
        });
    }else{
    	var opt1 = {
	        strDomainCode: opt.domainCode,
	        "listUser": [{"strUserID": opt.strUserID}]
	    };
		_this.hySdk.queryUserListReq(opt1,function(res) {
	        if(res.listUser){
		        var opt11 = {strUserTokenID: res.listUser[0].strUserTokenID,domainCode: opt.domainCode};
		        _this.hySdk.getMobileDynamicUrlReq(opt11, function(json) {
		        	_this.getUserUrlRspByRtc(json,opt);
		        });
	        }
	    });
    }
};


//获取用户url的响应
HY_TALK.prototype.getUserUrlRspByRtc = function(json,user){
	var _this = this;
	var sdk = this.hySdk;
	var video ='';		
	//console.error("获取用户url的响应  getUserUrlRspByRtc:::", user,json);
	var userInfo = _this.userInfo[sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName];
	if(!(user.domainCode && user.strUserID)){
		video = userInfo.video
	}else{
		userInfo = _this.userInfo[user.domainCode+"_"+user.strUserID];
		video = userInfo.video;
	}
	if(json.nResultCode == 0){
		video.close();
		var map =  sdk.playRtc({
			videoNode: video,
			playUrl:json.dynamicUrl,
			videoParam:{palyParam:{title:userInfo.info.strUserName, user: userInfo.info},videoControl:{curresFlag:true,bitrateFlag:true}}
		});
	}else{
		video.isplay = false;
	}
};


//请出
HY_TALK.prototype.kitOutUserAction = function(user){
	var _this = this;
	var sdk = this.hySdk;
	sdk.kickTalkbackUserReq({
		strTalkbackDomainCode:_this.strTalkbackDomainCode,
		nTalkbackID:_this.nTalkbackID,
		strKickUserDomainCode:user.strUserDomainCode,
		strKickUserID: user.strUserID
	}, function(res){
		if(res.nResultCode ==0){
			var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
			 userobj.status = 0;
	      	 _this.ctr.updateStatus(userobj);
	      	 
			HY_MEETING.prototype.stopVideo({
				domainCode:user.strUserDomainCode,
				strUserID: user.strUserID,
				obj:_this
			});
		}else{
			console.error("HY_TALK.prototype.kitOutBtn 请出失败：",res);
		}
	});
};

//邀请
HY_TALK.prototype.inviteUserAction = function(user){
	var _this = this;
	var sdk = this.hySdk;
	sdk.inviteUserTalkbackReq({
		strTalkbackDomainCode:_this.strTalkbackDomainCode,
		nTalkbackID:_this.nTalkbackID,
		listToUser:[{
			strToUserDomainCode: user.strUserDomainCode,
			strToUserID: user.strUserID,
			strToUserName: user.strUserName
		}]
	}, function(res){
		if(res.nResultCode ==0){
			
		}else{
			console.error("HY_TALK.prototype.inviteUserAction 请出失败：",res);
		}
	});
};

//禁言
HY_TALK.prototype.speekChangeNo = function(user){
	var _this = this;
	var sdk = this.hySdk;
	user.type = 0;
	_this.setSpeakAction(user, function(res){
		var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
		 userobj.status = 2;
      	 _this.ctr.updateStatus(userobj);
	});
};

//解禁言
HY_TALK.prototype.speekChangeOk = function(user){
	var _this = this;
	user.type = 1;
	_this.setSpeakAction(user, function(res){
		var userobj = _this.userInfo[user.strUserDomainCode+"_"+user.strUserID];
		 userobj.status = 1;
      	 _this.ctr.updateStatus(userobj);
	});
};
//禁言
HY_TALK.prototype.setSpeakAction = function(user, func){
	var _this = this;
	var sdk = this.hySdk;
	sdk.talkbackSpeakSetReq({
		strDomainCode:_this.strTalkbackDomainCode,
		nTalkbackID:_this.nTalkbackID,
		listUser:[{
			strUserDomainCode: user.strUserDomainCode,
			strUserID: user.strUserID,
			nSetSpeak: user.type
		}]
	}, function(res){
		if(res.nResultCode ==0){
			func&& func(res);
		}else{
			console.error("HY_TALK.prototype.setSpeakAction 发送禁言消息失败：",res);
		}
	});
};

//通知用户被踢出
HY_TALK.prototype.notifyKickUser= function(json){
	var _this = this;
	_this.hySdk.log("!!!HY_TALK.prototype.notifyKickUser!!!!!!!", json);
	_this.quitRsp();
	bootbox.alert("您已被踢出对讲！ ");
};

//通知用户进行自我禁言/解禁言
HY_TALK.prototype.notifyUserSpeakSet= function(json){
	var _this = this;
	var key = sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName;
	var userobj = _this.userInfo[key];
  //使用的是usb
	var video = userobj.video;
	var sendP = {};
	
	if(json.nSetSpeak == 0){//禁言/解禁言（0,1）
		video.audioSwitch = false;
		sendP = {removeAudio: true}
		video.changeButton({btnName:'setAudioBtn',srcName: "audio_close"});
		userobj.status = 4;
	}else{
		video.audioSwitch = true;
		video.changeButton({btnName:'setAudioBtn',srcName: "audio_open"});
		sendP = {addAudio: true};
		userobj.status = 3;
	}
	video.attach.devOperateFun(sendP);
  	 _this.ctr.updateStatus(userobj);
};

/**=========================== 对讲 人员列表 ===================================*/
function HY_TALK_CTR(opts)
{
	this.talk = opts;
};
HY_TALK_CTR.prototype.draw = function()
{
	var _this = this;
	var userPanel = document.getElementById(_this.talk.opt.userPanel);
	userPanel.innerHtml='';
	var userListP = document.createElement('div');
	_this.userListP = userListP;
	userPanel.appendChild(_this.userListP);
	for(var key in _this.talk.userInfo){
		(function(user){
			_this.initUserRow(user);
		})(_this.talk.userInfo[key]);
	}
};

//初始化每一个人员
HY_TALK_CTR.prototype.initUserRow = function(user){
	var _this = this;
	var info = user.info;
	var row =document.createElement("li");
	var img = document.createElement('img');
	if(info.imgUrl){
		img.src = info.imgUrl;
	}else{
		img.src = 'data:image/png;base64,'+imgMap["record"];
	}
	var nameS = document.createElement('span');
	img.style.width="20px";
	img.style.height="20px";
	img.style.marginRight="5px";
	
	nameS.innerHTML= substringByPoint(info.strUserName, 6);
	nameS.title = info.strUserName;
	//row.appendChild(img);
	row.appendChild(nameS);
	_this.userListP.appendChild(row);
	_this.talk.userInfo[info.strUserDomainCode+"_"+info.strUserID]["li"] =row;
	
	var hostBtnList = [
	{"name": "呼叫中","funcName":'',"id": 'callStatus',"display": 'none'},
	{"name": "禁言","funcName":'speekChangeNo',"id": 'speakBtnToNo',"display": 'none'},
	{"name": "解禁","funcName":'speekChangeOk',"id": 'speakBtnToOK',"display": 'none'},
	{"name": "请出","funcName":'kitOutUserAction',"id": 'kitOutBtn',"display": 'none'},
	{"name": "邀请","funcName":'inviteUserAction',"id": 'inviteBtn',"display": 'none'},
	{"name": "禁言中","funcName":'',"id": 'speakTip',"display": 'none'},
	{"name": "发起人","funcName":'',"id": 'hostLabel',"display": 'none'}
	];
	for(var i=0;i<hostBtnList.length;i++){
		(function(i){
			var btnInfo = hostBtnList[i];
			var btn = document.createElement('a');
			
			if(btnInfo.type && btnInfo.type == 'tip'){
				btn= document.createElement('span');
			}
			btn.style.display = btnInfo.display;
			btn.innerHTML = btnInfo.name;
			btn.style.marginLeft = '10px';
			btn.style.float = 'right';
			btn.onclick = function(){
				btnInfo.funcName && _this.talk[btnInfo.funcName](info);
			}
			row.appendChild(btn);
			_this.talk.userInfo[info.strUserDomainCode+"_"+info.strUserID][btnInfo.id] =btn; 
		})(i);
	}
};

HY_TALK_CTR.prototype.host = function(opp)
{
	var _this = this;
	console.error(_this.talk.userInfo, opp.key);
	var u = _this.talk.userInfo[opp.key];
	_this.hideAll(u);
	_this.show(u.hostLabel);
}

HY_TALK_CTR.prototype.selfMe = function(opp)
{
	var _this = this;
	var u = _this.talk.userInfo[opp.key];
	_this.hideAll(u);
	u.hostLabel.innerHTML='自己';
	_this.show(u.hostLabel);
}

HY_TALK_CTR.prototype.show = function(ele)
{
	ele.style.display = "block";
};
HY_TALK_CTR.prototype.hide = function(ele)
{
	ele.style.display = "none";
};

HY_TALK_CTR.prototype.hideAll = function(u)
{
	var _this = this;
	_this.hide(u.callStatus);
	_this.hide(u.kitOutBtn);
	_this.hide(u.inviteBtn);
	_this.hide(u.speakTip);
	_this.hide(u.hostLabel);
	_this.hide(u.speakBtnToNo);
	_this.hide(u.speakBtnToOK);
};

HY_TALK_CTR.prototype.updateStatus = function(user)
{
	var _this = this;
	//console.error("updateStatus:::"+user.info.strTcUserID+"||"+user.status);
	if(user.isHost === true)
	{
		//_this.hideAll(user);
		_this.show(user.hostLabel);
		
	}else
	{
		switch(user.status)
		{
			case -1://未进入频道
				_this.hideAll(user);
				_this.show(user.callStatus);
			 	break;
			 case 0://主持人界面，未进入会议更新状态
				_this.hideAll(user);
				_this.show(user.inviteBtn);
			 	break;
			 case 1://主持人界面，进入会议更新状态
			 	_this.hideAll(user);
				_this.show(user.kitOutBtn);
				_this.show(user.speakBtnToNo);
			 	break;
			 case 2://主持人界面，禁言后更新状态
				_this.hideAll(user);
				_this.show(user.kitOutBtn);
				_this.show(user.speakBtnToOK);
			 	break;
			 case 3://非主持人，进入会议后显示
			 	_this.hideAll(user);
			 	break;
			 case 4://非主持人，被禁言后显示
			 	_this.hideAll(user);
				_this.show(user.speakTip);
			 	break;
		}
	}
	
};
/**=========================== 集群对讲 ===================================*/
function HY_TChannel(opt){
	this.hySdk = opt.hySdk;
	this.opt = opt;
};

HY_TChannel.prototype.start = function(callback){
	var _this =this;
	this.startCallback = callback ? callback: function(){_this.log("创建对讲回调");};
	_this.addSelf();
	this.initPlay();//初始化播放器
	this.initUserPanel();
	this.createReq();
	this.hySdk.nowTChannel = this;
	//this.starCapture();
}

HY_TChannel.prototype.calledStart = function(){
	var _this = this;
	this.initPlay();//初始化播放器
	//this.initUserPanel();
	this.initUserPanel();
	_this.starCapture(function(sres){
		console.error("HY_TChannel.prototype.calledStart#####",sres);
		if(sres.code ==0){
			var sendP = {removeAudio: true}
		 	_this.channelMap.devOperateFun(sendP);
			_this.joinReq();
		}else{
			 bootbox.alert("采集失败！");
		}
	});
}

HY_TChannel.prototype.addSelf = function(){
	var _this =this;
	var sdk = this.hySdk;
	var ls = _this.opt.tChannelInfo.lstTrunkChannelUser;
	var findSelf = ls.find(function(ele){
		if(ele.strTcUserDomainCode == sdk.sie.strUserDomainCode&& ele.strTcUserID == sdk.opts.userName){
			return ele;
		}
	});
	
	if(ls){
		if(!findSelf){
			ls.unshift({
	        "strTcUserDomainCode": sdk.sie.strUserDomainCode,
	        "strTcUserID": sdk.opts.loginName,
	        "strTcUserName": sdk.opts.userName,
	        "nPriority": 1,
	        "nEnforce":0
	   	 	});
		}
	}else{
		ls = [];
		ls.push({
	        "strTcUserDomainCode": sdk.sie.strUserDomainCode,
	        "strTcUserID": sdk.opts.loginName,
	        "strTcUserName": sdk.opts.userName,
	        "nPriority": 1,
	        "nEnforce":0
   	 	});
	}
	_this.opt.tChannelInfo.lstTrunkChannelUser = ls;
	
};

//判断自己是采集还是使用ipc
HY_TChannel.prototype.starCapture= function(func){
	try{
		var _this = this;
		var sdk = this.hySdk;
		//var device = sdk.getUserUseIPC();
		var key = sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName;
	  //使用的是usb
		var video = _this.userInfo[key].video;
		var p = {
			media:{data: true,video:false,audio:true},
	        videoNode: video,
	        videoParam:{videoControl:{setBitFlag: true,setAudioFlag: true}},
	        success:function(res){
	        	_this.hySdk.log("HY_TChannel.prototype.starCapture:::",res);
	        	func&&func(res)
	        }
	    };
		_this.channelMap = sdk.startCapture(p);
	   
	}catch(e){console.error("HY_TChannel.prototype.starCapture:::"+e);}
};


//创建集群对讲
HY_TChannel.prototype.createReq = function(){
	var _this = this;
	var sdk = this.hySdk;
	sdk.createTrunkChannelReq(this.opt.tChannelInfo, function(json){
		 _this.startCallback(json);
		if(sdk.callTC && json.nResultCode === 0){
			sdk.callTC.strTrunkChannelDomainCode = json.strTrunkChannelDomainCode;
			sdk.callTC.nTrunkChannelID = json.nTrunkChannelID;
			//sdk.callMt.opt.meetingInfo = json;
	        var newInfo = sdk.callTC.opt.tChannelInfo;
	        Object.assign(newInfo, json);
	        sdk.callTC.opt.tChannelInfo =  newInfo;
	        
	       _this.starCapture(function(sres){
				if(sres.code ==0){
					var sendP = {removeAudio: true}
				 	_this.channelMap.devOperateFun(sendP);
					_this.joinReq();
				}else{
					 bootbox.alert("采集失败！");
				}
			});
        	
		}
	      
	});
};
//初始化集群人员面板
HY_TChannel.prototype.initUserPanel = function(){
	var _this = this;
	_this.ctr = new HY_TChannel_CTR(_this);
	_this.ctr.draw();
};

HY_TChannel.prototype.initPlay = function(){
	var _this = this;
	var opt = _this.opt;
	var lstTrunkChannelUser = opt.tChannelInfo.lstTrunkChannelUser
	var pla = {				
       // layout:"Meet" + lstMeetingUserInfo.length,
        layout:lstTrunkChannelUser.length,
        pnode:opt.pnode
	};
	this.tChannelPlayer = this.hySdk.getPlayer(pla);
	var players = this.tChannelPlayer.players;
	this.userInfo = {};
	for(var i = 0; i<lstTrunkChannelUser.length;i++){
		(function(ii){
			var user = lstTrunkChannelUser[ii];
			_this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID] = {"video": players[ii],info: user}
		})(i);
	}
}

HY_TChannel.prototype.joinReq = function(nPriority){
	var _this = this;
	this.hySdk.joinTrunkChannelReq({
		"strTrunkChannelDomainCode":this.opt.tChannelInfo.strTrunkChannelDomainCode,
		"nTrunkChannelID": this.opt.tChannelInfo.nTrunkChannelID,
		"nPriority":nPriority?nPriority:0
	}, function(res){
		if(res.nResultCode == 0){
			var key = sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName;
			_this.ctr.selfMe({key:key});
		}
	});
}
HY_TChannel.prototype.leaveReq = function(func){
	var _this = this;
	this.hySdk.leaveTrunkChannelReq({
		"strTrunkChannelDomainCode":this.opt.tChannelInfo.strTrunkChannelDomainCode,
		"nTrunkChannelID": this.opt.tChannelInfo.nTrunkChannelID
	}, function(res){
		if(res.nResultCode == 0){
			func&& func();
			_this.leaveAction();
			/*HY_MEETING.prototype.stopVideo({type:"all",obj:_this});
			var key = _this.nTrunkChannelID+"_"+_this.strTrunkChannelDomainCode;
			var tChannel = _this.hySdk.calledTC[key];
			if(tChannel){
				delete _this.hySdk.calledTC[key];
			}
			_this.quitTChannelAction();*/
		}else{
			console.error("退出失败：："+JSON.stringify(res));
		}
	});
};

HY_TChannel.prototype.leaveAction = function(){
	var _this = this;
	HY_MEETING.prototype.stopVideo({type:"all",obj:_this});
	if(_this.hySdk.callTC){
		_this.hySdk.callTC  = null;
	}
	var key = _this.nTrunkChannelID+"_"+_this.strTrunkChannelDomainCode;
	var tChannel = _this.hySdk.calledTC[key];
	//被叫
	if(tChannel && tChannel.incomingDialog){
		clearTimeout(tChannel.callTimeOutTimer);
		tChannel.incomingDialog.modal('hide');
		tChannel.incomingDialog = null;
	}
	if(tChannel){
		delete _this.hySdk.calledTC[key];
	}
	
	_this.nowTChannel = null;
	_this.quitTChannelAction();
};

HY_TChannel.prototype.quitTChannelAction = function(){
};

HY_TChannel.prototype.deleteReq = function(){
	var _this = this;
	this.hySdk.deleteTrunkChannelReq({
		"strTrunkChannelDomainCode":this.opt.tChannelInfo.strTrunkChannelDomainCode,
		"nTrunkChannelID": this.opt.tChannelInfo.nTrunkChannelID
	}, function(res){
		if(res.nResultCode == 0){
			_this.leaveAction();
		}else{
			console.error("集群删除失败：："+JSON.stringify(res));
		}
	});

};

HY_TChannel.prototype.notifyCallStatusInfo = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("HY_TChannel.prototype.notifyCallStatusInfo 11111",json);
	if(!_this.userInfo && json.nChangeType !=2){
		console.error("_this.userInfo::::",_this.userInfo);
		return;
	}
	if(json.nChangeType !=2){
		if(json.lstTrunkChannelUser){
			forEachX(json.lstTrunkChannelUser, function(user){
				var uu = _this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID];
				if(uu){
					var userInfo = uu.info;
					$.extend(userInfo, user);
					_this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID].info = userInfo;
				}
				if(uu){
					if(!(uu.info.strTcUserDomainCode == sdk.sie.strUserDomainCode && uu.info.strTcUserID == sdk.opts.loginName)){//更新其他人的状态
				     // console.error("==="+ uu.info.strTcUserID+"||"+user.nUserStatus);
				     clearTimeout(uu.inviteTimer);
				     if(user.nUserStatus == 0){//未进频道
				     	uu.status = -1;
						_this.ctr.updateStatus(uu);
				     }
				     else if(user.nUserStatus == 1){
				      //	console.error("===1");
				      	uu.status = 1;
						_this.ctr.updateStatus(uu);
				      }else if(user.nUserStatus == 2){
				      	//console.error("===2");
				      	_this.getUserUrlReq({
							"domainCode": uu.info.strTcUserDomainCode,
							"strUserTokenID":uu.info.strTcUserTokenID,
							'strUserID': uu.info.strTcUserID
						});
				      	uu.status = 2;
						_this.ctr.updateStatus(uu);
				      }else if(user.nUserStatus == 3){
				      }
						
					}else{
					}
				}else{
					_this.addUser(user);
					var uu1 = _this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID];
					uu1.status = 1;
					_this.ctr.updateStatus(uu1);
				}
			});
		}
	}else{
		_this.leaveAction();
		bootbox.alert("集群对讲已结束");
	}
};

HY_TChannel.prototype.notifyCalledStatusInfo = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("HY_TChannel.prototype.notifyCalledStatusInfo 11111",json);
	_this.notifyCallStatusInfo(json);
};

HY_TChannel.prototype.kitOutUserAction = function(user){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.kitOurUserAction:::"+JSON.stringify(user));
	var  list = [];
	list.push({
		strTcUserDomainCode:user.strTcUserDomainCode,
		strTcUserID:user.strTcUserID
	});
	var p = {
		strTrunkChannelDomainCode:_this.strTrunkChannelDomainCode,
		nTrunkChannelID:_this.nTrunkChannelID,
		lstTrunkChannelUser: list
	}
	this.hySdk.kickoutTrunkChannelReq(p, function(json){
		_this.kickUserRsp(json, user);
	});
};

HY_TChannel.prototype.kickUserRsp = function(json,user){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.kickUserRsp:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userobj = _this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID];
		 userobj.status = 0;
      	 _this.ctr.updateStatus(userobj);
      	 
		HY_MEETING.prototype.stopVideo({
			domainCode:user.strTcUserDomainCode,
			strUserID: user.strTcUserID,
			obj:_this
		});
	}
}


HY_TChannel.prototype.inviteNewUser = function(user){
	var _this = this;
	_this.addUser(user);
	_this.inviteUserAction(user);
};


//邀请人员
HY_TChannel.prototype.inviteUserAction = function(user){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.inviteUserAction:::"+JSON.stringify(user));
	var userObj = _this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID];
	user =  userObj.info;
	var  list = [];
	list.push({
			"strTcUserDomainCode" : user.strTcUserDomainCode,
			"strTcUserID" : user.strTcUserID,
			"strTcUserName" : user.strTcUserName,
			"nPriority" : user.nPriority ?user.nPriority: 0,
			"nEnforce" : user.nEnforce ?user.nEnforce: 0
		});
	var p = {
		strTrunkChannelDomainCode: _this.strTrunkChannelDomainCode,
		nTrunkChannelID:_this.nTrunkChannelID,
		lstTrunkChannelUser:list
	}
	
	this.hySdk.inviteUserTrunkChannelReq(p, function(json){
		_this.inviteUserRsp(json, user);
	});
};

//邀请人员响应
HY_TChannel.prototype.inviteUserRsp = function(json, user){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.inviteUserRsp:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userobj = _this.userInfo[user.strTcUserDomainCode+"_"+user.strTcUserID];
		clearTimeout(userobj.inviteTimer);
		userobj.inviteTimer = setTimeout(function(){
			 userobj.status = 0;
      	 	_this.ctr.updateStatus(userobj);
		},10000)
		 userobj.status = -1;
      	 _this.ctr.updateStatus(userobj);
	}
};

//通知用户被踢
HY_TChannel.prototype.notifyUserKick= function(json){
	var _this = this;
	bootbox.alert("您已被踢出");
	_this.hySdk.log("HY_TChannel.prototype.notifyUserKick:::"+JSON.stringify(json));
	_this.leaveAction();
}

//抢占集群话权
HY_TChannel.prototype.getSpeakRightReq= function(func){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.inviteUserRsp:::",_this);
	_this.hySdk.getSpeakRightReq({	
		strTrunkChannelDomainCode: _this.strTrunkChannelDomainCode,
		nTrunkChannelID:_this.nTrunkChannelID
		},function(res){
			func&& func(res);
	});
}


//开始发言
HY_TChannel.prototype.startSpeakReq= function(func){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.startSpeakReq:::",_this);
	_this.hySdk.startTrunkChannelSpeakReq({	
		strTrunkChannelDomainCode: _this.strTrunkChannelDomainCode,
		nTrunkChannelID:_this.nTrunkChannelID
		},function(res){
			func&& func(res);
	});
}

//结束发言
HY_TChannel.prototype.stopSpeakReq= function(func){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.stopSpeakReq:::",_this);
	_this.hySdk.stopTrunkChannelSpeakReq({	
		strTrunkChannelDomainCode: _this.strTrunkChannelDomainCode,
		nTrunkChannelID:_this.nTrunkChannelID
		},function(res){
			func&& func(res);
	});
}

HY_TChannel.prototype.startSpeakAction = function(func){
	var _this = this;
	var sdk = _this.hySdk;
	_this.getSpeakRightReq(function(res){
		if(res.nResultCode == 0){
			var sendP = {addAudio: true}
	 		_this.channelMap.devOperateFun(sendP);
			_this.startSpeakReq(function(spres){
				if(spres.nResultCode == 0){
					_this.speakTimer = setTimeout(function(){
						sendP = {removeAudio: true}
	 					_this.channelMap.devOperateFun(sendP);
	 					func&&func(spres);
					}, _this.opt.tChannelInfo.nSpeakTimeout? _this.opt.tChannelInfo.nSpeakTimeout*1000:60000);
				}
				func&&func(spres);
			});
		}
	});
}


HY_TChannel.prototype.stopSpeakAction = function(func){
	var _this = this;
	clearTimeout(_this.speakTimer)
	var sendP = {removeAudio: true};
	_this.channelMap.devOperateFun(sendP);
	_this.stopSpeakReq(function(res){
		if(res.nResultCode == 0){
		}
		func&&func(res);
	});
}


//录像控制
HY_TChannel.prototype.recordControl= function(opt,func){
	var _this = this;
	_this.hySdk.log("HY_TChannel.prototype.recordControl:::",_this);
	_this.hySdk.trunkChannelRecordControlReq({	
		strTrunkChannelDomainCode: _this.strTrunkChannelDomainCode,
		nTrunkChannelID:_this.nTrunkChannelID,
		nRecordStatus:opt.nRecordStatus
	},function(res){
		func&& func(res);
	});
}

//获取用户的url
HY_TChannel.prototype.getUserUrlReq = function(opt){
	var _this = this;
	var sdk = this.hySdk;
	if(opt.obj){
		
	}
    //sdk.log("!!!!!!!!!!", opt);
    if(opt.domainCode && opt.strUserID){
    	var uu = _this.userInfo[opt.domainCode+"_"+opt.strUserID];
    	if(uu.video){
	    	if(uu.video.isplay == true){
	    		return;
	    	}else{
	    		uu.video.isplay = true;
	    	}
    	}
    }
   
    if(opt.nDevType == 3){//设备
    	 var devL = opt.strUserID.split("-");	
    	 var oo = {
            strDomainCode: devL[0],
            strDeviceCode: devL[1],
            strChannelCode: devL[2],
            strStreamCode: devL[3]
        };
        _this.hySdk.getDeviceUrlReq(oo,function(urlRes) {
        	var json = {dynamicUrl: urlRes.strDynamicUrl};
        	Object.assign(json, urlRes);
        	_this.getUserUrlRspByRtc(json,opt);
        });
    }else{
    	var opt1 = {
	        strDomainCode: opt.domainCode,
	        "listUser": [{"strUserID": opt.strUserID}]
	    };
		_this.hySdk.queryUserListReq(opt1,function(res) {
	        if(res.listUser){
		        var opt11 = {strUserTokenID: res.listUser[0].strUserTokenID,domainCode: opt.domainCode};
		        _this.hySdk.getMobileDynamicUrlReq(opt11, function(json) {
		        	_this.getUserUrlRspByRtc(json,opt);
		        });
	        }
	    });
    }
};


//获取用户url的响应
HY_TChannel.prototype.getUserUrlRspByRtc = function(json,user){
	var _this = this;
	var sdk = this.hySdk;
	var video ='';		
	//console.error("获取用户url的响应  getUserUrlRspByRtc:::", user,json);
	var userInfo = _this.userInfo[sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName];
	if(!(user.domainCode && user.strUserID)){
		video = userInfo.video
	}else{
		userInfo = _this.userInfo[user.domainCode+"_"+user.strUserID];
		video = userInfo.video;
	}
	if(json.nResultCode == 0){
		video.close();
		var map =  sdk.playRtc({
			videoNode: video,
			playUrl:json.dynamicUrl,
			videoParam:{palyParam:{title:userInfo.info.strUserName, user: userInfo.info},videoControl:{curresFlag:true,bitrateFlag:true}}
		});
	}else{
		video.isplay = false;
	}
};

//新增邀请人员
HY_TChannel.prototype.addUser = function(user){
	var _this = this;
	var key = user.strTcUserDomainCode+"_"+user.strTcUserID;
	if(!_this.userInfo[key]){
		var video = _this.tChannelPlayer.addLayout();
		var info  = {"video": video,info: user};
		_this.userInfo[key] = info;
		_this.ctr.initUserRow(info);
		
	}else{
		_this.hySdk.log("HY_TChannel.prototype.addUser 用户已在列表中：：：",JSON.stringify(user));
	}
};




/*********************************** HY_TChannel_CTR ********************************************/
function HY_TChannel_CTR(opts)
{
	this.tChannel = opts;
}
HY_TChannel_CTR.prototype.draw = function()
{
	var _this = this;
	var userPanel = document.getElementById(_this.tChannel.opt.userPanel);
	userPanel.innerHtml='';
	var userListP = document.createElement('div');
	_this.userListP = userListP;
	userPanel.appendChild(_this.userListP);
	for(var key in _this.tChannel.userInfo){
		(function(user){
			_this.initUserRow(user);
		})(_this.tChannel.userInfo[key]);
	}
}
//初始化每一个人员
HY_TChannel_CTR.prototype.initUserRow = function(user){
	var _this = this;
	var info = user.info;
	var row =document.createElement("li");
	var img = document.createElement('img');
	if(info.imgUrl){
		img.src = info.imgUrl;
	}else{
		img.src = 'data:image/png;base64,'+imgMap["record"];
	}
	var nameS = document.createElement('span');
	img.style.width="20px";
	img.style.height="20px";
	img.style.marginRight="5px";
	
	nameS.innerHTML= substringByPoint(info.strTcUserName, 6);
	nameS.title = info.strUserName;
	//row.appendChild(img);
	row.appendChild(nameS);
	_this.userListP.appendChild(row);
	_this.tChannel.userInfo[info.strTcUserDomainCode+"_"+info.strTcUserID]["li"] =row;
	
	var hostBtnList = [
	{"name": "呼叫中","funcName":'',"id": 'callStatus',"display": 'none'},
	{"name": "请出","funcName":'kitOutUserAction',"id": 'kitOutBtn',"display": 'none'},
	{"name": "邀请","funcName":'inviteUserAction',"id": 'inviteBtn',"display": 'none'},
	{"name": "发言中","funcName":'',"id": 'speakLabel',"display": 'none'},
	{"name": "自己","funcName":'',"id": 'hostLabel',"display": 'none'}
	];
	for(var i=0;i<hostBtnList.length;i++){
		(function(i){
			var btnInfo = hostBtnList[i];
			var btn = document.createElement('a');
			
			if(btnInfo.type && btnInfo.type == 'tip'){
				btn= document.createElement('span');
			}
			btn.style.display = btnInfo.display;
			btn.innerHTML = btnInfo.name;
			btn.style.marginLeft = '10px';
			btn.style.float = 'right';
			btn.onclick = function(){
				btnInfo.funcName && _this.tChannel[btnInfo.funcName](info);
			}
			row.appendChild(btn);
			_this.tChannel.userInfo[info.strTcUserDomainCode+"_"+info.strTcUserID][btnInfo.id] =btn; 
		})(i);
	}
};


HY_TChannel_CTR.prototype.host = function(opp)
{
	var _this = this;
	var u = _this.tChannel.userInfo[opp.key];
	_this.hideAll(u);
	_this.show(u.hostLabel);
}

HY_TChannel_CTR.prototype.selfMe = function(opp)
{
	var _this = this;
	var u = _this.tChannel.userInfo[opp.key];
	_this.hideAll(u);
	u.hostLabel.innerHTML='自己';
	_this.show(u.hostLabel);
}


HY_TChannel_CTR.prototype.show = function(ele)
{
	ele.style.display = "block";
}
HY_TChannel_CTR.prototype.hide = function(ele)
{
	ele.style.display = "none";
}

HY_TChannel_CTR.prototype.hideAll = function(u)
{
	var _this = this;
	_this.hide(u.hostLabel);
	_this.hide(u.callStatus);
	_this.hide(u.kitOutBtn);
	_this.hide(u.speakLabel);
	_this.hide(u.inviteBtn);
}

HY_TChannel_CTR.prototype.updateStatus = function(user)
{
	var _this = this;
	//console.error("updateStatus:::"+user.info.strTcUserID+"||"+user.status);
	if(user.isHost === true)
	{
		//_this.hideAll(user);
		_this.show(user.hostLabel);
		
	}else
	{
		_this.tChannel.hySdk.log(user.status);
		switch(user.status)
		{
			case -1://未进入频道
				_this.hideAll(user);
				//_this.show(user.callStatus);
			 	break;
			 case 0://未进入的可以请出
				_this.hideAll(user);
				_this.show(user.inviteBtn);
			 	break;
			 case 1://踢出后可以邀请
			 	_this.hideAll(user);
				_this.show(user.kitOutBtn);
			 	break;
			 case 2://主持人，用户未加入会议
				_this.hideAll(user);
				_this.show(user.kitOutBtn);
				_this.show(user.speakLabel);
			 	break;
			 case 3://主持人，用户未禁言
			 	_this.hide(user.inviteBtn);
				_this.show(user.kitOutBtn);
			 	break;
		}
	}
	
}

/*********************************** hycanvas ********************************************/
function HYCanvas(opts){
	this.opts = opts;
};

HYCanvas.prototype.initControlPanel = function(param){
	var _this = this;
	var canvasId = this.opts.canvasId;
	var hycanvas = document.getElementById(canvasId);
	hycanvas.width = this.opts.width;
	hycanvas.height = this.opts.height;
	hycanvas.style.cursor="pointer";
	var ctx = hycanvas.getContext('2d');
	_this.hycanvas = hycanvas;
	_this.ctx = ctx;
	_this.pathObj = {};
	_this.pathListObj = {};
	var controlP =  {
  		circle:{
  			x:hycanvas.width/2,
	    	y:hycanvas.height/2,
		    border:{
    			color:"#ccc" ,
    			width: 1
    		},
    		radius: 50,
    		outCircleRadius: 80,
    		outCircleWidth: 25,
    		outStrokeStyle:'green'
  		},
  		triangles:{
  			border:{
    			color:"#ccc" ,
    			width: 0
    		},
    		fillColor: "red",
    		sideLen: 20
  		},
  		space: 10
  	}
	
  	if(param){
    	Object.assign(controlP, param);
    }
    
    _this.controlParam = controlP;
//    _this.drawOutCircle();
    _this.drawTriangles();
    _this.drawCenterCircle();
    
    hycanvas.addEventListener('click', function (e) {
    	try{
	    	const canvasInfo = hycanvas.getBoundingClientRect();
	    	if(!(JSON.stringify(_this.pathObj) == "{}")){//支持path2d
		    	for(var key in _this.pathObj){
		    		if(_this.ctx.isPointInPath( _this.pathObj[key], e.clientX-canvasInfo.left, e.clientY- canvasInfo.top)){
			   			_this.changeDeviceDirection(key);
			   		}
		    	}
	    	}else{//不支持path2d
    			 _this.ctx.clearRect(0, 0, _this.opts.width, _this.opts.height);
	    		for(var key in _this.pathListObj){
	    			_this.pathListObj[key]();
	    			if(_this.ctx.isPointInPath( _this.pathObj[key], e.clientX-canvasInfo.left, e.clientY- canvasInfo.top)){
	    				if(!(key == "stop"||key == "outside")){
	    					_this.changeDeviceDirection(key);
	    				}
	    			}
	    		}
	    	}
  	
    	}catch(e){console.log("hycanvas::"+e)}
    });
  	hycanvas.addEventListener('mouseup', function (e) {
   		_this.opts.sdk.PTZControlReq({
			serviceUrl:{
				strDomainCode:activeHyVideo.palyParam.strDomainCode,
				strDeviceCode:activeHyVideo.palyParam.strDeviceCode,
				strChannelCode:activeHyVideo.palyParam.strChannelCode,
				strStreamCode:activeHyVideo.palyParam.strStreamCode
			},
			nCommand:0,
			nStop:1
		},function(){
			
		});
  	});
};

//画外侧的圆
HYCanvas.prototype.drawOutCircle = function(){
	var _this = this;
	var controlP = _this.controlParam;
	var f = function(){
		_this.ctx.beginPath();
	    _this.ctx.lineWidth=controlP.circle.outCircleWidth;
		_this.ctx.strokeStyle=controlP.circle.outStrokeStyle;
		_this.ctx.arc(controlP.circle.x, controlP.circle.y, controlP.circle.outCircleRadius,0,Math.PI * 2,true);
		_this.ctx.stroke();
		//封闭新路径
		_this.ctx.closePath();
	}
	_this.pathListObj.outside =  f;
};

//画走周边的三角形
HYCanvas.prototype.drawTriangles = function(){
	var _this = this;
	var controlP = _this.controlParam;
	var sideLen = controlP.triangles.sideLen;
	var triangHigh = sideLen*Math.cos(Math.PI/6);
	 _this.ctx.lineWidth=1;
	 var iRelateDirection = {
	 	0:3,1:5,2:1,3:7,4:4,
	 	5:8,6:2,7:6
	 }

    for(var i = 0; i<8;i++){
		var tx = controlP.circle.x - (controlP.circle.radius+triangHigh+controlP.space)*Math.cos(i*Math.PI/4);
		var ty = controlP.circle.y - (controlP.circle.radius+triangHigh+controlP.space)*Math.sin(i*Math.PI/4);
		if(i%4==0){//在x轴上
			var lx = tx - triangHigh;
	    	var ly = ty - Math.sin(Math.PI/6)*sideLen;
	    	var rx = tx - triangHigh;
	    	var ry = ty + Math.sin(Math.PI/6)*sideLen;
			if(i==0){
				var lx = tx + triangHigh;
				var rx = tx + triangHigh;
			}
			
		}else if(i%4==2){//在y轴上
			var lx = tx - Math.sin(Math.PI/6)*sideLen;
	    	var ly = ty - triangHigh;
	    	var rx = tx + Math.sin(Math.PI/6)*sideLen;
	    	var ry = ty - triangHigh;
	    	if(i==2){
	    		var ly = ty + triangHigh;
	    		var ry = ty + triangHigh;
	    	}
		}else if(i>4){//在y轴下侧
			
			var lx = tx - Math.sin(Math.PI/12)*sideLen;
	    	var ly = ty - Math.cos(Math.PI/12)*sideLen;
	    	var rx = tx - Math.cos(Math.PI/12)*sideLen;
	    	var ry = ty - Math.sin(Math.PI/12)*sideLen;
	    	if(i==7){
				var lx = tx + Math.sin(Math.PI/12)*sideLen;
		    	var ly = ty - Math.cos(Math.PI/12)*sideLen;
		    	var rx = tx + Math.cos(Math.PI/12)*sideLen;
		    	var ry = ty - Math.sin(Math.PI/12)*sideLen;
			}
		}else{
			var lx = tx - Math.sin(Math.PI/12)*sideLen;
	    	var ly = ty + Math.cos(Math.PI/12)*sideLen;
	    	var rx = tx - Math.cos(Math.PI/12)*sideLen;
	    	var ry = ty + Math.sin(Math.PI/12)*sideLen;
	    	if(i==1){
				var lx = tx + Math.sin(Math.PI/12)*sideLen;
		    	var ly = ty + Math.cos(Math.PI/12)*sideLen;
		    	var rx = tx + Math.cos(Math.PI/12)*sideLen;
		    	var ry = ty + Math.sin(Math.PI/12)*sideLen;
			}
		}
		
    	try{
    		var path = new Path2D();
    		_this.ctx.strokeStyle = controlP.triangles.border.color;
		    _this.ctx.lineWidth = controlP.triangles.border.width;
		     _this.ctx.fillStyle = controlP.triangles.fillColor;
    		path.moveTo(tx, ty);
		    path.lineTo(lx, ly);
		    path.lineTo(rx, ry);
		    path.closePath();
		    _this.ctx.stroke(path);
		    _this.pathObj[iRelateDirection[i]] = path;
    	}catch(e){
    		console.log("drawTriangles 不支持Path2D"+e);
    		var f = function(){
    			_this.ctx.beginPath();
				_this.ctx.strokeStyle = controlP.triangles.border.color;
			    _this.ctx.lineWidth = controlP.triangles.border.width;
			    _this.ctx.moveTo(tx, ty);
			    _this.ctx.lineTo(lx, ly);
			    _this.ctx.lineTo(rx, ry);
			    _this.ctx.fillStyle = controlP.triangles.fillColor;
			    _this.ctx.closePath();
			    _this.ctx.stroke();
    		};
    		f();
		    _this.pathListObj[iRelateDirection[i]] = f;
    	}
    	
    }
};

 //画走周边的三角形
HYCanvas.prototype.drawCenterCircle= function(){
 	var _this = this;
	var controlP = _this.controlParam;
 	//中心圆
	try{
		var path = new Path2D();
		_this.ctx.strokeStyle = controlP.circle.border.color;
	    _this.ctx.lineWidth = controlP.circle.border.width;
	    path.arc(controlP.circle.x, controlP.circle.y, controlP.circle.radius, 0, Math.PI * 2, true); // 绘制
	  	path.closePath();
	    _this.ctx.stroke(path);
	}catch(e){
		console.log("centerCircle 不支持Path2D"+e);
		var f = function(){
			_this.ctx.beginPath();
		    _this.ctx.strokeStyle = controlP.circle.border.color;
		    _this.ctx.lineWidth = controlP.circle.border.width;;
		    _this.ctx.arc(controlP.circle.x, controlP.circle.y, controlP.circle.radius, 0, Math.PI * 2, true); // 绘制
		    _this.ctx.stroke();
		    _this.ctx.closePath();
		}
	     _this.pathListObj.stop = f;
	}
 };
 
 HYCanvas.prototype.changeDeviceDirection = function(key){
 	var _this = this;
 	_this.opts.sdk.PTZControlReq({
		serviceUrl:{
			strDomainCode:activeHyVideo.palyParam.strDomainCode,
			strDeviceCode:activeHyVideo.palyParam.strDeviceCode,
			strChannelCode:activeHyVideo.palyParam.strChannelCode,
			strStreamCode:activeHyVideo.palyParam.strStreamCode
		},
		nCommand:key*1,
		nStop:0
	},function(msg){
		console.error("!!!!!changeDeviceDirection!!!"+JSON.stringify(msg));
	});
 }
 
 
 /*********************************** hyWebRtc ********************************************/
 function hyWebRtc(opts)
 {
 	this.opts = opts;
 	this.hySdk = opts.hySdk;
 	this.server = opts.server;
	this.janus = null;
	this.hyWebRtc = null;
	//this.opaqueId = "hyWebRtc-"+Janus.randomString(12);
	this.bitrateTimer = null;
	this.spinner = null;
	this.audioenabled = false;
	this.videoenabled = false;	
	this.simulcastStarted = false;
	this.logLevel = false;
	this.captureType = "usb";
	//this.janusStatus = false;
	if(this.hySdk && this.hySdk.opts.log && this.hySdk.opts.log === true)
	{
		this.logLevel = "all";
	}
	if(opts.iceServers)
	{
		this.iceServers= opts.iceServers;
	}else
	{
		this.iceServers = [{urls: "stun:stun.l.google.com:19302"}];
	}
 }
 hyWebRtc.prototype.init = function()
 {
 	var _this = this;
	Janus.init({debug: _this.logLevel, callback: function(){
			_this.janus = new Janus({
							server: _this.server,
							iceServers:_this.iceServers,
							success: function() {
								_this.hySdk.log(" 初始化Janus成功 : " + _this.isConnected());
							},
							error: function(error) {
								_this.hySdk.log(" 初始化Janus失败: " + _this.isConnected());
								setTimeout(function(){
									_this.init();
								}, 5000);
								
								//Janus.error(error);
							},
							destroyed: function() {
							}
						});
	}});
 }
hyWebRtc.prototype.isConnected = function()
 {
 	return this.janus.isConnected();
 };
 
hyWebRtc.prototype.resetMedia = function(opts,media1,type){
 	var _this = this;
 	var srcmedia = JSON.parse(JSON.stringify(media1));
 	//console.error("!!!!!!!!!!",JSON.stringify(srcmedia));
 	if(opts.videoNode&&opts.videoNode.videoSwitch == false){
		media1.removeVideo =  true;
	}
	
	if(opts.videoNode&& opts.videoNode.audioSwitch == false){
		media1.removeAudio =  true;
	}
	
	if(opts.videoNode&& opts.videoNode.curresValue){
		if(media1.video){
			media1.video.width = opts.videoNode.curresValue.width;
			media1.video.height = opts.videoNode.curresValue.height;
		}else{
			media1.video = {
				width:opts.videoNode.curresValue.width,
				height: opts.videoNode.curresValue.height
			}
		}
	}
	
	var device = _this.hySdk.getUserUseIPC();
	var selectUsb = device && device.usb ?device.usb: ""; 
	if(selectUsb ){
		if(selectUsb.video && selectUsb.video.deviceId){
			if(media1.video){
				media1.video.deviceId = selectUsb.video.deviceId;
			}else{
				media1.video = selectUsb.video
			}
		}
		
		if(selectUsb.audio && selectUsb.audio.deviceId){
			if(media1.audio){
				media1.audio.deviceId = selectUsb.audio.deviceId;
			}else{
				media1.audio = selectUsb.audio
			}
		}
	}
	
	if(srcmedia.video == false){
		media1.video = false;
	}
	return media1;
 };
 
 hyWebRtc.prototype.startCapture = function(opts)
 {
 	var _this = this;
 	//opts.videoNode.close();//每次采集先关闭
 	var map = {
 	   opaqueId : "hyWebRtc-"+Janus.randomString(12),
 	   pluginHandle:{},
 	   publishFlag:false,
 	   send :function(body)
 	   {
 	   	  _this.hySdk.log("hyWebRtc.prototype.startCapture send message to janus opaqueId : " +map.opaqueId, body);
 	   	  map.pluginHandle.send(body)
 	   },
 	   setBit: function(bit){
 	   		var body = { request: "bitrate", uuid: _this.hySdk.sie.strUserTokenID,bitrate:bit};
	   		map.send({ message: body });
 	   },
 	   devOperateFun: function(media1,type){
 	   		var newMedia = _this.resetMedia(opts,media1,type);
	   		 if( opts.videoNode.videoControl && opts.videoNode.videoControl.setVideoFlag==false){
		   		newMedia.video = false;
		   		delete newMedia.replaceVideo;
		    }
		   _this.hySdk.log("devOperateFun media:::"+JSON.stringify(newMedia))
   		 	var p = {
		        media:newMedia,
		        success: function(jsep) {
		        	//console.error("!!!!!"+JSON.stringify(newMedia));
		           // map.send({meschangeDevicesage: {audio: true, video: true}, "jsep": jsep});
		            if(type && type=="changeDev" && map.publishFlag == false){//采集未成功时，切换设备需推送码流
		            	var body = { request: "publish", "capture_type": map.capture_type ,uuid: _this.hySdk.sie.strUserTokenID,"server_ip":_this.hySdk.opts.svrIp,"stream_type":2};
						map.send({ message: body, jsep: jsep });
		            }
		        },
		        error: function(error) {
		           console.error("WebRTC switchDevFun error... " + JSON.stringify(error));
		        }
		     }
 	   	  map.pluginHandle.createOffer(p);
 	   },
 	   videoNode:opts.videoNode.videoElement,
 	   media:{data: true },
 	   bitrateTimer:null,
 	   simulcast: opts.simulcast== false?false: true,
 	   capture_type: opts.capture_type?opts.capture_type: 1,//1： 摄像机 2：桌面采集
 	   success:opts && opts.success ? opts.success: function(){ _this.hySdk.log("default :");}
 	};
 	if(opts.media)
	{
		map.media = opts.media;
	}
	if(_this.isConnected() != true){
		map.success({"code": 1,"desc": "连接服务器失败"});
		return ;
	}
	_this.janus.attach({
		plugin: "janus.plugin.cmf_agent",
		opaqueId: map.opaqueId,	
		success: function(pluginHandle) {
			map.pluginHandle = pluginHandle;
			var p = 
			{
				media: map.media,	// ... let's negotiate data channels as well
				simulcast: map.simulcast,
				success: function(jsep) {
					_this.hySdk.log("开始采集信令参数：",map.media);
					//var body = { request: "publish", uuid: _this.opts.loginName.,"server_ip":'192.168.2.198',"stream_type":2};
					var body = { request: "publish", "capture_type": map.capture_type ,uuid: _this.hySdk.sie.strUserTokenID,"server_ip":_this.hySdk.opts.svrIp,"stream_type":2};
					 _this.hySdk.log("开始采集信令参数: ", body);
					map.send({ message: body, jsep: jsep });
				},
				error: function(error) {
					 _this.hySdk.log("hyWebRtc.prototype.startCapture createOffer publish error...", error);
				}
			}
			map.pluginHandle.createOffer(p);
		},
		error: function(error) {
			 _this.hySdk.log("hyWebRtc.prototype.startCapture Error attaching plugin...", error);
		},
		consentDialog: function(on) {
			 _this.hySdk.log("hyWebRtc.prototype.startCapture Consent dialog should be " + (on ? "on" : "off") + " now");
			if(on) {
				$.blockUI({
					message: '<div><img src="data:image/png;base64,'+imgMap["up_arrow"] +'"/></div>',
					css: {
						border: 'none',
						padding: '15px',
						backgroundColor: 'transparent',
						color: '#aaa',
						top: '10px',
						left: (navigator.mozGetUserMedia ? '-100px' : '300px')
					} });
			} else {
				// Restore screen
				$.unblockUI();
			}
		},
		iceState: function(state) {
			 _this.hySdk.log("hyWebRtc.prototype.startCapture ICE state changed to " + state);
		},
		mediaState: function(medium, on) {
			 _this.hySdk.log("hyWebRtc.prototype.startCapture Janus mediaState" + (on ? "started" : "stopped") + " receiving our " + medium);
		},
		webrtcState: function(on) {
			 _this.hySdk.log("hyWebRtc.prototype.startCapture Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
		},
		slowLink: function(uplink, lost) {
			 _this.hySdk.log("hyWebRtc.prototype.startCapture Janus reports problems " + (uplink ? "sending" : "receiving") +
				" packets on this PeerConnection (" + lost + " lost packets)");
		},
		onmessage: function(msg, jsep) {
			_this.hySdk.log("hyWebRtc.prototype.startCapture Got a message :::",msg,jsep);
			if(jsep) {
			   if(jsep.type == "answer"){
					map.pluginHandle.handleRemoteJsep({ jsep: jsep });
				}
			}
			try{
				if(msg && msg.event == "StreamInitRsp")
				{
					map.publishFlag = true;
					map.success({"code": msg.result_code,"desc": "采集成功！"});
					if(opts.videoNode.bitValue||opts.videoNode.bitValue==0){
						map.setBit(opts.videoNode.bitValue*1000);
					}
				}
			}catch(e){
			  _this.hySdk.log(e);
			}
		},
		onlocalstream: function(stream) {
			var localVideo = map.videoNode
			Janus.attachMediaStream(localVideo, stream);
			localVideo.muted = "muted";
			opts.videoNode.isplay = true;
			var videocall = map.pluginHandle;
			if(videocall.webrtcStuff.pc.iceConnectionState !== "completed" &&
				videocall.webrtcStuff.pc.iceConnectionState !== "connected") {
			}
			var videoTracks = stream.getVideoTracks();
			if(!videoTracks || videoTracks.length === 0) {
				// No webcam
				opts.videoNode.isplay = false;
				 _this.hySdk.log("hyWebRtc.prototype.startCapture onlocalstream No webcam");
			} else {
			}
	
			map.bitrateTimer = setInterval(function() {
				// Display updated bitrate, if supported
				if(opts.videoNode.videoControl.setCurresFlag){
					var width = localVideo.videoWidth;
					var height = localVideo.videoHeight;
					if(width > 0 && height > 0){
						opts.videoNode.setCurresValue({width:width,height:height});
					}
				}
			}, 1000);
			
		},
		ondataopen: function(data) {
			_this.hySdk.log("hyWebRtc.prototype.startCapture The DataChannel is available!");
		},
		ondata: function(data) {
			_this.hySdk.log("hyWebRtc.prototype.startCapture We got data from the DataChannel!", data);
		},
		oncleanup: function() {
			_this.hySdk.log("hyWebRtc.prototype.startCapture Got a cleanup notification :::");
			if(map.bitrateTimer)
				clearInterval(map.bitrateTimer);
			opts.videoNode.bitrate.style.display = 'none';
			map.bitrateTimer = null;
		}
	});
	return map;
 }
 hyWebRtc.prototype.playAttach = function(opts)
 {
 	
 	var _this = this;
 	opts.videoNode.close();
 	var map = {
 	   opaqueId : "hyWebRtc-"+Janus.randomString(12),
 	   pluginHandle:{},
 	   send :function(body)
 	   {
 	   	  _this.hySdk.log("hyWebRtc.prototype.playAttach send message to janus opaqueId : " +map.opaqueId, body);
 	   	  map.pluginHandle.send(body)
 	   },
 	   videoNode:opts.videoNode.videoElement,
 	   media:{ audioSend: false, videoSend: false, data: true },
 	   success:opts && opts.success ? opts.success: function(){ _this.hySdk.log("default :");},
 	   playUrl: opts.playUrl,
 	   bitrateTimer:null,
 	   playBackControl: function(data){
 	   		var sendp = { request: "mediaonoff"};
 	   		Object.assign(sendp, data);	
 	   		//console.log("!!!!"+JSON.stringify(sendp));
   			map.send({ message: sendp});
 	   },
 	    playbackDefinition: function(data){
 	   		var sendp = { request: "transcode"};
 	   		Object.assign(sendp, data);	
 	   		//console.log("!!!!"+JSON.stringify(sendp));
   			map.send({ message: sendp});
 	   }
 	};
 	if(opts.media)
	{
		map.media = opts.media;
	}
	_this.janus.attach({
		plugin: "janus.plugin.cmf_agent",
		opaqueId: map.opaqueId,	
		success: function(pluginHandle) {
			map.pluginHandle = pluginHandle;
			var body = { request: "play", uuid: _this.hySdk.sie.strUserTokenID,"server_ip":_this.hySdk.opts.svrIp,"url":map.playUrl};
			_this.hySdk.log("hyWebRtc.prototype.playAttach body ",body);
			map.pluginHandle.send({ message: body });
		},
		error: function(error) {
		 	_this.hySdk.log("hyWebRtc.prototype.playAttach Error attaching plugin...", error);
		},
		consentDialog: function(on) {
		},
		iceState: function(state) {
		 	_this.hySdk.log("hyWebRtc.prototype.playAttach ICE state changed to " + state);
		},
		mediaState: function(medium, on) {
		 	_this.hySdk.log("hyWebRtc.prototype.playAttach Janus mediaState" + (on ? "started" : "stopped") + " receiving our " + medium);
		},
		webrtcState: function(on) {
		 	_this.hySdk.log("hyWebRtc.prototype.playAttach Janus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
		},
		slowLink: function(uplink, lost) {
		 	_this.hySdk.log(" hyWebRtc.prototype.playAttach Janus reports problems " + (uplink ? "sending" : "receiving") +
				" packets on this PeerConnection (" + lost + " lost packets)");
		},
		onmessage: function(msg, jsep) {
			if(jsep) {
			    if(jsep.type == "offer"){
					_this.hySdk.log("hyWebRtc.prototype.playAttach Handling SDP as well...", jsep);
					var stereo = (jsep.sdp.indexOf("stereo=1") !== -1);
					// Offer from the plugin, let's answer
					map.pluginHandle.createAnswer({
						jsep: jsep,
						// We want recvonly audio/video and, if negotiated, datachannels
						media: map.media,
						customizeSdp: function(jsep) {
							if(stereo && jsep.sdp.indexOf("stereo=1") == -1) {
								// Make sure that our offer contains stereo too
								jsep.sdp = jsep.sdp.replace("useinbandfec=1", "useinbandfec=1;stereo=1");
							}
						},
						success: function(jsep) {
							_this.hySdk.log("hyWebRtc.prototype.playAttach Got SDP!", jsep);
							var body = { request: "start" ,uuid:_this.hySdk.sie.strUserTokenID};
							map.pluginHandle.send({ message: body, jsep: jsep });
						},
						error: function(error) {
							_this.hySdk.log("hyWebRtc.prototype.playAttach WebRTC error:", error);
						}
					});
				}
			}
		},
		onremotestream: function(stream) {
			_this.hySdk.log(" hyWebRtc.prototype.playAttach Got a remote stream :::", stream);
			var remoteVideo = map.videoNode
			var videocall = map.pluginHandle;
			opts.videoNode.isplay = true;
			var videoTracks = stream.getVideoTracks();
			if(!videoTracks || videoTracks.length === 0) {
				// No remote video
				opts.videoNode.isplay = false;
			} else {
				
			}
			Janus.attachMediaStream(remoteVideo, stream);
			map.bitrateTimer = setInterval(function() {
				// Display updated bitrate, if supported
				var bitrate = videocall.getBitrate();
				if(bitrate != "Invalid PeerConnection" && opts.videoNode.videoControl.bitrateFlag){
					opts.videoNode.bitrate.innerHTML = bitrate;
					opts.videoNode.bitrate.style.display = 'block';
				}
				// Check if the resolution changed too
				var width = remoteVideo.videoWidth;
				var height = remoteVideo.videoHeight;
				if(width > 0 && height > 0 && opts.videoNode.videoControl.curresFlag){
					opts.videoNode.curres.innerHTML =width+'x'+height;
					opts.videoNode.curres.style.display = 'block';
				}
			}, 1000);
		},
		ondataopen: function(data) {
			_this.hySdk.log("hyWebRtc.prototype.playAttach Got a message :::The DataChannel is available!");
		},
		ondata: function(data) {
			_this.hySdk.log("hyWebRtc.prototype.playAttach got data from the DataChannel!", data);
		},
		oncleanup: function() {
			_this.hySdk.log("hyWebRtc.prototype.playAttach Got a cleanup notification :::");
			
			clearInterval(map.bitrateTimer);
			opts.videoNode.bitrate.style.display = 'none';
			map.bitrateTimer = null;
		}
	});
	return map;
 };
 
 function forEachX(list, fun){
 	for(var i = 0;i< list.length;i++){
 		(function(ii){
 			var ele = list[i];
 			fun(ele,ii);
 		})(i);
 	}
 }
 
function substringByPoint (str, length) {
	if(str && str.length>0)
	{
		if(str.length <= length)
			{
			return str;
			}
		else 
			{
			return str.substring(0,length) + "...";
			}
	}
	else return str;
}