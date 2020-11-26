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
	var code = "${MENU_CODE}";
	if(code && code.length > 2)
	{
		/* var params = {menuId : "${MENU_CODE}"};
		$.init_page(params, "#datagrid");
		 */
		$(".menu_control[id='${MENU_CODE}']").click();
	}else
		{
		  $("#home-page").click();
		}
});
</script>