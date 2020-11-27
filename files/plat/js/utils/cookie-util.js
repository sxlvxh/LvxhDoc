/**
 * 用户登录页面中保存用户登录信息到Cookie中，用户的名称属性为loginName，密码属性为password
 */
(function(){

	/**
	 * 设置浏览器端Cookie数据
	 * key: Cookie的名称;   value: Cookie的值;  exdays: Cookie的生命周期;  
	 */
	var _setCookie_ = function(key, value, exdays){
		var date = new Date();
		if(!exdays){
			exdays = 7;  // 默认存储7天
		}
		date.setTime(date.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+date.toUTCString();
		document.cookie = $.trim(key) + "=" + $.trim(value) + "; " + expires;
	}; 
	
	/**
	 * 根据Cookie名称获取Cookie值
	 * key: Cookie的名称  
	 */
	var _getCookie_ = function(key){
		var key = key + "=";
		if(document.cookie){
			var cookies = document.cookie.split(';');
			for(var i=0; i < cookies.length; i++) {
				var cookie = cookies[i];
				if (cookie.indexOf(key) != -1) {
					return cookie.split('=')[1];
				}
			}
		}
		return "";
	}; 
	
	/**
	 * 清除Cookie值
	 * key: Cookie的名称  
	 */
	var _clearCookie_ = function(key){
		_setCookie_(key, "", -1);
	};

	$("a[type='submit']").on("click", function(){
		var vKey = $("input[name='loginName']", $("form#form-login")).val(),
			vValue = $("input[name='password']", $("form#form-login")).val();
		if(!$.trim(vKey)){   // 登录名为空时，不做处理
			return;
		}
		if($("input[type='checkbox']", $("form#form-login")).prop("checked")){
			_setCookie_(vKey, vValue);
		}else{
			_clearCookie_(vKey);
		}
	});
	
	$("input[name='loginName']", $("form#form-login")).on("blur", function(){
		var vKey = $("input[name='loginName']", $("form#form-login")).val();
		if(!$.trim(vKey)){   // 登录名为空时，不做处理
			return;
		}
		var vValue = _getCookie_(vKey);
		if(vValue){
			$("input[name='password']", $("form#form-login")).val(vValue);
			$("input[type='checkbox']", $("form#form-login")).prop("checked", true);
		}else{
			$("input[name='password']", $("form#form-login")).val("");
			$("input[type='checkbox']", $("form#form-login")).prop("checked", false);
		}
		
	});
	
	// 监听用户登录名变更时，清空密码框并重新设置记住密码状态
	$("input[name='loginName']", $("form#form-login")).on("input propertychange", function(){
		$("input[name='password']", $("form#form-login")).val("");
		$("input[type='checkbox']", $("form#form-login")).prop("checked", false);
	});
	//二维码显示隐藏
	$("#ios-code").bind("mouseover",function(){
		$(this).removeAttr("src");
		$(this).attr({"src":filesServerVisit+"/theme/default/login_page/ios-check-w.png"});
		$("#ios-panel").css({"display":"block"});
	}).bind("mouseout",function(){
		$(this).attr({"src":filesServerVisit+"/theme/default/login_page/ios.png"});
		$("#ios-panel").css({"display":"none"});
	});
	
	$("#android-code").bind("mouseover",function(){
		$(this).attr({"src":filesServerVisit+"/theme/default/login_page/android-check-w.png"});
		$("#android-panel").css({"display":"block"});  
	}).bind("mouseout",function(){
		$(this).attr({"src":filesServerVisit+"/theme/default/login_page/android.png"}); 
		$("#android-panel").css({"display":"none"});
	});
	
})();
