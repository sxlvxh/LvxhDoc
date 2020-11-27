$(function(){
	$.hy_log($.UUID());
	$.ajaxSetup({   
        contentType:"application/json;charset=utf-8",   
        dataType: 'json',
        complete:function(XMLHttpRequest,textStatus){
			try{	
				if(XMLHttpRequest.getResponseHeader != undefined){
					var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
					if(sessionstatus=="timeout"){ 
						setTimeout(function(){
							location.href = CONSTANTS.LOGOUT_URL;
						},1000 );
						$.messageDialog("本次登录已失效，请重新登录！");
					}  
				}
			} catch(el) {
			  window.console && window.console.error(el);
			}
		},
		error: function (xhr, status, e) {
			window.console && window.console.error(xhr, status, e);
		}					  
     });
    $("#plat_logo").attr("title","解锁").css({"cursor":"pointer"}).bind("click", function(){
    	setTimeout(function(){
    		if(platParams.sieWebsocketUrl){
				  window.open(platParams.sieWebsocketUrl.replaceAll("wss","https"));
			}else{
				console.error("sieWebsocketUrl不存在::");
			}
		},100);
		setTimeout(function(){
			if(platParams.sieStreamUrl){
				  window.open(platParams.sieStreamUrl.replaceAll("wss","https"));
			}else{
				console.error("sieStreamUrl不存在::");
			}
		},100);
		setTimeout(function(){
			if(platParams.webRtcUrl){
				 window.open(platParams.webRtcUrl.replaceAll("wss","https"));
			}else{
				console.error("webRtcUrl不存在::");
			}
		},100);
    })
	$(".menu_control").bind("click", function() {
		var url = $(this).attr("url");
		var menuId = $(this).attr("id");
		var params = {"menuId" : menuId};
		$("#home_active_name").show().html($(this).attr("mark"));
		$("#home_parent_name").show().html($(this).attr("pname"));
		
		$(".active").removeClass("active");
		$(this).closest("li").addClass("active");
		$(this).closest(".submenu").parent("li").addClass("open");
		if((typeof HYSDK) != "undefined"){
			HYSDK.destoryAllPlay();
		}
		$("#datagrid").empty();
		$.init_page(params, "#datagrid");
	});
	
	$("#home-page").bind("click",function(){
		$("#home_active_name").hide();
		$("#home_parent_name").hide();
		$("#datagrid").empty();
	    var params = {"menuId" : -1};
		$.init_page(params, "#datagrid");
	});
	
	$("#logout_menu").bind("click",function(){
		if((typeof HYSDK) != "undefined"){
			HYSDK.logout();
		}
		setTimeout(function(){		
			location.href = CONSTANTS.LOGOUT_URL;
		},1000);
	});
	
	if(PLAT){
		//初始化socket，并登陆
		//PLAT.loginWebSorket();
		//首页页头
		PLAT.pageTop();
		
		//菜单
		PLAT.menu();
		
		//通讯录
		if(platParams.hasContact){
			PLAT.contact();
		}
	}
	$(".nav-user-photo").bind("click",function(){
		var data = CONSTANTS.MODIFY_USER_PARAMS;
		var user = $.extend({},platParams.loginUser);
		user.password = "";
		PlatGrid.prototype.openDialogBtn(data,{srcData: user});
		PlatGrid.prototype.modifyUser = function(){
			location.href = CONSTANTS.LOGOUT_URL;
		}
	})
	if((typeof HYSDK) != "undefined"){
		HYSDK.drawCalledPanel = function (calledMt) {
		   var _this  = this;
		   var dia =  PLAT.initMeetingDialog({
				id: "startMeeting_dialog",
				beforeunload:function(){
					var key = calledMt.nMeetingID+"_"+calledMt.strMeetingDomainCode;
					if(_this.calledMt[key]){
						_this.calledMt[key].quitMeeting();
					}
				},
				title: calledMt.opt.meetingInfo.strMeetingName,
				playDivId: "meetingPalyer",
				userDivId:"meetingUsers",
				type:"join",
				quitFunc: function(){
					calledMt.meetDialog.close();
				}
			});
		    
			calledMt.quitMeetAction = function(){
				if(this.meetDialog){
					this.meetDialog.close();
				}
			}
		    calledMt.opt.pnode='meetingPalyer';
		    calledMt.opt.userPanel='meetingUsers';
		    $("#"+calledMt.opt.userPanel).empty();
		    calledMt.playPanel = $("#meetingPlayer").empty();
		    calledMt.calledStart();
		    calledMt.meetDialog = dia;
		};
	}
});

/**
 * PlatFunc
 * ==============================================================================================
 */
function PlatFunc()
{
	if(platParams){
		this.platParams = platParams;
	}
	
	if(productParams){
		this.productParams = productParams;
	}
	this.baduMapJs = false;
	this.tianMapJs = false;
	this.mapCache = {};
};
var PLAT = new PlatFunc();

PlatFunc.prototype.loginWebSorket = function(){
	var _this = this;
	try{
		if(typeof(_this.ws) == "object"){
			_this.ws.destory();
		}
		var url = "ws://"+platParams.extranetIp+":"+platParams.webSocketPort+"/ws";
		var loginName = platParams.loginUser.userCode;
		if(_this.loginName){
			loginName = _this.loginName;
		}
		var eventFunc = ["contact","talking","meeting"];
		var opt = {
			url:url,
			loginName:loginName,
			loginSuccess:function(ws){
			},			
			receive:function(msg){
				$.hy_log("=====loginWebSorket====",msg); 
				if(msg.msgType == "kickout"){
					// todo 您已经被踢出
				}else if(msg.msgType == "chat"){
					$.each(eventFunc,function(i,n){
						if(_this.ws[n]){
							_this.ws[n](msg);
						}
					})
				}else if(msg.msgType == "notice"){
				   var cont = JSON2.parse(msg.content); 
				   if(cont.type){  
					   _this.ws[cont.type](msg);  //addFriend 
				   }
				}else if(msg.msgType == "voiceNotify"){//语音转写通知
				 	var cont = JSON2.parse(msg.content); 
			   	 	csSdk.receVoiceNotify(cont);
				}
			},
			procClosed:function(){
			   
			},
			procError:function(){
			  
			},
			log:true
		};
		_this.ws = new NETTY_WS(opt);
	}catch(e){
		window.console && window.console.error(e);
	}
}

PlatFunc.prototype.getGrid = function(opt,func,endFunc){
	var _this = this;
	var pages = {
		curPage: 1,
		pageSize: opt.pageSize
	}
	if(opt.curPage){
		pages.curPage = opt.curPage;
	}
	var data = opt.data;
	data["pages"] = pages;
	var opt = {
		url:opt.url,
		data:data,
		success:function(msg){
			func(msg);
			if(msg.result && msg.result.length >= pages.pageSize){
				var opts = {
					url:opt.url,
					pageSize:pages.pageSize,
					data:opt.data,
					curPage: pages.curPage + 1
				}
				_this.getGrid(opts,func,endFunc);
			}else if(endFunc){
				endFunc();
			}
		 }
    };
	$._ajax(opt);
}

PlatFunc.prototype.getList = function(opt,successFunc){
	var _this = this;
	var opts = {
		"url": opt.url, 
		"data": opt.data, 
		"async": opt.async?opt.async:true,
		"success":function(res){
			if(res.code == 0){
				successFunc && successFunc(res);		
			}
		}
	};
	$._ajax(opts);
}

PlatFunc.prototype.asMethodFunc = function(arrays,func,time,endFunc){
	var t = 10;
	if(time){
		t = time;
	}
	var int=self.setInterval(function(){
		if(arrays.length > 0)
		{
			var dd = arrays.shift();
			func(dd);
		}else {
			clearInterval(int);
			if(endFunc)
			{
				endFunc();
			}
		}
	},t);
}

PlatFunc.prototype.getSaveKey = function(ele,saveKey){
	var _this = this;
	var ret = "";
	$.each(saveKey,function(i,n){
	    if(i>0){
	     	ret +="_";
	    }
	    if(n.keyType && n.keyType == "custom"){
	     	ret += n.key;
	    }else{
	     	ret += ele[n.key];
	    } 
	})
	return ret;
}

PlatFunc.prototype.getBMapPoint = function(n){
	var point;
	if(n.lng && n.lng>0 && n.lat && n.lat >0){
		point = new BMap.Point(n.lng,n.lat);
	}else{
		var mapPoint = platParams.mapCenterLatLng;
		var point = mapPoint.lastIndexOf(',');
		var lng = mapPoint.substring(0,point);
		var lat = mapPoint.substring(point+1);
		point = new BMap.Point(lng,lat);
	}
	return point;
}

PlatFunc.prototype.getMarkerType = function(mp,n){
	var _this = this;
	var markerType = 1;
	if(mp && mp.markerType){	
		markerType = _this.privateMakerParams(mp.markerType,n);	      									
	}
	return markerType;
}
 
PlatFunc.prototype.getMarkerStatus = function(mp,n){
	var _this = this;
	var markerStatus = "active";										
	if(mp && mp.markerStatus)
	{											
		markerStatus = _this.privateMakerParams(mp.markerStatus,n);	                    
	}
	return markerStatus;
}
/**
 * @param {} mp {markerStatus:{
		"pid": "elements",
		"render": {
			"0": "gray",
			"1": "active",
			"2": "active",
			"3": "active"
		},
		"initValue": "status"
	}}
 * @param {} n {status:1}
 */ 
PlatFunc.prototype.privateMakerParams = function(mtype,ele){
	var value = 1;
	if(mtype.pid == "session"){
		value = platParams[mtype.initValue];
	}else if(mtype.pid == "initValue"){
		value = mtype.initValue;
	}else if(mtype.pid == "elements"){
		var idx = ele[mtype.initValue];		
		if(idx || idx == 0){			
		  value = mtype.render[idx];
		}	           
	}
	return value;
}

PlatFunc.prototype.getMarkerSize = function(mp){
	var mapSize = $.getMapIconSize();
	if(mp && mp.markerSize){										
	    mapSize = new BMap.Size(mp.markerSize.width*1,mp.markerSize.height*1);	
	}
	return mapSize;
}

PlatFunc.prototype.isEnableDragging = function(mp,marker){
	var markerEnableDragging = true;
	if(mp.markerEnableDragging || mp.markerEnableDragging == false){
		markerEnableDragging = mp.markerEnableDragging;
	}
	if(markerEnableDragging == true){
		marker.enableDragging();										
	}	
}

PlatFunc.prototype.setMarkerLabel = function(mp,point,ele){ 
    var opts = {
	   position : point,    // 指定文本标注所在的地理位置
	   offset : new BMap.Size(-5, -28)    //设置文本偏移量
	}
	var label = new BMap.Label(ele[mp.markderLabelTitle.content], opts);  // 创建文本标注对象
	if(mp.markerLabelStyle){
		label.setStyle(mp.markerLabelStyle);
	}	
	return label;
}

PlatFunc.prototype.hyGetOverlayCenterPoint = function(overlay){
	var _this = this;
	try{
		if(overlay.cP == "Marker"){
			return overlay.point;
		}else{
			var path = overlay.getPath(),
			 x = 0.0,
			 y = 0.0,
		     len=path.length,
		     point,
		     ret;
		
			for (var i = 0; i < len; i++) {
		    	point = path[i];
				x = x + parseFloat(point.lng);
				y = y + parseFloat(point.lat);
			}
			x = x / len;
			y = y / len;

			ret = new BMap.Point(x, y);
			return ret;
	   }
	}catch(e){
		return overlay.point;
	}
}

PlatFunc.prototype.setMarkerEvent = function(object,marker,mp,ele){ 
    if(mp.markerEvent){
		$.each(mp.markerEvent,function(i,n){
			marker.addEventListener(n.event,function(event){
				object[n.eventFunc](marker,event,ele);
			}); 
		});
    }
}
/*var data = {
	"object":_this,  --调用方法的对象
	"marker":marker,  
	"iflag":kk,
	"type":overlay/marker  
};*/
PlatFunc.prototype.setHyCustomCover = function(data){
    var _this = this;	
    var object = data.object;
	var mapParams = data.object.jsonParams.mapParams;
	var enableDragging = true;
	if(mapParams.enableDragging || mapParams.enableDragging == false){
	    enableDragging = mapParams.enableDragging;
	}
	var btnData = {
		"width":450,
		"height":200
	}
	if(data.object.jsonParams.dialog){
		btnData = data.object.jsonParams.dialog;
	}
	var position = {};
	if(data.type == "marker"){
		position = data.marker.getPosition();
	}else if(data.type == "overlay"){
		position = _this.hyGetOverlayCenterPoint(data.marker);
	}
	var myCompOverlay = new HyCustomCover(position, {
		id: data.iflag,
		width: btnData.width*1,
		height: btnData.height*1,
		scoreKey: true,
		bthHeight: 30,
		strokeColor: "red",
		strokeWeight: 2,
		strokeOpacity: 0.3,
		enableDragging:enableDragging
	});
	return myCompOverlay;
}

PlatFunc.prototype.closeDialog = function(root){
	$(".d-close",root).click();
}
PlatFunc.prototype.closeOtherDialog = function(){
	$(".d-close").click();
}

PlatFunc.prototype.chatDialogConfirm = function(opt){
	var _this = this;
	var iid =  "chatDialogConfirm";
	var llld = $.dialog({
		id: iid,
		title: "提示",
		content: "<div id='"+iid+"'><div><img src='"+$.getImgUrl('/images/tips.png')+"' style='margin-top: -6px;'/><span style='margin-left: 10px; font-size: 18px;'>"+opt.msg+"</span></div>",
		initialize: function() {},
		width: 332,
		height: 206,
		lock: true
	});	
	var div = $("<div/>");
	var myD = $("#d-content-chatDialogConfirm").closest("table.d-border");
	$.batchHide(myD,[".d-nw",".d-n",".d-ne",".d-title",".d-close",".d-sw",".d-s",".d-se"]);
	$("#"+iid).append(div);
	div.append($("<div/>").css({"margin-top": "30px","height":"60px"}).addClass("btn-group buttons")
		.append($("<div/>").addClass("chat-dialog-btn").width(78).height(30).append("确认").bind("click",function(){
			opt["okFun"] && opt["okFun"]();
			_this.showDialogTitle($("#d-content-chatDialogConfirm").closest("table.d-border"));
			llld.close();			
			$.batchHide(myD,[".d-nw",".d-ne",".d-sw",".d-se"]);
		})).append($("<div/>").addClass("chat-dialog-btn").width(78).height(30).css({"color":"#4d4d4d","border":"1px solid #d9d9d9","background-color": "#f2f2f5","margin-right": "20px"}).append("取消").bind("click",function(){
			opt["cancelFun"] && opt["cancelFun"]();
			_this.showDialogTitle($("#d-content-chatDialogConfirm").closest("table.d-border"));
			llld.close();
			$.batchHide(myD,[".d-nw",".d-ne",".d-sw",".d-se"]);
		})));
	return llld;
};

PlatFunc.prototype.showDialogTitle= function(root){
	$.batchShow(root,[".d-nw",".d-n",".d-ne",".d-title",".d-close",".d-sw",".d-s",".d-se"]);
}

PlatFunc.prototype.pageTop = function(){
	var _this = this;
	$("#navbar").css({"background":"url('"+$.getImgUrl(_this.productParams.topImg) + "')"});
	//$("#plat_logo").attr({"src":$.getImgUrl("/logo/hwlogo2.png"/*productParams.bgImg*/)});
	$("#plat_logo").attr({"src":_this.productParams.bgIcon ? $.getImgUrl(_this.productParams.bgIcon) : $.getImgUrl("/logo/hwlogo2.png")});
	$("#plat_system_title").html(_this.platParams.platProduct.productName);
};
PlatFunc.prototype.menu = function(){
	var _this = this;
	//var prefixUrl = platParams.filesServerVisit+"/theme/" + productParams.theme;
	$.each($(".menu_img_t"),function(i,n){
	   $(n).attr({src:$.getImgUrl($(n).attr("imgURL"))});
	});
	
	$("#logout_menu_img").attr({"src":$.getImgUrl("/menu/left_tuichu.png")});
    $(".menu-toggle").attr({"src" : $.getImgUrl("/menu/ic_caidan.png")}).bind("mouseover", function() {
		$(this).attr({"src" : $.getImgUrl("/menu/ic_caidan_press.png"),"title":"点击可伸缩菜单栏"});
	}).bind("mouseout", function() {
		$(this).attr({"src" : $.getImgUrl("/menu/ic_caidan.png")});
	}).bind("click", function() {
		var sidebar = $("#sidebar");
		var mainContent = $(".main-content");
		if (sidebar.css("display") == "none") {
			$(".imgc").css({"right":"350px"})
			sidebar.css({"display" : "block"}).removeClass("menu-min");
			mainContent.css({"margin-left" : "190px"});
		} else {
			$(".imgc").css({"right":"400px"})
			sidebar.css({"display" : "none"}).removeClass("menu-min");
			mainContent.css({"margin-left" : "0px"});
		}
	});
};

PlatFunc.prototype.contact = function(){
	var _this = this;
	//_this["contactRoot"] = {};  //用来存通讯录常用联系人和通知消息的节点，消息数
	var navSearch = $("#nav-search");
	var panel = $("#contact-content_panel");
	if(platParams.hasContact && platParams.hasContact === true)
	{
		var opt = {
			pnode:navSearch,
			cnode: panel,
			id:"contact",
			title:"通讯录",
			right:"96px",
			imgUrl:$.getImgUrl("/menu/contacts.png"),
			initEvent:"initContact",
			platFunc:_this
		};
		_this.contactModel = new MessageMenu(opt);
		_this.contactModel.receiveMessage = function(){
			if(_this.ws){
				_this.ws.contact = function(msg){ //接收websorket接收的消息
					if(_this.contactModel.contact){
						var thisContact = _this.contactModel.contact;
						if(thisContact.chatNode.dialog && Object.keys(thisContact.chatNode.cnode).length > 0){ // 当弹框已经打开时
							thisContact.reviceChatMsg(msg);   // 画接收的消息
							if(thisContact.chatNode.cnode[msg.src]){ // 当接收到的消息的人已经在弹框左侧列表中存在
								if(thisContact.chatNode.cnode[msg.src].chatPer.is(":visible") == true){  
								    $.hy_log("弹框存在，接收人在弹框左侧，且停留在接收人当前聊天框",msg);
									_this.contactModel.updateActiveMsg(msg);  // 要将收到的消息更新为已读
								}else{ 
									$.hy_log("弹框存在，接收人在弹框左侧，但停留在非接收人当前聊天框",msg);
									_this.contactModel.integreReviceMsgNum(msg);
									
									thisContact.chatNode.cnode[msg.src]["defaultCount"] = thisContact.chatNode.cnode[msg.src]["defaultCount"]+1;
									thisContact.setLiCount(msg);  // 要将接受到的消息数量在弹框左侧叠加
								}
							}else{  
								$.hy_log("弹框存在，但接收人不在弹框左侧",msg);
								_this.contactModel.integreReviceMsgNum(msg);
							}
						}else{  // 当弹框关闭的时候
						    _this.contactModel.integreReviceMsgNum(msg);
						}
					}
				}
			}
		};
		_this.contactModel.init();
	}
	if(platParams.hasMessage && platParams.hasMessage === true)
	{
		var opt = {
			pnode:navSearch,
			cnode: panel,
			id:"message",
			title:"通知消息",
			right:"28px",
			imgUrl:$.getImgUrl("/menu/message.png"),
			initEvent:"initMessage",
			platFunc:_this
		};
		_this.messageModel = new MessageMenu(opt);
		_this.messageModel.receiveMessage = function(){
			if(_this.ws){
				_this.ws.addFriend = function(msg){ //接收websorket接收的消息
					//$.hy_log("########addFriend########",msg);
					_this.messageModel.dealNoticeMsg(msg);
				};
				
				_this.ws.deleteFriend = function(msg){ //接收websorket接收的消息
					//$.hy_log("#######deleteFriend#########",msg);
					_this.messageModel.dealNoticeMsg(msg);
				};
				
				_this.ws.delGroupMember = function(){//删除群组成员
					//$.hy_log("#######delGroupMember#########",msg);
					_this.messageModel.dealNoticeMsg(msg);
				}
				
				_this.ws.addCustomGroup = function(msg){ //创建群组活添加成员
					//$.hy_log("#######addCustomGroup#########",msg);
					_this.messageModel.dealNoticeMsg(msg);
				};
				
				_this.ws.modifyGroup = function(){//修改群组
					//$.hy_log("#######modifyGroup#########",msg);
					_this.messageModel.dealNoticeMsg(msg);
				}
				
				_this.ws.quitGroup = function(){//退出群组
					//$.hy_log("#######quitGroup#########",msg);
					_this.messageModel.dealNoticeMsg(msg);
				}
			};
		};
		_this.messageModel.init();
	}
	/**
	 * 查询历史未读消息数
	 */
    _this.reviceMsgNum(opt);
};

// 画已接收的历史消息数 
PlatFunc.prototype.reviceMsgNum = function(opts){
	var _this = this;  
	var pp = {
		url:CONSTANTS.GETMSG_COUNT,
		data:{},
		success:function(res){
			if(res.code == "0"){
				if(res.obj){
					if(_this.messageModel)
					{
						_this.messageModel.defaultCount = res.obj.noticeCount;
						_this.messageModel.setCount();
					}
					if(_this.contactModel)
					{
						_this.contactModel.defaultCount = res.obj.commonCount;
						_this.contactModel.setCount();
					}
					if(res.obj.list.length > 0){
						if(_this.contactModel.contact.contactTree.treeLi.procNewMsg){
						   _this.contactModel.contact.contactTree.treeLi.procNewMsg(res.obj.list);
						}
					}
				}
			}
		}
	};
	$._ajax(pp);
}

PlatFunc.prototype.initMeetingDialog = function(opts){
	var opt = {
		id : opts.id,
		title : opts.title,
		width : opts.width? opts.width:1610,
		height : opts.height? opts.height:720
	};
	opt.beforeunload = function(){
		opts.beforeunload && opts.beforeunload();
	}
	var dia = $.openDialog(opt);
	
	var root = $("#"+opts.id);
	var playWarp = $("<div/>").css({"float":"left",width: opts.width? opts.width-330:"1280px",height: "100%"}).attr("id",opts.playDivId);
	var rightWarp = $("<div/>").css({"float":"left",width: "330px",height:"100%" ,"text-align":"left"});
	var userList = $("<div/>").css({width: "100%",height:opts.height?opts.height-70:"650px" ,"text-align":"left","overflow-y": "auto"}).attr("id",opts.userDivId);
	var rightTitle =  $("<div/>").css({width: "100%px",height:"30px" ,"line-height":"30px",background:"#e2edfe",color: "#3e89fa"}).html("人员列表");
	var userBtn = $("<div/>").css({width: "100%px",height:"40px","padding-top": "10px"});
	rightWarp.append(rightTitle).append(userList).append(userBtn);
	root.append(playWarp).append(rightWarp);
	opts.root= userBtn;
	this.initUserMeetBtn(opts);
	return dia;
}

PlatFunc.prototype.initUserMeetBtn = function(opts){
	var root = opts.root;
	opts.btnObj = {};
	var btnList = [{
		"name":"退出会议","id":"quitBtn",type: "join",func:"quitFunc",cssStyle:{"padding": "6px","color": "#fff",background: "#ff6464","border-radius": "5px"}
	},{
		"name":"结束会议","id":"stopBtn",type: "host",func:"stopFunc",cssStyle:{"padding": "0 6px","color": "#fff",background: "#3e89fa","border-radius": "5px"}
	},{
		"name":"邀请","id":"inviteBtn",type: "host",func:"inviteFunc",cssStyle:{"padding": "0 6px","color": "#fff",background: "#3e89fa","border-radius": "5px"}
	},{
		"name":"录像","id":"startRecordBtn",type: "host",func:"startRecordFunc",cssStyle:{"padding": "0 6px","color": "#fff",background: "#3e89fa","border-radius": "5px"}
	},{
		"name":"停止录像","id":"stopRecordBtn",type: "host",func:"stopRecordFunc",cssStyle:{"padding": "0 6px","color": "#fff",background: "#3e89fa","border-radius": "5px","display": "none"}
	}]
	$.each(btnList, function(i, e){
		if(e.type == opts.type){
			var cs = {"float": "right","margin-right": "10px","cursor": "pointer",height: "28px","line-height": "28px"};
			$.extend(cs,e.cssStyle);
			var btn = $("<div/>").css(cs).html(e.name);
			btn.bind("click", function(){
				opts[e.func] && opts[e.func]();
			});
			opts.btnObj[e.id] = btn;
			root.append(btn);
		}
	});
}

PlatFunc.prototype.startMeeting = function(param){
	var startMeet;
	var dialogparam = {
		id: "startMeeting_dialog",
		beforeunload:function(meet){
			dialogparam.stopRecordFunc();
			startMeet.stopMeeting();
		},
		title: param.strMeetingName,
		playDivId: "meetingPalyer",
		userDivId:"meetingUsers",
		type:"host",
		stopFunc: function(){
			if(startMeet.meetDialog){
				startMeet.meetDialog.close()
			}
		},
		inviteFunc: function(){
			startMeet.initInviteDialog();
		},
		startRecordFunc: function(){
			startMeet.beginRecord(function(json){
				if(json.nResultCode == 0){
					if(dialogparam.btnObj){
						if(dialogparam.btnObj.startRecordBtn){
							dialogparam.btnObj.startRecordBtn.hide();
						}
						if(dialogparam.btnObj.stopRecordBtn){
							dialogparam.btnObj.stopRecordBtn.show();
						}
					}
				}
			});
		},
		stopRecordFunc:function(){
			startMeet.stopRecord(function(json){
				if(json.nResultCode == 0){
					if(dialogparam.btnObj){
						if(dialogparam.btnObj.stopRecordBtn){
							dialogparam.btnObj.stopRecordBtn.hide();
						}
						
						if(dialogparam.btnObj.startRecordBtn){
							dialogparam.btnObj.startRecordBtn.show();
						}
					}
				}
			});
		}
	};
	var dia = this.initMeetingDialog(dialogparam);
	//console.error("!!!!!!!!",dialogparam);
	var info = {
		pnode: "meetingPalyer",
		userPanel:"meetingUsers",
		meetingInfo: param
	}
	startMeet = HYSDK.callMeeting(info);
	startMeet.meetDialog = dia;
	startMeet.start(function(res){
		 
	});
}

function MessageMenu(opts){
    this.opts = opts;
    this.defaultCount = 0;
    // this.init();
    // this.receiveMessage();  
}

MessageMenu.prototype.receiveMessage = function(){
    var _this =this;
    var ws = _this.opts.platFunc.ws;
	if(ws){
		/*ws.contact = function(msg){ //接收websorket接收的消息
		    if(_this.chatNode.dialog && Object.keys(_this.chatNode.cnode).length > 0){
				_this.reviceChatMsg(msg);  // 当弹框已经打开时
		    }else{
				console.log("########noDialogUserNum########",msg);
				_this.dealChatMsgNum(msg);  // 当弹框没有打开时
			};
		};*/
		ws.addFriend = function(msg){ //接收websorket接收的消息
		    console.log("==########addFriend########==",msg);
			_this.dealNoticeMsg(msg);
		};
		ws.deleteFriend = function(msg){ //接收websorket接收的消息
		    console.log("==#######deleteFriend#########==",msg);
			_this.dealNoticeMsg(msg);
		};
	};
	$.hy_error(_this,"=========MessageMenu==this==================");
}

MessageMenu.prototype.integreReviceMsgNum = function(msg){
	var _this = this;
	_this.defaultCount = _this.defaultCount+1;
	_this.setCount();
	//根据sorket推送过来的消息更新消息数
	var treeLiData = _this.contact.contactTree.treeLi.thisTree.treeData[msg.src];
	treeLiData["defaultCount"] = treeLiData["defaultCount"]+1;
	_this.contact.contactTree.treeLi.setCount(msg);
}

MessageMenu.prototype.updateActiveMsg = function(msg){
	var _this = this;
	var opt = {
	   "okFun":"updateActiveMsgStatus",
	   "data":{
		    "target":msg.target,
			"src":msg.src,
			"smsType":"chat"
	   }
	};
	_this.noticeUpdataFunc(opt);
}
MessageMenu.prototype.updateActiveMsgStatus = function(res){
	var _this = this;
	if("0" == res.code){
		$.hy_log("更新收到的消息成功");
	}
}
MessageMenu.prototype.init = function(){
	var _this = this;
	var opts = _this.opts;
	var a = $("<a/>").addClass("msg-top-menu").attr({"id":opts.id + "ImgBtn","title":opts.title});
	var img = $("<img/>").attr({src:opts.imgUrl}).css({width:22,height:22});
	var span = $("<span/>").addClass("msg_num").hide();
	opts.pnode.append(a.append(img).append(span));
	_this.countSpan = span;
	
	var wHeight = $(window).height();
	var div = $("<div/>").addClass("sys-setting-container").attr({"id":opts.id + "ImgBtn-container"}).css({"height":wHeight-125});
	var div1 = $("<div/>").addClass("pull-left width-100").css({"min-height": "inherit","height": "100%","overflow-y":"auto"});
	var img = $("<img/>").attr({"src":$.getImgUrl("/images/up.png")}).css({width: "14px",height: "7px", float: "right","margin-right": opts.right,"margin-top": "-7px"});
	var div3 = $("<div/>").addClass("mail-list-c03-content").css({"min-height": "inherit","height": "100%"}).attr({"id":opts.id + "ImgBtn-content"});
	var commonDiv = $("<div/>").addClass("common-result-scroll");
	opts.cnode.append(div.append(div1.append(img).append(div3.append(commonDiv))));
	_this.opts.topNode  = a;
	_this.opts.conNode = commonDiv;	
	if(opts.initEvent)
	{
		try{
			//$.hy_error(111,opts.initEvent);
			_this[opts.initEvent](); // initContact initMessage
		}catch(e)
		{
			$.hy_error(opts.initEvent,e);
		}
	}
	_this.scrollParams = $.extend({},CONSTANTS.MESSAGE_SCROLL_GRID_PARAMS);
	_this.scrollParams.winH = $("#messageImgBtn-container").height();//页面可视区域高度
	a.bind("click",function(){
	    div.siblings(".sys-setting-container").hide();
	    div.toggle();
		var func = $(this).attr("id")+"Func";
		_this[func](); //messageImgBtnFunc  contactImgBtnFunc
	});
	_this.receiveMessage();  
};
MessageMenu.prototype.setCount = function(){
	var _this = this;
	if(_this.defaultCount > 99){
	     _this.countSpan.show().html("99+");
	}else if(_this.defaultCount > 0 ){
	    _this.countSpan.show().html(_this.defaultCount);
	}else{
	   	_this.countSpan.hide();
    }
	if(_this.contact){
		_this.contact.defaultCount = _this.defaultCount;
		_this.contact.setCount();
	}
}
// 修改消息状态
MessageMenu.prototype.noticeUpdataFunc = function(opt){
   var _this = this;
   var pp = {
		url:CONSTANTS.UPDATE_STATUS,
		data:opt.data,
		success:function(res){
			if(opt["okFun"]){
			   _this[opt["okFun"]](res); //updateMsgStatus   updateReadedMsg
			}	
		}
   };
   $._ajax(pp);	
}
// 点击处理通知消息
MessageMenu.prototype.messageImgBtnFunc = function(){
	var _this = this;
	var opt = {
	   // "smsType":"notice",
	   "okFun":"updateMsgStatus",
	   "data":{
		   "target":platParams.loginUser.userCode,
		   "smsType":"notice"
	   }
	};
	_this.noticeUpdataFunc(opt);
}

MessageMenu.prototype.updateMsgStatus = function(res){
   var _this = this;
   if("0" == res.code){
		_this.defaultCount = 0;
		_this.setCount();
   }
   var pageNum = _this.scrollParams["pageNum"];
   var pageSize = _this.scrollParams["pageSize"];
   var t = _this.scrollParams["scrollT"];
   var p = _this.scrollParams["scrollP"];
   var winH = _this.scrollParams["winH"];
	$(".common-result-scroll",$("#messageImgBtn-container")).empty();
	var widgetBox = $("<div/>").addClass("widget-box").css({"border":"none"});
	var widgetBody = $("<div/>").addClass("widget-body");
	var widgetMain = $("<div/>").addClass("widget-main no-padding");
	var scrollContent = $("<div/>").addClass("scroll-content");
	var noData = $("<div/>").addClass("nodata").hide();
	$(".common-result-scroll",$("#messageImgBtn-container")).append(widgetBox.append(widgetBody.append(widgetMain.append(scrollContent))));
	_this.getGridScrollData(pageNum,pageSize,scrollContent);
	$("#messageImgBtn-container").scroll(function(){
		var pageH = $(".common-result-scroll",$("#messageImgBtn-container")).height(); //当前文档总高度
		var scrollT = $("#messageImgBtn-container").scrollTop();  //滚动条top的值	
		var bottomH = (pageH - winH - scrollT) / winH;  // 当前所滚动位置到底部距离
		p = $(this).scrollTop(); //顶部距离
		if(t <= p){ // 判断是否下滚  
			if (bottomH < 0.01) {  
				if (pageNum !== _this.scrollParams["pageCount"]) {
					pageNum++;
					_this.getGridScrollData(pageNum,pageSize,scrollContent);
				}else{ //没有数据
					// $(".nodata").show().html("别滚动了，已经到底了...");
				}
			}
		}
		setTimeout(function(){t = p;},2000);//延时2秒   
	});
}
// 更新已读消息状态
MessageMenu.prototype.updateReadedMsg = function(res){
   var _this = this;
   if("0" == res.code){
	   _this.defaultCount = 0;
	   _this.setCount();
   }
}

//获取分页滚动条中的数据
MessageMenu.prototype.getGridScrollData = function(pageNum,pageSize,root){
	var _this = this;
	var ppp = {
		url:CONSTANTS.PLATSMS_GRID,
		data:{
			"target":platParams.loginUser.userCode,
			"smsType":"notice",
			"pages": {"curPage": pageNum,"pageSize": pageSize},
			"sort":{"field":"id","order":"desc"}
		},
		success:function(ret){
			if("0" == ret.code){
				_this.scrollParams["pageCount"] = ret.pages.pageCount;
				$.each(ret.result,function(j,m){
					var msgContent = JSON2.parse(m.content);
					//var msgDiv = $("<div/>").addClass("notice-msg-content-div").html(msgContent.content);
					var itemDiv = $("<div/>").addClass("itemdiv dialogdiv");
					var itemBody = $("<div/>").addClass("body");
					var itemTime = $("<div/>").addClass("time").html(m.createTime);
					var itemName = $("<div/>").addClass("name").html("通知消息");
					var itemText = $("<div/>").addClass("text").html(msgContent.content);
					itemDiv.append(itemBody.append(itemTime).append(itemName).append(itemText));
					root.append(itemDiv);
				});
			};
		}
	};
	$._ajax(ppp);
}

// 点击处理通讯录消息
MessageMenu.prototype.contactImgBtnFunc = function(){
	var _this = this;
	// $.hy_log("===============contactImgBtnFunc===============",_this);
	//var num = _this["contactRoot"]["contact"]["num"]*1;
	/*if(num > 0){
		if(num > 99){
			//$("#contactTreeImgIDCount").show().html("99+");
			_this.contactList.contactTreeImgID["span"].show().html("99+");
		}else{
			_this.contactList.contactTreeImgID["span"].show().html(num);
			//$("#contactTreeImgIDCount").show().html(num);
		}
		_this.contactList.contactTreeImgID["num"] = num;
	}*/
}

MessageMenu.prototype.initContact = function(){
	var _this = this;
	var opts = _this.opts;
	var params = {
		topNode: opts.topNode,
		conNode: opts.conNode,
		platFunc:_this.opts.platFunc,
		nodeData: [{
			"title": "常用联系人",
			imgUrl: $.getImgUrl("/images/commonUser.png"),
			activeImgUrl: $.getImgUrl("/images/commonUser_click.png"),
			id:"contactTreeImgID",
			active:true,
			initEvent:"drawContactTree"
		},{
			"title": "组织架构",
			imgUrl: $.getImgUrl("/images/ent.png"),
			activeImgUrl: $.getImgUrl("/images/ent_click.png"),
			id:"entTreeImgID",
			initEvent:"drawEntTree"
		},{
			"title": "搜索",
			imgUrl: $.getImgUrl("/images/contact_search.png"),
			activeImgUrl: $.getImgUrl("/images/contact_search_active.png"),
			id:"searchTreeImgID",
			initEvent:"drawSearch"
		}]
	};
	_this.contact = new PLatContact(params);
	_this.contact.init();
};

MessageMenu.prototype.initMessage = function(){
	var _this = this;
};
// 处理收到的通知消息
MessageMenu.prototype.dealNoticeMsg = function(msg){
	var _this = this;
	var node = {"conNode":$("#contactTreeImgID")};
	//$.hy_error(_this,_this);
	_this.opts.platFunc.contactModel.contact.drawContactTree(node);
	if($("#messageImgBtn-container").is(":visible")){
		// 当系统消息框展开显示的时候
		var msgContent = JSON2.parse(msg.content);
		var itemDiv = $("<div/>").addClass("itemdiv dialogdiv");
		var itemBody = $("<div/>").addClass("body");
		var itemTime = $("<div/>").addClass("time").html(msgContent.creatTime); 
		var itemName = $("<div/>").addClass("name").html("通知消息");
		var itemText = $("<div/>").addClass("text").html(msgContent.content);
		itemDiv.append(itemBody.append(itemTime).append(itemName).append(itemText));
		$(".scroll-content").prepend(itemDiv);
		var opt = {
		   //"smsType":"notice",
		   "okFun":"updateReadedMsg",
		   "data":{
			   "target":platParams.loginUser.userCode,
			   "smsType":"notice"
		   }
		};
		_this.noticeUpdataFunc(opt);
	}else{
		// 当系统消息框隐藏的时候
		_this.defaultCount = _this.defaultCount+1;
		_this.setCount();
	}
}

function PLatContact(opts){
	this.topNode = opts.topNode;
	this.conNode = opts.conNode;
	this.nodeData = opts.nodeData;
	this.platFunc = opts.platFunc;
	this.defaultCount = 0;
	this.chatNode = {
		"cnode":{}
	};
}
PLatContact.prototype.init = function(){
	$.hy_log("start excute PLatContact.prototype.init " );
	var _this = this;
	_this.groupMembersObj = {};
	//PLAT.contactList = {};
	_this.ul = $("<ul/>").addClass("co3-maillist-option");
	_this.content = $("<div/>").addClass("co3-maillist-content");
	_this.conNode.append(_this.ul).append(_this.content);
	$.hy_log("============PLatContact===============",_this);
	$.each(_this.nodeData,function(i,n){
	    var li  = $("<li/>").attr({title:n.title}).css({width:100/_this.nodeData.length+"%"});
	    var img = $("<img/>").addClass("co3-maillist-option-img").attr({"src":n.imgUrl,"def":n.imgUrl,"atv":n.activeImgUrl,active:"off"});
		var span = $("<span/>").attr({"id":n.id + "Count"}).addClass("contact_msg_num").html("0").hide();
	    _this.ul.append(li.append(img).append(span));
		_this.countSpan = span;
	    var div = $("<div/>").addClass("mail-list-panel-c03").attr({id:n.id});
	    _this.content.append(div);
	    img.bind("click",function(){
		    div.siblings(".mail-list-panel-c03").hide();
		    div.show();
		    var active = img.attr("active");
		    if("off" == active){
		    	$.each($(".co3-maillist-option-img",_this.ul),function(j,k){
		    	    $(k).attr({active:"off",src:$(k).attr("def")});
		    	});
		    	img.attr({active:"on",src:img.attr("atv")});
		    };
	    });
	   
	    if(n.active && n.active === true){
	   	    img.click();
	    }
	    var params = {
	        topNode:img,
			conNode:div
	    };
	    if(n.initEvent){
		   	try{
		   	 	_this[n.initEvent](params);
		   	}catch(e){
				$.hy_error(e);
			}
	    }
	});	
};

PLatContact.prototype.setLiCount = function(msg){
	var _this = this;
	if(_this.chatNode.cnode[msg.src].defaultCount > 99){
	    _this.chatNode.cnode[msg.src].countSpan.show().html("99+");
    }else if(_this.chatNode.cnode[msg.src].defaultCount > 0 ){
	    _this.chatNode.cnode[msg.src].countSpan.show().html(_this.chatNode.cnode[msg.src].defaultCount);
    }else{
	    _this.chatNode.cnode[msg.src].countSpan.hide();
    }
}

PLatContact.prototype.setCount = function(){
    var _this = this;
    if(_this.defaultCount > 99){
	    _this.countSpan.show().html("99+");
    }else if(_this.defaultCount > 0 ){
	    _this.countSpan.show().html(_this.defaultCount);
    }else{
	    _this.countSpan.hide();
    }
}

PLatContact.prototype.drawConcatTreeAction = function(opt){
	var _this = this;
	var fieldParams = {
		"dynamicResult":{
			"url":CONSTANTS.GETCOMMON_USER,
			"postDynamicParam":[],
			"postStaticData":{}
		},
		"allCheck":false,
		"expand":false,
		"treeHeight":opt.treeHeight ? opt.treeHeight:$("#contactImgBtn-container").height()-30,
		"imgSize":{
			"width":"20px",
			"height":"20px"
		}		
	};
	if(opt.fieldParams){
		$.extend(fieldParams, opt.fieldParams);
	}
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	opt.conNode.empty();
	var opts = {field:field,pnode:opt.conNode};
	_this[opt.treeName] = new PlatTree(opts);
}

PLatContact.prototype.drawContactTree = function(opt){
	var _this = this;
	opt.treeName = "contactTree";
	_this.drawConcatTreeAction(opt);
	
	_this.contactTree.clickEvent = function(params){
		var _self = this;
		if(params.data && params.data.dataType == "contact" || params.data.dataType == "group"){
			//console.log("===========_this.contactTree==============",_self,params,_self.treeData[params.data.id]);
			var pp = {
				//clickExpandType:["user"],
				params:params,
				opts:_this.contactTree.initTreeP
			};
			_this.chatDialog(pp);
		}
	};
};

PLatContact.prototype.refreshContactTree = function(){
	var _this = this;
	var panel = $("#contactTreeImgID");
	var node = {"conNode":panel};
	_this.drawContactTree(node);
}

PLatContact.prototype.drawEntTree = function(opt){
	var _this = this;
	var fieldParams = {
		"dynamicResult":{
			"url":CONSTANTS.GETOS_TREE,
			"postDynamicParam":[],
			"postStaticData":{}
		},
		"allCheck":false,
		"expand":true,
		"treeHeight":$("#contactImgBtn-container").height()-30,
		"hideExpandType":["user"]
	};
	//$.hy_error(fieldParams);
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:opt.conNode};
	_this.osTree = new PlatTree(opts);
	_this.osTree.clickEvent = function(params){
		var pp = {
		    //clickExpandType:["user"],
			params:params,
			opts:opts
		};
		if(params.data && params.data.dataType == "user"){
			_this.chatDialog(pp);
		}
		/*var _my = this;
		_my.msgDialog(pp);*/
	};
	
	//重写展开事件
	/* tree.clickExpendEvent = function(optts){
		var _this = this;
		// console.log("==============",optts)
		if(optts.data && optts.data.dataType == "dep" && optts.data.obj){
			var size = $("li",optts.ul).length;
			if(size<= 0){
				$._ajax({
					"url": "../platuser/getOSUserTree.action",
					"data":{"userDepCode": optts.data.obj.depCode},
					"success": function(ress){
						if(ress.code == 0){
							optts.data.treeList = ress.result;
							optts.data.hasChild = true;
							tree.expendEvent(optts);
						}
					}
				});
			}else{
				tree.expendEvent(optts);
			}
		}else{
			tree.expendEvent(optts);
		}
	} */
};

PLatContact.prototype.drawSearchAction = function(opt){
	var _this = this;
	var btn = $("<button/>").html("搜索");
	opt.conNode.append(
		$("<div/>").css({
			"margin": "10px 0",
			"padding": "0 6px"
		}).append($("<input id="+opt.searchInput+" style='width:80%'/>")).append(btn)
	);
	var fieldParams = {
		"dynamicResult":{
			"url":CONSTANTS.USER_SEARCH,
			"postDynamicParam":[{
				"nodeType": "elementNode",
				"postName": "name",
				"paramNodeName": opt.searchInput,
				"pNodeID": opt.conNode.attr("id")
			}],
			"postStaticData":{}
		},
		"allCheck":false,
		"expand":true,
		"treeHeight":opt.treeHeight ? opt.treeHeight:$("#contactImgBtn-container").height()-30,
		"hideExpandType":["user"]
	};
	
	if(opt.fieldParams){
		$.extend(fieldParams, opt.fieldParams)
	}
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:opt.conNode};
	_this[opt.treeName] = new PlatTree(opts);
	
	btn.bind("click",function(){
	   if(_this[opt.treeName])
	   {
	   	_this[opt.treeName].root.remove();
	   	_this[opt.treeName].init();
	   }
	});
	return _this[opt.treeName];
}

PLatContact.prototype.drawSearch = function(opt){
	var _this = this;
	opt.treeName = "searchTree";
	opt.searchInput = "content_search_username";
	_this.drawSearchAction(opt);
	
	_this.searchTree.clickEvent = function(params){
		var pp = {
		    //clickExpandType:["user"],
			params:params,
			opts:_this.searchTree.initTreeP
		};
		if(params.data && params.data.dataType == "user"){
			_this.chatDialog(pp);
		}
	};
	
};

PLatContact.prototype.chatDialog = function(pp){
	var _this = this;
	// $.hy_log("====chatDialog===this===",_this);
	var params = pp.params.data;
	var data = {
		//url:"../platsms/list.action",
		url:CONSTANTS.GETCONTACT_INFO,
		data:{
			"src":params.id,  //查历史记录，src传对方
			"target":platParams.loginUser.userCode,  //查历史记录，target传自己
			"sort":{"field": "create_time","order":"asc"}
		},
		success:function(ret){
			if(ret.code == "0"){
				if(ret.obj){
					_this.chatNode.cnode[params.id]["chatPer"].empty();
					if(ret.obj.msgList.length > 0){
						$.each(ret.obj.msgList,function(i,n){
							//n.sendType 0 自己发送  1 自己收到
							if(n.sendType == "0"){
								var con = JSON2.parse(n.content);
								var $message = con.content;
								_this.sendMsgFunc($message,pp);
							}else if(n.sendType == "1"){
								_this.reviceChatMsg(n);
							}
						});
					}
					if(ret.obj.userList.length > 0){
						$.each(ret.obj.userList,function(i,n){
							if(n.userCode == platParams.loginUser.userCode){
								//过滤掉自己
							}else{
								_this.chatNode.cnode[params.id]["userDetails"] = n;
							}
						});
						_this.dealUserFriend(pp);
					}
				}
			};
		}
	};
	$._ajax(data);
	if(_this.chatNode && _this.chatNode.dialog){ //判断聊天弹框是否存在，是		
		_this.drawChatNode(pp); 
	}else{
		var chatDialogOpt = {
			id : _this.topNode.attr("id")+"_chatDialog",
			title : "",
			width : 680,
			height : 580,
			lock : false
		};
		var left = $("<div/>").attr("id","chat-list").css({"height":chatDialogOpt.height+25,"width":chatDialogOpt.width*0.3});
		var right = $("<div/>").attr("id","chat-box").css({"height":chatDialogOpt.height+25,"width":chatDialogOpt.width*0.7});
		_this.chatNode = $.extend(_this.chatNode,{
			"dialog":$.openDialog(chatDialogOpt),
			"chatDialogRoot":$("#"+_this.topNode.attr("id")+"_chatDialog"),
			"left":left,
			"right":right
		});
		_this.drawChatNode(pp);
		_this.chatNode.chatDialogRoot.append(left).append(right);
		
		var myD = _this.chatNode.chatDialogRoot.closest(".d-border");
		myD.find(".d-content").css({"padding":"0px"});
	    myD.find(".d-close").remove();
		myD.find(".d-title").parent(".d-titleBar").append(
			$("<a/>").addClass("d-close").css({"top":"1px","cursor":"pointer","color":"#aaa !important"}).html("×").bind("click", function(){
				PLAT.chatDialogConfirm({"msg": "是否关闭所有聊天？","okFun": function(){
					_this.chatNode.dialog.close();
					delete _this.chatNode.dialog;
					if(_this.chatNode.cnode){
						_this.chatNode.cnode = {};
					}
				}});
			})
		);
	}	
};
//处理是否为好友
PLatContact.prototype.dealUserFriend = function(opt){
	var _this = this;
	var params = opt.params.data;
	if(_this.chatNode.cnode[params.id]["userDetails"]){
		var userDetails = _this.chatNode.cnode[params.id]["userDetails"];
		var friendBtn = [{
			"imgUrl":$.getImgUrl('/mailList/shanchu_user.png'),
			"flag":"deleteFriendFunc",
			"cssField":"add-friend"
		},{
			"imgUrl":$.getImgUrl('/mailList/tianjia_user.png'),
			"flag":"addFriendFunc",
			"cssField":"delete-friend"
		}];
		_this.chatNode.cnode[params.id]["addOrDeleteFriendSpan"].empty();
		$.each(friendBtn,function(i,n){
			var imgBtn = $("<img/>").addClass(n.cssField).attr({"src":n.imgUrl,"flag":n.flag});
			imgBtn.bind("click",function(){
				var flag = $(this).attr("flag");
				_this[flag](opt);
			});
			_this.chatNode.cnode[params.id]["addOrDeleteFriendSpan"].append(imgBtn);
		});
		if(userDetails.friend == true){
			$("img[flag='deleteFriendFunc']").show();
			$("img[flag='addFriendFunc']").hide();
		}else{
			$("img[flag='deleteFriendFunc']").hide();
			$("img[flag='addFriendFunc']").show();
		}
	}
}
// 删除好友
PLatContact.prototype.deleteFriendFunc = function(opt){
	var _this = this;
	var params = opt.params.data;
	if(_this.chatNode.cnode[params.id]["userDetails"]){
		var userDetails = _this.chatNode.cnode[params.id]["userDetails"];
		var pp = {
			url:CONSTANTS.DELETE_FRIEND,
			data:{
				"userCode":userDetails.userCode
			},
			success:function(res){
				if(res.code == "0"){
					userDetails["friend"] = false;
					_this.dealUserFriend(opt);
					_this.refreshContactTree();
				}
			}
		};
		$._ajax(pp);
	}
}
// 增加好友
PLatContact.prototype.addFriendFunc = function(opt){
	var _this = this;
	var params = opt.params.data;
	if(_this.chatNode.cnode[params.id]["userDetails"]){
		var userDetails = _this.chatNode.cnode[params.id]["userDetails"];
		var pp = {
			url:CONSTANTS.ADD_FRIEND,
			data:{
				"userCode":userDetails.userCode,
				"friendMark":userDetails.friendMark ? userDetails.friendMark:""
			},
			success:function(res){
				if(res.code == "0"){
					userDetails["friend"] = true;
					_this.dealUserFriend(opt);
					_this.refreshContactTree();
					
				}
			}
		};
		$._ajax(pp);
	}
}

PLatContact.prototype.drawChatNode = function(opt){ 
	var _this = this;
	var params = opt.params.data;
	if(_this.chatNode.cnode[params.id]){
		//当人员已经显示在聊天框左侧时
		_this.chatNode.cnode[params.id]["leftLi"].click();
	}else{
		_this.chatNode.cnode[params.id] = params; //对象的map，key值是唯一的，此处避免了重复数据
		var name = $.substringByPoint(params.name, 15);
		var li = $("<li/>").addClass("chat-user");
		_this.chatNode.cnode[params.id]["leftLi"] = li;
		var img = $("<img/>").addClass("user-img").attr({src:$.getImgUrl(params.img)});
		var span = $("<span/>").addClass("chat-user-name").attr({"title":params.name}).html(name);
		_this.chatNode.cnode[params.id]["leftName"] = span;
		var per = _this.drawChatDiaRight(opt);
		_this.chatNode.cnode[params.id]["chatPer"] = $(".per-chat-wrap",per);
		var closeBtn= $("<img/>").addClass("tree_c03_btns_icon").attr("src", platParams.filesServerVisit+"/theme/" + productParams.theme + "/images/ico_delete.png").bind("click",function(){
				li.remove();
				delete _this.chatNode.cnode[params.id];
				var arr = Object.keys(_this.chatNode.cnode); 
				if(arr.length == 0){
					_this.chatNode.dialog.close();
					delete _this.chatNode.dialog;
				}
				per.remove();
			});
		_this.chatNode.cnode[params.id].closeBtn = closeBtn;
		var div = $("<div/>").addClass("delete-user").append(closeBtn).hide();
		var count = $("<span/>").addClass("c-msg-count").attr({"count": 0,"groupName": "","entCode": ""}).html("0").hide();
		_this.chatNode.cnode[params.id].countSpan = count;
		_this.chatNode.cnode[params.id].defaultCount = 0;
        li.append(img).append(span).append(div).append(count);
		li.bind({
			"mouseover": function(){
				$("div.delete-user",li).show();
				if(!li.hasClass("liactive")){
					li.addClass("mouseon");
				}
			},
			"mouseout": function(){
				$("div.delete-user",li).hide();
				li.removeClass("mouseon");
			},
			"click":function(){
				li.addClass("liactive").siblings().removeClass("liactive");
				per.show().siblings().hide();
				if($(".per-chat-wrap").length > 0){
					$(".per-chat-wrap").scrollTop($(".per-chat-wrap")[0].scrollHeight);
				}
				//count.attr("count", 0).hide(); 
				var contact = _this.contactTree;  //更新通讯录上面消息数量
				var dia = _this.chatNode;  //更新聊天弹框上面消息数量
				if(params.dataType == "contact" || params.dataType == "group"){
					if((contact.treeData && contact.treeData[params.id]) || (dia.cnode && dia.cnode[params.id])){
						var clickLiData = contact.treeData[params.id];
						var clickDiaLiData = dia.cnode[params.id];
						if(clickLiData.defaultCount > 0 || clickDiaLiData.defaultCount > 0){
							var ppp = {
								url:CONSTANTS.UPDATE_STATUS,
								data:{
									"target":platParams.loginUser.userCode,
									"src":params.id,
									"smsType":"chat"
								},
								success:function(res){
									if("0" == res.code){
										_this.defaultCount = _this.defaultCount - clickLiData.defaultCount;
										_this.setCount();  // 更新常用联系人消息数量
										
										_this.platFunc.contactModel.defaultCount = _this.defaultCount;
					                    _this.platFunc.contactModel.setCount();  // 更新通讯录上面常用联系人消息数量
										
										var msg = {"src":params.id};
										_this.contactTree.treeLi.thisTree.treeData[msg.src]["defaultCount"] = 0;
										_this.contactTree.treeLi.setCount(msg);	 // 更新常用联系人人员的消息数量
                                         
										dia.cnode[msg.src]["defaultCount"] = 0;
										_this.setLiCount(msg);  // 更新弹框中人员消息数量										
									}
								}
							};
							$._ajax(ppp);
						}
					}
				}
			}
		});
		_this.chatNode.left.append(li);
		li.click();
	}
}

PLatContact.prototype.drawChatDiaRight = function(opt){
	var _this = this;
	var params = opt.params.data;
	var name = $("<span/>").addClass("user-mark user-name").css({"margin-right":"15px"}).html($.substringByPoint(params.name, 25));
	_this.chatNode.cnode[params.id]["titleName"] = name;
	var addOrDeleteFriendSpan = $("<span/>").addClass("user-friend-span");
	_this.chatNode.cnode[params.id]["addOrDeleteFriendSpan"] = addOrDeleteFriendSpan;
	var dot = $("<span/>").addClass("user-mask-dot").html("...");
	var per = $("<div/>").addClass("per-chat").hide();
	var panel = $("<div/>").addClass("chat-panel").hide();
	var userPanel = $("<div/>").addClass("chat-user-panel").hide();
	
	if(params.dataType == "group"){
		panel.attr("id", params.id+"_modifypanel");
		opt.panel = panel;
		_this.initAddPanel(opt);	
	}else{
		userPanel.attr("id", params.id+"_modifypanel");
		opt.panel = userPanel;
		_this.initCreatePanel(opt);	
	}
	
	var perChatInfo = $("<div/>").addClass("per-chat-info").append(name).append(addOrDeleteFriendSpan).append(dot);
	var perChatContent = $("<div/>").addClass("per-chat-wrap").css({"height":"390px"});
	var toolDiv = $("<div/>").addClass("tool-container-div").css({"border-top":"1px solid rgb(217, 217, 217)",width: "100%",height: "40px"});
	var perChatDiv = $("<div/>").addClass("per-chat-input").css({"height":"80px"});
	var chatInput = $("<textarea/>").attr({"id":params.id+"_chatMesg"}).addClass("chat-input").css({"height":"100%","border":"none"});
	var sendDiv = $("<div/>").addClass("tool-div").css({"height":"30px"});
	_this.sendDiv = sendDiv;
	
	_this.chatOperate(opt); //发送聊天
	_this.toolOperate(opt,toolDiv); //视频，会议，语音等操作
	
	//_this.chatNode["chatPer"] = perChatContent;
	per.append(panel).append(userPanel).append(perChatInfo).append(perChatContent).append(toolDiv).append(perChatDiv.append(chatInput)).append(sendDiv);
	_this.chatNode.right.append(per);
	//this.queryGroupHistoryMsg(perChatContent, data);
	dot.bind("click",function(){
		if(params.dataType == "group"){
			if(panel.is(":visible")){
				panel.hide();
			}else{
				panel.show();
			}
		}else{
			if(userPanel.is(":visible")){
				userPanel.hide();
			}else{
				userPanel.show();
			}
		}
	});
	return per;
}

/**
 * 点击... 类型不是group的的面板
 * @param {} opt
 */
PLatContact.prototype.initCreatePanel = function(opt){
	var _this = this;
	var params = opt.params.data;
	var addBtnWarp = $("<div/>").addClass("create-group-warp").append(
		$("<div/>").addClass("create-group-btn").append($("<img/>").attr("src",$.getImgUrl("/mailList/create.png")))
	).append(
		$("<span>").html("添加")
	).bind("click", function(){
		opt.choosePanelTitle = "创建群组";
		opt.initChooseLeftPanelFun = "drawChooseSearch";
		opt.okFun = "addMenberOrCreateGroup";
		_this.initChooseUserPanel(opt);
	});
	var line = $("<div/>").addClass("create-group-line");
	opt.panel.append($("<div/>").height(80).append(addBtnWarp)).append(line);
	
	var editList = [{
		"title": "昵称",
		"value": params.name,
		"url": CONSTANTS.UPDATE_CONTACT,
		"id":"friendMark",
		"postData": [{
			"postName": "id",
			"paramName": "id",
			"nodeType": "dataValue"
		},{
			"postName": "friendMark",
			"paramNodeName": "friendMark",
			"pNodeID":params.id+"_modifypanel",
			"nodeType": "elementNode"
		}]
	}]
	_this.initEdit({"editList": editList,"root": opt.panel,"params": params}, opt);
}

/**
 * 点击... 类型是group的的面板
 * @param {} opt
 */
PLatContact.prototype.initAddPanel = function(opt){
	var _this = this;
	var params = opt.params.data;
	var addBtnWarp = $("<div/>").addClass("create-group-warp").append(
		$("<div/>").addClass("create-group-btn").append($("<img/>").attr("src",$.getImgUrl("/mailList/create.png")))
	).append(
		$("<span>").html("添加")
	).bind("click", function(){
		var p = {
			"url": CONSTANTS.GROUP_USER,
			"data": {"groupCode": params.id},
			"success": function(res){
				//$.hy_log(JSON2.stringify(res))
				if(res.code == 0){
					_this.groupMembersObj[params.id] = res.result;
					opt.choosePanelTitle = "添加群成员";
					opt.initChooseLeftPanelFun = "drawChooseSearch";
					opt.okFun = "addMenberOrCreateGroup";
					_this.initChooseUserPanel(opt);
				}
			}
		}
		$._ajax(p);
	});
	
	var btnName = "退出群组";
	var f = false;;
	if(params.obj.userCode == platParams.loginUser.userCode){
		btnName = "删除群组";
		f = true;
	}
	var delBtn = $("<div/>").addClass("create-group-warp").append(
		$("<div/>").addClass("create-group-btn").append($("<img/>").attr("src",$.getImgUrl("/mailList/delbtn.png")))
	).append(
		$("<span>").html("删除")
	).bind("click", function(){
		opt.choosePanelTitle = "删除群成员";
		opt.initChooseLeftPanelFun = "drawGroupSearch";
		opt.okFun = "delGroupMember";
		_this.initChooseUserPanel(opt);
	})
	var line = $("<div/>").addClass("create-group-line");
	
	var ddd = $("<div/>").height(80).append(addBtnWarp);
	if(f){
		ddd.append(delBtn);
	}
	opt.panel.append(ddd).append(line);
	
	var editList = [
		{"title": "群名","value": params.name,"url": CONSTANTS.UPDATE_GROUP,"id":"groupName",
			"postData": [{"postName": "groupCode","paramName": "groupCode","nodeType": "dataValue"},
						{"postName": "groupName","paramNodeName": "groupName","pNodeID":params.id+"_modifypanel","nodeType": "elementNode"}]},
		{"title": "我在本群的昵称","value": params.obj.friendMark,"url": CONSTANTS.UPDATE_CONTACT,"id":"friendMark",
			"postData": [{"postName": "id","paramName": "id","nodeType": "dataValue"},
						{"postName": "friendMark","paramNodeName": "friendMark","pNodeID":params.id+"_modifypanel","nodeType": "elementNode"}
						]}]
	
	_this.initEdit({"editList": editList,"root": opt.panel,"params": params}, opt);
	
	opt.panel.append(
		$("<div/>").addClass("group-quit-Btn").html(btnName).bind("click", function(){
			var d = {};
			d.url = CONSTANTS.QUIT_GROUP;
			d.data = {groupCode: params.id,"userCode":platParams.loginUser.userCode};			
			d.success = function(res){
				if(res.code == 0){
					_this.refreshContactTree();
					_this.chatNode.cnode[params.id].closeBtn.click();
				}
			}
			PLAT.chatDialogConfirm({"msg": "确定"+btnName+"？","okFun": function(){
				$._ajax(d);
			}});
		})
	)
}

PLatContact.prototype.initEdit = function(opt, optss){
	var _this = this;
	var editList = opt.editList;
	var root = opt.root;
	var params = opt.params
	$.each(editList, function(i,e){
		var inputD = $("<input/>").attr("id",e.id).val(e.value).hide();
		var imgD = $("<img/>").attr("src", $.getImgUrl("/mailList/editpen.png")).width(14).height(14).hide()
		var spanD = $("<span/>").html(e.value).bind({
			"click": function(e){
				e = e||window.event;
				e.stopPropagation();
				imgD.hide();
				spanD.hide();
				inputD.show();
				inputD.focus();
			},
			"mouseover": function(){
				imgD.show()
			},"mouseleave": function(){
				imgD.hide()
			}
		});
		
		inputD.bind("blur", function(){
			imgD.hide();
			inputD.hide();
			spanD.show();
			var pd = $.getPostParams(e.postData,params.obj);
			var opt11 = {
				"url": e.url,
				"data": pd,
				"success": function(res){
					if(res.code == 0){
						var inputV = inputD.val();
						_this.chatNode.cnode[params.id].leftName.html(inputV);
						_this.chatNode.cnode[params.id].titleName.html($.substringByPoint(inputV, 25));
						
						_this.refreshContactTree();
						
						spanD.html(inputD.val());
					}
				}
			}
			$._ajax(opt11);
		});
		var groupEdit = $("<div/>").addClass("edit-row").append(
			$("<div/>").html(e.title)
		).append(inputD).append(spanD).append(imgD);
		root.append(groupEdit);
	});
}
//画添加删除好友的面板
/**
 * panel 
 * @param {} opt
 */
PLatContact.prototype.initChooseUserPanel = function(opt){
	var _this = this;
	var userInfo = opt.params.data;
	var dialogOpt = {
		id : "createGroupChat",
		title : opt.choosePanelTitle,
		width : 550,
		height : 485,
		lock : true
	};
	var dl = $.openDialog(dialogOpt)
	var root = $("#"+ dialogOpt.id);
	var leftPanel = $("<div/>").addClass("choose-user-warp").attr("id","choose-user-warp").height(485)
	
	//初始化左侧的人员选择树
	_this[opt.initChooseLeftPanelFun]({"conNode": leftPanel,opt: opt});
	
	_this.selectedUser = {};
	var rightPanel = $("<div/>").addClass("selected-user-warp");
	var selectedContent = $("<div/>").height(415).css({"overflow-y": "auto"});
	_this.selectedContent = selectedContent;
	var rightTitle = $("<div/>").height(40).css({"line-height": "40px"}).html("请勾选需要添加的联系人");
	_this.rightTitle = rightTitle;
	var  rightPanelBtn = $("<div/>").addClass("right-panel-btn").append(
		$("<div/>").html("确定").bind("click", function(){
			_this[opt.okFun](opt,dl);
			opt.panel.hide();
			dl.close();
		})
	).append(
		$("<div/>").html("取消").bind("click", function(){
			dl.close();
			opt.panel.hide();
		})
	)
	rightPanel.append(rightTitle).append(selectedContent).append(rightPanelBtn);
	root.append(leftPanel).append(rightPanel);
}

/**
 * 创建群组或者添加群成员的确定按钮的点击事件
 */
PLatContact.prototype.addMenberOrCreateGroup = function(opt){
	var _this = this;
	var list = [];
	var userInfo = opt.params.data;
	var opt = {
		"url": CONSTANTS.CREATE_GROUP,
		"data":{},
		"success": function(res){
			if(res.code == 0){
				_this.refreshContactTree();
			}
		}
	}
	if(userInfo.dataType != "group"){
		list = [{
			"userCode": platParams.loginUser.userCode,
			"friendMark":platParams.loginUser.name
		},{
			"userCode": userInfo.obj.friendUserCode,
			"friendMark":userInfo.obj.userName
		}];
	}else{
		opt.data.groupCode = userInfo.id;
	}
	$(".selected-row",_this.selectedContent).each(function(i, e){
		var info = $(e).data("info");
		
		info = info.obj;
		list.push({
			"userCode": info.friendUserCode,
			"friendMark":info.userName
		});
	});
	opt.data.contactList = list;
	$._ajax(opt);
}

/**
 * 删除群成员
 * @param {} opt
 * @param {} dl
 */
PLatContact.prototype.delGroupMember = function(opt){
	var _this = this;
	var list = [];
	var userInfo = opt.params.data;
	var opt = {
		"url": CONSTANTS.DEL_GROUP_MEMBER,
		"data":{"groupCode": userInfo.id},
		"success": function(res){
			if(res.code == 0){
				_this.refreshContactTree();
			}
		}
	}
	$(".selected-row",_this.selectedContent).each(function(i, e){
		var info = $(e).data("info");
		info = info.obj;
		list.push({
			"userCode": info.friendUserCode,
			"friendMark":info.friendMark
		});
	});
	opt.data.contactList = list;
	if(list.length > 0){
		$._ajax(opt);
	}
}

/**
 * 画新增好友的左侧的树
 * @param {} opt
 */
PLatContact.prototype.drawChooseSearch = function(opt){
	var _this = this;
	//重写树的初始化事件
	PlatTree.prototype.initChooseContact = function(opt1){
		var data = opt1.data;
		var customCheck = opt1.customCheck;
		if(opt1.data.dataType=="group"){
			opt1.li.remove();
		}
		if(opt.opt.params.data.dataType=="group"){
			var l = _this.groupMembersObj[opt.opt.params.data.id];
			if(l){
				$.each(l,function(i, e){
					if(e.userCode == data.id){
						customCheck.attr({"src": $.getImgUrl("/mailList/noselected.png")}).unbind("click");
						return;
					}
				})
			}
		}else{
			if(data.id == platParams.loginUser.userCode ||opt.opt.params.data.id == data.id){
				customCheck.attr({"src": $.getImgUrl("/mailList/noselected.png")}).unbind("click");
			}
		}
		
	}
	opt.treeName = "chooseSearchTree";
	opt.searchInput = "choose_search_username";
	opt.fieldParams = {"customCheckType": ["user"],initEvent:"initChooseContact"}
	opt.treeHeight = 430;
	_this.drawSearchAction(opt);
	
	//默认为常用联系人
	_this.drawConcatTreeAction({
		"conNode":_this.chooseSearchTree.root,
		"treeHeight": 430,
		"treeName":"chooseConcatTree",
		"fieldParams":{"customCheckType": ["contact"],initEvent:"initChooseContact"}
	});
	
	//重写自定义选择框
	_this.chooseConcatTree.customCheckEvent = function(opt){
		var data = opt.data;
		if(opt.customCheck.attr("ttype") == 1){
			var d = $("<div/>").height(30).addClass("selected-row").data("info", data).append(
				$("<img/>").width(24).height(24).attr("src",$.getImgUrl(data.img))
			).append(
				$("<span/>").html(data.name)
			).append(
				$("<img/>").addClass("selected-row-btn").attr("src",$.getImgUrl("/mailList/deluser.png")).bind("click", function(){
					d.remove();
					opt.customCheck.attr({"src": $.getImgUrl("/mailList/weixuanzhong.png"),"ttype":2});
					_this.setSelectTitle();
				})
			)
			_this.selectedContent.append(d);
			opt.selfSelectedNode = d;
			_this.selectedUser[data.id] = {data: data, node: d};
			_this.setSelectTitle();
		}else{
			if(_this.selectedUser[data.id]){
				_this.selectedUser[data.id].node.remove();
				_this.setSelectTitle();
			}
		}
	}
}

PLatContact.prototype.setSelectTitle = function(){
	var _this = this;
	var title = "请勾选需要添加的联系人";
	if($(".selected-row").length > 0){
		title = "已选择"+$(".selected-row").length+"个联系人";
	}
	_this.rightTitle.html(title);
}

/**
 * 画删除群成员左侧的树
 */
PLatContact.prototype.drawGroupSearch = function(opt){
	var _this = this;
	PlatTree.prototype.reorganizeGroupUser = function(msg){
		if(msg.code == 0 && msg.result){
			var  list = [];
			$.each(msg.result, function(i, e){
				list.push({
					"pid": e.groupCode,
					"id": e.friendUserCode,
					"name":e.friendMark,
					"img": e.imgUrl,
					"dataType":"user",
					"selected" : false,
					"hasChild" : false,
					"selectedCount" : 0,
					"noSelectCount" : 0,
					"obj": e
				});
			});
			msg.result = list;
		}
		return msg;
	}

	//重写树的初始化事件
	PlatTree.prototype.initChooseGroup = function(opt1){
		var data = opt1.data;
		var customCheck = opt1.customCheck;
		if(data.id == platParams.loginUser.userCode ||opt.opt.params.data.id == data.id){
			customCheck.attr({"src": $.getImgUrl("/mailList/noselected.png")}).unbind("click");
		}
	}
	var _this = this;
	var btn = $("<button/>").html("搜索");
	opt.conNode.append(
		$("<div/>").css({
			"margin": "10px 0",
			"padding": "0 6px"
		}).append($("<input id="+opt.searchInput+" style='width:80%'/>")).append(btn)
	);
	var fieldParams = {
		"dynamicResult":{
			"url":CONSTANTS.GROUP_USER,
			"postDynamicParam":[{
				"nodeType": "dataValue",
				"postName": "groupCode",
				"paramName": "id"
			}],
			"postStaticData":{}
		},
		"allCheck":false,
		"expand":false,
		"treeHeight":430,
		"customCheckType": ["user"],
		"hideExpandType":["user"],
		"reorganizeData": "reorganizeGroupUser",
		"srcData": opt.opt.params.data,
		"initEvent": "initChooseGroup"
	};
	
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:opt.conNode};
	_this.groupUserTree = new PlatTree(opts);
	
	//重写自定义选择框
	_this.groupUserTree.customCheckEvent = function(opt){
		var data = opt.data;
		if(opt.customCheck.attr("ttype") == 1){
			var d = $("<div/>").height(30).addClass("selected-row").data("info", data).append(
				$("<img/>").width(24).height(24).attr("src",$.getImgUrl(data.img))
			).append(
				$("<span/>").html(data.name)
			).append(
				$("<img/>").addClass("selected-row-btn").attr("src",$.getImgUrl("/mailList/deluser.png")).bind("click", function(){
					d.remove();
					opt.customCheck.attr({"src": $.getImgUrl("/mailList/weixuanzhong.png"),"ttype":2});
					_this.setSelectTitle();
				})
			)
			_this.selectedContent.append(d);
			opt.selfSelectedNode = d;
			_this.selectedUser[data.id] = {data: data, node: d};
			_this.setSelectTitle();
		}else{
			if(_this.selectedUser[data.id]){
				_this.selectedUser[data.id].node.remove();
				_this.setSelectTitle();
			}
		}
	}
}

PLatContact.prototype.chatOperate = function(opt){
	var _this = this;
	var j = $("<div/>").addClass("send-tip").css({"background-image":'url('+$.getImgUrl("/images/tankuang.png")+')',"width":"120px","height":"38px"}).hide();
	var params = opt.params.data;
	var opt = opt;
	var sendBtn = $("<button/>").attr({"id":params.id+"_sendBtn"}).addClass("tool-sand-btn").html("发送(S)");
	sendBtn.hover(function(){
		$(this).addClass("send-bt-active");
	},function(){
		$(this).removeClass("send-bt-active");
	}).click(function(){
		//console.log("wwwwwwwwwwwwwwwwwwwwww",_this,opt)
		if(params.dataType == "group"){ //群组
			var $message = $("#"+params.id+"_chatMesg").val();
			if($.trim($message).length > 0){
				try{
					var sendList = [];
					var pp = {
						"smsType" : "chat",  
						"contentType":1, //contentType 1 文字 2 图片 3 视频 4 语音
						"src":platParams.loginUser.userCode,
						"content" : JSON2.stringify({"contentType":1,"content":$message}), //contentType 1 文字 2 图片 3 视频 4 语音
						//"targets" : [params.id],
						"target" : params.id
					};
					var setContent = {
						url:CONSTANTS.SEND_GROUP_MSG,
						data:pp,
						success:function(res){
							if(res.code == "0"){
								_this.sendMsgFunc($message,opt);
							}
						}
					};
					//alert(JSON2.stringify(setContent))
					$._ajax(setContent);
				}catch(e){
					console.log("聊天发送失败"+e);
				}
			}else{
				j.show().html("不能发送空白信息");
				clearTimeout(j.time);
				j.time = setTimeout(function(){
					j.hide();
				}, 3000);
			}
		}else{  //非群组
			$.each($("img",_this.chatNode.cnode[params.id]["addOrDeleteFriendSpan"]),function(i,n){
				if($(n).is(":visible")){
					var friendStatus = $(n).attr("flag");
					if(friendStatus == "addFriendFunc"){
						j.show().html("请先添加好友");
						clearTimeout(j.time);
						j.time = setTimeout(function(){
							j.hide();
						}, 3000);
					}else if(friendStatus == "deleteFriendFunc"){
						var $message = $("#"+params.id+"_chatMesg").val();
						if($.trim($message).length > 0){
							try{
								var sendList = [];
								/*var setContent = {
									msgType : "chat",
									src : platParams.loginUser.userCode,
									content : $message,
									targets : [params.id]
								};
								PLAT.ws.sendMsg(setContent);*/
								var pp = {
									"smsType" : "chat",  
									"contentType":1, //contentType 1 文字 2 图片 3 视频 4 语音
									"src":platParams.loginUser.userCode,
									"content" : JSON2.stringify({"contentType":1,"content":$message}), //contentType 1 文字 2 图片 3 视频 4 语音
									"targets" : [params.id],
									"target" : params.id
								};
								var setContent = {
									url:CONSTANTS.SEND_MSG,
									data:pp,
									success:function(res){
										if(res.code == "0"){
											_this.sendMsgFunc($message,opt);
										}
									}
								};
								$._ajax(setContent);
							}catch(e){
								console.log("聊天发送失败"+e);
							}
						}else{
							j.show().html("不能发送空白信息");
							clearTimeout(j.time);
							j.time = setTimeout(function(){
								j.hide();
							}, 3000);
						}
					}
				}
			})
		}
	});
	
	//通过键盘发送消息
	document.onkeyup = function(event) {
		event = event || window.event;
		var code = event.keyCode || event.which || event.charCode;
		if(code === 13 &&  event.ctrlKey){ 
		    //var visibleDiv = $("#chat-box .per-chat:visible");
		    //params.id+"_sendBtn"
			sendBtn.click();
		}
	};
	_this.sendDiv.append(j).append(sendBtn);
}

//接受消息
PLatContact.prototype.reviceChatMsg = function(msg){
	var _this = this;
	var mmsg = JSON2.parse(msg.content);
	$.each(_this.chatNode.cnode,function(jj,mm){
		if(msg.src == jj){
			var text;
			if(mmsg.contentType == "1"){ //contentType 1 文字 2 图片 3 视频 4 语音
				text = $("<pre/>").text(mmsg.content);
			}
			var acceptMsg = $("<div/>").addClass("accept-msg");
			var msgContent = $("<span/>").addClass("accept-content").append(text);
			var msgIcon = $("<i/>").append($("<img/>").attr("src", $.getImgUrl('/images/left.png'))).addClass("accept-mesg-before");
			var chatUser = $("<img/>").addClass("chat-accept-user-img").attr({"src": $.getImgUrl(mm.img)});
			acceptMsg.append(msgContent).append(msgIcon).append(chatUser);
			mm.chatPer.append(acceptMsg);
		}
	});
}
//发送消息
PLatContact.prototype.sendMsgFunc = function($message,opt){
	var _this = this;
	var params = opt.params.data;
	var text = $("<pre/>").text($message);
	var sendMsg = $("<div/>").addClass("send-msg");
	var msgContent = $("<span/>").addClass("send-content").append(text);
	var msgIcon = $("<i/>").append($("<img/>").attr("src", $.getImgUrl('/images/right.png'))).addClass("send-mesg-before");
	var chatUser = $("<img/>").addClass("chat-send-user-img").attr({"src": $.getImgUrl(platParams.loginUser.imgUrl)});
	sendMsg.append(msgContent).append(msgIcon).append(chatUser);
	//_this.sendDiv.siblings("div.per-chat-wrap").append(sendMsg);
	_this.chatNode.cnode[params.id]["chatPer"].append(sendMsg);
	$("#"+params.id+"_chatMesg").val("");
	$("#"+params.id+"_chatMesg").focus();
	//_this.sendDiv.siblings("div.per-chat-wrap").scrollTop(_this.sendDiv.siblings("div.per-chat-wrap")[0].scrollHeight);
	_this.chatNode.cnode[params.id]["chatPer"].scrollTop(_this.chatNode.cnode[params.id]["chatPer"][0].scrollHeight);
}

PLatContact.prototype.toolOperate = function(opt,pnode){
	var _this = this;
	//$.hy_log("============toolOperate============",_this,opt);
	var toolList = {
		"leftTools":[{
			"filedName":"发送文件",
			"imgUrl":$.getImgUrl('/images/shangchuanwenjian.png'),
			"clickEvent":"sendFile"
		}],
		"rightTools":[{
			"filedName":"语音对讲",
			"imgUrl":$.getImgUrl('/images/yuyinhujiao.png'),
			"clickEvent":"voiceCalling"
		},{
			"filedName":"视频对讲",
			"imgUrl":$.getImgUrl('/images/shipinhujiao.png'),
			"clickEvent":"videoCalling"
		},{
			"filedName":"会议对讲",
			"imgUrl":$.getImgUrl('/images/shipinhuiyi.png'),
			"clickEvent":"meetingCalling"
		}]
	};
	var leftTool = $("<div/>").addClass("tools-left-div");
	var rightTool = $("<div/>").addClass("tools-right-div");
	
	$.each(toolList.leftTools,function(i,n){
		var icon = $("<img/>").attr({"src":n.imgUrl,"title":n.filedName}).css({"margin":"5px 10px","cursor":"pointer"});
		icon.bind("click",function(){
			if(n.clickEvent){
				_this[n.clickEvent](opt);
			};
		});
		leftTool.append(icon);
	});
	$.each(toolList.rightTools,function(i,n){
		var icon = $("<img/>").attr({"src":n.imgUrl,"title":n.filedName}).css({"margin":"5px 10px","cursor":"pointer"});
		icon.bind("click",function(){
			if(n.clickEvent){
				_this[n.clickEvent](opt);
			};
		});
		rightTool.append(icon);
	});
	pnode.append(leftTool).append(rightTool);
}
//发送文件
PLatContact.prototype.sendFile = function(opt){
	alert("发送文件")
}
//语音对讲
PLatContact.prototype.voiceCalling = function(opt){
	alert("语音对讲")
}
//视频对讲
PLatContact.prototype.videoCalling = function(opt){
	var dialogOpt = {
		id : 11111,
		title : "对讲",
		width : 680,
		height : 655,
		lock : false
	};
	$.openDialog(dialogOpt)
	$("#"+ dialogOpt.id).append('<div class="canvasDiv layui-bg-black" id="videos-container"  style="height:300px;"></div>');
	
	var config = {
		videoId: "videos-container",
		width: 640,
		height: 480,
		framerate: 25,
		bitrate: 600,
		samplerate: 16000,
		channel: 1,
		audiobw: 48000,
		audiopt: 97,
		videopt: 96,
		audiocodec: 12,
		videocodec: 1,
		vsample: 90000,
		bitpersample: 16,
		enableAEC: false,
		useDefaultDevices: true
	}
	HY_RTC.hysdk.startCapture(config,function(res){
	   $.hy_error(res,res);
	});
}
//会议对讲
PLatContact.prototype.meetingCalling = function(opt){
	try{
		var _this = this;
		if(opt.params.data){
			var data  = opt.params.data;
			var param = {
				"strMeetingName": platParams.loginUser.name+"发起的会议",
				"strMeetingDesc":platParams.loginUser.name+"发起的会议",
				"lstMeetingUserInfo":[],
				"isRecord":1,
				"mediaMode":1
			}
			if(data.dataType == "user"||data.dataType == "contact"){//组织架构、搜索 //好友
				param.lstMeetingUserInfo.push({
					"strUserName": data.name,
					"strUserDomainCode":opt.params.data.obj.domainCode,
					"strUserID": data.id,
					"nDevType":1
				});
				PLAT.startMeeting(param);
			}else if(data.dataType == "group"){//群组
				$._ajax({
					"url":CONSTANTS.GROUP_USER,
					"data":{"groupCode": data.obj.groupCode},
					"success": function(res){
						if(res.code == 0){
							$.each(res.result,function(i, e){
								param.lstMeetingUserInfo.push({
									"strUserName": e.friendMark,
									"strUserDomainCode":e.domainCode,
									"strUserID": e.userCode,
									"nDevType":0
								})
							})
						}
						//csSdk.startMeeting(param); 
						PLAT.startMeeting(param);
					}
				});
			}
			
			
		}
	}catch(e){alert(e)}
}

/**
 * PlatGrid
 * ==============================================================================================
 */
function PlatGrid(opts)
{
	this.result = opts.result;
	this.pnode = $(opts.pnode);
	this.pages = {"curPage": 1,"pageSize": 10};    
//	this.initGrid();
};

PlatGrid.prototype.initGrid = function(){
	var _this = this;
	_this.pnode.empty();
	var table = $("<table/>").addClass("table table-responsive table-bordered grid");
	_this.thead = $("<thead id='form_head'/>");
	_this.tbody = $("<tbody/>");
	_this.tfoot = $("<tfoot/>");
	_this.table = table;
	table.append(_this.thead).append(_this.tbody).append(_this.tfoot);
	_this.pnode.append(table);
	_this.init();
	_this.searchBtn();
};
/**
 * 初始化分页查询界面
 */
PlatGrid.prototype.init = function(){
	var _this = this;
	_this.queryForm = $("<form/>");
	_this.buttons = $("<div class='btn-group buttons'/>");
	_this.thead.append($("<tr/>").append($("<th/>").append($("<div/>").append(_this.queryForm))
	.append($("<div class='head_button' style='margin-top:15px;'/>").append(_this.buttons))));
	$.each(_this.result.blist,function(i,n){
		//$.hy_error(n.buttonType);
	    if("query" == n.buttonType){
	    	_this.drawQueryButton(n);
	    	
	    }else if("head" == n.buttonType){
	    	_this.drawTableHead(n);
	    }else if("option" == n.buttonType && n.buttonLevel==1 ){
	    	_this.drawOpreateBtn(n);
	    }
	});
};
/**
 * 画查询按钮
 * @param {} params
 * @param {} n
 */
PlatGrid.prototype.drawQueryButton = function(n){
	var _this= this;
	var params= {};
	if(n.buttonParams)
	{
		params = JSON2.parse(n.buttonParams);
	}
	
	var button = $("<button/>").attr({"id":n.buttonCode});
	if(params.css)
	{
		button.addClass(params.css);
	}
	if(params.img)
	{
		button.append($("<i/>").addClass(params.img));
	}
	 //隐藏查询头
	if(params.hideFormHead && params.hideFormHead === true){
		_this.thead.hide();
	}
	button.append(n.buttonName);
	_this.buttons.append(button);
	button.bind("click",function(){
	    _this[n.enableDialog](n);
	});
	if(n.enableDialog == "searchBtn"){
	    _this.searchButton = button;
	    _this.queryBtnParams = params;
	   
		_this.queryForm.attr({"id":n.buttonCode});
		_this.drawQueryCriteria(n);
		if(params.paging && params.paging === true){
			_this.drawPaging();
		}
		if(params.timingQuery && params.timingQuery == true){
			clearInterval(_this.timingQueryTimer);
			var time = params.queryTime ?params.queryTime: 5000;
			_this.timingQueryTimer = setInterval(function(){
				button.click();
			},time);
		}
	}
};

/**
 * 画查询界面表头
 * @param {} params
 * @param {} n
 */
PlatGrid.prototype.drawTableHead = function(data){
	var _this= this;
	_this.tbody.empty();
	//$.hy_error(data,"PlatGrid.prototype.drawTableHead");
	var thead = $("<thead/>").addClass("grid-thead");
	var tbody = $("<tbody/>").addClass("grid-line");
	_this.tableHead= thead;
	_this.tableLine = tbody;
	var gridTableHead = $("<div/>").addClass("grid-table-head");
	gridTableHead.append($("<table/>").addClass("table table-bordered").append(thead).append(tbody));
	_this.tbody.append($("<tr/>").append($("<td/>").append($("<div/>").attr({"id":"grid-body","class":"grid-body"}).append(gridTableHead))));
	var params= {};
	if(data.buttonParams)
	{
		params = JSON2.parse(data.buttonParams);
		_this.tableHeadParams = params;
	}
	var check= $("<div/>").addClass("fa fa-square-o").append("<span data-role='selectAll'></span>").bind("click",function(){
		if (check.hasClass("fa-square-o")) {
			check.removeClass("fa-square-o").addClass("fa-check-square");
            $(".record_data_check", _this.tableLine).removeClass("fa-square-o").addClass("fa-check-square");
        } else {
        	check.addClass("fa-square-o").removeClass("fa-check-square");
            $(".record_data_check", _this.tableLine).addClass("fa-square-o").removeClass("fa-check-square");
        }
	});
	var allCheck = $("<th id='check_all' style='width: 30px;'/>").append(check);
	_this.allCheckBtn = check;
	var tr = $("<tr/>");
	if(_this.tableHeadParams && _this.tableHeadParams.allCheck === true)
	{
		tr.append(allCheck);
	}
	if(_this.tableHeadParams && _this.tableHeadParams.serial === true)
	{
		tr.append($("<th style='width: 50px;'/>").append("序号"));
	}
	
	_this.tableHead.append(tr);
	_this.headField = data.flist;
	_this.headBtnData = data;
	if(_this.headField)
	{
		//$.hy_error(_this," _this.headField ");
		$.each(_this.headField,function(i,n){
		  if("0" == n.display)
		  {
		  	var perColum = $("<th/>").attr("columType", n.fieldName).html(n.fieldLabel);
		  	if(n.fieldParams)
		  	{
		  		var json = JSON2.parse(n.fieldParams);
		  		if(_this.tableHeadParams && _this.tableHeadParams.sort === true && json.sort)
		  		{
		  			perColum.append(_this.getSortImg(json.sort));
		  		}
		  	}
		  	tr.append(perColum);
		  }
		});
		if(data.blist && data.blist.length > 0)
		{
			var perColum = $("<th/>").css({"width":90*data.blist.length}).attr("columType", "option").html("操作");
		  	if(_this.tableHeadParams.coustomField === true)
		  	{
		  		perColum.append(_this.getSettingField());
		  	}
		  	tr.append(perColum);
		}
	}
};

PlatGrid.prototype.drawBlockTableHead = function(data){
	var _this= this;
	_this.tbody.empty();
	var tbody = $("<div/>").height($(window).height()-360).width($("#datagrid").width()).css({"overflow-y":"auto","padding-top":"32px"});
	_this.tableLine = tbody;
	_this.tbody.append(tbody);
	var params= {};
	if(data.buttonParams)
	{
		params = JSON2.parse(data.buttonParams);
		_this.tableHeadParams = params;
	}
	_this.headField = data.flist;
	_this.headBtnData = data;	
};

PlatGrid.prototype.drawOpreateBtn = function(data){
	
}

PlatGrid.prototype.getSortImg = function(data){
	var _this = this;
	var sortImg = $("<div/>").addClass("fa fa-cloud-download table_sort_img");
	sortImg.bind("click",function(){
	   if(sortImg.hasClass("fa-cloud-download"))
	   {
	   	   sortImg.removeClass("fa-cloud-download");
	   	   sortImg.addClass(" fa-cloud-upload");
	   	   _this.sort = {"field": data.field + " asc"};
	   }else
	   {
	   	   sortImg.removeClass("fa-cloud-upload");
	   	   sortImg.addClass("fa-cloud-download");
	   	   _this.sort = {"field": data.field + " desc"};
	   }
	   _this.searchBtn();
	});
	return sortImg;
}
PlatGrid.prototype.getSettingField = function(){
	var _this = this;
	var sortImg = $("<div/>").addClass("fa fa-cog table_sort_img");
	sortImg.bind("click",function(){
	    var opt = {
			id : "setting",
			title : "自定义表头",
			width : 400,
			height : 260
		};
		var dia = $.openDialog(opt);
		var openSettingDialog = $("<div/>").addClass("open-setting-dialog").css({"height":"220px"});
		var content = $("<div/>").addClass("setting-content").css({"height":"200px","border":"1px solid #90C2E4","overflow-y":"auto","text-align":"left"});
		var buttons = $("<div/>").addClass("btn-group buttons").css({"margin-top":"20px"});
		var settingUl = $("<ul/>").addClass("setting-ul");
		if(_this.headField){
			var newHeadField = [];
			newHeadField =JSON.parse(JSON.stringify( _this.headField));
			$.each(newHeadField,function(i,n){
				var settingLi = $("<li/>");
				var check = $("<img/>").attr({"src":n.display == "1"? $.getImgUrl("/images/weigouxuan.png") : $.getImgUrl("/images/gouxuan.png")});
				check.bind("click",function(){
					if(n.display == "0"){
						check.attr({"src": $.getImgUrl("/images/weigouxuan.png")});
						n.display = "1";
					}else{
						check.attr({"src":  $.getImgUrl("/images/gouxuan.png")});
						n.display = "0";
					}
				});
				var label = $("<span/>").html(n.fieldLabel);
				settingUl.append(settingLi.append(check).append(label));
				
			});
			var backBtn = $("<button/>").addClass("btn btn-danger btn-white").css({"margin-right":"5px"}).append($("<i/>").addClass("fa fa-trash-o btn-white")).append("取消");
			var confirmBtn = $("<button/>").addClass("btn btn-white btn-info").append($("<i/>").addClass("glyphicon glyphicon-plus btn-white")).append("保存");
			confirmBtn.bind("click",function(){
				var pp = _this.headBtnData;
				pp.flist = newHeadField;
				_this.drawTableHead(pp);
				dia.close();
				_this.searchBtn();
			});
			backBtn.bind("click",function(){
				dia.close();
			});
			$("#setting").append(openSettingDialog.append(content.append(settingUl)).append(buttons.append(backBtn).append(confirmBtn)));
		};
	});
	return sortImg;
}

/**
 * 画查询条件
 * @param {} data
 */
PlatGrid.prototype.drawQueryCriteria = function(data){
	var _this = this;
	var opts = {btnParams:data,pnode:_this.queryForm};
	if(data.srcData){
		opts.srcData = data.srcData;
	}
	var element = new DrawElement(opts);
};
PlatGrid.prototype.searchBtn = function(){
	var _this = this;
	if(_this.queryBtnParams)
	{
		$.showLoading();
		var params = _this.queryForm.serializeObject();
		if(_this.queryBtnParams.postStaticData)
		{
			$.extend(params,_this.queryBtnParams.postStaticData);	
		}
		if(_this.sort)
		{
			params.sort = _this.sort;
		}
		else if(_this.queryBtnParams && _this.queryBtnParams.sort)
		{
			params.sort = _this.queryBtnParams.sort;
		}
		params.pages = _this.pages;
		//$.hy_error(_this,"executor searche button ! ");
		var opts = {url:_this.queryBtnParams.url,data:params,success:function(res){
				_this.tableLine.empty();
				_this.allCheckBtn.removeClass("fa-check-square-o fa-check-square").addClass("fa-square-o");
			if(res.code == 0){
			    _this.resPages = res.pages;
			    if(_this.queryBtnParams && _this.queryBtnParams.paging && _this.queryBtnParams.paging === true){
					_this.setPages();
				}
			    $.each(res.result,function(i,n){
			   	    //$.hy_error(n);
					var tr = $("<tr/>");
					if(_this.tableHeadParams && _this.tableHeadParams.allCheck === true)
					{
						var attr = {
							"id": n.id,
							"data-role": "indexCheckbox",
							"data-value": n.id,
							"indexvalue": "0"
						};
						var check = $("<div/>").data("fieldData", n).addClass("fa fa-square-o record_data_check").attr(attr).append($("<span/>").attr(attr));
						check.bind("click",function(){
						    if (check.hasClass("fa-square-o")) {
								check.removeClass("fa-square-o");
								check.addClass("fa-check-square");
					        } else {
					        	check.addClass("fa-square-o");
					        	check.removeClass("fa-check-square");
					        }
					        
					        if($(".fa-check-square", _this.tableLine).length == _this.pages.pageSize){
					        	_this.allCheckBtn.removeClass("fa-check-square-o fa-square-o").addClass("fa-check-square");
					        }else if ($(".fa-check-square", _this.tableLine).length < _this.pages.pageSize){
					        	_this.allCheckBtn.removeClass("fa-square-o fa-check-square").addClass("fa-check-square-o");
					        }else{
					        	_this.allCheckBtn.removeClass("fa-check-square-o fa-check-square").addClass("fa-square-o");
					        }
						});
						var td = $("<td/>");
						//$.hy_error(_this);
						if(_this.queryBtnParams.enableCheck)
						{
							//$.hy_error($.getConditions(_this.queryBtnParams.enableCheck,n));
							if($.getConditions(_this.queryBtnParams.enableCheck,n) === true)
							{
								//$.hy_log("@@@@"+JSON2.stringify(_this.queryBtnParams.enableCheck))
								//td.append(check);
								$.hy_log(" 过滤掉不能选择的记录。"+JSON2.stringify(n));
							}
							else
							{
								td.append(check);
							}
						}else
						{
							td.append(check);
						}
						tr.append(td);
					}
					if(_this.tableHeadParams && _this.tableHeadParams.serial === true)
					{
						var td = $("<td/>").append(i+1);
						tr.append(td);
					}
					$.each(_this.headField, function(idx, node) {
						if(node.display == 0)
						{
							var res = $.render(n,node);
							var perTd = $("<td/>").addClass(node.fieldStyle).attr({
	                            "title": res.title,
	                            "hyVisibleSwitch": node.fieldName
	                         }).append(res.value);
							tr.append(perTd);
						}
					});
					if(_this.headBtnData.blist && _this.headBtnData.blist.length>0)
					{
				    	var perTd = $("<td/>");
				    	var btns = $("<div class='btn-group buttons'/>");
						var opt = {
					    	 buttons:btns,
					    	 srcData:n
				    	};
						$.each(_this.headBtnData.blist,function(idx,node){
							if($.getConditions(node.enableCheck,n) === true)
							{
								//td.append(check);
								$.hy_log(" 过滤掉不能选择的记录。"+JSON2.stringify(n));
							}
							else
							{
					    	 	_this.drawOptionButton(opt,node);
							}
						});
						tr.append(perTd.append(btns));
					}
					_this.tableLine.append(tr);	
				});
				if(_this.tableHeadParams && _this.tableHeadParams.background)
				{
					$("tr:odd", _this.tableLine).css({"background":_this.tableHeadParams.background});
				}else
				{
					$("tr:odd", _this.tableLine).addClass("table-tr-odd"); //.css({"background":"#F5F5F5"})
				}
				$.hideLoading();
			}else{
				$.hy_error(_this.queryBtnParams.url+"  参数： "+JSON2.stringify(params)+" 结果: "+JSON2.stringify(res),"查询接口异常： ");
			}
		}};
		$._ajax(opts);
	}
};

PlatGrid.prototype.blockSearchBtn = function(){
	var _this = this;
	if(_this.queryBtnParams)
	{
		$.showLoading();
		var params = _this.queryForm.serializeObject();
		if(_this.queryBtnParams.postStaticData)
		{
			$.extend(params,_this.queryBtnParams.postStaticData);	
		}
		if(_this.sort)
		{
			params.sort = _this.sort;
		}
		else if(_this.queryBtnParams && _this.queryBtnParams.sort)
		{
			params.sort = _this.queryBtnParams.sort;
		}
		params.pages = _this.pages;
		var opts = {url:_this.queryBtnParams.url,data:params,success:function(res){
			if(res.code == 0){
				_this.tableLine.empty();
			    _this.resPages = res.pages;
			    if(_this.queryBtnParams && _this.queryBtnParams.paging && _this.queryBtnParams.paging === true){
					_this.setPages();
				}
				var blockWidth = (_this.tableLine.width()-160)/4,blockHeight = 270;
				if(_this.tableHeadParams && _this.tableHeadParams.block){
					blockWidth = _this.tableHeadParams.block.width?_this.tableHeadParams.block.width:"25%";
					blockHeight = _this.tableHeadParams.block.height?_this.tableHeadParams.block.height:270;
				}
				
			    $.each(res.result,function(i,n){
			    	var blockDiv = $("<div/>").addClass("grid-block").width(blockWidth).height(blockHeight);
			    	var blockTitle = $("<div/>").addClass("grid-block-title");
			    	var blockContent = $("<div/>").addClass("row grid-block-content");
			    	if(_this.headBtnData.blist){
			    		blockContent.height(blockHeight-72);
			    	}else{
			    		blockContent.height(blockHeight-44);
			    	}
					blockDiv.append(blockTitle).append(blockContent);
					_this.tableLine.append(blockDiv);
					$.each(_this.headField, function(idx, node) {
						if(node.display == 0)
						{
							var res = $.render(n,node);
							var nodeP;
							if(node.fieldParams){
								nodeP = JSON2.parse(node.fieldParams);
								if(nodeP.type){
									nodeP.flag = true;
								}
								if(nodeP.initValue){
									n[node.fieldName] = nodeP.initValue;
									res = $.render(n,node);
								}
							}
							if(nodeP && nodeP.flag){
								if(nodeP.type == "title"){
									var titled =$("<span/>").addClass("Tstauts").html(res.value);
									if(nodeP.cssStyle){
										titled.css(nodeP.cssStyle)
									}
									blockTitle.append(titled);
								}else if(nodeP.type == "noFieldName"){
									var row = $("<div/>").addClass(node.fieldStyle);
									var rowCont = $("<div/>").html(res.value);
									if(nodeP.height){
										rowCont.height(nodeP.height);
									}
									row.append(rowCont);
									blockContent.append(row);
								}
							}else{
								var row = $("<div/>").addClass(node.fieldStyle).attr({
									"title": res.title,
									"hyVisibleSwitch": node.fieldName
								});
								var rowTitle = $("<div/>").html(node.fieldLabel);
								var rowCont = $("<div/>").html(res.value).css({"word-wrap": "break-word","word-break": "break-all"}).addClass("firstPlace");
								row.append(rowTitle).append(rowCont);
								blockContent.append(row);
							}
						}
					});
					
					if(_this.headBtnData.blist && _this.headBtnData.blist.length>0){
				    	var blockBtns = $("<div/>").addClass("grid-block-btns btn-group buttons");
						var opt = {
					    	buttons:blockBtns,
					    	srcData:n
				    	};
						$.each(_this.headBtnData.blist,function(idx,node){
							if($.getConditions(node.enableCheck,n) === true)
							{
								$.hy_log(" 过滤掉不能选择的记录。"+JSON2.stringify(n));
							}
							else
							{
					    	 	_this.drawOptionButton(opt,node);
							}
						});
						blockDiv.append(blockBtns);
					}
			    });
				$.hideLoading();
			}else{
				$.hy_error(_this.queryBtnParams.url+"  参数： "+JSON2.stringify(params)+" 结果: "+JSON2.stringify(res),"查询接口异常： ");
			}
		}};
		$._ajax(opts);
	}
};

PlatGrid.prototype.drawPaging = function(){
	var _this = this;
	_this.pageNo = 5;
	var firstPage = $("<li data-role='firstPage'><a>首页</a></li>");
	var prev = $("<li data-role='prev'><a>上一页</a></li>");
	var role_prev = $("<li data-role='role_prev' style='display: none;'><a>...</a></li>");
	var role_next = $("<li data-role='role_next' style='display: none;'><a>...</a></li>");
	var next = $("<li  data-role='next'><a>下一页</a></li>");
	var lastPage = $("<li  data-role='lastPage'><a >尾页</a></li>");
	var refresh = $("<li  data-role='refresh'><a >刷新</a></li>");
	_this.tfootul = $("<ul/>").addClass("pagination");
	_this.tfootul.append(firstPage).append(prev).append(role_prev).append(role_next).append(next).append(lastPage).append(refresh);
	var span1 = $("<span>当前显示：第 </span>");
	_this.span2 = $("<span data-role='start-record'>0</span>");
	_this.span3 = $("<span data-role='end-record'>0</span>");
	_this.span4= $("<span data-role='total-record'>0</span>");
	//_this.span5= $("<span data-role = 'per-number'>10</span>");
	var select = $("<select id='choicePerNumber' style='margin: 0 2px;'></select>");
	_this.span6 = $("<span data-role='page-count'>0</span>");
	var records = $("<div/>").addClass("records");
	
	records.append(_this.span1).append(_this.span2).append("-").append(_this.span3).append("条记录, 共 ").append(_this.span4);
	records.append(" 条记录. 每页显示").append(select).append(" 条, ").append("总共 ").append(_this.span6).append(" 页。");
	var div = $("<div/>").addClass("records-num").append($("<div/>").addClass("btn-group pages").append(_this.tfootul));
	var td = $("<td/>").css({"padding":"0 8px"}).append(records).append(div);
	var tr = $("<tr/>").append(td);
	_this.tfoot.append(tr);
	
	if(_this.queryBtnParams && _this.queryBtnParams.hideRecords){
		records.hide();
		div.css({"float": "right"})
	}
	
	var sarray = [5,10,20,30,40,50,100];
	for(var i=0;i<sarray.length;i++)
	{
		select.append($("<option/>").attr({value:sarray[i]}).html(sarray[i]));
	}
	select.val(_this.pages.pageSize);
	select.bind("change",function(){
	  _this.pages.pageSize = select.val();
	  _this.searchBtn();
	});
	$("li", _this.tfootul).bind("click",function(event) {
		var type = $(this).attr("data-role");
		if (type == "next") {
			_this.pages.curPage = _this.pages.curPage * 1 + 1;
			if(_this.pages.curPage > _this.resPages.pageCount)
			{
				_this.pages.curPage = _this.resPages.pageCount
			}
		} else if (type == "prev") {
			_this.pages.curPage = _this.pages.curPage * 1 - 1;
			if(_this.pages.curPage < 1)
			{
			    _this.pages.curPage = 1;
			}
		} else if (type == "firstPage") {
			_this.pages.curPage = 1;
		} else if (type == "lastPage") {
			_this.pages.curPage = _this.resPages.pageCount;
		}else if (type == "refresh") {
			
		}
		_this.searchBtn();
	});
};
PlatGrid.prototype.setPages = function(){
	var _this = this;
	//$.hy_error(_this.resPages);
	_this.span6.html(_this.resPages.pageCount);
	_this.span2.html((_this.resPages.curPage-1)*_this.pages.pageSize +1);
	var endPage = _this.resPages.curPage*_this.pages.pageSize;
	if(endPage > _this.resPages.totalCount)
	{
		endPage = _this.resPages.totalCount;
	}
	_this.span3.html(endPage);
	_this.span4.html(_this.resPages.totalCount);
	//_this.span5.html(_this.pages.pageSize);
	$("li[data-role='pageNo']", _this.tfootul).remove();
	var p = $.Div(_this.resPages.curPage - 1, _this.pageNo);
    var c = _this.resPages.curPage % _this.pageNo;
    if (c == 0) {
        p = p + c;
    }
	//$.hy_error(p,c); 
	var temp = 0;
	for (var i = 1; i <= _this.pageNo; i++) {
        var idx = p * _this.pageNo  + i;
        temp = idx;
        if(i == 1)
        {
        	if(idx > _this.pageNo)
        	{
	        	$("li[data-role='role_prev']", _this.tfootul).show();
        	}else
        	{
        		$("li[data-role='role_prev']", _this.tfootul).hide();
        	}
        }       
        var pn = $("<li data-role='pageNo' data-value='" + idx + "'><a>" + idx + "</a></li>");
        $("li[data-role='role_next']", _this.tfootul).before(pn);
        if (idx >= _this.resPages.pageCount) {
            break;
        }
    }
    if(temp < _this.resPages.pageCount)
    {
    	$("li[data-role='role_next']", _this.tfootul).show();
    }else
    {
    	$("li[data-role='role_next']", _this.tfootul).hide();
    }
    $("li[data-role='pageNo'][data-value='"+_this.resPages.curPage+"']", _this.tfootul).addClass("active");
	$.each($("li[data-role='pageNo']", _this.tfootul),function(i,n){
	      $(n).bind("click",function(){
			_this.pages.curPage = $(n).attr("data-value");
			_this.searchBtn();
	    })
	});
};
/**
 * buttonType //openDialogBtn弹窗类型deleteBtn删除按钮
 * @param {} data btn按钮的属性
 * @param {} opts
 */
PlatGrid.prototype.childQueryType = function(data,opts){
	var _this = this;
	if(!opts){
		opts = {}
	}
	opts.srcData = data.srcData;
	if(data.buttonParams){
		var btnP = JSON2.parse(data.buttonParams);
		_this[btnP.buttonType](data,opts);
	}else{
		_this.openDialogBtn(data,opts);//默认为弹窗类型
	}
}

PlatGrid.prototype.openDialogBtn = function(data,opts){
	var _this = this;
	var params = {};
	if(data.buttonParams)
	{
		params = JSON2.parse(data.buttonParams);
	}
	var opt = {
		id : data.buttonCode + "_open",
		title : data.buttonName,
		width : params.width,
		height : params.height,
		lock : true
	};
	if(params.dialog)
	{
		opt.width = params.dialog.width;
		opt.height = params.dialog.height;
		opt.lock = params.dialog.lock;
		if(params.dialog.zIndex){
			opt.zIndex = params.dialog.zIndex
		}
	}
	var dialog = $.openDialog(opt);
	var row = $("<div/>").addClass("row").css({"height":opt.height,"margin-left":"0px","margin-right":"0px"});
	var form = $("<form >").attr({"id":data.buttonCode +"_form"}).append(row);	
	var buttons = $("<div class='btn-group buttons' style='display:none;'/>");
	var dialogDiv = $("#"+data.buttonCode + "_open");
	dialogDiv.append(form).append(buttons);
	var ops = {btnParams:data,pnode:row};
	if(opts)
	{
		ops.srcData = opts.srcData;
	};
    var element = new DrawElement(ops);
	if(params.clickEvent){
		_this[params.clickEvent](ops);
	}
    if(data.blist)
    {
    	var optss = {
	    	form:form,
	    	buttons:buttons,
	    	dialog:dialog,
            dialogBtn:data,
			opts:opts
    	};
		if(data.blist.length > 0){
			row.css({"height":opt.height-40});
			buttons.css({"height":"60px"}).show();
			$.each(data.blist,function(i,n){
				_this.drawDialogButton(optss,n);
			});
		}
    }	
}

//删除按钮
PlatGrid.prototype.deleteBtn = function(data){ //_this[n.enableDialog](n)
	var _this = this;
	var params = {};
	if(data.buttonParams){
		params = JSON2.parse(data.buttonParams);
	}
	var list = [];
	$.each($(".fa-check-square",".grid-line"),function(idx,line){
		list.push({"id":$(line).attr("data-value")});
	});
	if(list.length > 0 ){
		var confirm = $.confirm("确认要删除选中的记录吗？", function () { 
			var opt = {url:params.url,data:list,success:function(msg){
				confirm.close();
				_this.searchBtn();
				if(msg.code == 0 ){
					_this.allCheckBtn.click();
					$.resultDialog("操作成功！",{showContinueBtn:false});
				}else{
					$.resultDialog("操作失败！" + msg.desc,{showContinueBtn:false});
				} 
			}};
			$._ajax(opt);
		},function(){
			 
		});
	}else{
		$.alert("请选择需要删除的记录！");
	}
}
PlatGrid.prototype.drawDialogButton = function(opts,data){
	var _this= this;
	var params= {};
	if(data.buttonParams)
	{
		params = JSON2.parse(data.buttonParams);
	}
	var button = $("<button/>").attr({"id":data.buttonCode});
	if(params.css)
	{
		button.addClass(params.css);
	}
	if(params.img)
	{
		button.append($("<i/>").addClass(params.img));
	}
	button.append(data.buttonName);
	if(data.display && data.display == 1){
		button.hide();
	}
	opts.buttons.append(button);
	//var formData = opts.form.serializeObject();
	button.bind("click",function(){
	    _this[data.enableDialog](opts,data);
	});
};

//操作类型按钮
PlatGrid.prototype.drawOptionButton = function(opts,data){
	var _this= this;
	//$.hy_error(data);
	var params= {};
	if(data.buttonParams)
	{
		params = JSON2.parse(data.buttonParams);
	}
	var button = $("<button/>").attr({"id":data.buttonCode});
	if(params.css)
	{
		button.addClass(params.css);
	}
	if(params.img)
	{
		button.append($("<i/>").addClass(params.img));
	}
	button.append(data.buttonName);
	opts.buttons.append(button);
	var srcData = opts.srcData;
	if(params){
		if(params.showModel){
			var f = 1;
			$.each(params.showModel,function(k,m){
				// 大于
				if(m.type == "greater"){
					if(srcData[m.element] > m.value){
					   f = 2;
					}
				}
				// 小于
				else if(m.type == "less"){
					if(srcData[m.element] < m.value){
					   f = 2;
					}
				}
				// 不等于
				else if(m.type == "unequal"){
					if(srcData[m.element] == m.value){
					   f = 2;
					}
				}else if(srcData[m.element] != m.value){
					f = 2;
				}
			});
			if(f == 1){
			   button.attr({"disabled":"disabled"})
			}
		}
	}
	
	button.bind("click",function(){
	    _this[data.enableDialog](data,opts);
	});
};
PlatGrid.prototype.cancelDialog = function(opts,data){
	var _this= this;
	//$.hy_error(opts);
	opts.dialog.close();
};
PlatGrid.prototype.saveDialog = function(opts,data){
	var _this= this;
	var json = {};
	if(data.buttonParams)
	{
		json = JSON2.parse(data.buttonParams);
	}
	var datas = opts.form.serializeObject();
	_this.getTreeResult(opts,datas);
	var opt = {url:json.url,data:datas,success:function(msg){
		
		if(msg.code == 0 ){
			var okObj = "";
			if(json.afterClickOkFun){
				okObj = {
					onOK: function(){
					 	_this[json.afterClickOkFun](data, msg,datas);
					}
				}
			}
			json.afterSuccessFun && _this[json.afterSuccessFun](data, msg,datas);
        	if(msg.desc && msg.desc.length>0){
        		$.resultDialog(msg.desc,opts.form,okObj);
        	}else{
        		$.resultDialog("操作成功！",opts.form,  okObj);
        	}
        	_this.searchBtn();
		}else{
            // $.operateTip({"msg": "操作失败," + msg.desc, "width": "150px"});
			$.resultDialog(msg.desc,opts.form)
        }		     
	}};
	
	if($.lvxh_form_validation(data,opts.dialogBtn)){//加上校验
	    $._ajax(opt);
	}
};
PlatGrid.prototype.helpBtn = function(opts,data){
	var _this = this;
	if(data.buttonParams){
		var init = JSON2.parse(data.buttonParams);
		window.open($.getImgUrl(init.url))
	} 
}

PlatGrid.prototype.gridDialog = function(opts,data){
	var _this = this;
	var params = {};
	$.hy_error(opts);
	if(opts.buttonParams)
	{
		params = JSON2.parse(opts.buttonParams);
	}
	var opt = {
		id : opts.buttonCode + "_open",
		title : opts.buttonName,
		width : params.width,
		height : params.height,
		lock : true
	};
	if(params.dialog)
	{
		opt.width = params.dialog.width;
		opt.height = params.dialog.height;
		opt.lock = params.dialog.lock;
	}
	var dialog = $.openDialog(opt);
	var dialogDiv = $("#"+opts.buttonCode + "_open").height(opt.height);
    var t = opts.blist;
    if(t)
    {
    	$.each(t,function(i,n){
    	    if(n.enableDialog == "searchBtn"){
				n.buttonType = "query";
				if(data.srcData){
					n.srcData = data.srcData;
				}
    	    }else if(n.enableDialog == "childQueryType"){
				n.buttonType = "query";
				if(data.srcData){
					n.srcData = data.srcData;
				}
    	    }else if(n.enableDialog == "childHead"){
				n.buttonType = "head";
			}
    	});
    }
	var params  = {"result":{blist:t,flist:[]},pnode:dialogDiv};
	var grid = new PlatGrid(params);
	grid.initGrid();
};

//自定义
PlatGrid.prototype.coustomDialog = function(opts,data){
	var _this= this;
	var srcData = null;
	if(data)
	{
		srcData = data.srcData;
	}
	var params= {};
	if(opts.buttonParams){
		params = JSON2.parse(opts.buttonParams);
		if(params.coustomFunc){
			_this[params.coustomFunc](opts,srcData);
		}
		if(params.afterSuccessFun){
			_this[params.afterSuccessFun](opts,data);
		}
	}else if(data.buttonParams){
		params = JSON2.parse(data.buttonParams);
		if(params.coustomFunc){
			_this[params.coustomFunc](opts,srcData);
		}
		if(params.afterSuccessFun){
			_this[params.afterSuccessFun](opts,data);
		}
	}
};

PlatGrid.prototype.getTreeResult = function(opts,datas){
	$.each($("div[elementtype='platTree']",opts.form),function(i,n){
	    var obj = $(n).data("treeData");
	    var key = $(n).attr("name");
	    if(obj){
		    var arrays = [];
			$.each(obj,function(idx,nodes){
				if(nodes.selected === true)
				{
					arrays.push(nodes);
				}
			});
		    datas[key]= arrays;
	    }
	});
}

//自定义
PlatGrid.prototype.treeButton = function(data,oldData){
	var _this= this;
	var params = {};
	if(data.buttonParams)
	{
		params = JSON2.parse(data.buttonParams);
	}
	var opt = {
		id : data.buttonCode + "_open",
		title : data.buttonName,
		width : params.width,
		height : params.height,
		lock : true
	};
	if(params.dialog)
	{
		opt.width = params.dialog.width;
		opt.height = params.dialog.height;
		opt.lock = params.dialog.lock;
	}
	var dialog = $.openDialog(opt);
	$("#"+opt.id).css({"height":opt.height,"text-align": "left"});
	var fieldParams = {
		"dynamicResult":{
			"url":CONSTANTS.GETBTN_TREE,
			"postDynamicParam":[],
			"postStaticData":{}
		},
		"allCheck":false,
		"expand":true,
		"treeHeight":500
	};
	//$.hy_error(fieldParams);
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:$("#"+data.buttonCode + "_open")};
	var tree = new PlatTree(opts);
	tree.clickEvent = function(params){
		if(params.data.dataType == "button"){
			var newBtn = $.extend({}, data);
			newBtn.buttonCode = data.buttonCode+"_child";
			newBtn.buttonParams = JSON2.stringify({"dialog":JSON2.parse(data.buttonParams).childDialog});
			_this.openDialogBtn(newBtn,{"srcData":params.data.obj});//默认为弹窗类型
		}
	};
};

//进入会议
PlatGrid.prototype.enterMeeting = function(opts,srcData){
	var list = [];
	var param = {
		"serviceCode": srcData.serviceCode,
		"userList":[],
		"meetingDomainCode":srcData.meetingDomainCode,
		"meetingID":srcData.meetingId,
		"meetingName": srcData.meetingName,
		"mediaMode":srcData.meetingVoiceIntercom
	}
	$._ajax({
		"url":CONSTANTS.MEETING_USERLIST,
		"data":{
			"meetingDomainCode":srcData.meetingDomainCode,
			"meetingID":srcData.meetingId
		},
		"success": function(res){
			if(res.code == 0){
				$.each(res.result, function(i, e){
					list.push({
						"name": e.joinUserName,
						"domainCode":e.meetingJoinDomainCode,
						"userCode": e.meetingJoinUserCode,
						"type":0
					});
				});
			}
			list.push({
				"name": platParams.loginUser.name,
				"domainCode":JSON2.parse(platParams.loginUser.entParams).domainCode,
				"userCode": platParams.loginUser.userCode,
				"type":0
			});
			param.userList = list;
			csSdk.enterMeeting(param); 
		}
	});
}

//新增采集点
PlatGrid.prototype.selectCamera = function(data,opts){
	var _this = this;
	var params = {};
	var sie = new SieDevDialog({btn:data, "treeLevelByLevel":true,srcData:opts.srcData});
	//新增设备后的操作
	PlatGrid.prototype.afterAddNode = function(data, msg,postData){
		_this.searchButton.click();
	}
	sie.init();
	return sie;
}

//修改采集点
PlatGrid.prototype.modifyCamera = function(opts,srcData){
	var _this = this;
	var opt = {
		srcData: srcData
	}
	var sie = _this.selectCamera(opts, opt);
	var newD ={}
	newD.domainCode = srcData.domainCode;
	newD.deviceCode = srcData.devCode;
	newD.channelCode = srcData.videoChannelCode;
	newD.strStreamCode = srcData.videoStreamCode;
	
	newD.videoPlayer = sie.mainPlay.players[0];
	newD.mainPlay = sie.mainPlay;
	SieDevDialog.prototype.palyRtspVideo(newD);
}

/**
 * PlatGrid
 * ==============================================================================================
 */
function DrawElement(opts)
{
	//$.hy_error(opts);
	this.btnParams = opts.btnParams;
	this.pnode = opts.pnode;
    this.srcData = opts.srcData;
    this.labelStyle = opts.labelStyle?opts.labelStyle:"";
    this.tempNode = {};
	this.initElement();
};
DrawElement.prototype.initElement = function(){
	var _this =this;
	if(_this.btnParams.flist.length > 0){
		$.each(_this.btnParams.flist,function(i,n){
			if(n.enable == 0)
			{
				//$.getElement(data,n,_this.tform);		
				//$.hy_error(n);
				try{
				    _this[n.fieldType](n);
				}catch(e)
				{
					$.hy_error(n.fieldType,e);
				}
			}
		});
	}
};
DrawElement.prototype.table = function(field){
	var _this =this;
	var element= $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	if(field.fieldParams)
	{
		var json = JSON2.parse(field.fieldParams);
		element.css({"width":"100%",height:json.height,"border":"1px solid #dcebf7","overflow-y": "auto"});
		var temp = $.profileInfoRow(field,element);
		if(field.display && field.display == 1)
		{
			temp.hide();
		}
		_this.pnode.append(temp);
		var thead = $("<thead/>").addClass("grid-thead");
		var tbody = $("<tbody/>").addClass("grid-line");
		var gridTableHead = $("<div/>").addClass("grid-table-head");
		gridTableHead.append($("<table/>").addClass("table table-bordered").append(thead).append(tbody));
		element.append($("<div/>").attr({"id":"grid-body-child","class":"grid-body"}).append(gridTableHead));
		var tr = $("<tr/>");
		if(true === json.serial)
		{
			tr.append($("<th style='width: 45px;'/>").append("序号"));
		}
		thead.append(tr);
		var headField = json.head;
		if(headField)
		{
			$.each(headField,function(i,n){
			  	var perColum = $("<th/>").attr("columType", n.fieldName).html(n.fieldLabel);
			  	tr.append(perColum);
			});
			if(json.dynamicResult){
			    var q = $.getPostParams(json.dynamicResult.postDynamicParam,_this.srcData);
			    q = $.extend(q,json.dynamicResult.postStaticData);
			    var opt = {url:json.dynamicResult.url,data:q,success:function(msg){
				    if(msg.result && msg.result.length > 0){
				    	$.each(msg.result,function(i,n){
							var tr = $("<tr/>");
							if(true === json.serial)
							{
								var td = $("<td/>").append(i+1);
								tr.append(td);
							}
							$.each(headField, function(idx, node) {
								if(node.display == 0)
								{
									var res = $.render(n,node);
									var perTd = $("<td/>").addClass(node.fieldStyle).attr({
			                            "title": res.title,
			                            "hyVisibleSwitch": node.fieldName
			                         }).append(res.value);
									tr.append(perTd);
								}
							});
							tbody.append(tr);	
						});
					}	
				}};
			    $._ajax(opt);		 		    
		    }
		}
	}
};
DrawElement.prototype.select = function(field){
	var _this =this;
	var element;
	if(_this.tempNode[field.fieldName])
	{
		element = _this.tempNode[field.fieldName].element;
		element.empty();
	}
	else
	{  
	 	element = $("<select/>").attr({"name" : field.fieldName,"id" : field.fieldName});
		_this.tempNode[field.fieldName] = {"element":element,"field":field};
		var temp = $.profileInfoRow(field,element);
		if(field.display && field.display == 1)
		{
			temp.hide();
		}
		_this.pnode.append(temp);
	}
	/***
	{
		"staticResult": [{
				"value": "",
				"label": "全部"
			}, {
				"value": "1",
				"label": "一级"
			}, {
				"value": "2",
				"label": "二级"
			}
		],
		"dynamicResult": {
			"url": "../platmenu/list.action",
			"postDynamicParam": [],
			"postStaticData": {
				"level": "2",
				"sort": {
					"field": "priority asc"
				}
			},
			"resData": {
				"id": "id",
				"value": "name"
			}
		},
		"event": [{
				"name": "change",
				"func": "changePidBtn"
			}
		]
	}*/
	if(field.fieldParams)
	{
		try{
			//$.hy_error(field.fieldParams,"qq");
		    var initParam = JSON2.parse(field.fieldParams);
		    if(initParam.staticResult)
		    {
		    	$.each(initParam.staticResult,function(i,n){
		    	  element.append($("<option/>").attr({"value":n.value}).html(n.label));
		    	});
		    }
		    if(initParam.dynamicResult)
		    {
			    var q = $.getPostParams(initParam.dynamicResult.postDynamicParam,_this.srcData);
			    q = $.extend(q,initParam.dynamicResult.postStaticData);
			    //$.hy_error(q,"qq");
			    var opt = {async:false,url:initParam.dynamicResult.url,data:q,success:function(msg){
			    	element.find(".option-row").remove();
				    if(msg.result && msg.result.length > 0)
				    {
					    $.each(msg.result,function(i,n){
					    	try{
								var value=n[initParam.dynamicResult.resData.id];
								element.append($("<option/>").addClass("option-row").attr({value:value}).html(n[initParam.dynamicResult.resData.value]));
					    	}catch(e)
					    	{
					    		$.hy_error(e,"initParam.dynamicResult msg.result ");
					    	}
					    });
					}			 
				}};
			    $._ajax(opt);		 		    
		    }
		    if(initParam.event){
		   	    $.each(initParam.event,function(j,m){
		   	       element.bind(m.name,function(){
		   	         _this[m.func](field,m);
		   	       });
		   	    });
			}
		}catch(e)
		{
			$.hy_error(e,"DrawElement.prototype.select");
		}
	}
	//$.hy_error(_this.srcData);
	if(_this.srcData)
	{
		element.val(_this.srcData[field.fieldName]);
		if(field.fieldParams){
			var init = JSON2.parse(field.fieldParams);
			if(init.prior){//有初始化值的时候，初始化值优先
				$.initValue(element,field.fieldParams);
			}
		}
	}else{
		$.initValue(element,field.fieldParams);
	}
	$.lvxh_validator(element,field);
};
DrawElement.prototype.changeSelect = function(field,events){
	var _this = this;
	if(events.changeNodes)
	{
		$.each(events.changeNodes,function(i,n){
		    var temp = _this.tempNode[n];
		    if(temp){
				if(temp.func)
				{
					temp.func(field);
				}else
				{
					//$.hy_error(temp.field.fieldType);
					_this[temp.field.fieldType](temp.field);
				}
		    }
		});
	}
};

DrawElement.prototype.textarea = function(field){
	var _this =this;
	var element = $("<textarea/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		element.val(_this.srcData[field.fieldName]);
		if(field.fieldParams){
			var init = JSON2.parse(field.fieldParams);
			if(init.prior){//有初始化值的时候，初始化值优先
				$.initValue(element,field.fieldParams);
			}
		}
	}else{
		$.initValue(element,field.fieldParams);
	}
	$.lvxh_validator(element,field);
};

DrawElement.prototype.datetime = function(field){
	var _this =this;
	var element = $("<input/>").attr({
		"name" : field.fieldName,
		"id" : field.fieldName,
		"readonly":"true"
	}).css({"text-indent":"0.15cm"});
	var temp = $.profileInfoRow(field,element);
	_this.pnode.append(temp);
	if(_this.srcData){
	    element.val(_this.srcData[field.fieldName]);
		if(field.fieldParams){
			var init = JSON2.parse(field.fieldParams);
			if(init.prior){//有初始化值的时候，初始化值优先
				$.initValue(element,field.fieldParams);
			}
		}
	}
	else 
	{
		$.initValue(element,field.fieldParams);
	}
	try{
		var init = JSON2.parse(field.fieldParams);
		if (init.dateFormat){
			element.lxhCalender(init.dateFormat);
		}	
		else{
			element.lxhCalender(field.fieldParams);
		} 
		   
	}catch(e){
		element.lxhCalender(field.fieldParams);
		$.hy_log("elementNode.js 1151 line: " + e);
	}
	$.lvxh_validator(element,field);
};

DrawElement.prototype.editSelect = function(field){
	var _this =this;
}
DrawElement.prototype.input = function(field){
	var _this =this;
	var element = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	//$.hy_error(field.fieldParams,field);
	if(_this.srcData)
	{
	    element.val(_this.srcData[field.fieldName])	;
		if(field.fieldParams){
			var init = JSON2.parse(field.fieldParams);
			if(init.prior){//有初始化值的时候，初始化值优先
				$.initValue(element,field.fieldParams);
			}
			
			if(init.appoint){
				if(_this.srcData[init.appoint.child]){
					element.val(_this.srcData[init.appoint.child][init.appoint.fieldName]);
				}else{
					element.val(_this.srcData[init.appoint.fieldName]);
				}
			}
		}
	}else{
		$.initValue(element,field.fieldParams);
	}
	if(field.fieldParams){
		var init = JSON2.parse(field.fieldParams);
		if(init.isColorPicker){
			_this[init.isColorPicker](element,field);
		}
		if(init.isdisabled){
			element.attr("disabled", "disabled")
		}
	}
	element.bind("blur",function(){
		var s = element.val();
		element.val($.trim(s));
	});
	$.lvxh_validator(element,field);
};

DrawElement.prototype.password = function(field){
	var _this =this;
	var element = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName,"type":"password"});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	//$.hy_error(field.fieldParams,field);
	if(_this.srcData)
	{
		element.val(_this.srcData[field.fieldName]);
		if(field.fieldParams){
			var init = JSON2.parse(field.fieldParams);
			if(init.prior){//有初始化值的时候，初始化值优先
				$.initValue(element,field.fieldParams);
			}
		}
	}else{
		$.initValue(element,field.fieldParams);
	}
	$.lvxh_validator(element,field);
};
DrawElement.prototype.selectImg = function(field){
	var _this =this;
	var element = $("<div/>");
	var input = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName}).hide();
	var img = $("<img/>").addClass("dialog-field-img").attr({onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
	img.bind("click",function(){
		var dialog = $.getShowImgDialog("imgUrl",600,600,input.val(),true);
	});
	var img1 = $("<img/>").addClass("select-field-img").attr({src: $.getImgUrl("/images/cloud_upload.png"),"title":"上传"});
	img1.bind("click",function(){
	   var opt = {
	      btnParams : {
            "buttonCode": "select_img_dialog",
			"buttonName": "上传",
			"buttonParams": JSON2.stringify({
				"dialog": {
					"width": 545,
					"height": 300,
					"lock": true
				}
			}),
			valueElement:input,
			imgElement:img,
			fieldParams: field.fieldParams ? JSON2.parse(field.fieldParams):""
	      }
	   };
	   var imgDialog = new PlatSelectImgDialog(opt);
	});
	element.append(input).append(img).append(img1);
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		input.val(_this.srcData[field.fieldName]);
		img.attr({src:$.getImgUrl(_this.srcData[field.fieldName])});
	}else if(field.fieldParams)
	{
	  var init = JSON2.parse(field.fieldParams);
	  input.val(init.initValue);
      img.attr({src:$.getImgUrl(init.initValue)});
	}		  
};
DrawElement.prototype.upFile = function(field){
	var _this = this;
	var element = $("<div/>");
	var input = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName}).hide();
	var upInput = $("<input/>").attr({"type":"file"}).hide();
	var img = $("<img/>").addClass("dialog-field-img").attr({onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
	img.bind("click",function(){
		var dialog = $.getShowImgDialog("imgUrl",600,600,input.val(),true);
	});
	var img1 = $("<img/>").addClass("select-field-img").attr({src: $.getImgUrl("/images/cloud_upload.png"),"title":"上传"});
	element.append(input).append(upInput).append(img).append(img1);
	img1.bind("click",function(){
		upInput.click();
	})
	upInput.bind("change",function(){
		img1.hide();
		if(_this.lxhUpfile){
			_this.lxhUpfile.removeNode();
			if(_this.lxhUpfile.ws && _this.lxhUpfile.ws.readyState && _this.lxhUpfile.ws.readyState ===1){  //webSorcket开启时，需关闭
			   _this.lxhUpfile.ws.close();
			}
		}
		var files = upInput[0].files;
		if (files && files.length) {
			var opts = {
				//file : files[0],
				code : uuid(),
				url : platParams.upFileWebsocketUrl,
				step:1,
				input:upInput[0],
				procWidth:"200px",
				userCode:platParams.loginUser.userCode, 
                cancelFunc:function(){
					upInput.val("");
				    img1.show();
				},				
				success:function(msg){ 
				    if(msg.result == 0){
						upInput.val("");
						img1.show();
						img.attr({"src":$.getImgUrl("/userfiles"+msg.filePath.split("userfiles")[1])});
						input.val($.getImgUrl("/userfiles"+msg.filePath.split("userfiles")[1]));
					}
				}
			};
			/*{
				"uploadParam" : {
					"type" : ["PNG", "JPG", "GIF"],
					"msg" : "只允许上传PNG，JPG，GIF类型的文件！"
				}
			}*/
			if(field.fieldParams){
				var init = JSON2.parse(field.fieldParams);
				if(init.uploadParam){
					opts.uploadParam = init.uploadParam;
				}
			}
			_this.lxhUpfile = new LxhUpfile(opts);
			_this.lxhUpfile.up();
		}else{
			alert("请选择文件后再上传");
		}
	})
	
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		input.val(_this.srcData[field.fieldName]);
		img.attr({src:$.getImgUrl(_this.srcData[field.fieldName])});
	}else if(field.fieldParams)
	{
	  var init = JSON2.parse(field.fieldParams);
	  input.val(init.initValue);
      img.attr({src:$.getImgUrl(init.initValue)});
	}
}

DrawElement.prototype.upAndSelectFile = function(field){
	var _this = this;
	var element = $("<div/>");
	var input = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName}).hide();
	var img = $("<img/>").addClass("dialog-field-img").attr({onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
	_this.btnParams.valueElement = input;
	_this.btnParams.imgElement = img;
	img.bind("click",function(){
		var dialog = $.getShowImgDialog("imgUrl",600,600,input.val(),true);
	});
	var img1 = $("<img/>").addClass("select-field-img").attr({src: $.getImgUrl("/images/cloud_upload.png"),"title":"上传"});
	element.append(input).append(img).append(img1);
	img1.bind("click",function(){
		var opt = {
			id : _this.btnParams.buttonCode+"_upload_open",
			title : "选择文件",
			width : 555,
			height : 500,
			lock : true
		};
		_this.upfileDialog = $.openDialog(opt);
		var root = $("#"+_this.btnParams.buttonCode+"_upload_open");
		var row = $("<div/>").addClass("row").css({"margin-left":"0px","margin-right":"0px","height":opt.height});
		var div = $("<div/>").addClass("upload-operate").css({"height":"40px"});
		var upInput = $("<input/>").attr({"type":"file"}).hide();
		var upImg = $("<img/>").addClass("select-field-img").attr({src: $.getImgUrl("/images/cloud_upload.png"),"title":"上传"});
		var div1 = $("<div/>").addClass("upload-img-list col-xs-12").css({"height":opt.height-40,"overflow-y":"scroll"});
		var ul = $("<ul/>").addClass("ace-thumbnails clearfix");
		_this.drawUpFileUl(ul);
		
		div.append(upInput).append(upImg);
		root.append(row.append(div).append(div1.append(ul)));
		upImg.bind("click",function(){
			upInput.click();
		})
		upInput.bind("change",function(){
			upImg.hide();
			if(_this.lxhUpfile){
				_this.lxhUpfile.removeNode();
				if(_this.lxhUpfile.ws && _this.lxhUpfile.ws.readyState && _this.lxhUpfile.ws.readyState ===1){  //webSorcket开启时，需关闭
				   _this.lxhUpfile.ws.close();
				}
			}
			var files = upInput[0].files;
			if (files && files.length) {
				var opts = {
					//file : files[0],
					code : uuid(),
					url : platParams.upFileWebsocketUrl,
					step:1,
					input:upInput[0],
					procWidth:opt.width-90+"px",
					userCode:platParams.loginUser.userCode,
					cancelFunc:function(){
						upInput.val("");
						upImg.show();
					},
					success:function(msg){ 
					    if(msg.result == 0){ //上传成功
						    upInput.val("");
							upImg.show();
							_this.drawUpFileUl(ul);
						}
					}
				};
				/*{
					"uploadParam" : {
						"type" : ["PNG", "JPG", "GIF"],
						"msg" : "只允许上传PNG，JPG，GIF类型的文件！"
					}
				}*/
				if(field.fieldParams){
					var init = JSON2.parse(field.fieldParams);
					if(init.uploadParam){
						opts.uploadParam = init.uploadParam;
					}
				}
				_this.lxhUpfile = new LxhUpfile(opts);
				_this.lxhUpfile.up();
			}else{
				alert("请选择文件后再上传");
			}
		})
	})
	
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		input.val(_this.srcData[field.fieldName]);
		img.attr({src:$.getImgUrl(_this.srcData[field.fieldName])});
	}else if(field.fieldParams)
	{
	  var init = JSON2.parse(field.fieldParams);
	  input.val(init.initValue);
      img.attr({src:$.getImgUrl(init.initValue)});
	}
}
DrawElement.prototype.drawUpFileUl = function(root){
	var _this = this;
	$._ajax({
		url:CONSTANTS.PALT_FILES,
		data:{
			"upUserCode":platParams.loginUser.userCode,
			"oneType":"img",
			"sort":{field:"id desc"},
			"pages":{"curPage":1,"pageSize":24}
		},
		success:function(res){
			if(res.code == 0){
				root.empty();
				$.each(res.result,function(i,n){
					var imgSrc = n.fileUrl;
					var li = _this.drawUpfileLi(imgSrc);
					root.append(li);
				});
			}
		}
	});
}
DrawElement.prototype.drawUpfileLi = function(imgSrc){
	var _this = this;
	var li = $("<li/>");
	var a = $("<a/>");
	var img = $("<img/>").attr({"width":"120","height":"120","src":$.getImgUrl(imgSrc)});
	li.append(a.append(img));
	a.bind("click",function(){
		_this.upfileDialog.close();
		var fileUrl = "/userfiles"+$("img",$(this)).attr("src").split("userfiles")[1];
		_this.btnParams.valueElement.val(fileUrl);
		_this.btnParams.imgElement.attr({src:$.getImgUrl(fileUrl)});
	});
	return li;
}

DrawElement.prototype.text = function(field){
	var _this =this;
	var element = $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	element.css({"text-align":"left","padding":"8px 5px",height:36});
	var temp = $.profileInfoRow(field,element);
	if(_this.labelStyle && _this.labelStyle == "mapDeepBlue"){
		temp = $.proMapInfoRow(field,element);
	}
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		var res = $.render(_this.srcData,field);
		element.append($("<div/>").html(res.value).attr({"title":res.title}));
		if(field.fieldParams){
			var init = JSON2.parse(field.fieldParams);
			if(init.appoint){
				if(_this.srcData[init.appoint.child]){
					//element.val(_this.srcData[init.appoint.child][init.appoint.fieldName]);
					var ret = _this.srcData[init.appoint.child][init.appoint.fieldName];
					element.append($("<div/>").html(ret).attr({"title":ret}));
				}else{
					var ret = _this.srcData[init.appoint.fieldName];
					element.append($("<div/>").html(ret).attr({"title":ret}));
					//element.val(_this.srcData[init.appoint.fieldName]);
				}
			}
		}
	}
};
DrawElement.prototype.pre = function(field){
	var _this =this;
	var element = $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	element.css({"text-align":"left","padding":"8px 5px",height:36});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		element.append($("<pre/>").append(_this.srcData[field.fieldName]));
	}
};
DrawElement.prototype.div = function(field){
	var _this =this;
	var element = $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	element.css({"text-align":"left","padding":"8px 5px",height:36});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		element.append($("<div/>").append(_this.srcData[field.fieldName]));
	}
};
DrawElement.prototype.video = function(field){
	var _this =this;
	var element = $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	element.css({"text-align":"left","padding":"5px",height:36});
	if(field.fieldParams){
		var jss = JSON2.parse(field.fieldParams);
		if(jss.height){
			element.css({height:jss.height});
		}
		if(jss.width){
			element.css({width:jss.width});
		}
	}
	var temp = $.proVideoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	
	if(_this.srcData)
	{
		if(_this.btnParams.buttonParams){
			var jj = JSON2.parse(_this.btnParams.buttonParams);
			if(jj.mapParams && jj.mapParams.markerSave){
				var saveKey = jj.mapParams.markerSave;
				var key = PLAT.getSaveKey(_this.srcData,saveKey);
				element.append($("<div/>").css({"width":"100%","height":"100%"}).attr({"id":field.fieldName+"_"+key}));
			}else{
				var saveKey = jj.markerSave;
				var key = PLAT.getSaveKey(_this.srcData,saveKey);
				element.append($("<div/>").css({"width":"100%","height":"100%"}).attr({"id":field.fieldName+"_"+key}));
			}
		}
	}
};
DrawElement.prototype.tree = function(field){
	var _this =this;
	var element = $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName,"elementType":"platTree"}).addClass("widget-main");
	element.css({"text-align":"left","padding":"5px",height:"400px",width:"100%","background-color":"white"});
	var temp = $.profileInfoRow(field,element);
	if(field.fieldParams)
	{
		var fieldParams = JSON2.parse(field.fieldParams);
		if(fieldParams.treeHeight)
		{
			element.css({height: fieldParams.treeHeight + "px"});
		}
		if(fieldParams.hideLabel == true){ //画树形结构时 不带label
			temp = $("<div/>").addClass(field.fieldStyle).append(element);
		}
		if(_this.srcData){
			fieldParams.srcData = _this.srcData;
		}
	}
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
    _this.pnode.append(temp);	
	var opts = {field:field,pnode:element};
	var tree = new PlatTree(opts);
	if(field.fieldParams){
		var fieldParams = JSON2.parse(field.fieldParams);
		if(fieldParams.reSetEventFunc){
			var btnCache = {};
			if(_this.btnParams.blist && _this.btnParams.blist.length > 0){
				$.each(_this.btnParams.blist,function(i,n){
					btnCache[n.buttonName] = n;
				})
			}
			_this[fieldParams.reSetEventFunc](tree,btnCache);
		}
	}
};
DrawElement.prototype.showImg = function(field){
	var _this =this;
	var element = $("<img/>").attr({"name" : field.fieldName,"id" : field.fieldName,onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData)
	{
		element.attr({src: _this.srcData[field.fieldName] });
	}else{
		$.initValue(element,field.fieldParams);
	}
	if(field.fieldParams)
	{
		var json = JSON2.parse(field.fieldParams);
		if(json.imgSize)
		{
			element.css({"width":json.imgSize.width,"height":json.imgSize.height});
		}
		if(json.hideLabel === true)
		{
			$(".profile-info-name",temp).hide();
		}
	}
	$.lvxh_validator(element,field);
}
DrawElement.prototype.image = function(field){
	var _this =this;
	var element = $("<img/>").attr({"name" : field.fieldName,"id" : field.fieldName,onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.css({"text-align":"left"}).append(temp);
	if(_this.srcData)
	{
		element.attr({src: $.getImgUrl(_this.srcData[field.fieldName]) });
	}else{
		$.initValue(element,field.fieldParams);
	}
	if(field.fieldParams)
	{
		var json = JSON2.parse(field.fieldParams);
		if(json.imgSize)
		{
			element.css({"width":json.imgSize.width,"height":json.imgSize.height});
		}
		if(json.hideLabel === true)
		{
			$(".profile-info-name",temp).hide();
		}
	}
	$.lvxh_validator(element,field);
}
DrawElement.prototype.textEditbox = function(field){
	var _this =this;
	var input = $("<textarea/>").attr({"name" : field.fieldName,"id" : field.fieldName});
	var element = $("<div/>");
	var editBox = $("<div/>").attr("id",field.fieldName+"_editBox");
	element.append(input).append(editBox);
	var temp = $.profileInfoRow(field.fieldStyle,field.fieldLabel,input);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	
	if(_this.srcData)
	{
		input.val(_this.srcData[field.fieldName]);
	}else{
		$.initValue(element,field.fieldParams);
	}
	$.lvxh_validator(element,field);
}
DrawElement.prototype.map = function(field){
	var _this =this;
	var temp = $("<div/>").addClass(field.fieldStyle).attr({"id" : field.fieldName});
	var element = $("<div/>").attr({"id" : field.fieldName+"-map"});
	temp.append(element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	
	var params  = {"result":{"blist":[],"":""},pnode:element};
	if(field.fieldParams){
		var fieldParams = JSON2.parse(field.fieldParams);
		params.mapjson = fieldParams;
		params.buttonCode = field.buttonCode;
		if(fieldParams.type == "baiduMap"){
			jQuery.getScript(platParams.filesServerVisit+"/artDialog-5.0.3/source/jquery.artDialog.js",function(){
				var activePage = new PlatBaiDuMap(params);
				_this.activePage = activePage; 
			})
		}else if(fieldParams.type == "tianMap"){
			jQuery.getScript(platParams.filesServerVisit+"/artDialog-5.0.3/source/jquery.artDialog.js",function(){
				var activePage = new PlatTianMap(params);
				_this.activePage = activePage; 
			})
		}
	}
}
/**
 * 文件上传
 * @param {} field
 */
DrawElement.prototype.selectFile = function(field){
	var _this =this;
	var element = $("<div/>");
	var input = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName}).hide();
	var div1 = $("<div/>").addClass("dialog-field-img").css({"width":"auto"});
	div1.bind("click",function(){
		
	});
	var img1 = $("<img/>").addClass("select-field-img").attr({src: $.getImgUrl("/images/cloud_upload.png"),"title":"上传"});
	img1.bind("click",function(){
		
	   var opt = {
	      btnParams : {
            "buttonCode": "select_img_dialog",
			"buttonName": "选择文件",
			"buttonParams": JSON2.stringify({
				"dialog": {
					"width": 400,
					"height": 50,
					"lock": true
				}
			}),
			valueElement:input,
			imgElement:div1,
			fieldParams: field.fieldParams ? JSON2.parse(field.fieldParams):""
	      }
	   };
	   var imgDialog = new PlatSelectFileDialog(opt);
	});
	_this.tempNode[field.fieldName]= {func:function(params){
		if(field.fieldParams){
			_this.changeUploadType(field.fieldParams,input,div1,img1);
		}
	}};
	element.append(input).append(div1).append(img1);
	var temp = $.profileInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	
	if(_this.srcData){
	   input.val(_this.srcData[field.fieldName]);
	   div1.html(_this.srcData[field.fieldName]);
	   if(field.fieldParams){
	   	 var init = JSON2.parse(field.fieldParams);
	   	 if(init.postParams){
		  	_this.changeUploadType(field.fieldParams,input,div1,img1);
		  }
	   }
	}else if(field.fieldParams){
	  _this.changeUploadType(field.fieldParams,input,div1,img1);
	  var init = JSON2.parse(field.fieldParams);
	  if(init.initValue){
		  input.val(init.initValue);
	      div1.attr(init.initValue);
	  }
	}
}



DrawElement.prototype.changeUploadType = function(field,input,div,img){
   var _this = this;
   var init = JSON2.parse(field);
	 // {"postParams":[{"nodeType":"pid","pid":"ff5de8fc-5b9c-4d2b-83e5-68fe52467d11_open","postRoot":"filePathType","keyData":{"0":"upload","1":"input"}}]}
	if(init.postParams) {
	    $.each(init.postParams,function(i,n){
	  	   if(n.nodeType == "pid"){
	  		  var initValue = $("#"+n.postRoot,$("#"+n.pid)).val();
	  		  if(n.keyData[initValue] == "upload"){
	  			 input.hide();
	  			 div.show();
	  			 img.show();
	  		  }else if(n.keyData[initValue] == "input"){
	  			 input.show();
	  			 div.hide();
	  			 img.hide();
	  		  }
	  	    }
	  	})
	}
}

DrawElement.prototype.player = function(field){
	var _this = this;
	var uid = field.fieldName+"_player";
	var pH = '100';
	var nodeP;
	if(field.fieldParams){
		nodeP = JSON2.parse(field.fieldParams);
		pH = nodeP.height?nodeP.height :100;
	}
	var playWarp = $("<div/>").attr({"name" : field.fieldName,"id" : field.fieldName}).addClass(field.fieldStyle).css({"padding":0}).height(pH);
	var playPnode = $("<div/>").attr("id", uid).css({"width":"100%","height":'100%'}).height(pH);
	playWarp.append(playPnode);
	_this.pnode.append(playWarp);
	if((typeof HYSDK) != "undefined"){
		var pla = {				
	        layout:1,
	        pnode:uid,
	        log:true
		};
		var mainPlay = HYSDK.getPlayer(pla);
		if(nodeP && nodeP.playType=='url' && _this.srcData){
	 		var pla = {				
				rtspurl:  _this.srcData[nodeP],
				hyVideo: mainPlay.players[0],
				videoParam:{
					palyParam:{
						title:_this.srcData[nodeP.playParam.name]
					}
				},
				log:false
			};
	 		mainPlay.playByVideo(pla);
		}else{
			newD.domainCode = _this.srcData[nodeP.playParam.domainCode];
			newD.deviceCode = _this.srcData[nodeP.playParam.domainCode];
			newD.channelCode = _this.srcData[nodeP.playParam.domainCode];
			newD.strStreamCode = _this.srcData[nodeP.playParam.domainCode];
			newD.videoPlayer = mainPlay.players[0];
			newD.mainPlay = mainPlay;
			newD.videoControl = {
				recordBtn: nodeP.playParam.recordBtn,
				syncRecordStats: nodeP.playParam.syncRecordStats
			}
			var pm = {};
			pm.stopResp = function(){
				_this[nodeP.playParam.stopRecordResp]
			};
			pm.startResp = function(){
				_this[nodeP.playParam.startRecordResp]
			};
			pm.title = _this.srcData[nodeP.playParam.name];
			newD.palyParam =pm;
			SieDevDialog.prototype.palyRtspVideo(newD);
		}
	}
}

DrawElement.prototype.staticImgSelect = function(field){
	var _this = this;
	var element = $("<input/>").attr({"name" : field.fieldName,"id" : field.fieldName,"readonly":"readonly"}).css({"position": "absolute"});
	var temp = $.proImgSelectInfoRow(field,element);
	if(field.display && field.display == 1)
	{
		temp.p.hide();
	}
	_this.pnode.append(temp.p);
	
	/*{
		"staticResult": [{
			"key":"/staticImgSelect/xunluoren.png",
			"value": "xunluoren",
			"img": "/staticImgSelect/xunluoren.png"
		}, {
			"key":"/staticImgSelect/xunchadian.png",
			"value": "xunchadian",
			"img": "/staticImgSelect/xunchadian.png"
		}, {
			"key":"/staticImgSelect/gangting.png",
			"value": "gangting",
			"img": "/staticImgSelect/gangting.png"
		}]
	}*/
	if(field.fieldParams){
		var init = JSON2.parse(field.fieldParams);
		var list = [];
		$.each(init.staticResult,function(i,n){
			list.push({
				"key":n.key,
				"value":n.value,
				"content":"<image src='"+$.getImgUrl(n.img)+"'/>"
			});
		})
		var opt = {"list":list};
		opt.defaultEvent = function(r){
			temp.showDiv.empty().show().append(r.content);
			element.css({"visibility": "hidden","margin-top": "-35px"});
			$("img", temp.showDiv).css({"width": "26px", "height": "26px"});
			$("body").bind("click", function(){
				$(".bxxSelPanel").remove();
				$("body").unbind("click");
			});
		}
		element.bxxeditSelect(opt);
		temp.showDiv.bind("click", function(){
			if(temp.showDiv.children().length == 0){
				temp.showDiv.hide();
				element.css({"visibility": "","margin-top": "0"}).focus().click();
			}else{
				element.click();
			}
		});
	}
	if(_this.srcData){
		temp.showDiv.show().append($("<img/>").attr({"src":_this.srcData[field.fieldName]}));
		element.css({"visibility": "hidden","margin-top": "-35px"});
	}
	$.lvxh_validator(element,field);
}

DrawElement.prototype.radio = function(field){
	var _this = this;
	var elementDiv = $("<div/>").attr({"id" : field.fieldName+"_radio_div"});
	if(field.fieldParams){
		var init = JSON2.parse(field.fieldParams);
		/*{
			"radioList":[{
				"name":"radius",
				"value":"100",
				"label":"100米",
				"checked":true
			},{
				"name":"radius",
				"value":"200",
				"label":"200米",
				"checked":false
			},{
				"name":"radius",
				"value":"300",
				"label":"300米",
				"checked":false
			}]
		}*/
		if(init.radioList){
			$.each(init.radioList,function(i,n){
				var div = $("<div/>").addClass("radio-panel-div");
				var input = $("<input/>").addClass("radio-input").attr({"type":"radio","name":n.name,"value":n.value}).prop({"checked":n.checked});
				var span = $("<span/>").html(n.label);
				elementDiv.append(div.append(input).append(span));
			})
		}
	}
	var temp = $.profileInfoRow(field,elementDiv);
	if(field.display && field.display == 1)
	{
		temp.hide();
	}
	_this.pnode.append(temp);
	if(_this.srcData){
		$("input.radio-input[value='"+_this.srcData[field.fieldName]+"']").prop({"checked":true});
	}
}

/** 
 * 
 * ===============================================================================
*/
function PlatOpenDialog(opts)
{
	this.btnParams = opts.btnParams;
    this.srcData = opts.srcData;
    this.tempNode = {};
	this.initDialog();
};
PlatOpenDialog.prototype.initDialog = function(){
	var _this = this;
	//$.hy_error(srcData,22);
	var params = {};
	if(_this.btnParams.buttonParams)
	{
		params = JSON2.parse(_this.btnParams.buttonParams);
	}
	var opt = {
		id : _this.btnParams.buttonCode + "_open",
		title : _this.btnParams.buttonName,
		width : 300,
		height : 400,
		lock : true
	};
	if(params.dialog)
	{
		opt.width = params.dialog.width;
		opt.height = params.dialog.height;
		opt.lock = params.dialog.lock;
	}
	var dialog = $.openDialog(opt);
	
	var row = $("<div/>").addClass("row").css({"height":opt.height});
	var form = $("<form >").attr({"id":_this.btnParams.buttonCode +"_form"}).append(row);	
	var buttons = $("<div class='btn-group buttons' style='display:none;'/>");
	//buttons.css({"height":"60px"});
	var dialogDiv = $("#"+_this.btnParams.buttonCode + "_open");
	dialogDiv.append(form).append(buttons);
	var ops = {btnParams:_this.btnParams,pnode:row};
	if(_this.srcData)
	{
		ops.srcData = _this.srcData;
	};
	
    var element = new DrawElement(ops);
    if(_this.btnParams.blist)
    {
    	var optss = {
	    	form:form,
	    	buttons:buttons,
	    	dialog:dialog,
	    	dialogBtn:_this.btnParams
    	};
		if(_this.btnParams.blist.length > 0){
			buttons.css({"height":"60px"}).show();
			row.css({"height":opt.height-40});
			$.each(data.blist,function(i,n){
				_this.drawDialogButton(optss,n);
			});
		}
    	
    }	
};

function PlatTree(opts)
{
	this.field = opts.field;
    this.pnode = opts.pnode;
    this.initTreeP = opts;
    this.treeData = {};
    this.init();
};

/*var fieldParams = {
	"dynamicResult":{
		"url":"../platuser/getOSTree.action",
		"postDynamicParam":[],
		"postStaticData":{}
	},
	"allCheck":false,
	"expand":true,
	"treeHeight":500,
	"hideExpandType":["user"],
    "clickEvent":"clickUserFunc",
	"srcData"
};*/
PlatTree.prototype.init = function(){
	var _this = this;
	_this.root = $("<ul/>").addClass("tree tree-unselectable tree-folder-select").css({"text-align":"left", "overflow": "auto"});
	_this.pnode.append(_this.root);
	if(_this.field.fieldParams){
		try{
		    var fieldParams = JSON2.parse(_this.field.fieldParams);
		    _this.fieldParams = fieldParams;
		    if(fieldParams.treeHeight){
		    	_this.root.height(fieldParams.treeHeight)
		    }
		    if(fieldParams.staticResult)
		    {
		    	$.each(fieldParams.staticResult,function(i,n){
		    	    //element.append($("<option/>").attr({"value":n.value}).html(n.label));
					var opts = {field:_this.field,pnode:_this.root,data:n,treeFunc:_this};
					_this.treeLi = new TreeLi(opts);
					_this.root.append(_this.treeLi);
		    	});
		    }
			
		    if(fieldParams.dynamicResult){
				
		    	var q = $.getPostParams(fieldParams.dynamicResult.postDynamicParam,fieldParams.srcData);
			    q = $.extend(q,fieldParams.dynamicResult.postStaticData);
			    //$.hy_error(q,"qq");
			    var opt = {async:false,url:fieldParams.dynamicResult.url,data:q,success:function(msg){
			    	if(fieldParams.reorganizeData){
			    		if(fieldParams.reorganizeData){
			    			msg = _this[fieldParams.reorganizeData](msg);
			    		}
			    	}
				    if(msg.result && msg.result.length > 0){
					    _this.treeData = msg.obj;
					    //$.hy_log(fieldParams.dynamicResult.url+"：：：!!!!!!!"+JSON2.stringify( _this.treeData));
					    $.each(msg.result,function(i,n){
					    	// _this.root.append(_this.getLi(n,_this.root));
							var opts = {field:_this.field,pnode:_this.root,data:n,treeFunc:_this};
							var treeLi = new TreeLi(opts);
							_this.root.append(treeLi);
					    });
					}	
					_this.pnode.data("treeData",_this.treeData);
				}};
			    $._ajax(opt);		 		    
		    }
		}catch(e)
		{
			$.hy_error(e,"DrawElement.prototype.tree ");
		}
	}
};
PlatTree.prototype.reorganizeData = function(data){
	return data;
}
PlatTree.prototype.custom = function(data){
	$.hy_log("start PlatTree.prototype.custom ");
}

PlatTree.prototype.getLi = function(data,pnode){
    var _this = this;
    /*var li = $("<li/>").addClass("tree-branch").attr({"pid":data.pid});
	var i = $("<i/>").addClass("icon-caret ace-icon tree-plus").css({"margin-top":"-6px"}).hide();
	var div = $("<div/>").addClass("tree-branch-header");
	var ul = $("<ul/>").addClass("tree-branch-children").attr({"data_id":data.id,"pid":data.pid}).hide();
	var div1 = $("<div/>").addClass("tree-loader").hide();
	var divLoad = $("<div/>").addClass("tree-loading");
	var load = $("<i/>").addClass("ace-icon fa fa-refresh fa-spin green");
	var span = $("<span/>").addClass("tree-branch-name");
	var img = $("<img/>").css({"width":"14px","height":"14px","margin-top":"-5px","margin-left":"5px"});
	img.attr({"src": $.getImgUrl(data.img)});
	var check =  $("<img/>").attr({"data_id":data.id,"data_type":"check_img","pid":data.pid}).css({"margin-top":"-5px"});
	var label = $("<span/>").addClass("tree-label").html(data.name);
	var remarkSpan = $("<span/>");
	if(data.label){
		remarkSpan.append(data.label);
	}
	var numSpan = $("<span/>").attr({"id":data.id + "Count"}).addClass("tree_li_msg_num").html("0").hide();
	
	if(data.codes)
	{
		label.attr({codes:data.codes});
	}
	
	//刷新按钮
	var imgRef = $.gerTreeBtnImg("/tree/refresh.png","刷新",data.id+"_refresh").hide();
	//新增按钮按钮
	var addDataImg = $.gerTreeBtnImg("/tree/add.png","增加",data.id+"_add").hide();
	//修改按钮
	var modifyImg = $.gerTreeBtnImg("/tree/modify.png","修改",data.id+"_modify").hide();
	// 删除按钮
	var delImg = $.gerTreeBtnImg("/tree/del.png","删除",data.id+"_del").hide();
	var clickParams = {data:data,_thisNode:label};
	label.on("click",function(){
		_this.clickEvent(clickParams);
	}).on("dblclick",function(){
		_this.doubleClickEvent(clickParams);
	}).on("mouseout",function(){
		_this.mouseoutEvent(clickParams);
	}).on("mouseover",function(){
		_this.mouseoverEvent(clickParams);
	});
	if(_this.fieldParams && _this.fieldParams.allCheck === true)
	{
		span.append(check);
		if(data.selected === true)
		{
			if(data.selectedCount > 0 && data.noSelectCount >0)
			{
				check.attr({"src": $.getImgUrl("/images/bangouxuan.png"),"ttype":3});
			}else
			{
				check.attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1});
			}
		}else
		{
			check.attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2});
		}
	}
	div.append(span.append(imgRef).append(addDataImg).append(modifyImg).append(delImg).append(img).append(label).append(remarkSpan).append(numSpan));
	pnode.append(li.append(i).append(div).append(div1.append(divLoad.append(load))).append(ul));
	if(_this.fieldParams.expand === true)
	{
		i.show();
		if(data.hasChild === true ||(_this.fieldParams.forceLoadBtn && data.dataType ==_this.fieldParams.forceLoadBtn.dataType && _this.fieldParams.forceLoadBtn.hasChild === true)){	
		    i.addClass("tree-plus");
		    i.removeClass("tree-minus");
		}else{
			i.removeClass("tree-plus");
			i.addClass("tree-minus");
		}
		if(_this.fieldParams.hideExpandType){
			$.each(_this.fieldParams.hideExpandType,function(j,m){
			    if(data.dataType && data.dataType == m){ 	i.hide(); }
			});
		}
		i.bind("click",function(){
			$.hy_error(data);
			var opt = {div1:div1,i:i,ul:ul,data:data};
		   _this.clickExpendEvent(opt);
		});
	}
	
	if(_this.fieldParams.showRefreshType){
		$.each(_this.fieldParams.showRefreshType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	imgRef.show(); }
		});
	}
	
	imgRef.bind("click",function(){
		var opt = {div1:div1,imgRef:imgRef,ul:ul,data:data};
	   _this.clickRefreshEvent(opt);
	});
	
	if(_this.fieldParams.showAddDataType){
		$.each(_this.fieldParams.showRefreshType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	addDataImg.show(); }
		});
	}
	
	addDataImg.bind("click",function(){
		var opt = {div1:div1,addDataImg:addDataImg,ul:ul,data:data};
	   _this.clickAddDataEvent(opt);
	});
	if(_this.fieldParams.showModifyType){
		$.each(_this.fieldParams.showModifyType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	modifyImg.show(); }
		});
	}
	modifyImg.bind("click",function(){
		var opt = {div1:div1,modifyImg:modifyImg,ul:ul,data:data};
	   _this.clickModifyEvent(opt);
	});
	if(_this.fieldParams.showDelType){
		$.each(_this.fieldParams.showDelType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	delImg.show(); }
		});
	}
	delImg.bind("click",function(){
		var opt = {div1:div1,delImg:delImg,ul:ul,data:data};
	   _this.clickDelEvent(opt);
	});
	
	check.bind("click",function(){
		var pidDiv = check.parents(".tree-branch-children").siblings(".tree-branch-header");
	    if (check.attr("ttype") == 2 || check.attr("ttype") == 3) {
			check.attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1})
			_this.treeData[data.id].selected = true;
			if(data.hasChild === true){
		   	    _this.selectChildNode(data.treeList,true);
			    $("img[data_type='check_img']",ul).attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1});
		    }
			_this.selectParentNode(check);
	    } else if(check.attr("ttype") == 1){
	    	check.attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2})
	    	_this.treeData[data.id].selected = false;
	    	if(data.hasChild === true){
		   	   _this.selectChildNode(data.treeList,false);
			   $("img[data_type='check_img']",ul).attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2});
		    }
			var pidDiv = check.parents(".tree-branch-children").siblings(".tree-branch-header");
			_this.selectParentNode(check);
	    }
	    _this.pnode.data({"treeData":_this.treeData});
	});
	var eventData = {
	   li:li,
	   label:label,
	   data:data
	}
	_this.initEvent(eventData);*/	
};

PlatTree.prototype.selectChildNode = function(list,selected){
    var _this = this;
    if(list){
    	$.each(list,function(i,n){
    	    n.selected = selected;
    	    _this.treeData[n.id].selected = selected;
    	    if(n.hasChild === true){
    	   	   _this.selectChildNode(n.treeList,selected);
    	    }
    	})
    }
};

PlatTree.prototype.selectParentNode = function(check){
    var _this = this;
	var id = check.attr("data_id");
	var pid = check.attr("pid");
	//$.hy_error(id,pid);
	var cnode = $("img[data_type='check_img'][pid='"+pid+"']",_this.pnode);
	var pnode = $("img[data_type='check_img'][data_id='"+pid+"']",_this.pnode);
	var allSize = cnode.length;
	
	var pul  = $("ul[data_id='"+pid+"']",_this.pnode);
   // var pli = $("li[pid='"+pid+"']",pul).length;  //pl  当前菜单的长度
	var selectSize = $("img[data_type='check_img'][pid='"+pid+"'][ttype='1']",_this.pnode).length;   //cl  全选的长度
	var halfSelectSize = $("img[data_type='check_img'][pid='"+pid+"'][ttype='3']",_this.pnode).length;   //bcl  半勾选的长度
	var notSelectSize = $("img[data_type='check_img'][pid='"+pid+"'][ttype='2']",_this.pnode).length;   //bcl  未勾选的长度
	//console.log(selectSize,notSelectSize,allSize);
	
	if(selectSize == allSize)
	{
		pnode.attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1});
		if(pid){
			_this.treeData[pid].selected = true;
		}
	}
	else if((selectSize < allSize && selectSize > 0 ) || halfSelectSize > 0)
	{
		pnode.attr({"src": $.getImgUrl("/images/bangouxuan.png"),"ttype":3});
		if(pid){
			_this.treeData[pid].selected = true;
		}
	}
	else if(notSelectSize == allSize || selectSize == 0)
	{
		pnode.attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2});
		if(pid){
			_this.treeData[pid].selected = false;
		}
	}
	if(pnode.length>0){
		_this.selectParentNode(pnode);
	}
};

PlatTree.prototype.initEvent = function(opts){
	var _this = this;
	if(_this.fieldParams.initEvent){
		_this[_this.fieldParams.initEvent](opts);
	}
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}

/********************************默认事件方法 start********************************/
PlatTree.prototype.clickEvent = function(opts){
	var _this = this;
	if(_this.fieldParams && _this.fieldParams.clickEvent){
		try{
			window[_this.fieldParams.clickEvent](opts);
		}catch(e){
			$.hy_error("PlatTree.prototype.clickEvent",e);
		}
	}
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}
PlatTree.prototype.clickExpendEvent = function(opts){
	var _this = this;
	_this.expendEvent(opts);
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}

PlatTree.prototype.expendEvent = function(opts){
	// $.hy_error(opts);
	var _this = this;
	var i = opts.i;
	var div1 = opts.div1;
	var ul = opts.ul;
	var data = opts.data;
	if (i.hasClass("tree-plus")) {
		ul.show();
		div1.show();
		i.removeClass("tree-plus");
		i.addClass("tree-minus");
		var size = $("li",ul).length;
		if(data.hasChild === true && size <= 0){
			setTimeout(function(){
				$.each(data.treeList,function(k,ll){
				    //_this.getLi(ll,ul);
					if(_this.treeData && _this.treeData[ll.id]){
						if(_this.treeData[ll.id]){
						
						}else{
							_this.treeData[ll.id] = ll.obj
						}
					}
				    var opts = {field:_this.field,pnode:ul,data:ll,treeFunc:_this};
				    _this.treeLi = new TreeLi(opts);
					/*_this.root.append(treeLi);*/
				}); 
				div1.hide();	
			},200);		
	    }else{
			div1.hide();	
		}
    } else {
    	ul.hide();
		div1.hide();
    	i.addClass("tree-plus");
    	i.removeClass("tree-minus");
    }	    
}

/**
 * 刷新按钮点击四件
 * @param {} opts
 */
PlatTree.prototype.clickRefreshEvent = function(opts){
	var _this = this;
	_this.refreshEvent(opts);
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}

PlatTree.prototype.refreshEvent = function(opts){
	var _this = this;
	var data = opts.data;
	if(opts.ul){
		opts.ul.empty();
	}
	if(opts.expendI && opts.expendI.hasClass("tree-minus")){
		opts.ul.show();
	}
	//$.hy_log("#####"+JSON2.stringify(data))
	$.each(data.treeList,function(k,ll){
	    //_this.getLi(ll,opts.ul)
	    var optss = {field:_this.field,pnode:opts.ul,data:ll,treeFunc:_this};
		_this.treeLi = new TreeLi(optss);
    });
}

/**
 * 自定义数据事件
 * @param {} opts
 */
PlatTree.prototype.clickCustomEvent = function(opts){
	var _this = this;
}

/**
 * 新增数据事件
 * @param {} opts
 */
PlatTree.prototype.clickAddDataEvent = function(opts){
	var _this = this;
	_this.addDataEvent(opts);
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}

/**
 * 新增数据基础时间
 * @param {} opts
 */
PlatTree.prototype.addDataEvent = function(opts){
	var _this = this;
	//_this.refreshEvent(opts);
}

/**
 * 修改数据
 * @param {} opts
 */
PlatTree.prototype.clickModifyEvent = function(opts){
	var _this = this;
	_this.modifyEvent(opts);
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}
/**
 * 修改数据基础时间
 * @param {} opts
 */
PlatTree.prototype.modifyEvent = function(opts){
	var _this = this;
	_this.refreshEvent(opts);
}
/**
 * 删除数据
 * @param {} opts
 */
PlatTree.prototype.clickDelEvent = function(opts){
	var _this = this;
	_this.delEvent(opts);
	//$.hy_error(opts," click PlatTree.prototype.clickEvent !");
}
/**
 * 删除数据基础时间
 * @param {} opts
 */
PlatTree.prototype.delEvent = function(opts){
	var _this = this;
	_this.refreshEvent(opts);
}

/**
 * 显示按钮
 * @param {} opts
 */
PlatTree.prototype.clickShowEvent = function(opts){
	var _this = this;
}

/**
 * 隐藏按钮
 * @param {} opts
 */
PlatTree.prototype.clickHideEvent = function(opts){
	var _this = this;
}
/**
 * 自定义选中事件
 * @param {} opts
 */
PlatTree.prototype.clickCustomCheckEvent = function(opts){
	var _this = this;
	var  check = opts.customCheck;
  	if (check.attr("ttype") == 2) {
		check.attr({"src": $.getImgUrl("/mailList/selected.png"),"ttype":1})
    } else if(check.attr("ttype") == 1){
    	check.attr({"src": $.getImgUrl("/mailList/weixuanzhong.png"),"ttype":2})
    }
	_this.customCheckEvent(opts);
}

PlatTree.prototype.customCheckEvent = function(opts){
	var _this = this;
	
}

PlatTree.prototype.doubleClickEvent = function(opts){
	var _this = this;
	//$.hy_error(opts," doubleClickEvent PlatTree.prototype.doubleClickEvent !");
}
PlatTree.prototype.mouseoutEvent = function(opts){
	var _this = this;
	//$.hy_error(opts," mouseoutEvent PlatTree.prototype.mouseoutEvent !");
}
PlatTree.prototype.mouseoverEvent = function(opts){
	var _this = this;
	//$.hy_error(opts," mouseoverEvent PlatTree.prototype.mouseoverEvent !");
}
/********************************默认事件方法 end*********************************/

function PlatSelectImgDialog(opts)
{
	this.btnParams = opts.btnParams;
	this.initDialog();
};
PlatSelectImgDialog.prototype.initDialog = function(){
	var _this = this;
	var params = {};
	if(_this.btnParams.buttonParams)
	{
		params = JSON2.parse(_this.btnParams.buttonParams);
	}
	var opt = {
		id : _this.btnParams.buttonCode + "_open",
		title : _this.btnParams.buttonName,
		width : 300,
		height : 400,
		lock : true
	};
	if(params.dialog)
	{
		opt.width = params.dialog.width;
		opt.height = params.dialog.height;
		opt.lock = params.dialog.lock;
	}
	var dialog = $.openDialog(opt);
	var row = $("<div/>").addClass("row").css({"height":params.dialog.height,"min-height":params.dialog.height,"overflow-y":"auto","width":params.dialog.width+10});
	var row1 = $("<div/>").addClass("row");
	
	var src = "../main/upFormReq.action?temp_id=881bf20f480d466cba3977314be4902d";
	if(_this.btnParams.fieldParams && _this.btnParams.fieldParams.uploadParam){
//		var uploadConditions = {"type": [".DOC",".DOCX",".PNG",".JPG",".GIF"],"msg": "只允许上传.DOC，.DOCX，.PNG，.JPG，.GIF类型的文件"};
		var uploadConditions = _this.btnParams.fieldParams.uploadParam;
		src = "../main/upFormReq.action?temp_id=881bf20f480d466cba3977314be4902d&uploadConditions="+encodeURIComponent(JSON2.stringify(uploadConditions))
	}
	
	var iframe = $("<iframe/>").attr({"src":"",frameborder:0,scrolling:"no",height:"25px",width:"400px"});
	row1.append(iframe).append($("<div title='选择上传文件' style='cursor:pointer; margin-right: 10px; float: right;'/>").addClass("upload-icon ace-icon fa fa-cloud-upload blue fa-2x").bind("click",function(){
	   iframe.attr({"src":src});
	}));
	var button = $("<button id='881bf20f480d466cba3977314be4902d'/>").bind("click",function(){
	   var opts = {url: CONSTANTS.PALT_FILES, data:{
		"upUserCode":platParams.loginUser.userCode,
	    oneType:"img",
	    "sort":{field:"id desc"},
	    "pages":{"curPage":1,"pageSize":24}
		},success:function(res){
		   if(res.code == 0)
		   {
		   	 ul.empty();
		   	 $.each(res.result,function(i,n){
		   	     var li = $("<li/>");
		   	     var a = $("<a/>");
		   	     var img = $("<img/>").attr({"width":"120","height":"120","src":$.getImgUrl(n.fileUrl)});
		   	     ul.append(li.append(a.append(img)));
		   	     a.bind("click",function(){
		   	        _this.btnParams.valueElement.val(n.fileUrl);
		   	        _this.btnParams.imgElement.attr({src:$.getImgUrl(n.fileUrl)});
		   	        dialog.close();
		   	     });
		   	 });
		   }
		}};
	   $._ajax(opts);
	});
	row.append(button.hide());
	var dialogDiv = $("#"+_this.btnParams.buttonCode + "_open");
	dialogDiv.append(row1).append(row);
	var ul = $("<ul/>").addClass("ace-thumbnails clearfix");
	var div = $("<div/>").addClass("col-xs-12");
	row.append(div.append(ul));
	button.click();
};

function TreeLi(opts){
	this.field = opts.field; 
    this.pnode = opts.pnode;  // this.data 当前li节点的父元素
	this.data = opts.data;  // this.data 当前li节点的数据
	this.thisTree = opts.treeFunc; //this.thisTree 是platTree的this
	this.init();
}

TreeLi.prototype.init = function(){
	var _this = this;
	var data = _this.data;
	var _thiss = _this.thisTree;  //_thiss 是platTree的this
	var pnode = _this.pnode;
	var li = $("<li/>").addClass("tree-branch").attr({"pid":data.pid});
	var i = $("<i/>").addClass("icon-caret ace-icon tree-plus").css({"margin-top":"-6px","display":"inline-block"}).hide();
	var div = $("<div/>").addClass("tree-branch-header");
	var ul = $("<ul/>").addClass("tree-branch-children").attr({"data_id":data.id,"pid":data.pid}).hide();
	var div1 = $("<div/>").addClass("tree-loader").hide();
	var divLoad = $("<div/>").addClass("tree-loading");
	var load = $("<i/>").addClass("ace-icon fa fa-refresh fa-spin green");
	var span = $("<span/>").addClass("tree-branch-name");
	var img = $("<img/>").css({"width":"14px","height":"14px","margin-top":"-5px","margin-left":"5px"});
	if(_thiss.fieldParams && _thiss.fieldParams.imgSize){
		img.css({"width":_thiss.fieldParams.imgSize.width,"height":_thiss.fieldParams.imgSize.height});
	}
	img.attr({"src": $.getImgUrl(data.img)});
	var check =  $("<img/>").attr({"data_id":data.id,"data_type":"check_img","pid":data.pid}).css({"margin-top":"-5px"});
	var label = $("<span/>").addClass("tree-label").css({"margin-left":"8px"}).html(data.name);
	var remarkSpan = $("<span/>");
	if(data.label){
		remarkSpan.append(data.label);
	}
	var numSpan = $("<span/>").attr({"id":data.id + "Count"}).addClass("tree_li_msg_num").html("0").hide();
	if(data.codes){
		label.attr({codes:data.codes});
	}
	
	var customCheck =  $("<img/>").width(20).height(20).attr({"ttype":2,"src": $.getImgUrl("/mailList/weixuanzhong.png")}).css({}).hide();
	var btnGroup = $("<div/>").addClass("tree-btn-group");
	btnGroup.append(customCheck)
	
	//刷新按钮
	var imgRef = $.gerTreeBtnImg("/tree/refresh.png","刷新").hide();
	//新增按钮
	var addDataImg = $.gerTreeBtnImg("/tree/add.png","增加").hide();
	//修改按钮
	var modifyImg = $.gerTreeBtnImg("/tree/modify.png","修改").hide();
	// 删除按钮
	var delImg = $.gerTreeBtnImg("/tree/del.png","删除").hide();
    // 是否显示按钮
    var showImg = $.gerTreeBtnImg("/tree/visible.png","隐藏").hide();
	var hideImg = $.gerTreeBtnImg("/tree/invisible.png","显示").hide();
	
	var customImg = "";
	if(_thiss.fieldParams.customDataTypeImg){
		$.each(_thiss.fieldParams.customDataTypeImg,function(j,m){
		    if(data.dataType && data.dataType == m.type){ 	customImg = $.gerTreeBtnImg(m.src,m.title);}
		});
	}
	
	var clickParams = {data:data,_thisNode:label};
	label.on("click",function(){
		_thiss.clickEvent(clickParams);
		return false;
	}).on("dblclick",function(){
		_thiss.doubleClickEvent(clickParams);
	}).on("mouseout",function(){
		_thiss.mouseoutEvent(clickParams);
	}).on("mouseover",function(){
		_thiss.mouseoverEvent(clickParams);
	});
	
	if(_thiss.fieldParams && _thiss.fieldParams.allCheck === true){
		span.append(check);
		if(data.selected === true){
			if(data.selectedCount > 0 && data.noSelectCount >0){
				check.attr({"src": $.getImgUrl("/images/bangouxuan.png"),"ttype":3});
			}else{
				check.attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1});
			}
		}else{
			check.attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2});
		}
	};
	if(_thiss.fieldParams.addDataTypeImg){
		$.each(_thiss.fieldParams.addDataTypeImg,function(j,m){
		    if(data.dataType && data.dataType == m.type){ 	addDataImg = $.gerTreeBtnImg(m.src,m.title).hide();}
		});
	}
	div.append(span.append(imgRef).append(addDataImg).append(modifyImg).append(delImg).append(customImg).append(showImg).append(hideImg).append(img).append(label).append(remarkSpan).append(numSpan)).append(btnGroup);
	pnode.append(li.append(i).append(div).append(div1.append(divLoad.append(load))).append(ul));
	
	if(_thiss.fieldParams.expand === true){
		i.show();
		if(data.hasChild === true ||(_thiss.fieldParams.forceLoadBtn && data.dataType ==_thiss.fieldParams.forceLoadBtn.dataType && _thiss.fieldParams.forceLoadBtn.hasChild === true)){	
		    i.addClass("tree-plus");
		    i.removeClass("tree-minus");
		}else{
			i.removeClass("tree-plus");
			i.addClass("tree-minus");
		}
		if(_thiss.fieldParams.hideExpandType){
			$.each(_thiss.fieldParams.hideExpandType,function(j,m){
			    if(data.dataType && data.dataType == m){ 	i.hide(); }
			});
		}
		
		i.bind("click",function(){
			//$.hy_error(data);
			var opt = {div1:div1,i:i,ul:ul,data:data};
		   _thiss.clickExpendEvent(opt);
		   return false;
		});
		
		if(_thiss.fieldParams.showIType){
			$.each(_thiss.fieldParams.showIType,function(j,m){
				if(data.dataType && data.dataType == m){ 	i.click();}
			})
		};
	}
	
	if(i.is(":hidden")){
		div.addClass("no-expend-ico");
	}
	
	if(_thiss.fieldParams.showRefreshType){
		$.each(_thiss.fieldParams.showRefreshType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	imgRef.show(); }
		});
	};
	
	imgRef.bind("click",function(){
		var opt = {div1:div1,imgRef:imgRef,ul:ul,data:data,expendI:i};
	   _thiss.clickRefreshEvent(opt);
	   return false;
	});
	
	if(_thiss.fieldParams.showAddDataType){
		$.each(_thiss.fieldParams.showAddDataType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	addDataImg.show(); }
		});
	};
	addDataImg.bind("click",function(){
		var opt = {div1:div1,addDataImg:addDataImg,ul:ul,data:data};
	   _thiss.clickAddDataEvent(opt);
	   return false;
	});
	
	if(_thiss.fieldParams.showModifyType){
		$.each(_thiss.fieldParams.showModifyType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	modifyImg.show(); }
		});
	};
	modifyImg.bind("click",function(){
		var opt = {div1:div1,modifyImg:modifyImg,ul:ul,data:data};
	   _thiss.clickModifyEvent(opt);
	   return false;
	});
	
	if(_thiss.fieldParams.showDelType){
		$.each(_thiss.fieldParams.showDelType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	delImg.show(); }
		});
	};
	delImg.bind("click",function(){
		var opt = {div1:div1,delImg:delImg,ul:ul,data:data};
	   _thiss.clickDelEvent(opt);
	   return false;
	});
	
	if(customImg != ""){
		customImg.bind("click",function(){
			var opt = {div1:div1,customImg:customImg,ul:ul,data:data};
		   _thiss.clickCustomEvent(opt);
		   return false;
		})
	}
	/************************两个属性不可同时存在 start***************************/
	if(_thiss.fieldParams.showShowType){
		$.each(_thiss.fieldParams.showShowType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	showImg.show(); }
		});
	};
	if(_thiss.fieldParams.showHideType){
		$.each(_thiss.fieldParams.showHideType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	hideImg.show(); }
		});
	};
	/*************************两个属性不可同时存在 end******************************/
	showImg.bind("click",function(){
		showImg.hide();
		hideImg.show();
		var opt = {div1:div1,showImg:showImg,ul:ul,data:data};
	   _thiss.clickShowEvent(opt);
	   return false;
	});
	
	hideImg.bind("click",function(){
		showImg.show();
		hideImg.hide();
		var opt = {div1:div1,hideImg:hideImg,ul:ul,data:data};
	   _thiss.clickHideEvent(opt);
	   return false;
	});
	
	if(_thiss.fieldParams.customCheckType){
		$.each(_thiss.fieldParams.customCheckType,function(j,m){
		    if(data.dataType && data.dataType == m){ 	customCheck.show(); }
		});
	};
	customCheck.bind("click",function(){
		var opt = {div1:div1,customCheck:customCheck,ul:ul,data:data};
	   _thiss.clickCustomCheckEvent(opt);
	   return false;
	});
	
	check.bind("click",function(){
		var pidDiv = check.parents(".tree-branch-children").siblings(".tree-branch-header");
	    if (check.attr("ttype") == 2 || check.attr("ttype") == 3) {
			check.attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1})
			_thiss.treeData[data.id].selected = true;
			if(data.hasChild === true){
		   	    _thiss.selectChildNode(data.treeList,true);
			    $("img[data_type='check_img']",ul).attr({"src": $.getImgUrl("/images/gouxuan.png"),"ttype":1});
		    }
			_thiss.selectParentNode(check);
	    } else if(check.attr("ttype") == 1){
	    	check.attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2})
	    	_thiss.treeData[data.id].selected = false;
	    	if(data.hasChild === true){
		   	   _thiss.selectChildNode(data.treeList,false);
			   $("img[data_type='check_img']",ul).attr({"src": $.getImgUrl("/images/weigouxuan.png"),"ttype":2});
		    }
			var pidDiv = check.parents(".tree-branch-children").siblings(".tree-branch-header");
			_thiss.selectParentNode(check);
	    }
	    _thiss.pnode.data({"treeData":_thiss.treeData});
	    return false;
	});
	var eventData = {li:li,label:label,data:data,"customCheck":customCheck}
	_thiss.initEvent(eventData);
	
	if(_thiss.treeData){  //用来存数据
		$.hy_log("****",_thiss.treeData,data.id);
		//$.hy_log("####"+data.id+":::::"+JSON.stringify(_thiss.treeData[data.id]));
		if(_thiss.treeData && _thiss.treeData[data.id]){
		   _thiss.treeData[data.id].li = li;
		   _thiss.treeData[data.id].countSpan = numSpan;
		   _thiss.treeData[data.id].refrechBtn = imgRef;
		   _thiss.treeData[data.id].showImg = showImg;
		   _thiss.treeData[data.id].hideImg = hideImg;
		   _thiss.treeData[data.id].customImg = customImg;
		   _thiss.treeData[data.id].defaultCount = 0;
		}
	}
}

TreeLi.prototype.setCount = function(data,type){
	var _this = this;
	var nn = data;
	var defaultCount = _this.thisTree.treeData[data.src]["defaultCount"];
	var countSpan = _this.thisTree.treeData[data.src]["countSpan"];
	if(defaultCount > 99){
		countSpan.show().html("99+");
	}else if(defaultCount > 0 ){
		countSpan.show().html(_this.thisTree.treeData[data.src]["defaultCount"]);
	}else{
	   countSpan.hide();
	}
}

TreeLi.prototype.procNewMsg = function(msg){
	var _this = this;
	// $.hy_log("=========procNewMsg===========",msg,_this);
	$.each(msg,function(ii,nn){
		if(_this.thisTree.treeData && _this.thisTree.treeData[nn.src]){
			_this.thisTree.treeData[nn.src]["defaultCount"] = nn.noReadCount;
			_this.setCount(nn);
		}
	});
}

/********************************** 上传文件 **************************************/

function PlatSelectFileDialog(opts)
{
	this.btnParams = opts.btnParams;
	this.initDialog();
};

PlatSelectFileDialog.prototype.initDialog = function(){
	var _this = this;
	var params = {};
	if(_this.btnParams.buttonParams)
	{
		params = JSON2.parse(_this.btnParams.buttonParams);
	}
	var opt = {
		id : _this.btnParams.buttonCode + "_open",
		title : _this.btnParams.buttonName,
		width : 300,
		height : 400,
		lock : true
	};
	if(params.dialog)
	{
		opt.width = params.dialog.width;
		opt.height = params.dialog.height;
		opt.lock = params.dialog.lock;
	}
	var dialog = $.openDialog(opt);
	var row = $("<div/>").addClass("row").css({"height":params.dialog.height});
	var row1 = $("<div/>").addClass("row");
	var src = "../main/upFormReq.action?temp_id=881bf20f480d466cba3977314be4907d";
	
	if(_this.btnParams.fieldParams && _this.btnParams.fieldParams.uploadParam){
//		var uploadConditions = {"type": [".DOC",".DOCX",".PNG",".JPG",".GIF"],"msg": "只允许上传.DOC，.DOCX，.PNG，.JPG，.GIF类型的文件"};
		var uploadConditions = _this.btnParams.fieldParams.uploadParam;
		src = "../main/upFormReq.action?temp_id=881bf20f480d466cba3977314be4907d&uploadConditions="+encodeURIComponent(JSON2.stringify(uploadConditions))
	}
	var iframe = $("<iframe/>").attr({"src":"",frameborder:0,scrolling:"no",height:"25px",width:"400px"});
	row1.append(iframe).append($("<div title='选择上传文件' style='cursor:pointer; margin-right: 10px; float: right;'/>").addClass("upload-icon ace-icon fa fa-cloud-upload blue fa-2x").bind("click",function(){
	   iframe.attr({"src":src});
	}));
	var button = $("<button id='881bf20f480d466cba3977314be4907d'/>").bind("click",function(){
	    $.hy_error(button.data("data-upload"),"1111");
	    var datas = button.data("data-upload");
	    if(datas.code == 0 && datas.result && datas.result.length>0)
	    {
	    	$.hy_error(_this.btnParams,_this.btnParams);
		    _this.btnParams.valueElement.val(datas.result[0].fileUrl);
			_this.btnParams.imgElement.css({"min-width": "100px","word-break":"break-all","word-warp": "break-word"}).html(datas.result[0].fileUrl);
	    }
		dialog.close();
	});
	row.append(button.hide());
	var dialogDiv = $("#"+_this.btnParams.buttonCode + "_open");
	dialogDiv.append(row1).append(row);
	var ul = $("<ul/>").addClass("ace-thumbnails clearfix");
	var div = $("<div/>").addClass("col-xs-12");
	row.append(div.append(ul));
}
/********************************** 主页上传文件 end **************************************/
function PlatPageHome(){
	
}
/********************************** 上传文件 end **************************************/

function PlatBaiDuMap(opts)
{
	this.result = opts.result;
	this.mapJson = opts.mapjson;
	this.buttonCode = opts.buttonCode ? opts.buttonCode:"";
	this.pnode = $(opts.pnode);
	this.platParams = platParams;
	this.TOP_BTNS_CACHE = {};
	var _this = this;
	
	var div = $("<div/>").addClass("cg-top-bg-div");
	var bg = $("<div/>").addClass("cg-top-title-bg").css({"background":"url('"+$.getImgUrl("/bigScreen/cg-top-bg.png")+"') no-repeat","background-size":"100% 100%"});
	var left = $("<div/>").addClass("cg-top-title-left");
	var middle = $("<div/>").addClass("cg-top-title-middle").html(this.platParams.platProduct.productName + $("#home_active_name").html());
	var right = $("<div/>").addClass("cg-top-title-right");
	var time = $("<div/>").addClass("cg-top-title-right-time");
	var weather = $("<div/>").addClass("cg-top-title-right-weather");
	
	bg.append($("<div/>").addClass("imgc").bind("click",function(){
		$.showMenuTop();
		$.goHome();
	}));
	
	div.append(bg.append(left).append(middle).append(right.append(time).append(weather)));
	if(_this.mapJson && _this.mapJson.mapTopShow == true){
		_this.pnode.append(div);
		var tw = new TimeAndWeather();
	    tw.setTime(left,weather);
	}
	
	if(PLAT.baduMapJs === false)
	{
		window.BMap_loadScriptTime = (new Date).getTime();
		jQuery.getScript(_this.platParams.mapUrl + $.date_format(new Date(),"yyyymmddhhiiss"), function(){
			jQuery.getScript(_this.platParams.filesServerVisit+"/js/complexCustomOverlay.js",function(){
				jQuery.getScript(_this.platParams.filesServerVisit+"/baidu/js/GeoUtils_min.js",function(){
					jQuery.getScript(_this.platParams.filesServerVisit+"/baidu/js/indoor_min.js",function(){
						jQuery.getScript(_this.platParams.filesServerVisit+"/baidu/js/DrawingManager_min.js",function(){
							jQuery.getScript(_this.platParams.filesServerVisit+"/baidu/js/TextIconOverlay_min.js",function(){
								jQuery.getScript(_this.platParams.filesServerVisit+"/baidu/js/MarkerClusterer_min.js",function(){
									PLAT.baduMapJs = true;
									_this.initMap();
								});
							});
							
						});
					});
				});
			});
		});
	}else
	{
		_this.initMap();
	}
};

PlatBaiDuMap.prototype.initMap = function(){
	var _this = this;
	var mapPoint = _this.platParams.mapCenterLatLng;
	var point = mapPoint.lastIndexOf(',');
	var lng = mapPoint.substring(0,point);
	var lat = mapPoint.substring(point+1);
	var mapLevel = _this.platParams.mapDefaultLevel;
	var height = $(window).height() - 152;
	if(_this.mapJson){
		if(_this.mapJson.mapLngLat){
			lng = _this.mapJson.mapLngLat.lng;
		    lat = _this.mapJson.mapLngLat.lat;
		}
		if(_this.mapJson.mapLevel){
			mapLevel = _this.mapJson.mapLevel;
		}
		if(_this.mapJson.isFullScreen){
			height = $(window).height() - 32;
		}
		if(_this.mapJson.customHeight){
			height = _this.mapJson.customHeight;
		}
	}
	var mapPanel = $("<div id='plat_map_id'/>").css({"width":"100%","height":height});
	_this.mapPanel = mapPanel;
	_this.pnode.append(_this.mapPanel);
	var map = new BMap.Map("plat_map_id", {enableMapClick:false});    // 创建Map实例
	_this.map = map;
	PLAT.mapCache[_this.buttonCode] = _this.map;
	map.centerAndZoom(new BMap.Point(lng,lat), mapLevel);  // 初始化地图,设置中心点坐标和地图级别
	_this.setMapControls(map);
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	_this.drawTopBtns();
};

// 设置地图上的控件  -- 可继续扩展
PlatBaiDuMap.prototype.setMapControls = function(map){
	var _this = this;
	//添加地图类型控件
	if(_this.mapJson && _this.mapJson.controls){
		var controls = _this.mapJson.controls;
		//地图类型控件
		if(controls.MapTypeControl && controls.MapTypeControl.isShow){  
			var mapType = new BMap.MapTypeControl({
				mapTypes:[ BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],
				anchor: BMAP_ANCHOR_BOTTOM_LEFT
			});
			var x = 0;
			var y = 0;
			if(controls.MapTypeControl.offSet){
				x = controls.MapTypeControl.offSet.x;
				y = controls.MapTypeControl.offSet.y;
			}
			mapType.setOffset(new BMap.Size(x,y));
			_this.map.addControl(mapType);
		}
		//缩放平移控件
		if(controls.NavigationControl && controls.NavigationControl.isShow){ 
			var navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});	
            var x = 0;
			var y = 0;
			if(controls.NavigationControl.offSet){
				x = controls.NavigationControl.offSet.x;
				y = controls.NavigationControl.offSet.y;
			}			
			navigation.setOffset(new BMap.Size(x,y));
			_this.map.addControl(navigation);   
		}
		//比例尺控件
		if(controls.ScaleControl && controls.ScaleControl.isShow){  
			var left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
			var x = 0;
			var y = 0;
			if(controls.ScaleControl.offSet){
				x = controls.ScaleControl.offSet.x;
				y = controls.ScaleControl.offSet.y;
			}	
			left_control.setOffset(new BMap.Size(x,y));	
			_this.map.addControl(left_control);
		}
		 //构造全景控件
		if(controls.PanoramaControl && controls.PanoramaControl.isShow){
			var stCtrl = new BMap.PanoramaControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
			var x = 0;
			var y = 0;
			if(controls.PanoramaControl.offSet){
				x = controls.PanoramaControl.offSet.x;
				y = controls.PanoramaControl.offSet.y;
			}	
			stCtrl.setOffset(new BMap.Size(x, y));				
			_this.map.addControl(stCtrl);
		}
		//交通状况控件
		if(controls.TrafficControl && controls.TrafficControl.isShow){
			var ctrla = new BMapLib.TrafficControl({showPanel: false,anchor: BMAP_ANCHOR_BOTTOM_LEFT});
			var x = 0;
			var y = 0;
			if(controls.TrafficControl.offSet){
				x = controls.TrafficControl.offSet.x;
				y = controls.TrafficControl.offSet.y;
			}	
			ctrla.setOffset(new BMap.Size(x, y));
            _this.map.enableContinuousZoom(false); 
		    _this.map.enableScrollWheelZoom(true); 			
			_this.map.addControl(ctrla);//添加全景控件
			ctrla.showTraffic();
		}
		//地图上地址搜索框
		if(controls.searchControl && controls.searchControl.isShow){
			var x = "10px";
			var y = "10px";
			if(controls.searchControl.offSet){
				x = controls.searchControl.offSet.x;
				y = controls.searchControl.offSet.y;
			}
			var searchDiv = $("<input/>").attr({"type": "text", "id": "suggestId","placeholder": "请输入搜索地址"})
			.css({"width": "250px","height": "35px","position": "absolute","top": x+"px","left": y+"px"});
            var searchResult = $("<div/>").attr({"id": "searchResultPanel"}).hide();
			$("#plat_map_id").append(searchDiv).append(searchResult); 
			_this.initBaiDuSearch();
		}
	    //地图上marker搜索框
		if(controls.markerSearchControl && controls.markerSearchControl.isShow){
			var x = "10px";
			var y = "10px";
			if(controls.markerSearchControl.offSet){
				x = controls.markerSearchControl.offSet.x;
				y = controls.markerSearchControl.offSet.y;
			}
			var markerSearchDiv = $("<input/>").attr({"type": "text", "id": "markerSearchInput","placeholder": "请输入名称"})
			.css({"width": "250px","height": "35px","position": "absolute","top": x+"px","left": y+"px"});
            var markerSearchResult = $("<div/>").attr({"id": "markerSearchResultPanel"}).hide();
		    $("#plat_map_id").append(markerSearchDiv).append(markerSearchResult); 
			_this.initMarkerBaiduSearch();
		}
		// 楼层控件
		if(controls.IndoorManager && controls.IndoorManager.isShow){
			var config = {};
			if(controls.IndoorManager.config){
				config = _this[controls.IndoorManager.config]();
			}
			var indoorManager = new BMapLib.IndoorManager(map,config);
			_this.indoorManager = indoorManager;
		}
	}	
}

PlatBaiDuMap.prototype.config = function(){
	var _this = this;
	var jsonParams = _this.mapJson.controls.IndoorManager;
	var config = {
		buildingId:platParams.MAP_BUILDING_ID,
		// 初始化室内图楼层
		floor: jsonParams.defaultFloor?jsonParams.defaultFloor:'F1',
		// 室内图最小缩放级别
		minZoom: 17,
		// 室内图最大缩放级别
		maxZoom: 21,
		// 是否启用室内图
		enableIndoor: true,
		// 是否显示底图
		showBaseMap: true,
		// 默认显示室内图控件
		showIndoorControl: true,
		// 是否显示室内图图标文字
		showLabel: true,
		// 默认进入中心点显示室内图控件
		autoShowIndoorControl: true,
		// 室内图加载完成事件
		complete: function (e) {
			$.hy_log('complete', e);
		},
		// 室内图label文字加载完毕后事件
		indoorClick: function (e) {
			$.hy_log('indoorClick', e);
			if(jsonParams.indoorClick){
				_this[jsonParams.indoorClick](e);
			}
		},
		// 切换楼层前事件
		beforeChangeFloor: function (e) {
			$.hy_log('beforeChangeFloor', e.currentFloor);
		},
		// 切换楼层后事件
		afterChangeFloor: function (e) {
			$.hy_log('afterChangeFloor', e.currentFloor);
			e.stopPropagation();
			if(jsonParams.afterChangeFloor){
				_this[jsonParams.afterChangeFloor](e);
			}
		}
	};
	return config;
}
// 切换楼层后事件
PlatBaiDuMap.prototype.afterChangeFloor = function(e){
	var _this = this;
	//城管  切换楼层时，获取岗点数据
	var leftPointCache = _this.TOP_BTNS_CACHE.initCgBtnType.LEFT_BTNS_CACHE.CG_EFENCE_POINT;
	_this.setMapFloorEfence(leftPointCache,"CG_EFENCE_POINT","initCgBtnType");
	
	//城管  切换楼层时，获取区域数据
	var leftGridCache = _this.TOP_BTNS_CACHE.initCgBtnType.LEFT_BTNS_CACHE.CG_EFENCE_GRID;
	_this.setMapFloorEfence(leftGridCache,"CG_EFENCE_GRID","initCgBtnType");
	
	//城管  切换楼层时，获取巡查路线数据
	var leftRouteCache = _this.TOP_BTNS_CACHE.initCgBtnType.LEFT_BTNS_CACHE.CG_EFENCE_ROUTE;
	_this.setMapFloorEfence(leftRouteCache,"CG_EFENCE_ROUTE","initCgBtnType");
}
//室内图label文字加载完毕后事件
PlatBaiDuMap.prototype.indoorClick = function(e){
	var _this = this;
}
PlatBaiDuMap.prototype.setMapFloorEfence = function(data,buttonType,topBtnButtonType){
	var _this = this;
	$.each(data[buttonType],function(i,n){
		if(n.data.efenceParams){
			var jss = JSON2.parse(n.data.efenceParams);
			if(_this.indoorManager && _this.indoorManager.getFloor()){
				if(_this.indoorManager.getFloor() != jss.storey){
					if(n){
						n.hide();
						if(n.label){
							n.label.hide();
						}
						if(n.customCover){
							n.customCover.removeHyCustomCover();
							_this.map.removeOverlay(n.customCover);
						}
					}
				}else{
					if(n){
						if(_this.getBtnStatus(topBtnButtonType,"left",buttonType) == "2"){
							n.show();
							if(n.label){
								if(_this.getBtnStatus(topBtnButtonType,"bottom","markerLabel") == "2"){
									n.label.show();
								}
							}
							
						}
					}
				}
			}
		}
	});
	//是否有聚合点
	if(_this.getBtnStatus(topBtnButtonType,"left",buttonType) == "2"){
		if(data.postArray && _this.indoorManager && _this.indoorManager.getFloor()){
			$.each(data.postArray,function(idx,ele){
				$.each(ele,function(iidx,eele){
					if(eele.clus){
						eele.clus.clearMarkers();
					}
					if(idx == _this.indoorManager.getFloor()){
						if(eele.list && eele.list.length>0){
							eele.clus = new BMapLib.MarkerClusterer(_this.map, {
								markers: eele.list,
								maxZoom: data.maxZoom,
								gridSize: data.gridSize,
								styles:data._styles,
								//data:eele.data.entName,
								isAverageCenter:true
							});
						}
					}
				})
			})
		}
	}else{
		if(data.postArray){
			$.each(data.postArray,function(idx,ele){
				$.each(ele,function(iidx,eele){
					if(idx != _this.indoorManager.getFloor()){
						if(eele.clus){
							eele.clus.clearMarkers();
						}
					}
				})
			})
		}
	}
}

PlatBaiDuMap.prototype.getBtnStatus = function(topType,type,buttonType){
	var _this = this;
	if(type == "left"){  //左侧按钮
		var btn = _this.TOP_BTNS_CACHE[topType].LEFT_BTNS_CACHE[buttonType];
	}else if(type == "bottom"){  //下侧按钮
		var btn = _this.TOP_BTNS_CACHE[topType].BOTTOM_BTNS_CACHE[buttonType];
	}
	if(btn){
		return btn.activeStatus;
	}
}
PlatBaiDuMap.prototype.initBaiDuSearch = function(){
	var _this = this;
	function G(id) {               
		return document.getElementById(id);
	}
	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
		{"input" : "suggestId"
		,"location" : _this.map
	});
	ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
	var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
		
		value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		}    
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
	var _value = e.item.value;
		myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
		G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		setPlace();
	});

	function setPlace(){
		_this.map.removeOverlay(PLAT.searchMarker);    //清除地图上所有覆盖物
		function myFun(){
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			_this.map.centerAndZoom(pp, 18);
			var marker = new BMap.Marker(pp);
			PLAT.searchMarker = marker;
			_this.map.addOverlay(marker);    //添加标注
		}
		var local = new BMap.LocalSearch(_this.map, { //智能搜索
		    onSearchComplete: myFun
		});
		local.search(myValue);
	}
}

PlatBaiDuMap.prototype.initMarkerBaiduSearch = function(){
	var _this = this;

}
/**********************MAP_TOP_BTN  start****************************/
PlatBaiDuMap.prototype.drawTopBtns = function(){
	var _this = this;
	var mapjson = _this.mapJson;
	var pnode = _this.mapPanel;
	var leftNode = $("<div/>").addClass("left_bg_div_panel");
	var bottomNode = $("<div/>").addClass("bottom_bg_div_panel");
	var rightNode = $("<div/>").addClass("right_bg_div_panel");
	rightNode.mouseenter(function(){
        _this.map.disableScrollWheelZoom(true);
	});
	rightNode.mouseleave(function(){
		_this.map.enableScrollWheelZoom(true);
	});
	if(_this.result.blist && this.result.blist.length > 0){
		var top = "10px";
		var left = "10px";
		if(mapjson.mapTopPosition){
			top = mapjson.mapTopPosition.top;
			left = mapjson.mapTopPosition.left;
		}
		var top_div = $("<div/>").addClass("map_top_btn_panel").css({"top":top,"left":left});
		$.each(_this.result.blist,function(i,n){
			if(n.buttonType == "map_top" && n.buttonLevel == 1){
				var obj = {
					"baiduObject":_this,
					"btnData":n,
					"topDiv":top_div,
					"leftDiv":leftNode,
					"bottomDiv":bottomNode,
					"rightDiv":rightNode
				};
				var mapTopBtn = new MAP_TOP_BTN(obj);
			    mapTopBtn.init();
			}
		});
		pnode.append(top_div).append(leftNode).append(bottomNode).append(rightNode);	
	}
}

/**
 * 地图左上角对象
 * obj={
	"baiduObject": PlatBaiDuMap对象
	"btnData":按钮数据 对应plat_button
	"topDiv": 地图上按钮容器,
    "leftDiv": 地图左按钮容器,
	"bottomDiv":地图下按钮容器,
	"rightDiv":地图右按钮容器,
 }
 */
function MAP_TOP_BTN(obj){
  this.baiduObj = obj.baiduObject;
  this.btnData = obj.btnData;
  this.topDiv = obj.topDiv;
  this.leftNode = obj.leftDiv;
  this.bottomNode = obj.bottomDiv;
  this.rightNode = obj.rightDiv;
  this.activeStatus = 1; //当前状态  1未激活状态，2激活状态
  this.defaultActive = 1; //默认状态  1未激活状态，2激活状态
}

MAP_TOP_BTN.prototype.init = function(){
	var _this = this;
	_this.topNodeMuster = {};
	_this.LEFT_BTNS_CACHE = {};
	_this.BOTTOM_BTNS_CACHE = {};
	_this.RIGHT_BTNS_CACHE = {};
	//$.hy_log("---------MAP_TOP_BTN-----------",_this);
	var map = _this.baiduObj.map;
	var top_btn= $("<div/>").addClass("map_top_btn").attr({id:_this.btnData.buttonCode});
	_this.topBtn = top_btn;
	var initParams = _this.btnData.buttonParams;
	if(initParams){
		var j = JSON2.parse(initParams);	
		var btn_img_div = $("<div/>").addClass("btn_top_group_img_div");
		var defaultImg = $("<img/>").addClass("default_map_top_btn_img").attr({src:$.getPrefixImgUrl("deepblue",j.img)});
		var activeImg = $("<img/>").addClass("active_map_top_btn_img").hide().attr({src:$.getPrefixImgUrl("deepblue",j.active_img)});
		btn_img_div.append(defaultImg).append(activeImg);
		var btnLabel = $("<div/>").addClass("map_top_btn_lable map_top_btn_lable_gray");
		_this.topNodeMuster["defaultImg"] = defaultImg;
		_this.topNodeMuster["activeImg"] = activeImg;
		_this.topNodeMuster["btnLabel"] = btnLabel;
		top_btn.append(btn_img_div).append(btnLabel.append(_this.btnData.buttonName));
		if(j.buttonType){
			top_btn.attr({"buttonType":j.buttonType});
			_this.baiduObj.TOP_BTNS_CACHE[j.buttonType] = _this;
		}
		if(j.initEvent){
			try{
				_this[j.initEvent] && _this[j.initEvent](map,j);
			}catch(e){
				$.hy_error(e," MAP_TOP_BTN.prototype initEvent function ! plat.js 5842 line:: " + j.initEvent);
			}
		}
		top_btn.bind("click",function(){
			map.clearOverlays();
			if(_this.activeStatus == 1){
				$.each(_this.baiduObj.TOP_BTNS_CACHE,function(idx,ele){
					if(_this.btnData.buttonCode == ele.btnData.buttonCode){
						ele.active();
						if(_this.baiduObj.indoorManager){
							_this.baiduObj.indoorManager.setFloor("B1");
							$("button.selected").click();
						}
						_this.initLeft();
						_this.initBottom();
						_this.initRight();
					}else{
						ele.noActive();
					}
				})
			}
		});
		if(_this.btnData.display == 1){
			top_btn.hide();
		}
		if(j.active_default && j.active_default == "active"){
			top_btn.click();
			_this.defaultActive = 2;
		}
		_this.topDiv.append(_this.topBtn);
	}	
}

//地图上按钮 激活事件
MAP_TOP_BTN.prototype.active = function(){
	var _this = this;
	_this.activeStatus = 2;
	_this.topNodeMuster.defaultImg.hide();
	_this.topNodeMuster.activeImg.show();
	_this.topNodeMuster.btnLabel.addClass("map_top_btn_lable_white");
	//清除地图左按钮
	$.each(_this.LEFT_BTNS_CACHE,function(i,n){
        if(n.defaultActive == 2){
			n.active();
		}	   
	});
	$.each(_this.BOTTOM_BTNS_CACHE,function(i,n){
		if(n.defaultActive == 2){
			n.active();	
		}
	});
}
//地图上按钮 取消激活事件
MAP_TOP_BTN.prototype.noActive = function(){
	var _this = this;
	_this.activeStatus = 1;
	_this.topNodeMuster.defaultImg.show();
	_this.topNodeMuster.activeImg.hide();
	_this.topNodeMuster.btnLabel.removeClass("map_top_btn_lable_white");
	$.each(_this.LEFT_BTNS_CACHE,function(i,n){
	   n.noActive();	
	});
	$.each(_this.BOTTOM_BTNS_CACHE,function(i,n){
	   n.noActive();	
	});
}

//初始化地图左按钮
MAP_TOP_BTN.prototype.initLeft = function(){
	var _this = this;
	_this.leftNode.empty();
	var t = 0;
	var map = _this.baiduObj.map;
	var open_div = $("<div/>").addClass("left_open_div_panel");
	var openImg = $("<img/>").attr({src:$.getPrefixImgUrl("deepblue","/bigScreen/y_open.png")});
	var closeImg = $("<img/>").hide().attr({src:$.getPrefixImgUrl("deepblue","/bigScreen/y_close.png")});
	open_div.append(openImg).append(closeImg);
	var btn_div = $("<div/>").hide().addClass("left_btn_div_panel");
	var topImgDiv = $("<div/>").addClass("map_btn_img_bg_left_top");
	var middleDiv = $("<div/>").addClass("map_btn_img_bg_left_middle");
	var bottomImgDiv = $("<div/>").addClass("map_btn_img_bg_left_bottom");
	btn_div.append(topImgDiv).append(middleDiv).append(bottomImgDiv);
	openImg.bind("click",function(){
		closeImg.show();
		openImg.hide();
		open_div.css({"left":"43px"});
		btn_div.show();
	});
	closeImg.bind("click",function(){
		closeImg.hide();
		openImg.show();
		open_div.css({"left":"0px"});
		btn_div.hide();
	});
	
	if(_this.btnData.buttonParams){
		var jss = JSON2.parse(_this.btnData.buttonParams);
		if(jss.isShowLeftDiv &&　jss.isShowLeftDiv == true){  
			openImg.click();
		}else{　　//自定义左侧panel是否默认不展开
			
		}
	}
	var btnHeight = 45;	
	var blist = _this.btnData.blist;
	if(blist.length > 0){
		$.each(blist,function(idx,ele){
			if(ele.buttonType == "map_left" && ele.buttonLevel == 2){
				if(ele.display < 1){
					t++;
				}
				var obj = {
					"topObject":_this,
					"btnData":ele,
					"leftDiv":middleDiv
				};
				var leftBtn = new MAP_LEFT_BTN(obj);
				leftBtn.init();
			}
		});
		if(t>0){
			//根据按钮的数量，计算左右折叠按钮的top高度
			var height = btnHeight*t;
			open_div.css({"top":(height/2)+15});
			//根据地图高度与按钮的数量，计算地图左按钮的top高度
			var leftPanelTop = ($(window).height() - height)/2;
			
			if(_this.btnData.buttonParams){
				var jss = JSON2.parse(_this.btnData.buttonParams);
				if(jss.isHasTitleTop){  //地图头部是否有标题，左侧按钮应和右侧panel距离地图头部一样高
					leftPanelTop = (($(window).height()+jss.isHasTitleTop*1) - height)/2;
				}
			}
			_this.leftNode.css({"top":leftPanelTop});
			var topImg = $("<img/>").attr({"src":$.getPrefixImgUrl("deepblue","/bigScreen/left_top.png")});
			var bottomImg = $("<img/>").attr({"src":$.getPrefixImgUrl("deepblue","/bigScreen/left_footer.png")});
			topImgDiv.append(topImg);
			bottomImgDiv.append(bottomImg);
			_this.leftNode.append(btn_div).append(open_div);
		}
	}
}
//初始化地图下按钮
MAP_TOP_BTN.prototype.initBottom = function(){
	var _this = this;
	_this.bottomNode.empty();
	var t = 0;
	var map = _this.baiduObj.map;
	
	var open_div = $("<div/>").addClass("bottom_open_div_panel").css({"bottom":"62px"});
	var openImg = $("<img/>").attr({src:$.getPrefixImgUrl("deepblue","/bigScreen/bottom_top_close.png")});
	var closeImg = $("<img/>").hide().attr({src:$.getPrefixImgUrl("deepblue","/bigScreen/bottom_top_open.png")});
	open_div.append(openImg).append(closeImg);
	
	var bottom_div = $("<div/>").addClass("map_bottom_btn_panel");
	var leftImgDiv = $("<div/>").addClass("map_btn_img_bg_bottom_left");
	var middleDiv = $("<div/>").addClass("map_btn_img_bg_bottom_middle");
	var rightImgDiv = $("<div/>").addClass("map_btn_img_bg_bottom_right");
	bottom_div.append(leftImgDiv).append(middleDiv).append(rightImgDiv);
	
	openImg.bind("click",function(){
		closeImg.show();
		openImg.hide();
		open_div.css({"bottom":"22px"});
		bottom_div.hide();
	});
	closeImg.bind("click",function(){
		closeImg.hide();
		openImg.show();
		open_div.css({"bottom":"62px"});
		bottom_div.show();
	});
	
	if(_this.btnData.buttonParams){
		var jss = JSON2.parse(_this.btnData.buttonParams);
		if(jss.isShowBottomDiv &&　jss.isShowBottomDiv == true){  
			openImg.click();
		}else{　　//自定义下侧panel是否默认不展开
			
		}
	}
	var btnWidth = 45;	
	var blist = _this.btnData.blist;
	if(blist.length > 0){
		$.each(blist,function(idx,ele){
			if(ele.buttonType == "map_bottom" && ele.buttonLevel == 2){
				if(ele.display < 1){
					t++;
				}
				var obj = {
					"topObject":_this,
					"btnData":ele,
					"bottomDiv":middleDiv
				};
				var bottomBtn = new MAP_BOTTOM_BTN(obj);
				bottomBtn.init();
			}
		})
		if(t>0){
			//根据按钮的数量，计算上下折叠按钮的left距离
		    var width = btnWidth*t;
			middleDiv.css({"width":width});
			open_div.css({"left":(width/2)+20});
			//根据地图宽度与按钮的数量，计算地图下按钮的left距离
		    var bottomPanelLeft = ($(window).width() - width)/2-20;
			var panelWidth = 45*t+90;
			_this.bottomNode.css({"left":bottomPanelLeft,"width":panelWidth+"px"});
			var leftImg = $("<img/>").attr({"src":$.getPrefixImgUrl("deepblue","/bigScreen/bottom_left.png")});
			var rightImg = $("<img/>").attr({"src":$.getPrefixImgUrl("deepblue","/bigScreen/bottom_right.png")});
			leftImgDiv.append(leftImg);
			rightImgDiv.append(rightImg);
			_this.bottomNode.append(open_div).append(bottom_div);
		}else{
			_this.bottomNode.css({"width":"0px"});
		}
	}
}

//初始化地图右按钮
MAP_TOP_BTN.prototype.initRight = function(){
	var _this = this;
	var jss = {};
	if(_this.btnData.buttonParams){
		jss = JSON2.parse(_this.btnData.buttonParams);
	}
	var t = 0;
	_this.rightNode.empty();
	var map = _this.baiduObj.map;
	var btnWidth = 270;
	var btnHeight = $(window).height();
	
	var open_div = $("<div/>").addClass("right_open_div_panel").css({"right":"-4px"});
	var openImg = $("<img/>").attr({src:$.getPrefixImgUrl("deepblue","/bigScreen/y_close_right.png")});
	var closeImg = $("<img/>").hide().attr({src:$.getPrefixImgUrl("deepblue","/bigScreen/y_open_right.png")});
	open_div.append(openImg).append(closeImg);
	
	var rightPanelCss = "map_right_btn_panel";
	if(jss.defaultPanelColor && jss.defaultPanelColor == "default"){
		rightPanelCss = "map_right_btn_panel_default";
	}
	var right_div = $("<div/>").addClass(rightPanelCss).css({"right":-btnWidth+"px"});
	var middleDiv = $("<div/>").addClass("map_btn_img_bg_right").css({"height":"100%"});
	right_div.append(middleDiv);
	if(jss.rightPanel){
		if(jss.rightPanel.rightWidth){
			btnWidth = btnWidth - jss.rightPanel.rightWidth;
		}
		if(jss.rightPanel.rightWidth){
			btnHeight = btnHeight - jss.rightPanel.rightHeight;
		}
	}
	openImg.bind("click",function(){
		closeImg.show();
		openImg.hide();
		open_div.css({"right":btnWidth-4});
		right_div.css({"right":"0px"});
		right_div.show();
	});
	closeImg.bind("click",function(){
		closeImg.hide();
		openImg.show();
		open_div.css({"right":"-4px"});
		right_div.css({"right":btnWidth+"px"});
		right_div.hide();
	});
	
	if(jss.isShowRightDiv &&　jss.isShowRightDiv == true){			
		openImg.click();
	}else{　　//自定义下侧panel是否默认不展开
		
	}
	
	var blist = _this.btnData.blist;
	if(blist.length > 0){
	    $.each(blist,function(idx,ele){
			if(ele.buttonType == "map_right" && ele.buttonLevel == 2){
			   t++;	
			   var obj = {
					"topObject":_this,
					"btnData":ele,
					"rightDiv":middleDiv
				};
				var rightBtn = new MAP_RIGHT_BTN(obj);
				rightBtn.init();
			}
		})
		if(t>0){
			open_div.css({"top":(btnHeight/2+20)});
			//根据右边panel的高度，计算地图右按钮的top距离
		    var rightPanelTop = 0;
			if(_this.btnData.buttonParams){
				var jss = JSON2.parse(_this.btnData.buttonParams);
				if(jss.isHasTitleTop){  //地图头部是否有标题，左侧按钮应和右侧panel距离地图头部一样高
					rightPanelTop = 100;
					btnHeight = btnHeight -40;
				}
			}
			//根据右边panel的高度，计算左右折叠按钮的top距离
			right_div.css({"width":btnWidth,"height":btnHeight,"top":rightPanelTop+"px"});
			_this.rightNode.append(open_div).append(right_div);
		}
	}
}
/********************** MAP_TOP_BTN end *****************************/

/********************** MAP_LEFT_BTN start *****************************/
/**
 * 地图左上角对象
 * obj={
	"topObject": MAP_TOP_BTN对象
	"btnData":按钮数据 对应plat_button
	"leftDiv": 地图左侧按钮容器 	 
 }
 */
function MAP_LEFT_BTN(obj){
  this.mapTopBtn = obj.topObject;
  this.btnData = obj.btnData;
  this.leftDiv = obj.leftDiv;
  this.activeStatus = 1;  //当前状态  1未激活状态，2激活状态
}

MAP_LEFT_BTN.prototype.init = function(){
	var _this = this;
	_this.leftNodeMuster = {};
	//$.hy_log("---------MAP_LEFT_BTN-----------",_this);
	var btnData = _this.btnData;
	var left_btn= $("<div/>").addClass("map_left_btn").attr({
		id: btnData.buttonCode,
		title: btnData.buttonName
	});
	var p = btnData.buttonParams;
	if(p){
		var j = JSON2.parse(p);
		_this.jsonParams = j;
		_this.mapTopBtn.LEFT_BTNS_CACHE[j.buttonType] = _this;	
		var btn_img_div = $("<div/>").addClass("map_left_btn_bg");
		var defaultDiv = $("<div/>").attr({"id":"default-panel-"+btnData.buttonCode}).hide();
		var defaultImg = $("<img/>").addClass("default_map_left_btn_img").attr({src:$.getPrefixImgUrl("deepblue",j.img)});
		var activeImg = $("<img/>").addClass("active_map_left_btn_img").hide().attr({src:$.getPrefixImgUrl("deepblue",j.active_img)});
		btn_img_div.append(defaultImg).append(activeImg);
		_this.leftNodeMuster["defaultImg"] = defaultImg;
		_this.leftNodeMuster["activeImg"] = activeImg;
		
		if(j.showBtnLabel && j.showBtnLabel){
			btn_img_div.append($("<div/>").addClass("map_left_btn_label").html(btnData.buttonName));
		}		
		left_btn.attr(j).append(btn_img_div);
        if(j.buttonType){
			left_btn.attr({"buttonType":j.buttonType});
		}		
		if(j.initEvent){
			try{
				_this[j.initEvent] && _this[j.initEvent]();
			}catch(e){
			  $.hy_error(e," MAP_LEFT_BTN.prototype.init initEvent function ! plat.js 6196 line:: " + j.initEvent);
			}
		}
		left_btn.bind("click",function(){
			$.each(_this.mapTopBtn.LEFT_BTNS_CACHE,function(idx,ele){
				if(btnData.buttonCode == ele.btnData.buttonCode){
					if(_this.activeStatus == 1){
				        ele.active();
					    defaultDiv.show();
			        }else{
						ele.noActive();
					    defaultDiv.hide();
					}	
				}
			})
		});
		if(j.active_default && j.active_default == "active"){
			left_btn.click();
		}
		if(btnData.display == 1){
			left_btn.hide();
		}
		_this.leftDiv.append(left_btn).append(defaultDiv);
	}
}

//地图左按钮 激活事件
MAP_LEFT_BTN.prototype.active = function(){
	var _this = this;
	_this.activeStatus = 2;
	_this.leftNodeMuster.defaultImg.hide();
	_this.leftNodeMuster.activeImg.show();
	if(_this.jsonParams.openEvent){
		try{
			_this[_this.jsonParams.openEvent] && _this[_this.jsonParams.openEvent]();
		}catch(e){
		    $.hy_error(e," MAP_LEFT_BTN.prototype.init openEvent function ! plat.js 6232 line:: " + _this.jsonParams.openEvent);
		}
	}
}
//地图左按钮 取消激活事件
MAP_LEFT_BTN.prototype.noActive = function(){
	var _this = this;
	_this.activeStatus = 1;
	_this.leftNodeMuster.defaultImg.show();
	_this.leftNodeMuster.activeImg.hide();
	if(_this.jsonParams.closeEvent){
		try{
			_this[_this.jsonParams.closeEvent] && _this[_this.jsonParams.closeEvent]();
		}catch(e){
		  $.hy_error(e," MAP_LEFT_BTN.prototype.init closeEvent function ! plat.js 6246 line:: " + _this.jsonParams.closeEvent);
		}
	}
}

MAP_LEFT_BTN.prototype.getStatus = function(buttonType){
	var _this = this;
	var btn = _this.mapTopBtn.BOTTOM_BTNS_CACHE[buttonType];
	if(btn){
		return btn.activeStatus;
	}
}

//初始化围栏数据
MAP_LEFT_BTN.prototype.initEfenceOnMap = function(){
	var _this = this;
	var jsonParams = _this.jsonParams;
	if(jsonParams.url){
		$.each(jsonParams.url,function(i,n){
			var postData = $.getPostParams(n.postDynamicParam,{});
			var opt = {
				"url":n.url,
				"data":postData
			};
			PLAT.getList(opt,function(res){
				_this.mapTopBtn.LEFT_BTNS_CACHE[jsonParams.buttonType][jsonParams.buttonType] = {};
				if(jsonParams.isClus){ //围栏有聚合状态
					_this.initClusEfencesMarker(res.result);
				}else{ //围栏无聚合状态
				    PLAT.asMethodFunc(res.result,function(p){
						_this.initEfencesMarker(p);
					},5);
				}
			});
		})
	}
}

//有聚合状态的围栏
MAP_LEFT_BTN.prototype.initClusEfencesMarker = function(data){
	var _this = this;
	_this.maxZoom = 17;
	_this.gridSize = 1000;
	_this.juheSize = new BMap.Size(90,90);
	_this._styles = [];
	var map = _this.mapTopBtn.baiduObj.map;
	var jsonParams = _this.jsonParams;
	var mp = jsonParams.mapParams;
	if(data.length > 0 && mp){
		if(jsonParams.maxZoom){
			_this.maxZoom = jsonParams.maxZoom;
		}
		var storeyObj = {};
		data.forEach(function(item,suffix){
			//根据对象的属性是唯一的，将值作为对象的属性名
			var jss = JSON2.parse(item.efenceParams);
			if(!storeyObj[jss.storey]){
				storeyObj[jss.storey]={};
			}
		})
		data.forEach(function(item,suffix){
			var jss = JSON2.parse(item.efenceParams);
			if(!storeyObj[jss.storey][item.entCode]){
				var arr=[];
				arr.push(item);
				storeyObj[jss.storey][item.entCode] = arr;
			}else{
				$.each(storeyObj[jss.storey],function(iidx,eele){
					if(eele[0].entCode==item.entCode){
						eele.push(item)
					}
				})
			}
		})
		_this.postArray = {};
		$.each(storeyObj,function(idx,ele){
			// i 楼层
			_this.postData = {};
			_this.postArray[idx] = {};
			$.each(ele,function(iidx,eele){
				//iidx entCode
				_this._styles.push({size:_this.juheSize,url:$.getImgUrl("/juhe/"+idx+"_"+iidx+"_gangdian.png"),"color":"#fff"});
				$.each(eele,function(iiidx,eeele){
					var saveKey = mp.markerSave;
					var key =  PLAT.getSaveKey(eeele,saveKey);
					var leftCache = _this.mapTopBtn.LEFT_BTNS_CACHE[jsonParams.buttonType];
					if(eeele.efenceParams){
						var jss = JSON2.parse(eeele.efenceParams);
						if(idx == jss.storey){
							leftCache[jsonParams.buttonType][key] = _this.drawEfenceOnMap(eeele);
							PLAT.setMarkerEvent(_this,leftCache[jsonParams.buttonType][key],mp, eeele);
							_this.postData[key] = {"data": eeele,"overlay":leftCache[jsonParams.buttonType][key]};
						}
					}
				})
			})
			
			$.each(_this.postData,function(idx,ele){
				var jss = JSON2.parse(ele.data.efenceParams);
				if(_this.postArray[jss.storey][ele.data.entCode]){
					_this.postArray[jss.storey][ele.data.entCode]["list"].push(ele.overlay);  
					_this.postArray[jss.storey][ele.data.entCode]["data"]= ele.data; 
                    _this.postArray[jss.storey][ele.data.entCode]["storey"]= jss.storey; 					
				}else{
					_this.postArray[jss.storey][ele.data.entCode]={"list":[ele.overlay],"data":ele.data,"storey":jss.storey};
				}
			});
		})
		var leftBtn = _this.mapTopBtn.LEFT_BTNS_CACHE[jsonParams.buttonType];
		if(leftBtn.activeStatus == "2"){
			$.each(_this.postArray,function(idx,ele){
				if(idx == "B1"){  //默认画在B1曾
					$.each(ele,function(iidx,eele){
						if(eele.clus){
							eele.clus.clearMarkers();
						}
						if(eele.list && eele.list.length>0){
							eele.clus = new BMapLib.MarkerClusterer(map, {
								markers: eele.list,
								maxZoom: _this.maxZoom,
								gridSize: _this.gridSize,
								styles:_this._styles,
								//data:eele.data.entName,
								isAverageCenter:true
							});
						}
					})
				}
			})
		}
	}
}

//无聚合状态的围栏
MAP_LEFT_BTN.prototype.initEfencesMarker = function(data){
	var _this = this;
	var jsonParams = _this.jsonParams;
	var mp = jsonParams.mapParams;
	if(mp){
		var saveKey = mp.markerSave;
		var key =  PLAT.getSaveKey(data,saveKey);
		var leftCache = _this.mapTopBtn.LEFT_BTNS_CACHE[jsonParams.buttonType];
		if(data.efenceParams){
			var jss = JSON2.parse(data.efenceParams);
			leftCache[jsonParams.buttonType][key] = _this.drawEfenceOnMap(data);
		    PLAT.setMarkerEvent(_this,leftCache[jsonParams.buttonType][key],mp, data);
		}
	}
}

//地图上面画围栏
MAP_LEFT_BTN.prototype.drawEfenceOnMap = function(data){
	var _this = this;
	var map = _this.mapTopBtn.baiduObj.map;
	var btnData = _this.btnData;
	var jsonParams = _this.jsonParams;
	var mp = jsonParams.mapParams;
	var cacheKey = jsonParams.buttonType;
	var pp = _this[cacheKey][data.entCode+"_"+data.code];
	var overlay;
	if(pp){
		overlay = pp;
	}else{
		//1圆、3多边形、4线条、5点
		if(data.efenceParams){
			var jss = JSON2.parse(data.efenceParams);
			if("1"==jss.shapeType){  //圆
				var points = jss.polygons.split(",");
				if(points.length==3){
					var styles = jss.fenceStyle.split("|");
					if(styles.length==6){
						var circleOptions = {
							"strokeStyle":styles[0],
							"strokeColor":styles[1],
							"strokeWeight":styles[2],
							"strokeOpacity":styles[3],
							"fillColor":styles[4],
							"fillOpacity":styles[5]
						};
						var circlePoint = new BMap.Point(points[0],points[1]);
						var radius = points[2];
						overlay = new BMap.Circle(circlePoint,radius,circleOptions);
						var label = new BMap.Label(data[mp.markderLabelTitle.content],{
							offset:new BMap.Size(-20,-35),
							position : circlePoint 
						});
						overlay.label = label;
					}
				}
			}else if("3"==jss.shapeType){ //多边形
				var points = jss.polygons.split(";");
				if(points.length>0){
					var styles = jss.fenceStyle.split("|");
					if(styles.length==6){
						var polygonOptions = {
							"strokeStyle":styles[0],
							"strokeColor":styles[1],
							"strokeWeight":styles[2],
							"strokeOpacity":styles[3],
							"fillColor":styles[4],
							"fillOpacity":styles[5]
						};
						var pointsArr = new Array();
						for(var i=0;i<points.length;i++){
							var lnglat = points[i].split(",");
							pointsArr.push(new BMap.Point(lnglat[0],lnglat[1]));
						}
						overlay = new BMap.Polygon(pointsArr, polygonOptions);  //创建多边形
						var label = new BMap.Label(data[mp.markderLabelTitle.content],{
							offset:new BMap.Size(-20,-35),
							position : overlay.getBounds().getCenter() 
						});
						overlay.label = label;
					}
				}
			}else if("4"==jss.shapeType){ //线条
				var points = jss.polygons.split(";");
				if(points.length>0){
					var styles = jss.fenceStyle.split("|");
					if(styles.length==6){
						var polylineOptions = {
							"strokeStyle":styles[0],
							"strokeColor":styles[1],
							"strokeWeight":styles[2],
							"strokeOpacity":styles[3]
						};
						var pointsArr = new Array();
						for(var i=0;i<points.length;i++){
							var lnglat = points[i].split(",");
							pointsArr.push(new BMap.Point(lnglat[0],lnglat[1]));
						}
						overlay = new BMap.Polyline(pointsArr, polylineOptions);
						var label = new BMap.Label(data[mp.markderLabelTitle.content],{
							offset:new BMap.Size(-20,-35),
							position : pointsArr[0] 
						});
						overlay.label = label;
					}
				}
			}else if("5"==jss.shapeType){ //点
				if(data[mp.positionParam.lng] && data[mp.positionParam.lng] > 0 && data[mp.positionParam.lat] && data[mp.positionParam.lat]>0){
					var postPos = new BMap.Point(data[mp.positionParam.lng], data[mp.positionParam.lat]);
					if(cacheKey == "CG_EFENCE_AREA"){
						if(jss.radius && jss.radius != ""){
							overlay = new BMap.Circle(postPos,jss.radius/10,{
								strokeColor:"#000000", strokeWeight:2, strokeOpacity:0.6,fillColor:"#FFFFFF",fillOpacity:0.2,strokeStyle:"dashed"
							});
						}
					}else{
						if(jss.guardImg && jss.guardImg != ""){
							var postImgUrl = $.getImgUrl(jss.guardImg);
							var postImgSize = new BMap.Size(mp.markerSize.width*1, mp.markerSize.height*1);
							var postIcon = new BMap.Icon(postImgUrl,postImgSize);
							postIcon.setImageSize(postImgSize);
							overlay = new BMap.Marker(postPos,{icon:postIcon});
						}else{
							overlay = new BMap.Marker(postPos);
						}
						var label = new BMap.Label(data[mp.markderLabelTitle.content],{
							offset:new BMap.Size(-20,-35),
							position : postPos 
						});
						overlay.label = label;
					}
				}
			}
			
			if(map){
				if(jsonParams.active_default && jsonParams.active_default == "active"){
					if(jss.storey){
						if(jss.storey == "B1"){ //默认画在B1层
							overlay.show();
							overlay.label.hide();
						}else{
							overlay.hide();
						}
					}else{
						overlay.show();
						overlay.label.hide();
					}				
				}else{
					overlay.hide();
				}
				if(overlay.label){
					overlay.label.hide();
					overlay.label.setStyle(mp.markerLabelStyle);
				}
				if(jsonParams.isClus){  //围栏有聚合状态
				    
				}else{  //围栏无聚合状态
					map.addOverlay(overlay);
					if(overlay.label){
						map.addOverlay(overlay.label);
						overlay.label.hide();
					}
				}
			}
		}
	}
	overlay = $.extend(overlay,{"data":data});
	return overlay;
}

MAP_LEFT_BTN.prototype.showPointsMarker = function(){
	var _this = this;
	var map = _this.mapTopBtn.baiduObj.map;
	var jsonParams = _this.jsonParams;
	if(_this[jsonParams.buttonType]){
		$.each(_this[jsonParams.buttonType],function(idx,ele){
			if(ele){
				var jss = JSON2.parse(ele.data.efenceParams);
				if(_this.mapTopBtn.baiduObj.indoorManager && _this.mapTopBtn.baiduObj.indoorManager.getFloor()){
					if(_this.mapTopBtn.baiduObj.indoorManager.getFloor() == jss.storey){
						ele.show();
						if(_this.getStatus("markerLabel") == 2){
							ele.label.show();
						}
					}else{
						//$.messageDialog("该围栏不在当前楼层中");
					}
				}else{
					ele.show();
					if(_this.getStatus("markerLabel") == 2){
						ele.label.show();
					}
				}
			}
		})
	}
	//显示聚合点
	if(_this.postArray && _this.mapTopBtn.baiduObj.indoorManager && _this.mapTopBtn.baiduObj.indoorManager.getFloor()){
		$.each(_this.postArray,function(idx,ele){
			if(idx == _this.mapTopBtn.baiduObj.indoorManager.getFloor()){
			    $.each(ele,function(iidx,eele){
					if(eele.clus){
						eele.clus.clearMarkers();	
					}
					if(eele.list && eele.list.length>0){
						eele.clus = new BMapLib.MarkerClusterer(map, {
							markers: eele.list,
							maxZoom: _this.maxZoom,
							gridSize: _this.gridSize,
							styles:_this._styles,
							//data:eele.data.entName,
							isAverageCenter:true
						});
					}
			    })
			}
		});
	}
}

MAP_LEFT_BTN.prototype.hidePointsMarker = function(){
	var _this = this;
	var map = _this.mapTopBtn.baiduObj.map;
    var jsonParams = _this.jsonParams;
	if(_this[jsonParams.buttonType]){
		$.each(_this[jsonParams.buttonType],function(idx,ele){
			if(ele){
				var jss = JSON2.parse(ele.data.efenceParams);
				if(_this.mapTopBtn.baiduObj.indoorManager && _this.mapTopBtn.baiduObj.indoorManager.getFloor()){
					if(_this.mapTopBtn.baiduObj.indoorManager.getFloor() == jss.storey){
						ele.hide();
						if(ele.label){
							ele.label.hide();
						}
						if(ele.customCover){
							ele.customCover.removeHyCustomCover();
							map.removeOverlay(ele.customCover);
						}
					}
				}else{
					ele.hide();
					if(ele.label){
						ele.label.hide();
					}
					if(ele.customCover){
						ele.customCover.removeHyCustomCover();
						map.removeOverlay(ele.customCover);
					}
				}
			}
		})
	}
	//隐藏聚合点
	if(_this.postArray && _this.mapTopBtn.baiduObj.indoorManager && _this.mapTopBtn.baiduObj.indoorManager.getFloor()){
		$.each(_this.postArray,function(idx,ele){
			if(idx == _this.mapTopBtn.baiduObj.indoorManager.getFloor()){
				$.each(ele,function(iidx,eele){
					if(eele.clus){
						eele.clus.clearMarkers();	
					}
				})
			}
		});
	}
}

//地图左 overlay的点击事件
MAP_LEFT_BTN.prototype.clickMapOverlay = function(marker,event,field){
	var _this = this;
	_this.markerField = field;
	var map = _this.mapTopBtn.baiduObj.map;
	var mapParams = _this.jsonParams.mapParams;
	var saveKey = mapParams.markerSave;
	var key = PLAT.getSaveKey(field,saveKey);
	var overlayData = _this[_this.jsonParams.buttonType][key];
	var kk = "comp_"+key;
	$("#close_" + kk).click();
	
	var obj = {
		"object":_this,
		"marker":marker,
		"iflag":kk,
		"type":"overlay"  //点击的类型是overlay
	};
	var myCompOverlay = PLAT.setHyCustomCover(obj); 
	map.addOverlay(myCompOverlay);
	overlayData.customCover = myCompOverlay;
	$("#" + "topDiv_"+kk).html(field[mapParams.markderLabelTitle.content]?field[mapParams.markderLabelTitle.content]:"详情");
	
	var box_div = $("#" + kk);
	var row = $("<div/>").addClass("row");
	_this.setHyCustomCoverField(marker,row,"overlay");
	box_div.append(row);
	
	var bottomBtn = $("#" + "bottomDiv_"+kk);
	_this.setHyCustomCoverBtn(bottomBtn);
	var closeBtn = $("<span/>").attr({"id":"close_"+kk,"tag":"close"}).addClass("CompOverlayBtn").html("关闭").bind("click",function(){
		var jss = {};
		if(field.efenceParams){
			jss = JSON2.parse(field.efenceParams);
		}
		/*if(_this.mapTopBtn.baiduObj.indoorManager){
			$("button.selected").click();
			if(jss.storey){
				_this.mapTopBtn.baiduObj.indoorManager.setIndoor(platParams.MAP_BUILDING_ID, _this.mapTopBtn.baiduObj.indoorManager.getFloor() != null ?_this.mapTopBtn.baiduObj.indoorManager.getFloor():jss.storey, {});
			}else{
				_this.mapTopBtn.baiduObj.indoorManager.setIndoor(platParams.MAP_BUILDING_ID, _this.mapTopBtn.baiduObj.indoorManager.getFloor() != null ?_this.mapTopBtn.baiduObj.indoorManager.getFloor():"B1", {});
			}
		}*/
		if(_this.liveMainPlay){
			//HYSDK.stopPlay(_this.liveMainPlay);
			_this.liveMainPlay.stopPlay();
		}
		if(myCompOverlay){
			myCompOverlay.removeHyCustomCover();
			map.removeOverlay(myCompOverlay);
			try{
				delete overlayData.customCover;
			}catch(e){
				$.hy_log("plat.js line 6699"+e);
			}
		}
	});
	bottomBtn.append(closeBtn);
}

MAP_LEFT_BTN.prototype.setHyCustomCoverField = function(marker,row,type){
	var _this = this;	
	var roleData = _this.btnData;
	if(roleData.flist.length > 0){
		var ops = {btnParams:roleData,pnode:row};
		if(_this.markerField){
			ops.srcData = _this.markerField;
		}
		ops.labelStyle = "mapDeepBlue";
		var element = new DrawElement(ops);
		$.each(roleData.flist,function(i,n){
			if(n.fieldParams){
				var jj = JSON2.parse(n.fieldParams);
				if(jj.initValueType == "mapAddr"){
					try{		
                        var position = {};
                        if(type == "marker"){
							position = marker.getPosition();
						}else if(type == "overlay"){
							position = PLAT.hyGetOverlayCenterPoint(marker);
						}						
						//var pit = marker.getPosition();
						var gc = new BMap.Geocoder(); 
						gc.getLocation(position, function(res) {
							if(res && res.address){										
								//$("span[tag='"+n.fieldName+"']",row).html(res.address).attr({title:res.address});	
                                $("div",$("div[name='"+n.fieldName+"']",row)).html(res.address).attr({title:res.address});									
							}
						});
					}catch(e){$.hy_log(" get address error ！ plat.js 6735 line . " + e)};
				}
			}
		})
	}
}

MAP_LEFT_BTN.prototype.setHyCustomCoverBtn = function(row){
	var _this = this;	
	var roleData = _this.btnData;
	if(roleData.blist.length > 0){
		$.each(roleData.blist,function(i,n){
			if(n.buttonType == "map_left" && n.buttonLevel == 3){
				var jss = {};
				if(n.buttonParams){
				   jss = JSON2.parse(n.buttonParams); 
				}
				var btnSpan = $("<span/>").addClass("CompOverlayBtn").html(n.buttonName).bind("click",function(){
					if(btnSpan.hasClass("CompOverlayBtn-grey")){
						return;
					};
					if(btnSpan.hasClass("CompOverlayBtn-uncheck-grey")){
						return;
					}else{
						PlatGrid.prototype[n.enableDialog](n,{srcData: _this.markerField});
					}
					btnSpan.removeClass("CompOverlayBtn").addClass("CompOverlayBtn-uncheck-grey");
					setTimeout(function(){
						btnSpan.removeClass("CompOverlayBtn-uncheck-grey").addClass("CompOverlayBtn");
					},3000);
					
				});
				row.append(btnSpan);
			}
		})
	}
}

/********************** MAP_LEFT_BTN end *****************************/

/********************** MAP_BOTTOM_BTN start ****************************/
/**
 * 地图下按钮对象
 * obj={
	"topObject": MAP_TOP_BTN对象
	"btnData":按钮数据 对应plat_button
	"bottomDiv": 地图下侧按钮容器 	 
 }
 */
function MAP_BOTTOM_BTN(obj){
	this.mapTopBtn = obj.topObject;
	this.btnData = obj.btnData;
	this.bottomDiv = obj.bottomDiv;
	this.activeStatus = 1;  //当前状态  1未激活状态，2激活状态
	this.defaultActive = 1;//默认激活状态  1 未激活状态  2 激活状态
}

MAP_BOTTOM_BTN.prototype.init = function(){
	var _this = this;
	//$.hy_log("---------MAP_BOTTOM_BTN-----------",_this);
	_this.bottomNodeMuster = {};
	var btnData = _this.btnData;
	var bottom_btn = $("<div/>").addClass("map_bottom_btn").attr({
		id: btnData.buttonCode,
		title: btnData.buttonName
	});
	var p = btnData.buttonParams;
	if(p){
		var j = JSON2.parse(p);
		_this.jsonParams = j;
		_this.mapTopBtn.BOTTOM_BTNS_CACHE[j.buttonType] = _this;	
		var btn_img_div = $("<div/>").addClass("map_bottom_btn_bg");
		var defaultImg = $("<img/>").addClass("default_map_bottom_btn_img").attr({src:$.getPrefixImgUrl("deepblue",j.img)});
		var activeImg = $("<img/>").addClass("active_map_bottom_btn_img").hide().attr({src:$.getPrefixImgUrl("deepblue",j.active_img)});
		btn_img_div.append(defaultImg).append(activeImg);
		_this.bottomNodeMuster["defaultImg"] = defaultImg;
		_this.bottomNodeMuster["activeImg"] = activeImg;
		if(j.showBtnLabel && j.showBtnLabel){
			btn_img_div.append($("<div/>").addClass("map_bottom_btn_label").html(btnData.buttonName));
		}
        if(j.initEvent){
			try{
				_this[j.initEvent]();
			}catch(e){
			  $.hy_error(e," MAP_BOTTOM_BTN.prototype.init initEvent function ! plat.js 6819 line:: " + j.initEvent);
			}
		}
		bottom_btn.attr(j).append(btn_img_div);	
		bottom_btn.bind("click",function(){
			$.each(_this.mapTopBtn.BOTTOM_BTNS_CACHE,function(idx,ele){
				if(btnData.buttonCode == ele.btnData.buttonCode){
					if(_this.activeStatus == 1){
				        ele.active();
			        }else{
						ele.noActive(); 
				    }
				}
			})
		});
		if(j.active_default && j.active_default == "active"){
			bottom_btn.click();
			_this.defaultActive = 2;
		}
		if(btnData.display == 1){
			bottom_btn.hide();
		}
		_this.bottomDiv.append(bottom_btn);
	}
}

//地图下按钮 激活事件
MAP_BOTTOM_BTN.prototype.active = function(){
	var _this = this;
	_this.activeStatus = 2;
	_this.bottomNodeMuster.defaultImg.hide();
	_this.bottomNodeMuster.activeImg.show();
	if(_this.jsonParams.openEvent){
		try{
			_this[_this.jsonParams.openEvent]();
		}catch(e){
		    $.hy_error(e," MAP_LEFT_BTN.prototype.init openEvent function ! plat.js 6855 line:: " + _this.jsonParams.openEvent);
		}
	}
}
//地图下按钮 取消激活事件
MAP_BOTTOM_BTN.prototype.noActive = function(){
	var _this = this;
	_this.activeStatus = 1;
	_this.bottomNodeMuster.defaultImg.show();
	_this.bottomNodeMuster.activeImg.hide();
	if(_this.jsonParams.closeEvent){
		try{
			_this[_this.jsonParams.closeEvent]();
		}catch(e){
		  $.hy_error(e," MAP_LEFT_BTN.prototype.init closeEvent function ! plat.js 6869 line:: " + _this.jsonParams.closeEvent);
		}
	}
}
//初始化地图人员信息
MAP_BOTTOM_BTN.prototype.initStoreUserMarker = function(){
	var _this = this;
	var jsonParams = _this.jsonParams;
	if(jsonParams.url){
		$.each(jsonParams.url,function(i,n){
			var postData = $.getPostParams(n.postDynamicParam,{});
			var opt = {
				"url":n.url,
				"curPage": 1,
				"pageSize": 6000,
				"data":postData
			};
			if(jsonParams.isClus){ //人员有聚合状态
				//TODO
				//_this.initClusUserMarker(p);
			}else{ //人员无聚合状态
				PLAT.getGrid(opt,function(p){
					if(p.code == 0 && p.result){
						_this.mapTopBtn.BOTTOM_BTNS_CACHE[jsonParams.buttonType][jsonParams.buttonType] = {};
						$.each(p.result,function(idx,ele){
							_this.initUsersMarker(ele);
						})
					}
				},function(){
					
				});
			}
		})
	}
}

MAP_BOTTOM_BTN.prototype.initUsersMarker = function(data){
	var _this = this;
	var map = _this.mapTopBtn.baiduObj.map;
	var mp = _this.jsonParams.mapParams;
	if(mp){
		var saveKey = mp.markerSave;
		var key =  PLAT.getSaveKey(data,saveKey);
		_this[_this.jsonParams.buttonType][key] = data;
		var mapPoint = platParams.mapCenterLatLng;
		var point = mapPoint.lastIndexOf(',');
		var lng = mapPoint.substring(0,point);
		var lat = mapPoint.substring(point+1);
		
		var point = PLAT.getBMapPoint({"lng": data[mp.positionParam.lng]?data[mp.positionParam.lng]:lng, "lat": data[mp.positionParam.lat]?data[mp.positionParam.lat]:lat}); 
		var markerType = PLAT.getMarkerType(mp, data);
		var markerStatus = PLAT.getMarkerStatus(mp,data);
		var mapSize  = PLAT.getMarkerSize(mp);
		var ticon = new BMap.Icon($.getMarkIconByType("user"+markerType,markerStatus),mapSize);
		var marker = new BMap.Marker(point,{icon:ticon});
		PLAT.isEnableDragging(mp,marker);
        map.addOverlay(marker);
		_this[_this.jsonParams.buttonType][key]["addMarker"] = false;
		var label = PLAT.setMarkerLabel(mp,point,data);
		if(mp.markderLabelTitle.show == false){
			label.hide();
			_this[_this.jsonParams.buttonType][key].showLabel = false;
		}else{
			_this[_this.jsonParams.buttonType][key].showLabel = true;
		}
		if(_this.getStatus("markerLabel") == 2){
		   label.show();
		}
		marker.setLabel(label);
		if(_this.activeStatus == 1){
			marker.hide();
		}
		PLAT.setMarkerEvent(_this,marker,mp, data);
	
		_this[_this.jsonParams.buttonType][key].marker = marker;
		_this[_this.jsonParams.buttonType][key].label = label;
	}
}
//地图下 显示人员
MAP_BOTTOM_BTN.prototype.showUsersMarker = function(){
	var _this = this;
	if(!$.isEmptyObject(_this[_this.jsonParams.buttonType])){
		$.each(_this[_this.jsonParams.buttonType],function(idx,ele){
			if(ele.marker){
				ele.marker.show();
			}
			if(ele.label){
				if(_this.getStatus("markerLabel") == 2){
					ele.label.show();
				}
				ele.showLabel = true;
			}
		});
	}
}
//地图下 隐藏人员
MAP_BOTTOM_BTN.prototype.hideUsersMarker = function(){
	var _this = this;
	if(!$.isEmptyObject(_this[_this.jsonParams.buttonType])){
		$.each(_this[_this.jsonParams.buttonType],function(idx,ele){
			if(ele.marker){
				ele.marker.hide();
			}
			if(ele.label){
				ele.label.hide();
				ele.showLabel = false;
			}
			if(ele.customCover){
				ele.customCover.removeHyCustomCover();
				map.removeOverlay(ele.customCover);
			}
		});
	}
}

//初始化地图车辆信息
MAP_BOTTOM_BTN.prototype.initStoreCarsMarker= function(){
	var _this = this;
	
}
//初始化地图设备信息
MAP_BOTTOM_BTN.prototype.initStoreDevicesMarker = function(){
	var _this = this;
	var jsonParams = _this.jsonParams;
	if(jsonParams.url){
		$.each(jsonParams.url,function(i,n){
			var postData = $.getPostParams(n.postDynamicParam,{});
			var opt = {
				"url":n.url,
				"data":postData
			};
			PLAT.getList(opt,function(res){
				_this.mapTopBtn.BOTTOM_BTNS_CACHE[jsonParams.buttonType][jsonParams.buttonType] = {};
				if(jsonParams.isClus){ //设备有聚合状态
					//TODO
					//_this.initClusDevicesMarker(p);
				}else{ //设备无聚合状态
				    PLAT.asMethodFunc(res.result,function(p){
						_this.initDevicesMarker(p);
					},5);
				}
			});
		})
	}
}
// 地图上画摄像头
MAP_BOTTOM_BTN.prototype.initDevicesMarker = function(data){
	var _this = this;
	var map = _this.mapTopBtn.baiduObj.map;
	var mp = _this.jsonParams.mapParams;
	if(mp){
		var saveKey = mp.markerSave;
		var key =  PLAT.getSaveKey(data,saveKey);
		_this[_this.jsonParams.buttonType][key] = data;
		var point = PLAT.getBMapPoint({"lng": data[mp.positionParam.lng], "lat": data[mp.positionParam.lat]}); 
		var markerType = PLAT.getMarkerType(mp, data);
		var markerStatus = PLAT.getMarkerStatus(mp,data);
		var mapSize  = PLAT.getMarkerSize(mp);
		var ticon = new BMap.Icon($.getMarkIconByType("device"+markerType,markerStatus),mapSize);
		var marker = new BMap.Marker(point,{icon:ticon});
		PLAT.isEnableDragging(mp,marker);
        map.addOverlay(marker);
		var label = PLAT.setMarkerLabel(mp,point,data);
		if(mp.markderLabelTitle.show == false){
			label.hide();
			_this[_this.jsonParams.buttonType][key].showLabel = false;
		}else{
			_this[_this.jsonParams.buttonType][key].showLabel = true;
		}
		
		if(_this.getStatus("markerLabel") == 2){
		   label.show();
		}
		marker.setLabel(label); 
		if(_this.activeStatus == 1){
			marker.hide();
		}
		PLAT.setMarkerEvent(_this,marker,mp, data);
	
		_this[_this.jsonParams.buttonType][key].marker = marker;
		_this[_this.jsonParams.buttonType][key].label = label;
	}	
}
//地图下按钮 显示设备marker
MAP_BOTTOM_BTN.prototype.showDevicesMarker = function(){
	var _this = this;
	if(!$.isEmptyObject(_this[_this.jsonParams.buttonType])){
		$.each(_this[_this.jsonParams.buttonType],function(idx,ele){
			if(ele.marker){
				ele.marker.show();
			}
			if(ele.label){
				if(_this.getStatus("markerLabel") == 2){
					ele.label.show();
				}
				ele.showLabel = true;
			}
		});
	}
}
//地图下按钮 隐藏设备marker
MAP_BOTTOM_BTN.prototype.hideDevicesMarker = function(){
	var _this = this;
	if(!$.isEmptyObject(_this[_this.jsonParams.buttonType])){
		$.each(_this[_this.jsonParams.buttonType],function(idx,ele){
			if(ele.marker){
				ele.marker.hide();
			}
			if(ele.label){
				ele.label.hide();
				ele.showLabel = false;
			}
			if(ele.customCover){
				ele.customCover.removeHyCustomCover();
				map.removeOverlay(ele.customCover);
			}
		});
	}
}

// 地图下按钮 存储标注点名称
MAP_BOTTOM_BTN.prototype.initStoreMarkerLabel = function(){
	var _this = this;
}
// 地图下按钮 显示标注点名称
MAP_BOTTOM_BTN.prototype.showMarkerLabel = function(){
	var _this = this;
	//显示摄像头的label
	var initMapDevices = _this.mapTopBtn.BOTTOM_BTNS_CACHE["CG_MAP_DEVICES"];
	if(!$.isEmptyObject(initMapDevices.CG_MAP_DEVICES)){
		$.each(initMapDevices.CG_MAP_DEVICES,function(idx,ele){
			if(ele.label){
			    if(ele.marker){
			   	   ele.marker.setLabel(ele.label);
			    }
			    ele.label.show();
			}
		});
	}
	//显示人员的label
	var initMapUsers = _this.mapTopBtn.BOTTOM_BTNS_CACHE["CG_MAP_USERS"];
	if(!$.isEmptyObject(initMapUsers.CG_MAP_USERS)){
		$.each(initMapUsers.CG_MAP_USERS,function(idx,ele){
			if(ele.label){
			    if(ele.marker){
			   	   ele.marker.setLabel(ele.label);
			    }
			    ele.label.show();
			}
		});
	}
	//显示岗点的label
	var initMapPosts = _this.mapTopBtn.LEFT_BTNS_CACHE["CG_EFENCE_POINT"];
	if(!$.isEmptyObject(initMapPosts.CG_EFENCE_POINT)){
		$.each(initMapPosts.CG_EFENCE_POINT,function(idx,ele){
			if(ele && ele.label){
			    ele.setLabel(ele.label);
			    ele.label.show();
			}
		});
	}
	//显示区域的label
	var initMapGrids = _this.mapTopBtn.LEFT_BTNS_CACHE["CG_EFENCE_GRID"];
	if(!$.isEmptyObject(initMapGrids.CG_EFENCE_GRID)){
		$.each(initMapGrids.CG_EFENCE_GRID,function(idx,ele){
			if(ele && ele.label){
				if(ele.isVisible()){
					ele.label.show();
				}
			}
		});
	}
	//显示巡查路线的label
	var initMapRouters = _this.mapTopBtn.LEFT_BTNS_CACHE["CG_EFENCE_ROUTE"];
	if(!$.isEmptyObject(initMapRouters.CG_EFENCE_ROUTE)){
		$.each(initMapRouters.CG_EFENCE_ROUTE,function(idx,ele){
			if(ele.label){
				if(ele.isVisible()){
					ele.label.show();
				}
			}
		});
	}
}
// 地图下按钮 隐藏标注点名称
MAP_BOTTOM_BTN.prototype.hideMarkerLabel = function(){
	var _this = this;
	//隐藏摄像头的label
	var initMapDevices = _this.mapTopBtn.BOTTOM_BTNS_CACHE["CG_MAP_DEVICES"];
	if(!$.isEmptyObject(initMapDevices.CG_MAP_DEVICES)){
		$.each(initMapDevices.CG_MAP_DEVICES,function(idx,ele){
			if(ele.label){
			   ele.label.hide();
			}
		});
	}
	//隐藏人员的label
	var initMapUsers = _this.mapTopBtn.BOTTOM_BTNS_CACHE["CG_MAP_USERS"];
	if(!$.isEmptyObject(initMapUsers.CG_MAP_USERS)){
		$.each(initMapUsers.CG_MAP_USERS,function(idx,ele){
			if(ele.label){
			   ele.label.hide();
			}
		});
	}
	//隐藏岗点的label
	var initMapPosts = _this.mapTopBtn.LEFT_BTNS_CACHE["CG_EFENCE_POINT"];
	if(!$.isEmptyObject(initMapPosts.CG_EFENCE_POINT)){
		$.each(initMapPosts.CG_EFENCE_POINT,function(idx,ele){
			if(ele.label){
			    ele.label.hide();
			}
		});
	}
	//隐藏区域的laebl
	var initMapGrids = _this.mapTopBtn.LEFT_BTNS_CACHE["CG_EFENCE_GRID"];
	if(!$.isEmptyObject(initMapGrids.CG_EFENCE_GRID)){
		$.each(initMapGrids.CG_EFENCE_GRID,function(idx,ele){
			if(ele.label){
			    ele.label.hide();
			}
		});
	}
	//隐藏巡查路线的laebl
	var initMapRouters = _this.mapTopBtn.LEFT_BTNS_CACHE["CG_EFENCE_ROUTE"];
	if(!$.isEmptyObject(initMapRouters.CG_EFENCE_ROUTE)){
		$.each(initMapRouters.CG_EFENCE_ROUTE,function(idx,ele){
			if(ele.label){
			    ele.label.hide();
			}
		});
	}
}

MAP_BOTTOM_BTN.prototype.getStatus = function(buttonType){
	var _this = this;
	var btn = _this.mapTopBtn.BOTTOM_BTNS_CACHE[buttonType];
	if(btn){
		return btn.activeStatus;
	}
}

//地图下 marker的绑定点击事件
MAP_BOTTOM_BTN.prototype.clickMapMarker = function(marker,event,field){
	var _this = this;
	_this.markerField = field;
	var map = _this.mapTopBtn.baiduObj.map;
	var mapParams = _this.jsonParams.mapParams;
	var saveKey = mapParams.markerSave;
	var key = PLAT.getSaveKey(field,saveKey);
    var markerData = _this[_this.jsonParams.buttonType][key];
	var kk = "comp_"+key;
	$("#close_" + kk).click();
	
	var obj = {
		"object":_this,
		"marker":marker,
		"iflag":kk,
		"type":"marker"  //点击的类型是marker
	};
	var myCompOverlay = PLAT.setHyCustomCover(obj); //mapParams,marker,kk,_this.btnData
	map.addOverlay(myCompOverlay);	
	markerData.customCover = myCompOverlay;
	$("#" + "topDiv_"+kk).html(field[mapParams.markderLabelTitle.content]?field[mapParams.markderLabelTitle.content]:"详情");
	
	var box_div = $("#" + kk);
	var row = $("<div/>").addClass("row");
	_this.setHyCustomCoverField(marker,row,"marker");
	box_div.append(row);
	var playParam = mapParams.playParam;
	if(playParam){
		var pla = {				
			layout:1,
			pnode:"video_"+key,
			log:true
		};
		/*if(pla.pnode){
			var mainPlay = HYSDK.getPlayer(pla);
			_this.liveMainPlay = mainPlay;
			var newL = [];
			newL.push({
				title:field[playParam.name],
				strDomainCode : field[playParam.domainCode],
				strDeviceCode  : field[playParam.devCode],
				strChannelCode : field[playParam.channelCode],
				strStreamCode  : field[playParam.streamCode]
			});
			var url = platParams.sieWebsocketPrefix+"://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/"+platParams.sieWebsocketPrefix;
			HYSDK.playVideoList({
				pnode: "video_"+key,
				videolist:newL,
				url: url
			});
		}*/
		if(pla.pnode){
			var mainPlay = HYSDK.getPlayer(pla);
			_this.liveMainPlay = mainPlay;
			var opt = {
				strDomainCode: field[playParam.domainCode],
				strDeviceCode: field[playParam.devCode],
				strChannelCode: field[playParam.channelCode],
				strStreamCode: field[playParam.streamCode]
			}
			HYSDK.getDeviceUrlReq(opt,function(msg){
				if(msg.nResultCode == 0){
					var strDynamicUrl = msg.strDynamicUrl;
					var oopt = {
						videoNode: _this.liveMainPlay.players[0],
						playUrl: strDynamicUrl,
						videoParam: {
							palyParam: {
								title: field[playParam.name]
							},
							videoControl: {
								curresFlag: true,
								bitrateFlag: true
							}
						}
					};
					HYSDK.playRtc(oopt);
				}
			})
		}
	}
	
	var bottomBtn = $("#" + "bottomDiv_"+kk);
	_this.setHyCustomCoverBtn(bottomBtn);
	var closeBtn = $("<span/>").attr({"id":"close_"+kk,"tag":"close"}).addClass("CompOverlayBtn").html("关闭").bind("click",function(){
		var jss = {};
		if(field.extParams){
			jss = JSON2.parse(field.extParams);
		}
		/*if(_this.mapTopBtn.baiduObj.indoorManager){
			$("button.selected").click();
			if(jss.storey){
				_this.mapTopBtn.baiduObj.indoorManager.setIndoor(platParams.MAP_BUILDING_ID, _this.mapTopBtn.baiduObj.indoorManager.getFloor() != null ?_this.mapTopBtn.baiduObj.indoorManager.getFloor():jss.storey, {});
			}else{
				_this.mapTopBtn.baiduObj.indoorManager.setIndoor(platParams.MAP_BUILDING_ID, _this.mapTopBtn.baiduObj.indoorManager.getFloor() != null ?_this.mapTopBtn.baiduObj.indoorManager.getFloor():"B1", {});
			}
		}*/
		if(_this.liveMainPlay){
			//HYSDK.stopPlay(_this.liveMainPlay);
			_this.liveMainPlay.stopPlay();
		}
		if(myCompOverlay){
			myCompOverlay.removeHyCustomCover();
			map.removeOverlay(myCompOverlay);
			try{
				delete markerData.customCover;
			}catch(e){
				$.hy_log("plat.js line 7319"+e);
			}
		}
	});
	bottomBtn.append(closeBtn);
}

MAP_BOTTOM_BTN.prototype.setHyCustomCoverField = function(marker,row,type){
	var _this = this;	
	var roleData = _this.btnData;
	if(roleData.flist.length > 0){
		var ops = {btnParams:roleData,pnode:row};
		if(_this.markerField){
			ops.srcData = _this.markerField;
		}
		ops.labelStyle = "mapDeepBlue";
		var element = new DrawElement(ops);
		$.each(roleData.flist,function(i,n){
			if(n.fieldParams){
				var jj = JSON2.parse(n.fieldParams);
				if(jj.initValueType == "mapAddr"){
					try{				
                        var position = {};
                        if(type == "marker"){
							position = marker.getPosition();
						}else if(type == "overlay"){
							position = PLAT.hyGetOverlayCenterPoint(marker);
						}						
						//var pit = marker.getPosition();
						var gc = new BMap.Geocoder(); 
						gc.getLocation(position, function(res) {
							if(res && res.address){										
								//$("span[tag='"+n.fieldName+"']",row).html(res.address).attr({title:res.address});	
                                $("div",$("div[name='"+n.fieldName+"']",row)).html(res.address).attr({title:res.address});								
							}
						});
					}catch(e){$.hy_log(" get address error ！ plat.js 7355 line . " + e)};
				}
			}
		})
	}
}

MAP_BOTTOM_BTN.prototype.setHyCustomCoverBtn = function(row){
	var _this = this;
	var roleData = _this.btnData;
	if(roleData.blist.length > 0){
		$.each(roleData.blist,function(i,n){
			if(n.buttonType == "map_bottom" && n.buttonLevel == 3){
				var jss = {};
				if(n.buttonParams){
				   jss = JSON2.parse(n.buttonParams); 
				}
				var btnSpan = $("<span/>").addClass("CompOverlayBtn").html(n.buttonName).bind("click",function(){
					if(btnSpan.hasClass("CompOverlayBtn-grey")){
						return;
					};
					if(btnSpan.hasClass("CompOverlayBtn-uncheck-grey")){
						return;
					}else{
						PlatGrid.prototype[n.enableDialog](n,{srcData: _this.markerField});
					}
					btnSpan.removeClass("CompOverlayBtn").addClass("CompOverlayBtn-uncheck-grey");
					setTimeout(function(){
						btnSpan.removeClass("CompOverlayBtn-uncheck-grey").addClass("CompOverlayBtn");
					},3000);
					
				});
				row.append(btnSpan);
			}
		})
	}
}

//地图上 设备观摩事件
PlatGrid.prototype.inspectVideo = function(opts,srcData){
	var _this = this;
	var opt = {
		"dialog":{"width":550,"height":450,"lock":true}
	};
	if(opts.buttonParams){
		opt = JSON2.parse(opts.buttonParams);
	}
	var dialogOpt = {
		id : "inspectVideo_panel",
		title : "观摩",
		width : opt.dialog.width*1,
		height : opt.dialog.height*1,
		lock : opt.dialog.lock
	};
	//关闭弹窗前的操作
	dialogOpt.beforeunload = function(){
		if(_this.liveMainPlay){
			//HYSDK.stopPlay(_this.liveMainPlay);
			_this.liveMainPlay.stopPlay();
		}
	}
	var dl = $.openDialog(dialogOpt);
	var pla = {				
		layout:1,
		pnode:"inspectVideo_panel",
		log:true
	};
	if(pla.pnode){
		var mainPlay = HYSDK.getPlayer(pla);
	   _this.liveMainPlay = mainPlay;
	}
	if(opts.buttonParams){
		/*var newL = [];
		var jss = JSON2.parse(opts.buttonParams);
		if(jss.actionParam){
			newL.push({
				title:srcData[jss.actionParam.name],
				strDomainCode : srcData[jss.actionParam.domainCode],
				strDeviceCode  : srcData[jss.actionParam.devCode],
				strChannelCode : srcData[jss.actionParam.channelCode],
				strStreamCode  : srcData[jss.actionParam.streamCode]
			});
			//var url = platParams.sieWebsocketPrefix+"://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/"+platParams.sieWebsocketPrefix;
			HYSDK.playVideoList({
				pnode: "inspectVideo_panel",
				videolist:newL
			});
		}*/
		var jss = JSON2.parse(opts.buttonParams);
		if(jss.actionParam){
			var opt = {
				strDomainCode: srcData[jss.actionParam.domainCode],
				strDeviceCode: srcData[jss.actionParam.devCode],
				strChannelCode: srcData[jss.actionParam.channelCode],
				strStreamCode: srcData[jss.actionParam.streamCode]
			}
			HYSDK.getDeviceUrlReq(opt,function(msg){
				if(msg.nResultCode == 0){
					var strDynamicUrl = msg.strDynamicUrl;
					var oopt = {
						videoNode: _this.liveMainPlay.players[0],
						playUrl: strDynamicUrl,
						videoParam: {
							palyParam: {
								title: srcData[jss.actionParam.name]
							},
							videoControl: {
								curresFlag: true,
								bitrateFlag: true
							}
						}
					};
					HYSDK.playRtc(oopt);
				}
			})
		}
	}
}
//地图上 marker的绑定拖拽事件
MAP_BOTTOM_BTN.prototype.draggingMapMarker = function(marker,event,field){
	var _this = this;
	
}
/********************** MAP_BOTTOM_BTN end *****************************/

/********************** MAP_RIGHT_BTN start ***************************/
/**
 * 地图右按钮对象
 * obj={
	"topObject": MAP_TOP_BTN对象
	"btnData":按钮数据 对应plat_button
	"rightDiv": 地图右侧按钮容器 	 
 }
 */
function MAP_RIGHT_BTN(obj){
	this.mapTopBtn = obj.topObject;
	this.btnData = obj.btnData;
	this.rightDiv = obj.rightDiv;
	this.activeStatus = 1;  //当前状态  1未激活状态，2激活状态
}
MAP_RIGHT_BTN.prototype.init = function(){
	var _this = this;
	//$.hy_log("---------MAP_RIGHT_BTN-----------",_this);
	_this.rightNodeMuster = {};
	var btnData = _this.btnData;
	var right_btn = $("<div/>").addClass("map_right_btn").attr({
		id: btnData.buttonCode,
		title: btnData.buttonName
	});
	var p = btnData.buttonParams;
	if(p){
		var j = JSON2.parse(p);
		_this.jsonParams = j;
		_this.mapTopBtn.RIGHT_BTNS_CACHE[j.buttonType] = _this;	
		
		if(j.initEvent){
			try{
				_this[j.initEvent] && _this[j.initEvent]();
			}catch(e){
			  $.hy_error(e," MAP_RIGHT_BTN.prototype.init initEvent function ! plat.js 7514 line:: " + j.initEvent);
			}
		}
	}
}

/********************** MAP_RIGHT_BTN end ****************************/

/********************** TimeAndWeather start ************************/
function TimeAndWeather(){
	this.days = new Array("日", "一", "二", "三", "四", "五", "六");
}
TimeAndWeather.prototype.setTime = function(root1,root2){
	var _this = this;
	var currentDT = new Date();
	var y, m, date, day;
	y = currentDT.getFullYear(); 
	m = currentDT.getMonth(); 
	date = currentDT.getDate(); 
	day = currentDT.getDay(); 
	m = m + 1;
	root1.html(y + "年" + m + "月" + date + "日"+"&nbsp;&nbsp;"+"星期" + _this.days[day]);
	
	hy_fetchWeather(function(result) {
		root2.append(
			$("<img/>").css({"width":"35px","height":"30px","margin-left":"10px","vertical-align":"top"}).attr({
				"src" : result.pic,
				"title" : result.temp + "\n" + result.wind
			})
		)
	});
	_this.showTimeFunc();
}
TimeAndWeather.prototype.showTimeFunc = function(){
	var _this = this;
	var currentDT = new Date();
	var y, m, date, day, hs, ms, ss;
	y = currentDT.getFullYear(); 
	m = currentDT.getMonth();
	date = currentDT.getDate();
	day = currentDT.getDay(); 
	hs = currentDT.getHours(); 
	ms = currentDT.getMinutes();
	ss = currentDT.getSeconds(); 
	m = m + 1;
	if (ss < 10) {
		ss = "0" + ss;
	} else {
		ss = ss;
	}
	if (ms < 10) {
		ms = "0" + ms;
	} else {
		ms = ms;
	}
	if (hs < 10) {
		hs = "0" + hs;
	} else {
		hs = hs;
	}
	var theDateStr = $("<div/>").css({
		
	}).append($("<span/>").css({
		"font-size" : "30px"
	}).html(hs + ":" + ms)).append($("<span/>").css({
		"font-size" : "22px"
	}).html(ss));
	$(".cg-top-title-right-time").html(theDateStr);
   // setTimeout 在执行时,是在载入后延迟指定时间后,去执行一次表达式,仅执行一次
	setTimeout(function(){
	    _this.showTimeFunc();
	}, 1000);
}
function hy_fetchWeather(resultProcessor){
	$.hy_log('【index.js || 4629 line 】' + "execute hy_fetchWeather function !");
    var url = "https://api.map.baidu.com/telematics/v3/weather?ak=ZjPPMyItrNMACFGqpGqBE3kI&output=json&location=118.789199,31.987508";
    $.ajax({
        url : url,
        dataType : "jsonp",
        jsonp:"callback",
        scriptCharset : "utf-8",
        cache:true,//该接口每天只能调用5000次，因此要缓存
        success:function(data) {
        	var errorCode=data.error;
            if(0!=errorCode){
               $.hy_log('【index.js || 4643 line 】' + "weather api failed."); 
               return;
            }
            var results=data.results;
            if(!results){
                 $.hy_log('【index.js || 4648 line 】' + "weather api returned no records."); 
                return;
            }
            var currCityRecord=results[0];
            var wdRecords=currCityRecord.weather_data || [];
            var wd=wdRecords[0] || {};

            var isNight=(new Date().getHours() > 17),
            param={city:currCityRecord.currentCity};
            
            if(isNight){
               param.pic=wd.nightPictureUrl;
            }else{
               param.pic=wd.dayPictureUrl;  
            }
            
            param.weather=wd.weather;
            param.wind=wd.wind;
            param.temp=wd.temperature;
            
            resultProcessor(param);
        }
    });
}
/**********************TimeAndWeather  start***********************************/

/* ********************** PlatCustomPage ********************* */
function PlatCustomPage(params)
{
	try{
	this[params.customjson.func](params);
	}catch(e)
	{
		$.hy_error(params," function PlatCustomPage(params) ");
	}
}
PlatCustomPage.prototype.configPage = function(params)
{
	var _this = this;
	this.pnode = $(params.pnode);
	var hei = window.innerHeight-160;
	var systemConfig = $("<div/>").addClass("col-md-12");
	var localConfigDiv = $("<div/>").addClass("col-md-12");
	
	_this.configDesc = {
		"filesServerPwd": "文件服务器密码",
		"productCode":"产品编码",
		"entCode": "企业编号",
		"filesServerUrl": "文件服务器上传路径",
		"filesServerVisit":"文件服务器访问路径",
		"filesServerUser": "文件服务器用户登录名",
		"mapUrl": "地图url",
		"mapCenterLatLng":"地图展示时的中心点",
		"mapDefaultLevel": "地图默认等级",
		"sieIp":"流媒体Ip",
		"siePort": "流媒体端口",
		"sieSignalWebsocketPort": "流媒体webSocket通讯端口",
		"sieStreamWebsokcetPort":"流媒体webSocket流的端口",
		"sieWebsocketPrefix": "流媒体webSocket的前缀"
	}
	var opt = {url:"../platconfig/getConfig.action",data:{},success:function(res){
		if(res.code == 0){
			_this.confRes = res;
			_this.initTable(systemConfig,{
				list: [
					{"name": "配置名称","type":"text","fileName": "configName"},
					{"name": "值","type":"input","fileName": "configValue"},
					{"name": "编码","type":"text","fileName": "configCode"},
					{"name": "描述","type":"text","fileName": "description"},
					{"name": "操作","type":"button"}
				],"title":"系统配置"
			});
			_this.initTable(localConfigDiv,{
				list:[
				    {"name": "配置名称","type": "localtext"},
					{"name": "值","type": "localinput"},
					{"name": "说明","type": "localDesc"}
				],"title": "业务配置"
			});
		}
	}};
	$._ajax(opt);
	this.pnode.append(localConfigDiv).append(systemConfig)
}

PlatCustomPage.prototype.initTable = function(root,headParam){
	var _this = this;
	var tableH = $("<div/>").addClass("table-header").append(
		$("<span/>").html(headParam.title)
	);
	var table = $("<table/>").addClass("table  table-bordered table-hover");
	var tableHead = $("<thead/>")/*.addClass("grid-thead")*/;
	var tableTr = $("<tr/>");
	tableHead.append(tableTr);
	var tableBody = $("<tbody/>").addClass("grid-line");
	table.append(tableHead).append(tableBody);
	root.append(tableH).append($("<div/>").addClass("grid-table-head").append(table))
	/*.append(table);*/
	if(headParam && headParam.list.length){
		$.each(headParam.list, function(i, e){
			var th= $("<th/>").html(e.name)
			tableTr.append(th)
		});
	}
	if(headParam.title=="系统配置"){
		if(_this.confRes.result){
			$.each(_this.confRes.result,function(i,e){
				tableBody.append(_this.drawEachDataRow(headParam.list, i,e));
			})
		}
	}else{
		var btn = $("<span/>").css({"float": "right","margin-right": "10px","cursor": "pointer"}).html("保存");
		tableH.append(btn)
		btn.bind("click", function(){
			$._ajax({
				"url": CONSTANTS.UPDATE_CONFIG,
				"data":{"obj":_this.confRes.obj},
				"success": function(res){
					if(res.code == 0 ){
						$.resultDialog("操作成功！",{showContinueBtn:false});
					}else{
						$.resultDialog("操作失败！" + res.desc,{showContinueBtn:false});
					} 
				}
			})
		});
		if(_this.confRes.obj){
			$.each(_this.confRes.obj,function(i,e){
				tableBody.append(_this.drawEachDataRow(headParam.list, i,e));
			})
		}
	}
	return tableBody;
}

PlatCustomPage.prototype.drawEachDataRow = function(list, i,e){
	var _this = this;
	var tr = $("<tr/>");
	$.each(list,function(hi, he){
		var td = $("<td/>").css({"line-height":"35px"}).addClass("col-sm-none");
		tr.append(td);
		if(he.type =="text"){
			td.html(e[he.fileName]);
		}else if(he.type =="input"){
			var inp = $("<input/>").val(e[he.fileName])
			inp.bind("input propertychange", function(){
				e[he.fileName] = inp.val()
			})
			td.append(inp);
		}else if(he.type =="localtext"){
			td.html(i);
		}else if(he.type =="localinput"){
			var inp = $("<input/>").addClass(i+"-fileValue").val(e);
			inp.bind("input propertychange", function(){
				_this.confRes.obj[i] = inp.val()
			})
			td.append(inp);
		}else if(he.type =="localDesc"){
			td.html(_this.configDesc[i]);
		}else if(he.type =="button"){
			var btn = $("<div/>").addClass("btn-group buttons").css({"height":"60px"}).append(
				$("<button/>").addClass("btn btn-white btn-success btn-sm").append(
					$("<i/>").addClass("ace-icon fa fa-pencil-square-o")
				).append("保存")	
			)
			btn.bind("click", function(){
				$._ajax({
					"url": CONSTANTS.CONFIG_UPDATE,
					"data":e,
					"success": function(res){
						if(res.code == 0 ){
							$.resultDialog("操作成功！",{showContinueBtn:false});
						}else{
							$.resultDialog("操作失败！" + msg.desc,{showContinueBtn:false});
						} 
					}
				})
			})
			td.append(btn)
		}
	});
	return tr;
}

/* ********************** roomPage 设备管理 页面 ********************* */
PlatCustomPage.prototype.roomPage = function(params){
	this.pnode = $(params.pnode);
	var _this = this;
	
	var h = $(window).height()-160;
	var rightTree = $("<div/>").addClass("room-tree").height(h).css({"width":"25%","float":"left"});
	var leftContent = $("<div/>").addClass("room-player-warp").attr('id',"roomSelectVideo").height(h).css({"overflow":"hidden","width":"75%","float":"left"});
	this.pnode.append(rightTree).append(leftContent);
	var videoDiv = $("<div/>").attr({"id": "roomSelectVideo"}).css({"overflow":"hidden",height:h,width:"100%",'background':"url('"+$.getImgUrl('/logo/gabg.jpg')+"') no-repeat","background-size":"100% 100%"});
	leftContent.append(videoDiv);
	
	var btnCache = {}
	$.each(params.result.blist,function(i, e){
		btnCache[e.buttonName] = e;
	});
	var fieldParams = {
		"dynamicResult":{
			"url":CONSTANTS.GETROOM_TREE,
			"postDynamicParam":[],
			"postStaticData":{}
		},
		"allCheck":false,
		"forceLoadBtn": {
			"hasChild":true,
			"dataType": "room"
		},
		"expand":true,
		"treeHeight":h,
		"hideExpandType":["roomnode"],
		"showRefreshType":["ent","group","room"],
		"showAddDataType":["ent","group","room"],
		"showModifyType":["roomnode","group","room"],
		"showDelType":["roomnode","group","room"]
	};
	//$.hy_error(fieldParams);
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:rightTree};
	var tree = new PlatTree(opts);
	
	//重写刷新事件
	tree.clickRefreshEvent = function(optts){
		if(optts.data && optts.data.dataType == "ent"){
			$._ajax({
				"url": CONSTANTS.GETROOM_TREE,
				"data":{"entCode": optts.data.id},
				"success": function(ress){
					if(ress.code == 0){
						if(ress.result){
							optts.data = ress.obj[optts.data.id];
							tree.refreshEvent(optts);
						}
						
					}
				}
			});
		}else if(optts.data && optts.data.dataType == "group"){
			$._ajax({
				"url": CONSTANTS.GETROOMBYFROUP_CODE,
				"data":{"groupCode": optts.data.id},
				"success": function(ress){
					if(ress.code == 0){
						optts.data.treeList = ress.result;
						optts.data.hasChild = true;
						tree.refreshEvent(optts);
					}
				}
			});
		}else if(optts.data && optts.data.dataType == "room"){
			$._ajax({
				"url":CONSTANTS.GETROOMNODEBYFROUP_CODE,
				"data":{"roomCode": optts.data.id},
				"success": function(ress){
					if(ress.code == 0){
						optts.data.treeList = ress.result;
						optts.data.hasChild = true;
						tree.refreshEvent(optts);
					}
				}
			});
		}else{
			tree.refreshEvent(optts);
		}
	}
	
	//重写展开事件
	tree.clickExpendEvent = function(optts){
		var _this = this;
		if(optts.data && optts.data.dataType == "room"){
			var size = $("li",optts.ul).length;
			if(size<= 0){
				$._ajax({
					"url": CONSTANTS.GETROOMNODEBYFROUP_CODE,
					"data":{"roomCode": optts.data.id},
					"success": function(ress){
						if(ress.code == 0){
							optts.data.treeList = ress.result;
							optts.data.hasChild = true;
							tree.expendEvent(optts);
						}
					}
				});
			}else{
				tree.expendEvent(optts);
			}
		}else{
			tree.expendEvent(optts);
		}
	}
	
	//重写新增事件
	tree.clickAddDataEvent = function(optts){
		var btn;
		var srcData = {};
		if(optts.data && optts.data.dataType == "ent"){
			btn = btnCache["新增分组"];
			srcData.entCode = optts.data.id;
			srcData.groupCode = $.UUID();
		}else if(optts.data && optts.data.dataType == "group"){
			btn = btnCache["新增庭室"];
			srcData.groupCode = optts.data.id;
			srcData.entCode = optts.data.pid;
			srcData.roomCode = $.UUID();
		}else if(optts.data && optts.data.dataType == "room"){
		    var sie = new SieDevDialog({entCode:"A320101","roomCode":optts.data.id,btn:btnCache["新增设备"]});
			sie.init();
		}
		
		if(btn){
			PlatGrid.prototype[btn.enableDialog](btn, {srcData:srcData});
			tree.addDataEvent(opts);
		}else{
			$.hy_error(optts.data.dataType, "未找到匹配按钮");
		}
	}
	
	//重写新增事件
	tree.clickModifyEvent = function(optts){
		var btn;
		var srcData = optts.data.obj;
		if(optts.data && optts.data.dataType == "group"){
			btn = btnCache["修改分组"];
		}else if(optts.data && optts.data.dataType == "room"){
			btn = btnCache["修改庭室"];
		}else if(optts.data && optts.data.dataType == "roomnode"){
		   var sie = new SieDevDialog({entCode:optts.data.obj.entCode,"roomCode":optts.data.obj.roomCode,btn:btnCache["修改设备"],srcData: optts.data.obj});
			sie.init();
		}
		if(btn){
			PlatGrid.prototype[btn.enableDialog](btn, {srcData:srcData});
		}else{
			$.hy_error(optts.data.dataType, "未找到匹配按钮");
		}
	}
	
	//重写删除事件
	tree.clickDelEvent = function(optts){
		if(optts.data && optts.data.dataType == "roomnode"){
			$.chatDialogConfirm({
				"msg": "是否删除此设备？",
				"okFun": function(){
					$._ajax({
						"url": CONSTANTS.ROOMNODE_DELETE,
						"data": {"id": optts.data.obj.id},
						"success": function(res){
							var msg = "删除成功！";
							if(res.code == 0 ){
								var parentNode = tree.treeData[optts.data.pid];
								if(parentNode && parentNode.refrechBtn){
									parentNode.refrechBtn.click();
								}
							}else{
								msg = res.desc;
							}
							$.resultDialog(msg,{showContinueBtn:false});
						}
					});
				}
			});
		}else if(optts.data && optts.data.dataType == "group"){//庭室分组
		
		}else if(optts.data && optts.data.dataType == "room"){//庭室
		
		}
	}

	//重写点击事件
	tree.clickEvent = function(params){
		var _this = this;
		if(params.data && params.data.dataType == "roomnode"){
			var nodeData = params.data.obj;
			var newD = {};
			var pla = {				
		        layout:1,
		        pnode:"roomSelectVideo",
		        log:true
			};
			if((typeof HYSDK) != "undefined"){
				var mainPlay = HYSDK.getPlayer(pla);
				mainPlay.players[0].setTitle({title: nodeData.roomNodeName});
				
				newD.entCode = nodeData.entCode;
				newD.domainCode = nodeData.domainCode;
				newD.deviceCode = nodeData.devCode;
				newD.channelCode = nodeData.videoChannelCode;
				newD.strStreamCode = nodeData.videoStreamCode;
				
				tree.playingVodeo = mainPlay.players[0];
				newD.videoPlayer = mainPlay.players[0];
				newD.mainPlay = mainPlay;
				SieDevDialog.prototype.palyRtspVideo(newD);
			}
		}
	};
	
	//新增分组后的操作
	PlatGrid.prototype.afterAddRoomGroup = function(data, msg,postData){
		if(msg.code == 0){
			var obj = {};
			obj.pid = msg.obj.entCode;
			obj.id = msg.obj.groupCode;
			obj.name = msg.obj.groupName;
			obj.img = "/images/shexiangtou.png";
			obj.dataType = "group";
			obj.selected = false;
			obj.hasChild = false;
			obj.treeList = [];
			obj.obj = msg.obj;
			tree.treeData[obj.id] = obj; 
			tree.treeData[obj.pid].hasChild = true; 
			tree.treeData[obj.pid].treeList.push(obj);
			var parentNode = tree.treeData[obj.pid];
			if(parentNode && parentNode.refrechBtn){
				parentNode.refrechBtn.click();
			}
		}
	}

	//新增庭室后的操作
	PlatGrid.prototype.afterAddRoom = function(data, msg,postData){
		if(msg.code == 0){
			var obj = {};
			obj.pid = msg.obj.groupCode;
			obj.id = msg.obj.roomCode;
			obj.name = msg.obj.roomName;
			obj.img = "/images/device-room.png";
			obj.dataType = "room";
			obj.selected = false;
			obj.hasChild = false;
			obj.treeList = [];
			obj.obj = msg.obj;
			tree.treeData[obj.id] = obj; 
			tree.treeData[obj.pid].hasChild = true; 
			tree.treeData[obj.pid].treeList.push(obj);
			var parentNode = tree.treeData[obj.pid];
			if(parentNode && parentNode.refrechBtn){
				parentNode.refrechBtn.click();
			}
		}
	}
	
	//新增设备后的操作
	PlatGrid.prototype.afterAddRoomNode = function(data, msg,postData){
		if(msg.code == 0){
			var obj = {};
			obj.pid = msg.obj.roomCode;
			obj.id = msg.obj.roomNodeCode;
			obj.name = msg.obj.roomNodeName;
			obj.img = "/images/device-room.png";
			obj.dataType = "room";
			obj.selected = false;
			obj.hasChild = false;
			obj.treeList = [];
			obj.obj = msg.obj;
			tree.treeData[obj.id] = obj; 
			tree.treeData[obj.pid].hasChild = true;
			tree.treeData[obj.pid].treeList.push(obj);
			var parentNode = tree.treeData[obj.pid];
			if(parentNode && parentNode.refrechBtn){
				parentNode.refrechBtn.click();
			}
		}
	}
	
	//修改庭审后的操作
	PlatGrid.prototype.roomNodeUpdate = function(data, msg,postData){
		var parentNode = tree.treeData[postData.roomCode];
		if(parentNode && parentNode.refrechBtn){
			parentNode.refrechBtn.click();
		}
	}
}

//预览
PlatGrid.prototype.watchVideoAction = function(opts){
	var _this = this;
	var opt = {
		id : $.UUID() + "_open",
		title : "预览",
		width : 900,
		height : 600,
		lock : true
	};
	if(opts.dialog)
	{
		opt.width = opts.dialog.width;
		opt.height = opts.dialog.height;
		opt.lock = opts.dialog.lock;
	}
	
	//关闭弹窗前的操作
	opt.beforeunload = function(){
		if(_this.watchMainPlayer){
			HYSDK.stopPlay(_this.watchMainPlayer);
		}
	}
	var dialog = $.openDialog(opt);
	var dialogDiv = $("#"+ opt.id).width(opt.width).height(opt.height);
	if(opts.list && opts.list.length >=24){
		var l = opts.list.slice(0,24);
		opts.list = l;
		$.operateTip({"msg": "最多只能播放24布局，已播放前24个视频", "width": "260px"});
	}else{
	}
	if((typeof HYSDK) != "undefined"){
		//var url = "ws://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/ws";
		_this.watchMainPlayer = HYSDK.playVideoList({
			'pnode': opt.id,
			videolist:opts.list,
			loadingResp: function(successCount){
				$.hideLoading();
				if(successCount == opts.list.length){
				}else{
					if(opts.list.length==1){
						$.operateTip({"msg": "未获取到可播放的视频", "width": "160px"});
					}
				}
			},
			loadingTip: function(){
				$.showLoading();
			}
		});
	}
};

//庭室预览
PlatGrid.prototype.watchRoomVideo = function(opts,srcData){
	var _this = this;
	var data = {
		"url": CONSTANTS.ROOMNODE_LIST,
		"data": {
			"roomCode": srcData.roomCode
		},
		"success": function(res){
			var list = [];
			if(res.code == 0 && res.result){
				$.each(res.result, function(i,e){
					list.push({
						name:e.roomNodeName,
						strDomainCode :e.domainCode,
						strDeviceCode  :e.devCode,
						strChannelCode :e.videoChannelCode,
						strStreamCode  :e.videoStreamCode
					});
				});
				
			}
			
			opts.list = list;
			if(opts.list.length){
				_this.watchVideoAction(opts);
			}else{
				$.operateTip({"msg": "播放参数缺失", "width": "150px"});
			}
			
		}
	}
	$._ajax(data);
};

//采集点预览
PlatGrid.prototype.watchNodeVideo = function(opts,srcData){
	var _this = this;
	var list = [];
	if(srcData.roomNodeName &&srcData.domainCode&&srcData.videoChannelCode&& srcData.videoStreamCode){
		list.push({
			name:srcData.roomNodeName,
			strDomainCode :srcData.domainCode,
			strDeviceCode  :srcData.devCode,
			strChannelCode :srcData.videoChannelCode,
			strStreamCode  :srcData.videoStreamCode
		});
		opts.list = list;
		_this.watchVideoAction(opts);
	}else{
		$.operateTip({"msg": "播放参数缺失", "width": "150px"});
	}
};

function SieDevDialog(opts){
	var _this = this;
	_this.opts = opts;
}
SieDevDialog.prototype.init = function()
{
	var _this = this;
	var opt = {
			id : $.UUID() + "_open",
			title : "流媒体设备",
			width : 900,
			height : 600,
			lock : true
	};
	if(_this.opts.dialog)
	{
		opt.width = _this.opts.dialog.width;
		opt.height = _this.opts.dialog.height;
		opt.lock = _this.opts.dialog.lock;
	}
	
	//关闭弹窗前的操作
	opt.beforeunload = function(){
		if(_this.mainPlay){
			$.each(_this.mainPlay.players, function(i, e){
				e.close();
			})
		}
		
	}
	
	var dialog = $.openDialog(opt);
	
	var dialogDiv = $("#"+ opt.id);
	
	var rightTree = $("<div/>").addClass("sie-tree").height(opt.height).css({"text-align": "left"});
	var leftContent = $("<div/>").addClass("sie-player-warp").height(opt.height).css({"overflow":"hidden"});
	dialogDiv.append(leftContent).append(rightTree);
	var top = $("<div/>").css({width:"100%",height:300});
	var bottom = $("<div/>").css({width:"100%",height:opt.height - 300});
	/*bottom.append($("<span/>").html("企业"));*/
	
	var videoDiv = $("<div/>").attr({id:"videoIframe"}).css({"overflow":"hidden",height:300,width:"100%"});
	leftContent.append(videoDiv).append(bottom);
	
	//初始化播放器
	if((typeof HYSDK) != "undefined"){
		var pla = {				
	        layout:1,
	        pnode:"videoIframe",
	        log:true
		};
		_this.mainPlay = HYSDK.getPlayer(pla);
	}
	/*var data = {
	   entCode:_this.opts.entCode,
	   params:JSON2.stringify({"strDomainCode":""}),
	   url:"get_domain_list"
	};
	var opts = {url:"../main/getSieData.action",data:data ,success:function(res){
	    if(res.code == 0)
	    {
	    	var obj = JSON2.parse(res.obj);
	    	$.hy_error(obj);
	    	if(obj.nResultCode && obj.nResultCode == 0)
	    	{
	    		
	    	}
	    	
	    }
	}};
	$._ajax(opts);*/
	if(_this.opts.treeLevelByLevel){
		_this.initDeviceLevelBYLevel(opt, rightTree, dialogDiv);
	}else if(_this.opts.treeFromSie){
		_this.initDeviceFromSie(opt, rightTree, dialogDiv);
	}else{
		_this.initDeviceFromJava(opt, rightTree, dialogDiv);
	}
	_this.initDeviceField(bottom, dialog);
	
}

SieDevDialog.prototype.initDeviceFromJava = function (opt,rightTree, dialogDiv){
	var _this = this;
	var fieldParams = {		
		"allCheck":false,		
		"expand":true,
		"treeHeight":opt.height
	};
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:rightTree};
	var tree = new PlatTree(opts);
	tree.custom = function(redata){		    
			var data = {
			   entCode:_this.opts.entCode,
			   params:JSON2.stringify({"strDomainCode":""}),
			   url:"get_domain_list"
			};
		    var opts = {url:CONSTANTS.GETSIE_DATA,data:data ,success:function(res){
		    if(res.code == 0)
		    {
		    	var obj = JSON2.parse(res.obj);
	    		if(obj.domainInfoList && obj.domainInfoList.length > 0){
				    $.each(obj.domainInfoList,function(i,n){
				    	var data = {
						   entCode:_this.opts.entCode,
						   params:JSON2.stringify({"strDomainCode":n.strDomainCode,"nRouteFlag":0}),
						   url:"get_device_list"
						};
						$._ajax({
							 url:CONSTANTS.GETSIE_DATA,
							 data:data,
							"success": function(res1){
								if(res1.code == 0){
									var obj1 = JSON2.parse(res1.obj);
									 $.each(obj1.domainList,function(j,idx){
								    	var m = {
									    	codes:idx.strDomainCode,
									    	hasChild:true,
									    	pid:-1,
									    	id:idx.strDomainCode,
									    	name:idx.strDomainName,
									    	img:"/tree/menu.png",
									    	dataType:"domain"
								    	};
								    	tree.treeData[idx.strDomainCode] = m;
								    	var dev = [];
								    	$.each(idx.deviceList,function(j1,m){
									    	var x = {
										    	codes:idx.strDomainCode + "-"+ m.strDeviceCode,									    	
										    	hasChild:true,
										    	pid:idx.strDomainCode,
										    	id:m.strDeviceCode,
										    	name:m.strDeviceName,
										    	domainCode:idx.strDomainCode,
									    	    domainName:idx.strDomainName,
										    	img:"/tree/leafs.png",
										    	dataType:"device"
									    	};
									    	tree.treeData[m.strDeviceCode] = x;
									    	var ch = [];
									    	$.each(m.channelList,function(i1,n1){
									    	   var ttt= {
										    	   codes:idx.strDomainCode + "-"+ m.strDeviceCode+"-"+n1.strChannelCode,									    	   
										    	   hasChild:true,
										    	   pid:m.strDeviceCode,
										    	   id:n1.strChannelCode,
										    	   name:n1.strChannelName,
										    	   deviceCode:m.strDeviceCode,
											       deviceName:m.strDeviceName,
											       domainCode:idx.strDomainCode,
										    	   domainName:idx.strDomainName,
										    	   img:"/tree/panic_button.png",
										    	   dataType:"channel"
									    	   };
									    	   tree.treeData[n1.strChannelCode] = ttt;
									    	   var stream  = [];
									    	   $.each(n1.streamList,function(a2,b2){
									    	   	  var si = {
										    	   	  codes:idx.strDomainCode + "-"+ m.strDeviceCode+"-"+n1.strChannelCode+"-"+b2.strStreamCode,
										    	   	  hasChild:false,
										    	   	  pid:n1.strChannelCode,
										    	   	  id:b2.strStreamCode,
										    	   	  name:b2.strStreamName,
										    	   	   channelCode:n1.strChannelCode,
										    	       channelName:n1.strChannelName,
										    	   	   deviceCode:m.strDeviceCode,
											           deviceName:m.strDeviceName,
											           domainCode:idx.strDomainCode,
										    	       domainName:idx.strDomainName,
										    	   	  img:"/logo/ios.png",
										    	   	  dataType:"stream"
									    	   	  } 
									    	   	  stream.push(si);
									    	   	  tree.treeData[b2.strStreamCode] = si;
									    	   })
									    	   ttt.treeList = stream;
									    	   ch.push(ttt);
								    	    });
								    	    x.treeList=ch;
								    	    dev.push(x);
								    	});
								    	m.treeList = dev;
								    	//$.hy_log("!!!!!!"+JSON2.stringify(m))
										var opts = {field:field,pnode:tree.root,data:m,treeFunc:tree};
		                                tree.treeLi = new TreeLi(opts);
										tree.root.append(tree.treeLi);
								    	//tree.root.append(tree.getLi(m,tree.root));
									 });
								}
							}
						});
				    });
				}	
		    }
		}};
		$._ajax(opts);
	}
	
	tree.clickEvent = function(params){
		var pp = {
			params:params,
			opts:opts
		};
		if(params.data && params.data.dataType == "stream"){
			
			if(tree.playingVodeo){
				tree.playingVodeo.close();
			}
					
			$("#domainCode",dialogDiv).val(params.data.domainCode).blur();
			$("#domainName",dialogDiv).val(params.data.domainName).blur().attr("readonly", "readonly");
			$("#videoChannelCode",dialogDiv).val(params.data.channelCode).blur();
			$("#videoChannelName",dialogDiv).val(params.data.channelName).blur().attr("readonly", "readonly");
			$("#devCode",dialogDiv).val(params.data.deviceCode).blur();
			$("#devName",dialogDiv).val(params.data.deviceName).blur().attr("readonly", "readonly");
			$("#videoStreamCode",dialogDiv).val(params.data.id).blur();
			$("#videoStreamName",dialogDiv).val(params.data.name).blur().attr("readonly", "readonly");
			
			//window.frames["videoIframe"].startVideo('hello world');
			
			//var vp = {codes:[{"codes":params.data.codes,"width":"50px","height":"50px",id:"stream1"}]};
			
			//document.getElementById("videoIframe").contentWindow.startVideo(vp);
			
			var newD = {};
			newD.entCode = _this.opts.entCode;
			newD.domainCode = params.data.domainCode;
			newD.deviceCode = params.data.deviceCode;
			newD.channelCode = params.data.channelCode;
			newD.strStreamCode = params.data.id;
			newD.videoPlayer = _this.mainPlay.players[0];
			newD.mainPlay = _this.mainPlay;
			_this.palyRtspVideo(newD);
		}
		/*var _my = this;
		_my.msgDialog(pp);*/
	};
	
	tree.custom({a:3});
	
}

SieDevDialog.prototype.initDeviceFromSie = function (opt,rightTree, dialogDiv){
	var _this = this;
	var fieldParams = {		
		"allCheck":false,		
		"expand":true,
		"treeHeight":opt.height
	};
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:rightTree};
	var tree = new PlatTree(opts);
	tree.custom = function(redata){
		if((typeof HYSDK) != "undefined"){
			 HYSDK.getDomainReq(function(msg){
		 	var m  = {};
		
		 	if(msg.nResultCode == 0){
		 		if(msg.domainInfoList){
		 			var count = msg.domainInfoList.length;
		 			$.each(msg.domainInfoList, function(di, de){
		 				var deviceList = [];
		 				m = {
					    	codes:de.strDomainCode,
					    	hasChild:true,
					    	pid:(de.strDomainCode == de.strParentDomainCode) ? -1:de.strParentDomainCode,
					    	id:de.strDomainCode,
					    	name:de.strDomainName,
					    	img:"/tree/menu.png",
					    	dataType:"domain"
				    	};
				    	tree.treeData[de.strDomainCode] = m;
				    	m.treeList = deviceList;
				    	var op = {						
							domainCode:de.strDomainCode,
							nPage:1,
							nSize:100
						};
						HYSDK.getDeviceByDomainReq(op,function(res){
							count--;
							if(res.nResultCode == 0){
								$.each(res.deviceList,function(idx,ele){
									var channelList = [];
									var devObj = {
										codes:ele.strDomainCode + "-"+ ele.strDeviceCode,									    	
								    	hasChild:ele.channelList && ele.channelList.length ? true:false,
								    	pid:ele.strDomainCode,
								    	id:ele.strDeviceCode,
								    	name:ele.strDeviceName,
								    	domainCode:de.strDomainCode,
							    	    domainName:de.strDomainName,
								    	img:"/tree/leafs.png",
								    	dataType:"device"
									};
									devObj.treeList = channelList;
									deviceList.push(devObj);
									tree.treeData[ele.strDeviceCode] = devObj;
									
									if(ele.channelList){
										$.each(ele.channelList, function(ci, ce){
											var streamList = [];
											var ttt= {
										    	   codes:ce.strDomainCode + "-"+ ce.strDeviceCode+"-"+ce.strChannelCode,									    	   
										    	   hasChild:true,
										    	   pid:ce.strDeviceCode,
										    	   id:ce.strChannelCode,
										    	   name:ce.strChannelName,
										    	   deviceCode:ele.strDeviceCode,
											       deviceName:ele.strDeviceName,
											       domainCode:de.strDomainCode,
										    	   domainName:de.strDomainName,
										    	   img:"/tree/panic_button.png",
										    	   dataType:"channel"
									    	   };
									    	   tree.treeData[ce.strChannelCode] = ttt;
									    	    ttt.treeList = streamList;
									    	   channelList.push(ttt);
									    	   
									    	   if(ce.streamList){
									    	   		$.each(ce.streamList, function(si, se){
									    	   			var si = {
												    	   	  codes:ce.strDomainCode + "-"+ ce.strDeviceCode+"-"+ce.strChannelCode+"-"+se.strStreamCode,
												    	   	  hasChild:false,
												    	   	  pid:ce.strChannelCode,
												    	   	  id:se.strStreamCode,
												    	   	  name:se.strStreamName,
												    	   	   channelCode:ce.strChannelCode,
												    	       channelName:ce.strChannelName,
												    	   	   deviceCode:ele.strDeviceCode,
													           deviceName:ele.strDeviceName,
													           domainCode:de.strDomainCode,
												    	       domainName:de.strDomainName,
												    	   	  img:"/logo/ios.png",
												    	   	  dataType:"stream"
											    	   	  } 
											    	   	  streamList.push(si);
											    	   	  tree.treeData[se.strStreamCode] = si;
									    	   		});
									    	   }
									    	   
										});
									}
									
									
									
								});
							}
							if(count == 0){
							 	var opts = {field:field,pnode:tree.root,data:m,treeFunc:tree};
					            tree.treeLi = new TreeLi(opts);
								tree.root.append(tree.treeLi);
							}
						});
					    	
		 			});
		 		}
		 		
		 	}
		 });
		}
	}
	
	tree.clickEvent = function(params){
		var pp = {
			params:params,
			opts:opts
		};
		if(params.data && params.data.dataType == "stream"){
			
			if(tree.playingVodeo){
				tree.playingVodeo.close();
			}
					
			$("#domainCode",dialogDiv).val(params.data.domainCode).blur();
			$("#domainName",dialogDiv).val(params.data.domainName).blur().attr("readonly", "readonly");
			$("#videoChannelCode",dialogDiv).val(params.data.channelCode).blur();
			$("#videoChannelName",dialogDiv).val(params.data.channelName).blur().attr("readonly", "readonly");
			$("#devCode",dialogDiv).val(params.data.deviceCode).blur();
			$("#devName",dialogDiv).val(params.data.deviceName).blur().attr("readonly", "readonly");
			$("#videoStreamCode",dialogDiv).val(params.data.id).blur();
			$("#videoStreamName",dialogDiv).val(params.data.name).blur().attr("readonly", "readonly");
			
			//window.frames["videoIframe"].startVideo('hello world');
			
			//var vp = {codes:[{"codes":params.data.codes,"width":"50px","height":"50px",id:"stream1"}]};
			
			//document.getElementById("videoIframe").contentWindow.startVideo(vp);
			
			var newD = {};
			newD.entCode = _this.opts.entCode;
			newD.domainCode = params.data.domainCode;
			newD.deviceCode = params.data.deviceCode;
			newD.channelCode = params.data.channelCode;
			newD.strStreamCode = params.data.id;
			newD.videoPlayer = _this.mainPlay.players[0];
			newD.mainPlay = _this.mainPlay;
			_this.palyRtspVideo(newD);
		}
		/*var _my = this;
		_my.msgDialog(pp);*/
	};
	
	
	tree.custom({a:3});
	
}

SieDevDialog.prototype.initDeviceLevelBYLevel = function (opt,rightTree, dialogDiv){
	var _this = this;
	var fieldParams = {		
		"allCheck":false,		
		"expand":true,
		"treeHeight":opt.height
	};
	var field = {fieldParams: JSON2.stringify(fieldParams)};
	var opts = {field:field,pnode:rightTree};
	var tree = new PlatTree(opts);
	tree.custom = function(redata){
		if((typeof HYSDK) != "undefined"){
		    HYSDK.getDomainReq(function(msg){
				var m  = {};
				if(msg.nResultCode == 0){
					if(msg.domainInfoList){
						var count = msg.domainInfoList.length;
						$.each(msg.domainInfoList, function(di, de){
							var deviceList = [];
							m = {
								codes:de.strDomainCode,
								hasChild:true,
								pid:(de.strDomainCode == de.strParentDomainCode) ? -1:de.strParentDomainCode,
								id:de.strDomainCode,
								name:de.strDomainName,
								img:"/tree/menu.png",
								dataType:"domain"
							};
							tree.treeData[de.strDomainCode] = m;
							m.treeList = deviceList;
						});
					}
				}
				
				var opts = {field:field,pnode:tree.root,data:m,treeFunc:tree};
				tree.treeLi = new TreeLi(opts);
				tree.root.append(tree.treeLi);
			});
	    }
	}
	
	//重写展开事件
	tree.clickExpendEvent = function(optts){
		var _this = this;
		var size = $("li",optts.ul).length;
		if(size<= 0){
			if(optts.data && optts.data.dataType == "domain"){
				HYSDK.getDomainGroupReq(optts.data.id,function(domainGroupResp){
					if(domainGroupResp.nResultCode == 0){
						var gL = [];
						if(domainGroupResp.sDomain && domainGroupResp.sDomain.groupList){
							$.each(domainGroupResp.sDomain.groupList, function(gi, ge){
								var gObj = {
									codes:ge.groupCode,									    	
							    	pid:ge.parentCode,
							    	hasChild:true,
							    	id:ge.groupCode,
							    	name:ge.groupName,
							    	img:"/tree/Vaddres.png",
							    	dataType:"domianGroup"
								};
								gL.push(gObj);
								tree.treeData[ge.groupCode] = gObj;
							});
							
							optts.data.treeList = gL;
							optts.data.hasChild = true;
							tree.expendEvent(optts);
						}
					}
				});
			}else if(optts.data && optts.data.dataType == "domianGroup"){
				var op = {						
						domainCode:optts.data.pid,
						groupCode:optts.data.id,
						nPage:1,
						nSize:100
				};
				HYSDK.getDeviceReq(op,function(deviceRes){
					if(deviceRes.nResultCode == 0){
						var devList = [];
						if(deviceRes.lstChannel){
							$.each(deviceRes.lstChannel, function(di, de){
								var streamList = [];
								var dObj = {
									codes:de.deviceCode+"-"+de.channelCode,									    	
							    	pid:optts.data.id,
							    	hasChild:de.lstStream && de.lstStream.length ? true:false,
							    	id:de.deviceCode,
							    	name:de.channelName,
							    	img:"/tree/shebei.png",
							    	dataType:"devChannel"
								};
								devList.push(dObj);
								
								tree.treeData[de.deviceCode] = dObj;
								
								$.each(de.lstStream, function(si, se){
									var sobj = {
										  codes:de.domainCode + "-"+ de.deviceCode+"-"+de.channelCode+"-"+se.streamCode,
							    	   	  hasChild:false,
							    	   	  pid:de.deviceCode,
							    	   	  id:se.streamCode,
							    	   	  name:se.streamName,
							    	   	   channelCode:de.channelCode,
							    	       channelName:de.channelName,
							    	   	   deviceCode:de.deviceCode,
								           deviceName:de.deviceName,
								           domainCode:de.domainCode,
							    	       domainName:de.domainName,
							    	   	  img:"/tree/tongdao.png",
							    	   	  dataType:"stream"
									}
									streamList.push(sobj);
									dObj.treeList = streamList;
									tree.treeData[se.streamCode] = dObj;
								});
								
							});
							
							optts.data.treeList = devList;
							optts.data.hasChild = true;
							tree.expendEvent(optts);
						}
					}
				});
			}else{
				tree.expendEvent(optts);
			}
		}else{
			tree.expendEvent(optts);
		}
	}
	
	tree.clickEvent = function(params){
		var pp = {
			params:params,
			opts:opts
		};
		if(params.data && params.data.dataType == "stream"){
			
			if(tree.playingVodeo){
				tree.playingVodeo.close();
			}
			$("#domainCode",dialogDiv).val(params.data.domainCode).blur();
			$("#domainName",dialogDiv).val(params.data.domainName).blur().attr("readonly", "readonly");
			$("#videoChannelCode",dialogDiv).val(params.data.channelCode).blur();
			$("#videoChannelName",dialogDiv).val(params.data.channelName).blur().attr("readonly", "readonly");
			$("#devCode",dialogDiv).val(params.data.deviceCode).blur();
			$("#devName",dialogDiv).val(params.data.deviceName).blur().attr("readonly", "readonly");
			$("#videoStreamCode",dialogDiv).val(params.data.id).blur();
			$("#videoStreamName",dialogDiv).val(params.data.name).blur().attr("readonly", "readonly");
			
			var newD = {};
			newD.entCode = _this.opts.entCode;
			newD.domainCode = params.data.domainCode;
			newD.deviceCode = params.data.deviceCode;
			newD.channelCode = params.data.channelCode;
			newD.strStreamCode = params.data.id;
			newD.videoPlayer = _this.mainPlay.players[0];
			newD.mainPlay = _this.mainPlay;
			_this.palyRtspVideo(newD);
		}
	};
	
	
	tree.custom({a:3});
}


SieDevDialog.prototype.initDeviceField = function(bottom, dialog){
	var _this = this;
	var ropt = {url:CONSTANTS.PLATROOM_LIST,data:{roomCode:_this.opts.roomCode},success:function(ret){
		//$.hy_error(_this.opts,_this.opts);
		var row = $("<div/>").addClass("row");
		var form = $("<form >").attr({"id":_this.opts.btn.buttonCode +"_form"}).append(row);	
		var buttons = $("<div class='btn-group buttons' style='display:none;'/>");
		//buttons.css({"height":"60px"});
		//var dialogDiv = $("#"+_this.opts.btn.buttonCode + "_open");
		bottom.append(form).append(buttons);
		var ops = {btnParams:_this.opts.btn,pnode:row,"srcData": _this.opts.srcData};
		if(/*opts &&*/ ret.result && ret.result.length>0)
		{
			if(ops.srcData){
				ops.srcData.roomName = ret.result[0].roomName;
			}else{
				ops.srcData = ret.result[0];
			}
		};
		
		var element = new DrawElement(ops);
		if(_this.opts.btn.blist)
		{
			var optss = {
				form:form,
				buttons:buttons,
				dialog:dialog,
				dialogBtn:_this.opts.btn
			};
			if(_this.opts.btn.blist.length > 0){
				buttons.css({"height":"60px"}).show();
				$.each(_this.opts.btn.blist,function(i,n){
					PlatGrid.prototype.drawDialogButton(optss,n);
				});
			}
		}
	}};
	$._ajax(ropt);
}

SieDevDialog.prototype.palyRtspVideo = function (data){
	var _this = this;
	var oo = {
	    strDomainCode :data.domainCode,
		strDeviceCode  :data.deviceCode,
		strChannelCode :data.channelCode,
		strStreamCode  :data.strStreamCode
	};
	if(data.palyParam){
		$.extend(oo,data.palyParam)
	}
	if((typeof HYSDK) != "undefined"){
		if(oo.strDomainCode && oo.strDeviceCode&& oo.strChannelCode && oo.strStreamCode){
			data.loadingTip && data.loadingTip();
			HYSDK.getDeviceUrlReq(oo,function(urlRes){
				data.loadingResp && data.loadingResp();
			    if(urlRes.nResultCode === 0)
				{		
				 	//var url = "ws://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/ws";
			 		var pla = {				
						rtspurl: urlRes.strDynamicUrl,
						hyVideo: data.videoPlayer,
						videoParam:{
							palyParam:oo,
							videoControl:data.videoControl
						},
						log:false
					};
			 		data.mainPlay.playByVideo(pla);
			 		
				}else
				{
				 	$.operateTip({"msg": "未获取到可播放的视频", "width": "160px"});
				    $.hy_error(urlRes.strResultDescribe,"palyRtspVideo 获取url失败");
				}
			});
		}else{
			$.operateTip({"msg": "播放参数错误", "width": "150px"});
		}
	}
	return;
}

function PlatTianMap(opts)
{
	this.result = opts.result;
	this.pnode = $(opts.pnode);
	//ajaxPage("1111","http://api.map.baidu.com/api?v=3.0&ak=ZjPPMyItrNMACFGqpGqBE3kI");
	var _this = this;
	/**
	 * <div class="cg-top-bg-div">
	<div class='cg-top-title-bg'>  
	    <div class="cg-top-title-left"></div>
		<div class="cg-top-title-middle">${screenTitleImage}</div>
		<div class="cg-top-title-right">
		   <span class="cg-top-title-right-time"></span>
		   <span class="cg-top-title-right-weather"></span>
		</div>
	</div>
</div>
	 */
	var div = $("<div/>").addClass("cg-top-bg-div");
	var bg = $("<div/>").addClass("cg-top-title-bg").css({"background":"url('"+$.getImgUrl("/bigScreen/cg-top-bg.png")+"') no-repeat","background-size":"100% 100%"});
	var left = $("<div/>").addClass("cg-top-title-left");
	//$.hy_error(productParams,productParams);
	var middle = $("<div/>").addClass("cg-top-title-middle").html(platParams.platProduct.productName + $("#home_active_name").html());
	var right = $("<div/>").addClass("cg-top-title-right");
	var time = $("<div/>").addClass("cg-top-title-right-time");
	var weather = $("<div/>").addClass("cg-top-title-right-weather");
	
	bg.append($("<div/>").addClass("imgc").bind("click",function(){
		/*$("#plat_map_id").css({"height":$(window).height() - 150})
		
	    $("#navbar-container").show();
		$("#menu-toggle-btn").click();
		$("#breadcrumbs").show();
		$("#navbar").show();*/
		$.showMenuTop();
		$.goHome();
	}));
	
	div.append(bg.append(left).append(middle).append(right.append(time).append(weather)));
	_this.pnode.append(div);
	var tw = new TimeAndWeather();
	tw.setTime(left,weather);
	
	if(PLAT.tianMapJs === false)
	{
		jQuery.getScript("https://api.tianditu.gov.cn/api?v=4.0&tk="+platParams.TIAN_MAP_KEY, function(){
			PLAT.tianMapJs = true;
			_this.initMap();
		});
	}else
	{
		_this.initMap();
	}
};
PlatTianMap.prototype.initMap = function(){
	var _this = this;
	_this.pnode.append($("<div id='plat_map_id'/>").css({"width":"100%","height":$(window).height() - 32}));
	/*var map = new BMap.Map("plat_map_id");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(118.75554602, 31.97490598), 11);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
	        BMAP_NORMAL_MAP,
	        BMAP_HYBRID_MAP
	    ]}));	  
	
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    */
    var map = new T.Map('plat_map_id');
    map.centerAndZoom(new T.LngLat(118.75554602, 31.97490598), 12);
};

/********************* 会议方法重写**************************/
HY_MEETING.prototype.initInviteDialog = function(){
	var _this = this;
	var opt = {
		id : "inviteUserDialog",
		title : "邀请好友",
		width : 400,
		height : 300
	};
	
	opt.beforeunload = function(){
		
	}
	var dia = $.openDialog(opt);
	opt.treeName = "meetInviteTree";
	opt.searchInput = "invite_search_username";
	opt.conNode = $("#inviteUserDialog");
	//opt.pnode  = content;
	opt.treeHeight = 250;
	var inviteTree = PLatContact.prototype.drawSearchAction(opt);
	inviteTree.clickEvent = function(params){
		var pp = {
		    //clickExpandType:["user"],
			params:params,
			opts:inviteTree.initTreeP
		};
		if(params.data && params.data.dataType == "user"){
			var user = {
			        "strUserDomainCode": params.data.obj.domainCode,
			        "strUserID": params.data.id,
			        "strUserName": params.data.name,
			        "nDevType":1
			    };    
			_this.inviteNewUser(user);
		}
	};
}

/***************************************************************************/
PlatGrid.prototype.startMeetingOnMap = function(opts,srcData){
	var _this = this;
	$.hy_log("=================startMeetingOnMap==================",opts,srcData)
	var opt = {
		"dialog":{"width":1050,"height":550,"lock":true}
	};
	if(opts.buttonParams){
		opt = JSON2.parse(opts.buttonParams);
	}
	var startMeet;
	if(srcData){
		/*var dialogOpt = {
			id : "inspectVideo_panel",
			title : "发起对"+srcData.name+"的指挥",
			width : opt.dialog.width*1,
			height : opt.dialog.height*1,
			lock : opt.dialog.lock
		};
		var dl = $.openDialog(dialogOpt);
		var root = $("#"+dialogOpt.id);
		var left = $("<div/>").attr({"id":"map-meeting-left-div"}).css({"float":"left","width":"70%","height":"100%"});
		var right = $("<div/>").attr({"id":"map-meeting-right-div"}).css({"float":"left","width":"30%","height":"100%"});
		root.append(left).append(right);
		if(srcData.entParams){
			var entParams = JSON2.parse(srcData.entParams);
			var opt = {
				"pnode": "map-meeting-left-div",
				"userPanel": "map-meeting-right-div",
				"meetingInfo": {
					"strMeetingName": "发起对"+srcData.name+"的指挥",
					"strMeetingDesc": "123456",
					"lstMeetingUserInfo": [{
						"strUserDomainCode": entParams.domainCode,
						"strUserID": srcData.userCode,
						"strUserName": srcData.name,
						"nDevType": 1
					}]
				}
			}
			var startMeet = HYSDK.callMeeting(opt);
			startMeet.meetDialog = dl;
			startMeet.start(function(res){
				 
			});
		}*/
		var dialogparam = {
			id: "startMapMeeting_dialog",
			width : opt.dialog.width*1,
			height : opt.dialog.height*1,
			beforeunload:function(meet){
				dialogparam.stopRecordFunc();
				startMeet.stopMeeting();
			},
			title: "发起对"+srcData.name+"的指挥",
			playDivId: "map-meeting-left-div",
			userDivId:"map-meeting-right-div",
			type:"host",
			stopFunc: function(){
				if(startMeet.meetDialog){
					startMeet.meetDialog.close()
				}
			},
			inviteFunc: function(){
				startMeet.initInviteDialog();
			},
			startRecordFunc: function(){
				startMeet.beginRecord(function(json){
					if(json.nResultCode == 0){
						if(dialogparam.btnObj){
							if(dialogparam.btnObj.startRecordBtn){
								dialogparam.btnObj.startRecordBtn.hide();
							}
							if(dialogparam.btnObj.stopRecordBtn){
								dialogparam.btnObj.stopRecordBtn.show();
							}
						}
					}
				});
			},
			stopRecordFunc:function(){
				startMeet.stopRecord(function(json){
					if(json.nResultCode == 0){
						if(dialogparam.btnObj){
							if(dialogparam.btnObj.stopRecordBtn){
								dialogparam.btnObj.stopRecordBtn.hide();
							}
							if(dialogparam.btnObj.startRecordBtn){
								dialogparam.btnObj.startRecordBtn.show();
							}
						}
					}
				});
			}
		};
		var dia = PLAT.initMeetingDialog(dialogparam);
		if(srcData.entParams){
			var entParams = JSON2.parse(srcData.entParams);
			var info = {
				pnode: dialogparam.playDivId,
				userPanel:dialogparam.userDivId,
				meetingInfo: {
					"strMeetingName": "发起对"+srcData.name+"的指挥",
					"strMeetingDesc": "123456",
					"lstMeetingUserInfo": [{
						"strUserDomainCode": entParams.domainCode,
						"strUserID": srcData.userCode,
						"strUserName": srcData.name,
						"nDevType": 1
					}]
				}
			}
			startMeet = HYSDK.callMeeting(info);
			startMeet.meetDialog = dia;
			startMeet.start(function(res){
				 
			});
		}
	}	
}
