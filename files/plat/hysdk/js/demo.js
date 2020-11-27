var sdk = new HY_SDK_WS();
sdk.mac = uuid();
window.onbeforeunload = function (e) {
	if(sdk){
		try{
			sdk.exitMeetOrTalk();
			sdk.destoryAllPlay();
			sdk.destory();
		}catch(e){
			console.error("onbeforeunload:::"+e);
		}
	}
};

sdk.notifyUserStatus= function (json) {
	this.log(" 收到推送，用户状态消息： " , json);
	if(json.nOnline == 2 && json.strUserID == this.opts.loginName)
	{
		this.sie.userStatus = json.nOnline;
		console.error(" 收到推送，用户状态消息： " , json);
		this.userReConnectReq();
	}else{
		if(json.nOnline == 2){
			setLog("好友消息提示："+json.strUserName+"离线");
		}else if(json.nOnline == 1){
			setLog("好友消息提示："+json.strUserName+"上线");
		}
	}
};
sdk.notifyKickOutEx = function(json)
{
	$("#login-btn").show();
    $("#logout-btn").hide();
	bootbox.alert("账号已在其它设备登录");
	setLog("账号已在其它设备登录");
}
var userStatus = {
	 "0":"不在线",
	 "1":"空闲",
	 "2": "采集中",
	 "3":"对讲中",
	 "4":"会议中"
};

var meetingStauts = {
	1:"正在进行",
	2:"已经结束",
	4:"尚未开始"
};

var trunkStauts = {
	1:"静态频道",
	2:"临时频道（正在进行）",
	4:"历史频道（临时结束）",
	8:"默认频道"
}
    // 接收透明通道消息
sdk.notifyMsg = function(body) {
    sdk.log(JSON.stringify(body));
    
    bootbox.alert("收到新消息! 内容:"+JSON.stringify(body));
	setLog("收到新消息！"+JSON.stringify(body));
		
}
sdk.drawCalledPanel = function (calledTk) {
	var _this  = this;
	calledTk.opt.pnode='meetingPlayer';
	calledTk.opt.userPanel='meetingUser';
	$("#"+calledTk.opt.userPanel).empty();
	calledTk.playPanel = $("#meetingPlayer").empty();
	calledTk.playPanel.show();
	calledTk.calledStart();
	calledTk.createMeetBtn = $("#createMeetBtn");
	calledTk.quitMeetBtn = $("#quitMeetBtn");
	calledTk.stopMeetBtn = $("#stopMeetBtn");
	
	calledTk.quitMeetAction = function(){
		calledTk.createMeetBtn.show();
		calledTk.quitMeetBtn.hide();
		calledTk.stopMeetBtn.hide();
		calledTk.playPanel.hide();
    	$("#"+calledTk.opt.userPanel).empty();
	}
	calledTk.createMeetBtn.hide();
	calledTk.quitMeetBtn.show().unbind().bind("click", function(){
		calledTk.quitMeeting(function(){
			calledTk.createMeetBtn.show();
			calledTk.quitMeetBtn.hide();
			calledTk.stopMeetBtn.hide();
			calledTk.playPanel.hide();
		});
	});
}

sdk.drawTalkCalledPanel = function (calledTk) {
	var _this  = this;
	calledTk.opt.pnode='talkPlayer';
	calledTk.opt.userPanel='talkUser';
	calledTk.playPanel = $("#talkPlayer").empty();
	calledTk.playPanel.hide();
	calledTk.calledStart();
	calledTk.createTalkBtn = $("#createTalkBtn");
	calledTk.quitTalkBtn = $("#quitTalkBtn");
	calledTk.createTalkBtn.hide();
	
	calledTk.quitTalkAction = function(){
		calledTk.createTalkBtn.show();
		calledTk.quitTalkBtn.hide();
		calledTk.playPanel.hide();
		$('#'+calledTk.opt.userPanel).hide().empty();
	}
	$('#'+calledTk.opt.userPanel).show();
	calledTk.quitTalkBtn.show().unbind().bind("click", function(){
		calledTk.quitReq();
	});
}


sdk.drawTChannelCalledPanel= function (calledTC) {
	var _this  = this;
	
	calledTC.opt.userPanel='tchannelUser';
	calledTC.opt.pnode='tchannelPlayer';
	calledTC.playPanel = $("#tchannelPlayer").empty();
	calledTC.playPanel.hide();
	$("#tchannelUser").height(500).css({"overflow-y":"auto"}).empty().show();
	calledTC.calledStart();
	calledTC.createBtn = $("#createTrunkBtn");
	calledTC.quitBtn = $("#tcquitBtn");
	calledTC.startSpeak = $("#startSpeak");
	calledTC.stopSpeak = $("#stopSpeak");
	calledTC.startVRecord = $("#startVRecord");
	calledTC.stopVRecord = $("#stopVRecord");
	calledTC.createBtn.hide();
	
	calledTC.inviteBtn = $("#tcinviteBtn").show();
	calledTC.delChannelBtn = $("#delChannel").show();
	
	
	calledTC.quitTChannelAction = function(){
		calledTC.createBtn.show();
		calledTC.quitBtn.hide();
		calledTC.playPanel.hide();
		calledTC.startSpeak.hide();
		calledTC.stopSpeak.hide();
		calledTC.startVRecord.hide();
	    calledTC.stopVRecord.hide();
		calledTC.inviteBtn = $("#tcinviteBtn").hide();
		calledTC.delChannelBtn = $("#delChannel").hide();
		$("#tchannelUser").hide();
	}
	
	enterChannelAction(calledTC);
	
	/*calledTC.quitBtn.show().bind("click", function(){
		calledTC.leaveReq();
		return;
	});
	calledTC.delChannelBtn.show().bind("click", function(){
		calledTC.deleteReq();
		return;
	});
	
	calledTC.startSpeak.show().bind("click", function(){
		calledTC.getSpeakRightReq(function(res){
			if(res.nResultCode == 0){
				calledTC.starCapture(function(sres){
					if(sres.code ==0){
						calledTC.startSpeakReq(function(spres){
							if(spres.nResultCode == 0){
								calledTC.startSpeak.hide();
								calledTC.stopSpeak.show();
							}
						});
					}else{
						 bootbox.alert("采集失败！");
					}
				});
				
				
				
			}
		});
		return;
	});
	calledTC.stopSpeak.bind("click", function(){
		calledTC.stopSpeakReq(function(res){
			calledTC.stopSpeak.hide();
			calledTC.startSpeak.show();
			console.error("~~~~stopSpeakReq~~~~",res);
		});
		return;
	});*/

}

function enterChannelAction(tChannel){
	tChannel.delChannelBtn.show().unbind().bind("click", function(){
		tChannel.deleteReq();
		return;
	});
	tChannel.inviteBtn.show();
	tChannel.quitBtn.show().unbind().bind("click", function(){
		tChannel.leaveReq();
		return;
	});
	
	tChannel.startSpeak.show().unbind().bind("click", function(){
		tChannel.startSpeakAction(function(){
			tChannel.startSpeak.hide();
			tChannel.stopSpeak.show();
		});
		return;
	});
	tChannel.stopSpeak.unbind().bind("click", function(){
		tChannel.stopSpeakAction(function(res){
			if(res.nResultCode == 0){
				tChannel.stopSpeak.hide();
				tChannel.startSpeak.show();
			}
		});
		return;
	});
	
	tChannel.startVRecord.show().unbind().bind("click", function(){
		tChannel.recordControl({nRecordStatus: 1},function(res){
			if(res.nResultCode == 0){
				tChannel.startVRecord.hide();
				tChannel.stopVRecord.show();
			}else{
				bootbox.alert("开始录音失败！");
			}
		});
		return;
	});
	
	tChannel.stopVRecord.unbind().bind("click", function(){
 		tChannel.recordControl({nRecordStatus: 0},function(res){
			if(res.nResultCode == 0){
				tChannel.startVRecord.show();
				tChannel.stopVRecord.hide();
			}else{
				bootbox.alert("停止录音失败！");
			}
		});
		return;
	});
}

$(function(){
	$("#login-btn").click();
	$(".left").css({height:$(window).height()});
	$(".left-panel").css({height:$(window).height()});
})
try {
   /* var cvanvas = sdk.getCanvas({
        canvasId: 'canvas-content',
        width: 300,
        height: 200,
        sdk: sdk
    });
    cvanvas.initControlPanel();*/
} catch(e) {
    window.console && window.console.error(e);
}

function lougout() {
	sdk.log(sdk.sie.userStatus);
	if(sdk.sie.userStatus == 1)
	{
	    sdk.destory(function(){
	        $("#logs").append($("<div/>").html("退出成功！"));
	        $("#login-btn").show();
            $("#logout-btn").hide();
            	
	         bootbox.alert("退出成功！");
	         
	    });
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
}

function reload() {
    sdk.init(getUserInfo());
}
function getDomain(type) {
     var mplayer;
    sdk.getDomainReq(function(msg) {
        sdk.log(" function getDomain() ", JSON.stringify(msg));
        if (msg.nResultCode === 0) {
            var ul = $("#devicTree").empty();
            //if (type == "setUserIpc") { ul = $("#devicTree1");}
            $.each(msg.domainInfoList, function(i, n) {
                var li = $("<li/>");
                var ul1 = $("<ul/>");
                li.append($("<span/>").html(n.strDomainName)).append($("<a style='float: right;'/>").html("获取分组").bind("click",function(res) {
                    ul1.empty();
                    sdk.getDomainGroupReq(n.strDomainCode,function(domainGroupResp) {
                        if (domainGroupResp.nResultCode === 0) {
                            sdk.log(JSON.stringify(domainGroupResp));
                            $.each(domainGroupResp.sDomain.groupList,function(idx, ele) {
                                var li1 = $("<li/>");
                                var ul2 = $("<ul/>");
                                li1.append($("<span/>").html(ele.groupName)).append($("<a style='float: right;'/>").html("展开").bind("click",function(res) {
                                     ul2.empty();
                                    var op = {
                                        domainCode: n.strDomainCode,
                                        groupCode: ele.groupCode,
                                        nPage: 1,
                                        nSize: 100
                                    };
                                    sdk.getDeviceReq(op,function(deviceRes) {
                                        if (deviceRes.nResultCode === 0) {
                                            $.each(deviceRes.lstChannel,function(idx1, ele1) {
                                                var li3 = $("<li/>");
                                                var ul3 = $("<ul/>");
                                                li3.append($("<span/>").html(ele1.deviceName));
                                                li3.append(ul3);
                                                ul2.append(li3);
                                                $.each(ele1.lstStream,function(idx2, ele2) {
                                                    var li4 = $("<li/>");
                                                    var ul4 = $("<ul/>");
                                                    li4.append($("<span/>").html(ele2.streamName)).append($("<a style='float: right; margin-left:10px'/>").html("播放").bind("click",function(res) {
                                                        var oo = {
                                                            strDomainCode: ele1.domainCode,
                                                            strDeviceCode: ele1.deviceCode,
                                                            strChannelCode: ele1.channelCode,
                                                            strStreamCode: ele2.streamCode
                                                        };
                                                        var codes = ele1.domainCode+"-"+ele1.deviceCode+"-"+ ele1.channelCode+"-"+ele2.streamCode;
                                                        setLog("四原组："+ codes);
                                                        sdk.getDeviceUrlReq(oo,function(urlRes) {
                                                            if (urlRes.nResultCode === 0) {
                                                            	if(mplayer)
                                                            	{
                                                            		mplayer.players[0].close();
                                                            	}else
                                                            	{
		                                                            var pla = {
																        layout: 1,
																        pnode: "devicePlayer",
																        log: true
																    };
																    mplayer = sdk.getPlayer(pla);
                                                            	}
	                                                        	var pla1 = {
																        wsserver: $("#websocketPlatUrl").val(),/*"ws://"+$("#svrIp").val()+":5080" "ws://192.168.2.30:5080",*/
																        rtspurl: urlRes.strDynamicUrl,
																        hyVideo:mplayer.players[0],
																        videoParam:{palyParam:oo,videoControl:{recordBtn:true}},
																        log: true
																    };
																mplayer.playByVideo(pla1);
	                                                            setLog(urlRes.strDynamicUrl);

                                                            } else {
                                                                bootbox.alert("getDeviceUrlReq:::" + urlRes.strResultDescribe); 
                                                            }
                                                        });
                                                    }));
                                                    if (type == "setUserIpc") {
                                                        li4.append($("<a style='float: right;'/>").html("设置为用户ipc").bind("click", function(res) {
                                                            var oo = {
                                                                strDomainCode: ele1.domainCode,
                                                                strDeviceCode: ele1.deviceCode,
                                                                strChannelCode: ele1.channelCode,
                                                                strStreamCode: ele2.streamCode,
                                                                nIsUse: 1
                                                            };
                                                            sdk.setUserUseIPC(oo,function(res){
                                                            	if(res.nResultCode==0){
	                                                            	bootbox.alert("设置成功");
                                                            	}else{
                                                            		bootbox.alert("设置失败："+res.strResultDescribe);
                                                            	}
                                                            });
                                                        }));
                                                    }

                                                    li4.append(ul4);
                                                    ul3.append(li4);
                                                });
                                            });
                                        }
                                    });
                                }));
                                li1.append(ul2);
                                ul1.append(li1);
                            });
                        }
                    });
                }));
                li.append(ul1);
                ul.append(li);
            })
        } else {
            $("#devicTree").html("获取域信息失败！");
        }
    });
}

function getUserInfo() {
    var opt = {
        url: $("#url").val(),
        svrIp: $("#svrIp").val(),
        userName: $("#userName").val(),
        svrPort: $("#svrPort").val() * 1,
        webrtcUrl: $("#webRtcUrl").val(),//"wss://192.168.2.176:8989",//"ws://192.168.2.176:8188" ,//"wss://192.168.2.176:8989",
        loginName: $("#loginName").val(),
        iceServers :JSON.parse($("#iceServers").val()),
        loginSuccess: function(msg) {
            // console.log("11111" , msg)
           
          setLog(JSON.stringify(msg));
            if (msg.nResultCode === 0) {
//	            bootbox.alert("登录成功！");
            	$("#login-btn").hide();
            	$("#logout-btn").show();
            	$("#domaincode").val(sdk.sie.strUserDomainCode);
            	$("#playLoginName").val(opt.loginName)
        		var device = sdk.getUserUseIPC();
	   			if(device && device.deviceType && device.deviceType ==1){
            	 	if(device.ipc && device.ipc.nIsUse == 1){
			   	 		sdk.setUserUseIPCReq(device.ipc); 
   					}
   				}
            } else {
                sdk.kickOut({
                    strUserTokenID: msg.strUserTokenID
                });
            }
            // 登录成功后设置用户ipcL156
            
            /*
			 * var ipc = sdk.getUserUseIPC(); if(ipc && ipc.nIsUse == 1){
			 * sdk.setUserUseIPCReq(ipc); }
			 */

            sdk.initWebRtc();

        },
        log: true
    };
    sdk.log(JSON.stringify(opt));
    return opt;
}

function player() {
    // SENT:
    // {"id":2,"url":"rtsp://192.168.2.198:554/2268/rtsp://192.168.2.230:554/Streaming/Channels/1?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=25;DmgType=2258"}
    /*
	 * var play = sdk.getPlayer(pla);
	 */
	
	
	
    var pla = {
        wsserver: $("#websocketPlatUrl").val(),
        rtspurl: "rtsp://192.168.2.30:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=1024;FrameRate=25;IFrame=100",
        log: true
    };
    console.log(sdk);
    sdk.mainPlay.play(pla);
    // document.getElementById("playPanel").webkitRequestFullScreen();
}
function setLayout() {
	if(sdk.mainPlay){
		sdk.mainPlay.stopPlay();
	}
	if(sdk.sie.userStatus == 1){
		$("#playPanel").show();
	    var pla = {
	        layout: $("#layout").val() * 1,
	        pnode: "playPanel"
	    };
		/*var pla = {
	        layout: "Meet2",
	        pnode: "playPanel"
	    };*/
	    sdk.mainPlay = sdk.getPlayer(pla);
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}
function playerx() {
    if (sdk.mainPlay) {
    	
    	sdk.mainPlay.stopPlay();
    	
        $.each(sdk.mainPlay.players,
        function(i, n) {
            var pla = {
                wsserver: $("#websocketPlatUrl").val(),
                rtspurl: $("#rtsp_url").val(),//"rtsp://192.168.2.30:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=1024;FrameRate=25;IFrame=100",
                hyVideo: n,
                log: true
            };
            sdk.log(sdk);
            sdk.mainPlay.playByVideo(pla);
        })
    }
}
function playerx1() {
	if(sdk.mainPlay){
		sdk.mainPlay.stopPlay();
	}
    if (activeHyVideo) {
    	activeHyVideo.close();
        var pla = {
            wsserver: $("#websocketPlatUrl").val(),
            rtspurl: $("#rtsp_url").val(),//"rtsp://192.168.2.30:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=1024;FrameRate=25;IFrame=100",
            hyVideo: activeHyVideo,
            log: true
        };
        sdk.mainPlay.playByVideo(pla);
    }
}

function playerxRtc() {
    if (sdk.mainPlay) {
    	sdk.mainPlay.stopPlay();
    	
        $.each(sdk.mainPlay.players,
        function(i, n) {
            var map =  sdk.playRtc({
				videoNode: n,
				playUrl:$("#rtsp_url").val(),
				videoParam:{palyParam:{title:"播放"},videoControl:{curresFlag:true,bitrateFlag:true}}
			});
		
        })
    }
}

function stopPlay() {
    if (sdk.mainPlay) {
        sdk.stopPlay(sdk.mainPlay);
    }
}

function createMeeting() {
	if(sdk.sie.userStatus == 1){
		$("#meetingPlayer").show();
	    var meetingOption =JSON.parse($("#meetingparam").val());
	    var meet = sdk.callMeeting({	        
	        "pnode": 'meetingPlayer',
	        "userPanel": 'meetingUser',
	        meetingInfo: meetingOption,
	        meetingRole: 1
	    });

	    meet.notifyPeerUserMeetingInfo= function(json){
			var _this = this;
			var userobj = _this.userInfo[json.strToUserDomainCode+"_"+json.strUserID];
			 userobj.status = json.nIsAgree;
			//userobj.status = 1;
	     	 _this.ctr.updateStatus(userobj);
	     	 
	     	 if(json.nIsAgree == 3){
	     		setLog("会议提示："+json.strToUserName+"离线！");
	     	 }else if(json.nIsAgree == 0){
	     		setLog("会议提示："+json.strToUserName+"拒绝！");
	     	 }
		}
	    meet.createMeetBtn = $("#createMeetBtn");
		meet.quitMeetBtn = $("#quitMeetBtn");
		meet.stopMeetBtn = $("#stopMeetBtn");
		meet.playPanel = $("#meetingPlayer");
	    meet.inviteBtn = $("#inviteBtn");
	    meet.startRecordBtn = $("#startRecordBtn");
	    meet.stopRecordBtn = $("#stopRecordBtn");
	    meet.lockBtn= $("#lockBtn");
	    meet.createMeetBtn.hide();
	    meet.start(function(resss,backMt){
	    	if(resss.code == 1){
	    		bootbox.alert("会议创建失败:::"+resss.desc);
	    		return ;
	    	}
	    	meet.inviteBtn.show();
	    	meet.lockBtn.show();
	    	meet.startRecordBtn.show().unbind().bind("click", function(){
	    		meet.beginRecord(function(res){
	    			if(res.nResultCode == 0){
			    		meet.startRecordBtn.hide();
	    				meet.stopRecordBtn.show();
	    			}else{
	    				bootbox.alert(sdk.errorCode[res.nResultCode] + JSON.stringify(res));
	    			}
	    		});
	    	});
	    	meet.lockBtn.unbind().bind("click", function(){
	    		meet.lockToggle();
	    	});
	    	meet.stopRecordBtn.unbind().bind("click", function(){
	    		meet.stopRecord(function(json){
	    			if(json.nResultCode == 0){
			    		meet.stopRecordBtn.hide();
	    				meet.startRecordBtn.show();
	    			}else{
	    				bootbox.alert("停止录像失败:::"+JSON.stringify(json));
	    			}
	    		});
	    	});
	    	meet.stopMeetAction = function(){
	    		 meet.playPanel.hide();
	    		 meet.stopMeetBtn.hide();
	    		 meet.inviteBtn.hide();
	    		 meet.lockBtn.hide();
	    		 meet.startRecordBtn.hide();
	    		 meet.stopRecordBtn.hide();
	    		 meet.stopMeetBtn.hide();
	    		 meet.createMeetBtn.show();
	    		 $("#"+meet.opt.userPanel).empty();
	    	}
	    	meet.stopMeetBtn.show().unbind().bind("click", function(){
	    		 backMt.stopMeeting();
	    	});
	    });
	    // sdk.HYCurrentMeeting.getUserDynamicUrl({});
	    //sdk.HYCurrentMeeting.startMeetingReq(meetingOption);
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}

function stopMeeting() {
    sdk.HYCurrentMeeting.stopMeetingReq();
}

function quitMeeting() {
    sdk.HYCurrentMeeting.quitMeeting();
}

function queryUserList() {
    var opt = {
        strDomainCode: sdk.sie.strUserDomainCode,
        "listUser": []
    };
    sdk.queryUserListReq(opt,
    function(res) {
        console.log(" =====  ---- " + JSON.stringify(res));
        setLog(JSON.stringify(res));
    });
}

function getUserURl() {
    var opt = {};
    sdk.getMobileDynamicUrlReq(opt,
    function(json) {
        console.log(json);
    });
}

function fullScreen() {
    sdk.mainPlay.fullScreen();
}

function addLayout() {
    sdk.addLayout(sdk.mainPlay);
//	sdk.mainPlay.addMeetLayout();
}

function reduceLayout() {
    if (sdk.mainPlay.players.length) {
    	//sdk.mainPlay.reduceMeetLayout(sdk.mainPlay.players[0]);
        sdk.reduceLayout({
            "mainPlay": sdk.mainPlay,
            hyVideo: sdk.mainPlay.players[0]
        });
    }else{
    	bootbox.alert("仅剩下1布局，不可减少");
    }

}
function setFriend() {
   if(sdk.sie.userStatus == 1)
	{ 
	sdk.log($("#friendParams").val());
	var opt = {
        strUserTokenID: sdk.sie.strUserTokenID,
        strUserDomainCode: sdk.sie.strUserDomainCode,
        strUserID: $("#loginName").val(),
        listUser: JSON.parse($("#friendParams").val())
    };
    sdk.setUserFriendReq(opt,
    function(json) {
        sdk.log("setUserFriendResp : " + JSON.stringify(json));
        if(json.nResultCode === 0)
    	{
    		bootbox.alert("设置好友成功！");
    	}else
    	{
    		bootbox.alert("设置好友失败！<br/><red>【" + sdk.getErrorDesc(json.nResultCode)+"】</red>");
    	}
        setLog(JSON.stringify(json));
    });}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
    
   
}
function serRecordURl() {
    var opt = {
        strUserTokenID: sdk.sie.strUserTokenID,
        strNotifyUrl: "http://192.168.2.110:8380/platWeb/test.action",
        strNotifyDomainCode: sdk.sie.strUserDomainCode
    };
    sdk.setUseNotifyUrlReq(opt,
    function(json) {
        console.log(" serRecordURl : " + JSON.stringify(json));
    });
}

function getRecord() {
    sdk.getRecordUrlListCTSReq({
        serviceUrl: {
            strDomainCode: 'a4bf014bb884',
            strDeviceCode: 'a4bf014bb8841130000009',
            strChannelCode: 'a4bf014bb8841310000025',
            strStreamCode: 'a4bf014bb8840000057'
        },
        strRecordLocation: "1",
        nRecordDomain: 1,
        unRecordType: 2,
        strStartTime: '2020-08-31 00:00:00',
        strEndTime: '2020-08-31 23:59:59',
        nPage: 0
    },
    function(res) {
        alert(JSON.stringify(res))
    });
}

function turn(nCommand) {

    sdk.PTZControlReq({
        serviceUrl: {
            strDomainCode: 'a4bf014bb884',
            strDeviceCode: 'a4bf014bb8841130000009',
            strChannelCode: 'a4bf014bb8841310000025',
            strStreamCode: 'a4bf014bb8840000057'
        },
        nCommand: nCommand,
        nStop: 0
    },
    function(msg) {
        console.log("###" + JSON.stringify(msg));
    });
}

function stopTurn() {
    sdk.PTZControlReq({
        serviceUrl: {
            strDomainCode: 'a4bf014bb884',
            strDeviceCode: 'a4bf014bb8841130000009',
            strChannelCode: 'a4bf014bb8841310000025',
            strStreamCode: 'a4bf014bb8840000057'
        },
        nCommand: 3,
        nStop: 1
    },
    function() {

});
}

function sendCustomMsg() {
	if(sdk.sie.userStatus == 1){
	    var opts = {
	        strMsg: $("#msgContent").val(),
	        nImportant: 0,
	        listUser: JSON.parse($("#acceptUser").val())
	    };
	    sdk.sendMsgToMultiUserReq(opts,
	    function(res) {
	    	sdk.log(" //// " + JSON.stringify(res));
	    	if(res.nResultCode === 0)
        	{
        		bootbox.alert("发送成功！");
        	}else
        	{
        		bootbox.alert("发送失败！<br/><red>【" + sdk.getErrorDesc(res.nResultCode)+"】</red>");
        	}
	        setLog(JSON.stringify(res));
	    });
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}

function getUsbDevice() {
    $("#usb-device").empty();
    $("#usb-device-voice").empty();
    //
    sdk.getUsbList({
        callback: function(list) {
            if (list) {
                $.each(list,
                function(i, e) {
                    var option = $("<option/>").attr({
                        "value": e.groupId
                    }).html(e.label ? e.label: e.groupId);
                    option.bind("click",
                    function() {

});
                    if (e.kind == "videoinput") {
                        $("#usb-device").append(option);
                    } else if (e.kind == "audioinput") {
                        $("#usb-device-voice").append(option);
                    }

                });
            }
        }
    });
}
//getUsbDevice();
function selectdeviceType(type) {
    $("#devicTree1").empty();
    if (type == 1) {

        $("#usbWarp").hide();
        $("#usb-save").hide();
        getDomain("setUserIpc");
    } else {
        $("#usbWarp").show();
        $("#usb-save").show();
        getUsbDevice();
    }
}

function setUserUsb() {
    sdk.setUserUsb(JSON.parse($("#setUsbParam").val()));
    bootbox.alert("usb设置成功！");
}


function stopStartCapture(){
	if(sdk.captureMainplay){
		sdk.captureMainplay.stopPlay();
	}
	
	$("#startCapture").show();
	$("#stopStartCapture").hide();
}

function startCapture() {
	if(sdk.sie.userStatus == 1){
		if(sdk.captureMainplay){
			sdk.captureMainplay.stopPlay();
		}
		$("#startCapture").hide();
		/*$("#stopStartCapture").show();*/
		
		if(sdk.isConnected() === true)
		{
			$("#captureRtcPanel").show();
			 var pla = {
		        layout: 1,
		        pnode: "captureRtcPanel",
		        log: true
		    };
		    var playmainPlay = sdk.getPlayer(pla);
		    sdk.captureMainplay = playmainPlay;
		    var media = "";
	    	var device = sdk.getUserUseIPC();
		     if(device && device.usb){
		    	media = device.usb;
		    }
		    var map = sdk.startCapture({
		        videoNode: playmainPlay.players[0],
		        videoParam:{palyParam:{title:"采集"},videoControl:{setBitFlag:true,setCurresFlag: true, setAudioFlag: true,setVideoFlag: true}},
		        media: media,
		        success: function(res){
		        	if(res.code == 0){
		        		$("#startCapture").hide();
						$("#stopStartCapture").show();
		        	}else{
		        		$("#startCapture").show();
		        		console.error(res);
		        	}
		        }
		    });
		}else
		{
			bootbox.alert("WebRTC服务连接异常:: " +sdk.isConnected());
		}
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}

function captureWatch(){
	if(sdk.watchCapture){
		sdk.watchCapture.stopPlay();
	}
	
	$("#captureWatch").hide();
	$("#stopCaptureWatch").show();
	$("#captureWatchPanel").show();
	 var pla = {
        layout: 1,
        pnode: "captureWatchPanel",
        log: true
    };
    var playmainPlay = sdk.getPlayer(pla);
    sdk.watchCapture = playmainPlay;
    var  videoElement = playmainPlay.players[0].videoElement;
    playmainPlay.players[0].videoControl = {
        screenchangeBtn: true,
        changeVoiceBtn:true,
        closeBtn:true,
        recordBtn:false,
        syncRecordStats:false,
        bitrateFlag:false,
        curresFlag: false,
        setBitFlag: false,
        setDevFlag: false
    }
    playmainPlay.players[0].palyParam = {title:"采集预览"};
    playmainPlay.players[0].palyParam.afterClose = function(){
    	var stream = videoElement.palyStream;
    	if(stream){
    		var tracks = stream.getTracks();
    		for(var mst of tracks) {
    			if(mst) {
    				mst.stop();
    			}
    		}
    	}
    }
    playmainPlay.players[0].setAvailableBtn({
    	obj: playmainPlay.players[0]
    });
    
    
	navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then((stream) => {
        	videoElement.palyStream = stream;
            videoElement.srcObject = stream;
            videoElement.style.display = 'block';
            videoElement.onloadedmetadata = function(){
                //resolve(true);
            };
            videoElement.play();
        }).catch((err) => {
           // reject(err);
            sdk.log(err);
        });
}

function stopCaptureWatch(){
	if(sdk.watchCapture){
		sdk.watchCapture.stopPlay();
	}
	$("#captureWatch").show();
	$("#stopCaptureWatch").hide();
}

function stopVoiceCapture(){
	if(sdk.voiceCapture){
		sdk.voiceCapture.stopPlay();
	}
	$("#startVoiceCapture").show();
	$("#stopVoiceCapture").hide();
}

function startVoiceCapture(){
	if(sdk.isConnected() === true)
	{
		if(sdk.voiceCapture){
			sdk.voiceCapture.stopPlay();
		}
		$("#startVoiceCapture").hide();
		$("#captureVoicePanel").show();
		 var pla = {
	        layout: 1,
	        pnode: "captureVoicePanel",
	        log: true
	    };
	    var playmainPlay = sdk.getPlayer(pla);
	    sdk.voiceCapture = playmainPlay;
	    var map = sdk.startCapture({
	        videoNode: playmainPlay.players[0],
	        media:{data: true,video:false,audio:true},
	        videoParam:{palyParam:{title:"语音采集"}},
	        success: function(res){
	        	if(res.code == 0){
		        	$("#startVoiceCapture").hide();
					$("#stopVoiceCapture").show();
	        	}else{
        			$("#startVoiceCapture").show();
	        	}
	        }
	    });
	}else
	{
		bootbox.alert("WebRTC server isConnected:: " +sdk.isConnected());
	}
}


function stopSetDeviceCapture(){
	if(sdk.deviceCapture){
		sdk.deviceCapture.stopPlay();
	}
	$("#setDeviceCapture").show();
	$("#stopSetDeviceCapture").hide();
}
function setDeviceCapture(){
	if(sdk.isConnected() === true)
	{
		if(sdk.deviceCapture){
			sdk.deviceCapture.stopPlay();
		}
		$("#setDeviceCapture").hide();
		$("#setDevicePanel").show();
		 var pla = {
	        layout: 1,
	        pnode: "setDevicePanel",
	        log: true
	    };
	    var playmainPlay = sdk.getPlayer(pla);
	    sdk.deviceCapture = playmainPlay;
	    sdk.setUserUsb(JSON.parse($("#setDeviceParam").val()));
	    
	    var map = sdk.startCapture({
	        videoNode: playmainPlay.players[0],
	        media:JSON.parse($("#setDeviceParam").val()),
	        videoParam:{palyParam:{title:"自定义采集"},videoControl:{setBitFlag:true,setCurresFlag: true, setAudioFlag: true,setVideoFlag: true}},
	        success: function(res){
	        	if(res.code ==0){
		        	$("#setDeviceCapture").hide();
					$("#stopSetDeviceCapture").show();
	        	}else{
	        		$("#setDeviceCapture").show();
	        	}
	        }
	    });
	}else
	{
		bootbox.alert("WebRTC server isConnected:: " +sdk.isConnected());
	}
}

function startScreenCapture() {
	if(sdk.isConnected() === true)
	{
		if(sdk.screencapturePlay){
			sdk.screencapturePlay.stopPlay();
		}
		$("#captureScreenPanel").show();
		 var pla = {
	        layout: 1,
	        pnode: "captureScreenPanel",
	        log: true
	    };
		 sdk.screencapturePlay = sdk.getPlayer(pla);
	    
	    var map = sdk.startCapture({
	        videoNode: sdk.screencapturePlay.players[0],
	        media:{data: true,video:"screen"},
	        videoParam:{palyParam:{title:"采集"}},
	        capture_type:2,
	        success: function(){
	        	$("#startScreenCapture").hide();
	        	$("#stopScreenCapture").show();
	        }
	    });
	    sdk.screenCaptureMap = map;
	    //chrome.desktopCapture.cancelChooseDesktopMedia(0);
	}else
	{
		bootbox.alert("WebRTC server isConnected:: " +sdk.isConnected());
	}
   

}

function stopScreenCapture(){
	if(sdk.screencapturePlay){
		sdk.screencapturePlay.players[0].close();
	}
	$("#startScreenCapture").show();
	$("#stopScreenCapture").hide();
}

function playWebRtc(){
	if(sdk.isConnected() === true)
	{
		var map =  sdk.playRtc({
			videoNode: activeHyVideo,
			playUrl:"rtsp://192.168.2.198:554/2337/rtsp://10000079_1:554?BitRate=512;FrameRate=25;IFrame=100;DmgType=2337",
			videoParam:{palyParam:{title:"播放"},videoControl:{curresFlag:true,bitrateFlag:true}}
		});
	}else
	{
		bootbox.alert("WebRTC server isConnected:: " +sdk.isConnected());
	}
}

function stopPlayUserCapture(){
	if(sdk.playUser){
		sdk.playUser.stopPlay();
	}
	$("#playUserCapturebtn").show();
	$("#stopPlayUserCapture").hide();
}


function  playUserCapture(){
	
	
	if(sdk.sie.userStatus == 1)
	{
		var opt = {
	        strDomainCode: $("#domaincode").val(),
	        "listUser": []
	    };
	    sdk.queryUserListReq(opt,function(res) {
	        sdk.log(" =====  ---- " + JSON.stringify(res));
	        setLog(JSON.stringify(res));
	        var tt = false;
	        $.each(res.listUser,function(i,n){
	        	if(n.strUserID == $("#playLoginName").val())
	        	{
	        		tt = true;
	        		var opt = {strUserTokenID: n.strUserTokenID,domainCode:$("#domaincode").val()};
			        sdk.getMobileDynamicUrlReq(opt, function(json) {
				        //console.log(" ======================= " ,json);
			        	if(json.nResultCode === 0)
			        	{
			        		$("#playcapturePanel").show();
			        		if(sdk.playUser){
			        			sdk.playUser.stopPlay();
			        		}
							 var pla = {
						        layout: 1,
						        pnode: "playcapturePanel",
						        log: true
						    };
						    var playmainPlay = sdk.getPlayer(pla);
						    sdk.playUser = playmainPlay;
			        		if(json && json.dynamicUrl){
			        			$("#playUserCapturebtn").hide();
								$("#stopPlayUserCapture").show();
								sdk.playRtc({
									videoNode: playmainPlay.players[0],
									playUrl:json.dynamicUrl,
									videoParam:{palyParam:{title:$("#playLoginName").val(),user:{"userCode":  $("#playLoginName").val()}},videoControl:{curresFlag:true,bitrateFlag:true,setOtherVideo:true,setOtherAudio:true,definitionFlag: true}}
								});
							}else{
								bootbox.alert("获取url失败 " +JSON.stringify(json));
							}
			        	}else
			        	{
			        		bootbox.alert("查询用户视频流地址失败！<br/><red>【" + sdk.getErrorDesc(json.nResultCode)+"】</red>");
			        	}
				        setLog(JSON.stringify(json));
				    });
			    }
	        });
	        
	        if(tt === false)
	        {
	        	bootbox.alert($("#userLoginName").val() + "用户未注册！");
	        }
	    });
	    
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
	
}
function cleanLog()
{
	$("#logs").empty();
}
function setLog(msg)
{
	 $("#logs").append($("<div style='text-indent:2em;'/>").html(msg));
	 var div =  document.getElementById("logs");
	 div.scrollTop = 99999;
}

function getUInfo() {
	
	if(sdk.sie.userStatus == 1)
	{
	    var opt = {
	        strDomainCode: sdk.sie.strUserDomainCode,
	        "listUser": []
	    };
	    sdk.queryUserListReq(opt,
	    function(res) {
	        sdk.log(" =====  ---- " + JSON.stringify(res));
	       // setLog(JSON.stringify(res));
	       var tab = $("#uInfoTable").addClass("table1").empty();
	        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("账号")).append($("<th/>").html("用户名称")).append($("<th/>").html("状态")).append($("<th/>").html("用户tokenId"))));
	        $.each(res.listUser,function(i,n){
	           tab.append($("<tr/>").append($("<td/>").html(n.strUserID)).append($("<td/>").html(n.strUserName)).append($("<td/>").html(userStatus[n.nState])).append($("<td/>").html(n.strUserTokenID)))
	        });
	        bootbox.alert("查询成功！");
	    });
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
	
}
function getUURl()
{
	if(sdk.sie.userStatus == 1)
	{
		var opt = {
	        strDomainCode: sdk.sie.strUserDomainCode,
	        "listUser": []
	    };
	    sdk.queryUserListReq(opt,
	    function(res) {
	        sdk.log(" =====  ---- " + JSON.stringify(res));
	        //setLog(JSON.stringify(res));
	        var tt = false;
	        $.each(res.listUser,function(i,n){
	        	if(n.strUserID == $("#userLoginName").val())
	        	{
	        		tt = true;
	        		var opt1 = {strUserTokenID: n.strUserTokenID,"domainCode":sdk.sie.strUserDomainCode};
				    sdk.log(" ======================= " ,opt1);
			        sdk.getMobileDynamicUrlReq(opt1, function(json) {
			        	if(json.nResultCode === 0)
			        	{
			        		$("#getUURResp").empty().append($("<div/>").html(json.dynamicUrl));
			        	}else
			        	{
			        		bootbox.alert("查询用户视频流地址失败！<br/><red>【" + sdk.getErrorDesc(json.nResultCode)+"】</red>");
			        	}
				        setLog(JSON.stringify(json));
				    });
			    }
	        });
	        
	        if(tt === false)
	        {
	        	bootbox.alert($("#userLoginName").val() + "用户未注册！");
	        }
	    });
	    
		
	    
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
}


function playUrl() {
	if(sdk.sie.userStatus == 1){
		if(sdk.socketMainPlay){
			sdk.socketMainPlay.stopPlay();
		}
		$("#playUrlPanel").show();
	    var pla = {
	        layout: 1,
	        pnode: "playUrlPanel",
	        log: true
	    };
	    var playmainPlay = sdk.getPlayer(pla);
	    sdk.socketMainPlay = playmainPlay;
	    
	    var pla = {
		        wsserver:$("#websocketPlatUrl").val(),
		        rtspurl: $("#playUrlcont").val(),
		        hyVideo:playmainPlay.players[0],
		        log: true
		    };
		 playmainPlay.playByVideo(pla);
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}

function playRtcUrl() {
	if(sdk.sie.userStatus == 1){
		if(sdk.rtcMainPlay){
			sdk.rtcMainPlay.stopPlay();
		}
		$("#playRtcPanel").show();
	    var pla = {
	        layout: 1,
	        pnode: "playRtcPanel",
	        log: true
	    };
	    var playmainPlay = sdk.getPlayer(pla);
	    sdk.rtcMainPlay = playmainPlay;
	    //playmainPlay.players[0]
	    
	    var map =  sdk.playRtc({
			videoNode: playmainPlay.players[0],
			playUrl:$("#playRtccont").val(),
			videoParam:{palyParam:{title:"播放"},videoControl:{curresFlag:true,bitrateFlag:true}}
		});
	    
	    
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}

function queryUsb(){
	sdk.getUsbList({
        callback: function(list) {
            if (list) {
        	 var tab = $("#usb-table").empty();
        	  tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("名称")).append($("<th/>").html("类型")).append($("<th/>").html("设备id"))));
                $.each(list,function(i, n) {
                	if(n.kind == "videoinput" || n.kind == "audioinput")
		           tab.append($("<tr/>").append($("<td/>").html(n.label)).append($("<td/>").html(n.kind)).append($("<td/>").html(n.deviceId)))
                });
                  bootbox.alert("查询成功！");
            }
        }
    });
}

function setUserIpc(){
	if(sdk.sie.userStatus == 1){
		sdk.setUserUseIPC(JSON.parse($("#ipcParam").val()), function(res){
			bootbox.alert(JSON.stringify(res));
		});
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}

function initDevices(devices) {
	devices.forEach(function(device) {
		var label = device.label;
		if(!label || label === "")
			label = device.deviceId;
		var option = $('<option value="' + device.deviceId + '">' + label + '</option>');
		if(device.kind === 'audioinput') {
			$('#audio-device').append(option);
		} else if(device.kind === 'videoinput') {
			$('#video-device').append(option);
		} else if(device.kind === 'audiooutput') {
			// Apparently only available from Chrome 49 on?
			// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/setSinkId
			// Definitely missing in Safari at the moment: https://bugs.webkit.org/show_bug.cgi?id=179415
			$('#output-devices').removeClass('hide');
			$('#audiooutput').append('<li><a href="#" id="' + device.deviceId + '">' + label + '</a></li>');
			$('#audiooutput a').unbind('click')
				.click(function() {
					var deviceId = $(this).attr("id");
					var label = $(this).text();
					Janus.log("Trying to set device " + deviceId + " (" + label + ") as sink for the output");
					if($('#peervideo').length === 0) {
						Janus.error("No remote video element available");
						bootbox.alert("No remote video element available");
						return false;
					}
					if(!$('#peervideo').get(0).setSinkId) {
						Janus.error("SetSinkId not supported");
						bootbox.warn("SetSinkId not supported");
						return false;
					}
					$('#peervideo').get(0).setSinkId(deviceId)
						.then(function() {
							Janus.log('Audio output device attached:', deviceId);
							$('#outputdeviceset').html(label + '<span class="caret"></span>').parent().removeClass('open');
						}).catch(function(error) {
							Janus.error(error);
							bootbox.alert(error);
						});
					return false;
				});
		}
	});

	$('#audio-device').val(audio);
	$('#video-device').val(video);

	$('#change-devices').click(function() {
		// A different device has been selected: hangup the session, and set it up again
		$('#audio-device, #video-device').attr('disabled', true);
		$('#change-devices').attr('disabled', true);
		if(firstTime) {
			firstTime = false;
			restartCapture();
			return;
		}
		restartCapture();
	});
}

function initSelectPanel(){
	var dialog = bootbox.dialog({
	    title: '选择邀请人员',
	    message: "<div id='selectPanel'></div>",
	    size: 'large',
	    buttons: {
	        cancel: {
	            label: "取消",
	            className: 'btn-danger',
	            callback: function(){
	            }
	        }
	    }
	});
	
	var tab = '<div class="col-sm-12">'
			+'<div class="tabbable">'
			+'<ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">'
			+'<li class="active">'
			+'<a data-toggle="tab" href="#home4">用户</a>'
			+'</li>'
			+'<li>'
			+'<a data-toggle="tab" href="#profile4">设备</a>'
			+'</li>'		
			+'</ul>'
			+'<div class="tab-content">'
			+'<div id="home4" class="tab-pane in active"><table id="userLis" class="table table1"></table>'			
			+'</div>'
			+'<div id="profile4" class="tab-pane"> <table id="devLis" class="table table1"></table>'
			+'</div>'			
			+'</div>'
			+'</div>'
			+'</div>';
	var root = $("#selectPanel").css({"height": "400px", "overflow-y":"auto"}).append(tab);
	
	  var opt = {
	        strDomainCode: sdk.sie.strUserDomainCode,
	        "listUser": []
	    };
	    sdk.queryUserListReq(opt,
	    function(res) {
	       var tab = $("#userLis").css({width: "100%!important"}).empty();
	        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("名称")).append($("<th/>").html("账号")).append($("<th/>").html("状态")).append($("<th/>").html("用户tokenId")).append($("<th/>").html("操作"))));
	        $.each(res.listUser,function(i,n){
	        	var key = sdk.sie.strUserDomainCode+"_"+ n.strUserID
        		if(!sdk.callMt.userInfo[key]){
        			var userTr = $("<tr/>").append($("<td/>").html(n.strUserID)).append($("<td/>").html(n.strUserName)).append($("<td/>").html(n.nState)).append($("<td/>").html(n.strUserTokenID)).append($("<td/>").append($("<a/>").html("邀请").bind("click", function(){
        				userTr.remove();
        				var user = {
        						"strUserDomainCode": sdk.sie.strUserDomainCode,
        						"strUserID": n.strUserID,
        						"strUserName": n.strUserName,
        						"nDevType":1
        				};
        				sdk.callMt.inviteNewUser(user);
        				//sdk.callMt.inviteUserAction(user);
        				
        			})));
        			
        			tab.append(userTr);
           		}
	        });
	    });
	    
	    getDevicetableList();
}


function getDevicetableList(){
	var tab = $("#devLis").css({width: "100%!important"}).empty();
    tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("域")).append($("<th/>").html("设备")).append($("<th/>").html("通道")).append($("<th/>").html("码流")).append($("<th/>").html("操作"))));
	sdk.getDomainReq(function(msg){
		  if(msg.nResultCode === 0)
		  {
			 $.each(msg.domainInfoList,function(i,n){
			 	var op = {						
							domainCode:n.strDomainCode,
							nPage:1,
							nSize:100
					};
					sdk.getDeviceByDomainReq(op,function(res){
						if(res.nResultCode === 0)
						{
							$.each(res.deviceList,function(idx,ele){
								$.each(ele.channelList,function(idx1,ele1){
									$.each(ele1.streamList,function(idx2,ele2){
										var key = n.strDomainCode+"_"+n.strDomainCode+"-"+ele.strDeviceCode+"-"+ele1.strChannelCode+"-"+ele2.strStreamCode;
										if(!sdk.callMt.userInfo[key]){
											var devTr = $("<tr/>").append($("<td/>").html(n.strDomainName)).append($("<td/>").html(ele.strDeviceName)).append($("<td/>").html(ele1.strChannelName)).append($("<td/>").html(ele2.strStreamName)).append($("<td/>").append($("<a/>").html("邀请").bind("click", function(){
												devTr.remove();
												var user = {
														"strUserDomainCode": n.strDomainCode,
														"strUserID": n.strDomainCode+"-"+ele.strDeviceCode+"-"+ele1.strChannelCode+"-"+ele2.strStreamCode,
														"strUserName": ele2.strStreamName,
														"nDevType":2
												};
												sdk.callMt.inviteNewUser(user);
												//sdk.callMt.inviteUserAction(user);
											})));
											tab.append(devTr);
										}
									});
								});
							});
						}
					});
			 });
		  }
	 });
}
function unlockSie()
{
	setTimeout(function(){
		 window.open($("#url").val().replaceAll("wss","https"));
	},100);
	setTimeout(function(){
		 window.open($("#websocketPlatUrl").val().replaceAll("wss","https"));
	},100);
	setTimeout(function(){
		 window.open($("#webRtcUrl").val().replaceAll("wss","https"));
	},100);
	
}
function getMeetingInfo()
{
	
	if(sdk.sie.userStatus == 1)
	{
	    var opt = {
		    strDomainCode:sdk.sie.strUserDomainCode,
			startTime: $("#recordStartTime").val(),
			endTime: $("#recordEndTime").val(),
			nStatus: $("#meetingStatus").val()*1 ,
			keywords:""
		};
		sdk.getMeetingListReq(opt,function(res){
		   //console.error(res);
	        setLog(JSON.stringify(res));
	        var tab = $("#meetingInfoTable").empty();
	        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("名称")).append($("<th/>").html("开始时间")).append($("<th/>").html("编号")).append($("<th/>").html("发起人")).append($("<th/>").html("状态")).append($("<th/>").html("操作"))));
	        $.each(res.lstMeetingInfo,function(i,n){
	        	var trRow = $("<tr/>").append($("<td/>").html(n.strMeetingName)).append($("<td/>").html(n.strStartTime)).append($("<td/>").html(n.nMeetingID)).append($("<td/>").html(n.strMainUserName)).append($("<td/>").html(meetingStauts[n.nStatus])).append($("<td/>").append(function(){
	        		var join = $("<a/>").html("加入").bind("click",function(){
		                var ab = {
								strDomainCode:res.strDomainCode,
								nMeetingID: n.nMeetingID
							};
							sdk.getMeetingInfoReq(ab,function(res1){
								var f = false;
									if(res1.nStatus==1 ){//正常开始
										var opp = {
												nMeetingID:n.nMeetingID,
												strMeetingDomainCode:res.strDomainCode,
												strMeetingName:n.strMeetingName,
												"strMeetingDesc": "会议测试",
												"strInviteUserId": res1.strMainUserID,
												"strInviteUserName": res1.strMainUserName,
												defaultJoin: true,
												nMeetingStatus: 1
										};
										sdk.notifyInviteUserJoinMeeting(opp);
									}else if(n.nStatus== 4 ){
										bootbox.alert("会议还未开始！");
									}
							});
			           })
			           if(n.nStatus == 2){
							join = ''
						}
					return join
	        	}).append(function(){
		        	   var del = $("<a class='a-btn'/>").html("删除").bind("click",function(){
				           	var oo = {
				           	        strDomainCode:res.strDomainCode,
									nMeetingID: n.nMeetingID
				           	};
			           	 	sdk.delMeetingInfoReq(oo,function(resp){
			           	 		if(resp.nResultCode == 0){
			           	 			trRow.remove();
			           	 			bootbox.alert("会议删除成功！");
			           	 		}else{
			           	 			bootbox.alert("会议删除失败！");
			           	 		}
			           	 	});
			           });
		        	   if(n.nStatus==1){
		        		   del='';
		        	   }
			           return del;
		           }).append($("<a class='a-btn'/>").html("观看录像").bind("click",function(){
		           	 	var ab = {
							strDomainCode:res.strDomainCode,
							nMeetingID: n.nMeetingID
						};
						sdk.getMeetingInfoReq(ab,function(res1){
							var f = false;
							if(res1  && res1.nRecordID > 0)
							   {
							   	f = true;
							   }
							if(f === true)
							{
								sdk.playbackCTSReq({
									strDomainCode:  res1.strDomainCode,
									unRecordId: res1.nRecordID
								}, function(res){
									sdk.log("playbackCTSReq::"+JSON.stringify(res));
									if(res.nResultCode == 0){
										if(res.playbackUrlInfo && res.playbackUrlInfo.strPlaybackUrl){
											if(!sdk.recordPlay){
											$("#recordPlayer").show();
												 var pla = {
											        layout: 1,
											        pnode: "recordPlayer",
											        log: true
											    };
											    sdk.recordPlay = sdk.getPlayer(pla);
											}
											
											if(sdk.recordPlay){
												sdk.recordPlay.stopPlay();
											}
										    //playmainPlay.players[0]
										    
										    /*var map =  sdk.playRtc({
												videoNode: sdk.recordPlay.players[0],
												playUrl:res.playbackUrlInfo.strPlaybackUrl,
												videoParam:{palyParam:{title:res1.strMeetingName},videoControl:{curresFlag:true,bitrateFlag:true}}
											});*/
											//socket模式播放
											var pla = {
											        wsserver:$("#websocketPlatUrl").val(),
											        rtspurl: res.playbackUrlInfo.strPlaybackUrl,
											        hyVideo:sdk.recordPlay.players[0],
											        videoParam:{palyParam:{title:res1.strMeetingName}},
											        log: true
											    };
											 sdk.recordPlay .playByVideo(pla);
										}
																	
									}else{
										bootbox.alert("录像查询失败！");
									}
									
								});
							}else
							{
								bootbox.alert("当前会议没有录像观看！");
							}
						});
		           	
		           })));
	           tab.append(trRow);
	        });
	        bootbox.alert("查询成功！");
		});
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
}
function setMeeting()
{
	if(sdk.sie.userStatus == 1)
	{
	    var opt = {
	        startTime: $("#meetingStartTime").val(),
	        "duration": $("#nMeetingDuration").val()*1000*60
	    };
	    opt = $.extend(opt,JSON.parse($("#meetingparam").val()));
	    
	    var a = $.extend([], opt.lstMeetingUserInfo);
	    a.unshift({
	        "strUserDomainCode": sdk.sie.strUserDomainCode,
	        "strUserID": sdk.opts.loginName,
	        "strUserName": sdk.opts.userName,
	        "nDevType": 1
	    });
	    opt.strTrunkPara = {
	        lstMeetingUserInfo: a
	    }
	    
	    sdk.setPredetermineMeetingReq(opt,function(res) {
	        sdk.log(" =====  ---- " + JSON.stringify(res));
	        setLog(JSON.stringify(res));
	        if(res.nResultCode == 0){
	        	bootbox.alert("创建成功！");
	        }else{
	        	bootbox.alert("创建失败！");
	        }
	       
	    });
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
}
function showLog()
{
	$("#logs").toggle();
}

function createTalk() {
	if(sdk.sie.userStatus == 1){
		
	    var talkOption =JSON.parse($("#talkparam").val());
	    var talk = sdk.callTalk({	        
	        "pnode": 'talkPlayer',
	        "userPanel":'talkUser',
	        talkInfo: talkOption,
	        talkRole: 1
	    });
	    talk.playPanel = $("#talkPlayer").show();
	    talk.createTalkBtn = $("#createTalkBtn");
	    talk.quitTalkBtn = $("#quitTalkBtn");
      	talk.startRecordBtn = $("#talkstartRecordBtn");
	    talk.stopRecordBtn = $("#talkstopRecordBtn");
	    talk.quitTalkAction = function(){
	    	talk.createTalkBtn.show();
	    	talk.quitTalkBtn.hide();
	    	talk.playPanel.hide();
	    	$('#'+talk.opt.userPanel).hide();
		}
		talk.start(function(res, backTalk){
			if(res.code == 0){
				$('#'+talk.opt.userPanel).show();
				talk.quitTalkBtn.show();
				talk.startRecordBtn.show();
				talk.createTalkBtn.hide();
				talk.quitTalkBtn.show().bind("click", function(){
					talk.quitReq();
		    	});
		    	
		    	talk.startRecordBtn.bind("click", function(){
		    		
		    	});
		    	
		    	talk.stopRecordBtn.bind("click", function(){
		    		
		    	});
			}else{
				talk.playPanel.hide();
				bootbox.alert(res.desc);
			}
	    });
	}else{
		bootbox.alert("账号未登录，请先登录！");
		setLog("账号未登录！");
	}
}


function selectchange(){
	if($("#selectbtn").val() == "usb"){
		$("#videoParam").empty();
		$("#audioParam").empty();
		$("#ipcdiv").hide();
	    $("#usbdiv").show();
	  /*  var s = document.getElementById('ipcdiv');
	    document.getElementById('usbdiv').appendChild(s);*/
	    var selecVideo,selectAudio;
	    var device = sdk.getUserUseIPC();
	    if(device  && device.usb){
	    	var selectUsbp = device.usb
	    	if(selectUsbp.video ){
	    		if(selectUsbp.video.deviceId){
		    		selecVideo = selectUsbp.video.deviceId.exact;
	    		}
	    		if(selectUsbp.video.width){
	    			$("#curresParam").find("option[value='"+selectUsbp.video.width*1+"x"+selectUsbp.video.height*1+"']").attr("selected","selected");
	    		}
	    	}
	    	
	    	if(selectUsbp.audio && selectUsbp.audio.deviceId){
	    		selectAudio = selectUsbp.audio.deviceId.exact
	    	}
	    	
	    	if(selectUsbp.bitrate||selectUsbp.bitrate==0){
	    		$("#bitParam").find("option[value='"+selectUsbp.bitrate+"']").attr("selected","selected");
	    	}
	    }
		sdk.getUsbList({
	        callback: function(list) {
	            if (list) {
	        	 	 $.each(list, function(i,info){
					  	var opt = $("<option/>");
					  	opt.attr("value",info.deviceId).html(info.label);
					  	 if(info.kind == "videoinput"){
					  	 	if(selecVideo&&selecVideo == info.deviceId){
					  	 		opt.attr("selected", "selected");
					  	 	}
					  		$("#videoParam").append(opt);
	        	 	 	 }else if( info.kind == "audioinput"){
	        	 	 	 	if(selectAudio&&selectAudio == info.deviceId){
					  	 		opt.attr("selected", "selected");
					  	 	}
	        	 	 		$("#audioParam").append(opt);
	        	 	 	 }
				  	});
	            }
	        }
	    });
	    
	}else{
		$("#ipcdiv").show();
	    $("#usbdiv").hide();
	}
	
}


function saveUsbSetting(){
	var cl = $("#curresParam").val().split("x")
	var usb = {
		"video": {"deviceId": {
			"exact": $("#videoParam").val()
			},
			width: cl[0],
			height: cl[1] 
		},
		"audio": {"deviceId": {
			"exact": $("#audioParam").val()	}
		},
		bitrate:$("#bitParam").val()
	}
  sdk.setUserUsb(usb);
}

function setSizeScreen(){
	sdk.mainPlay.setSizeScreenLayout({
		mainVideo: activeHyVideo,
		showNum: Math.floor(sdk.mainPlay.players.length/2)
	});
}

function backToOrg(){
	sdk.mainPlay.restoreLayout();
}

function getDevRecord(){
	sdk.getRecordUrlListCTSReq(JSON.parse($("#getrecordparam").val()), function(res){
		var tab = $("#devRecordTable").empty();
        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("录像id")).append($("<th/>").html("录像url")).append($("<th/>").html("操作"))));
		if(res.nResultCode == 0){
			bootbox.alert("查询成功");
			$.each(res.recordUrlInfo.playbackUrlInfoList,function(i,n){
	           tab.append(
	           	$("<tr/>").append(
	           		$("<td/>").html(n.nRecordID)
	           	).append(
	           		$("<td/>").html(n.strPlaybackUrl)
	           	).append($("<td/>").append($("<a/>").html("播放").bind("click",function(){
	           			if(!sdk.devRecordPlay){
							$("#devRecordPlayer").show();
								 var pla = {
							        layout: 1,
							        pnode: "devRecordPlayer",
							        log: true
							    };
						    sdk.devRecordPlay = sdk.getPlayer(pla);
						}
						if(sdk.devRecordPlay){
							sdk.devRecordPlay.stopPlay();
						}
						
						var pla = {
						        wsserver:$("#websocketPlatUrl").val(),
						        rtspurl: n.strPlaybackUrl,
						        hyVideo:sdk.devRecordPlay.players[0],
						        videoParam:{palyParam:{title:"录像"+n.nRecordID+"回放"}},
						        log: true
						    };
					 	sdk.devRecordPlay.playByVideo(pla);
	           }))))
	        });
		}else{
			bootbox.alert("查询失败：：："+JSON.stringify(res));
		}
	});
}


//获取对讲列表
function getTalkList(){
	if(sdk.sie.userStatus == 1)
	{
	    var opt = {
		    strDomainCode:sdk.sie.strUserDomainCode,
			strQueryStartTime: $("#strQueryStartTime").val(),
			strQueryEndTime: $("#strQueryEndTime").val(),
			nStatus: $("#talkStatus").val() 
		};
		sdk.getTalkbackListReq(opt,function(res){
		   //console.error(res);
	        setLog(JSON.stringify(res));
	        var tab = $("#talkInfoTable").empty();
	        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("名称")).append($("<th/>").html("开始时间")).append($("<th/>").html("对讲ID")).append($("<th/>").html("对讲时长")).append($("<th/>").html("状态")).append($("<th/>").html("操作"))));
	        $.each(res.lstMeetingInfo,function(i,n){
	        	var trRow = $("<tr/>").append($("<td/>").html(n.strTalkbackName)).append($("<td/>").html(n.strStartTime)).append($("<td/>").html(n.nTalkbackID)).append($("<td/>").html(n.nTimeDuration)).append($("<td/>").html(meetingStauts[n.nStatus])).append($("<td/>").append(function(){
		        	   var del = $("<a class='a-btn'/>").html("删除").bind("click",function(){
				           	var oo = {
				           	        strDomainCode:res.strDomainCode,
									nMeetingID: n.nMeetingID
				           	};
			           	 	sdk.delMeetingInfoReq(oo,function(resp){
			           	 		if(resp.nResultCode == 0){
			           	 			trRow.remove();
			           	 			bootbox.alert("会议删除成功！");
			           	 		}else{
			           	 			bootbox.alert("会议删除失败！");
			           	 		}
			           	 	});
			           });
		        	   if(n.nStatus==1){
		        		   del='';
		        	   }
			           return del;
		           }).append($("<a class='a-btn'/>").html("观看录像").bind("click",function(){
		           	 	var ab = {
							strDomainCode:res.strDomainCode,
							nMeetingID: n.nMeetingID
						};
						sdk.getMeetingInfoReq(ab,function(res1){
							var f = false;
							if(res1  && res1.nRecordID > 0)
							   {
							   	f = true;
							   }
							if(f === true)
							{
								sdk.playbackCTSReq({
									strDomainCode:  res1.strDomainCode,
									unRecordId: res1.nRecordID
								}, function(res){
									sdk.log("playbackCTSReq::"+JSON.stringify(res));
									if(res.nResultCode == 0){
										if(res.playbackUrlInfo && res.playbackUrlInfo.strPlaybackUrl){
											if(!sdk.recordPlay){
											$("#recordPlayer").show();
												 var pla = {
											        layout: 1,
											        pnode: "recordPlayer",
											        log: true
											    };
											    sdk.recordPlay = sdk.getPlayer(pla);
											}
											
											if(sdk.recordPlay){
												sdk.recordPlay.stopPlay();
											}
										    //playmainPlay.players[0]
										    
										    /*var map =  sdk.playRtc({
												videoNode: sdk.recordPlay.players[0],
												playUrl:res.playbackUrlInfo.strPlaybackUrl,
												videoParam:{palyParam:{title:res1.strMeetingName},videoControl:{curresFlag:true,bitrateFlag:true}}
											});*/
											//socket模式播放
											var pla = {
											        wsserver:$("#websocketPlatUrl").val(),
											        rtspurl: res.playbackUrlInfo.strPlaybackUrl,
											        hyVideo:sdk.recordPlay.players[0],
											        videoParam:{palyParam:{title:res1.strMeetingName}},
											        log: true
											    };
											 sdk.recordPlay .playByVideo(pla);
										}
																	
									}else{
										bootbox.alert("录像查询失败！");
									}
									
								});
							}else
							{
								bootbox.alert("当前会议没有录像观看！");
							}
						});
		           	
		           })));
	           tab.append(trRow);
	        });
	        bootbox.alert("查询成功！");
		});
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}

}

function getTalkrecordList(){
	
	if(sdk.sie.userStatus == 1)
	{
		var da = JSON.parse($("#talkrecordparam").val());
	   if(!da.nTalkbackID){
	   	bootbox.alert("输入需要查询的对讲id");
	   	return;
	   }
		sdk.getTalkbackRecordInfoReq(da,function(res){
		   //console.error(res);
	        setLog(JSON.stringify(res));
	        var tab = $("#talkrecordTable").empty();
	        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("名称")).append($("<th/>").html("录像id")).append($("<th/>").html("开始时间")).append($("<th/>").html("录像持续时间")).append($("<th/>").html("操作"))));
	        $.each(res.listRecordInfo,function(i,n){
	        	var trRow = $("<tr/>").append($("<td/>").html(res.strTalkbackName)).append($("<td/>").html(n.nRecordID)).append($("<td/>").html(n.strRecordStartTime)).append($("<td/>").html(n.nTimeDuration)).append($("<td/>").append($("<a class='a-btn'/>").html("观看录像").bind("click",function(){
		           	 	sdk.playbackCTSReq({
									strDomainCode:  res.strDomainCode,
									unRecordId: n.nRecordID
								}, function(res){
									sdk.log("playbackCTSReq::"+JSON.stringify(res));
									if(res.nResultCode == 0){
										if(res.playbackUrlInfo && res.playbackUrlInfo.strPlaybackUrl){
											if(!sdk.recordPlay){
											$("#talkrecordPlayer").show();
												 var pla = {
											        layout: 1,
											        pnode: "talkrecordPlayer",
											        log: true
											    };
											    sdk.talkrecordPlayer = sdk.getPlayer(pla);
											}
											
											if(sdk.talkrecordPlayer){
												sdk.talkrecordPlayer.stopPlay();
											}
											var pla = {
											        wsserver:$("#websocketPlatUrl").val(),
											        rtspurl: res.playbackUrlInfo.strPlaybackUrl,
											        hyVideo:sdk.recordPlay.players[0],
											        videoParam:{palyParam:{title:res1.strMeetingName}},
											        log: true
											    };
											 sdk.recordPlay .playByVideo(pla);
										}
																	
									}else{
										bootbox.alert("录像查询失败！");
									}
									
								});
		           	
		           })));
	           tab.append(trRow);
	        });
	        bootbox.alert("查询成功！");
		});
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}


}

function delRecord(){
	if(sdk.sie.userStatus == 1)
	{
		var data = JSON.parse($("#delTalpParam").val());
		if(!data.nTalkbackID){
			bootbox.alert("输入需要删除的对讲id！");
			return;
		}
		sdk.delTalkbackInfoReq(data, function(res){
			if(res.nResultCode == 0){
				bootbox.alert("删除成功！");
			}else{
				bootbox.alert("删除失败："+JSON.stringify(res));
			}
		});
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}

}

function createTrunkChannel(){
	if(sdk.sie.userStatus == 1)
	{
		
		
	    var tChannelOption =JSON.parse($("#createTrunkparam").val());
	    var tChannel = sdk.callTChannel({	        
	        "pnode": 'tchannelPlayer',
	        "userPanel": 'tchannelUser',
	        tChannelInfo: tChannelOption
	    });


	 $("#tchannelPlayer").empty();
	    $("#tchannelUser").empty();
	    tChannel.createBtn = $("#createTrunkBtn");
		tChannel.inviteBtn = $("#tcinviteBtn");
		tChannel.quitBtn = $("#tcquitBtn");
		tChannel.playPanel = $("#tchannelPlayer");
		tChannel.delChannelBtn = $("#delChannel");
		tChannel.startSpeak = $("#startSpeak");
		tChannel.stopSpeak = $("#stopSpeak");
		tChannel.startVRecord = $("#startVRecord");
		tChannel.stopVRecord = $("#stopVRecord");
	
	    tChannel.quitTChannelAction = function(){
	    	tChannel.createBtn.show();
			tChannel.inviteBtn.hide();
			tChannel.quitBtn.hide();
			tChannel.playPanel.hide();
			tChannel.delChannelBtn.hide();
			tChannel.startSpeak.hide();
			tChannel.stopSpeak.hide();
			tChannel.startVRecord.hide();
		    tChannel.stopVRecord.hide();
			$("#tchannelUser").empty().hide();
	    }
	    tChannel.start(function(resss){
	    	if(resss.nResultCode !=0){
	    		bootbox.alert("创建失败:::"+JSON.stringify(resss));
	    		return ;
	    	}
	    	$("#tchannelPlayer").hide();
	    	$("#tchannelUser").height(500).css({"overflow-y":"auto"}).show();
	    	tChannel.createBtn.hide();
	    	tChannel.quitBtn.show();
	    	
		    enterChannelAction(tChannel);
	    	
	    });

	    
	    
	
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
}


function getTrunkList(){
	
	if(sdk.sie.userStatus == 1)
	{
	    var opt = {
		    strTrunkChannelDomainCode:sdk.sie.strUserDomainCode,
			strBeginCreateTime: $("#strBeginCreateTime").val(),
			strEndCreateTime: $("#strEndCreateTime").val()
			
		};
		if($("#strTrunkChannelKey").val()){
			opt.strTrunkChannelKey= $("#strTrunkChannelKey").val();
		}
		
		if($("#nTrunkChannelType").val()){
			opt.nTrunkChannelType= $("#nTrunkChannelType").val()*1;
		}
	        var tab = $("#trunkInfoTable").empty();
	        tab.append(
	        	$("<thead/>").append(
					$("<tr/>").append(
						$("<th/>").html("名称")
					).append(
						$("<th/>").html("频道ID")
					).append(
						$("<th/>").html("创建时间")
					).append(
						$("<th/>").html("状态")
					).append(
						$("<th/>").html("操作")
					)
				)
			);
		sdk.queryTrunkChannelListReq(opt,function(res){
		   //console.error(res);
	        setLog(JSON.stringify(res));
	       
	        $.each(res.lstTrunkChannelInfo,function(i,n){
	        	var trunName = $("<td/>").html(n.strTrunkChannelName);
	        	var trRow = $("<tr/>").append(trunName).append($("<td/>").html(n.nTrunkChannelID)).append($("<td/>").html(n.strCreateTime)).append($("<td/>").html(trunkStauts[n.nTrunkChannelType])).append($("<td/>").append(function(){
		        	   var del = $("<a class='a-btn'/>").html("删除").bind("click",function(){
				           	var oo = {
				           	        strTrunkChannelDomainCode:n.strTrunkChannelDomainCode,
									nTrunkChannelID: n.nTrunkChannelID
				           	};
			           	 	sdk.deleteTrunkChannelReq(oo,function(resp){
			           	 		if(resp.nResultCode == 0){
			           	 			trRow.remove();
			           	 			bootbox.alert("删除成功！");
			           	 		}else{
			           	 			bootbox.alert("删除失败！");
			           	 		}
			           	 	});
			           });
		        	 
			           return del;
		           }).append($("<a class='a-btn'/>").html("修改").bind("click",function(){
		           	
		           	 	var ab = {
			           	        strTrunkChannelDomainCode:n.strTrunkChannelDomainCode,
								nTrunkChannelID: n.nTrunkChannelID
				           	};
				           sdk.getTrunkChannelInfoReq(ab,function(resss){
				           		if(resss.nResultCode == 0){
				           			modifyInfo(resss, trunName);
				           		}
				           });
						
		           })).append($("<a class='a-btn'/>").html("详情").bind("click",function(){
		           	 	var ab = {
			           	        strTrunkChannelDomainCode:n.strTrunkChannelDomainCode,
								nTrunkChannelID: n.nTrunkChannelID
				           	};
				           sdk.getTrunkChannelInfoReq(ab,function(resss){
				           		if(resss.nResultCode == 0){
				           			showTrunkInfo(resss);
				           		}
				           });	
						
		           })).append($("<a class='a-btn'/>").html("监听").bind("click",function(){
		           	 	var ab = {
			           	        strTrunkChannelDomainCode:n.strTrunkChannelDomainCode,
								nTrunkChannelID: n.nTrunkChannelID,
								nEnable:1
				           	};
				           sdk.observerTrunkChannelReq(ab,function(resss){
				           		if(resss.nResultCode == 0){
				           			bootbox.alert("监听成功！");
				           		}
				           });	
						
		           })).append($("<a class='a-btn'/>").html("加入").bind("click",function(){
		           	 	var ab = {
			           	        strTrunkChannelDomainCode:n.strTrunkChannelDomainCode,
								nTrunkChannelID: n.nTrunkChannelID,
								strInviterDomainCode:"",
								strInviterUserID:"",
								strInviterName:"主动加入",
								strTrunkChannelName:n.strTrunkChannelName,
								nEnforce:1
				           	};
				        sdk.notifyUserInviteTrunkChanne(ab);
						
		           })));
	           tab.append(trRow);
	        });
	        bootbox.alert("查询成功！");
		});
	}else
	{
		bootbox.alert("账号未登录，请先登录！");
		$("#logs").append($("<div/>").html("账号未登录！"));
	}
}

function modifyInfo(info, trunName){
	var dialog = bootbox.dialog({
	    title: '修改频道信息',
	    message: "<div id='selectPanel'></div>",
	    size: 'big',
	    buttons: {
	        cancel: {
	            label: "取消",
	            className: 'btn-danger',
	            callback: function(){
	            }
	        },
	        "success" :
             {
                "label" : "<i class='icon-ok'></i> 确定",
                "className" : "btn-success",
                "callback": function() {
	        		var ab = {
		           	        strTrunkChannelDomainCode:info.strTrunkChannelDomainCode,
							nTrunkChannelID: info.nTrunkChannelID,
							nSpeakTimeout:$("#trunkspeakTime").val()*1,
							strTrunkChannelName: $("#strTrunkChannelName").val()
			           	};
                 	 sdk.modifyTrunkChannelReq(ab,function(res1){
                 	 	dialog.modal('hide');
                 	 	if(res1.nResultCode ==0 ){
                 	 		bootbox.alert("修改成功！");
                 	 		trunName.html($("#strTrunkChannelName").val());
                 	 	}else{
                 	 		bootbox.alert("修改失败："+JSON.stringify(res1));
                 	 	}
					});
		           	
                }
            }
	    }
	});
	
	var root = $("#selectPanel").css({"height": "100px", "overflow-y":"auto"});
	root.append(
		$("<div/>").append(
			$("<label/>").html("发言超时:")
		).append(
			$("<input/>").attr("id","trunkspeakTime").val(info.nSpeakTimeout)
		)
	).append(
		$("<div/>").append(
			$("<label/>").html("集群频道名:")
		).append(
			$("<input/>").attr("id","strTrunkChannelName").val(info.strTrunkChannelName)
		)
	)
	
}

function showTrunkInfo(info){
	
	var dialog = bootbox.dialog({
	    title: '修改频道信息',
	    message: "<div id='selectPanel'></div>",
	    size: 'big',
	    buttons: {
	        cancel: {
	            label: "取消",
	            className: 'btn-danger',
	            callback: function(){
	            }
	        }
	        
	    }
	});
	var root = $("#selectPanel").css({"height": "300px", "overflow-y":"auto"});
	var list= [
		{name:"域编码:",value: info.strTrunkChannelDomainCode},
		{name:"频道会话ID号:",value: info.nTrunkChannelID},
		{name:"频道类型:",value: trunkStauts[info.nTrunkChannelType]},
		{name:"创建时间:",value: info.strCreateTime},
		{name:"频道名:",value: info.strTrunkChannelName},
		{name:"频道状态:",value: info.nTrunkChannelStatus==0?"空闲": "抢占发言中"},
		{name:"发言超时:",value: info.nSpeakTimeout},
		{name:"是否录像:",value: info.nRecordStatus==0?"不录":"录"}
		];
	$.each(list, function(i, e){
		var row = $("<div/>").append(
			$("<span/>").css({"font-weight": "bold","margin-right": "10px"}).html(e.name)
		).append(
			$("<span/>").html(e.value)
		);
		root.append(row);
	});
	
}



function inittcinvitePanel(){
	var dialog = bootbox.dialog({
	    title: '选择邀请人员',
	    message: "<div id='selectPanel'></div>",
	    size: 'large',
	    buttons: {
	        cancel: {
	            label: "取消",
	            className: 'btn-danger',
	            callback: function(){
	            }
	        }
	    }
	});
	
	var tab = '<div class="col-sm-12">'
			+'<div class="tabbable">'
			+'<ul class="nav nav-tabs padding-12 tab-color-blue background-blue" id="myTab4">'
			+'<li class="active">'
			+'<a data-toggle="tab" href="#home4">用户</a>'
			+'</li>'
			+'</ul>'
			+'<div class="tab-content">'
			+'<div id="home4" class="tab-pane in active"><table id="userLis" class="table table1"></table>'			
			+'</div>'
			+'</div>'
			+'</div>'
			+'</div>';
	var root = $("#selectPanel").css({"height": "400px", "overflow-y":"auto"}).append(tab);
	
	  var opt = {
	        strDomainCode: sdk.sie.strUserDomainCode,
	        "listUser": []
	    };
	    sdk.queryUserListReq(opt,
	    function(res) {
	       var tab = $("#userLis").css({width: "100%!important"}).empty();
	        tab.append($("<thead/>").append($("<tr/>").append($("<th/>").html("名称")).append($("<th/>").html("账号")).append($("<th/>").html("状态")).append($("<th/>").html("用户tokenId")).append($("<th/>").html("操作"))));
	        $.each(res.listUser,function(i,n){
	        	var key = sdk.sie.strUserDomainCode+"_"+ n.strUserID
	        	var obj = sdk.nowTChannel;
        		if(!(obj && obj.userInfo[key])){
        			var userTr = $("<tr/>").append($("<td/>").html(n.strUserID)).append($("<td/>").html(n.strUserName)).append($("<td/>").html(n.nState)).append($("<td/>").html(n.strUserTokenID)).append($("<td/>").append($("<a/>").html("邀请").bind("click", function(){
        				userTr.remove();
        				var user = {
        					"strTcUserDomainCode" : sdk.sie.strUserDomainCode,
							"strTcUserID" : n.strUserID,
							"strTcUserName" : n.strUserName,
							"nPriority" : 0,
							"nEnforce" : 0
        				};
        				sdk.nowTChannel.inviteNewUser(user);
        				//sdk.callMt.inviteUserAction(user);
        				
        			})));
        			
        			tab.append(userTr);
           		}
	        });
	    });
	    
}
