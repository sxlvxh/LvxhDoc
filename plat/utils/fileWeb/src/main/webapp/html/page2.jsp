<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<html>
<head>
<link rel="stylesheet"
	href="${FILES_SERVER_VISIT}/viewer/css/viewer.min.css" />
<script src="${FILES_SERVER_VISIT}/viewer/js/jquery.min.js"></script>
<script src="${FILES_SERVER_VISIT}/viewer/js/viewer-jquery.min.js"></script>
<script type="text/javascript" src="${FILES_SERVER_VISIT}/js/json2.js"></script>
<script type="text/javascript"
	src="${FILES_SERVER_VISIT}/js/utils/plat_util.js"></script>
<style>
*{ margin: 0; padding: 0;}
#dowebok { width: 700px; margin: 0 auto; font-size: 0;}
#dowebok li { display: inline-block; width: 32%; margin-left: 1%; padding-top: 1%;}
#dowebok li img { width: 100%;}
</style>
</head>
<body>
	"${FILES_SERVER_VISIT}"
	<div id="bodyid">
		<ul id="dowebok">
		</ul>
	</div>
	<script type="text/javascript">
		var pnode = $("#dowebok");
		var opt = {
			url : "../upload/list.action",
			data : {},
			success : function(res) {
				$.each(res.result, function(i, n) {
					var nodes;
					if (n.oneType == "img") {
						nodes = $("<img/>").attr({
							"src" : "${FILES_SERVER_VISIT}" + n.fileUrl,
							"onerror" : "this.src='../imgs/image.png'",
							"data-original": "${FILES_SERVER_VISIT}" + n.fileUrl
						});
					}
					pnode.append($("<li/>").append(nodes));

				});
				
				$('#dowebok').viewer({
					url: 'data-original',
				});
			}
		};
		$._ajax(opt);
	</script>
</body>
</html>
