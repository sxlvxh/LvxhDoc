var uid = uuid();
    try{
	    var sdk = new HY_SDK_WS();
	    
	    //接收透明通道消息
	    sdk.notifyMsg = function(body){
	    	alert(JSON.stringify(body));
	    }
	    
	    sdk.initUsbList({
	    	pnode: 'usb-device'
	    });
	    var cvanvas = sdk.getCanvas({
	    	canvasId:'canvas-content',
	    	width:300,
	    	height: 200,
	    	sdk:sdk
	    });
	    
	    cvanvas.initControlPanel();
	    
	    //sdk.init(getUserInfo());
		
    }catch(e){
	   window.console && window.console.error(e);
    }
	
	function lougout()
	{
	   sdk.destory();
	    $("#sdk-panel").hide();
	}
	
	function login()
	{
		var opt = JSON.parse($("#loginReq").val());
		opt.mac = uid;
	    opt.loginSuccess = function(msg){
	       $("#logs").append($("<div/>").html(JSON.stringify(msg)));
		   if(msg.nResultCode === 0)
			   {
			      $("#sdk-panel").show();
			   }
		   else
			   {
			    sdk.kickOut({strUserTokenID:msg.strUserTokenID});
			   }
	    }
	    sdk.init(opt);
	}
	function getDomain()
	{
	  
	   sdk.getDomainReq(function(msg){
	      console.log(" function getDomain() ",JSON.stringify(msg));
		  if(msg.nResultCode === 0)
		  {
		     var ul = $("#devicTree");
			 ul.empty();
			 $.each(msg.domainInfoList,function(i,n){
			    var li = $("<li/>");
				var ul1 = $("<ul/>");
				li.append($("<span/>").html(n.strDomainName)).append($("<button/>").html("获取设备").bind("click",function(){
					var op = {						
							domainCode:n.strDomainCode,
							nPage:1,
							nSize:100
					};
					sdk.getDeviceByDomainReq(op,function(res){
						if(res.nResultCode === 0)
						{
							ul1.empty();
							$.each(res.deviceList,function(idx,ele){
						        var li1 = $("<li/>");
								var ul2 = $("<ul/>");
								li1.append($("<span/>").html(ele.strDeviceName)).append($("<button/>").html("展开").bind("click",function(){
									ul2.empty();
									$.each(ele.channelList,function(idx1,ele1){
										var li3 = $("<li/>");
										var ul3 = $("<ul/>");
										li3.append($("<span/>").html(ele1.strChannelName)).append($("<button/>").html("展开").bind("click",function(){
											$.each(ele1.streamList,function(idx2,ele2){
												var li4 = $("<li/>");
												var ul4 = $("<ul/>");
												li4.append($("<span/>").html(ele2.strStreamName)).append($("<button/>").html("播放").bind("click",function(){
													       var oo = {
															    strDomainCode :ele.strDomainCode,
																strDeviceCode  :ele.strDeviceCode,
																strChannelCode :ele1.strChannelCode,
																strStreamCode  :ele2.strStreamCode
															};
													       $("#logs").append($("<div/>").html(JSON.stringify(oo)));
															sdk.getDeviceUrlReq(oo,function(urlRes){
															
															     if(urlRes.nResultCode === 0)
																 {											
															    	 var pla = {				
															 		        wsserver:"ws://192.168.2.160:5080",
															 				rtspurl:urlRes.strDynamicUrl,
															 				videoParam: {
															 					palyParam: oo
															 				},
															 		        log:true
															 		};
															 		console.log(sdk);
															 		sdk.mainPlay.play(pla);
															 		$("#logs").append($("<div/>").html(urlRes.strDynamicUrl));
															 		
																 }else
																 {
																    alert("getDeviceUrlReq:::"+urlRes.strResultDescribe);
																 }
															});
												})).append($("<button/>").html("设置为用户ipc").bind("click",function(res){
												    var oo = {
											    		 	strDomainCode :ele.strDomainCode,
															strDeviceCode  :ele.strDeviceCode,
															strChannelCode :ele1.strChannelCode,
															strStreamCode  :ele2.strStreamCode,
															nIsUse: 1
														};
												    	sdk.setUserUseIPC(oo);
													}));
												li4.append(ul4);
												ul3.append(li4);
											})
										}));
										li3.append(ul3);
										ul2.append(li3);
									})
								}));
								li1.append(ul2);
								ul1.append(li1);
						   
							})
						}
					});
				})).append($("<button/>").html("获取分组").bind("click",function(res){				    
					sdk.getDomainGroupReq(n.strDomainCode,function(domainGroupResp){
					    if(domainGroupResp.nResultCode === 0)
						{
					    	console.log(JSON.stringify(domainGroupResp));
						   $.each(domainGroupResp.sDomain.groupList,function(idx,ele){
						        var li1 = $("<li/>");
								var ul2 = $("<ul/>");
								li1.append($("<span/>").html(ele.groupName)).append($("<button/>").html("展开").bind("click",function(res){				    
									var op = {						
												domainCode:n.strDomainCode,
												groupCode:ele.groupCode,
												nPage:1,
												nSize:100
									};
									sdk.getDeviceReq(op,function(deviceRes){
										if(deviceRes.nResultCode === 0)
										{
										   $.each(deviceRes.lstChannel,function(idx1,ele1){
											    var li3 = $("<li/>");
												var ul3 = $("<ul/>");
												li3.append($("<span/>").html(ele1.deviceName));
												li3.append(ul3);
												ul2.append(li3);
												$.each(ele1.lstStream,function(idx2,ele2){
												    var li4 = $("<li/>");
													var ul4 = $("<ul/>");
													li4.append($("<span/>").html(ele2.streamName)).append($("<button/>").html("播放").bind("click",function(res){
													    var oo = {
														    strDomainCode :ele1.domainCode,
															strDeviceCode  :ele1.deviceCode,
															strChannelCode :ele1.channelCode,
															strStreamCode  :ele2.streamCode
														};
													    $("#logs").append($("<div/>").html(JSON.stringify(oo)));
														sdk.getDeviceUrlReq(oo,function(urlRes){
														
														     if(urlRes.nResultCode === 0)
															 {											
														    	 var pla = {				
														 		        wsserver:"ws://192.168.2.160:5080",
														 				rtspurl:urlRes.strDynamicUrl,
														 				videoParam: {
														 					palyParam: oo,
														 					videoControl: {recordBtn: true}
														 				},
														 		        log:true
														 		};
														 		console.log(sdk);
														 		sdk.mainPlay.play(pla);
														 		$("#logs").append($("<div/>").html(urlRes.strDynamicUrl));
														 		
															 }else
															 {
																 alert("getDeviceUrlReq:::"+urlRes.strResultDescribe);
															 }
														});
													})).append($("<button/>").html("设置为用户ipc").bind("click",function(res){
													    var oo = {
															    strDomainCode :ele1.domainCode,
																strDeviceCode  :ele1.deviceCode,
																strChannelCode :ele1.channelCode,
																strStreamCode  :ele2.streamCode,
																nIsUse: 1
															};
													    	sdk.setUserUseIPC(oo);
														}));
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
		  }else
		  {
		    $("#devicTree").html("获取域信息失败！");
		  }
	   });	 
	}
	
	
	
	
	function getUserInfo()
	{
	   var opt = {
		    url:$("#url").val(),
			svrIp:$("#svrIp").val(),
			userName:$("#userName").val(),
			svrPort:$("#svrPort").val()*1,
			mac:uid,
		    loginName:$("#loginName").val(),
		    loginSuccess:function(msg){
			   //console.log("11111" , msg)		
		       $("#logs").append($("<div/>").html(JSON.stringify(msg)));
			   if(msg.nResultCode === 0)
				   {}
			   else
				   {
				    sdk.kickOut({strUserTokenID:msg.strUserTokenID});
				   }
		       //登录成功后设置用户ipc
		      /*  var ipc = sdk.getUserUseIPC();
			   if(ipc && ipc.nIsUse == 1){
				   sdk.setUserUseIPCReq(ipc);  
			   } */
		   },
		   log: true
	    };		
		return opt;
	}
	
	function player(){
		//SENT: {"id":2,"url":"rtsp://192.168.2.198:554/2268/rtsp://192.168.2.230:554/Streaming/Channels/1?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=25;DmgType=2258"}
		/* 
		var play = sdk.getPlayer(pla); */
		var pla = {				
	        wsserver:"ws://192.168.2.160:5080",
			rtspurl:"rtsp://192.168.2.160:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=100;DmgType=2258",
			log:true
		};
		console.log(sdk);
		sdk.mainPlay.play(pla);
		//document.getElementById("playPanel").webkitRequestFullScreen();
	}
	function setLayout(){
		var pla = {				
		        layout:$("#layout").val()*1,
		        //wsserver:"ws://192.168.2.198:5080",
				//rtspurl:"rtsp://192.168.2.198:554/2268/rtsp://192.168.2.230:554/Streaming/Channels/1?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=25;DmgType=2258",
		        pnode:"playPanel",
		        log:true
		};
		sdk.mainPlay = sdk.getPlayer(pla);
	}
	function playerx(){
		if(sdk.mainPlay)
			{
			$.each(sdk.mainPlay.players,function(i,n){
				var pla = {				
				        wsserver:"ws://192.168.2.160:5080",
						rtspurl:"rtsp://192.168.2.160:554/2268/rtsp://192.168.2.99:554/Streaming/Channels/103?transportmode=unicast&profile=Profile_3?BitRate=1000;FrameRate=10;IFrame=50;DmgType=2258",
						hyVideo:n,
						log:true
				};
				console.log(sdk);
				sdk.mainPlay.playByVideo(pla);
			})
			}
	}
	
	function stopPlay(){
		if(sdk.mainPlay){
			sdk.stopPlay(sdk.mainPlay);
		}
	}
	
	function startMeeting(){
		
		var meetingOption = {
			strMeetingName: "季芳芳测试",
			strMeetingDesc:"季芳芳测试",
			lstMeetingUserInfo:[{
				"strUserDomainCode": $('#invitedomainCode').val(),
				"strUserID": $('#inviteloginName').val(),
				"strUserName": $('#inviteName').val(),
				"nDevType": $('#userType').val()*1,
				
			}]
		}
		
		var a = $.extend([], meetingOption.lstMeetingUserInfo);
		a.unshift({
			"strUserDomainCode": sdk.sie.strUserDomainCode,
			"strUserID": sdk.opts.loginName,
			"strUserName": sdk.opts.userName,
			"nDevType": 1
		});
		meetingOption.strTrunkPara = {lstMeetingUserInfo: a}
		sdk.HYCurrentMeeting = new HY_MEETING({
			"hySdk": sdk,
			"pnode":'meetingPlayPanel',
			"userPanel": 'meetingUser',
			lstMeetingUserInfo: a,
			meetingRole: 1
		});
		//sdk.HYCurrentMeeting.getUserDynamicUrl({});
		sdk.HYCurrentMeeting.startMeetingReq(meetingOption);
		
	}
	
	
	function stopMeeting(){
		sdk.HYCurrentMeeting.stopMeetingReq();
	}
	
	function quitMeeting(){
		sdk.HYCurrentMeeting.quitMeeting();
	}
	
	
	function queryUserList()
	{
		var opt = {strDomainCode:sdk.sie.strUserDomainCode,"listUser":[]};
		sdk.queryUserListReq(opt,function(res){
			console.log(" =====  ---- " + JSON.stringify(res));
		});
	}
	
	function getUserURl()
	{
		var opt = {				
		};
		sdk.getMobileDynamicUrlReq(opt, function(json){
			console.log(json);	
		});
	}
	
	function fullScreen(){
		sdk.mainPlay.fullScreen();
	}
	
	function addLayout(){
		sdk.addLayout(sdk.mainPlay);
	}
	
	
	function reduceLayout(){
		if(sdk.mainPlay.players.length){
			sdk.reduceLayout({"mainPlay": sdk.mainPlay,hyVideo: sdk.mainPlay.players[0]});
		}
		
	}
	function setFriend()
	{
		console.log(sdk);
		var opt = {
				strUserTokenID : sdk.sie.strUserTokenID,
				strUserDomainCode : sdk.sie.strUserDomainCode,
				strUserID : $("#loginName").val(),
				listUser : [
					{
						strUserDomainCode:sdk.sie.strUserDomainCode,
						strUserID:"jff"
					},{
						strUserDomainCode:sdk.sie.strUserDomainCode,
						strUserID:"lvxh"
					}]
		};
		sdk.setUserFriendReq(opt, function(json){
			console.log("setUserFriendResp : " + JSON.stringify(json));	
		});
	}
	function serRecordURl(){
		var opt = {
				strUserTokenID:sdk.sie.strUserTokenID,
				strNotifyUrl:"http://192.168.2.110:8380/platWeb/test.action",
				strNotifyDomainCode:sdk.sie.strUserDomainCode
		};
		sdk.setUseNotifyUrlReq(opt, function(json){
			console.log(" serRecordURl : " + JSON.stringify(json));
		});
	}
	
	function getRecord(){
		sdk.getRecordUrlListCTSReq({
			serviceUrl:{
				strDomainCode:'a4bf014bb884',
				strDeviceCode:'a4bf014bb8841130000009',
				strChannelCode:'a4bf014bb8841310000025',
				strStreamCode:'a4bf014bb8840000057',
			},
			strRecordLocation:"1",
			nRecordDomain: 1,
			unRecordType: 2,
			strStartTime:'2020-08-31 00:00:00',
			strEndTime:'2020-08-31 23:59:59',
			nPage:0
		},function(res){
			alert(JSON.stringify(res))
		});
	}
	
	function turn(nCommand){
		
		sdk.PTZControlReq({
			serviceUrl:{
				strDomainCode:'a4bf014bb884',
				strDeviceCode:'a4bf014bb8841130000009',
				strChannelCode:'a4bf014bb8841310000025',
				strStreamCode:'a4bf014bb8840000057',
			},
			nCommand:nCommand,
			nStop:0
		},function(msg){
			console.log("###"+JSON.stringify(msg));
		});
	}
	
	function stopTurn(){
		sdk.PTZControlReq({
			serviceUrl:{
				strDomainCode:'a4bf014bb884',
				strDeviceCode:'a4bf014bb8841130000009',
				strChannelCode:'a4bf014bb8841310000025',
				strStreamCode:'a4bf014bb8840000057',
			},
			nCommand:3,
			nStop:1
		},function(){
			
		});
	}
	
	function sendCustomMsg()
	{
		var opts = {				
					strMsg :"22222222222222222222222222222222",
					nImportant:0,
					listUser  :[{
						strUserDomainCode:sdk.sie.strUserDomainCode,
						strUserID:"jff5"
					},{
						strUserDomainCode:sdk.sie.strUserDomainCode,
						strUserID:"lvxh5"
					}]	
		};
		sdk.sendMsgToMultiUserReq(opts,function(res){
			console.log(11111);
		});
	}