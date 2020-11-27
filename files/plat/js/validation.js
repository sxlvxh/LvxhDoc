$.extend({
	error_message:function(obj,message)
	{
		var position = $(obj).position();
		var h = $(obj).height() + 5;
		var divp = $("<div/>").attr({"id":obj.attr("id")+"_validator"}).css({"width":$(obj).width()-50,"z-index":"999999"}).addClass("error-message-panel").offset({ top: position.top + h, left:position.left+50 });
		divp.append($("<div>").addClass("error-meesage-befor"));
		divp.append($("<div>").addClass("error-meesage").append('<i class="red fa fa-exclamation-triangle "></i>').append(message));
		$(obj).after(divp);
		$(obj).bind("mouseover",function(){
			divp.show();
		});
		$(obj).bind("mouseout",function(){
			divp.hide();
		});
	},
	lvxh_validator:function(element,field){
		if(field.fieldParams){
			try{
				var json = JSON2.parse(field.fieldParams);
				if(json.validateParam){
					element.unbind("mouseover");
					element.unbind("mouseout");
					element.bind({
						"blur":function(){
						 	$.baseValidation(json.validateParam,element,field);
						}
					});
				} 
			}catch(e){$.hy_log('【validation.js || 28 line 】' + e);}
		}
	},
	baseValidation:function(json,element,field){
		 $.each(json,function(k,m){
			var func = m.id + "_validation";
			if(window[func](element,m)){
				element.removeClass("validate_error");
				$("#"+field.fieldName+"_validator", element.parent()).remove();
			}else{
				$("#"+field.fieldName+"_validator", element.parent()).remove();
				element.addClass("validate_error");
				$.error_message(element,m.message);
				return false;
			}
		});
	},
	div_validation:function(div,field)
	{
		if(field.validateParam)
		  {
			  var json = JSON2.parse(field.validateParam);
			  $.baseValidation(json,div,field);
		  }
	},
	lvxh_form_validation:function(data,parentBtn)
	{
	    $.each(parentBtn.flist,function(i,n){
	    	var field = n;
	    	if(field.fieldParams){
	    		var fieldJson = JSON2.parse(field.fieldParams);
	    		if(fieldJson.validateParam)
				 {
		   			 try{
		   				 var json = fieldJson.validateParam;
		   				 var element = $("#"+n.fieldName+":visible",$("#"+parentBtn.buttonCode+"_form"));
		   				 element.unbind("mouseover");
		   				 element.unbind("mouseout");
		   				 $.baseValidation(json,element,fieldJson);
		   			 }catch(e){$.hy_log('【validation.js || 73 line 】' + e);}
				 }
	    	}
			
	    });
	    var length = $(".validate_error",$("#"+parentBtn.buttonCode+"_form")).length;
	    if(length > 0 ){
	    	return false;
		}
	    else{
		    return true;
		}
	},
	query_form_validation:function(data,button)
	{
        $.each(data.flist,function(i,n){
        	if(n.fieldGroup == button.buttonId)
    		{
        		var field = n;
        		if(field.validateParam)
	   			 {
		   			 try{
		   				 var json = JSON2.parse(field.validateParam);
		   				 var element = $("#"+n.fieldName+":visible",$("#conditionsForm"));
		   				 element.unbind("mouseover");
		   				 element.unbind("mouseout");
		   				 $.baseValidation(json,element,field);
		   			 }catch(e){$.hy_log('【validation.js || 101 line 】' + e);}
	   			 }
    		}
        });
        var length = $(".validate_error",$("#conditionsForm")).length;
        if(length > 0 )
        	{
	        	return false;
        	}
        else 
        	{
        	    return true;
        	}
	},
	query_report_form_validation:function(data,button)
	{
        $.each(data.flist,function(i,n){
        	if(n.fieldGroup == button.buttonId)
    		{
        		var field = n;
        		if(field.validateParam)
	   			 {
		   			 try{
		   				 var json = JSON2.parse(field.validateParam);
		   				 var element = $("#"+n.fieldName+":visible",$("#report_conditionsForm"));
		   				 element.unbind("mouseover");
		   				 element.unbind("mouseout");
		   				 $.baseValidation(json,element,field);
		   			 }catch(e){$.hy_log('【validation.js || 101 line 】' + e);}
	   			 }
    		}
        });
        var length = $(".validate_error",$("#report_conditionsForm")).length;
        if(length > 0 ){
	        return false;
        }
        else{
        	return true;
        }
	},
	plat_form_validation:function(data){
		$.each(data.blist,function(i,n){
			$.each(n.flist,function(j,m){
				if(n.buttonCode == m.buttonCode){
					if(m.fieldParams){
						try{
							var json = JSON2.parse(m.fieldParams);
							if(json.validator){
								var element = $("#"+m.fieldName+":visible",$("#"+m.buttonCode));
							    element.unbind("mouseover");
							    element.unbind("mouseout");
								$.platBaseValidation(json.validator,element,m);
							}
						}catch(e){
							$.hy_log("plat_form_validation error"+e);
						}
					}
				}
			})
		})
	},
	/*baseValidation:function(json,element,field){
		 $.each(json,function(k,m){
			var func = m.id + "_validation";
			if(window[func](element,m)){
				element.removeClass("validate_error");
				$("#"+field.fieldName+"_validator", element.parent()).remove();
			}else{
				$("#"+field.fieldName+"_validator", element.parent()).remove();
				element.addClass("validate_error");
				$.error_message(element,m.message);
				return false;
			}
		});
	}*/
	platBaseValidation:function(json,element,field){
		$.each(json,function(k,m){
			var func = m.id + "_validation";
			if(window[func](element,m)){
				element.removeClass("validate_error");
				$("#"+field.fieldName+"_validator", element.parent()).remove();
			}else{
				$("#"+field.fieldName+"_validator", element.parent()).remove();
				element.addClass("validate_error");
				$.error_message(element,m.message);
				return false;
			}
		});
	}
	
});
function required_validation(element,validationParam)
{
	//$.hy_error(element,validationParam);
	var value = element.val();
	return value && $.trim(value).length > 0 ;
}
function length_validation(element,validationParam)
{
	var value = element.val();
	return $.trim(value).length >= validationParam.start && $.trim(value).length<=validationParam.end;
}

function modify_length_validation(element,validationParam)
{
	var value = element.val();
	return (value.length >= validationParam.start && value.length<=validationParam.end)||($.trim(value).length == 0);
}

function equal_validation(element,validationParam)
{
	var value = element.val();
	var pageNode = $("#"+validationParam.pagenode,element.closest("form"));
	var nodeValue = pageNode.val();
	if(value == nodeValue){
		pageNode.removeClass("validate_error");
		$("#"+validationParam.pagenode+"_validator", pageNode.parent()).remove();
	}
	return value == nodeValue;
}
function check_validation(element,validationParam)
{
	$.hy_error(element,validationParam);
	var value = element.val();
	 isCheck =/^[a-zA-z0-9\u4E00-\u9FA5\s]*$/;
	return isCheck.test(value) ;
}
//added by huangwenhai on 2017-11-06 
function unequal_validation(element,validationParam)
{
	return !equal_validation(element,validationParam);
}

//add end 2017-11-06 

function telephone_validation(element, validationParam)
{
	var value = element.val(),
        isMob=/^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|15[0123456789][0-9]{8}|18[0123456789][0-9]{8}|17[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/; 
	return isMob.test(value)||($.trim(value).length == 0);
}

function email_validation(element, validationParam)
{
	var value = element.val(),
	    isEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
	return isEmail.test(value)||($.trim(value).length == 0);
}

function IDNumber_validation(element, validationParam){
	var value = element.val();
	    re = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
	    return re.test(value)||($.trim(value).length == 0);
}

function IP_validation(element, validationParam){
	var value = element.val(),
	    isIP = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/;
	    return isIP.test(value) || ($.trim(value).length == 0);
}

function Iport_validation(element, validationParam){
	var value = element.val(),
	    isIport = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
	    return isIport.test(value) || ($.trim(value).length == 0);
}


function ajax_validation(elememt, validationParam)
{
	
	var value = $.trim(elememt.val());   //输入框中输入的数据
	
	var res = true;
	var data = {"nofuzzy":1,"isdel":0};
	data[validationParam['post']] = value;
	
	if(validationParam.postData){

		$.each(validationParam.postData,function(i,n){
			if(n['type'] == "fromElement"){
				var parentid = n['parentId'];
				var fieldId = n['fieldId'];
				var needdata = $("form#"+parentid+"_form" + " "+"#"+fieldId).find("option:selected").val();
				$.hy_log('【validation.js || 200 line 】' + needdata);
				data[fieldId] = needdata;
			}else if(n.type == "staticElement") 
				{
				    data[n.fieldId] = n.value;
				}else if(n.type == "inputElement"){
					var parentid = n['parentId'];
					var fieldId = n['fieldId'];
					var needdata = $("form#"+parentid+"_form" + " "+"#"+fieldId).val();
					data[fieldId] = needdata;
				}
         });
	}
	var opt  = {async:false,url:validationParam.url,data:data,success:function(result){
	
		if(validationParam.filedParams){   //自定义数据库中可以查出指定条数的数据
		
			if(result.result && result.result.length > validationParam.filedParams.postValue*1){
				res =  false;
			}
		}else{
			$.each(result.result,function(i,n){
				if(n.mobilePhone==value){
					res=false;
				}
			})
			/*if(result.result && result.result.length > 0){
				res =  false;
			}*/
		}
		
		
	}};
	$._ajax(opt);
	return res;
}

function update_validation(elememt, validationParam)
{
	var value = $.trim(elememt.val());   //输入框中输入的数据
	
	var res = true;
	var data = {"nofuzzy":1};
	data[validationParam['post']] = value;
	var elementId = $("#id",$("form#"+validationParam.parentId+"_form")).val();
	if(validationParam.postData){
		$.each(validationParam.postData,function(i,n){
			if(n['type'] == "fromElement"){
				var parentid = n['parentId'];
				var fieldId = n['fieldId'];
				var needdata = $("form#"+parentid+"_form" + " "+"#"+fieldId).find("option:selected").val();
				$.hy_log('【validation.js || 200 line 】' + needdata);
				data[fieldId] = needdata;
			}else if(n.type == "staticElement") 
				{
				    data[n.fieldId] = n.value;
				}else if(n.type == "inputElement"){
					var parentid = n['parentId'];
					var fieldId = n['fieldId'];
					var needdata = $("form#"+parentid+"_form" + " "+"#"+fieldId).val();
					data[fieldId] = needdata;
				}
         });
	}
	var opt  = {async:false,url:validationParam.url,data:data,success:function(result){
		 
		if(result.result && result.result.length > 0){
			console.error("id:::"+result.result[0].id+"elementId:::"+elementId);
			if(result.result[0].id == elementId){
				res = true;
			}else{
				res =  false;
			}
			
		}else{
			res = true;
		}
	 
	}};
	$._ajax(opt);
	return res;
	
}

function w_ajax_validation(element, validationParam){
	var value = element.val();   //输入框中输入的数据
	var res = true;
	var data = {"nofuzzy":1,"isdel":2};
	data[validationParam['post']] = value;
	
	var selfId = $("form#"+validationParam.parentId+"_form"+" "+"#" + validationParam.modifyId).val();
	var myselfId = $("form#"+validationParam.parentId +" "+"#" + validationParam.modifyId).val();
	if(validationParam.postData){
		$.each(validationParam.postData,function(i,n){
			if(n['type'] == "fromElement"){
				var parentid = n['parentId'];
				var fieldId = n['fieldId'];
				var needdata = $("form#"+parentid+" "+"#"+fieldId).find("option:selected").val();
				$.hy_log('【validation.js || 239 line 】' + needdata);
				data[fieldId] = needdata;
			}else if(n.type == "staticElement") 
				{
				  data[n.fieldId] = n.value;
				}else if(n.type == "inputElement") {
					var parentid = n['parentId'];
					var fieldId = n['fieldId'];
					var needdata = $("form#"+parentid+"_form" + " "+"#"+fieldId).val();
					data[fieldId] = needdata;
				}
		 });
	};
	var opt  = {async:false,url:validationParam.url,data:data,success:function(result){
		if(validationParam.filedParams){  //自定义数据库中可以查出指定条数的数据
			if(result.result.length > validationParam.filedParams.postValue*1){
				$.each(result.result,function(idx,ele){
					if(validationParam.hasForm == true){
						if(myselfId == ele[validationParam.modifyId]){
							res =  true;
						}else{
							res =  false;
						}
					}else{
						if(selfId == ele[validationParam.modifyId]){
							res =  true;
						}else{
							res =  false;
						}
					}
				});	
			}
		}else{
			if(result.result && result.result.length > 0){
				$.each(result.result,function(idx,ele){
					if(validationParam.hasForm == true){
						if(myselfId == ele[validationParam.modifyId]){
							res =  true;
						}else{
							res =  false;
						}
					}else{
						if(selfId == ele[validationParam.modifyId]){
							res =  true;
						}else{
							res =  false;
						}
					}
				});	
			}
		}	
	}};
	$._ajax(opt);
	return res;
}

function custom_ajax_validation(element, validationParam){
	//自定义ajax校验
	var value = element.val();   //输入框中输入的数据
	var res = true;
	var data = {"nofuzzy":1};
	data[validationParam['post']] = value;
	var selfId = $("form#"+validationParam.parentId+"_form"+" "+"#" + validationParam.modifyId).val();
	var myselfId = $("form#"+validationParam.parentId +" "+"#" + validationParam.modifyId).val();
	var needselfId =  $("form#"+validationParam.parentId +" "+"#" + validationParam.neededId).val();
	if(validationParam.postData){
		
	}
	data[validationParam['neededId']] = needselfId;
	var opt = {
		async:false,
		url:validationParam.url,
		data:data,	
		success : function(result){
			if(result.result && result.result.length > 0){
				$.each(result.result,function(idx,ele){
					if(validationParam.hasForm == true){
						if(myselfId == ele[validationParam.modifyId]){
							res =  true;
						}else{
							res =  false;
						}
					}else{
						if(selfId == ele[validationParam.modifyId]){
							res =  true;
						}else{
							res =  false;
						}
					}
				})
			}
		}
	};
	$._ajax(opt);
	return res;
}

function entP_required_validation(elememt, validationParam){
	var value = elememt.val();
	var level = $("form#"+validationParam.parentid+" "+"#"+validationParam.fieldId).find("option:selected").val();
	return (value && $.trim(value).length > 0)||(level == 1);
}

function multiSelect_required_validation(element, validationParam){
	var len = $("ul#b_multi_ul_right li",element).length;
	return len>=1;
}

function singSelect_required_validation(element, validationParam){
	var len = $("ul#b_multi_ul_right li",element).length;
	return len=1;
}

function lng_validation(element, validationParam){
	var value = element.val(),
	    regeX = /^[-\+]?((1[0-7]\d{1}|0?\d{1,2})\.\d{1,5}|180\.0{1,5})$/;
	return regeX.test(value)||($.trim(value).length == 0);
}

function lat_validation(element, validationParam){
	var value = element.val(),
	    regeY = /^[-\+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/;
	return regeY.test(value)||($.trim(value).length == 0);
}

function customId_validation(element, validationParam){
	var value = element.val(),
		re=/^[A-Za-z0-9_]+$/;
	return re.test(value);
}

function versionId_validation(element, validationParam){
	var value = element.val(),
		re=/^[A-Za-z0-9_.,]+$/;
	return re.test(value);
}

function onlyNumber_validation(element, validationParam){
	var value = element.val();
	if(value==""||value=="undefined"||!value){
		return true;
	}		
		re=/^[0-9]*$/;
	return re.test(value);
}

function ageNumber_validation(element, validationParam){
	var value = element.val();
	if(value==""||value=="undefined"||!value){
		return true;
	}		
		re=/^1[0-9]$|^[2-9]\d$|^1\d{2}$/;
	return re.test(value);
}



function onlyPositiveNumber_validation(element, validationParam){
	var value = element.val();
	if(value==""||value=="undefined"||!value){
		return true;
	}		
	 re=/^[0-9]\d*(\.\d+)?$/;
    return re.test(value);
}

function compareDatetimeL_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();
	return value < currentTime || ($.trim(value).length == 0);
}

function compareDatetimeR_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();	
	return value > currentTime || ($.trim(currentTime).length == 0);
} 
function compareDatetimeLl_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();
	if(currentTime==""||currentTime=="undefined"||!currentTime){
		return true;
	}
	return value < currentTime || ($.trim(value).length == 0);
}

function compareDatetimeRr_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();	
	if(currentTime==""||currentTime=="undefined"||!currentTime){
		return true;
	}
	return value > currentTime || ($.trim(currentTime).length == 0);
} 
function timeBeforeToday_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $.date_format(new Date(), "yyyy-mm-dd");
	return value < validateTime || ($.trim(value).length == 0);
} 

function dateBeforeOrEqualToday_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $.date_format(new Date(), "yyyy-mm-dd");
	return value <= validateTime || ($.trim(value).length == 0);
} 

function img_validation(element,validationParam){
	var value = element.val();
	var extStart=value.lastIndexOf(".");
	var ext=value.substring(extStart,value.length).toUpperCase();
	var flag = !(ext!=".BMP" &&ext!=".PNG" && ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG");
	return flag;
}
function compareDatetimeLs_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();
	if(currentTime==""||currentTime=="undefined"||!currentTime){
		return true;
	}
	if(value==""||value=="undefined"||!value){
		return true;
	}
	return value < currentTime || ($.trim(value).length == 0);
}

function compareDatetimeRs_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();	
	if(currentTime==""||currentTime=="undefined"||!currentTime){
		return true;
	}
	if(value==""||value=="undefined"||!value){
		return true;
	}
	return value > currentTime || ($.trim(currentTime).length == 0);
} 

function compareDateL_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();
	if(currentTime==""||currentTime=="undefined"||!currentTime){
		return true;
	}
	if(value==""||value=="undefined"||!value){
		return true;
	}
	return value <= currentTime || ($.trim(value).length == 0);
}

function compareDateR_validation(element,validationParam) {
	var value = element.val();
	var validateTime = $("#"+validationParam.validatetime,element.closest("form"));
	var currentTime = validateTime.val();	
	if(currentTime==""||currentTime=="undefined"||!currentTime){
		return true;
	}
	if(value==""||value=="undefined"||!value){
		return true;
	}
	return value >= currentTime || ($.trim(currentTime).length == 0);
} 

function compareCurrTime_validation(element,validationParam) {
	var value = element.val();
	var myDate = new Date();
	var currentTime = myDate.getFullYear()+"-"+((myDate.getMonth()+1)<10?"0":"")+(myDate.getMonth()+1)+"-"+(myDate.getDate()<10?"0":"")+myDate.getDate();
	return value >= currentTime;
}


function Time_validation(element,validationParam){
	var value = element.val(),
    re=/^([0-2][0-9]):([0-5][0-9]):([0-5][0-9])$/;
	return re.test(value);
}

function TimeR_validation(element,validationParam){
	var value = element.val();
    var valueR = $("#"+validationParam.validatetime,element.closest("form")).val();
	return value < valueR;
}

function TimeL_validation(element,validationParam){
	var value = element.val();
    var valueL = $("#"+validationParam.validatetime,element.closest("form")).val();
	return value > valueL;
}
//时间差的比较
function timeDifferenceL_validation(element,validationParam){
	var value = element.val();
    var valueL = $("#"+validationParam.validatetime,element.closest("form")).val();
	var date_hour = (value.getTime()- valueL.getTime())/1000/3600;
	var customHour = validationParam.customHour;
	return Math.abs(date_hour) > customHour;	
}
//时间差的比较
function timeDifferenceR_validation(element,validationParam){
	var value = element.val();
    var valueL = $("#"+validationParam.validatetime,element.closest("form")).val();
	var date_hour = (value.getTime()- valueL.getTime())/1000/3600;
	var customHour = validationParam.customHour;
	return Math.abs(date_hour) > customHour;
}
/**
* 验证人员和部门不能同时为空  
* modified by liugui
*/
function personListAndDept_validation(element,validationParam) {
	var deptId = $(".profile-info-row .profile-info-value #deptId").val();
	var personLength = $(".profile-info-row .profile-info-value #b_multi_ul_right li").length;
	if(deptId=="" && personLength==0){
		return false;
	}else{
		return true;
	}
}

//只能字母数字下划线校验
function uniqueCode_validation(element,validationParam){
	var value = $.trim(element.val())
    re=/^[0-9a-zA-Z_-]{1,}$/;
	return re.test(value);
}

function hourBig_validation(element,validationParam){
	var value = element.val();
    var valueL = $("#"+validationParam.validatetime,element.closest("form")).val();
	return value >= valueL;
}

function hoursmall_validation(element,validationParam){
	var value = element.val();
    var valueL = $("#"+validationParam.validatetime,element.closest("form")).val();
	return value <= valueL;
}