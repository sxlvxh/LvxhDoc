<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
 <script type="text/javascript" src="../js/jquery.js"></script>
 <script type="text/javascript" src="../js/json2.js"></script>
 <script type="text/javascript" src="../js/plat_util.js"></script>
 <style>
 img{
  width:200px;
  height:200px;
  cursor: pointer;
  /* margin:10px; */
 }
 .img_title
 {
   height: 60px;
   width:200px;
   background-color: #ddd;
   position: absolute;
   bottom:10px;
   opacity: 0.8;
 }
 </style>
</head>
<body>
	<div id="bodyid">
	   
	</div>
	<script type="text/javascript">
	var pnode = $("#bodyid");
	  var opt = {url:"../upload/list.action",data:{},success:function(res){
		  pnode.empty();
		  $.each(res.result,function(i,n){
			  var nodes;
			  if(n.oneType == "img")
			  {
				  nodes = $("<img/>").attr({"src":"${FILES_SERVER_VISIT}" + n.fileUrl,
							  "onerror":"this.src='../imgs/image.png'"  
						  });
			  }else if(n.oneType == "word")
			  {
				  nodes = $("<img/>").attr({"src":"../imgs/word.png"});
			  }else if(n.oneType == "pdf")
			  {
				  nodes = $("<img/>").attr({"src":"../imgs/pdf.png"});
			  }else if(n.oneType == "html")
			  {
				  nodes = $("<img/>").attr({"src":"../imgs/html.png"});
			  }else if(n.oneType == "mp4")
			  {
				  nodes = $("<img/>").attr({"src":"../imgs/mp4.png"});
			  }else if(n.oneType == "mp3")
			  {
				  nodes = $("<img/>").attr({"src":"../imgs/mp3.png"});
			  }else if(n.oneType == "txt")
			  {
				  nodes = $("<img/>").attr({"src":"../imgs/txt.png"});
			  }else
				  {
				  nodes = $("<img/>").attr({"src":"../imgs/other.png"});
			}
			  nodes.attr({"title":n.fileName}).bind("click",function(){
				  window.open("${FILES_SERVER_VISIT}" + n.fileUrl);
			  });
			  var title = $("<div/>").addClass("img_title");
			  title.append($("<div style='font-size:12px;'/>").html(n.fileName))
			  .append($("<img src=''/>").css({"width":"16px","height":"16px","float":"right"})
					  .attr({"src":"../imgs/delete.png"})
					  .bind("click",function(){
				    var opts = {url:"../upload/delete.action",data:{fileCode:n.fileCode},success:function(res1){
				    	$._ajax(opt);
				    }};
				    $._ajax(opts);
			  }));
			  pnode.append($("<div style='display:inline-block;padding:10px;position:relative'/>").append(nodes).append(title)); 
			  
			  
		  });
	  }};
	  $._ajax(opt);
	</script>
</body>
</html>
