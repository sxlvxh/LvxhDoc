/**
 * 业务成调用rtc控件的js文件
 */

function HYRTC(){
	
}
var HY_RTC = new HYRTC();

HYRTC.prototype.init = function(){
    var _this = HY_RTC;
    try{
    var entParams = JSON2.parse(platParams.platEnt.entParams);
    var ipAndPort = _this.getIpAndPort();
    var addr = "wss://" + ipAndPort.ip + ":"+ ipAndPort.port;
    _this.hysdk = new HySdk(addr,_this.MsgCallBack);
    }catch(e){
      $.hy_error(e,"初始化RTC错误");
    }
    setTimeout(function(){
		_this.userRgister();
	},3000);		
}

HYRTC.prototype.getIpAndPort = function(){
    var resp = {};
    if(platParams.platEnt && platParams.platEnt.entParams){
        var entParams = JSON2.parse(platParams.platEnt.entParams);
        if(platParams.isExternalNetwork){
            resp.ip = entParams.extranetSieIP;
            resp.port = entParams.extranetSiePort;
        }else{
            resp.ip = entParams.intranetSieIP;
            resp.port = entParams.intranetSiePort;
        }
    }else{
        $.hy_error(JSON2.stringify(platParams.platEnt),"请检查流媒体配置项");
    }
    if(resp.ip && resp.port){
    	$.hy_log("rtc ip:"+resp.ip+"rtc port:"+resp.port);
    }else{
    	$.hy_error("rtc ip:"+resp.ip+"   rtc port:"+resp.port,"请检查流媒体配置项");
    }
    
    return resp;
}
//监听流媒体返回的消息  
HYRTC.prototype.MsgCallBack = function(res){
    //$.hy_log(" ============ " + JSON2.stringify(res));
    var _this = HY_RTC;
   // $.hy_error(HY_RTC);
    if(res.msgtype)
    {
        var func = "msg"+res.msgtype;
    	try{
    	_this[func](res);
    	}catch(e){
    	  $.hy_error(func + "消息类型方法不存在",e);
    	  $.hy_error(func + "消息类型方法不存在",res);
    	}
    }
}

//用户注册
HYRTC.prototype.userRgister = function(){
    var _this = HY_RTC;
    var userInfo = platParams.loginUser;
    var entParams = JSON2.parse(platParams.platEnt.entParams);
    var ipAndPort = _this.getIpAndPort();
    var registerParam = {
         strUserID: userInfo.userCode,//用户名
         strUserName:userInfo.loginName, //userInfo.name, //用户名
         nDevType: 9,//设备登录类型9(pc),后续android/ios考虑为10/11
         strServerIP: ipAndPort.ip, //服务器Ip
         nServerPort: 9001, //服务器Port
         nPriority:0 //优先级
     }
      $.hy_error(registerParam);
    _this.hysdk.regist(registerParam, _this.registResp);
}

//监听流媒体返回的消息  
HYRTC.prototype.registResp = function(res){
    $.hy_log(" ++++++++++  " + JSON2.stringify(res));
    var _this = HY_RTC;
    if(res.errorno == 0)
    {
	     //_this.userInfo = _this.hysdk.getUserInfo();
    }else
    {
    	//_this.userRgister();
    }
    //$.hy_log(JSON2.stringify(_this.hysdk.getUserInfo()));
}
HYRTC.prototype.msg585 = function(res){
    //$.hy_log(" -----------  " + JSON2.stringify(res));
	 var _this = HY_RTC;
	  _this.userInfo = _this.hysdk.getUserInfo();
	  
	  $.hy_error("",_this);
}
HYRTC.prototype.msg54515 = function(res){
 //   $.hy_log(" -----------  " + JSON2.stringify(res));
}


