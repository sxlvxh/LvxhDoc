$.extend({
	render:function(value,field)
	{
		var r = value[field.fieldName];
		var res = {"value":r,"title":r};
		if(field.fieldParams){
			var json = JSON2.parse(field.fieldParams);
			if(json.render){
			    var t = json.render.renderType;
			    if(json.render.subRenderType && json.render.subRenderType == "alldata"){
				    res.value =  window[t+"_render"](value,json.render);
				    if(json.render && json.render.newTitle == true){
					   res.title = res.value;
				    }
			    }else{
				    if(t == "geocoder"){
					    res.value =  window[t+"_render"](value,json.render);
					    if(json.render && json.render.newTitle == true){
						   res.title = res.value;
					    }   
				    }else{
						res.value =  window[t+"_render"](r,json.render);
						if(json.render && json.render.newTitle == true){
						   res.title = res.value;
						}
					}
			    }	
			}
		}
		return res;
		
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
	decodeJson:function(str, render){
		var res = "";
		var ret = JSON2.parse(str);
		if(!$.isEmptyObject(str)){
			res = ret[render.value];
		}
		return res;
	}

});
function subString_render(value,render)
{
	return $.substring(value,render.length);	
}
function subStringPoint_render(value,render)
{
	return $.substringByPoint(value,render.length);	
}
function decodeJson_render(value,render){
	return $.decodeJson(value,render);	
}
function css_render(value,render)
{
	return "<span class='"+value+"'></span>";	
}
function download_render(value,render)
{
	$.hy_error(value,render);
	var img = $("<img width='28px' height='20px' src='"+$.getImgUrl("/images/cloud_download.png")+"'></img>");
	img.bind("click",function(){
	   window.open($.getImgUrl(value));
	});
	return img;
}
function img_render(value,render)
{
	var v=value;
	if(v && v != "undefined"){
		var img = $("<img/>").attr({"src":$.getImgUrl(v),onerror : "javascript:this.src='"+$.getImgUrl("/images/defaultimg.png")+"'"});
		img.css({"width":"24px","height":"24px","border-radius":"5px","cursor":"pointer"});
		img.bind("click",function(){
			var dialog = $.getShowImgDialog("imgUrl",600,600,v,true);
		});
	    return img;
	}
    return "";
}

function background_render(value,render){
	return "<div style='background:#"+value+"; width:50px;height:30px;margin:0 auto;'></div>";
}
function enable_render(value,render)
{
	var t = ["启用","不启用"];
	return  t[value];	
}

function enableStatus_render(value,render)
{
	var t = ["停用","启用"];
	return  t[value];	
}


function sex_render(value,render)
{
	var t = ["","男","女"];
	return  t[value];	
}

function yesorno_render(value,render)
{
	var t = ["否","是"];
	return  t[value];	
}

function isDel_render(value,render)
{
	var t = ["未删除","已删除"];
	return  t[value];	
}

function roomNodeType_render(value,render)
{
	var t = ["摄像头","展台","无人机","0000","yyyy"];
	return  t[value];	
}
function roomNodeType1_render(value,render)
{
	var t = ["摄像头","","无人机","车载摄像头"];
	return  t[value];	
}
function avType_render(value,render)
{
	var t = ["无效定位","有效定位"];
	return  t[value];	
}
//modified by wucr on 2018-05-31 
function imgEdit_render(value,render)
{
    var v=value;
    if(true==render.useFileServ){
      v=$.hy_getUploadedFileURL(v);  
    }else{
      v= SYSTEM_PARAMS.PAGE_THEME+v; 
    }
    return "<img src='"+v+"' width='"+render.width+"' height='"+render.height+"' style='border-radius:5px;'/>";	

}

function taskType_render(value,render)
{
	var t = ["","事件","任务"];
	return  t[value];	
}
/**
 * added by qianj 20180905
 * 履职保障会议录像类型
 */
function lzbzMeetingRecordType_render(value,render){
	var t = ["","会议录像","求助录像"];
	return  t[value];	
}

/**
 * added by qianj 20180905
 * 社区矫正签到类型
 */
function sqjzSignType_render(value,render){
	var t = ["每日签到","所内面签"];
	return  t[value];	
}

/**
 * added by wcc
 * 城管考勤是否在考勤范围
 */
function lack_render(value,render){
	return Math.abs(parseFloat(value)); 
}

function removeRegion_render(value,info)
{
	if( $.trim(value).length > 0 ){
		eval("var re = /" + info.regx + "(\\S*)/;"); 
		try{
			return value.match(re)[1];
		}catch(e){
			return value;
		} 
		
	}else{
		return "";
	}
}


