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
		 html,body{width:100px;min-width:100px;padding:0px; margin:0px;} 
		/*  #upfile
		 {
		  display: none;
		 } */
		 .avatar {
         position: relative;
        display: block;
        overflow: hidden;
        width: 100px;
        height: 23px;
        line-height: 23px;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background-image: linear-gradient(#2A95D6, #257FBC);
        cursor: pointer;
    }
    .avatar input{
       display: inline-block;
        position: absolute;
        font-size: 12px;
        top:0;
        left: 0;
        opacity: 0;
        z-index: 1;
        cursor: pointer;
    }
		</style>
		<script src='${filesServerVisit}/js/jquery.js'></script>
		<script src='${filesServerVisit}/js/json2.js'></script>
		<script type="text/javascript">
		var uploadConditions,uL;
		$(function(){
			var id = getQueryVariable("temp_id");
			uploadConditions = getQueryVariable("uploadConditions");
			$("#upForm").attr({action:"../main/upFormFile.action?temp_id="+id});
			$("#upfile").bind("change",function(){
				if(uploadConditions){
					var filepath = $(this).val();
					var fileNList = filepath.split("\\");
					var fileN = fileNList[fileNList.length-1];
					var extStart=filepath.lastIndexOf(".");
					var ext=filepath.substring(extStart,filepath.length).toUpperCase();
					var f = isAllowUpload(ext);
					if(f && f.flag){
						$("#upForm").submit();
					}else{
						window.parent.typeNotFormat(f.conditions);
					}
				}else{
					$("#upForm").submit();
				}
			});
			$("#upfile").click();
			//$("#upfile")[0].dispatchEvent(new MouseEvent("click"));
			/* $("input[type=file]").filestyle({
				image: "",
				imageheight: 22,
				imagewidth: 82,
				width: 180,
				height:100
			}); */
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
		
		function isAllowUpload(ext){
			try{
				if(uploadConditions){
					var flag = false;
					uL = JSON2.parse(decodeURIComponent(uploadConditions));
					$.each(uL.type, function(i, e){
						if(ext === e){
							flag = true;
							return {"flag": flag,"conditions": uL};
						}
					});
					return {"flag": flag,"conditions": uL};
				}
			}catch(e){alert(e)}
		}
		
		</script>
</head>
<body>
	<div class="box-body" id="datagrid">
	  <form id="upForm" action ="" method="post" enctype="multipart/form-data">
	     <div class="avatar"> <input  type="file" name="upfile" id="upfile"/>上传新文件<div/> 
	  </form>
	</div>
</body>
</html>


