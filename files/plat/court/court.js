/**
 * 
 */
$(function(){
	onLoad();

})

function onLoad() {
	try{
		new QWebChannel(qt.webChannelTransport, function(channel) {
			window.QtWebObj = channel.objects.QtWebObj;
			/*QtWebObj.InitWebParams();*/
		});
	}catch(e){$.hy_error(e,"QWebChannel 加载异常：：")}

}

window.onresize = function(){
	windowResize();
	$(".topright").width($(".all").width() - $(".upL").width()-100);
	$("#my-court-page").width($("#datagrid").width())
}

function windowResize(){
	var w = window.innerWidth;
	var h = window.innerHeight;
	$("#datagrid").width(w).height(h)
}


/**********************举证质证 ********************/
function CourtEvidencePage(param){
	this.param = param;
	this.ConverList = [];
	this.getConverReault();
}

CourtEvidencePage.prototype.init = function(){
	this.initEvidenceTree();
	this.initBtns();
	this.initEvidenceCanvas();
	this.initColorTip();
}

CourtEvidencePage.prototype.initColorTip = function(){
	var _this = this;
	var root = _this.param.colorTipWarp;
	_this.colorList = {};
	var judge = platParams.loginUser;
	var colorObj = {1:"#01B9FF",2:"#4BC00B","-1":"#FF0000",3:"#A64FF6",4:"#00C1D0",5:"#EB5298",
		6:"#FFD74D",7:"#5ED7B5","8":"#C77FDC",9:"#FF8200",10:"#FF9483"
	}
	_this.colorObj = colorObj;
	_this.colorList[judge.userCode] = {"name": judge.name,"seatName": "法官","color": "#FF0000"}
	if(trialCode){
		$._ajax({
			"url": "../court/getTrialUser.action",
			"data":{"trialCode": trialCode},
			"success": function(res){
				if(res.code == 0){
					if(res.obj.partyList){
						$.each(res.obj.partyList, function(i,e){
							_this.colorList[e.userCode] = {"name": e.userName,"seatName": e.seatName,"color": colorObj[e.seat]?colorObj[e.seat]:"#A64FF6"}
						})
					}
					$.each(_this.colorList,function(i, e){
						var div = $("<div/>").addClass("color-tip-row");
						var line = $("<i/>").css({"background":e.color})
						var title = $("<span/>").html("（"+e.seatName+"）");
						var name = $("<span/>").html(e.name);
						div.append(line).append(name).append(title);
						root.append(div)
					});
				}
			}
		})
	}else{
		$.hy_log("庭审编号为空");
	}
}


CourtEvidencePage.prototype.initBtns = function(){
	var _this = this;
	var p = this.param;
	var root = p.canvasBtnWarp;
	var btnList = {
		"scaleGroup": [
		{"name": "放大","imgUrl":$.getImgUrl("/court/fangda.png"),"clickEvent":"enlargeEvent"},
		{"name": "缩小","imgUrl":$.getImgUrl("/court/suoxiao.png"),"clickEvent":"reduceEvent"}],
		"drawGroup": [
		{"name": "标注","imgUrl":$.getImgUrl("/court/huabi.png"),"clickEvent":"markerEvent"},
		{"name": "撤销","imgUrl":$.getImgUrl("/court/fanhui.png"),"clickEvent":"cancelEvent"}],
		"rotateGroup": [
		{"name": "向左旋转","imgUrl":$.getImgUrl("/court/xiangzuo.png"),"clickEvent":"leftRotate"},
		{"name": "向右旋转","imgUrl":$.getImgUrl("/court/xiangyou.png"),"clickEvent":"rightRotate"}]
	};
	
	$.each(btnList, function(bi,be){
		$.each(be, function(i, e){
			var div = $("<div/>").addClass("canvas-btn").bind("click", function(){
				_this[e.clickEvent]();
			})
			var img = $("<img/>").attr({"title": e.name,"src": e.imgUrl});
			div.append(img);
			root.append(div)
		});
		if(bi != "rotateGroup"){
			var div = $("<div/>").addClass("division")
			root.append(div)
		}
	})
	
}

CourtEvidencePage.prototype.enlargeEvent = function(){
}

CourtEvidencePage.prototype.reduceEvent = function(){
}

CourtEvidencePage.prototype.markerEvent = function(){
}

CourtEvidencePage.prototype.cancelEvent = function(){
	try{
		var _this = this;
		var startParam = {
			  "reqType":6,
			  "msg":JSON2.stringify({
				  "trialCode": trialCode,
				  "nType": 7,
				  "operateType": "revokeReq",
				  "seatId": _this.sketchpad.seatId,
				  "imgId": _this.sketchpad.imgId
				})
		 	}
		startParam= JSON2.stringify(startParam)
		QtWebObj.jsToCs(startParam);
		this.cancel();
	}catch(e){
		$.hy_log("cancelEvent 异常:::"+e)
	}
}

CourtEvidencePage.prototype.leftRotate = function(){
	var _this = this;
	_this.sketchpad.leftRoate();
}

CourtEvidencePage.prototype.rightRotate = function(){
}

CourtEvidencePage.prototype.reWritePlattree = function(){
	var _this = this;
	PlatTree.prototype.reorganizeData = function(res){
		_this.tempEvidenceList = res.result;
		return res;
	}
		
		PlatTree.prototype.getLi = function(data,pnode){
		    var _this = this;
		    var li = $("<li/>").addClass("tree-branch").attr({"pid":data.pid});
			var i = $("<i/>").addClass("icon-caret ace-icon fa fa-caret-right").css({"font-size":"20px","color":"#2C3D59","z-index": 200}).hide();
			var div = $("<div/>").addClass("tree-branch-header");
			var ul = $("<ul/>").addClass("tree-branch-children").attr({"data_id":data.id,"pid":data.pid}).hide();
			var div1 = $("<div/>").addClass("tree-loader").hide();
			var divLoad = $("<div/>").addClass("tree-loading");
			var load = $("<i/>").addClass("ace-icon fa fa-refresh fa-spin blue");
			var span = $("<span/>").addClass("tree-branch-name");
			var img = $("<img/>").css({"width":"14px","height":"14px","margin-top":"-5px","margin-left":"5px"});
			img.attr({"src": $.getImgUrl(data.img)});
			var check =  $("<img/>").attr({"data_id":data.id,"data_type":"check_img","pid":data.pid}).css({"margin-top":"-5px"});
			var label = $("<span/>").addClass("tree-label").css({"margin-left": "10px"}).html(data.name);
			if(data.codes)
			{
				label.attr({codes:data.codes});
			}
			//刷新按钮
			var imgRef = $("<img/>").css({"width":"14px","height":"14px","margin-top":"-5px","margin-left":"5px"}).attr("id",data.id+"_refresh");
			imgRef.attr({"src": $.getImgUrl("/tree/refresh.png"),"title": "刷新"}).hide();
			//新增按钮按钮
			var addDataImg= $("<img/>").css({"width":"14px","height":"14px","margin-top":"-5px","margin-left":"5px"});
			addDataImg.attr({"src": $.getImgUrl("/tree/add.png"),"title": "增加"}).hide();
			
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
			div.append(span.append(imgRef).append(addDataImg).append(img).append(label));
			pnode.append(li.append(i).append(div).append(ul).append(div1.append(divLoad.append(load))));
			if(_this.fieldParams.expand === true)
			{
				i.show();
				if(data.hasChild === true ||(_this.fieldParams.forceLoadBtn && data.dataType ==_this.fieldParams.forceLoadBtn.dataType && _this.fieldParams.forceLoadBtn.hasChild === true)){	
				    i.addClass("fa-caret-right");
				    i.removeClass("fa-caret-down");
					
				}else{
					i.removeClass("fa-caret-right");
					i.addClass("fa-caret-down");
				}
				if(_this.fieldParams.hideExpandType){
					$.each(_this.fieldParams.hideExpandType,function(j,m){
					    if(data.dataType && data.dataType == m){ 	i.hide(); }
					});
				}
				
				
				i.bind("click",function(){
//					$.hy_error(data);
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
				$.each(_this.fieldParams.showAddDataType,function(j,m){
				    if(data.dataType && data.dataType == m){ 	addDataImg.show(); }
				});
			}
			
			addDataImg.bind("click",function(){
				var opt = {div1:div1,addDataImg:addDataImg,ul:ul,data:data};
			   _this.clickAddDataEvent(opt);
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
			_this.initEvent(eventData);
		};
		
		PlatTree.prototype.expendEvent = function(opts){
			$.hy_error(opts);
			var _this = this;
			var i = opts.i;
			var div1 = opts.div1;
			var ul = opts.ul;
			var data = opts.data;
			
			if (i.hasClass("fa-caret-right")) {
				div1.show();
				i.removeClass("fa-caret-right");
				i.addClass("fa-caret-down");
				ul.show();
			    var size = $("li",ul).length;
			    if(data.hasChild === true && size <= 0){
				    $.each(data.treeList,function(k,ll){
					   _this.getLi(ll,ul)
				    }); 	    
			    }
			    div1.hide();
		    } else {
		    	ul.hide();
		    	i.addClass("fa-caret-right");
		    	i.removeClass("fa-caret-down");
		    }
				    
		}
}

CourtEvidencePage.prototype.initEvidenceTree = function(){
	try{
		var _this = this;
		var divwarp = $("<div/>");
		_this.reWritePlattree();
		var fieldParams = {
			"dynamicResult":{
				"url":"../trialfilelist/getEvidenceTree.action",
				"postDynamicParam":[],
				"postStaticData":{"trialCode":101}
			},
			"allCheck":false,
			"reorganizeData": true,
			"expand":true,
			"treeHeight": this.param.treeNode.height()-50,
			"hideExpandType":["img"]
		};
		
		var field = {fieldParams: JSON2.stringify(fieldParams)};
		var opts = {field: field,pnode:divwarp};
		var tree = new PlatTree(opts);
		
		
		tree.clickEvent = function(opts){
			var data = opts.data;
			if(data.dataType =="img"){
//				$.getImgUrl
				_this.sketchpad.drawImg("http://192.168.2.132/files/plat/"+data.obj);
				var startParam = {
				  "reqType":6,
				  "msg":JSON2.stringify({
				  	 "trialCode": trialCode,
					  "nType": 7,
					  "imgId": data.obj,
					  "imgSrc": "http://192.168.2.132/files/plat/"+data.obj,
					  "operateType": "changeEvidenceReq"
					})
			 	}
				startParam= JSON2.stringify(startParam)
				QtWebObj.jsToCs(startParam);
			}
		}
	 var div =$("<div/>").css({"width": "100%","position": "absolute","bottom": 0}).append(
		 $("<div/>").addClass("addEvidencebtn").html("添加证据").bind("click", function(){
		 	_this.showaddDialog();
		 })
	 ) 
	 this.param.treeNode.css({"position": "relative"}).append(divwarp).append(div)
	}catch(e){$.hy_error("initEvidenceTree  异常",e)}
}

CourtEvidencePage.prototype.showaddDialog= function (){
	var _this = this;
	var opt = {
			id : "addEvidence_open",
			title : "添加证据",
			width : 500,
			height : 200,
			lock : true
		};
	var dialog = $.openDialog(opt);
	$(".d-nw", $(".d-border")).css({"background": "#F6F6F6"});
	$(".d-n", $(".d-border")).css({"background": "#F6F6F6","color": "#333"})
	$(".d-ne", $(".d-border")).css({"background": "#F6F6F6"})
	$('#d-title-addEvidence_open_dialog').css({"color": "#333","text-shadow": "none","font-weight":"bold"})
	var uC = {"type": [".DOC",".DOCX",".PNG",".JPG",".GIF",".PDF",".JPEG"],"msg": "只允许上传DOC，DOCX，PDF，PNG，JPG，GIF，JPEG类型的文件"};
	var src = "../main/upFormReq.action?temp_id=evidenceuploadFileReq&uploadConditions="+encodeURIComponent(JSON2.stringify(uC));
//	var src = "../main/upFormReq.action?temp_id=evidenceuploadFileReq";
	var iframe = $("<iframe/>").attr({"src":"",frameborder:0,scrolling:"no",height:"40px",width:"40px"});
	var addBtn = $("<div title='选择上传文件' style='cursor:pointer; margin-right: 10px; float: right;'/>").addClass("upload-icon ace-icon fa fa-cloud-upload blue fa-2x").bind("click",function(){
		iframe.attr({"src":src});
	}).hide()
	
	$("#addEvidence_open").css({"position": "relative",height:"200px"}).append(
		$("<div/>").addClass("add-evidence-btn").css({"top": "55px"}).html("上传新文件").bind("click", function(){
			addBtn.click();
		})
	).append(
		$("<div/>").addClass("add-evidence-btn").css({"top": "85px"}).html("高拍仪拍摄")
	).append(
		$("<div/>").attr("id","evidenceuploadFileReq").bind("click", function(){
			var uploadReqParam = $(this).data("data-upload");
			if(uploadReqParam.code == 0){
				if(uploadReqParam.result && uploadReqParam.result.length){
					var s = uploadReqParam.result[0];
					$._ajax({
						"url": "../courttrialfile/insert.action",
						"data":{"trialCode": 101,"fileCode": s.fileCode},
						"success": function(res){
							dialog.close();
							if(s.oneType == "img"){
								if(_this.tempEvidenceList&&_this.tempEvidenceList[0].treeList){
									_this.tempEvidenceList[0].treeList.push({
										"name" : s.fileName,
										"img" : "/court/ziyuan.png",
										"dataType" : s.oneType,
										"hasChild" : false,
										"url" :s.fileUrl,
										"obj": s.fileUrl,
										"treeList" : []
									})
									$.operateTip({"msg": "文件上传成功", "width": "150px"});
									$("#temp_catalog_refresh").click();
								}
							}else{
								$._ajax({
									"url": "../main/converter.action",
									"data": {"fileCode":s.fileCode,"fileConverterStatus":7},
									"success": function(resss){
										if(resss.code ==0){
											_this.ConverList.push({"fileCode":s.fileCode,trialCode:101});
											
										}
									}
								});
							}
						}
					})
					
				}
			}
		}).hide()
	)
	$("#addEvidence_open").append(iframe).append(addBtn);

}

CourtEvidencePage.prototype.getConverReault = function(){
	try{
		var _this = this;
		clearInterval(_this.getConverReaultTimer);
		_this.getConverReaultTimer = setInterval(function(){
			var postData = _this.ConverList[0];
			if(postData && postData.fileCode && postData.trialCode){
				$._ajax({
					"url": "../trialfilelist/getEvidenceTree.action",
					"data": postData,
					"success": function(rest){
						if(rest.code == 0){
							if(rest.result && rest.result.length){
								if(rest.result[0].treeList && rest.result[0].treeList[0].treeList.length){
									if(_this.tempEvidenceList&&_this.tempEvidenceList[0].treeList){
										_this.ConverList.shift();
										_this.tempEvidenceList[0].treeList.push(rest.result[0].treeList[0])
										 $.operateTip({"msg": "文件上传成功", "width": "150px"});
										$("#temp_catalog_refresh").click();
									}else{
										$.hy_log("tempEvidenceList为空")
									}
								}
							}
						}
					}
				});
			}
		},3000);

	}catch(e){$.hy_log("getConverReault异常:::"+e);}
}

CourtEvidencePage.prototype.initEvidenceCanvas = function(){
	 var _this = this;
	 _this.sketchpad = new Sketchpad({
         element: '#'+_this.param.canvansNode.attr("id"),
         width: this.param.canvansNode.width(),
         height:this.param.canvansNode.height(),
         canvasPNode:_this.param.canvasPNode
     });
	 
	 _this.sketchpad.drawImg("../img/image-1.jpg");
    /* $('#color-picker').change(color);
     $('#color-picker').val('#000');
     $('#size-picker').change(size);
     $('#size-picker').val(1);*/
}

//撤销
CourtEvidencePage.prototype.cancel = function(){
	this.sketchpad.undo();
}
CourtEvidencePage.prototype.redo =  function() {
	_this.sketchpad.redo();
}
//改变画笔的颜色
CourtEvidencePage.prototype.changeColor = function (event) {
	_this.sketchpad.color = $(event.target).val();
}
//改变画笔的粗细
CourtEvidencePage.prototype.changeSize = function(event) {
	_this.sketchpad.penSize = $(event.target).val();
}


/************************* 通知 *******************************/
//接收到别人切换证据通知
CourtEvidencePage.prototype.changeEvidenceReq = function(param){
	var _this = this;
	var sketchpad =  _this.sketchpad;
	sketchpad.clear();
	sketchpad.drawImg(param.src);
}

//接收到别人撤销通知
CourtEvidencePage.prototype.revokeReq = function(param) {
	try{
		var _this = this;
		var sketchpad =  _this.sketchpad;
		if(param.imgId ==  sketchpad.imgId){
			var str = sketchpad.getStrokes(param.imgId, param.seatId);
			str.pop();
			sketchpad.clear();
  			sketchpad.drawImg(sketchpad.src);
		}
	}catch(e){$.hy_log("revokeReq 异常::::"+e)}
}

//接收到别人画线通知
CourtEvidencePage.prototype.drawReq = function(param) {
	try{
		var _this = this;
		var sketchpad =  _this.sketchpad;
		
		if(param.imgId ==  sketchpad.imgId){
			var imgobj = sketchpad[param.imgId];
		    if(imgobj){
		      if(imgobj[param.seatId]){
		      }else{
		      	sketchpad[param.imgId][param.seatId] = {
					"color": _this.colorObj[param.seatId],
					"size": 5,
					"lines": [],
					canvasWidth: param.canvasWidth,
					canvasHeight: param.canvasHeight
				}
		      }
			}else{
				sketchpad[param.imgId] = {};
				sketchpad[param.imgId][param.seatId] = {
					"color": _this.colorObj[param.seatId],
					"size": 5,
					"lines": [],
					"canvasWidth": param.canvasWidth,
					"canvasHeight": param.canvasHeight
				}
			}
			$.each(param.list,function(i, e){
				sketchpad._draw(e.start, e.end, _this.colorObj[param.seatId], 5,param.canvasWidth,param.canvasHeight);
				sketchpad[param.imgId][param.seatId].lines.push({"start": e.start,"end": e.end})
			});
		}
	}catch(e){$.hy_log("revokeReq 异常::::"+e);alert(e)}
}

/************************* 首页-创建庭审 *******************************/
//创建并且开启庭审
PlatGrid.prototype.saveAndStartCourt = function(btnParam,srcData){
	$.hy_log("###########"+JSON2.stringify(btnParam));
	if(srcData.code == 0){
		var s = srcData.obj;
		this.startCourt({}, s);
	}
}

//庭审管理开庭
PlatGrid.prototype.startCourt = function(btnParam,srcData){
	var startParam = {
		  "reqType":1,
		  "msg":JSON2.stringify({
			  "trialCode": srcData.trialCode,
			  "caseName": srcData.caseName})
	 	}
	startParam= JSON2.stringify(startParam)
	QtWebObj.jsToCs(startParam);
}

//进入庭审
PlatGrid.prototype.enterCourt= function(btnParam,srcData){

	var startParam = {
		  "reqType":3,
		  "msg":JSON2.stringify({
			  "trialCode": srcData.trialCode,
			  "caseName": srcData.caseName})
	 	}
	startParam= JSON2.stringify(startParam)
	QtWebObj.jsToCs(startParam);
}
/*******************笔录***********************/
var trialCode;
PlatGrid.prototype.record=function(btnParam,srcData){
	 trialCode=srcData.trialCode 
	 $.dialog({
		title: "笔录",
		content: "<div class='choose'></div><div class='m'><div class='summernote'></div></div>" ,
		initialize: function() {},
		width: 1000,
		height: 500,
		lock: true
	});	
	
	$('.summernote').summernote({
		   height:"450px",
		   tabsize: 2,
		   lang: 'zh-CN'
	});
	
	this.addSignBtn();
}

PlatGrid.prototype.addSignBtn = function(){
	
var userid;
var iii=0
$._ajax({
    url:"../courttrialnote/list.action",
    data:{},
    success: function (res) {  
    	if(res.code == 0){
    		 $.each(res.result,function(i,n){
			   	 if(res.result[i].trialCode==trialCode){ 
			   	   $(".note-editable p").html(res.result[i].content) 
			   		userid=res.result[i].createUserId
			   	 }
		    })	
    	}
    },
    error: function (res) {       		
    }
}) 
     $(".choose").append($("<div/>").addClass("choose-btn"))
     $(".choose-btn").append($(".btn-codeview").css({"position":"absolute","left":"400px","width":"47px","height":"26px",
     "background":"rgba(70,135,255,1)","line-height":"8px","font-size":"12px","border-color":"#fff","color":"#fff","border-radius":"13px","border-width":"0px"}).html("保存"))
	 $(".choose-btn").append($("<div/>").addClass("btn-onload").attr("title","加载笔录").html("加载笔录"))
	 .append($("<div/>").addClass("btn-print").attr("title","打印").html("打印"))
	 .append($("<div/>").addClass("btn-export").attr("title","导出").html("导出"))
	 .append($("<div/>").addClass("sign-pencil").attr("title","电子签名").html("电子签名").attr("id", "sign_clear2"))
/*	 .append($("<div/>").addClass("voice glyphicon glyphicon-volume-up").attr("title","语音转写"))*/
	 $(".m").append($("<div/>").addClass("signchoiceWindow"))
	 $(".signchoiceWindow").append($("<img/>").addClass("signclosee").attr("src","../img/dengluye_guanbi.png")) 
	 $(".signchoiceWindow").append($("<div/>").addClass("tablechose").append($("<div/>").addClass("electronsign").html("电子签名")).append($("<div/>").addClass("manualsign").html("手动输入")));
	 $(".signchoiceWindow").append($("<div/>").addClass("electronicSignature").css({"width": "100%","height":"83%","background":"#fff","display":"none","padding":"10px"}))
     $(".electronicSignature").append($("<div/>").addClass("signstatus").html("各方签名状态")).append($("<div/>").css({"width":"100%","height":"90%","margin-top":"20px"})
     .append($("<div/>").addClass("sign-left").append($("<div/>").addClass("qrcode").append($("<img/>").attr("src","../img/erwei.jpg").addClass("erwei"))
     .append($("<div/>").html("使用微信扫一扫").addClass("sweep")))).append($("<ul/>").addClass("sign-right")).append($("<div/>").addClass("sign-sweep")).append($("<div/>").addClass("sign-bottom")))
     $(".sign-sweep").append($("<div/>").addClass("sign-ele"))
     $._ajax({
		    url:"../partylist/grid.action",
		    data:{"trialCode":trialCode},
		    success: function (res) {  
		    	if(res.code == 0){
		    	$.each(res.result,function(i,n){
		    		$(".sign-right").append($("<li/>").append($("<span/>").html(n.seatName+"：").css({"float":"left"})).append($("<span/>").html(n.userName).css({"margin-left":"8px","float":"left"})))
		    	})
		    	}
		    },
		    error: function (res) {       		
		    }
		}) 
	 $(".sign-bottom").append($("<span/>").html("参与人员"+0+"人已确认"+"，"+"未确认"+0+"人").css({"line-height":"20px","text-align":"left"})).append($("<div/>").addClass("witnessing").html("确认签名"))
	 var canvas = $("<div/>").css({"width": "100%","height":"83%","background":"#fff"}).addClass("manualsignbox").append(
	    $("<canvas/>").css({"width": "100%","height":"100%"}).attr("id","canvasEdit")
	   )  
	 $(".signchoiceWindow").append(canvas);
     $(".signchoiceWindow").append(
	     $("<div/>").css({"margin-top": "8px","text-align":"center"}).addClass("sign-btn").append(
   		     $("<span/>").attr("id", "sign_clear").addClass("clearcontent").html("清除")
	     ).append(
   		      $("<span/>").css({"cursor":"pointer","display": "inline-block","text-align": "center"}).addClass("uploadcontent").html("上传").bind("click", function(){
   					  takeScreenshot(function(res){
					     var img = new Image();
						 img.src = res;
						 setTimeout(function(){
							$(".signchoiceWindow").hide()
							$(".signchoiceWindow").hide();
						 }, 200);				
	   					   $._ajax({
				    	     	   url:"../main/doUploadBase64Img.action",
				    	     	   data:{"fileName":"courtnote.png","fileParams":img.src},
				    	     	   success: function (res) { 
				    	     		   if(res.code == 0){
				    	     			  $(".m").append($("<div/>").addClass("tips").html("图片上传成功").fadeToggle("slow","linear"));
					    				   setTimeout(function(){
				    							$(".tips").hide()
			    						   }, 3000);
					    				   if(res.result){
					    						var imglength=$(".note-editable").find("img").length
							    					
							    					 var starimgleft=$(".note-editable").find("img").css('left')
							    					
							    				if($(".note-editable").find("img").length==1 && platParams.loginUser.id==userid){
								    				 $(".note-editable").find("img").remove() 
								    				
								    				}	
					    						 var eachImg = $("<img/>").attr("src","http://192.168.2.132/files/plat" + res.result[0].fileUrl).addClass("signimg")
						    						.css({"width":"100%","height":"80%"});
							    	     			var imgbox=$("<div/>").addClass("imgbox").css({"position":"absolute","right":0,"top":0,"width":"20%","height":"40%","text-align":"center"})
						    				 		var imguser= $("<span/>").addClass("imguser").html(platParams.loginUser.name)
						    	     		
					    				 		if(platParams.loginUser.id==userid){
						    	     				if($(".imguser").html(' ')){
						    				 			var imguser= $("<span/>").addClass("imguser").html(platParams.loginUser.name)
									    				}
								    			}
						    	     			iii+=300
						    	     			if(platParams.loginUser.id!=userid){
					    							$(".imgbox").css({"left":iii})
					    						}
						    	     			$(".note-editable").css({"position": "relative"}).append(imgbox);
						    	     			imgbox.append(eachImg).append(imguser)
						    	     			
					    				   }
				    	     		   }else{
				    	     			  falsepicke()
				    	     		   }
			    	     		   },
				    	     	   error: function (res) {  
				    	     		  falsepicke()
			    	     		   }
			    	        }) 
   					  	});
			      	})
			     )
		    )
		
	   $(".electronsign").bind("click",function(){
		  
		 $(".electronicSignature").show()
		 $(".manualsignbox").hide()
		 $(".sign-btn").hide()
		})
		 $(".manualsign").bind("click",function(){
		 $(".electronicSignature").hide() 
		 $(".manualsignbox").show()
		 $(".sign-btn").show()
		})
	
		$(".sign-pencil").bind("click",function(){
		
			$(".signchoiceWindow").show()
			$(".signbackGround").show();
		})

		$(".signclosee").click(function() {
			$(".signchoiceWindow").hide();
		})
        $(".btn-print").bind("click",function(){
        	$(".note-editable p").printArea();
        })
        $(".btn-export").bind("click",function(){
        	$(".note-editable p").wordExport("笔录内容") 
        })
	$(document).esign("canvasEdit", "sign_show", "sign_clear","sign_clear2", "sign_ok");
     function falsepicke(){
    	  $(".m").append($("<div/>").addClass("tips").html("图片上传失败").fadeToggle("slow","linear"));

		   setTimeout(function(){
				$(".tips").hide()
		   }, 3000);
     }
     function convertCanvasToImage(canvas) {
  		  return canvas.toDataURL("image/png");
     };  	
     
     function takeScreenshot(func) {
		  //创建一个新的canvas
		 var canvas2 = document.createElement("canvas");
		 var canvasObj = document.querySelector('.canvasTest');
		 var w = parseInt($("#canvasEdit").width());   //获取目标元素的宽高
		 var h = parseInt($("#canvasEdit").height());
		 
       /* $(canvas2).css({"back"}) */
		 //将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
		 var context = canvas2.getContext("2d");
		 context.scale(2, 2);
		 canvas2.width = w * 1;
		 canvas2.height = h * 1;
		 html2canvas($("#canvasEdit")[0], {
		  //width: document.body.clientWidth / 2 + 1,
		  canvas: canvas2
		 }).then(function(canvas) {
		  var imgUrl = convertCanvasToImage(canvas); //截取图片路径,该路径为服务器参数
		  func && func(imgUrl);
		 });
	};
}

/**********************************************/
//cs调js方法
function csToJs(param){
	//$.hy_log("!!!!!!!!!!!!!!"+JSON2.stringify(param))
	try{
		var reqType = param.reqType*1;
		if(reqType == 1){//开庭
			
		}else if( reqType == 2){//设置庭审状态
			var json = JSON2.parse(param.msg);
			$._ajax({
				"url": "../court/modifyTrialStatus.action",
				"data": {
					"trialCode": json.trialCode,
					"status":json.status
				},
				"success": function(res){
					$.hy_log(JSON2.stringify(res))
				}
			});
		}else if( reqType == 7){//举证质证页面透传消息
			var json = JSON2.parse(param.msg);
			if(courtEvidence){
				if(json.operateType){
					courtEvidence[json.operateType](json);
				}else{
					courtEvidence.drawReq({
						"seatId": 1,
						"imgId": courtEvidence.sketchpad.imgId,
						"canvasWidth": 654,
						"canvasHeight":541,
						"list": [{"start":{"x":456,"y":140},"end":{"x":454,"y":140}},{"start":{"x":454,"y":140},"end":{"x":452,"y":140}},{"start":{"x":452,"y":140},"end":{"x":446,"y":139}},{"start":{"x":446,"y":139},"end":{"x":441,"y":138}},{"start":{"x":441,"y":138},"end":{"x":424,"y":137}},{"start":{"x":424,"y":137},"end":{"x":409,"y":137}},{"start":{"x":409,"y":137},"end":{"x":402,"y":137}},{"start":{"x":402,"y":137},"end":{"x":387,"y":137}},{"start":{"x":387,"y":137},"end":{"x":375,"y":137}},{"start":{"x":375,"y":137},"end":{"x":372,"y":137}},{"start":{"x":372,"y":137},"end":{"x":367,"y":137}},{"start":{"x":367,"y":137},"end":{"x":366,"y":137}},{"start":{"x":366,"y":137},"end":{"x":362,"y":138}},{"start":{"x":362,"y":138},"end":{"x":354,"y":142}},{"start":{"x":354,"y":142},"end":{"x":352,"y":144}},{"start":{"x":352,"y":144},"end":{"x":345,"y":149}},{"start":{"x":345,"y":149},"end":{"x":344,"y":151}},{"start":{"x":344,"y":151},"end":{"x":341,"y":158}},{"start":{"x":341,"y":158},"end":{"x":339,"y":167}},{"start":{"x":339,"y":167},"end":{"x":339,"y":172}},{"start":{"x":339,"y":172},"end":{"x":339,"y":180}},{"start":{"x":339,"y":180},"end":{"x":339,"y":184}},{"start":{"x":339,"y":184},"end":{"x":339,"y":189}},{"start":{"x":339,"y":189},"end":{"x":339,"y":199}},{"start":{"x":339,"y":199},"end":{"x":342,"y":204}},{"start":{"x":342,"y":204},"end":{"x":351,"y":213}},{"start":{"x":351,"y":213},"end":{"x":357,"y":217}},{"start":{"x":357,"y":217},"end":{"x":370,"y":219}},{"start":{"x":370,"y":219},"end":{"x":386,"y":219}},{"start":{"x":386,"y":219},"end":{"x":393,"y":219}},{"start":{"x":393,"y":219},"end":{"x":411,"y":217}},{"start":{"x":411,"y":217},"end":{"x":420,"y":213}},{"start":{"x":420,"y":213},"end":{"x":433,"y":207}},{"start":{"x":433,"y":207},"end":{"x":441,"y":204}},{"start":{"x":441,"y":204},"end":{"x":444,"y":201}},{"start":{"x":444,"y":201},"end":{"x":447,"y":200}},{"start":{"x":447,"y":200},"end":{"x":449,"y":198}},{"start":{"x":449,"y":198},"end":{"x":450,"y":197}},{"start":{"x":450,"y":197},"end":{"x":451,"y":191}},{"start":{"x":451,"y":191},"end":{"x":453,"y":184}},{"start":{"x":453,"y":184},"end":{"x":453,"y":176}},{"start":{"x":453,"y":176},"end":{"x":453,"y":165}},{"start":{"x":453,"y":165},"end":{"x":453,"y":162}},{"start":{"x":453,"y":162},"end":{"x":453,"y":156}},{"start":{"x":453,"y":156},"end":{"x":453,"y":155}},{"start":{"x":453,"y":155},"end":{"x":450,"y":151}},{"start":{"x":450,"y":151},"end":{"x":450,"y":147}},{"start":{"x":450,"y":147},"end":{"x":449,"y":145}},{"start":{"x":449,"y":145},"end":{"x":448,"y":143}},{"start":{"x":448,"y":143},"end":{"x":447,"y":143}},{"start":{"x":447,"y":143},"end":{"x":447,"y":142}}]
					})
				}
			}
		}else if( reqType == 4){//
			
		}

	}catch(e){alert(e)}
}

//根据url获取庭审编码
function getTrialCodeByUrl(){
	var trialCode;
	try{
		var url = window.location.href;
		var urlL = url.split("&");
		if(urlL.length){
			$.each(urlL, function(i, e){
				var p = e.split("=");
				if(p && p.length){
					if(p[0]=="trialCode"){
						trialCode = p[1];
					}
				}
			});
		}
	}catch(e){console.log(e)}
	
	return trialCode;
}

