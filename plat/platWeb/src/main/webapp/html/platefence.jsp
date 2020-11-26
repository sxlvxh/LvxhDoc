<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box">
				
				<div id="allmap" style="width:1700px;height:790px"></div>
				
			</div>
		</div>
	</div>
</section>
<%@ include file="include/baidujs.jsp"%>
<script type="text/javascript">
$(function(){
	var params = {menuId : "${web_active_id}"};
	$.init_page(params, "#datagrid");
});

</script>