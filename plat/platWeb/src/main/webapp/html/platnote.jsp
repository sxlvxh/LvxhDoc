<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>

<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box">
				<div class="box-body" id="datagrid">
				<div class="choose"></div>
				  <div class="m">		
					<div class="summernote"></div>
				  </div>
				</div>
			</div>
		</div>
	</div>
</section>
	
<style>
	.m{ width:100%; height:94%;padding:0px 10px;}
	
</style>
<link rel="stylesheet" type="text/css" href="${filesServerVisit}/dist/bootstrap.css">

<link href="${filesServerVisit}/dist/summernote.css" rel="stylesheet">
<script type="text/javascript" src="${filesServerVisit}/js/utils/qwebchannel.js"></script>
<script type="text/javascript" src="${filesServerVisit}/websocket/websocket.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/jquery.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/json2.js"></script>
<script src="${filesServerVisit}/dist/bootstrap.min.js"></script>
<!-- 文档导出  -->
<script src="${filesServerVisit}/sign/FileSaver.js"></script>
<script src="${filesServerVisit}/sign/jquery.wordexport.js"></script>

<script type="text/javascript" src="${filesServerVisit}/js/utils/constants.js"></script>
<script type="text/javascript">

	var platParams = ${platConfig};
	platParams.SHOW_RESULT_DIALOG = 1;
	platParams.loginUser = ${loing_user};
	var productParams = JSON2.parse(platParams.platProduct.productParams);
</script>

<script type="text/javascript" src="${filesServerVisit}/js/utils/plat_util.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/plat.js"></script>
<script>	
if(PLAT){
	PLAT.loginName = platParams.loginUser.userCode+"_NOTE";
}
	
</script>
<script src="${filesServerVisit}/dist/summernote.js"></script>
<script src="${filesServerVisit}/dist/lang/summernote-zh-CN.js"></script>  
<!-- 文档打印  -->
<script src="${filesServerVisit}/dist/jQuerymin.js"></script>  
<script src="${filesServerVisit}/sign/bluebird.js"></script> 
<script src="${filesServerVisit}/sign/esign.js"></script> 
<script src="${filesServerVisit}/sign/html2canvas.min.js"></script> 
<script type="text/javascript" src="${filesServerVisit}/js/utils/sie-client.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/utils/sie-server.js"></script>
<script type="text/javascript">
var filesServerVisit =  "${filesServerVisit}";
function NotePage (){
	
}

//canvas to img
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

function falsepicke(){
  $(".m").append($("<div/>").addClass("tips").html("图片上传失败").fadeToggle("slow","linear"));

   setTimeout(function(){
		$(".tips").hide()
   }, 3000);
}


NotePage.prototype.addVoiceNote = function(opt){
	var user = userObj[opt.userDomainCode+"_"+opt.userCode];
	var name = opt.userCode;
	if(user){
		name = user.name+"（"+user.userTypeName+"）";
	}
	var div = $("<div/>").attr("id", opt.msgID).html(name+":"+opt.msg);
	var brforeNode = $("#"+(opt.msgID-1), $(".note-editable p"));
	var nowNode = $("#"+opt.msgID, $(".note-editable p"));

	if(nowNode.length){
		div.html(name+":"+opt.msg);
	}else{
		if(brforeNode.length > 0){
			brforeNode.after(div);
		}else{
			$(".note-editable p").append(div);
		}
	}

}

NotePage.prototype.addSignBtn = function(){
	var userid;
	var iii=0
	/* $._ajax({
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
	})  */
     $(".choose").append($("<div/>").addClass("choose-btn"));
     $(".choose-btn").append(
   		 $(".btn-codeview").css({"position":"absolute","left":"400px","width":"47px","height":"26px",
     		"background":"rgba(70,135,255,1)","line-height":"8px","font-size":"12px","border-color":"#fff","color":"#fff","border-radius":"13px","border-width":"0px"}).html("保存").bind("click",function(){
     			
     		})
     	)
	 $(".choose-btn").append(
		 $("<div/>").addClass("btn-onload").attr("title","加载笔录").html("加载笔录")
	 ).append(
		 $("<div/>").addClass("btn-print").attr("title","打印").html("打印")
	 ).append(
		$("<div/>").addClass("btn-export").attr("title","导出").html("导出")
	 ).append(
		$("<div/>").addClass("sign-pencil").attr("title","电子签名").html("电子签名").attr("id", "sign_clear2")
	 );
/*	 .append($("<div/>").addClass("voice glyphicon glyphicon-volume-up").attr("title","语音转写"))*/
	 $(".m").append(
		$("<div/>").addClass("signchoiceWindow")
	 );
	 $(".signchoiceWindow").append(
		$("<img/>").addClass("signclosee").attr("src",filesServerVisit+"theme/default/images/dengluye_guanbi.png")
	 );
	 
	 $(".signchoiceWindow").append(
		$("<div/>").addClass("tablechose").append(
			$("<div/>").addClass("electronsign").html("电子签名")
		).append(
			$("<div/>").addClass("manualsign").html("手动输入")
		)
	 );
	 $(".signchoiceWindow").append(
		$("<div/>").addClass("electronicSignature").css({"width": "100%","height":"83%","background":"#fff","display":"none","padding":"10px"})
	 )
     $(".electronicSignature").append(
    	$("<div/>").addClass("signstatus").html("各方签名状态")
     ).append(
    	$("<div/>").css({"width":"100%","height":"90%","margin-top":"20px"}).append(
    		$("<div/>").addClass("sign-left").append(
    			$("<div/>").addClass("qrcode").append(
    				$("<img/>").attr("src","../img/erwei.jpg").addClass("erwei")
    			).append(
    				$("<div/>").html("使用微信扫一扫").addClass("sweep")
    			)
    		)
    	).append(
    		$("<ul/>").addClass("sign-right")
    	).append(
    		$("<div/>").addClass("sign-sweep")
    	).append(
    		$("<div/>").addClass("sign-bottom")
    	)
    );
     $(".sign-sweep").append($("<div/>").addClass("sign-ele"))
    /*  $._ajax({
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
	})  */
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
			
			//签名
		   $(".electronsign").bind("click",function(){
				 $(".electronicSignature").show()
				 $(".manualsignbox").hide()
				 $(".sign-btn").hide()
			});
	     
		   $(".manualsign").bind("click",function(){
				 $(".electronicSignature").hide() 
				 $(".manualsignbox").show()
				 $(".sign-btn").show()
			});
		
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
}


NotePage.prototype.geMeetingMember = function (){
	$._ajax({
 		"url": "../platmeetinguserlist/list.action",
 		"data": {
 			"meetingDomainCode": meetingDomainCode,
 			"meetingId": meetingId},
 		"success": function(res){
 			if(res.code == 0){
 				var list = [];
 				var memberList = [];
 				$.each(res.result, function(i, e){
 					list.push({
 						"domainCode": e.meetingJoinDomainCode,
 						"userCode":e.meetingJoinUserCode});
 					
 					if(!(e.meetingJoinUserCode == platParams.loginUser.userCode && e.meetingJoinDomainCode == platParams.loginUser.domainCode)){
 						memberList.push(e.meetingJoinUserCode+"_NOTE");
					}
 					
 					//memberList.push(e.meetingJoinUserCode)
 				});
 				 csSdk.meetingMember = memberList;
 				
 				$._ajax({
 					"url": "../platuser/getUserListBylist.action",
 					"data":list,
 					"success":function(res){
 						if(res.code == 0){
 							$.each(res.result, function(i, e){
 								userObj[e.domainCode+"_"+e.userCode] = e;
 							});
 							//func && func(list);
 						}else{
 							$.operateTip({"msg": "查询用户数据失败" ,"width": "150px"});
 						}
 						
 					}
 				})
 			}
 		}
 	});
}

NotePage.prototype.getHistoryNote = function(){
	$._ajax({
		"url": "../platnote/list.action",
		"data": {"relateCode": meetingId},
		"success": function(res){
			if(res.code == 0 && res.result && res.result.length){
			   noteData = res.result[0];
			   $(".note-editable p").html(res.result[0].content) 
			}else{
				$._ajax({
					"url": "../platnote/insert.action",
					"data": {"relateCode": meetingId},
					"success": function(res){
						if(res){
							noteData = res.obj;
						}
					}
				});
			}
		}
	});
}

var userObj = {};
var noteData;
var meetingId,serviceCode,meetingDomainCode;
$(function(){
	try{
		var url = window.location.href;
		url = url.split("?");
		if(url.length >1){
			url = url[1].split("&");
			$.each(url, function(i, e){
				var eu = e.split("=");
				if(eu[0]=="serviceCode"){
					serviceCode = eu[1];
				}else if(eu[0] == "meetingID"){
					meetingId = eu[1];
				}else if(eu[0] == "meetingDomainCode"){
					meetingDomainCode = eu[1];
				}
			})
			
		}
		
	 	$('.summernote').summernote({
	        height:"80%",
	        tabsize: 2,
	        lang: 'zh-CN'
	    });
		
	 	initCsSdk();
	 	var note = new NotePage();
	 	note.getHistoryNote();
	 	NotePage.prototype.addSignBtn();
	 	note.geMeetingMember();
	 	
	 	
	 	
	}catch(e){alert(e)}
});


function saveNoteFunc(htmlconytent){
	$._ajax({
		"url": "../platnote/update.action",
		"data": {"id": noteData.id,"content":htmlconytent},
		"success": function(res){
			if(res.code == 0){
			   $(".m").append($("<div/>").addClass("tips").html("保存成功").fadeToggle("slow","linear"))
			   setTimeout(function(){
				 $(".tips").hide()
			   }, 3000);
			}
		}
	});
	
	return;
	
	$._ajax({
	   url:"../main/upHtmlFile.action",
	   data:{"fileName":"courtnote.html","fileParams":htmlcomplete},
	   success: function (res) { 
		  var  fileCodee= res.result[0].fileCode
		   if(res.code == 0 ){
			   $(".m").append($("<div/>").addClass("tips").html("文件上传成功").fadeToggle("slow","linear"))
			   setTimeout(function(){
						$(".tips").hide()
					 }, 3000);
				$._ajax({
	    	     	   url:"../main/converter.action",
	    	     	   data:{"fileCode":fileCodee,"fileConverterStatus":"7"},
	    	     	   success: function (data) {  
	    	     		 },
	    	     		error: function (data) {  
	    	     		
	    	     		}
	    	        }) 
	    	      
	    	        $._ajax({
		    	     	   url:"../courttrialnote/insert.action",
		    	     	   data:{"fileCode":fileCodee,"fileConverterStatus":"7","content":htmlconytentremove,"trialCode":trialCode},
		    	     	   success: function (ress) {              
		    	     	   },
		    	     		error: function (res) {  
		    	     		}
		    	        })   
		   }
		 },
		error: function (res) {
			 alert(JSON.stringify(res.result))
		}
   })
	
}
</script>