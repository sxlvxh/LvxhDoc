<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">
	<head>
	
	  <meta charset="utf-8">
  <title>ECS</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
		<link rel="stylesheet" href="../ace/assets/css/bootstrap.css" />
		<link rel="stylesheet" href="../ace/assets/css/font-awesome.css" />
		<link rel="stylesheet" href="../ace/assets/css/ace-fonts.css" />
		<link rel="stylesheet" href="../ace/assets/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />
		<!--[if lte IE 9]>	<link rel="stylesheet" href="../ace/assets/css/ace-part2.css" class="ace-main-stylesheet" />    <link rel="stylesheet" href="../ace/assets/css/ace-ie.css" /><![endif]-->
		<link href="${filesServerVisit}/artDialog-5.0.3/skins/blue.css" rel="stylesheet" type="text/css" />
		<link href="${filesServerVisit}/baidu/css/indoor_min.css" rel="stylesheet" type="text/css">
		<link href="${filesServerVisit}/baidu/css/DrawingManager_min.css" rel="stylesheet" type="text/css">
		<link rel="stylesheet" href="${filesServerVisit}/css/spectrum.css" />
		<link rel="stylesheet" href="${filesServerVisit}/edit_select/css/editSelect.css" rel="stylesheet">
		<link rel="stylesheet" href="${filesServerVisit}/css/plat.css" />
		<link rel="stylesheet" href="${filesServerVisit}/calender/css/calender.css" />
		<link rel="stylesheet" href="${filesServerVisit}/upfile/css/upfile.css" />
		
		<script type="text/javascript" src="${filesServerVisit}/js/jquery.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/js/json2.js"></script>
		<!--[if !IE]>  <script type="text/javascript">	 window.jQuery || document.write("<script src='../ace/assets/js/jquery.js'>"+"<"+"/script>");  </script><![endif]-->
		<!--[if IE]>  <script type="text/javascript">	 window.jQuery || document.write("<script src='../ace/assets/js/jquery1x.js'>"+"<"+"/script>");	</script> <![endif]-->
		<script type="text/javascript">	if('ontouchstart' in document.documentElement) document.write("<script src='../ace/assets/js/jquery.mobile.custom.js'>" + "<"+"/script>");</script>
		<script src="../ace/assets/js/bootstrap.js"></script>
		<script src="../ace/assets/js/ace/elements.aside.js"></script>
		<script src="../ace/assets/js/ace/ace.js"></script>
		<script src="../ace/assets/js/ace/ace.sidebar.js"></script>
		<script src="../ace/assets/js/ace/ace.sidebar-scroll-1.js"></script>
		<script src="../ace/assets/js/ace/ace.submenu-hover.js"></script>
		<script src="../ace/assets/js/ace/ace.widget-box.js"></script>
		<script src="../ace/assets/js/ace/ace.widget-on-reload.js"></script>
		<script src="../ace/assets/js/ace/ace.widget-on-reload.js"></script>
		<script src="../ace/assets/js/bootstrap-wysiwyg.js"></script>
			
		<script type="text/javascript"	src="${filesServerVisit}/artDialog-5.0.3/source/jquery.artDialog.js"></script>
		<script type="text/javascript"	src="${filesServerVisit}/artDialog-5.0.3/source/artDialog.plugins.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/js/utils/constants.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/js/utils/plat_util.js"></script>
		
		<!-- 引入rtc sdk  -->
		<%-- <script type="text/javascript" src="${filesServerVisit}/hyRtc/layui/layui.js"></script> --%>
		<!-- <script type="text/javascript" src="../sie/HyRtcSdk.js"></script> -->
		
		<%@ include file="../html/include/common.jsp"%>
		
		<%-- <script type="text/javascript" src="${filesServerVisit}/js/utils/rtc_util.js"></script> --%>
		
        <script type="text/javascript" src="${filesServerVisit}/js/utils/qwebchannel.js"></script>
	<%-- 	<script type="text/javascript" src="${filesServerVisit}/websocket/websocket.js"></script> --%>
		<script type="text/javascript" src="${filesServerVisit}/js/validation.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/js/render.js"></script>
		
		<script type="text/javascript" src="${filesServerVisit}/calender/js/calender.js"></script>
		
        <%-- <script type="text/javascript" src="${filesServerVisit}/js/utils/sie-client.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/js/utils/sie-server.js"></script> --%>
		<script type="text/javascript" src="${filesServerVisit}/js/spectrum.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/edit_select/js/editSelect.js"></script>
		<%-- <link rel="stylesheet" href="${filesServerVisit}/hysdk/css/demo.css"/> --%>
		<script type="text/javascript" src='${filesServerVisit}/hysdk/js/img64.js'></script>
		<script type="text/javascript" src='${filesServerVisit}/hysdk/js/adapter.min.js'></script>
		<script type="text/javascript" src="${filesServerVisit}/hysdk/js/jquery.blockUI.min.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/hysdk/js/bootbox.min.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/hysdk/js/spin.min.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/hysdk/js/toastr.min.js"></script>
		<script type="text/javascript" src='${filesServerVisit}/hysdk/js/janus.js'></script>
		<script type="text/javascript" src='${filesServerVisit}/hysdk/js/hysdk.js'></script>
		<script type="text/javascript" src="${filesServerVisit}/upfile/js/upfile.js"></script>
		<script type="text/javascript" src="${filesServerVisit}/js/plat.js"></script>
		<%@ include file="../html/include/customFile.jsp"%>
	</head>
	<body class="no-skin" >
	 
	    	<div id="navbar" class="navbar navbar-default">
			<div class="navbar-container" id="navbar-container">
				<button type="button" class="navbar-toggle menu-toggler pull-left"	id="menu-toggler" data-target="#sidebar">
					<span class="sr-only"></span><span class="icon-bar"></span><span class="icon-bar"></span> <span class="icon-bar"></span>
				</button>
				<div class="navbar-header pull-left">
					<a class="navbar-brand">
						<div class="b_t_icon">
							<img id="plat_logo" src="">
						</div> 
						<small id="plat_system_title" style="color: #fff; text-shadow: 0px 0px 0px; font-weight: bold;"></small>
					</a>
				</div>
			</div>
		</div>
	    	<div class="main-container" id="main-container">
			<script type="text/javascript">	try{ace.settings.check('main-container' , 'fixed')}catch(e){}</script>
			<div id="sidebar" class="sidebar responsive">
				<script type="text/javascript">		try{ace.settings.check('sidebar' , 'fixed')}catch(e){}	</script>
				<div class="sidebar-shortcuts" id="sidebar-shortcuts">
					<div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
						<img class="nav-user-photo" /><span class="user-info"	style="max-width: 140px;" id="w_loginName"> <small></small>
						</span>
					</div>
					<div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
						<img class="nav-user-photo" />
					</div>
				</div>
				<ul class="nav nav-list">
					<c:forEach items="${menu_list}" var="datas">
						<c:if test="${datas.level == 1 && datas.menuType ==1}">
							<li class="<c:if test='${datas.menuCode == web_paretn_id}'>active open</c:if>">
								<a id="${datas.menuCode}" class="dropdown-toggle"> <img class="menu_img_t" imgURL="${datas.imgUrl}" src=""	style="width: 16px; height: 16px; margin-right: 10px; margin-left: 6px;" />
									<span title="${ datas.description}" class="menu-text">${datas.name}</span> <b	class="arrow fa fa-angle-down"></b>
								</a> 
								<b class="arrow"></b>
								<ul class="submenu">
									<c:forEach items="${menu_list}" var="ts">
										<c:if test="${ts.parentCode == datas.menuCode}">
											<li	class="<c:if test='${ts.menuCode == web_active_id}'>active</c:if>">
												<a class="menu_control" id="${ts.menuCode}" url="..${ts.menuUrl}" url_directive="" title="${ ts.description}" mark="${ts.name }" pname="${datas.name}">
													<i class="menu-icon fa fa-caret-right"></i> ${ts.name }
											    </a> 
											    <b class="arrow"></b>
											</li>
										</c:if>
									</c:forEach>
								</ul>
							</li>
						</c:if>
					</c:forEach>
					<li style=""><a id="logout_menu"> <!-- <i class="menu-icon fa  fa-power-off red"></i> -->
							<img id="logout_menu_img" src=""	style="width: 20px; height: 20px; margin-right: 10px; margin-left: 6px;" />
							<span class="menu-text"> 退出系统 </span>
					</a> <b class="arrow"></b></li>
				</ul>
				<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse"		style="display: none;">
					<i class="ace-icon fa fa-angle-double-left"	data-icon1="ace-icon fa fa-angle-double-left"	data-icon2="ace-icon fa fa-angle-double-right"></i>
				</div>
				<script type="text/javascript">	try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}	</script>
			</div>
			<div class="main-content">
				<div class="main-content-inner">
					<div class="breadcrumbs" id="breadcrumbs">
						<script type="text/javascript">	try{ace.settings.check('breadcrumbs' , 'fixed')}catch(e){}	</script>
						<ul class="breadcrumb">
							<li>
								<img src=""	style="margin-bottom:2px;margin-right:10px;cursor:pointer;" class="menu-toggle" id="menu-toggle-btn"/>
							    <!-- <img src=""	style="margin-bottom: 4px; margin-right: 8px;" class="ic_shouye"/> -->
							    <a id="home-page"	style="text-decoration: none;">主页</a>
							</li>
							<li class="active" style='display:none;' id="home_parent_name">${web_parent_name}</li>
							<li class="active" style='display:none;' id="home_active_name">${web_active_name }</li>
						</ul>
						<div class="nav-search" id="nav-search" style="">
							
						</div>
					</div>
					<div class="page-content">
					    <div id="contact-content_panel"></div>
						<sitemesh:write property='body' />
					</div>
				</div>
			</div>
		</div>	
		
		<script>
		    
		    $(".nav-user-photo").css({"margin-top":"28px","float":"left","width":"25px","height":"25px","cursor":"pointer"}).attr({"src":$.getImgUrl(platParams.loginUser.imgUrl)});
 			$("#w_loginName small").css({"margin-top":"8px","margin-left":"10px","font-weight":"bold"}).html($.substringByPoint(platParams.loginUser.name,5)).attr("title",platParams.loginUser.name);
 		
 			var mac = window.localStorage.getItem("HY_MAC");
 			if(mac){
 				
 			}else{
 				mac = $.UUID();
 				window.localStorage.setItem("HY_MAC", mac);
 			}
 			
 			var HYSDK = new HY_SDK_WS();
 			HYSDK.mac = mac;
 			HYSDK.init(getUserInfo());
 			
 			function getUserInfo(){
 				var opt = {
 					/* url: url,
 					svrIp:platParams.sieIp,
 					userName:platParams.loginUser.name,
 					svrPort:platParams.siePort, */
 					//mac:mac,
 					"url": platParams.sieWebsocketUrl,
			    	"svrIp": platParams.sieIp,
 				    "userName": platParams.loginUser.name,
 				    "svrPort": 9001,
 				    "webrtcUrl": platParams.webRtcUrl,
 				   	sieStreamUrl: platParams.sieStreamUrl,
 				    loginName:platParams.loginUser.userCode,
 				    loginSuccess:function(msg){
 					  if(msg.nResultCode === 1720200002){
 						  $.chatDialogConfirm({"msg": "当前账号已被登录，是否踢出？",
 								"okFun": function(){
 									HYSDK.isKitout = true;
 									HYSDK.kickOut(msg)
 								},
 								"cancelFun": function(){
 									$("#logout_menu").click();
 								},
 								beforeunload:function(){
 									if(HYSDK.isKitout == true){
 										
 									}else{
 										$("#logout_menu").click();
 									}
 								}
 						  }) 
 					  }
 					 HYSDK.initWebRtc();//初始化webRtc
 				   },
 				    notifyKickOut:function(){
 				    	$.messageDialog("您已被踢出，即将退出登录！");
 				    	setTimeout(function(){
 				    		$("#logout_menu").click();
 				    	}, 3000);
 				    },
 				   log: true
 				};
 				return opt;
 			}
 		</script>
	</body>
</html>
