<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> -->
<meta http-equiv="X-UA-Compatible" content="IE=10,IE=9" />
<meta charset="utf-8" />
<title></title>
<meta name="description" content="User login page" />
<meta name="viewport"content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
<link rel="shortcut icon" href='<c:url value="/favicon.ico" />' />
<link rel="stylesheet" href="../ace/assets/css/bootstrap.css" />
<link rel="stylesheet" href="../ace/assets/css/font-awesome.css" />
<link rel="stylesheet" href="../ace/assets/css/ace-fonts.css" />
<link rel="stylesheet" href="../ace/assets/css/ace.css" />
<!--[if lte IE 9]><link rel="stylesheet" href="../ace/assets/css/ace-part2.css" /><![endif]-->
<link rel="stylesheet" href="../ace/assets/css/ace-rtl.css" />
<link rel="stylesheet" href="${filesServerVisit}/css/lweb.css" />
<!--[if lte IE 9]><link rel="stylesheet" href="../ace/assets/css/ace-ie.css" /><![endif]-->
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]><script src="../ace/assets/js/html5shiv.js"></script><script src="../ace/assets/js/respond.js"></script><![endif]-->
<script type="text/javascript" src='${filesServerVisit}/js/jquery.js'></script>
<script type="text/javascript" src='${filesServerVisit}/js/json2.js'></script>
<script type="text/javascript" src="${filesServerVisit}/js/utils/cookie-util.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/utils/plat_util.js"></script>
<script type="text/javascript">
var platParams = ${platConfig};
var productParams = JSON2.parse(platParams.platProduct.productParams);
var filesServerVisit = '${filesServerVisit}';
$(function(){
	$("title").html(platParams.platProduct.productName);
	$("#user-img").attr({"src":"${filesServerVisit}/theme/" + productParams.theme + "/login_page/user-nocheck.png"});
	$("#password-img").attr({"src":"${filesServerVisit}/theme/" + productParams.theme + "/login_page/password-nocheck.png"});
	$("#platLogo").attr({"src":"${filesServerVisit}/theme/" + productParams.theme + productParams.logo});
	$("#bgImg").attr({"src":"${filesServerVisit}/theme/" + productParams.theme + productParams.bgImg});
	$("#platTitle").html(platParams.platProduct.productName);
	$("input#loginName").bind("focus",function(){
		$("#user-img").attr("src","${filesServerVisit}/theme/" + productParams.theme + "/login_page/user-check.png");
		$("#password-img").attr("src","${filesServerVisit}/theme/" + productParams.theme + "/login_page/password-nocheck.png");
		$(this).css({"border":"1px solid #ffb72c"});
		$("input#password").css({"border":"1px solid #b5b5b5"});
	});
	$("input#password").bind("focus",function(){
		$("#user-img").attr("src","${filesServerVisit}/theme/" + productParams.theme + "/login_page/user-nocheck.png");
		$("#password-img").attr("src","${filesServerVisit}/theme/" + productParams.theme + "/login_page/password-check.png");
		$(this).css({"border":"1px solid #ffb72c"});
		$("input#loginName").css({"border":"1px solid #b5b5b5"});
	});
	$("#form-login").attr({"action":productParams.loginAction});
	
	if(productParams.downLoadActive === true)
	{
		$("#downloadActive").show();
	}
	$("#login_button").bind("click",function(){
		 $("#form-login").submit();
	 });
	 
	$(document).keydown(function(event) {
		if (event.keyCode == 13) {
			$('#login_button').click();
		}
	});
	
	var opts = {url:"../main/getSoftUrl.action",data:{"softCode":"381de24ae80c458a856ebfd020443dfb"},success:function(res){
		if(res.code == 0)
		{
		   $("#downloadActive").attr({href:res.obj.filePath});
		}
	}};
	
	$._ajax(opts);
	
});
</script>
<style>
.btn-primary, .btn-primary:focus {
	border-radius: 5px;
}

.login-container {
	margin: 100px auto;
	width: 400px;
}
.bigger-125
{
 color:#fff;
}
.login-box-bg{
     background: rgba(152, 179,204,0.4);
     /* filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#6698b3cc,endColorstr=#6698b3cc);  */
     width:504px;
     height:326px;
     /* background:#98b3cc; */
     -ms-filter:alpha(opacity=50); 
     -moz-opacity:0.5;
     border-radius:2px;
     /* opacity:0.5; */
     float:left;
}
.login_button-submit{
     width: 310px;
     height:42px;
     background:#ffb72c;
     margin-left:85px;
     border-radius:2px;
     text-align:center;
     line-height:42px;
     margin-top:5px;
     cursor:pointer;
}
.login-user-input,.login-password-input{
     width:310px;
     height:42px;
     text-indent:32px;
     font-size:14px;
     color:#3f3f3f;
     border-radius:2px;
}
.login-user-input{
     margin:0 auto;
}
.login-password-input{
    margin:5px auto;
}
.QR-code-page{
    /* width:350px;
    position:relative;
   float:right;
    bottom:295px;
    margin-left:61.6%; */
    margin-top:146px;
    height: 115px;
}
.QR-code-ul{
	 height: 115px;
}
.QR-code-ul li{
    margin-top:15px; 
     height: 115px;
}

.QR-code-panel-ul{
	height:0px;
	position: relative;

}
.QR-code-panel-ul li{
	position: absolute;
	right: 104px;
}
</style>
</head>
<body class="login-layout blur-login">
	<div class="main-container">
	    <div class="main-content">
	         <img id="bgImg" class="me_icon" src="" style="height: 100%; width: 100%; left: 0px; z-index: -20; position: absolute;">
	         <div class="row">
	             <div class="col-sm-10 col-sm-offset-1">
	                 <div class="login-container" style = "width:505px;">
	                      <div class="center">
	                          <img id="platLogo" class="me_icon" style="width: 105px; height: 105px;margin-top:5px;" src="">
							  <h1>
								  <span class="red"></span>
								  <span id="platTitle" class="block white" id="id-text2" style="font-size:26px;font-weight:bold;margin-top:25px;font-family:Microsoft YaHei;"></span>
							  </h1>
							  <%-- <h4 style="color:#a9d1ff !important;" id="id-company-text">${ActiveProductHolder.productPrefixTitle}</h4> --%>
	                      </div>
	                      <!-- <div class="space-6"></div> -->
	                      <div class="position-relative" style = "margin-top:40px;width:900px;border:1px solid transparent;height:328px;">
	                           <div id="login-box" class="login-box-bg">
	                                <div class="" style = "height:326px;">
	                                     <div class="widget-main">
	                                          <div class="space-6"></div>
	                                          <div id="error_message" style="color: red; height: 25px;margin-left:85px;font-size:14px;">${LICENSE_DAYS}  ${LOGIN_ERROR_MESSAGE}</div>
	                                          <fieldset>
	                                               <form id="form-login" action='' method="post" style="margin: 0 0 10px 0;">
	                                                    <label class="block clearfix">
														    <span class="block input-icon input-icon-right">
														        <img id="user-img" src='' style ="position:absolute;left:85px;z-index:99;"/> 
														        <input type="text" class="form-control login-user-input" id="loginName" name="loginName" placeholder="请输入登录账号"/> 
														        <!-- <i class="ace-icon fa fa-user"></i> -->
														    </span>
														</label>
														 <label class="block clearfix">
														     <span class="block input-icon input-icon-right"> 
														        <img id="password-img" src='' style ="position:absolute;left:85px;z-index:99;"/> 
														        <input name="password" type="password" id="password" class="form-control login-password-input" placeholder="请输入登录密码"/> 
														        <!-- <i class="ace-icon fa fa-lock"></i> -->
														     </span>
														</label>
		                                                <div class="clearfix" style = "margin-top:-5px;">
															<label class="inline" style="margin-left:85px;"> <input type="checkbox"
																class="ace" /> <span class="lbl" style = "color:#fff;font-size:13px;"> 记住密码</span>
															</label>
															<a id="downloadActive" href=""  style="float: right;margin-top: 10px;margin-right:85px;color:#fff;font-size:13px; display: none">客户端下载</a>
														</div>
														<div class="clearfix">
															<a id="login_button" type="submit" class="login_button-submit" style="">
																<span class="" style = "font-size:18px;color:#fff;font-weight:normal; letter-spacing:5px;"> 登录</span>
															</a>
														</div>
														<div class="space-4"> </div>
	                                               </form>
	                                          </fieldset>
	                                     </div>
	                                </div>
	                           </div>
	                            <div class = "QR-code-page" >
								    <ul class = "QR-code-ul" style = "">
								        <li style = "">
								            <img id="ios-code" src='${filesServerVisit}/theme/default/login_page/ios.png' style = "cursor:pointer;margin-left:117px;"/>
								        </li>
								        <li >
								            <img id="android-code" src='${filesServerVisit}/theme/default/login_page/android.png' style = "cursor:pointer;margin-left:117px;"/>
								        </li>
								    </ul>
								    <ul class = "QR-code-panel-ul" >
								        <li style = "display:none; margin-top: -20px;"  id ="ios-panel">
								            <img src='${filesServerVisit}/theme/default/login_page/code-pacel.png' style="float:left;position:relative;bottom:105px;"/>
								            <img src="../main/getQRCode.action?softCode=59be9c21106f461e8f7fcd2f0d795758" style="width:90px;position:relative;bottom:97px;right:110px;"/>
								            <span style = "position:relative;bottom:35px;right:200px;color:#fff;">扫码下载APP</span>
								        </li>
								        <li style = "display:none; top: 55px" id ="android-panel">
								            <img src='${filesServerVisit}/theme/default/login_page/code-pacel.png' style="float:left;position:relative;bottom:50px;"/>
								            <img src="../main/getQRCode.action?softCode=4df7fabbd1a849a2b0eacf329999852a" style="width:90px;position:relative;bottom:41px;right:110px;"/>
								            <span style = "position:relative;color:#fff;right:200px;top:19px;">扫码下载APP</span>
								        </li>
								    </ul>
								</div> 
	                      </div>
	                 </div>
	             </div>
	         </div>
	    </div>
	</div>
	
	<div id="system_ocx_div">
	</div>
	<!--[if !IE]> -->
	<script type="text/javascript">
			window.jQuery || document.write("<script src='../ace/assets/js/jquery.js'>"+"<"+"/script>");
	</script>
	<!-- <![endif]-->
	<!--[if IE]>
			<script type="text/javascript">
			 window.jQuery || document.write("<script src='../ace/assets/js/jquery1x.js'>"+"<"+"/script>");
			</script>
	<![endif]-->
	<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../ace/assets/js/jquery.mobile.custom.js'>"
							+ "<"+"/script>");
	</script>
	<script  type="text/javascript" src="${filesServerVisit}/js/utils/cookie-util.js"></script>
</body>
</html>
