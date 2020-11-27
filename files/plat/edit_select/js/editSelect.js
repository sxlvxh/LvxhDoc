// JavaScript Document
$.fn.bxxeditSelect = function(option){
	var obj = $(this);
	if(option.filter == false)
		{
		 obj.attr({"readonly":"true"});
		}
	$(this).bind("click",function(){
		bxxSelPanel(obj,option);
		$(obj).val("");
		return false;
		})
	$(this).bind("keyup",function(){
		if(option.filter == true)
			{
				var val = $(this).val();
				var option1 = $.extend({},option);
				//var  option1 = $.extend({},option);
				var array = [];
				$.each(option.list,function(i,n){
					if(n.key.indexOf(val) > -1 || n.value.indexOf(val) > -1)
					{
						array.push(n);
					}
				});	
				option1.list = array;
				bxxSelPanel(obj,option1);
			}
		
	})
	
}
var SelPanel;

function bxxSelPanel(obj,option){
	SelPanel = $(obj);
	$(".bxxSelPanel").remove();
	$(SelPanel).after("<div class='bxxSelPanel'></div>");
	var off = $(SelPanel).offset();
	var width = $(SelPanel).width()-105;
	var height = $(SelPanel).height();
	$(SelPanel).next("div").css("width",width);
	var json = option.initParam;
    if(option.list){
	  $.each(option.list,function(i,n){
	  	  if(json && json.rander)
	  	  {
	  	  	$("#"+json.rander.eleName,"#"+json.rander.pid).val("");
	  	  }
		  $(".bxxSelPanel").append(
			  $("<div/>").addClass("bxx-line").attr({"bxxkey":n.key}).html(n.content).bind("click",function(){
				if(option.initParam && option.initParam.changeEvent)
				{
				   window[option.initParam.changeEvent](n);
				}
				option.defaultEvent && option.defaultEvent(n);	 
				$(SelPanel).val($(this).attr("bxxkey"));
				if(json && json.rander)
				{
					$("#"+json.rander.eleName,"#"+json.rander.pid).val(n.data[json.rander.fieldName]);
				}
				$(this).parent().remove();
			   })
		  )
		});	
	}
	var divheight = parseInt((SelPanel).next("div").css("height"));
	var windowHeight = $(window).height();
	var offtop = off.top;
	var less = windowHeight-offtop;
	if(less-divheight>0){
		$(SelPanel).next("div").offset(
			{
				top : off.top + height +1,
				left : off.left
			});
	}else{
		$(SelPanel).next("div").offset(
		{
			top : off.top +1 - divheight,
			left : off.left
		});
	}
	
};

$(function(){
	 /*$("body").click(function(){
		 try
		 {
			$(".bxxSelPanel").remove();
		 }catch(e)
		 {
		 }
	});*/
})
