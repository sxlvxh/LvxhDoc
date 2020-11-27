/**
 *初始化sie并重写sie的一些方法
 */

function initCsSdk(){
	try{
		//初始化参数
		CsSdk.prototype.init = function(){
			try{
				var _this = this;
			_this.MeetingInfo = {};//存放正在进行的会议
			var json = JSON2.parse(platParams.platEnt.entParams);
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
					"domainCode":json.domainCode
				}
			}
			}catch(e){alert(e)}
		}
		
		//创建会议窗口参数并发起会议
		CsSdk.prototype.gMLInfoAction = function(opts){
			var _this = this;
			var param = {
				"menu": [{
					"img":{
						"hover":$.getImgUrl("/userfiles/lvxh/20200506/7312a26ee85e4257b63b189c18ab7ca6.png"),
						"default": $.getImgUrl("/userfiles/lvxh/20200506/7312a26ee85e4257b63b189c18ab7ca6.png")
						},
					"title": "文档",
//					"url": platParams.webServerUrl+"/platnote/index.action",
					"url": "http://192.168.2.150:8280/platWeb/platnote/index.action",
					"type": 2,
					"msgTypeList":[100400,100401]
					}],
				"style": {
					"width":1200,
					"height":800,
//					"rightWin":{"show":1,height:0,width:270,sub:1,url:platParams.webServerUrl+"/platmeeting/opreate.action?meetingInfo="+encodeURIComponent(JSON2.stringify(_this.MeetingInfo))}}
				"rightWin":{"show":1,height:0,width:270,sub:1,url:"http://192.168.2.150:8280/platWeb/platmeeting/opreate.action?meetingInfo="+encodeURIComponent(JSON2.stringify(_this.MeetingInfo))}}
			}
			_this.toCs(100102,param);
		}
		CsSdk.prototype.friend_gMLInfo = function(opts){
			var _this = this;
			_this.gMLInfoAction();
		}
		
		CsSdk.prototype.os_gMLInfo = function(opts){
			var _this = this;
			_this.gMLInfoAction();
		}
		CsSdk.prototype.groupUser_gMLInfo = function(opts){
			var _this = this;
			_this.gMLInfoAction();
		}
		
		//获取会议人员信息
		CsSdk.prototype.getUserInfo = function(opts, func){
			var _this = this;
			try{
				var list = [];
				var memberList = [];
				$._ajax({
					"url": "../platuser/getUserListBylist.action",
			//		"data":[{"domainCode":"f079595d296b","userCode": "29c31e9fa1f1448583348636fda3e8fe"}],
					"data":opts.userList,
					"success":function(res){
						if(res.code == 0){
							$.each(res.result, function(i, e){
								list.push({
									"domainCode":e.domainCode,
									"userCode":e.userCode,
									"roleType":e.userType,
									"roleName":e.userTypeName,
									"imgUrl": e.imgUrl
								});
							});
							func && func(list);
						}else{
							$.operateTip({"msg": "查询用户数据失败" ,"width": "150px"});
						}
						
					}
				})
			}catch(e){alert("getUserInfo 异常：：："+e)}
		}
		
		CsSdk.prototype.getSInfoAction = function(opts){
			var _this = this;
			_this.getUserInfo(opts, function(userList){
				var param = {
					"serviceCode": opts.serviceCode,
					"userList":userList
				}
				_this.toCs(100202,param);
			});
		}
		
		CsSdk.prototype.friend_getSInfo = function(opts){
			var _this = this;
			_this.getSInfoAction(opts);
		}
		
		CsSdk.prototype.os_getSInfo = function(opts){
			var _this = this;
			_this.getSInfoAction(opts);
		}
		
		CsSdk.prototype.groupUser_getSInfo = function(opts){
			var _this = this;
			_this.getSInfoAction(opts);
		}
		
		//会议录像通知
		CsSdk.prototype.notifyMeetingRecord = function(opts){
			var _this = this;
			if(opts){
				if(opts.status == 1){
					if(_this.MeetingInfo &&_this.MeetingInfo.id){
						$._ajax({
							"url":"../platmeeting/update.action",
							"data": {
								"id": _this.MeetingInfo.id, 
								"meetingId":opts.meetingID,
								"meetingRecord": 1,
								"recordId": opts.recordID
							},
							"success": function(res){
								_this.log(res,"会议更新成功 ")
							}
						});
					}
				}
			}
		}
		
		//会议状态通知
		CsSdk.prototype.notifyMeetingStatus = function(opts){
			try{
				var _this = this;
				if(opts && opts.status == 0){
					if(opts.mainUserCode == platParams.loginUser.userCode 
					&& opts.mainDomainCode == JSON2.parse(platParams.loginUser.entParams).domainCode){
						$._ajax({
							"url":"../platmeeting/insert.action",
							"data": {
								"serviceCode": opts.serviceCode,
								"meetingUserCode": platParams.loginUser.userCode,
								"meetingDomainCode": JSON2.parse(platParams.loginUser.entParams).domainCode,
								"meetingName": platParams.loginUser.name+"发起的会议",
								"meetingVoiceIntercom": _this.startMeetingParam.mediaMode,
								"meetingId":opts.meetingID,
								"meetingStatus":1,
								"meetingType": 0
							},
							"success": function(res){
								if(res.code == 0){
									_this.MeetingInfo= res.obj;
								}
							}
						});
						
						var list = [];
						$.each(_this.startMeetingParam.userList, function(i, e){
							list.push({
								"meetingUserCode":platParams.loginUser.userCode,
								"meetingDomainCode": JSON2.parse(platParams.loginUser.entParams).domainCode,
								"meetingJoinDomainCode": e.domainCode,
								"meetingJoinUserCode": e.userCode,
								"meetingId": opts.meetingID
							});
						});
						$._ajax({
							"url":"../platmeetinguser/insertBatch.action",
							"data": list,
							"success": function(res){
								_this.log(JSON2.stringify(res),"人员入库成功结果")
							}
						});
						
						_this.MeetingInfo.meetingRole = 1;//主持人
					}else{
						_this.MeetingInfo.meetingId = opts.meetingID;
						_this.MeetingInfo.meetingRole = 2;//被叫
					}
				}else if(!opts || opts.status == 1){//会议结束
					$._ajax({
						"url":"../platmeeting/update.action",
						"data": {
							"id": _this.MeetingInfo.id, 
							"meetingStatus":2
						},
						"success": function(res){
							_this.log(res,"会议更新成功 ")
						}
					});
				}else if(!opts || opts.status == 3){//会议失败
					alert("会议开启失败")
				}
			}catch(e){_this.log(e,"notifyMeetingStatus 异常: ")}
		}
		
		//语音转写通知
		CsSdk.prototype.notifyVoiceContent = function(opts){
			try{
				var _this = this;
				if(NotePage){
					NotePage.prototype.addVoiceNote(opts);
					
					var setContent = {
					        msgType : "voiceNotify",
					        src : platParams.loginUser.userCode,
					        content : JSON2.stringify(opts),
					        targets : csSdk.meetingMember
				       };
				       PLAT.ws.sendMsg(setContent);
				}
			}catch(e){alert(e)}
		}
		
		//语音转写通知
		CsSdk.prototype.receVoiceNotify = function(opts){
			try{
				var _this = this;
				if(NotePage){
					//alert("receVoiceNotify:::"+JSON2.stringify(opts))
					NotePage.prototype.addVoiceNote(opts);
				}
			}catch(e){alert(e)}
		}
		
		csSdk.init();
		csSdk.sendConfig();
		var windowPara = {
			"winType":1,
			"width":1600,
			"height":900
		};
		csSdk.sendSettingWindow(windowPara);
	}catch(e){
	 	 $.hy_error(e,"cs Sdk error ");
	}
}