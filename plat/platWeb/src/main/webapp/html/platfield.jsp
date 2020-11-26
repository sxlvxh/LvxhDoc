<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/decorator/taglib.jsp"%>
<section class="content">
	<div class="row">
		<div class="col-md-12">
			<div class="box">
				<div class="box-body" id="datagrid"></div>
			</div>
		</div>
	</div>
</section>
<script type="text/javascript">
$(function(){
	var params = {menuId : "${web_active_id}"};
	$.init_page(params, "#datagrid"); 
});
</script>