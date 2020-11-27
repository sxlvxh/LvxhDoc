var imgJson = {
	'cancel':'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAApVBMVEUAAADwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUijwUigAAAB3yeUIAAAANXRSTlMAAA83VDgQDGLA6/f47MJlDRik/Kca+/6o73CZnW7u/WYOnGz6xBELlu07CVcKPGrFEmmrHHURh5EAAAABYktHRACIBR1IAAAACXBIWXMAAAC0AAAAtACckBztAAAAB3RJTUUH5AocCCwwAIUJCAAAAMhJREFUGNM1j+kSgkAMg1tEvBZd5VJXWVEURfDO+7+aXRzzq/1mkkmIWOT1fL8fuIvcPxiOxhMVTmfaEeb5IkKnKE4cGCyANAOyFFhqAcMIq7UBNtscdsfkjZCuuTD7gA8ljifqjZGZgquK9dniUpM/kThTMV/PEqQa8pWAvYBWchzoh8g2AV9b9oxFfqNginQrfuPxvcTjSTyLkB/Eb+4h7Et66BgoLWBL4F246snS/qrb96fbwnp3vCiVP17Ffy6f6qa5Pbv5X1GrGVIoTGefAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTA3LTE5VDAzOjM5OjE1KzAwOjAwWtAmGAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMS0wOFQyMDowMzo0OSswMDowMBo1jiMAAAAgdEVYdHNvZnR3YXJlAGh0dHBzOi8vaW1hZ2VtYWdpY2sub3JnvM8dnQAAAGN0RVh0c3ZnOmNvbW1lbnQAIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgzkiQCwAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABl0RVh0VGh1bWI6OkltYWdlOjpIZWlnaHQAMTE3MwX302wAAAAYdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMTE3MxC+D3UAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTU0Njk3NzgyOZEZRpkAAAASdEVYdFRodW1iOjpTaXplADUxMDc2QjnHCJwAAABadEVYdFRodW1iOjpVUkkAZmlsZTovLy9kYXRhL3d3d3Jvb3Qvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL2ZpbGVzLzEyMC8xMjA2Njc0LnBuZ6VwE84AAAAASUVORK5CYII=',
    'pause':'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAVFBMVEUAAADlqhflqhflqhflqhflqhflqhflqhflqhflqhflqhflqhflqhflqhflqxnlqxrlqhjlqxvy1Ir35rvuyWrmrR746sX////z2Zf46cLz2JUAAABRYQliAAAADXRSTlMAAA40UAtgvur3F6H7p6fwZQAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAJxAAACcQAZRpURkAAAAHdElNRQfkChwILALIUliIAAAAdElEQVQY02WPSxKAIAxDyx+E+AEV9f4HFVw5NKv2zaRNiESTVFor2Sfqu7HOh+CdNZ0IMcWETylOHZgIzMu6LjMQTQM2Yctl30vekKwg6YDjrNdVzwNwkpRv4K7PU+8GvCId/iBoDpiFHWVveTAWfSw31n8B5hsLGWFn9kMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDctMTlUMDM6Mzk6MjArMDA6MDCGZw5cAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTE4VDE1OjQ3OjQ4KzAwOjAw45gL5AAAACB0RVh0c29mdHdhcmUAaHR0cHM6Ly9pbWFnZW1hZ2ljay5vcme8zx2dAAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OkhlaWdodAA2MDfkuigWAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADYwN3dLeEsAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTU0NzgyNjQ2OJYfemsAAAASdEVYdFRodW1iOjpTaXplADE2MDc4Qo71uxQAAABadEVYdFRodW1iOjpVUkkAZmlsZTovLy9kYXRhL3d3d3Jvb3Qvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL2ZpbGVzLzEyMi8xMjI5MDA3LnBuZwuP4/0AAAAASUVORK5CYII=',
    'reload':'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABUFBMVEVYkapHf5pGfplLgp1YkapYkapYkapXkKpXkKlYkapYkapYkapYkapYkapYkapVjadIgJtGfplGfplGfplHf5pHfplJgZxGfplIgJpHf5lVjqhLhJ5XkapkmbBsnrRXkKlYkapVj6l6qLvP3+aErcBWkKlonLKbvczh6/Ds8vV0obZUjqd9qb3O3ua6z9nV4ujM3ONXiqJgkqmHsMJZkquHq71djqa1zNZjk6lCfJdgkKfS4Od6p7pWj6mjw9CuxtJFfplIf5pOhJ5FfZlGfplEfJieu8mqxNFOhqFakqvB1t99pLdDfJd3oLS/0ttJgJtMhJ5bk6vE2OG70NqyzNidu8mux9KZuMdgkKiIrL3M2+NcjaVFfZiGrsBcjqZWiaLN3OPK2uJvm7BEfZhQiaNum7Dr8fTe6O2QssJYiqNVjad8pbhsmK5ik6tTh6D////ooTaeAAAAHHRSTlMAAAAABk2t6P396BqX8bb9/uit8U6YBrYamP3oVbahHwAAAAFiS0dEb1UIYYEAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfkChwIKjhYBCa8AAAA9ElEQVQY0yWP11bCYBCEN5hEExJUQMRGRjE2ECxIEUsCGxvB3jtib+9/6S+Zu/3OmdkZIiJZUbt7NF1VZOoobJijYykLMI1w544A4xPpSQhFBJENwJ6anpmdy9iAIZNiws7O5/ILi0vLBZgKqbBS6ZViqVxZra6tQyUd9sam49bq7G1t71g6adjda/jsMPvN/YPDXgGOjps+C+I3TlzuExbr9Mzjes11zi887hehdrZ6WSmXilfXN7cc/X9buLt/eMznWk9tjsWDYs8vr2/vH23mgURQHZ9frW+RPJiUgnFA5ufXiQ0lpRAF83VteCQaT0ihrj+jQSmUAVF/AAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNy0xOVQwMzozOToxNSswMDowMFrQJhgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMDhUMjA6MTc6MjgrMDA6MDCySPOqAAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADI1NunDRBkAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgAMjU2ejIURAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2OTc4NjQ44rns1QAAABF0RVh0VGh1bWI6OlNpemUAODczMUIVXhkQAAAAWnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vZGF0YS93d3dyb290L3d3dy5lYXN5aWNvbi5uZXQvY2RuLWltZy5lYXN5aWNvbi5jbi9maWxlcy8xMTUvMTE1OTkwMS5wbmefE6bHAAAAAElFTkSuQmCC'
}

function LxhUpfile(opts){
	this.file = opts.input.files[0];
	this.code = opts.code;
	this.url = opts.url;
	this.size = this.file.size;
	this.name = this.file.name;
	this.step = 1024*1024*opts.step;
	this.start = 0;
	this.end = this.step;
	this.status = true;
	this.success = opts.success;
	this.closeStatus = 0;
	this.element = opts.input;
	this.userCode = opts.userCode;
	this.procWidth = opts.procWidth;  //进度条宽度
	this.uploadParam = opts.uploadParam;  //上传类型限制
	this.cancelFunc = opts.cancelFunc; //取消操作按钮的回调
}

LxhUpfile.prototype.drawImg= function(data){
	var _this = this;
	var img = _this.drawElement({"type":"img","css":[{
		"float":"righr",
		"margin":"0px 5px 0 0",
		"width":"16px",
		"height":"16px",
		"cursor":"pointer"
	}],"attr":[{
		"src":"data:image/png;base64,"+data.img,
		"title":data.title}]
	});
    return img;
}
LxhUpfile.prototype.show = function(element){
	element.style.display = "inline-block";
}
LxhUpfile.prototype.hide = function(element){
	element.style.display = "none";
}
LxhUpfile.prototype.drawElement = function(data){
	var element = document.createElement(data.type);
	if(data.clazz){
		forEachX(data.clazz,function(ele){
			element.classList.add(ele);
		});
	}
	if(data.css){
	    forEachX(data.css,function(ele){
			for(idx in ele){
				element.style[idx] = ele[idx];
			}
		});
	}
	if(data.attr){
		forEachX(data.attr,function(ele){
			for(idx in ele){
				element.setAttribute(idx,ele[idx]);
			}
		});
	}
	return element;
}
LxhUpfile.prototype.append = function(pnode,list){
	for(idx in list){
		pnode.appendChild(list[idx]);
	}
}
LxhUpfile.prototype.appendCss = function(obj){
	for(idx in obj.css){
		for(iidx in obj.css[idx]){
			obj.element.style[iidx] = obj.css[idx][iidx];
		}
	}
}
LxhUpfile.prototype.up= function() {
	var _this = this;
	var fileType = {
		"application/javascript": "js",
		"image/png": "png",
		"image/jpeg": "jpeg",
		"image/jpg": "jpg",
		"image/gif": "gif",
		"video/mp4": "mp4",
		"text/plain": "txt",
		"application/zip": "zip",
		"application/pdf": "pdf",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": "word",
		"application/vnd.ms-excel": "excel",
		"application/msword": "word",
		"text/html": "html",
		"application/x-sql": "sql",
		"video/x-matroska": "mkv",
		"video/webm": "mp4",
		"application/x-gzip": "gz",
		"application/x-zip-compressed": "zip"
	};
	/*{
		"uploadParam" : {
			"type" : ["PNG", "JPG", "GIF"],
			"msg" : "只允许上传PNG，JPG，GIF类型的文件！"
		}
	}*/
	if(_this.uploadParam){
		var ext = fileType[_this.file.type].toUpperCase();
		var f = _this.isAllowUpload(ext);
		if(f && f.flag){
			_this.createElementFunc();  //自定义页面布局
	        _this.replyUp();
		}else{
			if(_this.oDiv){
			   _this.hide(_this.oDiv);
			}
			alert(f.msg);
		}
	}else{
		_this.createElementFunc();  //自定义页面布局
	    _this.replyUp();
	}
}

LxhUpfile.prototype.isAllowUpload = function(ext){
	var _this = this;
	try{
		var flag = false;
		$.each(_this.uploadParam.type, function(i, e){
			if(ext === e){
				flag = true;
				return {"flag": flag};
			}
		});
		return {"flag": flag,"msg":_this.uploadParam.msg};
	}catch(e){alert(e)}
}

LxhUpfile.prototype.replyUp = function(){
   var _this = this;
	_this.ws = new WebSocket(_this.url);
	_this.ws.onopen = function (ev) {
		if (_this.file) {
			_this.ws.send(JSON.stringify({
				name:_this.name,
				code:_this.code,
				size:_this.size,
				type:"file",
				fileType:_this.file.type,
				userCode:_this.userCode
			}))
		}
	};
	_this.ws.onmessage = function (ev) {
		if(typeof(ev.data) == "string"){
			var json = JSON.parse(ev.data);
			if(json.res === 1){
				_this.startX();
			}else if(json.res === 3){
				if(json.sizeX >= _this.size)
				{
					_this.ws.close();
					_this.closeStatus = 1;
					json.ratio = 100;
					json.result = 1;
					json.desc="文件已经存在";
					_this.hide(_this.replyUpBtn);
					_this.hide(_this.oDiv);
					_this.success(json);
				}else
				{
					_this.start = json.sizeX;
					_this.end = json.sizeX + _this.step; 
					_this.startX();
				}
			}else
			{
				_this.closeStatus = 1;
				_this.ws.close();
				json.result = 0;
				json.desc="上传成功";
				//_this.appendCss({"element":_this.oDiv,"css":[{"display":"none"}]});
				_this.hide(_this.replyUpBtn);
				_this.hide(_this.pauseBtn);
				_this.hide(_this.cancleBtn);
				_this.success(json);
			}
			if(_this.procs){
				_this.appendCss({"element":_this.procs,"css":[{"backgroundColor":"#02AA1E","height":"100%","width":json.ratio+"%"}]});
			} 
		}
	};
	_this.ws.onerror = function () {
		_this.ws.close();
		var json = {"result":2,"desc":"上传失败"};
		_this.appendCss({"element":_this.replyUpBtn,"css":[{"display":"inline-block"}]});
		_this.success(json);
	};
	_this.ws.onclose = function () {
		 
	};
}

LxhUpfile.prototype.pause = function(status) {
	var _this = this;
	_this.status = status;
}

LxhUpfile.prototype.reUp = function(){	
	var _this = this;
	_this.pause(true);
	_this.startX();
}
LxhUpfile.prototype.cancle = function() {
	var _this = this;
	_this.status = false;
	_this.ws.close();
}

//该方法可复写，主要功能是自定义页面
LxhUpfile.prototype.createElementFunc = function(){
	var _this = this;
	var fileInput = _this.element;
	var par = fileInput.parentNode;
	_this.oDiv = _this.drawElement({"type":"div","clazz":["upload-list"],"css":[],"attr":[]});
	_this.oDiv.innerHTML = "";
	var containerDiv =  _this.drawElement({"type":"div","clazz":["proc-container-div"],"css":[],"attr":[]});
	var procDiv = _this.drawElement({"type":"div","clazz":["proc-container"],"css":[{"width":_this.procWidth}],"attr":[]});
	_this.procs = _this.drawElement({"type":"div","clazz":[],"css":[],"attr":[]});
	_this.append(procDiv,[_this.procs]);
	var buttonDiv = _this.drawElement({"type":"div","clazz":["proc-button"],"css":[],"attr":[]});
	_this.pauseBtn = _this.drawImg({"img":imgJson.pause,"title":"暂停"});
	_this.continueBtn = _this.drawImg({"img":imgJson.reload,"title":"继续"});
	_this.cancleBtn = _this.drawImg({"img":imgJson.cancel,"title":"取消"});
	_this.replyUpBtn = _this.drawImg({"img":imgJson.reload,"title":"重传"});
	_this.hide(_this.continueBtn);
	_this.hide(_this.replyUpBtn);
	
    _this.append(buttonDiv,[_this.pauseBtn,_this.continueBtn,_this.cancleBtn,_this.replyUpBtn]);
	_this.append(containerDiv,[procDiv,buttonDiv]);
	_this.append(_this.oDiv,[containerDiv]);
	_this.append(par,[_this.oDiv]);
	_this.pauseBtn.onclick = function(){
		_this.pause();
		_this.show(_this.continueBtn);
		_this.hide(_this.pauseBtn);
	};
	_this.continueBtn.onclick = function(){
		_this.reUp();
		_this.show(_this.pauseBtn);
		_this.hide(_this.continueBtn);
	};
	_this.cancleBtn.onclick = function(){
		_this.cancle();
		_this.hide(_this.cancleBtn);
		_this.hide(_this.continueBtn);
		_this.hide(_this.pauseBtn);
		if(_this.cancelFunc){
			_this.cancelFunc();
		}
	};
	_this.replyUpBtn.onclick = function(){
		_this.replyUp();
		_this.hide(_this.replyUpBtn);
	};
}

LxhUpfile.prototype.removeNode = function(){
	var _this = this;
	if(_this.oDiv && _this.oDiv.parentNode){
	   _this.oDiv.parentNode.removeChild(_this.oDiv);
	}
}

LxhUpfile.prototype.startX = function() {
	var _this = this;
	if(_this.status === true)
	{
		var blob = _this.file.slice(_this.start, _this.end);
		var fileReader = new FileReader();
		fileReader.readAsArrayBuffer(blob);
		fileReader.onload = function (e) {
			var result = e.target.result;
			_this.ws.send(result);
			_this.start = _this.end;
			_this.end = _this.end + _this.step; 	
		}
	}
}

function uuid(){
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
};

function forEachX(list, fun){
    for(var i = 0;i< list.length;i++){
        (function(ele){
            fun(ele);
        })(list[i]);
    }
}

function sendMsg(ws,file,size,tep,i){
	var proc = document.getElementById("proc");
	var t = i/(size/tep)*100;
	var tp = (i+1)*tep;
	var blob = file.slice(i*tep, tp);
	var fileReader = new FileReader();
	fileReader.readAsArrayBuffer(blob);
	fileReader.onload = function (e) {
		if(t<98)
		{
			proc.style.width= t+"%";
		}
		// proc.innerHTML=t+"%";
		// 获取到文件对象
		var result = e.target.result;
		// 发送数据到服务器端
		ws.send(result)
		if(tp > size)
		{
		  
		}else{
			/*  {setTimeout(function(){ */
			sendMsg(ws,file,size,tep,i+1)
			/*   },100); */
		}
	}
}