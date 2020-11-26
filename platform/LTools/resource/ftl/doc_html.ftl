<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="X-UA-Compatible" content="IE=10,IE=9" />
		<meta charset="utf-8" />
<link rel="stylesheet" href="help.css" />
<script src="jquery.js"></script>
<script>
$(function(){
  $("a",".left").bind("click",function(){
    $("#tttt").attr({"src":$(this).attr("url")});
  });
});
</script>
</head>
<body>
		<div class="head">
		  <H3>基础业务平台HTTP接口</H3>
		</div>
		<div class="left">
		       <ul>
				 <#list table as table>
				     <li><a url="${pro.url_prefix?cap_first}${table.className?cap_first}.html">${table.comment}</a></li>
				</#list>
		       </ul>
		  
		</div>
		<div class="right">
		  <iframe id="tttt" src="SysUserInfo.html" width="100%" height="750px"/>
		</div>

</body>
</html>