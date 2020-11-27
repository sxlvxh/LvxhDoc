artDialog._templates = 
'<div id="{id}" class="hy-d-dialog">'
+'<img id="left_{id}" style="left: -22px; top: -27px; float: left; position: absolute;" src="../main/overlayImg/top1.png">'
+'<img id="right_{id}" style="top: -27px; right: -28px; float: right; position: absolute; cursor: pointer;width:auto !important;height:auto !important;z-index:9999;" src="../main/overlayImg/top2.png" >'
+'<img id="footer_right_{id}" style="right: -28px; float: right; position: absolute;" src="../main/overlayImg/footer2.png">'
+'<img id="footer_left_{id}" style="left: -22px; float: left; position: absolute;" src="../main/overlayImg/footer1.png">'
+'<div id="middle_top_{id}" style=\'background: url("../main/overlayImg/middle1.png"); left: 168px; top: -27px; width: 215px; height: 28px; float: left; position: absolute;\'></div>'
+'<div id="middle_right_{id}" style=\'background: url("../main/overlayImg/middle2.png"); top: 13px; width: 20px; height: 162px; right: -20px; float: right; position: absolute;\'></div>'
+'<div id="middle_bottom_{id}" style=\'background: url("../main/overlayImg/middle3.png"); left: 48px; top: 210px; width: 303px; height: 11px; float: left; position: absolute;\'></div>'
+'<div id="middle_left_{id}" style=\'background: url("../main/overlayImg/middle4.png"); left: -22px; top: 13px; width: 22px; height: 162px; float: left; position: absolute;\'></div>'
+'<div class="d-outer" role="dialog" tabindex="-1" aria-labelledby="d-title-{id}" aria-describedby="d-content-{id}" style="box-shadow:10px 6px 11px rgba(2,37,69,0.4);">'
+   '<table class="d-border">'
+       '<tbody>'
+           '<tr>'
+               '<td class="d-nw"></td>'
+               '<td class="d-n" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);border-bottom:1px solid #b5dfff;"></td>'
+               '<td class="d-ne" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);"></td>'
+           '</tr>'
+           '<tr>'
+               '<td class="d-w" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);"></td>'
+               '<td class="d-c">'
+                   '<div class="d-inner">'
+                   '<table class="d-dialog" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);">'
+                       '<tbody>'
+                           '<tr>'
+                               '<td class="d-header">'
+                                   '<div class="d-titleBar">'
+                                       '<div id="d-title-{id}" class="d-title"></div>'
+                                       '<a class="d-close" href="javascript:;" style="display:none !important;"></a>'
+                                   '</div>'
+                               '</td>'
+                           '</tr>'
+                           '<tr>'
+                               '<td class="d-main" style="padding:0px 5px;">'
+                                   '<div id="d-content-{id}" class="d-content"></div>'
+                               '</td>'
+                           '</tr>'
+                           '<tr>'
+                               '<td class="d-footer">'
+                                   '<div class="d-buttons"></div>'
+                               '</td>'
+                           '</tr>'
+                       '</tbody>'
+                   '</table>'
+                   '</div>'
+               '</td>'
+               '<td class="d-e" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);"></td>'
+           '</tr>'
+           '<tr>'
+               '<td class="d-sw" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);"></td>'
+               '<td class="d-s" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);"></td>'
+               '<td class="d-se" style="background-color:rgba(34,131,206,0.85);filter:alpha(opacity=85);"></td>'
+           '</tr>'
+       '</tbody>'
+   '</table>'
+'</div><div/>';

artDialog.prototype.customFunc = function(config)
{
  
  //$.hy_error(config,"sssssssssssssssssssssssssssssssss");
  $("#footer_right_" + config.id).css({"top":config.height+30+13});
  $("#footer_left_" + config.id).css({"top":config.height+30+13});
  $("#middle_top_" + config.id).css({"width":config.width-128});
  $("#middle_right_" + config.id).css({"height":config.height+30});
  $("#middle_left_" + config.id).css({"height":config.height+30});
  $("#middle_bottom_" + config.id).css({"top":config.height+43+13,"width":config.width-40});

  if((config.cancel == false) || (config.cancel == null)){
	  $(".d-main",$("#"+config.id)).css({"width":config.width,"height":config.height});
	  config.lock = false;
  }else{
	  $(".d-main",$("#"+config.id)).css({"width":config.width,"height":config.height-55});
  }
  
  $("#right_"+config.id).bind("click",function(){
	  $(".d-close",$("#"+config.id)).click();
  })
}


$(function(){
	/**
	 * 确认选择
	 * @param   {String, HTMLElement}   消息内容
	 * @param   {Function}              确定按钮回调函数
	 * @param   {Function}              取消按钮回调函数
	 */
	$.confirm = $.dialog.confirm = function (content, ok, cancel,opt) {
		return $.dialog({
			id: 'Confirm',
			fixed: true,
			lock: true,
			content: "<div id='Confirm' style='color:#fff;'>"+content+"</div>",
			width:opt?(opt.width?opt.width:220):220,
			height:opt?(opt.height?opt.height:120):120,
			ok: ok,
			cancel: cancel,
			okValue:"确定",
			cancelValue:"取消"
		});
	};
	$.extend({
		showLoading:function(message){
			if(message){
			
			}else{
				message = "正在加载请稍后";
			}
			var opt = {
				id : "loadingDialog",
				title : message,
				width: 200,
				height: 100
			};
			loadingDialog = $.openDialog(opt);
			//$("#loadingDialog").empty().append('<div id="loading_id" style="text-align:center;"><image src="../ace/dist/img/loading.gif"/></div>');
			$("#loadingDialog").empty().append('<div id="loading_id" style="text-align:center"><image src="'+$.getImgUrl("/images/loading.gif")+'"/></div>');
		},
		resultDialog:function(msg,form,options){
			if(form && 'function'==typeof form.extend){
				;// 什么也不做
			}else{
				// 调用时未指定form，但是可能指定了options
				options=form;
				form=null;
			}
			var opts=$.extend({showContinueBtn:true,modal:true},options);
			//modified by huangwenhai on 2017-11-24 默认不显示带按钮的操作结果对话框
			var showManualDialog=1;
			var onOK;
			var ld=null;
			onOK=function(){
					// modified by huangwenhai on 2017-08-25 增加点击“确定”后的自定义回调函数
					try{
						if(form){
							$(".d-close",form.closest("table.d-dialog")).click();
							//form.find("div.d-outer").siblings(".d-close").click();
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
					// modification end
			};
			if(1==showManualDialog){
				var iid = "result" + $.UUID();
				ld = $.dialog({
					id: iid+"_dialog",
					title: "操作结果",
					content: "<div id='"+iid+"' style='color:#fff;'>"+msg+"</div>",
					initialize: function() {},
					width: 230,
					height: 100,
					lock: opts.modal,
					needPad:true
				});	
				var div = $("<div/>");
				$("#"+iid).append(div);
				var btnGroup=$("<div/>").addClass("btn-group buttons");
				div.append(btnGroup);
				if(false==opts.showContinueBtn){
					;// 不显示“继续操作”
				}else{
					// Fix:172726
					btnGroup.append($("<button/>").addClass("btn btn-default btn-white").append($("<i/>").addClass("fa fa fa-gavel btn-white")).append("继续当前操作").bind("click",function(){
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
		   //modification end 2017-11-24
			return ld;	
		},
		messageDialog:function(msg){
			var ld = $.dialog({
				id: "messageDialog",
				title: "操作提示",
				content: "<div id='messageDialog'  style='text-align:center;padding:0px 10px;color:#fff;'>"+msg+"</div>",
				initialize: function() {},
				width: 250,
				height: 120,
				lock: true
			});	
			return ld;
		},
		hy_note:function(msg,options){
			var opts=$.extend({
				modal:true,
				timeout:2000
			},options);
			var dialogWidth=220,
			dialogHeight=120;
			var iid =  "hynote" + $.UUID();
			
			var ld = $.dialog({
				id: iid,
				title: "提示消息",   
				content: "<div id='"+iid+"' style='line-height:120px;'>"+"<div style='color:#fff;height:120px;overflow:hidden;'>"+msg+"</div>"+"</div>",
				initialize: function() {},
				width: dialogWidth,
				height: dialogHeight,
				lock: opts.modal,
				cancel:false,
				fixed:true,
				drag:false,
				resize:false,
				needPad:true
			});	
			// 无需重置对话框位置
			ld._reset=function(){};
			// 该回调用于处理双击模态mask时关闭对话框。artDialog会复用DOM元素，因此不能采用下面的方式来隐藏对话框的部分UI
			var listeners = ld._listeners = ld._listeners || {};
			listeners['cancel']={
				callback:function(){
					$.javaLog('【index.js || 403 line 】' + "handling dialog cancelling");
					$._destroyHYNote(ld);
				}	
			};
			$("#right_"+iid).show().removeAttr("src").attr({"src":$.getImgUrl("/overlayImg/top_02.png")}).removeClass("d-close").css({"top":"-9px","right":"-20px","cursor":"default"}).unbind();
			var div = $("<div/>");
			$("#"+iid).append(div);
			if(opts.buttons){
				var btnGroup=$("<div/>").addClass("btn-group buttons");
				div.append(btnGroup);
				$.each(opts.buttons,function(i,node){
					var btn=$("<button/>").addClass(node.btnClass)
						.append($("<i/>").addClass(node.iconClass))
						.append(node.text).bind("click",{dialog:ld},function(event){
							var ret;
							try{
								ret=node.handler(event);
							}finally{
								if(!(false==ret)){
									$._destroyHYNote(ld);
								}
							}
						});
					btnGroup.append(btn);
				});
			}
			
			var wrap=ld.dom.wrap;
			var $dock2RightBottom=$(".dock2RightBottom");
			var existingCount=$dock2RightBottom.length;
			var bottom=0;
			var pad=0;
			var right=17;
			var cssAttrs={position:"fixed",width:dialogWidth+"px"};
			var ieVersion=getIEVersion();
			if($.isIE()){
				if(8==ieVersion){
					right=-10;
					bottom=-14; // -10
					pad=20;
				}else if(9==ieVersion){
					//right=0;
					right=25;
					bottom=17;
				}else if(10==ieVersion){
					//right=0; 
					right=25;
					bottom=17;
				}
			}
		    cssAttrs.right=right+"px";
			
			if(existingCount>0){
				bottom=bottom+existingCount*($dock2RightBottom.eq(0).height()-pad);
			}
			
			$.hy_log('【index.js || 460 line 】' + "existingCount="+existingCount+",bottom="+bottom);
			cssAttrs.bottom=bottom+"px";
			cssAttrs.height=wrap.height()+"px";

			// border:4px solid red
			wrap.attr("style","").addClass('dock2RightBottom').css(cssAttrs);

			var timeout=opts.timeout;
			var ret = {
				timeoutHandle : -1,
				removeTimeout:function(){
					clearTimeout(ret.timeoutHandle);
				},
				close:function(){
				  $._destroyHYNote(ld);
				}
			};
			
			if(timeout>0){
				ret.timeoutHandle = setTimeout(function(){
					$._destroyHYNote(ld);
				},timeout);
			} 
			
			return ret;
		}
	});
	
})
