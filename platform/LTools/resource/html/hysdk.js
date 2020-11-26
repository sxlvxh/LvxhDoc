var activeHyVideo;
window.onresize = function(ex) {
     if(activeHyVideo)
     {
     	activeHyVideo.checkFullScreen();
     }
};
     
/**
opt.url -- websocket服务器地址  ws://192.168.3.132:8989/ws
opt.loginName -- websocket登录名称  wcc
this.init() -- 初始化方法
this.checkCon() -- 重连状态检测
opt.loginSuccess -- 登录成功方法
opt.log -- 是否打日志,默认false
 **/
function HY_SDK_WS() {
	this.mainPlayerCache = {};//用于缓存所有新建player
	console.log(document.URL);
};
HY_SDK_WS.prototype.setConfig = function (opt) {
	this.opts = opt;	
	this.sie = {};
};

HY_SDK_WS.prototype.init = function (opt) {
	this.destory();
	this.checkCon();
	this.opts = opt;
	this.seqNo = 1;
	this.backFunc = {};
	this.sie = {userStatus:2};		
	this.log("HY_SDK_WS.prototype.init",JSON.stringify(opt));
	if (!"WebSocket" in window) {
		alert("您的浏览器不支持webSocket");
	} else {
		var _this = this;
		_this.log(_this.status);
		_this.t = Math.random();
		_this.ws = new WebSocket(_this.opts.url);
		_this.status = "default";
		_this.ws.binaryType="arraybuffer";		
		_this.ws.onopen = function () {	
			_this.log("链接服务器成功");
			_this.status = "connected";
			_this.loginReq();
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
				_this.log(" -------------- " + seqNo);
				var msgBody = content;
				_this.log(" innerMsgType: "+ innerMsgType  + " msgBody: " + msgBody);
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
			window.console && window.console.log("连接已关闭...");
		};

		_this.ws.onerror = function () {
			_this.status = "error";
		};
	}
};
HY_SDK_WS.prototype.close = function () {
	var _this = this;
	try {
		if (_this.ws) {
			_this.ws.close();
		}
	} catch (e) {
		window.console && window.console.error(e);
	}
};

//供外部使用的关闭
HY_SDK_WS.prototype.destory = function () {
	var _this = this;
	try {
		if (_this.ws) {	
			_this.log("HY_SDK_WS.prototype.destory " ,_this.ws);
			_this.ws.close();
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
			_this.destory();
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
		_this.log(" HY_SDK_WS.prototype.getCommonMsg ",json);
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
        _this.log("HY_SDK_WS.prototype.rollBack",json);
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
			default:
				_this.log(" 未知消息！", json);
		}
	}catch(e){
	  console && console.error(" rollBack ",e,json);
	}
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
						"strMacAddr": _this.opts.mac,
						"strServerIP": _this.opts.svrIp,
						"nServerPort": _this.opts.svrPort,
						"nPriority": 0
			})};
       		_this.log(" HY_SDK_WS.prototype.loginReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" loginReq ",e);
	}
};

HY_SDK_WS.prototype.loginResp = function (json) {
	try{
		var _this = this;		
		_this.log(" ============= "+ (json.nResultCode === 0));
		if(json.nResultCode === 0)
		{
			_this.sie.strUserDomainCode = json.strUserDomainCode;
			_this.sie.strUserDomainName = json.strUserDomainName;
			_this.sie.strUserTokenID = json.strUserTokenID;
			_this.sie.userStatus = 1;
		}
		else if(json.nResultCode === 1720200002)
		{
			
			_this.kickOut(json);//踢人
		}
		_this.log(" HY_SDK_WS.prototype.loginResp HY_SDK_WS : ",_this);
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
						"strMacAddr":_this.opts.mac,
						"nDevType": 4,
						"strKickUserTokenID": msg.strUserTokenID.split(":")[1],
						"strKickReason": ""
			})};
       		_this.log(" HY_SDK_WS.prototype.kickOut ",_this.getCommonMsg(m));	
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
       	_this.log(" HY_SDK_WS.prototype.getDomainReq ",_this.getCommonMsg(m));	
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
       	_this.log(" HY_SDK_WS.prototype.getDomainGroupReq ",_this.getCommonMsg(m));	
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
       	_this.log(" HY_SDK_WS.prototype.getDeviceReq ",_this.getCommonMsg(m));	
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
       	_this.log(" HY_SDK_WS.prototype.getDeviceResp ",_this.getCommonMsg(m));	
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
       	_this.log(" HY_SDK_WS.prototype.getDeviceUrlReq ",_this.getCommonMsg(m));	
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
        _this.queryUserListResp = rollBack;		
		var m = {					
					msgType: 54023,
					msgBody: JSON.stringify({					
							strUserDomainCode :opts.strDomainCode,
							listUser  :opts.listUser

			})};
       	_this.log(" HY_SDK_WS.prototype.queryUserListReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" queryUserListReq ",e);
	}
};
HY_SDK_WS.prototype.queryUserListResp = function (json) {
	this.log(" HY_SDK_WS.prototype.queryUserListResp ", json);
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
       	_this.log(" HY_SDK_WS.prototype.setUseNotifyUrlReq ",_this.getCommonMsg(m));	
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
       	_this.log(" HY_SDK_WS.prototype.setUserFriendReq ",_this.getCommonMsg(m));	
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
					unRecordType:opt.unRecordType ? opt.unRecordType: 1,
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


HY_SDK_WS.prototype.sendHeatbeatReq = function(opts) {
	var _this = this;
	try{	
		var m = {					
					msgType: 54009,
					msgBody: JSON.stringify({						
						strUserTokenID:_this.sie.strUserTokenID
				})};
       	_this.log(" HY_SDK_WS.prototype.sendHeatbeatReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" sendHeatbeatReq ",e);
	}
};
HY_SDK_WS.prototype.sendHeatbeatResp = function (json) {
	this.log(" HY_SDK_WS.prototype.sendHeatbeatResp " , json);
	if(json.nResultCode == 1720200007)
	{
		this.userReConnectReq();
	}
};
HY_SDK_WS.prototype.notifyUserStatus= function (json) {
	this.log(" HY_SDK_WS.prototype.notifyUserStatus " , json);
	this.sie.userStatus = json.nOnline;
	if(json.nOnline == 2)
	{
		this.userReConnectReq();
	}
};

HY_SDK_WS.prototype.notifyKickOut= function (json) {
	this.log(" HY_SDK_WS.prototype.notifyKickOut " , json);
	clearInterval(this.idx);
	this.destoryAllPlay();
	this.close();
	this.opts.notifyKickOut && this.opts.notifyKickOut();
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
       	_this.log(" HY_SDK_WS.prototype.userReConnectReq ",_this.getCommonMsg(m));	
		_this.ws.send(_this.getCommonMsg(m));			
	}catch(e){
	  console && console.error(" userReConnectReq ",e);
	}
};
//设置用户ipc并存储到本地
HY_SDK_WS.prototype.setUserUseIPC = function(opt){
	var _this = this;
	_this.setUserUseIPCReq(opt);
	window.localStorage.setItem('HY_SDK_USER_IPC', JSON.stringify(opt))
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
HY_SDK_WS.prototype.setUserUseIPCReq = function (opt) {
	this.log(" HY_SDK_WS.prototype.setUserUseIPCReq ::" +JSON.stringify(opt));
	var _this = this;
	try{	
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
       	_this.log(" HHY_SDK_WS.prototype.setUserUseIPCReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" setUserUseIPCReq ",e);
	}
};

//设置用户是否使用网络摄像头消息响应
HY_SDK_WS.prototype.setUserUseIPCRsp = function (json) {
	this.log(" HY_SDK_WS.prototype.setUserUseIPCRsp ::" +JSON.stringify(json));
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
       	_this.log(" HHY_SDK_WS.prototype.PTZControlReq ",_this.getCommonMsg(m));	
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
	_this.HYCurrentMeeting.startMeetingRsp(json);
};

//通知被邀请用户参加会议
HY_SDK_WS.prototype.notifyInviteUserJoinMeeting = function (json) {
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyInviteUserJoinMeeting ::" +JSON.stringify(json));
	if(this.HYCurrentMeeting){
		this.HYCurrentMeeting.notifyInviteUserJoinMeeting(json);
	}else{
		var strTrunkPara = JSON.parse(json.strTrunkPara);
		//1：主持人:2：参会人
		_this.HYCurrentMeeting = new HY_MEETING({
			hySdk: _this,
			"pnode":'meetingPlayPanel',
			"userPanel": 'meetingUser',
			lstMeetingUserInfo: strTrunkPara.lstMeetingUserInfo, 
			meetingRole: 2});
		_this.HYCurrentMeeting.notifyInviteUserJoinMeeting(json);
	}
};

//通知被邀请用户参加会议
HY_SDK_WS.prototype.notifyPeerUserMeetingInfo = function (json) {
	this.log(" HY_SDK_WS.prototype.notifyPeerUserMeetingInfo ::" +JSON.stringify(json));
	this.HYCurrentMeeting.notifyPeerUserMeetingInfo(json);
};

//参加会议
HY_SDK_WS.prototype.joinMeetingReq = function (opt) {
	var _this = this;
	try{	
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
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" joinMeetingReq ",e);
	}
};

//参加会议响应
HY_SDK_WS.prototype.joinMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.joinMeetingRsp ::" +JSON.stringify(json));
	_this.HYCurrentMeeting.joinMeetingRsp(json);
};

//获取用户
HY_SDK_WS.prototype.getMobileDynamicUrlReq = function(opt, rollBack){
	var _this = this;
	try{
		_this.seqNo = _this.seqNo + 1;
		_this.backFunc[_this.seqNo] = rollBack;
		var m = {					
				msgType: 4714,
				msgBody: JSON.stringify({
					domainCode:opt.domainCode ? opt.domainCode:_this.sie.strUserDomainCode ,
					tokenID:_this.sie.strUserTokenID,
					strUserTokenID:opt.strUserTokenID ? opt.strUserTokenID: _this.sie.strUserTokenID
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
HY_SDK_WS.prototype.stopMeetingReq = function(opt){
	var _this = this;
	try{	
		var m = {					
				msgType: 54431,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID 
			})};
       	_this.log(" HHY_SDK_WS.prototype.stopMeetingReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" stopMeetingReq ",e);
	}
};

//结束响应
HY_SDK_WS.prototype.stopMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.stopMeetingRsp ::" +JSON.stringify(json));
	_this.HYCurrentMeeting.stopMeetingRsp(json);
};

//退出会议
HY_SDK_WS.prototype.quitMeetingReq = function(opt){
	var _this = this;
	try{	
		var m = {					
				msgType: 54427,
				msgBody: JSON.stringify({
					strUserDomainCode:_this.sie.strUserDomainCode,
					strUserTokenID:_this.sie.strUserTokenID,
					strMeetingDomainCode:opt.strMeetingDomainCode,
					nMeetingID: opt.nMeetingID 
			})};
       	_this.log(" HHY_SDK_WS.prototype.quitMeetingReq ",_this.getCommonMsg(m));	
       	_this.sendMsg(m);
	}catch(e){
	  console && console.error(" quitMeetingReq ",e);
	}
};

//结束响应
HY_SDK_WS.prototype.quitMeetingRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.quitMeetingRsp ::" +JSON.stringify(json));
	_this.HYCurrentMeeting.quitMeetingRsp(json);
};

//通知用户状态
HY_SDK_WS.prototype.notifyMeetingStatusInfo = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyMeetingStatusInfo ::" +JSON.stringify(json));
	if(_this.HYCurrentMeeting){
		_this.HYCurrentMeeting.notifyMeetingStatusInfo(json);
	}else{
		console.log("未找到当前会议");
	
	}
		//delete _this.HYCurrentMeeting;
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

//请出人员响应
HY_SDK_WS.prototype.meetingSpeakSetRsp = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.meetingSpeakSetRsp ::" +JSON.stringify(json));
	if(json.seqNo)
	{
		this.backFunc[json.seqNo](json);
	}
};


//被从会议中请出
HY_SDK_WS.prototype.notifyKickUserMeeting = function(json){
	var _this = this;
	this.log(" HY_SDK_WS.prototype.notifyKickUserMeeting ::" +JSON.stringify(json));
	_this.HYCurrentMeeting.notifyKickUserMeeting(json);
};
/********************************会议操作结束*************************************/

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
	_this.log("发送数据sendBaseMsg： " + msg);
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
				_this.log(" HY_SDK_WS.prototype.checkCon " + _this.ws.readyState);
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
	var mainp = new mainPlayer(opts);
	var ui = uuid();
	mainp.id = ui;
	_this.mainPlayerCache[ui] = mainp;
	return mainp;
};
//多个固定设备同步播放
HY_SDK_WS.prototype.playVideoList = function(opts)
{
	var _this = this;
	var pla = {				
		layout:opts.videolist.length,
		pnode:opts.pnode,
		log:opts.log ? opts.log: false
	};
	var mainPlay = HYSDK.getPlayer(pla);
	
	$.each(opts.videolist,function(i, e){
		//mainPlay.players[i].setTitle({"title": e.name});
		
		var oo = {
		    strDomainCode :e.strDomainCode,
			strDeviceCode  :e.strDeviceCode,
			strChannelCode :e.strChannelCode,
			strStreamCode  :e.strStreamCode
		};
		
		_this.getDeviceUrlReq(oo,function(urlRes){
		     if(urlRes.nResultCode === 0)
			 {		
		 		var pla = {				
			        wsserver: opts.url,
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
		});
	});
	return mainPlay;
};

//停止播放
HY_SDK_WS.prototype.stopPlay = function(mainPlay)
{
	var _this = this;
	if(mainPlay){
		$.each(mainPlay.players, function(i, e){
			e.close();
		});
		delete _this.mainPlayerCache[mainPlay.id];
	}
};

//销毁所有播放器
HY_SDK_WS.prototype.destoryAllPlay = function(mainPlay)
{
	var _this = this;
	//console.log(_this.mainPlayerCache);
	if(_this.mainPlayerCache){
		$.each(_this.mainPlayerCache, function(i, e){
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

HY_SDK_WS.prototype.initUsbList =  function(){
	var _this = this;
	 _this.getUsbList(function(videoArr){
		 if(videoArr.length > 0){
		 	var select = document.getElementById('usb-device');
	        var html = '<option value="">请选择摄像头</option>';
	        for( var i = 0 ; i <videoArr.length; i++){
	          (function(){
	          	 var option = document.createElement('option');
		           option.label = i;
		           option.id = videoArr[i].id;
		           option.onclick = function(){
		           	alert(i)
		           }
		           select.appendChild(option);
	          })(i)
	        }
	    }else{
	        //openMedia(constraints)
	    }
	});
   
};

 function openMedia(constraints){
            //调用用户媒体设备, 访问摄像头
    getUserMedia(constraints, successMedia, errorMedia);
}
 
 function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
                navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
 
            } else if (navigator.webkitGetUserMedia) {
                //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints,success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}


HY_SDK_WS.prototype.getUsbList =  function (func){
	var videoArr = [];
    navigator.mediaDevices.enumerateDevices().then(function(devices) {
    	console.log(devices)
		devices.forEach(function(device) {
			if(device.kind == 'videoinput'){
                videoArr.push({
                    'label': device.label,
                    'id': device.deviceId,
                    type: device.kind,
                    groupId:device.groupId
				})
			}
		});
		func &&func(devices);
    }).catch(function(err) {
		console.log(err.name + ": " + err.message);
	});
}

HY_SDK_WS.prototype.getCanvas = function(opt){
	return new HYCanvas(opt); 
}


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
		this.onUpdateEnd = this.onUpdateEnd.bind(this);
		this.openws();
		this.checkCon();
		this.logflag = true;
		if(opts.log)
		{
			this.logflag = opts.log;
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
        this.log("CONNECTED 连接服务器成功"); 
		var sendurl = {"id":2,"url":this.rtspurl};
		this.doSend(JSON.stringify(sendurl)); 
    };
	
HY_PLAYER_WS.prototype.onClose= function(evt) { 
     this.log("HY_PALAYER_WS.prototype.onClose DISCONNECTED"); 
	this.websocket.close();
} ;
	
HY_PLAYER_WS.prototype.onMessage= function(evt) { 
		if(typeof(evt.data) == "string")            //服务器传过来的可能是字符串，判断是不是
        {
            var str = evt.data;
			this.log(str);
			var json = JSON.parse(str);
			if(json.id == 1)
			{
					var mimestr = json.open;//strs[0];
					this.playurl(mimestr);
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
        this.log('ERROR:'+ evt.data); 
		this.stop();
    } ;
  
HY_PLAYER_WS.prototype.doSend= function(message) { 
        this.log("SENT: " + message);  
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
    
		}else{
			_this.log("Unsupported MIME type or codec: ", + this.supportstr);
		}
	};
	
HY_PLAYER_WS.prototype.onCanPlay= function(){
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
		this.log('stop,服务连接失败停止播放');
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
					    	this.websocket.close();
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
	this.players = [];
	this.opts = opts;
	this.sdk = opts.sdk;
	this.setLayoutModel();
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
	    div.style.backgroundColor  = "#aaa";
	    div.style.position  = "relative";
	    div.style.boxSizing = 'border-box';
	    this.opts.pnode = div;
	    pnode.appendChild(div);
    	this["setLayout"+opts.layout]();
	   
	}else
	{
		hy_error(" parent node is null.");
		return null;
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
	  for(var i= 0;i<6;i++)
	  {
    	  var p1 = {width:"50%",height:"33.33%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout7 = function()
{
	  var _this = this;
	  var p = {width:"75%",height:"68%",pnode:_this.opts.pnode, mainPlay: _this}; 
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
	  for(var i= 0;i<8;i++)
	  {
    	  var p1 = {width:"50%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
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
    	  var p1 = {width:"33.33%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
	    	  
};
mainPlayer.prototype.setLayout11= function()
{
	 var _this = this;
	  for(var i= 0;i<11;i++)
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
	  for(var i= 0;i<13;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout14 = function()
{
	 var _this = this;
	 for(var i= 0;i<14;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout15 = function()
{
	  var _this = this;
	 for(var i= 0;i<15;i++)
	  {
    	  var p1 = {width:"25%",height:"25%",pnode:_this.opts.pnode, mainPlay: _this}; 
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
	  for(var i= 0;i<17;i++)
	  {
    	  var p1 = {width:"25%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout18 = function()
{
	  var _this = this;
	  for(var i= 0;i<18;i++)
	  {
    	  var p1 = {width:"25%",height:"20%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout19 = function()
{
	  var _this = this;
	  for(var i= 0;i<19;i++)
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
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout22 = function()
{
	  var _this = this;
	  for(var i= 0;i<22;i++)
	  {
    	  var p1 = {width:"25%",height:100/6+"%",pnode:_this.opts.pnode, mainPlay: _this}; 
    	 _this.players.push(new hyVideo(p1));
	  }
};
mainPlayer.prototype.setLayout23 = function()
{
	  var _this = this;
	  for(var i= 0;i<23;i++)
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
 * 		}
 * 
 * 	}
 * }
 * 
 */
//设置播放器相关参数
mainPlayer.prototype.setVideoParam = function(activeHyVideo, opts){
	try{
		var _this = this;
        var newOpt = {
            screenchangeBtn: true,
            changeVoiceBtn:true,
            closeBtn:true,
            recordBtn:false,
            syncRecordStats:false
        }
        
   		var videoControl = {};
        if(opts.videoParam){
        	//播放参数
        	if(opts.videoParam.palyParam){
        		activeHyVideo.palyParam = opts.videoParam.palyParam; 
        	}else{
        		activeHyVideo.palyParam = {}; 
        	}
        	
        	if(opts.videoParam.videoControl){
	        	videoControl = opts.videoParam.videoControl ;
        	}
        }
    
    	Object.assign(newOpt, videoControl);
    	//播放器参数
  		activeHyVideo.videoControl = newOpt;
  		
		activeHyVideo.setAvailableBtn();
  		activeHyVideo.setTitle(activeHyVideo.palyParam);
	}catch(e){console.log("setVideoParam 异常:::"+e);}
};

mainPlayer.prototype.playByVideo = function(opts)
{
	  var _this = this;
	  var oop = {
    	    wsserver:opts.wsserver,
    	    rtspurl:opts.rtspurl,
    	    log:opts.log
    	  };
   	  _this.setVideoParam(opts.hyVideo, opts);
	  opts.hyVideo.play(oop);	
};
mainPlayer.prototype.play = function(opts)
{
	  var _this = this;
	  if(activeHyVideo)
	  {
	  	 var oop = {
    	    wsserver:opts.wsserver,
    	    rtspurl:opts.rtspurl,
    	    log:opts.log
    	  };
    	_this.setVideoParam(activeHyVideo, opts);
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
 * 		}
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
	    6:{shapeNum: 1,0: {width : "50%","height" : 100/3+"%"}},
	    7:{shapeNum: 2,0: {width : "75%","height" : "68%"},1: {width : "25%","height" : "34%"}},
	    8:{shapeNum: 1,0: {width : "50%","height" : "25%"}},
	    9:{shapeNum: 1,0: {width : 100/3+"%","height":100/3+"%"}},
	    12:{shapeNum: 1,0: {width : 100/3+"%","height":"25%"}},
	    16:{shapeNum: 1,0: {width : "25%","height":"25%"}},
	    24:{shapeNum: 1,0: {width : "25%","height":100/6+"%"}}
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
			})(i);
		}
	}else{
		console.log("layoutModel 未找到"+_this.players.length+"的布局")
	}
}

//追加布局
mainPlayer.prototype.addLayout = function(){
	var _this = this;
	var p1 = {width:"100%",height:"100%",pnode:_this.opts.pnode}; 
	var newVideo = new hyVideo(p1);
	_this.players.push(newVideo);
	_this.resetLayout();
	return newVideo;
};

//删除布局
mainPlayer.prototype.reduceLayout = function(hyVideo){
	var _this = this;
	//删除数组缓存中的节点
	if( _this.players.length >1){
		 _this.players.splice(hyVideo.playIndex, 1);
		 hyVideo.close();//停止播放
		 //删除节点
		 var rmNode =  hyVideo.videoPanel;
		 if(rmNode){
		 	rmNode.parentNode.removeChild(rmNode);
		 }
		 _this.resetLayout();
	}else{
		console.log('仅剩1布局');
	}
};

function hyVideo(opts)
{
	this.id = uuid();
	this.opts = opts;
	this.setVideoPanel();
};
hyVideo.prototype.play= function(opts){
	var _this = this;
	if(this.hyPlayerWs)
	{
		this.hyPlayerWs.onClose();
	}
	
	var oop = {
	    mediaplayer:this.videoElement,
	    wsserver:opts.wsserver,
	    rtspurl:opts.rtspurl,
	    log:opts.log
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
      this.setToolBar();
      this.setButton();
      videoPanel.appendChild(this.videoElement); 
	  videoPanel.appendChild(this.toolBar);
	  this.videoElement.onclick = function(evn){
	     activeHyVideo = _this;
	     console.log(activeHyVideo);
	  };
	  videoPanel.onmouseover = function(){
	  	_this.toolBar.style.display = 'block';
	  };
	  videoPanel.onmouseleave = function(){
	  	_this.toolBar.style.display = 'none';
	  	_this.soundControl.style.display = 'none';
	  };
      this.opts.pnode.appendChild(videoPanel);  
	  this.clientWidth = this.videoElement.clientWidth;
	   //用于减少布局时删除
	  if(_this.mainPlay){
		 _this.playIndex = _this.mainPlay.players.length;
	  }
	
	 /** const myObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          console.log('大小位置', entry.contentRect)
          console.log('监听的DOM', entry.target)
        })
      })
      myObserver.observe(videoPanel);
      */
};
hyVideo.prototype.setVideoElement= function(){
	  var video = document.createElement("video");
	  video.setAttribute("width","100%");
	  video.setAttribute("height","100%");
	  //video.setAttribute("controls","controls");
	  video.setAttribute("poster","imgs/gabg.jpg");
	  video.style.backgroundColor  = "#3f3f3f";
	  video.style.display="block";
	  video.style.objectFit ="fill";
	  this.videoElement = video;
};
hyVideo.prototype.setToolBar= function(){
	   var toolbar = document.createElement("div");
	   toolbar.style.width= "100%";
	   toolbar.style.height="32px";
	   toolbar.style.position = "absolute";
	   toolbar.style.top = "0px";
	   toolbar.style.textAlign = "right";
	   toolbar.style.display = 'none';
	   toolbar.style.backgroundColor  = "rgba(255,255,255,0.4)";
	   /*toolbar.style.backgroundColor  = "#ffffff";
	   toolbar.style.opacity = '0.4';
	   toolbar.style.filter = 'alpha(opacity=40)';*/
	   this.toolBar = toolbar;
};

hyVideo.prototype.setTitle= function(opt){
   var titleDiv = document.createElement("div");
   var title = opt.title ? opt.title: "";
   titleDiv.title = title;
  	if(opt.len){
   		titleDiv.innerHTML = title;
	}else{
		titleDiv.innerHTML =title;
	}
   titleDiv.style.float ="left";
   titleDiv.style.marginLeft ="6px";
   titleDiv.style.color =opt.color ? opt.color: "#000";
   titleDiv.style.fontWeight="bold";
   titleDiv.style.lineHeight="32px";
   this.toolBar.appendChild(titleDiv);
};

hyVideo.prototype.setButton= function(){
	 var _this = this;
	  var img = document.createElement("img");
	  _this.full = 1;
	  img.setAttribute("src","imgs/fullscreen.png");
	  img.style.float = "right";
	  img.style.margin = "8px 28px 0 0";
	  img.setAttribute("ondragstart","return false");
	  img.style.cursor = 'pointer';
	  img.style.display = 'none';
	  img.onclick=function(evt){
	  	activeHyVideo = _this;
	  	evt = evt||window.event;
	  	evt.stopPropagation();
	  	evt.preventDefault();
	  	evt.cancelBubble = true;
	  	if( _this.full == 1)
	  	{
		  	_this.fullScreen(_this.videoPanel);
	  	}else
	  	{
		  	_this.exitFullscreen();
	  	}
	  };
	  this.fullImg = img;
	   _this.screenImg = img;
	  
	  var soundImg = document.createElement("img");
	  _this.soundImg = soundImg;
	  soundImg.setAttribute("src","imgs/sound.png");
	 // soundImg.style.right = "26px";
	  soundImg.style.marginTop = "8px";
	  soundImg.style.marginRight = "28px";
	  soundImg.style.float = "right";
	  soundImg.style.cursor = 'pointer';
	  soundImg.style.display = 'none';
	  soundImg.setAttribute("ondragstart","return false");
	  this.soundImg = soundImg;
	  
	  //声音控制版面
	  var soundControl= document.createElement("div");
	  soundControl.style.background='#ddd';
	  soundControl.style.width = "50px";
	  soundControl.style.height = "120px";
	  soundControl.style.position = 'absolute';
	  soundControl.style.right='85px';
   	  soundControl.style.top='41px';
	  soundControl.style.textAlign = 'center';
	  soundControl.style.display = "none";
	  soundControl.style.zIndex = 99999;
	  this.soundControl = soundControl;
	  //soundPanel.style.borderRadius = '10px';
	  var soundUp = document.createElement("div");
	  soundUp.style.height = '7px';
	  soundUp.style.width = '12px';
	  soundUp.style.position = 'absolute';
	  soundUp.style.top = "-7px";
	  soundUp.style.left = "19px";
	  soundUp.style.background = 'url(imgs/up.png) no-repeat';
	  soundControl.appendChild(soundUp);
	  //总音量
	  this.soundHeight = 100;
	  this.soundBtnHeight = 14;
	  var totalDiv = document.createElement("div");
	  totalDiv.style.height = this.soundHeight+'px';
	  totalDiv.style.width = '6px';
	  totalDiv.style.margin = '10px auto';
	  totalDiv.style.background = "#abadae";
	  totalDiv.style.borderRadius = '3px';
	  totalDiv.style.position = 'relative';
	  soundControl.appendChild(totalDiv);
	  
	  //实际音量
	  var soundValue = document.createElement('div');
	  soundValue.style.position ='absolute';
	  soundValue.style.width ='100%';
	  soundValue.style.height = '30px';
	  soundValue.style.background='#2bc1ff';
	  soundValue.style.borderRadius = '3px';
	  soundValue.style.bottom = 0;
	  totalDiv.appendChild(soundValue);
	  
	  var soundBtn = document.createElement('div');
      soundBtn.style.width='14px';
	  soundBtn.style.height = this.soundBtnHeight+'px';
	  soundBtn.style.background='url(imgs/soundbtn.png) no-repeat';
	  soundBtn.style.position = 'absolute';
	  soundBtn.style.bottom = '24px';
	  soundBtn.style.marginLeft = '-4px';
	  soundBtn.style.cursor='pointer';
	  totalDiv.appendChild(soundBtn);
	  
	  soundBtn.onmousedown = function(e){
	  	var evt =e||window.event;
	  	evt = evt||window.event;
	  	evt.stopPropagation();
	  	evt.preventDefault();
		var y =evt.clientY;
		var downTop = soundBtn.offsetTop;
		var maxHeight = _this.soundHeight -_this.soundBtnHeight;
		soundControl.onmousemove = function(me){
			var evt = me||window.event;
			var topV = evt.clientY -y  +downTop;
			
			if(topV < 0){
				topV = 0;
				
			}else if(topV>maxHeight){
				topV = maxHeight;
			}
			soundBtn.style.top= topV+"px";
			soundValue.style.height = _this.soundHeight -topV+"px";
			var volume = (maxHeight -topV)/maxHeight;	
			_this.videoElement.volume = volume;
		};
		
		document.onmouseup=function(){
			soundControl.onmousemove=null;
			soundControl.style.display = 'none';
		};
	  };
	  this.soundControl = soundControl;
	 
	  soundImg.onclick = function(evt){
	  	activeHyVideo = _this;
	  	evt = evt||window.event;
	  	evt.stopPropagation();
	  	evt.preventDefault();
	  	evt.cancelBubble = true;
	  	var disp = soundControl.style.display;
	  	if(disp == 'block'){
	  		soundControl.style.display = 'none';
	  	}else{
	  		soundControl.style.display = 'block';
	  	}
	  	 return false;
	  };
	  
	  //停止播放
	  var closeImg =  document.createElement('img');
	  _this.closeImg = closeImg;
	  closeImg.setAttribute("src","imgs/close.png");
	  closeImg.style.float = "right";
	  closeImg.style.cursor = 'pointer';
	  closeImg.style.display = 'none';
	  closeImg.style.margin = ' 8px 10px 0 0';
      closeImg.setAttribute("ondragstart","return false");
	  closeImg.onclick = function(event){
	  	activeHyVideo = _this;
	  	event = event ||window.event;
	  	event.preventDefault();
	  	event.stopPropagation();
	  	event.cancelBubble = true;
	  	_this.close();
	  	return false;
	  };
   	 
	  
 	  var stopWarp = document.createElement('div');
	  stopWarp.style.width ='78px';
	  stopWarp.style.height ='100%';
	  
	  stopWarp.style.float = "right";
	  stopWarp.style.display = "none";
	  stopWarp.style.marginRight = '28px';
	  var recordTip = document.createElement('span');
	  recordTip.innerHTML = '录像中...';
	  recordTip.style.marginLeft = '6px';
	  recordTip.style.fontSize = '14px';
	  recordTip.style.float = 'left';
	  recordTip.style.marginTop = '6px';
	  recordTip.style.color = 'black';
	  var stopReocrd = document.createElement('img');
	 
	  stopReocrd.src = 'imgs/recording.png';
	  stopReocrd.style.marginTop = '8px';
	  stopReocrd.style.float = 'left';
	  stopReocrd.style.cursor = 'pointer';
      stopReocrd.setAttribute("ondragstart","return false");
       
      _this.stopWarp = stopWarp;
	  stopReocrd.onclick = function(){
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
      			stopWarp.style.display = "none";
	  			recordBtn.style.display = "block";
	  			console.log("停止录像响应：：："+JSON.stringify(res))
	  			_this.palyParam.stopResp && _this.palyParam.stopResp(res);
	  		});
		}else{
			console.log('没有四元组信息，无法停止录像');
		}
      };
     
      stopReocrd.onmouseover = function(){
      	 stopReocrd.src = 'imgs/stop.png';
	 	 recordTip.innerHTML = '结束录像';
      };
	  
      stopReocrd.onmouseleave = function(){
      	stopReocrd.src = 'imgs/recording.png';
	 	recordTip.innerHTML = '录像中...';
      };
	  
      stopWarp.appendChild(stopReocrd);
	  stopWarp.appendChild(recordTip);
	 
      
	  var recordBtn = document.createElement('img');
	  recordBtn.src = 'imgs/record.png';
	  recordBtn.title = '开始录像';
	  recordBtn.style.float = "right";
	  recordBtn.style.cursor = 'pointer';
	  recordBtn.style.display = 'none';
	  recordBtn.style.margin = ' 8px 28px 0 0';
      recordBtn.setAttribute("ondragstart","return false");
      _this.recordBtn = recordBtn;
      recordBtn.onclick = function(){
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
      				recordBtn.style.display = "none";
      				stopWarp.style.display = "block";
      			}else{
      				
      			}
      			console.log("开始录像响应：：："+JSON.stringify(res))
      			_this.palyParam.startResp && _this.palyParam.startResp(res);
      		});
  		}else{
  			console.log('没有四元组信息，无法录像');
  		}
      };
  
	this.toolBar.appendChild(closeImg);
    this.toolBar.appendChild(img);
    this.toolBar.appendChild(soundImg);
    this.toolBar.appendChild(recordBtn);
    this.toolBar.appendChild(stopWarp);
    
  	this.videoPanel.appendChild(soundControl);
};

hyVideo.prototype.setAvailableBtn = function(){
	var _this = this;
	if(_this.videoControl.screenchangeBtn == true){
	  	_this.screenImg.style.display = 'block';
  	}
	  
   	if(_this.videoControl.changeVoiceBtn == true){
  		_this.soundImg.style.display = 'block';
	}
	  
	if(_this.videoControl.closeBtn == true){
	  _this.closeImg.style.display = 'block';
	}
	  
	if(_this.videoControl.recordBtn == true){
	  	_this.recordBtn.style.display = 'block';
	}
}

hyVideo.prototype.checkFullScreen = function(ele) {  
	var _this = this;
	
	var wh = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
//	if(_this.clientWidth == _this.videoElement.clientWidth)
	if((wh-2) != _this.videoElement.clientWidth)
  	{
  		_this.fullImg.setAttribute("src","imgs/fullscreen.png");
  		 _this.full = 1;
  	}else
  	{
  		_this.fullImg.setAttribute("src","imgs/fullscreen_exit.png");
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
   	//关闭传送流的
   	 this.hyPlayerWs.websocket.closeFlag = true;
   	 this.hyPlayerWs.onClose();
   }
   this.videoElement.pause();
   this.videoElement.src = '';
   for(var i=0;i<this.toolBar.childNodes.length;i++){
   		(function(){
   			var node = _this.toolBar.childNodes[i];
   			node.style.display = 'none';
   		})(i);
   };
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


/**=========================== 对讲 ===================================*/
function HY_TALK(){
	
};
/**============================== 会议 ================================*/
function HY_MEETING(opt){
	var _this = this;
	this.hySdk = opt.hySdk;
	_this.opt = opt;
	_this.nSetSpeakForAll = 1;
	_this.meetingRole = opt.meetingRole;
	_this.initPlay();//初始化播放器
	_this.initUserPanel();
};

//初始化播放器
HY_MEETING.prototype.initPlay = function(){
	var _this = this;
	var opt = _this.opt;
	var pla = {				
        layout:opt.lstMeetingUserInfo.length,
        //wsserver:"ws://192.168.2.198:5080",
		//rtspurl:"rtsp://192.168.2.198:554/2268/rtsp://192.168.2.230:554/Streaming/Channels/1?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=25;DmgType=2258",
        pnode:opt.pnode,
        log:true
	};
	this.hySdk.mainPlay = this.hySdk.getPlayer(pla);
	var players = this.hySdk.mainPlay.players;
	this.userMeetingInfo = {};
	
	for(var i = 0; i<opt.lstMeetingUserInfo.length;i++){
		(function(ii){
			var user = opt.lstMeetingUserInfo[ii];
			//players[ii].setTitle({title: user.strUserName});
			_this.userMeetingInfo[user.strUserDomainCode+"_"+user.strUserID] = {"video": players[ii],info: user}
		})(i)
	}
};


//发起会议
HY_MEETING.prototype.startMeetingReq = function(opt){
	this.hySdk.startMeetingReq(opt);
};

//发起会议响应
HY_MEETING.prototype.startMeetingRsp = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("###startMeetingRsp####"+JSON.stringify(json))
};

//通知被叫参加会议
HY_MEETING.prototype.notifyInviteUserJoinMeeting = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("###notifyInviteUserJoinMeeting####"+JSON.stringify(json));
	_this.meetingInfo = json;
	if(json.strInviteUserDomainCode == sdk.sie.strUserDomainCode &&
		json.strInviteUserTokenID == sdk.sie.strUserTokenID){
			_this.starCaptureOrPlayUrl();
			_this.joinMeetingReq({"nIsAgree": 1});//播放或采集成功后进入会议
	}else{
		var r=confirm(json.strInviteUserName+'邀请您参加'+json.strMeetingName);
	    if (r==true){
	       _this.joinMeetingReq({"nIsAgree": 1});//播放或采集成功后进入会议
	       _this.getUserUrlReq({});//播放自己的url	
	    }else{
	       _this.joinMeetingReq({"nIsAgree":0});//播放或采集成功后进入会议
	    }
	}
};

//通知邀请方对方参加会议意见
HY_MEETING.prototype.notifyPeerUserMeetingInfo = function(json){
	var _this = this;
	var sdk = this.hySdk;
	sdk.log("###notifyPeerUserMeetingInfo####"+JSON.stringify(json));
	if(json.strMeetingDomainCode == _this.meetingInfo.strMeetingDomainCode 
		&& json.nMeetingID == _this.meetingInfo.nMeetingID){//是否为当前会议
		if(json.nIsAgree == 0){//拒绝
		}else if(json.nIsAgree == 1){//同意
			var userobj = _this.userMeetingInfo[json.strToUserDomainCode+"_"+json.strUserID];
			userobj.callStatus.style.display = 'none';
			userobj.inviteBtn.style.display = 'none';
			userobj.kitOutBtn.style.display = 'block';
			userobj.speakBtnToOK.style.display = 'none';
			userobj.speakBtnToNo.style.display = 'block';
			
			
			
			if(json.strToUserDomainCode == sdk.sie.strUserDomainCode &&
				json.strUserTokenID == sdk.sie.strUserTokenID){//如果是主持人自己进会不做操作
				userobj.kitOutBtn.style.display = 'none';
				userobj.speakBtnToOK.style.display = 'none';
				userobj.speakBtnToNo.style.display = 'none';
				userobj.inviteBtn.style.display = 'none';
				userobj.callStatus.style.display = 'block';
				userobj.callStatus.innerHTML = '主持人';
			}else{//其他人参加会议则获取播放他的url
				_this.getUserUrlReq({
					"domainCode": json.strMeetingDomainCode,
					"strUserTokenID":json.strUserTokenID,
					'strUserID': json.strUserID
				});
			}
		}else if(json.nIsAgree == 3){//离线
			sdk.log(json.strToUserName+"::::: 离线");
			var userobj = _this.userMeetingInfo[json.strToUserDomainCode+"_"+json.strUserID];
			userobj.kitOutBtn.style.display = 'none';
			userobj.speakBtnToNo.style.display = 'none';
			userobj.speakBtnToOK.style.display = 'none';
			userobj.inviteBtn.style.display = 'block';
			userobj.callStatus.style.display = 'block';
			userobj.callStatus.innerHTML = '离线';
		}else if(json.nIsAgree == 4){//退出
			var userobj = _this.userMeetingInfo[json.strToUserDomainCode+"_"+json.strUserID];
			userobj.callStatus.style.display = 'none';
			userobj.kitOutBtn.style.display = 'none';
			userobj.speakBtnToNo.style.display = 'none';
			userobj.speakBtnToOK.style.display = 'none';
			userobj.inviteBtn.style.display = 'block';
			sdk.log(json.strToUserName+"::::: 退出");
		}else if(json.nIsAgree == 5){//对方已在本次对讲中，重复邀请
			sdk.log(json.strToUserName+"::::: 已在本次对讲中，重复邀请");
		}
	
	}
};


HY_MEETING.prototype.starCaptureOrPlayUrl = function(){
	var _this = this;
	var ipc = sdk.getUserUseIPC();
   if(ipc && ipc.nIsUse == 1){
   	var opts={};
   	_this.getUserUrlReq(opts);
   }else{
   		alert("未设置ipc，采用本地摄像头");
   }
	
};

//获取用户的url
HY_MEETING.prototype.getUserUrlReq = function(opt){
	var _this = this;
	var sdk = this.hySdk;
	this.hySdk.getMobileDynamicUrlReq(opt, function(json){
		_this.getUserUrlRsp(json,opt);	
	});
};

//获取用户url的响应
HY_MEETING.prototype.getUserUrlRsp = function(json,user){
	var _this = this;
	var sdk = this.hySdk;
	var video ='';				
	if(!(user.domainCode && user.strUserID)){
		video = _this.userMeetingInfo[sdk.sie.strUserDomainCode+"_"+sdk.opts.loginName].video
	}else{
		video = _this.userMeetingInfo[user.domainCode+"_"+user.strUserID].video
	}
	if(json.nResultCode == 0){
		var pla = {				
		        wsserver:"ws://192.168.2.160:5080",
				rtspurl:json.dynamicUrl,
				hyVideo: video,
				log:true
		};
		sdk.mainPlay.playByVideo(pla);
	}
};

//参加会议
HY_MEETING.prototype.joinMeetingReq = function(opt){
	try{
	var _this = this;
	var sdk = this.hySdk;
	var json =  _this.meetingInfo;
	var joinParam = {
			strMeetingDomainCode:json.strMeetingDomainCode,
			nMeetingID: json.nMeetingID,
			nPicMode:json.nSynthesise == 1 ? 1: 0,
			strInviteUserDomainCode: json.strInviteUserDomainCode,
			strInviteUserTokenID: json.strInviteUserTokenID,
			nIsAgree: opt.nIsAgree
		};
	sdk.joinMeetingReq(joinParam);
	}catch(e){
	 console && console.error(e);
	}
};
//参加会议响应
HY_MEETING.prototype.joinMeetingRsp = function(json){
	var _this = this;
	var sdk = this.hySdk;
	if(json.nResultCode == 0){
		console.log('*********进入会议成功');
	}
};

//初始化参会人员面板
HY_MEETING.prototype.initUserPanel = function(){
	var _this = this;
	var opt = _this.opt;
	var userPanel = document.getElementById(opt.userPanel);
	var userListP = document.createElement('div');
	_this.userListP = userListP;
	userPanel.appendChild(_this.userListP);
	for(var key in _this.userMeetingInfo){
		(function(user){
			_this.initUserRow(user);
		})(_this.userMeetingInfo[key]);
	}
};

//初始化每一个人员
HY_MEETING.prototype.initUserRow = function(user){
	var _this = this;
	var info = user.info;
	var row =document.createElement("li");
	var nameS = document.createElement('span');
	nameS.innerHTML= info.strUserName;
	row.appendChild(nameS);
	var hostBtnList = [
	{"name": "呼叫中","funcName":'',"id": 'callStatus',"display": 'inline-block',type:'tip'},
	{"name": "邀请","funcName":'inviteUserAction',"id": 'inviteBtn',"display": 'none'},
	{"name": "请出","funcName":'kitOurUserAction',"id": 'kitOutBtn',"display": 'none'},
	{"name": "禁言","funcName":'speekChangeNo',"id": 'speakBtnToNo',"display": 'none'},
	{"name": "解禁","funcName":'speekChangeOk',"id": 'speakBtnToOK',"display": 'none'}];
	if(_this.meetingRole == 1){//主持人
		for(var i=0;i<hostBtnList.length;i++){
			(function(i){
				var btnInfo = hostBtnList[i];
				var btn = document.createElement('button');
				
				if(btnInfo.type && btnInfo.type == 'tip'){
					btn= document.createElement('span');
				}
				btn.style.display = btnInfo.display;
				btn.innerHTML = btnInfo.name;
				btn.style.marginLeft = '10px';
				btn.style.float = 'right';
				btn.onclick = function(){
					btnInfo.funcName && _this[btnInfo.funcName](info);
				}
				row.appendChild(btn);
				_this.userMeetingInfo[info.strUserDomainCode+"_"+info.strUserID][btnInfo.id] =btn; 
			})(i);
		}
	}else{
		//邀请
		var speakTip = document.createElement('span');
		speakTip.innerHTML= "解禁中";
		_this.userMeetingInfo[info.strUserDomainCode+"_"+info.strUserID].speakTip =speakTip;
		row.appendChild(speakTip);
	}
	_this.userListP.appendChild(row);
};

//邀请人员
HY_MEETING.prototype.inviteUserAction = function(user){
	var _this = this;
	console.log("inviteUserAction:::"+JSON.stringify(user));
	var  list = [];
	list.push(user);
	var p = {
		strMeetingDomainCode: _this.meetingInfo.strMeetingDomainCode,
		nMeetingID:_this.meetingInfo.nMeetingID,
		lstMeetingUserInfo:list
	}
	this.hySdk.inviteUserMeetingReq(p, function(json){
		_this.inviteUserMeetingRsp(json, user);
	});
};

//邀请人员响应
HY_MEETING.prototype.inviteUserMeetingRsp = function(json, user){
	var _this = this;
	console.log("inviteUserMeetingReq:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userobj = _this.userMeetingInfo[user.strUserDomainCode+"_"+user.strUserID];
		userobj.inviteBtn.style.display = 'none';
		userobj.kitOutBtn.style.display = 'none';
		userobj.speakBtnToOK.style.display = 'none';
		userobj.speakBtnToNo.style.display = 'none';
		userobj.callStatus.style.display = 'block';
		userobj.callStatus.innerHTML = '呼叫中';
	}
};

//请出人员
HY_MEETING.prototype.kitOurUserAction = function(user){
	var _this = this;
	console.log("kitOurUserAction:::"+JSON.stringify(user));
	var  list = [];
	list.push(user);
	var p = {
		strMeetingDomainCode: _this.meetingInfo.strMeetingDomainCode,
		nMeetingID:_this.meetingInfo.nMeetingID,
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
	console.log("kickMeetingUserRsp:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userobj = _this.userMeetingInfo[user.strUserDomainCode+"_"+user.strUserID];
		userobj.callStatus.style.display = 'none';
		userobj.kitOutBtn.style.display = 'none';
		userobj.speakBtnToOK.style.display = 'none';
		userobj.speakBtnToNo.style.display = 'none';
		userobj.inviteBtn.style.display = 'block';
		_this.stopVideo({
			domainCode:user.strUserDomainCode,
			strUserID: user.strUserID
		});
	}
};

//被从会议中请出通知
HY_MEETING.prototype.notifyKickUserMeeting = function(json){
	var _this = this;
	console.log("notifyKickUserMeeting:::"+JSON.stringify(json));
	alert('已被踢出')
	_this.stopVideo({"type": "all"});
	_this.userListP.innerHTML = '';
	delete _this.hySdk.HYCurrentMeeting;
};

//被从会议中请出通知
HY_MEETING.prototype.speekChangeAction =function(nSetSpeak,user,func){
	var _this = this;
	var  list = [];
	var p = {
		strMeetingDomainCode: _this.meetingInfo.strMeetingDomainCode,
		nMeetingID:_this.meetingInfo.nMeetingID
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
	console.log("speekChangeNo:::"+JSON.stringify(user));
	
	_this.speekChangeAction(0,user, function(json){
		_this.meetingSpeakSetRsp(json, user,0);
	});
};

//对人员解禁
HY_MEETING.prototype.speekChangeOk = function(user){
	var _this = this;
	console.log("speekChangeOk:::"+JSON.stringify(user));
	
	_this.speekChangeAction(1,user, function(json){
		_this.meetingSpeakSetRsp(json, user, 1);
	});
};

//对人员禁言响应
HY_MEETING.prototype.meetingSpeakSetRsp = function(json, user,type){
	try{
		
	var _this = this;
	console.log("meetingSpeakSetRsp:::"+JSON.stringify(user));
	if(json.nResultCode == 0){
		var userObj = _this.userMeetingInfo[user.strUserDomainCode+"_"+user.strUserID];
		if(type == 0){//禁言
			userObj.speakBtnToNo.style.display = 'none';
			userObj.speakBtnToOK.style.display = 'block';
		}else{
			userObj.speakBtnToOK.style.display = 'none';
			userObj.speakBtnToNo.style.display = 'block';
		}
	}

	}catch(e){alert(e)}
};

//停止会议请求
HY_MEETING.prototype.stopMeetingReq = function(){
	var _this = this;
	console.log("stopMeetingReq:::"+JSON.stringify(_this.meetingInfo));
	this.hySdk.stopMeetingReq(_this.meetingInfo);
};
//停止会议响应
HY_MEETING.prototype.stopMeetingRsp = function(resp){
	var _this = this;
	_this.stopVideo({"type": "all"});
	_this.userListP.innerHTML = '';
};

//停止
HY_MEETING.prototype.stopVideo  =function(opt){
	var _this = this;
	if(opt.type&&opt.type == 'all'){
		for(var key in _this.userMeetingInfo){
			var user = _this.userMeetingInfo[key];
			user.video.close();
		}
	}else{
		var user = _this.userMeetingInfo[opt.domainCode+"_"+opt.strUserID];
		user.video.close();
	}
	
};

//通知会议状态信息
HY_MEETING.prototype.notifyMeetingStatusInfo = function(json){
 	try{
		var _this = this;
		var sdk = this.hySdk;
		sdk.log("###notifyMeetingStatusInfo####"+JSON.stringify(json));
		if(json.strMeetingDomainCode == _this.meetingInfo.strMeetingDomainCode 
			&& json.nMeetingID == _this.meetingInfo.nMeetingID){//是否为当前会议
			if(json.nMeetingStatus == 2){//会议结束
				_this.stopVideo({"type": "all"});
				_this.userListP.innerHTML = '';
			}else if(json.nMeetingStatus == 1){//正在开始
				if(_this.meetingRole == 2){//非主叫,根据挣扎进行的会议人员播放画面
					if(json.lstMeetingUser){
						for(var i=0;i<json.lstMeetingUser.length;i++){
							(function(user){
								if(!(user.strUserDomainCode == sdk.sie.strUserDomainCode &&
								user.strUserID == sdk.opts.loginName)){//如果是自己进会不做操作
									if(user.nPartType == 2 || user.nPartType == 0){//0 加入 1 退出 2 正常与会
										_this.getUserUrlReq({
											"domainCode": user.strUserDomainCode,
											"strUserTokenID":user.strUserTokenID,
											'strUserID': user.strUserID
										});
									}else{
										_this.stopVideo({
											domainCode:user.strUserDomainCode,
											strUserID: user.strUserID
										});
									}
								}else{//自己
									var userObj = _this.userMeetingInfo[user.strUserDomainCode+"_"+user.strUserID];
									if(user.nMuteStatus == 1){//0关闭，1打开
										userObj.speakTip.innerHTML ='解禁中'
									}else{
										userObj.speakTip.innerHTML ='禁言中'
									}
								}
							})(json.lstMeetingUser[i]);
							
						}
					}
				}else{
					_this.notifyMStatusHostAction(json);
				}
			}
			
		}else{//不是当前会议
			
		}
 	}catch(e){alert(e)}
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
						
						var userobj = _this.userMeetingInfo[user.strUserDomainCode+"_"+user.strUserID];
						userobj.callStatus.style.display = 'none';
						userobj.kitOutBtn.style.display = 'none';
						userobj.speakBtnToOK.style.display = 'none';
						userobj.speakBtnToNo.style.display = 'none';
						userobj.inviteBtn.style.display = 'block';
						
						_this.userListP.innerHTML = '';
						delete _this.hySdk.HYCurrentMeeting;
						
					}
				}else{//自己
					
				}
			})(json.lstMeetingUser[i]);
		}
	}
}

//退出会议
HY_MEETING.prototype.quitMeeting = function(){
	var _this = this;
	console.log("quitMeeting:::"+JSON.stringify(_this.meetingInfo));
	this.hySdk.quitMeetingReq(_this.meetingInfo);
	
};

//退出会议响应
HY_MEETING.prototype.quitMeetingRsp = function(json){
	var _this = this;
	console.log("quitMeetingRsp:::"+JSON.stringify(json));
	_this.stopVideo({type:"all"});
	delete this.hySdk.HYCurrentMeeting;
};


function HY_DIALOG(opt){
	this.opt = opt;
	this.init();
};
HY_DIALOG.prototype.init = function(){
	var _this = this;
	var opt = this.opt;
	var d = document.getElementById('HY_DIALOG');
	if(d){
		document.body.removeChild(d);
	}
	var dia = document.createElement('div');
	this.dialog = dia;
	dia.id = 'HY_DIALOG';
	if(opt.width && typeof opt.width == "number"){
		dia.style.width = opt.width+'px';
	}else if(opt.width && typeof opt.width == "string"){
		if(opt.width.indexOf('px')!=-1){
			dia.style.width = opt.width;
		}else{
			dia.style.width = opt.width+'px';
		}
	}else{
	}
	var contentH = '50px';
	if(opt.height && typeof opt.height == "number"){
		dia.style.height = opt.height+'px';
		contentH =  opt.height*1 -31+'px';
	}else if(opt.height && typeof opt.height == "string"){
		if(opt.height.indexOf('px')!=-1){
			dia.style.height = opt.height;
			contentH =  parseInt(opt.height) -31+'px';
		}else{
			dia.style.height = opt.height+'px';
			contentH =  opt.height*1 -31+'px';
			
		}
	}else{
	}
	
	dia.style.position = 'absolute';
	dia.style.left = '50%';
	dia.style.top = '50%';
	dia.style.transform = "translate(-50%,-50%)";
	dia.style.margin = 'auto';
	dia.style.border = "1px solid #ccc";
	dia.style.boxShadow = "0px 10px 20px #888888";
	var title = document.createElement('div');
	title.innerHTML = opt.title;
	title.style.height = '30px';
	title.style.lineHeight = '30px';
	title.style.borderBottom = "1px solid #ccc";
	title.style.textIndent= '10px';
	title.style.width ="100%"; 
	var closeBtn = document.createElement('img');
	closeBtn.src = 'imgs/close.png';
	closeBtn.style.float = "right";
	closeBtn.style.margin='4px 10px 0 0';
	closeBtn.style.cursor = 'pointer';
	closeBtn.onclick = function(){
		_this.close()
	}
	title.appendChild(closeBtn);
	var content = document.createElement('div');
	if(opt.id){
		content.id = opt.id;
	}
	content.style.width ="calc(100% - 20px)"; 
	content.style.padding ="10px"; 
	content.style.height = contentH;
	content.style.background = '#eee';
	dia.appendChild(title);
	dia.appendChild(content);
	document.body.appendChild(dia);
	this.dialogContent = content;
};

HY_DIALOG.prototype.close = function(fun){
	var _this = this;
	_this.dialog.remove();
	fun && fun();
}


HY_DIALOG.prototype.tip = function(opt){
	var _this = this;
	
	var dia = new HY_DIALOG({
		height: opt.height,
		title: "提示"
	});
	dia.dialogContent.innerHTML = opt.msg;
	dia.dialogContent.style.textAlign = "center";
}

HY_DIALOG.prototype.confirm = function(opt){
	var _this = this;
	var dia = new HY_DIALOG({
		height: opt.height,
		title: "提示"
	});
	_this.dialog = dia;
	var msg = document.createElement('div');
	msg.innerHTML = opt.msg;
	dia.dialogContent.appendChild(msg);
	var btns = document.createElement("div");
	btns.style.width='120px';
	btns.style.margin='0px auto';
	btns.style.padding='6px ';
	btns.style.height='50px';
	var okBtn = document.createElement("div");
	okBtn.style.padding = '4px';
	okBtn.style.float = 'left';
	okBtn.innerHTML = '确定';
	okBtn.style.border = '1px solid #ccc';
	okBtn.style.cursor = 'pointer';
	okBtn.okBtn = function(){
		dia.close();
		okFun && okFun();
	};
	var cancelBtn = document.createElement("div");
	cancelBtn.innerHTML = '取消';
	cancelBtn.style.float = 'right';
	cancelBtn.style.cursor = 'pointer';
	cancelBtn.style.marginLeft = '10px';
	cancelBtn.style.padding = '4px';
	cancelBtn.style.border = '1px solid #ccc';
	cancelBtn.onclick = function(){
		dia.close();
		cancelFun && cancelFun();
	};
	btns.appendChild(okBtn);
	btns.appendChild(cancelBtn);
	dia.dialogContent.appendChild(btns);
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
			   			_this.changeDevice(key);
			   		}
		    	}
	    	}else{//不支持path2d
    			 _this.ctx.clearRect(0, 0, _this.opts.width, _this.opts.height);
	    		for(var key in _this.pathListObj){
	    			_this.pathListObj[key]();
	    			if(_this.ctx.isPointInPath( _this.pathObj[key], e.clientX-canvasInfo.left, e.clientY- canvasInfo.top)){
	    				if(!(key == "stop"||key == "outside")){
	    					_this.changeDevice(key);
	    				}
	    			}
	    		}
	    	}
  	
    	}catch(e){alert(e)}
    });
  	hycanvas.addEventListener('mouseup', function (e) {
   		_this.opts.sdk.PTZControlReq({
			serviceUrl:{
				strDomainCode:activeHyVideo.palyParam.strDomainCode,
				strDeviceCode:activeHyVideo.palyParam.strDeviceCode,
				strChannelCode:activeHyVideo.palyParam.strChannelCode,
				strStreamCode:activeHyVideo.palyParam.strStreamCode
			},
			nCommand:key,
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
		nCommand:key,
		nStop:0
	},function(){
		
	});
 }