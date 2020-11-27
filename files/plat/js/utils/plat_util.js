function getIEVersion(){
  var cachedValue=window._hyIEVersion_;
  if('undefined'==typeof cachedValue){
      var rv = -1; 
	  if (navigator.appName == 'Microsoft Internet Explorer'){
	    var ua = navigator.userAgent;
	    var re  = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
	    if (re.exec(ua) != null){
	      rv = parseFloat( RegExp.$1 );
	    }
	    window._hyIEVersion_=rv;
	  }
	  cachedValue=rv;
  }
  return cachedValue;
};
function uploadFileBackAction(s){
	if(s.code == 0){
		var pnode = $("#"+s.pnode);
		pnode.data("data-upload",s);
		pnode.click();
	}
};
$.extend({
	/**
	 * ajax请求
	 * @param {} opts
	 */
	_ajax: function(opts){
		var setting = {
			async: true,  // 异步
			type: "POST",
			dataType: "JSON"
		};
		var _opts = $.extend({}, setting, opts);
		$.ajax({
            url: _opts.url,
            type: _opts.type,
            async: _opts.async,
            data: JSON.stringify(_opts.data),
            dataType: _opts.dataType,
            beforeSend: function(xhr) {
              xhr.setRequestHeader("Content-Type","application/json;charset=utf-8");
            },
            success:function(msg){
            	opts.success(msg);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown)
            {
            	$.hideLoading();
            	if(opts.error)
            	{
            		opts.error(XMLHttpRequest, textStatus, errorThrown);
            	}
            	$.hy_error(textStatus," 【 request 】 " + JSON.stringify(_opts) + '【index.js || 534 line 】' + "request error ");
            },
            statusCode: {
            	404: function() {
		            	$.hideLoading();
		                $.resultDialog("【 "+_opts.url + " 】操作失败  请求路径不存在！",{showContinueBtn:false});// modified
		            },
                500: function() {
                	$.hideLoading();
	                $.resultDialog("【 "+_opts.url + " 】操作失败  系统异常！",{showContinueBtn:false});// modified
                }
            }
        });
	},
     hy_error:function(msg,desc)
     {
     	//window.console && window.console.error(desc);
    	window.console && window.console.error(desc,msg);
     },
     hy_log: function() {
		for(var i = 0; i<arguments.length; i++)
		{
	    	 window.console && window.console.log(arguments[i]);				
		}
     },
	/*
	 data = {
		 menuId : 1 //菜单编号
		 };
     obj = Object  存放元素父节点
	*/
	init_page:function(data,obj){
		var opt = {
			url : "../platmenu/getRoleData.action",
			data : {
				menuCode : data.menuId
			},
			success : function(response) {
				//$.hy_log('【index.js || 740 line 】' + " init_page params : " + JSON2.stringify(response));
				var params  = {"result":response.result,pnode:obj}
				if(data.menuId == "-1")
				{
					PLAT.activePage = new PlatPageHome(params);
				}
				else if(response.result && response.result.menu && response.result.menu.menuParams)
				{
				   var json = JSON2.parse(response.result.menu.menuParams);
				   if(json.isFullScreen && json.isFullScreen === true)
				   {
						$.hideMenuTop();
				   }
				   if("baiduMap" == json.type)
				   {
					    params.mapjson = json;
					    jQuery.getScript(platParams.filesServerVisit+"/js/hy_artDialog.js",function(){
						   PLAT.activePage = new PlatBaiDuMap(params);
					    })
				   }else if("tianMap" == json.type)
				   {
						params.mapjson = json;
						PLAT.activePage = new PlatTianMap(params);
				   }else if("custom" == json.type)
				   {
						params.customjson = json;
						PLAT.activePage = new PlatCustomPage(params);
				   }else if("block" == json.type)
				   {
						params.blockjson = json;
						var grid  = new PlatGrid(params);
						PLAT.activePage = grid;
						grid.drawTableHead = function(datas){
							this.drawBlockTableHead(datas);
						}
						grid.searchBtn = function(datas){
							this.blockSearchBtn(datas);
						}
					 
						grid.initGrid();
				   }
				   else{
						PLAT.activePage = new PlatGrid(params);
						PLAT.activePage.initGrid();
					   }
				}else{
					PLAT.activePage = new PlatGrid(params);
					jQuery.getScript(platParams.filesServerVisit+"/artDialog-5.0.3/source/jquery.artDialog.js",function(){
						PLAT.activePage.initGrid();
					}) 
				}
			}
		};
		$._ajax(opt);
			
	},
	showMenuTop:function(){
		$("#navbar-container").show();
		$("#menu-toggle-btn").click();
		$("#breadcrumbs").show();
		$("#navbar").show();
	},
	hideMenuTop:function(){
		$("#navbar-container").hide();
		$("#menu-toggle-btn").click();
		$("#breadcrumbs").hide();
		$("#navbar").hide();
	},
	goHome:function(){
	  $("#home-page").click();
	},
	date_format: function(myDate, dateTime) {
        dateTime = dateTime.replace("yyyy", myDate.getFullYear());
        dateTime = dateTime.replace("mm", myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1));
        dateTime = dateTime.replace("dd", myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate());
        dateTime = dateTime.replace("hh", myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours());
        dateTime = dateTime.replace("ii", myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes());
        dateTime = dateTime.replace("ss", myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds());
        return dateTime;
    }, 
	getPostParams:function(opt,data){
		var json = {};
		try{
		$.each(opt,function(i,n){
			if(n.nodeType == "dataValue"){     
				json[n.postName] = data[n.paramName];
			}else if(n.nodeType == "session"){
				json[n.postName] = platParams[n.sessionName];
			}else if(n.nodeType == "initValue"){  
			    json[n.postName] = n.initValue;  
		    }else if(n.nodeType == "elementNode"){ 
			    if(n.pValue){ 
					json[n.postName] =  $("#"+n.paramNodeName,"#"+n.pNodeID).val()-n.pValue;
				}else{
					json[n.postName] =  $("#"+n.paramNodeName,"#"+n.pNodeID).val();
				}
			}else if(n.nodeType == "UUID"){
			    json[n.postName] =  $.UUID();
			}else if(n.nodeType == "sessionUser"){
			    json[n.postName] =  platParams.loginUser[n.sessionName];
			}
			if(n.offset)
			{
				if(n.offset.type == "number")
				{
					json[n.postName] = json[n.postName]*1+n.offset.value*1;
				}
			}
			
		})
		}catch(e){
		  $.hy_error(e,"getPostParams");
		}
		return json;
    },
	initValue:function(element,initParam)
	{
		try{
			if(initParam)
			{
			    var init = JSON2.parse(initParam);
			    if(init.initValueType == "session")
			    {
				    element.val(platParams[init.initValue]);
			    }
			    else if(init.initValueType == "sessionUser")
			    {
				    element.val(platParams.loginUser[init.initValue]);
			    }
			    else if(init.initValueType == "startTime")
			    {
				    var date = new Date();
				    var long = date.getTime();
				    var newLong = long - init.initValue;
				    var newDate = new Date(newLong);
				    var str = $.date_format(newDate,init.timeFormat?init.timeFormat:"yyyy-mm-dd hh:ii:ss");
				    element.val(str);
			    }
			    else if(init.initValueType == "startDate")
			    {
				    var date = new Date();
				    var long = date.getTime();
				    var newLong = long - init.initValue;
				    var newDate = new Date(newLong);
				    var str = $.date_format(newDate,"yyyy-mm-dd")
				    element.val(str);
			    }				  
			    else if(init.initValueType == "initStartTime")
			    {		
				    var date = new Date();
				    var long = date.getTime();
				    var newDate = new Date(long);
				    var str = $.date_format(newDate,"yyyy-mm-dd");
				    str+=" 00:00:00";
				    element.val(str);
			    }
			    else if(init.initValueType == "initEndTime")
			    {
				    var date = new Date();
				    var long = date.getTime();
				    var newDate = new Date(long);
				    var str = $.date_format(newDate,"yyyy-mm-dd");
				    str+=" 23:59:59";
				    element.val(str);
			    }
			    else if(init.initValueType == "yyyymm")
			    {
				    //月份格式化，initValue为前几个月
				    var date = new Date();
				    var newMonth = date.getMonth() - init.initValue;
				    var newDate = new Date();
				    newDate.setMonth(newMonth);
				    var str = $.date_format(newDate,"yyyymm");
				    element.val(str);
			    }else if(init.initValueType == "curYear"){
				    var myDate = new Date();
					//获取当前年
				    var year=myDate.getFullYear();
				    element.val(year);
			    }else if(init.initValueType == "curMonth"){
				    var myDate = new Date();
					//获取当前月
				    var month=myDate.getMonth()+1;
				    var str = month < 10 ? '0' + month: month;
				    element.val(str);
			    }else if(init.initValueType == "curDay"){
				    var myDate = new Date();
					//获取当前日
				    var day=myDate.getDate();
				    var str = day < 10 ? '0' + day: day;
				    element.val(str);
			    }else if(init.initValueType == "UUID"){
				    element.val($.UUID());
			    }else if(init.initValueType == "showImg"){
				    element.attr({src:init.initValue,onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
			    }
			    else
			    {
				    element.val(init.initValue);
			    }
			}
		}catch(e){$.hy_log("elementNode.js 603 line: " + e);}
	},
	profileInfoRow:function(field,element)
	{
		var css = field.fieldStyle;
		var label = field.fieldLabel;
		var color = $("<color/>").html("*").css({"color":"red"}).attr({"flagid":element.attr("name") + "_star"}).hide();
		var labelColor = "#336199";
		var customStyle = {};
		if(field.fieldParams){
			try{
	   	        var json = JSON2.parse(field.fieldParams);
	   	        if(json.validateParam){
	   	     	    $.each(json.validateParam,function(i,n){
	   	     	        if(n.id == "required"){
	   	     	   	        color.show();
	   	     	        }
	   	     	    })
	   	        }
			 
				if(json.labelColor){
					labelColor = json.labelColor;
				}
				if(json.customStyle){
					customStyle = json.customStyle;
				}
			}catch(e){
			  $.hy_error(e,"parse validationParam error!");
			}
		}
		var row  = $("<div/>").addClass("profile-info-row")
							  .append($("<div/>").addClass("profile-info-name").css({"color":labelColor}).css(customStyle).html(label).append(color))
							  .append($("<div/>").addClass("profile-info-value").append(element));
		var p = $("<div/>").addClass(css).append($("<div/>").addClass("profile-user-info profile-user-info-striped").append(row));
		return p;
	},
	proMapInfoRow:function(field,element)//地图上的弹框样式
	{
		var css = field.fieldStyle;
		var label = field.fieldLabel;
		if(field.fieldParams){
			try{
	   	     var json = JSON2.parse(field.fieldParams);
			 
			}catch(e){
			  $.hy_error(e,"parse validationParam error!");
			}
		}
		var row  = $("<div/>").addClass("profile-info-row")
							  .append($("<div/>").addClass("profile-info-name").css({"color":"#fff","padding":"0px","text-align":"center"}).html(label))
							  .append($("<div/>").addClass("profile-info-value").css({"padding":"0px"}).append(element));
		var p = $("<div/>").addClass(css).append($("<div/>").addClass("profile-user-info profile-user-info-striped").append(row));
		return p;
	},
	proVideoRow:function(field,element){  //不带label的
		var css = field.fieldStyle;
		var label = field.fieldLabel;
		var color = $("<color/>").html("*").css({"color":"red"}).attr({"flagid":element.attr("name") + "_star"}).hide();
		if(field.fieldParams){
			try{
	   	     var json = JSON2.parse(field.fieldParams);
	   	     if(json.validateParam){
	   	     	 $.each(json.validateParam,function(i,n){
	   	     	   if(n.id == "required")
	   	     	   {
	   	     	   	 color.show();
	   	     	   }
	   	     	 })
	   	     }
			}catch(e){
			  $.hy_error(e,"parse validationParam error!");
			}
		}
		var row  = $("<div/>").addClass("profile-info-row")
							  //.append($("<div/>").addClass("profile-info-name").html(label).append(color))
							  .append($("<div/>").addClass("profile-info-value").append(element));
		var p = $("<div/>").addClass(css).append($("<div/>").addClass("profile-user-info profile-user-info-striped").append(row));
		return p;
	},
	proImgSelectInfoRow:function(field,element)
	{
		var css = field.fieldStyle;
		var label = field.fieldLabel;
		var color = $("<color/>").html("*").css({"color":"red"}).attr({"flagid":element.attr("name") + "_star"}).hide();
		var labelColor = "#336199";
		var customStyle = {};
		var showDiv = $("<div/>").width("100%").height(35).css({"border": "1px solid #ccc","line-height":"30px"}).hide();
		if(field.fieldParams){
			try{
	   	        var json = JSON2.parse(field.fieldParams);
	   	        if(json.validateParam){
	   	     	    $.each(json.validateParam,function(i,n){
	   	     	        if(n.id == "required"){
	   	     	   	        color.show();
	   	     	        }
	   	     	    })
	   	        }
			 
				if(json.labelColor){
					labelColor = json.labelColor;
				}
				if(json.customStyle){
					customStyle = json.customStyle;
				}
			}catch(e){
			  $.hy_error(e,"parse validationParam error!");
			}
		}
		var row  = $("<div/>").addClass("profile-info-row")
							  .append($("<div/>").addClass("profile-info-name").css({"color":labelColor}).css(customStyle).html(label).append(color))
							  .append($("<div/>").addClass("profile-info-value").append($("<div/>").css({"height":"35px"}).append(showDiv).append(element)));
		var p = $("<div/>").addClass(css).append($("<div/>").addClass("profile-user-info profile-user-info-striped").append(row));
		return node = {p:p,showDiv:showDiv};
	},
	openDialog:function(option)
	{
        //modified by huangwenhai on 2017-12-21
        var isLocked=option.lock;
        if('undefined'==typeof isLocked){
           isLocked=true; 
        }
		var innerWidth = option.width;
		var innerHeight = option.height;
		if(option.width == -1)
		{
		 option.width =  window.innerWidth -12;
		 innerWidth = innerWidth - 10;
		 
		}
		if(option.height == -1)
		{
		 option.height = window.innerHeight - 40;
		 innerHeight = innerHeight - 10;
		}
		var ld = $.dialog({
			id: option.id + "_dialog",
			title: option.title,
			content: "<div id='"+option.id+"' style='width:"+innerWidth+"px;height:"+innerHeight+"px;'></div>",
			initialize: function() {},
			width: option.width,
			height: option.height,
            lock: isLocked,
            beforeunload: option.beforeunload,
			zIndex:option.zIndex
		});	
        //modification end 2017-12-21
		return ld;
	},
	messageDialog:function(msg)
	{
		var ld = $.dialog({
			id: "messageDialog",
			title: "消息",
			content: "<div id='messageDialog'  style='text-align:center;padding:0px 10px;'>"+msg+"</div>",
			initialize: function() {},
			width: 250,
			height: 120,
			lock: true
		});	
		return ld;
	},
	Div:function(exp1, exp2) {
	    var n1 = Math.round(exp1); // 四舍五入
	    var n2 = Math.round(exp2); // 四舍五入
	    var rslt = n1 / n2; // 除
	    if (rslt >= 0) {
	        rslt = Math.floor(rslt); // 返回值为小于等于其数值参数的最大整数值。
	    } else {
	        rslt = Math.ceil(rslt); // 返回值为大于等于其数字参数的最小整数。
	    }
	    return rslt;
	},
	getConditions :function(model,data)
	{
		if(model && data)
			{
				var ff = true;
				//$.each(model,function(i,n){
				for(var i=0;i<model.length;i++){
				   var n = model[i];
				   var temp = data[n.field];
				   if(n.rule)
				   {
					   	var f = true;
					   	//$.each(n.rule,function(j,m){
					   	for(var j=0;j<n.rule.length;j++){
					   	    var m = n.rule[j];
					   		// 大于
					   	    if("greater" == m.rule)
					   	    {
					   	    	f = (temp > m.value);
					   	    }
					   	    // 小于
					   	    else if("less" == m.rule)
					   	    {
					   	    	f = (temp < m.value);
					   	    }
					   	    //不等于
					   	    else if("unequal" == m.rule)
					   	    {
					   	    	f = (temp != m.value);
					   	    }
					   	    //等于
					   	    else if("equal" == m.rule)
					   	    {
					   	    	f = (temp == m.value);
					   	    }
							//$.hy_error(f,temp);
					   	    if(f === false)
					   	    {
					   	    	break;
					   	    }
					   	}
					   if(f === false)
					   {
						   	ff = false;
						   	break;
					   }
				   }
				}
				return ff;
			}
		return false;
	},
	showLoading:function(message)
	{
		if(message){}else{message = "正在加载请稍后";}
		var opt = {
				id : "loadingDialog",
				title : message,
				width: 200,
				height: 100
		};
		loadingDialog = $.openDialog(opt);
		$("#loadingDialog").empty().append('<div id="loading_id" style="text-align:center"><image src="'+$.getImgUrl("/images/loading.gif")+'"/></div>');
	},
	hideLoading:function()
	{
		$(".d-close",$("#loading_id").closest("table.d-dialog")).click();
	},
	resultDialog:function(msg,form,options)
	{
		if(form && 'function'==typeof form.extend){
			;// 什么也不做
		}else{
			// 调用时未指定form，但是可能指定了options
			options=form;
			form=null;
		}
		var opts=$.extend({showContinueBtn:true,modal:true},options);
        var showManualDialog=platParams.SHOW_RESULT_DIALOG;
        var onOK;
        var ld=null;
        onOK=function(){
                try{
                    if(form){
                        $(".d-close",form.closest("table.d-dialog")).click();
                    }
                    if(ld){
                        ld.close();
                    }
                }finally{
                   var callback=opts.onOK;
                    if(callback){
                        callback();
                    }
                }
        };
        if(1==showManualDialog){
            var iid =  "result" + $.UUID();
            ld = $.dialog({
                id: iid+"_dialog",
                title: "操作结果",
				content: "<div id='"+iid+"'>"+msg+"</div>",
                initialize: function() {},
                width: 200,
                height: 80,
                lock: opts.modal,
                needPad:true
            });	
			var btnGroup=$("<div/>").addClass("btn-group buttons");
			$("#"+iid).after(btnGroup);
			
            if(false==opts.showContinueBtn){
                ;// 不显示“继续操作”
            }else{
                // Fix:172726
                btnGroup.append($("<button/>").addClass("btn btn-default btn-white").append($("<i/>").addClass("fa fa fa-gavel btn-white")).append("继续").bind("click",function(){
                    ld.close();
                }));
            }
            btnGroup.append($("<button/>").addClass("btn btn-success btn-white").append($("<i/>").addClass("fa fa-thumbs-o-up")).append("确定").bind("click",onOK));
            // modification end Fix:168403
        }else{
            try{
               $.hy_note(msg,{timeout:2000}); 
            }finally{
               onOK(); 
            }
        }
		return ld;
		
	},
	chatDialogConfirm: function(opt){
		var iid =  "chatDialogConfirm";
		var llld = $.dialog({
			id: iid,
			title: "提示",
			content: "<div id='"+iid+"'><div><span style='margin-left: 10px; font-size: 18px;'>"+opt.msg+"</span></div>",
			initialize: function() {},
			width: 300,
			height: 140,
			lock: true,
			beforeunload: opt.beforeunload
		});	
		
		var div = $("<div/>");
		$("#"+iid).append(div);
		div.append($("<div/>").css({"margin-top": "30px"}).addClass("btn-group buttons")
				.append($("<button/>").addClass("btn btn-white btn-info").append("确认").bind("click",function(){
					opt["okFun"] && opt["okFun"]();
					llld.close();
				})).append($("<button/>").addClass("btn btn-danger btn-white").append("取消").bind("click",function(){
					opt["cancelFun"] && opt["cancelFun"]();
					llld.close();
				})))
		return llld;
	},
	substringByPoint : function(str, length) {
		if(str && str.length>0)
		{
			if(str.length <= length)
				{
				return str;
				}
			else 
				{
				return str.substring(0,length) + "...";
				}
		}
		else return str;
	},
	substring : function(str, length) {
		if(str && str.length>0)
		{
			if(str.length <= length)
				{
				return str;
				}
			else 
				{
				return str.substring(0,length);
				}
		}
		else return str;
	},
	operateTip: function(opt){
		$.hy_error(opt);
		$("#operate-tip-dialog").remove();
		$("body").append(
			$("<div/>").attr("id", "operate-tip-dialog").css({"width": opt.width ? opt.width: "110px"}).addClass("tip-class").html(opt.msg).show()
		)
		var tRoot = $("#operate-tip-dialog").css({"left": ($(window).width()-$("#operate-tip-dialog").width())/2, "top": opt.top ? opt.top: ""});
		clearTimeout(tRoot.timer);
		var time = opt.time ?opt.time:3000;
		tRoot.timer = setTimeout(function(){
			$("#operate-tip-dialog").remove();
		}, time);
	},
    UUID : function() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; 
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
															
		s[8] = s[13] = s[18] = s[23] = "";

		var uuid = s.join("");
		return uuid;
	},
	getLi:function(data,pnode)
	{
		var li = $("<li/>").addClass("tree-branch");
		var i = $("<i/>").addClass("icon-caret ace-icon tree-plus");
		var div = $("<div/>").addClass("tree-branch-header");
		var ul = $("<ul/>").addClass("tree-branch-children hidden");
		var div1 = $("<div/>").addClass("tree-loader hidden");
		
		var divLoad = $("<div/>").addClass("tree-loading");
		var load = $("<i/>").addClass("ace-icon fa fa-refresh fa-spin blue");
		var span = $("<span/>").addClass("tree-branch-name");
		var img = $("<img/>").css({"width":"16px","height":"16px"}).attr({"src":platParams.filesServerVisit +"/theme/" + productParams.theme + data.timg});
		var label = $("<span/>").addClass("tree-label").html(data.tname);
		
		div.append(span.append(img).append(label));
		div1.append(divLoad.append(load));
		
		li.append(i).append(div).append(ul).append(div1);
		pnode.append(li);
	},
	getImgUrl:function(url)
	{
		if($.startWith(url,"/userfiles") === true || $.startWith(url,"/help") === true)
		{
			return platParams.filesServerVisit+url;
		}else if($.startWith(url,"http:") === true || $.startWith(url,"https:") === true)
		{
			return url;
		}
		else
		{
			return platParams.filesServerVisit+"/theme/" + productParams.theme + url;
		}
	},
	getPrefixImgUrl:function(prefix,url)
	{
		if($.startWith(url,"/userfiles") === true || $.startWith(url,"/help") === true)
		{
			return platParams.filesServerVisit+url;
		}else if($.startWith(url,"http:") === true || $.startWith(url,"https:") === true)
		{
			return url;
		}
		else
		{
			return platParams.filesServerVisit+"/theme/" + prefix + url;
		}
	},
	startWith : function(soruce,str){
		if(soruce==null || soruce=="" || soruce.length==0 || str.length> soruce.length)
		  return false;
		if(soruce.substr(0,str.length) == str)
		  return true;
		else
		  return false;
		return true;
	},
	endWith : function(soruce,str){
		if(soruce==null || soruce=="" || soruce.length==0 || str.length> soruce.length)
		  return false;
		if(soruce.substr(soruce.length-str.length,str.length) == str)
		  return true;
		else
		  return false;
		return true;
	},
	getShowImgDialog:function(fileName,width,height,url,hideLabel)
	{
		var opts = {
					btnParams: {
						"flist": [{
							"fieldName": fileName,
							"fieldLabel": "图片",
							"fieldType": "showImg",
							"enable": 0,
							"fieldParams": JSON2.stringify({
								"imgSize": {
									"width": width,
									"height": height
								},
								"hideLabel": hideLabel
							})
						}
					],
					"buttonCode": "render_img_dialog",
					"buttonName": "图片放大",
					"buttonParams": JSON2.stringify({
						"dialog": {
							"width": width,
							"height": height,
							"lock": true
						}
					})
				},
				"srcData": {
					"imgUrl": $.getImgUrl(url)
				}
				};

			var dialog = new PlatOpenDialog(opts);
			return dialog;
	},
	batchHide:function(node,list)
	{
		$.each(list,function(i,n){
		    node.find(n).hide();
		});
	},
	batchShow:function(node,list)
	{
		$.each(list,function(i,n){
		    node.find(n).show();
		});
	},
	gerTreeBtnImg:function(icon,title,id){
		return $("<img/>").css({"width":"14px","height":"14px","margin-top":"-5px","margin-left":"5px"}).attr({"src": $.getImgUrl(icon),"title": title,"id":id});
	},
	JSQueue:function(list, timeName, func,time){
		try{
			var t = 0;
			if(time){
				t= time;
			}
			clearInterval(timeName);
			timeName = setInterval(function(){
				a = list.shift();
				if(a){
					func && func(a);
				}
			},t);
		}catch(e){alert(e)}
	},
	getMapIconSize:function(){
		return new BMap.Size(platParams.MARKER_ICON_SIZE_W*1,platParams.MARKER_ICON_SIZE_H*1);
	},
	getMapIconSize_5:function()
	{
		return new BMap.Size(platParams.MARKER_ICON_SIZE_W*1+5,platParams.MARKER_ICON_SIZE_H*1+5);
	},
	getMapIconSize_10:function()
	{
		return new BMap.Size(platParams.MARKER_ICON_SIZE_W*1+10,platParams.MARKER_ICON_SIZE_H*1+10);
	},
	getMapIconSize_20:function()
	{
		return new BMap.Size(platParams.MARKER_ICON_SIZE_W*1+20,platParams.MARKER_ICON_SIZE_H*1+20);
	},
	getMapIconSize_30:function()
	{
		return new BMap.Size(platParams.MARKER_ICON_SIZE_W*1+30,platParams.MARKER_ICON_SIZE_H*1+30);
	},
	getMapIconSize_50:function()
	{
		return new BMap.Size(platParams.MARKER_ICON_SIZE_W*1+50,platParams.MARKER_ICON_SIZE_H*1+50);
	},
	getMarkIconByType:function(type,stats)
	{
		if(type && stats)
		{
			return $.getImgUrl("/marker/"+type+"/"+stats+"_mark.png");
		}
		else if(stats)
		{
			return $.getImgUrl("/marker/default/"+stats+"_mark.png");
		}else
		{
			return $.getImgUrl("/marker/default/default_mark.png");
		}
	}
});
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a,
    function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
function loadJS( url, callback ){

    var script = document.createElement('script'),

        fn = callback || function(){};

    script.type = 'text/javascript';
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
    //IE
    if(script.readyState){
        script.onreadystatechange = function(){
   // alert(script.readyState);
            if( script.readyState == 'loaded' || script.readyState == 'complete' ){

                script.onreadystatechange = null;

                $.hy_error("111");
                fn();

            }

        };

    }else{
    	// alert(script.readyState);
        //其他浏览器
        script.onload = function(){
        $.hy_error("222");
            fn();

        };

    }

}
function GetHttpRequest()  
{  
    if ( window.XMLHttpRequest ) // Gecko  
        return new XMLHttpRequest() ;  
    else if ( window.ActiveXObject ) // IE  
        return new ActiveXObject("MsXml2.XmlHttp") ;  
}  
  
  
function ajaxPage(sId, url){  
    var oXmlHttp = GetHttpRequest() ;  
    oXmlHttp.onreadystatechange = function()    
     {  
        if (oXmlHttp.readyState == 4)  
        {  
           includeJS( sId, url, oXmlHttp.responseText );  
        }  
    }  
    oXmlHttp.open('GET', url, false);//同步操作  
    oXmlHttp.send(url);  
}  
  
  
function includeJS(sId, fileUrl, source)  
{  
    if ( ( source != null ) && ( !document.getElementById( sId ) ) ){  
        var oHead = document.getElementsByTagName('HEAD').item(0);  
        var oScript = document.createElement( "script" );  
        oScript.type = "text/javascript";  
        oScript.id = sId;  
        oScript.text = source;  
        oHead.appendChild( oScript );  
    }  
}  

//上传文件格式不符
function typeNotFormat(data){
	var msg = "上传文件格式不正确！";
	if(data && data.msg){
		msg = data.msg
	}
	$.resultDialog(msg,{showContinueBtn:false});
}