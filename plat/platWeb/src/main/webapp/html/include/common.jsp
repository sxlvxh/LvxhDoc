<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<script type="text/javascript">
	var platParams = ${platConfig};
	platParams.SHOW_RESULT_DIALOG = 1;
	platParams.loginUser = ${loing_user};
	var productParams = JSON2.parse(platParams.platProduct.productParams);
	
	$.hy_error(platParams,"session data:");
</script>