<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<script type="text/javascript" src="${filesServerVisit}/js/utils/qwebchannel.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/jquery.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/json2.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/utils/sie-client.js"></script>
<script type="text/javascript" src="${filesServerVisit}/js/utils/sie-server.js"></script>
<style>

#datagrid{
	text-align: center;
}
#exit-meeting{
	margin:10px auto;
	width:152px;
	height:28px;
	line-height: 28px;
	border:1px solid rgba(255,81,81,1);
	border-radius:4px;
	font-size:14px;
	font-family:Microsoft YaHei;
	color:#FF5151;
	cursor: pointer;
}
.spe-line{
	width:90%;
	height:1px;
	background:rgba(221,221,221,1);
    margin: 10px auto;
}
.intellent-opt-row{
	padding:4px 6px;
	height:20px;
	min-width: 24px;
	font-size:12px;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(102,102,102,1);
	margin: 10px;
	float: left;
	cursor: pointer;
	line-height: 20px;
}

.intellent-opt-row:hover{
	color: #4687FF;
}

.opt-active{
	background:rgba(70,135,255,1);
	border-radius:3px;
	color: #fff;
}

.opt-active:hover{
	color: #fff !important;
}

</style>
<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box">
				<div class="box-body" id="datagrid">
					<div id="exit-meeting">退出会议</div>
					<div class="spe-line"></div>
					<div  style="min-height:200px;width: 90%; margin:0 auto;">
						<div style="font-weight:400; color:#333; font-size: 12px; text-align: left; text-indent: 1px;">智能检测</div>
						<div id = 'intellent-opt'></div>
					</div>
					<div class="spe-line"></div>
				</div>
			</div>
		</div>
	</div>
</section>
<script type="text/javascript">
$(function(){
	var url = window.location.href;
	var meetingId,serviceCode,meetingDomainCode;
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
	var sendList = [];
	var list = [{"name": "抽烟检测","value": 9000,type:"smoker","action": 1},
		{"name": "歧视手势","value": 9001,type:"gesture","action": 2},
		{"name": "辱骂","value": 9002,type:"abuse","action": 3},
		{"name": "大喊大叫","value": 9003,type:"nosiy","action": 2}];
	list.unshift({"name": "全部","value": JSON2.stringify(list),type:"all","action": 1});
	$.each(list, function(i, e){
		var opt = $("<div/>").addClass("intellent-opt-row").data("info", e).html(e.name)
		opt.bind("click",function(){
			var newList = $.extend([], sendList);
			var f = opt.hasClass("opt-active");
			var l = [];
			
			var opt11 = {"lstMonitor": l};
			if(f){
				opt.removeClass("opt-active")
				if(e.type!="all"){
					$(".intellent-opt-row").eq(0).removeClass("opt-active");
					l.push(e.value);
					opt11 = {"lstMonitor": l}
				}else{
					sendList = []
					l = e.value
					opt11 = {"lstMonitor": l}
				}
				csSdk.stopIntellectDetect(opt11);
			}else{
				opt.addClass("opt-active");
				if(e.type!="all" && $(".opt-active").length == 4){
					$(".intellent-opt-row").eq(0).addClass("opt-active")
				}
				var opt11 = {
					"lstMonitor":[],
					"threshold": 0.65,
					"alarmInterval": 20
				}
				if(e.type == "all"){
					opt11.lstMonitor = JSON2.parse(e.value);
				}else{
					opt11.lstMonitor.push({"type": e.value,"name": e.name,"action": e.action})
					
				}
				csSdk.intellectDetect(opt11);
			}
			
			if(e.type == "all"){
				if(f){
					$(".intellent-opt-row").removeClass("opt-active");
				}else{
					$(".intellent-opt-row").addClass("opt-active");
				}
			}
		})
		$("#intellent-opt").append(opt);
	});
	
	$("#exit-meeting").bind("click", function(){
		try{
			var opt = {
					"serviceCode":serviceCode,
					"meetingID": meetingId,
					"code": 0
				};
			csSdk.stopMeeting(opt);
		}catch(e){alert(e)}
	});
})
</script>