<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>SIEVIDEO</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <script type="text/javascript" src="../main/jquery.js"></script>
  <script type="text/javascript" src="../main/json2.js"></script>
  <script type="text/javascript" src="../main/HyRtcSdk.js"></script>
  <style>
  html,body{
  padding: 0px;
  margin: 0px;
  overflow: hidden;
  }
  body{
    background-image: url("../main/bg.png");
   background-repeat:no-repeat;
   background-size:cover;
  /*   -moz-background-size:100% 100%;  
    background-size:100% 100%;   */
  }
  </style>
</head>
<body class="login-layout blur-login" >
  
	 <!-- <canvas id="test0" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test1" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test2" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test3" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test4" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test5" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test6" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test7" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test8" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test9" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test10" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test11" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test12" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test13" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test14" style="width:200px;height:200px; border:1px solid red;"></canvas>
	<canvas id="test15" style="width:200px;height:200px; border:1px solid red;"></canvas> -->
</body>
<script>
var hysdk;
   $(function(){
	   var ent = ${PlatEntHolder};
	   var pa = JSON2.parse(ent.entParams);
        var addr = pa.extranetWs;
        console.log(addr);
        hysdk = new HySdk(addr,function(){
        
        });
/*         
        
        self.registParam.strUserID = document.getElementById("userid").value;
    	self.registParam.strUserName = document.getElementById("username").value;
    	self.registParam.strServerIP = document.getElementById("serverip").value;
    	self.registParam.nServerPort = document.getElementById("serverport").value * 1;
    	
      self.captureParam.captureLevel =  document.getElementById("capturelevel").value * 1;
      self.captureParam.audioType = document.getElementById("AudioType").value * 1;
      if (self.captureParam == eAudioTypePCMA) {
        self.captureParam.audioSamplerate = 8000
      }else{
        self.captureParam.audioSamplerate = document.getElementById("AudioSamplerate").value * 1;
      } */
/*        var opt = {
    		   strUserID : UUID(),
    		   strUserName: UUID(),
    		   strServerIP:pa.extranet,
    		   nServerPort:pa.extranetPort
       }      
       console.log(" ========== ",opt);
       hysdk.regist(opt, function(msg){
    	  console.log(" --------------- " + msg);
       });
       
       
      setTimeout(function(){
      },2000);
 */    	
        	/* $.each($("canvas"),function(i,n){
		        setTimeout(function(){
				        var canvas = document.getElementById("test"+i);
				        if (!canvas) {
				       	  alert("q")
				       	  return false
				       	}
				        var config = {
				  		  canvas: canvas,
				  		  aec: 0
				  		}
				        /**
				        var serviceUrl = document.getElementById("serviceUrl").innerText;
                  if (serviceUrl.length <= 0) return;
                  self.playid = self.hysdk.startPlayServiceUrl(serviceUrl, config, function (e) {
                      console.log("play error " + e.errorno + " status " + e.desc + ".");
                      if (e.error >= 0) {
                          logger.logInfo("Finished.");
                      }
                      
                      
                      var playerId = hysdk.startPlayUrl("rtsp://192.168.2.218:554/2268/rtsp://192.168.2.218:5544/5273/rtsp://192.168.2.218:5544/1/2?", config, function (e) {
				       	  console.log('play error ' + e.errorno + ' status ' + e.desc + '.')
				       	  if (e.error >= 0) {
				
				       	  }
				       	})
                  });*/
				    /**    var playerId = hysdk.startPlayServiceUrl(n.codes, config, function (e) {
				       	  console.log('play error ' + e.errorno + ' status ' + e.desc + '.')
				       	  if (e.error >= 0) {
				
				       	  }
				       	})
				        canvas.width = window.innerWidth;
				        canvas.height= window.innerHeight;
		        		
		        },1000+(i+2));
        	}) */
       /* var self = this
const canvasId = id
var canvas = document.getElementById(canvasId)
if (!canvas) {
  vueData.$message({
    message: 'No Canvas with id ' + canvasId + '!',
    type: 'error'
  })
  return false
}
var config = {
  canvas: canvas,
  aec: self.audioAec
}
self.zoom = false
var rtspUrls = rtspUrl
self.playid = self.hysdk.startPlayUrl(rtspUrls, config, function (e) {
  console.log('play error ' + e.errorno + ' status ' + e.desc + '.')
  if (e.error >= 0) {

  }
})
var timeTrack = document.getElementById('timeTrack')
var timeLabel = document.getElementById('timeLabel')
self.hysdk.setPlayTrack(self.playid, timeTrack, timeLabel)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
return true */
        
        
        
   });
   function startVideo(params)
   {
	   if(params)
		   {
		       var pnode = $("body");
				   pnode.empty();
			   $.each(params.codes,function(i,n){
				   console.log(n);
				   pnode.append($("<canvas/>").attr({"id":n.id}).css({width:n.width,height:n.height,border:"1px solid red"}));
				   var canvas = document.getElementById(n.id);
				   var config = {
					  		  canvas: canvas,
					  		  aec: 0
					  		}
				   console.log(n.codes,config);
				        var playerId = hysdk.startPlayServiceUrl(n.codes, config, function (e) {
				       	  console.log('play error ' + e.errorno + ' status ' + e.desc + '.')
				       	  if (e.error >= 0) {
				
				       	  }
				       	})
					        canvas.width = window.innerWidth;
					        canvas.height= window.innerHeight;
			   });
		   }
	   
   }
   var playerId;
   function startRtspVideo(params)
   {
	   if(playerId > 0){
		   hysdk.stopPlay(playerId);
	   }
	   if(params)
		   {
		       var pnode = $("body");
				   pnode.empty();
				  /*  pnode.append($("<button/>").html("test").bind("click",function(){
					   hysdk.playFullscreen(playerId);
				   })); */
			   $.each(params.codes,function(i,n){
				   console.log(n);
				   pnode.append($("<canvas/>").attr({"id":n.id}).css({width:n.width,height:n.height,border:"0px solid red"}));
				   var canvas = document.getElementById(n.id);
				   var config = {
					  		  canvas: canvas,
					  		  aec: 0
					  		}
				   console.log(n.codes,config);
				        playerId = hysdk.startPlayUrl(n.codes, config, function (e) {
				       	  console.log('play error ' + e.errorno + ' status ' + e.desc + '.')
				       	  if (e.error >= 0) {
				
				       	  }
				       	})
					        canvas.width = window.innerWidth;
					        canvas.height= window.innerHeight;
					       
			   });
		   }
	   
   }
   
function UUID(){
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
	}
</script>
</html>
