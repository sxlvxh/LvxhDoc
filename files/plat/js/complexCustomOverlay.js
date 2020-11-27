/**
 * 复杂的自定义覆盖物
 * @param point 坐标点
 * @param options ：{
 *     divCss：{
 *          backgroundUrl:"../images/ecs/setDestination.png",
 *     }
 *     title:"设置任务地点",
 *     titleIconUrl:"../images/ecs/coordinate.png",
 *     text1:"地址：",
 *     text2:"任务："
 * }
 * @returns
 */
function ComplexCustomOverlay(point,options) {
	this._point = point;
	this._options = options;
	if(options){
		if(options.title){
			this._title = options.title;
		}
		
		if(options.text1){
			if(options.text1.length>15){
			    this._text1 = options.text1.substring(0,15)+"..."; 
			}else{
				this._text1 = options.text1;
			}
		}
		
		if(options.text2){
			if(options.text2.length>15){
			    this._text2 = options.text2.substring(0,15)+"..."; 
			}else{
				this._text2 = options.text2;
			}
		}
	}
}

ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map) {
	this._map = map;
	//最外层div
	var div = this._div = document.createElement("div");
	$(div).css({
		"whiteSpace":"nowrap",
		"MozUserSelect":"none",
		"position":"absolute",
		"z-index":BMap.Overlay.getZIndex(this._point.lat),
		//"background":"url("+SYSTEM_PARAMS.PAGE_THEME+"/images/ecs/setDestination.png) no-repeat",
		"background":"url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/setDestination.png) no-repeat",
		"height":"177px",
		"width":"264px",
		"padding":"2px"
	});
//    div.style.whiteSpace = "nowrap";//段落中的文本不进行换行：
//    div.style.MozUserSelect = "none";//让文字不被选中
//    div.style.position = "absolute";
//    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
//    div.style.background = "url(../images/ecs/setDestination.png) no-repeat";
//    div.style.height = "177px";
//    div.style.width = "264px";
//    div.style.padding = "2px";
    
    //第一行标题【设为任务、事件目的地】
    var titleDiv = document.createElement("div");
    $(titleDiv).css({
    	position:"absolute",
    	color:"white",
    	height:"18px",
    	lineHeight:"18px",
    	top:"45px",
    	left:"52px",
    	fontSize:"14px",
    	fontWeight:"bold"
    });
//    titleDiv.style.position = "absolute";
//    titleDiv.style.color = "white";
//    titleDiv.style.height="18px";
//    titleDiv.style.lineHeight="18px";
//    titleDiv.style.top = "45px";
//    titleDiv.style.left = "52px";
//    titleDiv.style.fontSize = "14px";
//    titleDiv.style.fontWeight = "bold";
    
    //第一行标题前面的小图标
    var titleIconDiv = document.createElement("div");
    $(titleIconDiv).css({
    	//"background":"url("+SYSTEM_PARAMS.PAGE_THEME+"/images/ecs/coordinate.png) no-repeat",
		"background":"url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/coordinate.png) no-repeat",
    	"width":"18px",
    	"height":"18px",
    	"margin-right":"6px",
    	"float":"left"
    });
    
    //第二行文字，标题下方第一行
    var textDiv1 = document.createElement("div");
    textDiv1.style.color = "white";
    textDiv1.style.height="18px";
    textDiv1.style.width="100%";
    textDiv1.style.lineHeight="18px";
    textDiv1.style.marginTop = "70px";
    textDiv1.style.marginLeft = "50px";
    textDiv1.style.fontSize = "12px";
    
    //第三行文字，标题下方第二行
    var textDiv2  = document.createElement("div");
    textDiv2.style.color = "white";
    textDiv2.style.height="18px";
    textDiv2.style.width="100%";
    textDiv2.style.lineHeight="18px";
    textDiv2.style.marginTop = "10px";
    textDiv2.style.marginLeft = "50px";
    textDiv2.style.fontSize = "12px";
    
    // 按钮容器
    var btnGroupDiv = document.createElement("div"); 
    btnGroupDiv.style.width = "100%";
    btnGroupDiv.style.height = "28px";
    btnGroupDiv.style.marginTop = "10px";
    btnGroupDiv.style.marginLeft = "45px";
    
    //取消按钮
    var cancelBtnDiv = document.createElement("div"); 
    cancelBtnDiv.style.background = "rgba(65, 66, 87, 0.30)";
    cancelBtnDiv.style.width = "58px";
    cancelBtnDiv.style.height = "24px";
    cancelBtnDiv.style.lineHeight = "22px";
    cancelBtnDiv.style.paddingLeft = "14px";
    cancelBtnDiv.style.borderRadius="4px";
    cancelBtnDiv.style.float = "left";
    cancelBtnDiv.style.color = "#414257";
    cancelBtnDiv.style.border = "1px solid #414257";
    cancelBtnDiv.style.marginRight="6px";
    cancelBtnDiv.style.marginLeft = "14px";
    cancelBtnDiv.style.cursor="pointer";
    
    // 确认按钮
    var confirmBtnDiv = document.createElement("div"); 
    confirmBtnDiv.style.background = "#414257";
    confirmBtnDiv.style.width = "58px";
    confirmBtnDiv.style.height = "24px";
    confirmBtnDiv.style.lineHeight = "22px";
    confirmBtnDiv.style.paddingLeft = "14px";
    confirmBtnDiv.style.float = "left";
    confirmBtnDiv.style.marginRight="6px";
    confirmBtnDiv.style.borderRadius="4px";
    confirmBtnDiv.style.color="white";
    confirmBtnDiv.style.marginLeft = "40px"
    confirmBtnDiv.style.cursor="pointer";
  	  
    cancelBtnDiv.appendChild(document.createTextNode("取消"));  
    confirmBtnDiv.appendChild(document.createTextNode("确定"));  
    btnGroupDiv.appendChild(cancelBtnDiv); 
    btnGroupDiv.appendChild(confirmBtnDiv);
    
    titleDiv.appendChild(titleIconDiv);
    div.appendChild(titleDiv);
    div.appendChild(textDiv1);  
    div.appendChild(textDiv2);  
    div.appendChild(btnGroupDiv);  
     
    titleDiv.appendChild(document.createTextNode(this._title));  // 标题
    textDiv1.appendChild(document.createTextNode(this._text1));  // 地址 
    textDiv2.appendChild(document.createTextNode(this._text2)); // 任务
    
    var onCancelCallback,onConfirmCallback;
    if(this._options && this._options.onCancel){
    	onCancelCallback = this._options.onCancel;
    }
    
    if(this._options && this._options.onConfirm){
    	onConfirmCallback = this._options.onConfirm;
    }
    
    cancelBtnDiv.onclick = function(){
      //$(map.getPanes().labelPane).empty();
      if(onCancelCallback){
    	  onCancelCallback();
      }
    }
    
    confirmBtnDiv.onclick = function(){
    	//$(map.getPanes().labelPane).empty();
    	if(onConfirmCallback){
    		onConfirmCallback();
        }
    }
	map.getPanes().labelPane.appendChild(div);

	return div;
}

ComplexCustomOverlay.prototype.draw = function() {
	var map = this._map;
	var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - 8 + "px";
    this._div.style.top  = pixel.y - 8 + "px";
}







// 复杂的自定义覆盖物
    function hy_overlay(point,id){
      this._point = point;
	  this._id = id;

    }
    hy_overlay.prototype = new BMap.Overlay();
    hy_overlay.prototype.initialize = function(map){
      this._map = map;
      var div = this._div = document.createElement("div");
	  div.id = this._id;
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#f1f1f1";
      div.style.border = "1px solid #f1f1f1";
      div.style.color = "black";
      div.style.height = "135px";
	  div.style.width = "300px";
      div.style.padding = "2px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"; 
      	  
	  
      var arrow = this._arrow = document.createElement("div");
      //arrow.style.background = "url("+SYSTEM_PARAMS.PAGE_THEME+"/image/baidu_marker_arrow.png) no-repeat";
	  arrow.style.background = "url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/baidu_marker_arrow.png) no-repeat",
      arrow.style.position = "absolute";
      arrow.style.width = "11px";
      arrow.style.height = "10px";
      arrow.style.top = "134px";
      arrow.style.left = "10px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
          
      map.getPanes().labelPane.appendChild(div);
      
      return div;
    }
    hy_overlay.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y - 200 + "px";
    }
   
    // 怀业自定义覆盖物，第2版
	/*
	  data = {
			id: pid, //自定义覆盖物ID
			width: 300, //自定义覆盖物宽度
			height: 140, //自定义覆盖物高度
			scoreKey: false, //是否开启覆盖物和初始地址的连线。
			bthHeight: 30,//覆盖物底部高度
			strokeColor: "red",//连线颜色
			strokeWeight: 2, //连线宽度
			strokeOpacity: 0.3 //连线透明度
	   }
	   point = new BMap.Point(lng,lat);//百度坐标 参考：http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a1b0
	*/
function HyCustomCover(point,data){
    this._point = point;
    this._id = data.id;
    this._hideMarker;
    this.x = point.lng;
    this.y = point.lat;
    this.polyline;
    this._width = data.width;
    this._height = data.height;
    this._bthHeight = data.bthHeight;
    this._enableDragging = true;
    this._bthWidth = 0;
    if(data._bthWidth)
    {
	   this._bthWidth = data._bthWidth;
    }
    if(data.enableDragging || data.enableDragging == false)
    {
	   this._enableDragging = data.enableDragging;
    }
    if(data.scoreKey)
    {
	   this._scoreKey = data.scoreKey;
    }else
    {
	   this._scoreKey = false;
    }
    if(data.strokeColor)
    {
	   this._strokeColor = data.strokeColor;
    }else
    {
	   this._strokeColor = "blue";
    }
  
    if(data.strokeWeight)
    {
	   this._strokeWeight = data.strokeWeight;
    }else
    {
	   this._strokeWeight = 2;
    }
  
    if(data.strokeOpacity)
    {
	   this._strokeOpacity = data.strokeOpacity;
    }else
    {
	   this._strokeOpacity = 0.5;
    }
}
HyCustomCover.prototype = new BMap.Overlay();
HyCustomCover.prototype.initialize = function(map){
      this._map = map;   
      var div = this._div = document.createElement("div");
	  div.id = this._id;
	  div.setAttribute("tag", "HyCustomCover");
      div.style.position = "absolute";
      div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
      div.style.backgroundColor = "#f1f1f1";
      div.style.border = "1px solid #f1f1f1";
      div.style.color = "black";
      div.style.height = this._height + "px";
	  div.style.width = this._width + "px";
      div.style.padding = "0px";
      div.style.lineHeight = "18px";
      div.style.whiteSpace = "nowrap";
      div.style.MozUserSelect = "none";
      div.style.fontSize = "12px"; 
	  
	  var arrow = this._arrow = document.createElement("div");
	  arrow.style.background = "url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/baidu_marker_arrow.png) no-repeat",
      arrow.style.position = "absolute";
      arrow.style.width = "0px";
      arrow.style.height = "0px";
      arrow.style.top = this._height + "px";
      arrow.style.left = "0px";
      arrow.style.overflow = "hidden";
      div.appendChild(arrow);
          
      map.getPanes().labelPane.appendChild(div);      
      
      return div;
    }
HyCustomCover.prototype.draw = function(){
      var map = this._map;
      var pixel = map.pointToOverlayPixel(this._point);
      this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
      this._div.style.top  = pixel.y + "px";
	  var div = this._div;
	  var arrow = this._arrow;
	  if(this._hideMarker)
	  {
		  map.removeOverlay(this._hideMarker);
	  }
	  //http://192.168.3.133:8280/cg-war/ace/assets/css/images/meteorshower2.jpg
	  //../theme/deepblue/hy_default/sys/point.png
	  var myIcon = new BMap.Icon(platParams.filesServerVisit+"/theme/deepblue/overlayImg/middle.png", new BMap.Size(this._width-this._bthWidth,this._height-this._bthHeight));
	  var hideMarker = new BMap.Marker(this._point,{icon:myIcon}); 
	  hideMarker.setOffset(new BMap.Size(this._width/2,(this._height)/2-this._bthHeight/2));
	  if(this._enableDragging)
		  {
		  	hideMarker.enableDragging();
		  }
	  var o = this;
	  hideMarker.addEventListener("dragging",function(){
		  try{
		  o._point = hideMarker.getPosition();		 
		  var pixel = map.pointToOverlayPixel(o._point);
          div.style.left = pixel.x - parseInt(arrow.style.left) + "px";
          div.style.top  = pixel.y + "px";	
		  if(o._scoreKey == true)
		  {
			  if(o.polyline)
			  {
				  map.removeOverlay(o.polyline);
			  }			  
			  o.polyline = new BMap.Polyline([
					o._point,
					new BMap.Point(o.x,o.y)
				], {strokeColor:o._strokeColor, strokeWeight:o._strokeWeight, strokeOpacity:o._strokeOpacity});   //创建折线
			  map.addOverlay(o.polyline);   //增加折线
		  }
          
		  }catch(e){
			   $.hy_log(" ================== " + e );
		  }
	  });
	  map.addOverlay(hideMarker);
	  this._hideMarker = hideMarker;
	  
    }
HyCustomCover.prototype.removeHyCustomCover = function()
	{
		if(this._scoreKey == true && this.polyline)
		{
			this._map.removeOverlay(this.polyline);
         
		}
	    this._map.removeOverlay(this._hideMarker);
	    
	    $(this._div).remove();
		
	}
//自定义覆盖物化连接线
HyCustomCover.prototype.rePolyline = function(point)
	{
		var map = this._map;
		var o = this;
		if(o._scoreKey == true)
		  {
			  if(o.polyline)
			  {
				  map.removeOverlay(o.polyline);
			  }	
			  o.polyline = new BMap.Polyline([
					o._point,
					point
				], {strokeColor:o._strokeColor, strokeWeight:o._strokeWeight, strokeOpacity:o._strokeOpacity});   //创建折线
			  map.addOverlay(o.polyline);   //增加折线
			  o.x = point.lng;
			  o.y = point.lat;
		  }
		
	}
HyCustomCover.prototype.initialize1 = function(map){
    this._map = map;   
    var div =  document.createElement("div");
	  div.id = this._id;
	  div.setAttribute("tag", "HyCustomCover");
	  div.style.height = this._height + "px";
	  div.style.width = this._width + "px";
	  div.style.margin = "30px 10px";
	  div.style.backgroundColor = "#1c366a";
	  div.style.opacity = "0.6";
	  div.style.color = "#FFF";
  /*  div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "#f1f1f1";
    div.style.border = "1px solid #f1f1f1";
    div.style.color = "black";
    div.style.height = this._height + "px";
	  div.style.width = this._width + "px";
    div.style.padding = "0px";
    div.style.lineHeight = "18px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "12px"; */
	  
	  var arrow = this._arrow = document.createElement("div");
    //arrow.style.background = "url("+SYSTEM_PARAMS.PAGE_THEME+"/image/baidu_marker_arrow.png) no-repeat";
	arrow.style.background = "url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/baidu_marker_arrow.png) no-repeat",
    arrow.style.position = "absolute";
    arrow.style.width = "0px";
    arrow.style.height = "0px";
    arrow.style.top = this._height + "px";
    arrow.style.left = "0px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);
    
    this._div = panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
   /* panel.style.backgroundColor = "#f1f1f1";*/
   /* panel.style.border = "1px solid red";*/
    panel.style.color = "black";
    panel.style.height = (this._height*1+40) + "px";
    panel.style.width = (this._width*1 + 20)+ "px";
    panel.style.padding = "0px";
    panel.style.lineHeight = "18px";
    panel.style.whiteSpace = "nowrap";
    panel.style.MozUserSelect = "none";
    panel.style.fontSize = "12px"; 
    panel.id = "panel_"+this._id;
    
    
    var leftTop = document.createElement("image");
    var leftBottom  = document.createElement("image");
    var rightTop  = document.createElement("image");
    var rightBottom  = document.createElement("image");
    var close  = document.createElement("image");
    
    //leftTop.setAttribute("src", SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/top01.png");
    //leftBottom.setAttribute("src", SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/footer01.png");
    //rightTop.setAttribute("src", SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/top05.png");
    //rightBottom.setAttribute("src", SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/footer03.png");
    //close.setAttribute("src", SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/close.png");
	
	leftTop.setAttribute("src", platParams.filesServerVisit+"/theme/deepblue/overlayImg/top01.png");
    leftBottom.setAttribute("src", platParams.filesServerVisit+"/theme/deepblue/overlayImg/footer01.png");
    rightTop.setAttribute("src", platParams.filesServerVisit+"/theme/deepblue/overlayImg/top05.png");
    rightBottom.setAttribute("src", platParams.filesServerVisit+"/theme/deepblue/overlayImg/footer03.png");
    
    close.setAttribute("src", platParams.filesServerVisit+"/theme/deepblue/overlayImg/close.png");
    close.style.float="right";
    close.style.position = "absolute";
    close.style.right= "1px";
    close.style.top= "-8px";
    close.style.cursor= "pointer";
   
    
    leftTop.style.float="left";
    rightTop.style.float="right";
    leftBottom.style.float="left";
    rightBottom.style.float="right";
    
    leftTop.style.position = "absolute";
    rightTop.style.position = "absolute";
    leftBottom.style.position = "absolute";
    rightBottom.style.position = "absolute";
    
    leftBottom.style.top=(this._height*1+30) + "px";
    leftBottom.style.left="-8px";
    
    rightBottom.style.top=(this._height*1+30) + "px";
    
    rightTop.style.right= "8px";
    rightTop.style.top= "-10px";
    
    rightBottom.style.right="8px";
    
    leftTop.style.left="-8px";
    leftTop.style.top="-10px";
    
    
    var leftDiv = document.createElement("div");
    var bottomDiv = document.createElement("div");
    var rightDiv  = document.createElement("div");
    var topDiv  = document.createElement("div");
    topDiv.id = "topDiv_" + this._id;
    bottomDiv.id = "bottomDiv_" + this._id;
     
    $(close).bind("click",function(){
            $("span[tag='close']",$(bottomDiv)).click();     	
    });
    
    leftDiv.style.position = "absolute";
    bottomDiv.style.position = "absolute";
    rightDiv.style.position = "absolute";
    topDiv.style.position = "absolute";
    
    leftDiv.style.float="left";
    bottomDiv.style.float="left";
    rightDiv.style.float="left";
    topDiv.style.float="left";
    
    topDiv.style.height = "30px";
    topDiv.style.width = (this._width*1-44)+ "px";
    topDiv.style.backgroundColor = "#2283ce";
    topDiv.style.left = "24px";
    topDiv.style.top = "-10px";
    topDiv.style.opacity = "0.7";
    topDiv.style.color = "#fff";
    topDiv.style.padding = "7px 0px";
    
    
    bottomDiv.style.height = "30px";
    bottomDiv.style.width = (this._width*1-44)+ "px";
    bottomDiv.style.backgroundColor = "#2283ce";
    bottomDiv.style.left = "24px";
    bottomDiv.style.top = (this._height*1+20) + "px";
    bottomDiv.style.opacity = "0.7";
    bottomDiv.style.padding = "7px 0px";
    
    leftDiv.style.height = (this._height*1) + "px";
    leftDiv.style.width = "10px";
    leftDiv.style.backgroundColor = "#2283ce";
    leftDiv.style.left = "-8px";
    leftDiv.style.top = "20px";
    leftDiv.style.opacity = "0.7";
    
    rightDiv.style.height = (this._height*1) + "px";
    rightDiv.style.width = "10px";
    rightDiv.style.backgroundColor = "#2283ce";
    rightDiv.style.right = "8px";
    rightDiv.style.top = "20px";
    rightDiv.style.opacity = "0.7";
 
    panel.appendChild(leftTop);
    /*panel.appendChild(topDiv);
    panel.appendChild(leftDiv);
    panel.appendChild(rightDiv);
    panel.appendChild(bottomDiv);*/
    
    panel.appendChild(leftBottom);
    panel.appendChild(rightTop);
    panel.appendChild(rightBottom);
    panel.appendChild(close);
    
    panel.appendChild(div);
    map.getPanes().labelPane.appendChild(panel);      
    
    return div;
  }
HyCustomCover.prototype.initialize = function(map){
    this._map = map;   
    var div =  document.createElement("div");
	div.id = this._id;
	  
	var div1 =  document.createElement("div");
	 	  
	var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/baidu_marker_arrow.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "0px";
    arrow.style.height = "0px";
    arrow.style.top = this._height + "px";
    arrow.style.left = "0px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);
    
    this._div = panel = document.createElement("div");
    panel.style.position = "absolute";
    panel.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    panel.appendChild(div1);
    panel.appendChild(div);
    map.getPanes().labelPane.appendChild(panel);  
    
    $(div1).css(
	      {
				width: this._width * 1 + 10+"px",
				height: this._height * 1 + 60+"px",
				"margin": "21px 15px",
				"position":"absolute",
				"opacity":0.7,
				"background-color": "#2283ce"
		  }
    );
    
   $(panel).css({
			width: this._width * 1 + 30+"px",
			height: this._height * 1 + 80+"px"
			/*"opacity":0.9*/
			/*"background-color": "#2283ce"*/
	  });
		$(div).attr({
			"tag": "HyCustomCover"
		}).css({
			width: this._width * 1+"px",
			height: this._height * 1+"px",
			/*border: "1px solid red",*/
			"margin": "30px 0px 30px 10px",
			"color":"#FFF",
			"filter": "progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr='#0573b2', endColorstr='#5aa0d7')",
			"opacity":0.7,
			 top:"20px",
			 left:"15px",
			 position:"absolute",
			"background": "linear-gradient(to right, #0573b2 , #5aa0d7)" /* 标准的语法（必须放在最后） */
			/*"background-color":"#0079be"*/
			//"background-image": "linear-gradient(to right,red 100%,red 0%)"
		});
		
		//var img1 = $("<img/>").attr({"src":SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/top1.png"})
		var img1 = $("<img/>").attr({"src":platParams.filesServerVisit+"/theme/deepblue/overlayImg/top1.png"})
		img1.css({
		  float:"left",
		  position:"absolute",
		  top:"-5px",
		  left:"-5px"
		});
		$(panel).append(img1);
		
		//var img2 = $("<img/>").attr({"src":SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/top2.png"})
		var img2 = $("<img/>").attr({"src":platParams.filesServerVisit+"/theme/deepblue/overlayImg/top2.png"})
		img2.css({
		  float:"right",
		  position:"absolute",
		  top:"-5px",
		  right:"-23px",
		  cursor:"pointer"
		});
		$(panel).append(img2);
		
		//var img3 = $("<img/>").attr({"src":SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/footer2.png"})
		var img3 = $("<img/>").attr({"src":platParams.filesServerVisit+"/theme/deepblue/overlayImg/footer2.png"})
		img3.css({
		  float:"right",
		  position:"absolute",
		  top:this._height * 1 + 67,
		  right:"-23px"
		});
		$(panel).append(img3);
		
		
		//var img4 = $("<img/>").attr({"src":SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/footer1.png"})
		var img4 = $("<img/>").attr({"src":platParams.filesServerVisit+"/theme/deepblue/overlayImg/footer1.png"})
		img4.css({
		  float:"left",
		  position:"absolute",
		  top:this._height * 1 + 67,
		  left:"-5px"
		});
		$(panel).append(img4);
		
		
		var m1 = $("<div/>").css({
		  width: (this._width * 1-160)+"px",
		  float:"left",
		  position:"absolute",
		  height:"40px",
		  left:"185px",
		 /* border:"1px solid red",*/
		  top:"-5px"
		}).css({
		  //"background":"url("+SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/middle1.png)"
		  "background":"url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/middle1.png)"
		});
		var m2 = $("<div/>").css({
		  width:"20px", 
		  float:"right",
		  position:"absolute",
		  height:this._height * 1 + 32,
		  right:"-15px",
		  top:"35px"
		}).css({
		  //"background":"url("+SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/middle2.png)"
		  "background":"url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/middle2.png)"
		});
		var m3 = $("<div/>").css({
		  width:(this._width * 1-72)+"px", 
		  float:"left",
		  position:"absolute",
		  height:"11px",
		  top:this._height * 1 + 80,
		  left:"65px"
		}).css({
		  //"background":"url("+SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/middle3.png)"
		  "background":"url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/middle3.png)"
		});
		var m4 = $("<div/>").css({
		  width:"18px", 
		  float:"left",
		  position:"absolute",
		  height:this._height * 1 + 32,
		  left:"-5px",
		  top:"35px"
		}).css({
		  //"background":"url("+SYSTEM_PARAMS.PAGE_THEME+"/overlayImg/middle4.png)"
		  "background":"url("+platParams.filesServerVisit+"/theme/deepblue/overlayImg/middle4.png)"
		});
		
	var bottomDiv = $("<div/>").attr({"id":"bottomDiv_" + this._id}).css({
	     "height":"30px",
	      float:"left",
		  position:"absolute",
		  left:"25px",
		  top:this._height * 1 + 57 +"px",
		  "color":"#fff"
	   });
    var topDiv  = $("<div/>").attr({"id":"topDiv_" + this._id}).css({
		  float:"left",
		  position:"absolute",
		  height:"20px",
		  left:"25px",
		  top:"25px",
		  width:"200px",
		  "padding-left":"3px",
		  "color":"#fff",
		  "opacity":0.7,
		  "filter": "progid:DXImageTransform.Microsoft.gradient(GradientType=1, startColorstr='#0573b2', endColorstr='#5aa0d7')",
		  "background": "linear-gradient(to right, #0573b2 , #5aa0d7)"
		});
    img2.bind("click",function(){
        $("span[tag='close']",bottomDiv).click();     	
    });
    
		
		$(panel).append(m1).append(m2).append(m3).append(m4).append(topDiv).append(bottomDiv);
		
    //  panel.style.height = (this._height*1+40) + "px";
    //panel.style.width = (this._width*1 + 20)+ "px";
    return div;
  }