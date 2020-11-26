<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
		<meta http-equiv="X-UA-Compatible" content="IE=10,IE=9" />
		<meta charset="utf-8" />
		<meta name="description" content="Dynamic tables and grids using jqGrid plugin" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<style>
		 html,body{width:100px;min-width:100px;} 
		</style>
		<script src='${filesServerVisit}/js/jquery.js'></script>
		<script src='${filesServerVisit}/js/json2.js'></script>
		<script type="text/javascript">
		$(function(){
			var id = getQueryVariable("temp_id");
			var t = ${UPLOAD_RESP_INFO};
			t.pnode = id;
			window.parent.window.uploadFileBackAction(t);
		 });

		function getQueryVariable(variable)
		{
		       var query = window.location.search.substring(1);
		       var vars = query.split("&");
		       for (var i=0;i<vars.length;i++) {
		               var pair = vars[i].split("=");
		               if(pair[0] == variable){return pair[1];}
		       }
		       return(false);
		}
		
		</script>
</head>
<body>
</body>
</html>


