//湖北高院
/* ********************** 设备管理列表设置采集点  页面 ********************* */
var CHC_URL = {
		"USER_ROOM": "../chcroleroom/getTree.action"

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

//初始化监控页面
PlatCustomPage.prototype.initWatchPage = function(params){
	try{
		var _this = this;
		_this.roomType = params.customjson.roomType;
		this.pnode = $(params.pnode);
		this.pnode.empty();
		
		var h = $(window).height()-170;
		var leftDiv = $("<div/>").attr("id","roomLeft").addClass("room-left").height(h);
		var leftTree = $("<div/>").addClass("room-tree");
		_this.leftTree = leftTree;
		var searchResult = $("<div/>").hide();
		_this.searchResult = searchResult;
		var searchWarp = $("<div/>").addClass("search-warp");
		leftDiv.append(searchWarp).append(leftTree).append(searchResult);
		var rightContent = $("<div/>").addClass("room-player-warp").attr('id',"roomSelectVideoW").height(h).css({"overflow":"hidden","position": "relative"});
		this.pnode.append(leftDiv).append(rightContent);
		var videoDiv = $("<div/>").attr({"id": "roomSelectVideo"}).css({"overflow":"hidden",height:h,width:"100%",'background':"url('"+$.getImgUrl('/logo/gabg.jpg')+"') no-repeat","background-size":"100% 100%"});
		rightContent.append(videoDiv);
		_this.rightContent = rightContent;
		_this.initSearch(searchWarp,h-44);
		var recordWarp = $("<div/>").css({
			"height":h,"width": 350,"border":"1px solid #1A54AC","position":"absolute","z-index": 999999,top:0,right: 0,
			background: 'url("imgs/bg.png")'
		}).hide();
		_this.recordWarp = recordWarp;
		var rtitle = $("<div/>").height(30).css({"width":"100%","line-height": "30px","text-align": "left","text-indent":"10px"});
		
		var searchBtn = $("<img/>").width(24).height(24).attr("src",$.getImgUrl("/chc/search.png")).css({"float": "right","margin": "3px 10px 0 0","cursor": "pointer"})
		rtitle.append($("<span/>").html("录像列表")).append(searchBtn);
		var timeD = $("<div/>").height(100).css({"width":"100%","border-bottom":"1px solid #1A54AC"});
		var recordListD = $("<div/>").height(h-131).css({"overflow-y": "auto"});
		recordWarp.append(rtitle).append(timeD).append(recordListD);
		_this.timeD = timeD;
		_this.recordListD = recordListD;
		this.pnode.append(recordWarp);
		
		searchBtn.bind("click",function(){
			var opt = {
					"data": _this.selectData,
					startTime: $("#startTime", timeD).val(),
					endTime: $("#endTime", timeD).val(),
					pnode: recordListD,
					timeD:timeD
				}
				_this.getRecordList(opt);
		});
		
		_this.rightWidth = rightContent.width();
		//初始化时间节点
		
		
		PlatTree.prototype.initRoomTree = function(opt){
			if(opt.li){
				opt.li.bind("click", function(ev){
					ev = ev || window.event;
					ev.preventDefault()
					ev.stopPropagation();
					if(opt.label){
						opt.label.click();
					}
					/*if(opt.data.dataType == "roomnode" || opt.data.dataType == "room" ){
						opt.li.addClass("tree-branch-active")	
					}*/
					　return false;  
				});
			}
		}
		var fieldParams = {
			treeHeight:h-44,
			"dynamicResult":{
				"url":CHC_URL.USER_ROOM,
				"postDynamicParam":[],
				"postStaticData":{"userCode": platParams.loginUser.userCode,"roomType": params.customjson.roomType,"sort":{"field":'room_name asc'}}
			},
			"allCheck":false,
			"forceLoadBtn": {
				"hasChild":true,
				"dataType": "room"
			},
			"initEvent":"initRoomTree",
			"expand":true,
			"treeHeight":h-44,
			"hideExpandType":["roomnode"]
		};
		//$.hy_error(fieldParams);
		var field = {fieldParams: JSON2.stringify(fieldParams)};
		var opts = {field:field,pnode:leftTree};
		var tree = new PlatTree(opts);
		_this.tree = tree;
		//重写展开事件
		tree.clickExpendEvent = function(optts){
			var _this = this;
			if(optts.data && optts.data.dataType == "room"){
				var size = $("li",optts.ul).length;
				if(size<= 0){
					$._ajax({
						"url": CONSTANTS.GETROOMNODEBYFROUP_CODE,
						"data":{"roomCode": optts.data.id,"sort":{"field":'room_node_name asc'}},
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

		tree.getPlayList = function(params, func){
			var list = [];
			if(!(params.data.treeList && params.data.treeList.length)){
				$._ajax({
					"url": CONSTANTS.GETROOMNODEBYFROUP_CODE,
					"data":{"roomCode": params.data.id},
					"success": function(ress){
						if(ress.code == 0){
							list = ress.result;
						}
						func && func(list);
					}
				});
			}else{
				list = params.data.treeList;
				func && func(list);
			}
		}
		
		
		//重写点击事件
		tree.clickEvent = function(params){
			_this.roomTreeClick(params);
		};

	}catch(e){console.error("initWatchPage::::"+e)}
}

//初始化监控页面
PlatCustomPage.prototype.roomTreeClick = function(params){
	try{
		var _this = this;
		if(_this.liveMainPlay && _this.liveMainPlay.players){
			HYSDK.stopPlay(_this.liveMainPlay);
		}
		$(".record-row-active").removeClass("record-row-active");
		if(params.data && params.data.dataType == "roomnode"){
			$(".tree-branch-active").removeClass("tree-branch-active");
			params._thisNode.closest(".tree-branch-header").addClass("tree-branch-active");
			_this.recordWarp.show();
			_this.rightContent.width(_this.rightWidth-350);
			var nodeData = params.data.obj;
			var newD = {};
			var pla = {				
		        layout:1,
		        pnode:"roomSelectVideo",
		        log:true
			};
			var mainPlay = HYSDK.getPlayer(pla);
			_this.liveMainPlay = mainPlay;
			//mainPlay.players[0].setTitle({title: nodeData.roomNodeName});
			
			
			newD.domainCode = nodeData.domainCode;
			newD.deviceCode = nodeData.devCode;
			newD.channelCode = nodeData.videoChannelCode;
			newD.strStreamCode = nodeData.videoStreamCode;
			
			_this.tree.playingVodeo = mainPlay.players[0];
			newD.videoPlayer = mainPlay.players[0];
			newD.mainPlay = mainPlay;
			newD.recordBtn = true;
			newD.videoControl = {
				recordBtn: true,
				syncRecordStats: true
			}
			var pm = {};
			pm.stopResp = function(){
				var opt = {
					"data": params.data,
					startTime: $("#startTime", _this.timeD).val(),
					endTime: $("#endTime", _this.timeD).val(),
					pnode: _this.recordListD,
					timeD:_this.timeD
				}
				_this.getRecordList(opt);
			};
			pm.title = nodeData.roomNodeName;
			newD.palyParam =pm;
			
			newD.loadingTip = function(){
				$.showLoading();
			}
			newD.loadingResp = function(){
				$.hideLoading();
			}
			
			SieDevDialog.prototype.palyRtspVideo(newD);
			
			_this.timeD.empty();
			_this.initsearchWarp(_this.timeD);
			
			_this.selectData = params.data;
			var opt = {
				"data": params.data,
				startTime: $("#startTime", _this.timeD).val(),
				endTime: $("#endTime", _this.timeD).val(),
				pnode: _this.recordListD,
				timeD:_this.timeD
			}
			_this.getRecordList(opt);
			
		}else if(params.data.dataType == "room"){
			$(".tree-branch-active").removeClass("tree-branch-active")
			params._thisNode.closest(".tree-branch-header").addClass("tree-branch-active");
			_this.recordWarp.hide();
			_this.rightContent.width("80%");
			_this.tree.getPlayList(params, function(list){
				var newL = [];
				$.each(list,function(i, e){
					newL.push({
						title:e.name,
						strDomainCode :e.obj.domainCode,
						strDeviceCode  :e.obj.devCode,
						strChannelCode :e.obj.videoChannelCode,
						strStreamCode  :e.obj.videoStreamCode
					});
				});
				if(newL.length >=24){
					var l = newL.slice(0,24);
					newL = l;
					$.operateTip({"msg": "最多只能播放24布局，已播放前24个视频", "width": "260px"});
				}else{
				}
				if(newL.length >0){
					var url = platParams.sieWebsocketPrefix+"://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/"+platParams.sieWebsocketPrefix;
					_this.liveMainPlay = HYSDK.playVideoList({
						'pnode': 'roomSelectVideo',
						videolist:newL,
						url: url,
						loadingResp: function(successCount){
							$.hideLoading();
							if(successCount == newL.length){
							}else{
							}
						},
						loadingTip: function(){
							$.showLoading();
						}
					});
				}else{
					$.operateTip({"msg": "没有可播放的视频", "width": "160px"});
				}
			});
		}
	}catch(e){console.error("roomTreeClick:::"+e)}
		
}

PlatCustomPage.prototype.initSearch = function(searchWarp,height){
	var _this = this;
	
	var fieldParams = {
		"dynamicResult":{
			"url":CHCCONTENT.roomNode,
			"postDynamicParam":[{
				"nodeType": "elementNode",
				"postName": "roomNodeName",
				"paramNodeName": 'roomLeftInput',
				"pNodeID": 'roomLeft'
			}],
			"postStaticData":{"roomType": _this.roomType}
		},
		"initEvent":"initRoomTree",
		"allCheck":false,
		"expand":true,
		"treeHeight":height,
		"hideExpandType":["user"]
	};
	
	
	var input = $("<input/>").attr({"placeHolder": "搜索","id": "roomLeftInput"});
	
	searchWarp.append(input).append(
		$("<img/>").attr("src",$.getImgUrl("/chc/whitesearch.png")).bind("click", function(){
			var cond = input.val();
			if($.trim(cond)){
				_this.leftTree.hide();
				_this.searchResult.show();
				if(_this.searchDviceTree){
				   	_this.searchDviceTree.root.remove();
				   	_this.searchDviceTree.init();
			  	 }else{
			  	 	var field = {fieldParams: JSON2.stringify(fieldParams)};
					var opts = {field:field,pnode:_this.searchResult};
					_this.searchDviceTree = new PlatTree(opts);
					_this.searchDviceTree.clickEvent = function(params){
						_this.roomTreeClick(params);
					}
			  	 }
			}else{
				_this.searchResult.hide();
				_this.leftTree.show();
			}
		})
	);
	
}

PlatCustomPage.prototype.initsearchWarp = function(timeD){
	var ops = {};
	ops.btnParams = {"flist":[{"enable":0,"fieldType": "datetime","fieldLabel":"开始时间","fieldName":"startTime","fieldParams":JSON.stringify({"dateFormat":"yyyy-mm-dd hh:ii:ss"}),initParam:JSON.stringify({"initValueType": "initStartTime"})},
		{"enable":0,"fieldType": "datetime","fieldLabel":"结束时间","fieldName":"endTime","fieldParams":JSON.stringify({"dateFormat":"yyyy-mm-dd hh:ii:ss"}),initParam:JSON.stringify({"initValueType": "initEndTime"})}]}
	ops.pnode = timeD;
	var element1 = new DrawElement(ops);
	$(".profile-info-name", timeD).css({"padding":"0","width":"60px"})
}

//获取录像列表
PlatCustomPage.prototype.getRecordList = function(params){
	var _this = this;
	var nodeData = params.data.obj;
	
	var ponde = params.pnode.empty();
	HYSDK.getRecordUrlListCTSReq({
		serviceUrl:{
			strDomainCode:nodeData.domainCode,
			strDeviceCode:nodeData.devCode,
			strChannelCode:nodeData.videoChannelCode,
			strStreamCode:nodeData.videoStreamCode
		},
		strRecordLocation:"1",
		nRecordDomain: 1,
		unRecordType: 2,
		strStartTime:params.startTime,
		strEndTime:params.endTime,
		nPage:0
	},function(res){
		ponde.empty();
		if(res.nResultCode == 0){
			if(res.recordUrlInfo && res.recordUrlInfo.playbackUrlInfoList&& res.recordUrlInfo.playbackUrlInfoList.length){
				$.each(res.recordUrlInfo.playbackUrlInfoList,function(i,e ){
					var li = $("<div/>").addClass("record-row").html(e.playbackTimeInfo[0].strStartTime+"-"+e.playbackTimeInfo[0].strEndTime);
					li.bind("click", function(){
						$(".record-row-active", ponde).removeClass("record-row-active");
						li.addClass("record-row-active");
						var url = platParams.sieWebsocketPrefix+"://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/"+platParams.sieWebsocketPrefix;
						if(_this.liveMainPlay && _this.liveMainPlay.players){
							HYSDK.stopPlay(_this.liveMainPlay);
						}
						var pla = {				
					        layout:1,
					        pnode:"roomSelectVideo",
					        log:false
						};
						var mainPlay = HYSDK.getPlayer(pla);
						_this.liveMainPlay = mainPlay;
						var pla1 = {				
						        wsserver:url,
								rtspurl:e.strPlaybackUrl,
								log:false,
								hyVideo:mainPlay.players[0]
						};
						mainPlay.playByVideo(pla1);
					});
					ponde.append(li);
				});
			}else{
				var li = $("<div/>").addClass("record-row").html("未查询到结果");
				ponde.append(li);
			}
		}else{
			var li = $("<div/>").addClass("record-row").html("未查询到结果");
				ponde.append(li);
		}
	});
}

/* ********************** courtMonitor 庭审监控  页面 ********************* */
PlatCustomPage.prototype.courtMonitor = function(params){
	this.initWatchPage(params);
}


/* ********************** 庭审直播  页面 ********************* */
PlatCustomPage.prototype.courtLive = function(params){
	var _this=this
	this.initWatchPage(params);
   
}

/* ********************** PlatPageHome 主页 ********************* */
function PlatPageHome(params)
{
	this.pnode = $(params.pnode)
	this.initPlatPageHome();
	this.countDeviceStatus();
}
//禁止滚动条
function unScroll() {
    var top = $(document).scrollTop();
    var left=$(document).scrollLeft()
    $(document).on('scroll.unable',function (e) {
        $(document).scrollTop(top);
        $(document).scrollLeft(left);
        
    })
}
//释放滚动条
function removeUnScroll() {
    $(document).unbind("scroll.unable");
}
PlatPageHome.prototype.initPlatPageHome = function(){
	var _this = this;
	var mapContent;
	var trialContent;
	$(".page-content").css({"padding":"8px 20px 0px"})
	$(".ntml").css({"min-width":"1920px","overflow-x":"auto"})
	var pagesContent=$("<div/>").addClass("pagesContent")
	var leftContent=$("<ul/>").addClass("data-display");
	var rightContent=$("<div/>").addClass("map")
	_this.pnode.append(pagesContent)
	pagesContent.append(leftContent).append(rightContent)

    $._ajax({
    	url :CHCCONTENT.todyTaril,
		data : {},
		async:false,
		success : function(data) {									
			if(data.code ==0){
				trialContent=data.result
				CHCCONTENT.HOMEPAGEECHRATS[0].numberr.push(data.result)
              }	  
		},
		error : function(data) {
		
		}
    })
  
    $._ajax({
	    	url :CHCCONTENT.mapData,
			data : {},
			async:false,
			success : function(data) {									
				if(data.code ==0){
					mapContent=data.result[0].list
	              }	  
			},
			error : function(data) {
			
			}
	})
		
		$.each(CHCCONTENT.HOMEPAGEECHRATS,function(i,n){
		$(".data-display").append($("<li/>").addClass("dataList").append($("<div/>").addClass("lefttop")).append($("<div/>").addClass("leftbottom"))
				.append($("<div/>").addClass("righttop")).append($("<div/>").addClass("rightbottom"))
				.append($("<div/>").addClass("all-titlewords").html(n.name)).append($("<div/>").addClass(n.att).addClass("Bchose")
				.append($("<div/>").attr("id",n.ids[0].id).css({"width":"100%","height":"100%"}))).append($("<div/>").addClass("digital-display")
				.append($("<div/>").css({"float":"left"}).append($("<div/>").html(n.firstlist)).append($("<div/>").html(n.secondlist)).append($("<div/>").html(n.thirdlist)))
				.append($("<div/>").css({"float":"left","margin-left":"25px"}).addClass("rightNumber").append($("<div/>").css({"color":"#1561FA"}).addClass(n.firstnumber).html(''))
				.append($("<div/>").css({"color":"#9CF95E"}).addClass(n.secondnumber).html(""))
				.append($("<div/>").css({"color":"#A27DFF"}).addClass(n.thirdnumber).html('')))
				))
				var Allnumber=CHCCONTENT.HOMEPAGEECHRATS[0].numberr[0]
		if(Allnumber){
			$(".firstnumber").html(Allnumber.startCourt)
			$(".secondnumber").html(Allnumber.waitCourt)
			$(".thirdnumber").html(Allnumber.trailCount)
			var deviceCountInfo = window.localStorage.getItem("deviceCountInfo");
			if(deviceCountInfo){
				deviceCountInfo = JSON.parse(deviceCountInfo);
				$(".Jfirstnumber").html(deviceCountInfo.online)
				$(".Jsecondnumber").html(deviceCountInfo.total) 
			}
	    	
		}

    }) 
    $(".map").append($("<div/>").addClass("map-lefttop")).append($("<div/>").addClass("map-leftbottom"))
    .append($("<div/>").addClass("map-righttop")).append($("<div/>").addClass("map-rightbottom"))
    .append($("<map/>").attr("name","bdMap").attr("id","bdMap")).append($("<div/>").attr("id","bor").addClass("always")
    .append($("<img/>").attr({src:$.getPrefixImgUrl("deepblue","/images/恩施土家族苗族自治州.png")}).addClass("Timgbanner").attr("usemap","#bdMap").attr("draggable","false")))
    .append($("<div/>").addClass("dialog-box").append($("<div/>").addClass("courts-number").append($("<span/>").html("庭审总数  :")).append($("<span/>").addClass("Fnumber").html(mapContent[0].trialSum)))
    .append($("<div/>").addClass("court-trial-number").append($("<span/>").html("开庭数  :")).append($("<span/>").addClass("Tnumber").html(mapContent[0].startTrialSum)))		
    )
   
    /* $.each(CHCCONTENT.MAPLIST,function(q,w){
    	$("#bdMap").append($("<area/>").attr("href","#").attr("shape","poly").attr("coords",w)
    	.attr("οnfοcus","blur(this)").addClass("mapclick"))
    })*/
/*    $(".map").bind("click", function(e) {
			var sPosPage = "(" + (e.pageX - 920) + "," + (e.pageY - 150) + ")";
			console.log(sPosPage)
		});*/
   /*$.each(CHCCONTENT.SEV,function(e,r){
	   $.each(mapContent,function(q,z){
   		  $(".mapclick").bind("mousedown",function(){
   			  unScroll()
    			var index = $(this).index();
       	       if(r.id==index &&r.endCode==z.entCode){
       	    		$(".Timgbanner").attr({src:$.getPrefixImgUrl("deepblue",r.img)})
       	    		$(".Fnumber").html(z.trialSum)
       	    		$(".Tnumber").html(z.startTrialSum)
       	       }
    	    })
    	    $(".mapclick").bind("mouseup",function(){
    	    	setTimeout(function(){
    	    		removeUnScroll()
    	    	},100)
    	    })     
   	   })
    		
    })*/
     $.each(CHCCONTENT.MAPLIST,function(q,w){
      var area = $("<area/>").attr("href","#").attr("shape","poly").attr("coords",w)
     .attr("οnfοcus","blur(this)").addClass("mapclick_"+q);
     area.bind("mousedown", function(){
      $("."+"mapclick_"+q).css({"outline":"none"})
    	  unScroll()
      console.log("###############");
       $.each(mapContent,function(q1,z){
        var r = CHCCONTENT.SEV[q];
                if(r.endCode==z.entCode){
              $(".Timgbanner").attr({src:$.getPrefixImgUrl("deepblue",r.img)})
              $(".Fnumber").html(z.trialSum)
              $(".Tnumber").html(z.startTrialSum)
                }
       });
     });
     area.bind("mouseup", function(){
    	 setTimeout(function(){
	    		removeUnScroll()
	    	},100)
        });
     
     
     $("#bdMap").append(area);
    })

    $(".data-display>li").eq(-5).append($("<div/>").addClass("court-session").css({"margin-left":"185px"}).append($("<div/>").attr("id","vehicle").css({"width":"100%","height":"100%"})))
    $._ajax({
    	url : CHCCONTENT.todyCase,
		data : {},
		success : function(data) {									
			if(data.code ==0){
				eachrtsB("main",data.result)
              }
				  
		},
		error : function(data) {
		
		}
    })
    
      $._ajax({
				url :CHCCONTENT.allTrail,
				data : {},
				async:false,
				success : function(data) {									
					if(data.code ==0){
						 $(".Tfirstnumber").html(data.result.closeStatus)
						$(".Tsecondnumber").html(data.result.openStatus)
						Tstate('hearing',data.result)
			          }	  
				},
				error : function(data) {
				
				}
	})
    todyTrial("incourt");
    var deviceCountInfo = window.localStorage.getItem("deviceCountInfo");
	if(deviceCountInfo){
		deviceCountInfo = JSON.parse(deviceCountInfo);
		Jvideo("onlinerate",deviceCountInfo);
	}

	mobileVideo()
	mobileVideo2()
	videoMeeting()
	regClassinfo()
	comVideo()
	
}


PlatPageHome.prototype.countDeviceStatus = function(){
	var _this = this;
	_this.allDevice = {};
	_this.allSieDevice = {};
	_this.totalQuantity = 0;
	$._ajax({
		"url": CHCCONTENT.roomNode,
		"data":{},
		"success": function(res){
			if(res.code == 0 && res.result && res.result.length){
				_this.totalQuantity = res.result.length;
				$.each(res.result, function(ni,ne){
					var key = ne.domainCode+'-'+ne.devCode+'-'+ne.videoChannelCode+'-'+ne.videoStreamCode;
					_this.allDevice[key] = ne;
				});
				_this.queryDeviceStauts();
			}
		}
	});
}

//查询设备状态
PlatPageHome.prototype.queryDeviceStauts = function(){
	var _this = this;
	var totalLen = 0;
	var exetimes = 0;
	HYSDK.getDomainReq(function(msg){
		domainlen = msg.domainInfoList.length;
		if(msg.nResultCode === 0){	
		  	$.each(msg.domainInfoList,function(di,dn){
		  		HYSDK.getDomainGroupReq(dn.strDomainCode,function(domainGroupResp){
		  			  if(domainGroupResp.nResultCode === 0){
		  			  	totalLen=totalLen +domainGroupResp.sDomain.groupList.length;
		  			  	 $.each(domainGroupResp.sDomain.groupList,function(idx,ele){
		  			  	 	var op = {						
								domainCode:dn.strDomainCode,
								groupCode:ele.groupCode,
								nPage:1,
								nSize:1000
							};
							HYSDK.getDeviceReq(op,function(deviceRes){
								exetimes++;
								if(deviceRes.nResultCode === 0)	{
								   $.each(deviceRes.lstChannel,function(idx1,ele1){
								   		var key = ele1.domainCode+"-"+ele1.deviceCode+"-"+ele1.channelCode;
								  		if(ele1.lstStream && ele1.lstStream.length){
								  			$.each(ele1.lstStream, function(si,se){
								  				key+="-"+se.streamCode;
								  				_this.allSieDevice[key] = ele1;
								  			})
								  		}
								   	});
								}
								if(totalLen == exetimes){
									_this.statisticsDeviceStatus();
								}
							});
		  			  	 });
		  			  }
		  		});
		  	});
		}
	});
}

//查询设备状态
PlatPageHome.prototype.statisticsDeviceStatus = function(){
	var _this = this;
	var online = 0
	if(JSON.stringify(_this.allDevice)!='{}'){
		for(var key in _this.allDevice){
			var device =_this.allSieDevice[key];
			if(device){
				if(device.nOnlineState == 1){//在线
					online++;
				}else{//离线
				
				}
			}
		}
	}
	_this.onlineQuantity = online;
	Jvideo("onlinerate",{"total": _this.totalQuantity,"online":_this.onlineQuantity});
	window.localStorage.setItem("deviceCountInfo",JSON.stringify({"total": _this.totalQuantity, online: _this.onlineQuantity}));
}


/****************************点播 回放**********************************/
PlatGrid.prototype.liveplayback = function(opts,srcData){
	var _this = this;
	_this.getTrialInfo(srcData)
	_this.getCourtInfojudge(srcData)
	
	 clearInterval(PLAT.activePage.timeSrcdata);
	$(".infoContent").append($("<a/>").html("笔录下载").attr({"href":srcData.noteUrl}).addClass("trialOnload"))
	if(srcData.noteUrl==''||srcData.noteUrl==undefined){
		 $(".trialOnload").html("暂无笔录下载").attr({"href":"#"})
	 }
	 PLAT.activePage.timeSrcdata = setInterval(function(){
		 if($(".liveContent").length==1 && $(".liveContent").is(":visible")){
		    	console.error("!!!!!!"+srcData.id);
		    	_this.getCourtInfojudge(srcData)
		    }else{
		    	console.error("****"+srcData.id);
		    	clearInterval(PLAT.activePage.timeSrcdata);
		    }
	},3000);
}

/****************************直播 观摩**********************************/
PlatGrid.prototype.liveObserve = function(opts,srcData){
	var _this = this;
	_this.getTrialInfo(srcData)
	 _this.getCourtInfo(srcData);
    _this.getLiveInfoVideo(srcData)
	 clearInterval(PLAT.activePage.timeSrcdata);
	 PLAT.activePage.timeSrcdata = setInterval(function(){
		 if($(".liveContent").length==1 && $(".liveContent").is(":visible")){
		    	console.error("!!!!!!"+srcData.id);
			    _this.getCourtInfo(srcData);
			    _this.getLiveInfoVideo(srcData)
		    }else{
		    	console.error("****"+srcData.id);
		    	clearInterval(PLAT.activePage.timeSrcdata);
		    }
	},3000);
	 
}
//庭审右侧内容
PlatGrid.prototype.getTrialInfo=function(srcData){
	var _this = this;
	_this.table.remove();
	var watchWarp = $("<div/>").css({"width":"100%","height": $(window).height()-150}).addClass("liveContent")
	_this.pnode.append(watchWarp)
	var playerWarp = $("<div/>").addClass("court-player").width(watchWarp.width()-460);
	var courtWarp = $("<div/>").addClass("court-watch-info");
	watchWarp.append(playerWarp).append(courtWarp);
	playerWarp.append($("<div/>").attr("id", srcData.id+"_watch").css({"height": $(window).height()-150}).addClass("videWatch"))
	courtWarp.append($("<div/>").addClass("titelInfo1").html("基本信息")).append($("<div/>").addClass("titleInfoContent"))
//	srcData.url = "rtsp://192.168.2.160:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=100;DmgType=2258";
 
	if($(window).width()<=1600){
    	 $(".liveContent").height($(window).height()-100) 
     }
	$(".titleInfoContent").append($("<div/>").addClass("KinfoContent")
			.append($("<p/>").html("案号: "+ srcData.allCaseNo).attr({"title":srcData.allCaseNo}))
			 .append($("<p/>").html("案件名称: "+ srcData.allCaseNames).attr({"title":srcData.allCaseNames}))
			 .append($("<p/>").html("审判长: "+ srcData.chiefJudger).attr({"title":srcData.chiefJudger}))
			 .append($("<p/>").html("承办人: "+ srcData.allUnderTakers).attr({"title":srcData.allUnderTakers}))
			 .append($("<p/>").html("书记员: "+ srcData.clerkName).attr({"title":srcData.clerkName}))
			 .append($("<p/>").html("庭审类型: "+ srcData.isPublicDesc).attr({"title":srcData.isPublicDesc}))
			 .append($("<p/>").html("开庭时间: "+ srcData.planBeginTime).attr({"title":srcData.planBeginTime}))
			 .append($("<p/>").html("当事人: "+ srcData.casePartiesNames).attr({"title":srcData.casePartiesNames}))
	).append($("<div/>").addClass("infoContent") 
			.append($("<p/>").html("法院: "+ srcData.entName).attr({"title":srcData.entName}))
			 .append($("<p/>").html("法庭: "+ srcData.thirdPlace).attr({"title":srcData.thirdPlace}))
			 .append($("<p/>").html("庭审状态: "+ srcData.trialStatus).addClass("traliStaus").attr({"title":srcData.trialStatus}))
			 .append($("<p/>").html("审判长: "+ srcData.chiefJudger).attr({"title":srcData.chiefJudger}))
			 .append($("<p/>").html("书记员: "+ srcData.clerkName).attr({"title":srcData.clerkName}))
			 .append($("<p/>").html("审判员: "+ srcData.judgerName).attr({"title":srcData.judgerName}))
			 .append($("<p/>").html("庭审类型: "+ srcData.isPublicDesc).attr({"title":srcData.isPublicDesc}))
			 .append($("<p/>").html("开庭时间: "+ srcData.planBeginTime).attr({"title":srcData.planBeginTime}))
		
			 )
	$(".court-player").css({"background":"#010d2b"}).append($("<img/>").attr("src",$.getImgUrl("/images/video11.png")).addClass("novideo"))
	courtWarp.append($("<div/>").addClass("titelCase"))
		     .append($("<div/>").addClass("titleCaseContent"))
		     .append($("<ul/>").addClass("choseCaes"))
		     .append($("<div/>").addClass("titelInfo").html("庭审回放视频"))
		     .append($("<div/>").addClass("trailVideos"));
	var spanName =$("<span/>").html("").addClass("caseNamed");
	$(".titelCase").append(spanName).append($("<img/>").attr("src",$.getImgUrl("/images/xiala.png")).addClass("xiala")) 
	$(".titleCaseContent").append($("<p/>").html("").addClass("caseType").attr({"title":""}))
	 .append($("<p/>").html("").addClass("caseBrief").attr({"title":""}))
	 .append($("<p/>").html("").addClass("caseRegist").attr({"title":""}))
	 .append($("<p/>").html("").addClass("underTakerOrg").attr({"title":""}))
	 .append($("<p/>").html("").addClass("underTaker").attr({"title":""}))
	 .append($("<p/>").html("").addClass("trialNum").attr({"title":""}))
	 .append($("<p/>").html("").addClass("partiesName").attr({"title":""}))
	$._ajax({	
				url : CHCCONTENT.caseData,
				data : {schedulingCode:srcData.schedulingCode,courtCode:srcData.courtCode},
				success : function(data) {									
					if(data.code ==0){
				        $.each(data.result,function(i,n){
				        	var li = $("<li/>").html(n.caseName);
				        	$(".choseCaes").append(li);
				        	li.bind("click",function(){
				        		$(".choseCaes").hide()
				        		
				        		spanName.html(n.caseName)
				        		//var index = $(this).index();
				        		$(".caseNamed").html(n.caseName)
			        			$(".caseType").html("案件类型: "+n.caseTypeName).attr({"title":n.caseTypeName})
			        			$(".caseBrief").html("案由: "+n.caseBrief).attr({"title":n.caseBrief})
			        			$(".caseRegist").html("立案时间: "+n.caseRegist).attr({"title":n.caseRegist})
			        			$(".underTakerOrg").html("承办部门: "+n.underTakerOrg).attr({"title":n.underTakerOrg})
			        			$(".underTaker").html("承办人: "+n.underTaker).attr({"title":n.underTaker})
			        			$(".trialNum").html("庭次: "+n.trialNum).attr({"title":n.trialNum})
			        			$(".partiesName").html("当事人: "+n.partiesName).attr({"title":n.partiesName})
			        			_this.drawRecordList(srcData,n);
				        		return false;
				        	});
				        	if(i == 0){
				        		li.click();
				        	}
				        });
				        $(".xiala").bind("click",function(){
				        	event.stopPropagation();
							if($(".choseCaes").is(':hidden')){
								$(".choseCaes").show()
								}else{
									$(".choseCaes").hide()
								}
						})
		              }	  
				},
				error : function(data) {
				}
		    })	
		    $(document).click(function(){
				$(".choseCaes").hide();
			});		
}
//庭审右侧内容
PlatGrid.prototype.drawRecordList = function(srcData, caseInfo){
	var _this = this;
	$(".trailVideos").empty();
	 $._ajax({
 		url : CHCCONTENT.playback,
 		data : {schedulingCode:srcData.schedulingCode,courtCode:caseInfo.courtCode,"caseNo":caseInfo.caseCode},
 		success : function(data) {									
 			if(data.code ==0){	
 				var dataRes=data.result;
 				/*if(dataRes==''){
 					 var rrow = $("<p/>").html("暂无案件录像查看").addClass("noCase").attr({"title":"暂无案件录像查看"});
 					$(".trailVideos").append(rrow);
 				}*/
 				$.each(dataRes, function(i,n){
 					
 					var rrow = $("<p/>").html(n.videoName).addClass("videName").attr({"title":n.videoName});
 					 if(i==0){
 						 var optst={
 			 					url:n.url,
 			 					videoName:n.videoName
 			 				};
  						_this.liveplaybackvideo(srcData,optst);
 					 }
 					rrow.bind("click", function(){
 						  $(this).addClass("activeLive").siblings().removeClass("activeLive");
 						 var optst={
			 					url:n.url,
			 					videoName:n.videoName
			 				};
 						_this.liveplaybackvideo(srcData,optst);
 					});
 					$(".trailVideos").append(rrow);
 				});
 			}	  
 			
 		},
 		error : function(data) {
 		}
 	});
}
//回放切换
PlatGrid.prototype.liveplaybackvideo = function(srcData,optst){
	var _this = this;
	if(_this.recordPlay && _this.recordPlay.players){
		HYSDK.stopPlay(_this.recordPlay);
	}
	var pla = {				
			layout:1,
			pnode:srcData.id+"_watch",
			log:false
	};
	var mainPlay = HYSDK.getPlayer(pla);
	_this.recordPlay = mainPlay;
	
	var url = platParams.sieWebsocketPrefix+"://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/"+platParams.sieWebsocketPrefix;	
	//	n.url="rtsp://192.168.2.160:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=100;DmgType=2258";								 		
	plas= {				
	        wsserver: url,
			rtspurl: optst.url,
			hyVideo: mainPlay.players[0],
			videoParam:{
				palyParam:{
					'title': optst.videoName
				}
			},
			log:true
		};
		mainPlay.playByVideo(plas);
}
//庭审直播观摩视频
PlatGrid.prototype.getLiveInfoVideo = function(srcData){
var _this=this
	if($(".KinfoContent").is(':visible')){

	 }else{
		 $._ajax({
		    	url : CHCCONTENT.videoUrl,
				data : {schedulingCode:srcData.schedulingCode},
				success : function(data) {	
					if(data.code ==0){
						if(data.result && data.result.length){
							var pla = {				
									layout:data.result.length,
									pnode:srcData.id+"_watch",
									log:false
							};
							var mainPlay = HYSDK.getPlayer(pla);
							_this.stopePlay = mainPlay;
							var url = platParams.sieWebsocketPrefix+"://"+platParams.sieIp+":"+platParams.sieStreamWebsokcetPort+"/"+platParams.sieWebsocketPrefix;
							$.each(data.result,function(i,n){
								
							//	n.url="rtsp://192.168.2.160:554/2268/rtsp://192.168.2.219:554/Streaming/Channels/101?transportmode=unicast&profile=Profile_1?BitRate=2048;FrameRate=25;IFrame=100;DmgType=2258";								 		
								var pla = {				
							        wsserver: url,
									rtspurl: n.url,
									hyVideo: mainPlay.players[i],
									videoParam:{
										palyParam:{
											'title': n.videoName
										}
									},
									log:false
								};
						 		mainPlay.playByVideo(pla);
							});
						}
		              }	  
				},
				error : function(data) {
				}
		    })
	 }
}

//直播
PlatGrid.prototype.getCourtInfo = function(srcData){
	var _this = this;
		$._ajax({
    		url : CHCCONTENT.timeTrial,
    		data : {"id":srcData.id},
    		success : function(data) {									
    			if(data.code ==0){	
    				var dataContent=data.result[0]
    				var	timeOutStauts=dataContent.status
    				if(timeOutStauts == 1){//开庭
    			        $(".traliStaus").html("庭审状态: "+ dataContent.trialStatus)
    					$(".videWatch>div").css({"height":"100%"})
    					$("#"+srcData.id+'_watch').show()
    					$(".KinfoContent").show()
    					$(".infoContent").hide()
    					$(".novideo").hide()
    					$(".titelCase").show()
    					$(".titleCaseContent").show()
    					$(".titelInfo").hide()
    				
    				}
    				else{//未开庭\
    					$(".traliStaus").html("庭审状态: "+ dataContent.trialStatus)
    					$("#"+srcData.id+'_watch').hide()
    					if(_this.stopePlay && _this.stopePlay.players){
    						HYSDK.stopPlay(_this.stopePlay);
    					}
    					$(".KinfoContent").hide()
    					$(".infoContent").show()
    					$(".novideo").show()
    					$(".titelCase").show()
    					$(".titleCaseContent").show()
    				
    					
    				}
    			}	  
    			
    		},
    		error : function(data) {
    		}
    	});
 }
//庭审点播闭庭时摄像头回放
PlatGrid.prototype.getCourtInfojudge = function(srcData){
	var _this = this;
	$._ajax({
		url : CHCCONTENT.timeTrial,
		data : {"id":srcData.id},
		success : function(data) {									
			if(data.code ==0){	
				var dataContent=data.result[0]
				var	timeOutStauts=dataContent.status
				if(timeOutStauts == 2||timeOutStauts == 3){//闭庭休庭
					
					$(".traliStaus").html("庭审状态: "+ dataContent.trialStatus)
					$(".videWatch>div").css({"height":"100%"})
					$("#"+srcData.id+'_watch').show()
					$(".KinfoContent").hide()
					$(".infoContent").show()
					$(".novideo").hide()
					$(".titelCase").show()
					$(".titleCaseContent").show()
					
					if(dataContent.noteUrl==''||dataContent.noteUrl==undefined){
					
						 $(".trialOnload").html("暂无笔录下载").attr({"href":"#"})
					 }else{
						
						 $(".trialOnload").html("笔录下载")
					 }
				}else{
					$(".traliStaus").html("庭审状态: "+ dataContent.trialStatus)
					
				}
			}	  
			
		},
		error : function(data) {
		}
	});
 }

function chcimg_render(value,render)
{
	var v=value;
	if(v && v != "undefined"){
		var img = $("<img/>").attr({"src":$.getImgUrl(v),onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
		img.css({"max-width":render.maxWidth?render.maxWidth:"24px","max-height":render.maxHeight?render.maxHeight:"24px","border-radius":"5px","cursor":"pointer"});
		img.bind("click",function(){
			var dialog = $.getShowImgDialog("imgUrl",600,600,v,true);
		});
	    return img;
	}
    return "";
}
