// 定义一个控件类,即function
function RectangleSelectControl(options,onOverlayComplete) {
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	this.defaultOffset = new BMap.Size(10, 10);
	this._onOverlayComplete = onOverlayComplete;
}

// 通过JavaScript的prototype属性继承于BMap.Control
RectangleSelectControl.prototype = new BMap.Control();

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
RectangleSelectControl.prototype.initialize = function(map) {
	var _onSelectComplete = this._onOverlayComplete;
	// 创建一个DOM元素
	var div = document.createElement("div");
	// 添加文字说明
	div.appendChild(document.createTextNode("开启框选"));
	div.setAttribute("isOpen", "0");
	
	// 设置样式
	div.style.cursor = "pointer";
	div.style.border = "1px solid gray #e7e7e7";
	div.style.backgroundColor = "#e7e7e7";
	div.style.padding = "8px 8px 0px 8px";
	div.style.borderRadius = "5px";
	div.style.color = "#036";
	
	var drawingMgr;
	div.onclick = function(e) {
		if(e.target){
			var isOpen = e.target.getAttribute("isOpen")!=null?e.target.getAttribute("isOpen"):"0";
			if(isOpen == "0"){
				e.target.setAttribute("isOpen", "1");
				e.target.innerText = "关闭框选";
				var styleOptions = {
						strokeColor : "red", //边线颜色。
						fillColor : "rgba(253, 248, 252,0)", //填充颜色。当参数为空时，圆形将没有填充效果。
						strokeWeight :1, //边线的宽度，以像素为单位。
						strokeOpacity : 1, //边线透明度，取值范围0 - 1。
						fillOpacity :0, //填充的透明度，取值范围0 - 1。
						strokeStyle : 'solid' //边线的样式，solid或dashed。
				};
				//实例化鼠标绘制工具
				drawingMgr = new BMapLib.DrawingManager(map, {
					isOpen : false, //是否开启绘制模式
					enableDrawingTool : false, //是否显示工具栏
					drawingToolOptions : {
						anchor : BMAP_ANCHOR_TOP_LEFT, //位置
						offset : new BMap.Size(5, 5), //偏离值
						scale : 0.8,  //工具栏缩放比例
						drawingModes:[
				            BMAP_DRAWING_RECTANGLE 
				        ]
					},
					rectangleOptions : styleOptions //矩形的样式
				});
				drawingMgr.setDrawingMode(BMAP_DRAWING_RECTANGLE); //矩形
				drawingMgr.open();
				if(_onSelectComplete){
					//添加鼠标绘制工具监听事件，用于获取绘制结果
					drawingMgr.addEventListener('overlaycomplete', _onSelectComplete);
				}
			}else{
				e.target.setAttribute("isOpen", "0");
				e.target.innerText = "开启框选";
				if(drawingMgr){
					drawingMgr.close();
				}
			}
		}
		//map.setZoom(map.getZoom() + 2);
		
	}
	// 添加DOM元素到地图中
	map.getContainer().appendChild(div);
	// 将DOM元素返回
	return div;
}