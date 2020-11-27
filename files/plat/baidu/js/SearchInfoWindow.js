/**
 * @fileoverview 百度地图的可根据当前poi点来进行周边检索、公交、驾车查询的信息窗口，对外开放。
 * 主入口类是<a href="symbols/BMapLib.SearchInfoWindow.html">SearchInfoWindow</a>，
 * 基于Baidu Map API 1.4。
 *
 * @author Baidu Map Api Group
 * @version 1.4
 */
/**
 * @namespace BMap的所有library类均放在BMapLib命名空间下
 */
var BMapLib = window.BMapLib = BMapLib || {};
//常量，searchInfoWindow可选择的检索类型
var BMAPLIB_TAB_SEARCH   = 0, BMAPLIB_TAB_TO_HERE  = 1, BMAPLIB_TAB_FROM_HERE  = 2;
(function() {
    //声明baidu包
    var T, baidu = T = baidu || {version: '1.5.0'};
    baidu.guid = '$BAIDU$';
    //以下方法为百度Tangram框架中的方法，请到http://tangram.baidu.com 查看文档
    (function() {
        window[baidu.guid] = window[baidu.guid] || {};

		baidu.lang = baidu.lang || {};
        baidu.lang.isString = function (source) {
            return '[object String]' == Object.prototype.toString.call(source);
        };
        baidu.lang.Event = function (type, target) {
            this.type = type;
            this.returnValue = true;
            this.target = target || null;
            this.currentTarget = null;
        };


        baidu.object = baidu.object || {};
        baidu.extend =
        baidu.object.extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }

            return target;
        };
        baidu.event = baidu.event || {};
        baidu.event._listeners = baidu.event._listeners || [];
        baidu.dom = baidu.dom || {};

        baidu.dom._g = function (id) {
            if (baidu.lang.isString(id)) {
                return document.getElementById(id);
            }
            return id;
        };
        baidu._g = baidu.dom._g;
        baidu.event.on = function (element, type, listener) {
            type = type.replace(/^on/i, '');
            element = baidu.dom._g(element);
            var realListener = function (ev) {
                    // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
                    // 2. element是为了修正this
                    listener.call(element, ev);
                },
                lis = baidu.event._listeners,
                filter = baidu.event._eventFilter,
                afterFilter,
                realType = type;
            type = type.toLowerCase();
            // filter过滤
            if(filter && filter[type]){
                afterFilter = filter[type](element, type, realListener);
                realType = afterFilter.type;
                realListener = afterFilter.listener;
            }

            // 事件监听器挂载
            if (element.addEventListener) {
                element.addEventListener(realType, realListener, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + realType, realListener);
            }
            // 将监听器存储到数组中
            lis[lis.length] = [element, type, listener, realListener, realType];
            return element;
        };

        baidu.on = baidu.event.on;
        baidu.event.un = function (element, type, listener) {
            element = baidu.dom._g(element);
            type = type.replace(/^on/i, '').toLowerCase();

            var lis = baidu.event._listeners,
                len = lis.length,
                isRemoveAll = !listener,
                item,
                realType, realListener;
            while (len--) {
                item = lis[len];

                if (item[1] === type
                    && item[0] === element
                    && (isRemoveAll || item[2] === listener)) {
                   	realType = item[4];
                   	realListener = item[3];
                    if (element.removeEventListener) {
                        element.removeEventListener(realType, realListener, false);
                    } else if (element.detachEvent) {
                        element.detachEvent('on' + realType, realListener);
                    }
                    lis.splice(len, 1);
                }
            }

            return element;
        };
        baidu.un = baidu.event.un;
        baidu.dom.g = function (id) {
            if ('string' == typeof id || id instanceof String) {
                return document.getElementById(id);
            } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
                return id;
            }
            return null;
        };
        baidu.g = baidu.G = baidu.dom.g;
        baidu.string = baidu.string || {};

        baidu.browser = baidu.browser || {};
        baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
        baidu.dom._NAME_ATTRS = (function () {
            var result = {
                'cellpadding': 'cellPadding',
                'cellspacing': 'cellSpacing',
                'colspan': 'colSpan',
                'rowspan': 'rowSpan',
                'valign': 'vAlign',
                'usemap': 'useMap',
                'frameborder': 'frameBorder'
            };

            if (baidu.browser.ie < 8) {
                result['for'] = 'htmlFor';
                result['class'] = 'className';
            } else {
                result['htmlFor'] = 'for';
                result['className'] = 'class';
            }

            return result;
        })();
        baidu.dom.setAttr = function (element, key, value) {
            element = baidu.dom.g(element);
            if ('style' == key){
                element.style.cssText = value;
            } else {
                key = baidu.dom._NAME_ATTRS[key] || key;
                element.setAttribute(key, value);
            }
            return element;
        };
         baidu.setAttr = baidu.dom.setAttr;
        baidu.dom.setAttrs = function (element, attributes) {
            element = baidu.dom.g(element);
            for (var key in attributes) {
                baidu.dom.setAttr(element, key, attributes[key]);
            }
            return element;
        };
        baidu.setAttrs = baidu.dom.setAttrs;
        baidu.dom.create = function(tagName, opt_attributes) {
            var el = document.createElement(tagName),
                attributes = opt_attributes || {};
            return baidu.dom.setAttrs(el, attributes);
        };

        T.undope=true;
    })();

    /**
     * @exports SearchInfoWindow as BMapLib.SearchInfoWindow
     */

    var SearchInfoWindow =
        /**
         * SearchInfoWindow类的构造函数
         * @class SearchInfoWindow <b>入口</b>。
         * 可以定义检索模版。
         * @constructor
         * @param {Map} map Baidu map的实例对象.
         * @param {String} content searchInfoWindow中的内容,支持HTML内容.
         * @param {Json Object} opts 可选的输入参数，非必填项。可输入选项包括：<br />
         * {<br />"<b>title</b>" : {String} searchInfoWindow的标题内容，支持HTML内容<br/>
         * {<br />"<b>width</b>" : {Number} searchInfoWindow的内容宽度<br/>
         * {<br />"<b>height</b>" : {Number} searchInfoWindow的内容高度 <br/>
         * {<br />"<b>offset</b>" : {Size} searchInfoWindow的偏移量<br/>
         * <br />"<b>enableAutoPan</b>" : {Boolean} 是否启动自动平移功能,默认开启    <br />
         * <br />"<b>panel</b>" : {String} 用来展现检索信息的面板,可以是dom元素或元素的ID值 <br />
         * <br />"<b>searchTypes</b>" : {Array} 通过传入数组设置检索面板的Tab选项共有三个选项卡可选择，选项卡顺序也按照数组的顺序来排序，传入空数组则不显示检索模版，不设置此参数则默认所有选项卡都显示。数组可传入的值为常量：BMAPLIB_TAB_SEARCH<周边检索>, BMAPLIB_TAB_TO_HERE<到去这里>, BMAPLIB_TAB_FROM_HERE<从这里出发>  <br />
         * }<br />.
         * @example <b>参考示例：</b><br />
         * var searchInfoWindow = new BMapLib.SearchInfoWindow(map,"百度地图api",{
         *     title "百度大厦",
         *     width  : 280,
         *     height : 50,
         *     panel  : "panel", //检索结果面板
         *     enableAutoPan : true, //自动平移
         *     searchTypes :[
         *         BMAPLIB_TAB_SEARCH,   //周边检索
         *         BMAPLIB_TAB_TO_HERE,  //到这里去
         *         BMAPLIB_TAB_FROM_HERE //从这里出发
         *     ]
         * });
         */
        BMapLib.SearchInfoWindow = function(map, content, opts) {

        //存储当前实例
        this.guid = guid++;
        BMapLib.SearchInfoWindow.instance[this.guid] = this;

        this._isOpen = false;
        this._map = map;

        this._opts = opts   = opts || {};
        this._content = content || "";
        this._opts.width          =  opts.width;
        this._opts.height         =  opts.height;
        this._opts._title         =  opts.title || "";
        this._opts.offset         =  opts.offset || new BMap.Size(0,0);
        this._opts.enableAutoPan  = opts.enableAutoPan === false? false : true;
        this._opts._panel         = opts.panel || null;
        this._opts._searchTypes   = opts.searchTypes; //传入数组形式
    }
    SearchInfoWindow.prototype = new BMap.Overlay();
    SearchInfoWindow.prototype.initialize = function(map) {
        this._closeOtherSearchInfo();
        var me = this;

        var div = this._createSearchTemplate();

        var floatPane = map.getPanes().floatPane;
        floatPane.style.width = "auto";
        floatPane.appendChild(div);
        this._initSearchTemplate();
        //设置完内容后，获取div的宽度,高度
        this._getSearchInfoWindowSize();
        this._boxWidth = parseInt(this.container.offsetWidth,10);
        this._boxHeight = parseInt(this.container.offsetHeight,10);
        //阻止各种冒泡事件
        baidu.event.on(div,"onmousedown",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"onmouseover",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"click",function(e){
            me._stopBubble(e);
        });
        baidu.event.on(div,"dblclick",function(e){
            me._stopBubble(e);
        });
        return div;
    }
    SearchInfoWindow.prototype.draw = function() {
        this._isOpen && this._adjustPosition(this._point);
    }
    /**
     * 打开searchInfoWindow
     * @param {Marker|Point} location 要在哪个marker或者point上打开searchInfoWindow
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.open();
     */
    SearchInfoWindow.prototype.open = function(anchor){
        this._map.closeInfoWindow();
        var me = this,poi;
        if(!this._isOpen) {
            this._map.addOverlay(this);
            this._isOpen = true;
            //延迟10ms派发open事件，使后绑定的事件可以触发。
            setTimeout(function(){
                me._dispatchEvent(me,"open",{"point" : me._point});
            },10);
        }
        if(anchor instanceof BMap.Point){
            poi = anchor;
            //清除之前存在的marker事件绑定，如果存在的话
            this._removeMarkerEvt();
            this._marker = null;
        }else if(anchor instanceof BMap.Marker){
        	//如果当前marker不为空，说明是第二个marker，或者第二次点open按钮,先移除掉之前绑定的事件
        	if(this._marker){
        		this._removeMarkerEvt();
        	}
            poi = anchor.getPosition();
            this._marker = anchor;
            !this._markerDragend && this._marker.addEventListener("dragend",this._markerDragend = function(e){
            	me._point = e.point;
            	me._adjustPosition(me._point);
            	me._panBox();
            	me.show();
            });
             //给marker绑定dragging事件，拖动marker的时候，searchInfoWindow也跟随移动
            !this._markerDragging && this._marker.addEventListener("dragging",this._markerDragging = function(){
            	me.hide();
            	me._point = me._marker.getPosition();
                me._adjustPosition(me._point);
            });
        }
        //打开的时候，将infowindow显示
        this.show();
        this._point = poi;
        this._panBox();
        this._adjustPosition(this._point);
    }
    /**
     * 关闭searchInfoWindow
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.close();
     */
    SearchInfoWindow.prototype.close = function(){
        if(this._isOpen){
            this._map.removeOverlay(this);
            this._disposeAutoComplete();
            this._isOpen = false;
            this._dispatchEvent(this,"close",{"point" : this._point});
        }
    }

	/**
   	 * 打开searchInfoWindow时，派发事件的接口
     * @name SearchInfoWindow#Open
     * @event
     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
     * <br />{"<b>target</b> : {BMap.Overlay} 触发事件的元素,
     * <br />"<b>type</b>：{String} 事件类型,
     * <br />"<b>point</b>：{Point} searchInfoWindow的打开位置}
     *
     * @example <b>参考示例：</b>
     * searchInfoWindow.addEventListener("open", function(e) {
     *     alert(e.type);
     * });
     */
   /**
   	 * 关闭searchInfoWindow时，派发事件的接口
     * @name SearchInfoWindow#Close
     * @event
     * @param {Event Object} e 回调函数会返回event参数，包括以下返回值：
     * <br />{"<b>target</b> : {BMap.Overlay} 触发事件的元素,
     * <br />"<b>type</b>：{String} 事件类型,
     * <br />"<b>point</b>：{Point} searchInfoWindow的关闭位置}
     *
     * @example <b>参考示例：</b>
     * searchInfoWindow.addEventListener("close", function(e) {
     *     alert(e.type);
     * });
     */
  /**
     * 启用自动平移
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.enableAutoPan();
     */
    SearchInfoWindow.prototype.enableAutoPan = function(){
        this._opts.enableAutoPan = true;
    }
    /**
     * 禁用自动平移
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.disableAutoPan();
     */
    SearchInfoWindow.prototype.disableAutoPan = function(){
        this._opts.enableAutoPan = false;
    }
    /**
     * 设置searchInfoWindow的内容
     * @param {String|HTMLElement} content 弹出气泡中的内容，支持HTML格式
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.setContent("百度地图API");
     */
    SearchInfoWindow.prototype.setContent = function(content){
      	this._setContent(content);
      	this._getSearchInfoWindowSize();
        this._adjustPosition(this._point);
    },
    /**
     * 设置searchInfoWindow的内容
     * @param {String|HTMLElement} title 弹出气泡中的内容，支持HTML格式
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.setTitle("百度地图API");
     */
    SearchInfoWindow.prototype.setTitle = function(title){
        this.dom.title.innerHTML = title;
        this._opts._title = title;
    }
    /**
     * 获取searchInfoWindow的内容
     * @return {String} String
     *
     * @example <b>参考示例：</b><br />
     * alret(searchInfoWindow.getContent());
     */
    SearchInfoWindow.prototype.getContent = function(){
        return this.dom.content.innerHTML;
    },
    /**
     * 获取searchInfoWindow的标题
     * @return {String} String
     *
     * @example <b>参考示例：</b><br />
     * alert(searchInfoWindow.getTitle());
     */
    SearchInfoWindow.prototype.getTitle = function(){
        return this.dom.title.innerHTML;
    }
    /**
     * 设置信息窗的地理位置
     * @param {Point} point 设置position
     * @return none
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.setPosition(new BMap.Point(116.35,39.911));
     */
    SearchInfoWindow.prototype.setPosition = function(poi){
        this._point = poi;
        this._adjustPosition(poi);
        this._panBox();
        this._removeMarkerEvt();
    }
    /**
     * 获得信息窗的地理位置
     * @return {Point} 信息窗的地理坐标
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.getPosition();
     */
    SearchInfoWindow.prototype.getPosition = function(){
        return this._point;
    }
    /**
     * 返回信息窗口的箭头距离信息窗口在地图
     * 上所锚定的地理坐标点的像素偏移量。
     * @return {Size} Size
     *
     * @example <b>参考示例：</b><br />
     * searchInfoWindow.getOffset();
     */
    SearchInfoWindow.prototype.getOffset = function(){
        return this._opts.offset;
    },

    baidu.object.extend(SearchInfoWindow.prototype,{
        /**
         * 保持屏幕只有一个searchInfoWindow,关闭现在已打开的searchInfoWindow
         */
        _closeOtherSearchInfo: function () {
            var instance = BMapLib.SearchInfoWindow.instance,
                len      = instance.length;
            while (len--) {
                if (instance[len]._isOpen) {
                    instance[len].close();
                }
            }
        },

        /**
	     * 设置searchInfoWindow的内容
	     * @param {String|HTMLElement} content 弹出气泡中的内容
	     * @return none
	     *
	     * @example <b>参考示例：</b><br />
	     * searchInfoWindow.setContent("百度地图API");
	     */
        _setContent: function(content){
	        if(!this.dom || !this.dom.content){
	            return;
	        }
	        //string类型的content
	        if(typeof content.nodeType === "undefined"){
	            this.dom.content.innerHTML = content;
	        }else{
	            this.dom.content.appendChild(content);
	        }

            var me = this;
            me._adjustContainerWidth();

	        this._content = content;
   	    },
        /**
         * 调整searchInfoWindow的position
         * @return none
         */
        _adjustPosition: function(poi){
            var pixel = this._getPointPosition(poi);
            var icon = this._marker && this._marker.getIcon();
            if(this._marker){
                this.container.style.bottom = -(pixel.y - this._opts.offset.height - icon.anchor.height + icon.infoWindowAnchor.height) - this._marker.getOffset().height + 2 + 30 + "px";
                this.container.style.left = pixel.x - icon.anchor.width + this._marker.getOffset().width + icon.infoWindowAnchor.width - this._boxWidth / 2 + 28 + "px";
            }else{
                this.container.style.bottom = -(pixel.y - this._opts.offset.height) + 30 + "px";
                this.container.style.left = pixel.x - this._boxWidth / 2 + 25 + "px";
            }
        },
        /**
         * 得到searchInfoWindow的position
         * @return Point  searchInfoWindow当前的position
         */
        _getPointPosition: function(poi){
            this._pointPosition = this._map.pointToOverlayPixel(poi);
            return this._pointPosition;
        },
        /**
         * 得到searchInfoWindow的高度跟宽度
         * @return none
         */
        _getSearchInfoWindowSize: function(){
        	this._boxWidth = parseInt(this.container.offsetWidth,10);
        	this._boxHeight = parseInt(this.container.offsetHeight,10);
        },
        /**
         * 阻止事件冒泡
         * @return none
         */
        _stopBubble: function(e){
            if(e && e.stopPropagation){
                e.stopPropagation();
            }else{
                window.event.cancelBubble = true;
            }
        },
        /**
         * 自动平移searchInfoWindow，使其在视野中全部显示
         * @return none
         */
        _panBox: function(){
            if(!this._opts.enableAutoPan){
                return;
            }
            var mapH = parseInt(this._map.getContainer().offsetHeight,10),
                mapW = parseInt(this._map.getContainer().offsetWidth,10),
                boxH = this._boxHeight,
                boxW = this._boxWidth;
            //searchInfoWindow窗口本身的宽度或者高度超过map container
            if(boxH >= mapH || boxW >= mapW){
                return;
            }
            //如果point不在可视区域内
            if(!this._map.getBounds().containsPoint(this._point)){
                this._map.setCenter(this._point);
            }
            var anchorPos = this._map.pointToPixel(this._point),
                panTop,panY,
                //左侧超出
                panLeft  = boxW / 2 - 28 - anchorPos.x + 10,
                //右侧超出
                panRight = boxW / 2 + 28 + anchorPos.x - mapW + 10;
            if(this._marker){
                var icon = this._marker.getIcon();
            }

            //上侧超出
            var h = this._marker ? icon.anchor.height + this._marker.getOffset().height - icon.infoWindowAnchor.height : 0;
            panTop = boxH - anchorPos.y + this._opts.offset.height + h + 31 + 10;

            panX = panLeft > 0 ? panLeft : (panRight > 0 ? -panRight : 0);
            panY = panTop > 0 ? panTop : 0;
            this._map.panBy(panX,panY);
        },
        _removeMarkerEvt: function(){
			this._markerDragend && this._marker.removeEventListener("dragend", this._markerDragend);
            this._markerDragging && this._marker.removeEventListener("dragging", this._markerDragging);
            this._markerDragend = this._markerDragging = null;
        },
      	/**
	     * 集中派发事件函数
	     *
	     * @private
	     * @param {Object} instance 派发事件的实例
	     * @param {String} type 派发的事件名
	     * @param {Json} opts 派发事件里添加的参数，可选
	     */
	    _dispatchEvent: function(instance, type, opts) {
	        type.indexOf("on") != 0 && (type = "on" + type);
	        var event = new baidu.lang.Event(type);
	        if (!!opts) {
	            for (var p in opts) {
	                event[p] = opts[p];
	            }
	        }
	        instance.dispatchEvent(event);
	    },

        /**
         * 检索infowindow模板的初始化操作
         */
        _initSearchTemplate: function() {
            this._initDom();
            this._initPanelTemplate();
            this.setTitle(this._opts._title);
            if (this._opts.height) {
                this.dom.content.style.height = parseInt(this._opts.height, 10) + "px";
            }
            this._setContent(this._content);
            this._initService();
            this._bind();
            if (this._opts._searchTypes) {
                this._setSearchTypes();
            }
            this._mendIE6();
        },

        /**
         * 创建检索模板
         * @return dom
         */
        _createSearchTemplate: function() {
            if (!this._div) {
                var div = baidu.dom.create('div', {
                    "class" : "BMapLib_SearchInfoWindow",
                    "id"    : "BMapLib_SearchInfoWindow" + this.guid
                });
                var template = [
                    '<div class="BMapLib_bubble_top">',
                        '<div class="BMapLib_bubble_title" id="BMapLib_bubble_title' + this.guid + '"></div>',
                        '<div class="BMapLib_bubble_close" id="BMapLib_bubble_close' + this.guid + '">',
                            '<span>关闭</span>',
                        '</div>',
                    '</div>',
                    '<div class="BMapLib_bubble_center">',
                        '<div class="BMapLib_bubble_content" id="BMapLib_bubble_content' + this.guid + '">',
                        '</div>',
                        '<div class="BMapLib_nav" id="BMapLib_nav' + this.guid + '">',
                            '<ul class="BMapLib_nav_tab" id="BMapLib_nav_tab' + this.guid + '">', //tab选项卡
                                '<li class="BMapLib_first BMapLib_current" id="BMapLib_tab_search' + this.guid + '" style="display:block;">',
                                    '<span class="BMapLib_icon BMapLib_icon_nbs"></span>在附近找',
                                '</li>',
                                '<li class="" id="BMapLib_tab_tohere' + this.guid + '" style="display:block;">',
                                    '<span class="BMapLib_icon BMapLib_icon_tohere"></span>到这里去',
                                '</li>',
                                '<li class="" id="BMapLib_tab_fromhere' + this.guid + '" style="display:block;">',
                                    '<span class="BMapLib_icon BMapLib_icon_fromhere"></span>从这里出发',
                                '</li>',
                            '</ul>',
                            '<ul class="BMapLib_nav_tab_content">', //tab内容
                                '<li id="BMapLib_searchBox' + this.guid + '">',
                                    '<table width="100%" align="center" border=0 cellpadding=0 cellspacing=0>',
                                        '<tr><td style="padding-left:8px;"><input id="BMapLib_search_text' + this.guid + '" class="BMapLib_search_text" type="text" maxlength="100" autocomplete="off"></td><td width="55" style="padding-left:7px;"><input id="BMapLib_search_nb_btn' + this.guid + '" type="submit" value="搜索" class="iw_bt"></td></tr>',
                                    '</table>',
                                '</li>',
                                '<li id="BMapLib_transBox' + this.guid + '" style="display:none">',
                                    '<table width="100%" align="center" border=0 cellpadding=0 cellspacing=0>',
                                        '<tr><td width="30" style="padding-left:8px;"><div id="BMapLib_stationText' + this.guid + '">起点</div></td><td><input id="BMapLib_trans_text' + this.guid + '" class="BMapLib_trans_text" type="text" maxlength="100" autocomplete="off"></td><td width="106" style="padding-left:7px;"><input id="BMapLib_search_bus_btn' + this.guid + '" type="button" value="公交" class="iw_bt" style="margin-right:5px;"><input id="BMapLib_search_drive_btn' + this.guid + '" type="button" class="iw_bt" value="驾车"></td></tr>',
                                    '</table>',
                                '</li>',
                            '</ul>',
                        '</div>',
                    '</div>',
                    '<div class="BMapLib_bubble_bottom"></div>',
                    '<img src="http://api.map.baidu.com/library/SearchInfoWindow/1.4/src/iw_tail.png" width="58" height="31" alt="" class="BMapLib_trans" id="BMapLib_trans' + this.guid + '" style="left:144px;"/>'
                ];
                div.innerHTML = template.join("");
                this._div = div;
            }
            return this._div;
        },

        /**
         * 创建面板
         */
        _initPanelTemplate: function() {
            var panel = baidu.g(this._opts._panel);
            if (!this.dom.panel && panel) {
                panel.innerHTML = "";
                this.dom.panel = panel;
                //供地址选择页用的提示文字
                var address = baidu.dom.create('div');
                address.style.cssText = "display:none;background:#FD9;height:30px;line-height:30px;text-align:center;font-size:12px;color:#994C00;";
                panel.appendChild(address);
                this.dom.panel.address = address;
                //供地址检索面板用
                var localSearch = baidu.dom.create('div');
                panel.appendChild(localSearch);
                this.dom.panel.localSearch = localSearch;
            }
        },

        /**
         * 获取相关的DOM元素
         */
        _initDom: function () {
            if (!this.dom) {
                this.dom = {
                    container     : baidu.g("BMapLib_SearchInfoWindow" + this.guid) //容器
                    , content     : baidu.g("BMapLib_bubble_content" + this.guid)   //主内容
                    , title       : baidu.g("BMapLib_bubble_title" + this.guid)     //标题
                    , closeBtn    : baidu.g("BMapLib_bubble_close" + this.guid)     //关闭按钮
                    , transIco    : baidu.g("BMapLib_trans" + this.guid)            //infowindow底下三角形
                    , navBox      : baidu.g("BMapLib_nav" + this.guid)              //检索容器
                    , navTab      : baidu.g("BMapLib_nav_tab" + this.guid)          //tab容器
                    , seartTab    : baidu.g("BMapLib_tab_search" + this.guid)       //在附近找tab
                    , tohereTab   : baidu.g("BMapLib_tab_tohere" + this.guid)       //到这里去tab
                    , fromhereTab : baidu.g("BMapLib_tab_fromhere" + this.guid)     //从这里出发tab
                    , searchBox   : baidu.g("BMapLib_searchBox" + this.guid)        //普通检索容器
                    , transBox    : baidu.g("BMapLib_transBox" + this.guid)         //公交驾车检索容器，从这里出发和到这里去公用一个容器
                    , stationText : baidu.g("BMapLib_stationText" + this.guid)      //起点或终点文本
                    , nbBtn       : baidu.g("BMapLib_search_nb_btn" + this.guid)    //普通检索按钮
                    , busBtn      : baidu.g("BMapLib_search_bus_btn" + this.guid)   //公交驾车检索按钮
                    , driveBtn    : baidu.g("BMapLib_search_drive_btn" + this.guid) //驾车检索按钮
                    , searchText  : baidu.g("BMapLib_search_text" + this.guid)      //普通检索文本框
                    , transText   : baidu.g("BMapLib_trans_text" + this.guid)       //公交驾车检索文本框
                }
                this.container = this.dom.container;
            }
        },

        /**
         * 设置infowindow内容的宽度
         */
        _adjustContainerWidth: function() {
            var width = 250,
                height = 0;
            if (this._opts.width) {
                width = parseInt(this._opts.width, 10);
                width += 10;
            } else {
                width = parseInt(this.dom.content.offsetWidth, 10);
            }
            if (width < 250) {
                width = 250;
            }

            this._width = width;
            //设置container的宽度
            this.container.style.width = this._width + "px";
            this._adjustTransPosition();
        },

        /**
         * 调整infowindow下三角形的位置
         */
        _adjustTransPosition: function() {
            //调整三角形的位置
            this.dom.transIco.style.left = this.container.offsetWidth / 2 - 2 - 29 + "px";
            this.dom.transIco.style.top = this.container.offsetHeight - 2 + "px";
        },

        /**
         * 初始化各检索服务
         */
        _initService: function () {
            var map  = this._map;
            var me = this;
            var renderOptions = {}
            renderOptions.map = map;

            if (this.dom.panel) {
                renderOptions.panel = this.dom.panel.localSearch;
            }

            if (!this.localSearch) {
                this.localSearch = new BMap.LocalSearch(map, {
                    renderOptions: renderOptions
                    , onSearchComplete : function (result) {
                        me._clearAddress();
                        me._drawCircleBound();
                    }
                });
            }

            if (!this.transitRoute) {
                this.transitRoute = new BMap.TransitRoute(map, {
                    renderOptions: renderOptions
                    , onSearchComplete : function (results) {
                        me._transitRouteComplete(me.transitRoute, results);
                    }
                });
            }

            if (!this.drivingRoute) {
                this.drivingRoute  = new BMap.DrivingRoute(map, {
                    renderOptions: renderOptions
                    , onSearchComplete : function (results) {
                        me._transitRouteComplete(me.drivingRoute, results);
                    }
                });
            }
        },

        /**
         * 绑定事件
         */
        _bind: function () {
            var me  = this;

            //关闭按钮
            baidu.on(this.dom.closeBtn, "click", function(e) {
                me.close();
            });

            //周边检索tab键
            baidu.on(this.dom.seartTab, "click", function(e) {
                me._showTabContent(BMAPLIB_TAB_SEARCH);
            });

            //到这里去tab
            baidu.on(this.dom.tohereTab, "click", function(e) {
                me._showTabContent(BMAPLIB_TAB_TO_HERE);
            });

            //从这里出发tab
            baidu.on(this.dom.fromhereTab, "click", function(e) {
                me._showTabContent(BMAPLIB_TAB_FROM_HERE);
            });

            //周边检索按钮
            baidu.on(this.dom.nbBtn, "click", function(e) {
                me._localSearchAction();
            });

            //公交检索按钮
            baidu.on(this.dom.busBtn, "click", function(e) {
                me._transitRouteAction(me.transitRoute);
            });

            //驾车检索按钮
            baidu.on(this.dom.driveBtn, "click", function(e) {
                me._transitRouteAction(me.drivingRoute);
            });

            //文本框自动完成提示
            this._autoCompleteIni();
        },

        /**
         * 显示tab内容
         */
        _showTabContent: function(type) {
            this._hideAutoComplete();
            var tabs = this.dom.navTab.getElementsByTagName("li"),
                len = tabs.length;
            
            for (var i = 0, len = tabs.length; i < len; i++) {
                tabs[i].className = "";
            }

            //显示当前tab content并高亮tab
            switch (type) {
                case BMAPLIB_TAB_SEARCH:
                    this.dom.seartTab.className      = "BMapLib_current";
                    this.dom.searchBox.style.display = "block";
                    this.dom.transBox.style.display  = "none";
                    break;
                case BMAPLIB_TAB_TO_HERE:
                    this.dom.tohereTab.className     = "BMapLib_current";
                    this.dom.searchBox.style.display = "none";
                    this.dom.transBox.style.display  = "block";
                    this.dom.stationText.innerHTML   = "起点";
                    this._pointType = "endPoint";
                    break;
                case BMAPLIB_TAB_FROM_HERE:
                    this.dom.fromhereTab.className   = "BMapLib_current";
                    this.dom.searchBox.style.display = "none";
                    this.dom.transBox.style.display  = "block";
                    this.dom.stationText.innerHTML   = "终点";
                    this._pointType = "startPoint";
                    break;
            }

            this._firstTab.className += " BMapLib_first";
        },

        /**
         * 绑定自动完成事件
         */
        _autoCompleteIni: function () {
            this.searchAC= new BMap.Autocomplete({
                "input"      : this.dom.searchText
                , "location" : this._map
            });
            this.transAC = new BMap.Autocomplete({
                "input"      : this.dom.transText
                , "location" : this._map
            });
        },

        /**
         * 关闭autocomplete
         */
        _hideAutoComplete: function () {
            this.searchAC.hide();
            this.transAC.hide();
        },

        /**
         * 销毁autoComplete对象
         */
        _disposeAutoComplete: function() {
            this.searchAC.dispose();
            this.transAC.dispose();
        },

        /**
         * 触发localsearch事件
         */
        _localSearchAction: function() {
            var kw = this._kw = this.dom.searchText.value;
            if (kw == "") {
                //检测是否为空
                this.dom.searchText.focus();
            } else{
                this._reset();
                this.close();
                var radius  = this._radius = 1000;
                this.localSearch.searchNearby(kw, this._point, radius);
            }
        },

        /**
         * 画周边检索的圆形圈
         */
        _drawCircleBound: function() {
            this._closeCircleBound();
            var circle = this._searchCircle = new BMap.Circle(this._point, this._radius, {
                strokeWeight: 3,
                strokeOpacity: 0.4,
                strokeColor: "#e00",
                filColor: "#00e",
                fillOpacity:0.4
            });

            var label = this._searchLabel = new BMap.Label('<div onmousedown ="BMapLib.SearchInfoWindow.instance[' + this.guid + ']._stopBubble()"><input type="text" value="' + this._radius + '" style="width:30px;" id="BMapLib_search_radius' + this.guid + '"/>m <a href="javascript:void(0)" title="修改" onclick="BMapLib.SearchInfoWindow.instance[' + this.guid + ']._changeSearchRadius()" style="text-decoration:none;color:blue;">修改</a><img src="http://api.map.baidu.com/images/iw_close1d3.gif" alt="关闭" title="关闭" style="cursor:pointer;padding:0 5px;" onclick="BMapLib.SearchInfoWindow.instance[' + this.guid + ']._closeCircleBound()"/></div>',{
                position: this._point
            });

            this._map.addOverlay(circle);
            this._map.addOverlay(label);
            this._hasCircle = true;
        },

        /**
         * 修改周边检索的半径
         */
        _changeSearchRadius: function() {
            var radius = parseInt(baidu.g("BMapLib_search_radius" + this.guid).value, 10);
            if (radius > 0 && radius != this._radius) {
                this._radius = radius;
                this.localSearch.searchNearby(this._kw, this._point, radius);
                this._closeCircleBound();
            }
        },

        /**
         * 关闭周边检索的圆形圈
         */
        _closeCircleBound: function(radius) {
            if (this._searchCircle) {
                this._map.removeOverlay(this._searchCircle);
            }
            if (this._searchLabel) {
                this._map.removeOverlay(this._searchLabel);
            }
            this._hasCircle = false;
        },

        /**
         * 公交驾车检索查询
         */
        _transitRouteAction: function (transitDrive) {
            var kw = this.dom.transText.value;
            if (kw == "") {
                //检测是否为空
                this.dom.transText.focus();
            } else {
                this._reset();
                this.close();
                var transPoi = this._getTransPoi(kw);
                transitDrive.search(transPoi.start, transPoi.end);
            }
        },

        /**
         * 公交驾车查询结束操作
         */
        _transitRouteComplete: function(transitDrive, results) {
            this._clearAddress();
            var status = transitDrive.getStatus();
            //导航结果未知的情况
            if (status == BMAP_STATUS_UNKNOWN_ROUTE) {
                var startStatus = results.getStartStatus(),
                    endStatus   = results.getEndStatus(),
                    tip         = "";
                tip = "找不到相关的线路";
                if (startStatus == BMAP_ROUTE_STATUS_EMPTY && endStatus == BMAP_ROUTE_STATUS_EMPTY) {
                    tip = "找不到相关的起点和终点";
                } else {
                    if (startStatus == BMAP_ROUTE_STATUS_EMPTY) {
                        tip = "找不到相关的起点";
                    }
                    if (endStatus == BMAP_ROUTE_STATUS_EMPTY) {
                        tip = "找不到相关的终点";
                    }
                }
                //当前搜索的点找不到明确的路线，但是可以检索到poi点
                if (this._pointType == "startPoint" && endStatus == BMAP_ROUTE_STATUS_ADDRESS || this._pointType == "endPoint" && startStatus == BMAP_ROUTE_STATUS_ADDRESS) {
                    this._searchAddress(transitDrive);
                } else {
                    this.dom.panel.address.style.display = "block";
                    this.dom.panel.address.innerHTML = tip;
                }
            }

        },

        /**
         * 检索起点或终点的可选地址
         */
        _searchAddress: function(transitDrive) {
            var me = this;
            var panel = this.dom.panel;
            if (!this.lsAddress) {
                var renderOptions = {map: this._map};
                if (panel) {
                    renderOptions.panel = this.dom.panel.localSearch;
                }
                this.lsAddress = new BMap.LocalSearch(map, {renderOptions: renderOptions});
            }
            var station = me._pointType == "startPoint" ? "终点" : "起点";
            if (panel) {
                this.dom.panel.address.style.display = "block";
                this.dom.panel.address.innerHTML = "请选择准确的" + station;
            }
            this.lsAddress.setInfoHtmlSetCallback(function(poi,html){
                var button = document.createElement('div'); 
                button.style.cssText="position:relative;left:50%;margin:5px 0 0 -30px;width:60px;height:27px;line-height:27px;border:1px solid #E0C3A6;text-align:center;color:#B35900;cursor:pointer;background-color:#FFEECC;border-radius:2px; background-image: -webkit-gradient(linear, left top, left bottom, from(#FFFDF8), to(#FFEECC))";
                button.innerHTML = '设为' + station;
                html.appendChild(button);
                baidu.on(button, "click", function(){
                    me._clearAddress();
                    var nowPoint = poi.marker.getPosition();
                    if (station  == "起点") {
                        transitDrive.search(nowPoint, me._point);
                    } else {
                        transitDrive.search(me._point, nowPoint);
                    }
                });
            });
            this._reset();
            this.lsAddress.search(this.dom.transText.value);
        },

        /**
         * 获取公交驾车的起终点
         */
        _getTransPoi: function(kw) {
            var start, end;

            if (this._pointType == "startPoint") {
                start = this._point;
                end   = kw;
            } else {
                start = kw;
                end   = this._point;
            }

            return {
                "start" : start,
                "end"   : end
            }
        },

        /**
         * 设置当前可提供的检索类型
         */
        _setSearchTypes: function () {
            var searchTypes = this._unique(this._opts._searchTypes),
                navTab      = this.dom.navTab,
                tabs        = [this.dom.seartTab, this.dom.tohereTab, this.dom.fromhereTab],
                i           = 0,
                len         = 0,
                curIndex    = 0,
                tab;

            this.tabLength = searchTypes.length;
            tabWidth = Math.floor((this._width - this.tabLength + 1) / this.tabLength);
            if (searchTypes.length == 0) {
                //若为空则不显示检索面板
                this.dom.navBox.style.display = "none";
            } else {
                for (i = 0, len = tabs.length; i < len; i++) {
                    tabs[i].className = "";
                    tabs[i].style.display = "none";
                }

                for (i = 0; i < this.tabLength; i++) {
                    tab = tabs[searchTypes[i]];
                    if (i == 0) {
                        tab.className = "BMapLib_first BMapLib_current";
                        this._firstTab = tab;
                        curIndex = searchTypes[i];
                    } 
                    if (i == this.tabLength - 1) {
                        //最后一个tab的宽度
                        var lastWidth  = this._width - (this.tabLength - 1) * (tabWidth + 1);
                        if (baidu.browser.ie == 6) {
                            tab.style.width = lastWidth - 3 + "px";
                        } else {
                            tab.style.width = lastWidth + "px";
                        }
                    } else {
                        tab.style.width = tabWidth + "px";
                    }
                    tab.style.display = "block";
                }

                //按照数组顺序排序tab
                if (searchTypes[1] != undefined) {
                    navTab.appendChild(tabs[searchTypes[1]])
                }
                if (searchTypes[2] != undefined) {
                    navTab.appendChild(tabs[searchTypes[2]])
                }
                this._showTabContent(curIndex);
            }
            this._adjustTransPosition();
        },

        /**
         * 对用户提供的检索类型去重，并剔除无效的结果
         */
        _unique : function (arr) {
            var len = arr.length, 
                result = arr.slice(0), 
                i, 
                datum;
            // 从后往前双重循环比较
            // 如果两个元素相同，删除后一个
            while (--len >= 0) { 
                datum = result[len]; 
                if (datum < 0 || datum > 2) {
                    result.splice(len, 1); 
                    continue;
                }
                i = len;
                while (i--) {
                    if (datum == result[i]) { 
                        result.splice(len, 1); 
                        break; 
                    } 
                } 
            }
            return result;
        },

        /**
         * 清除最近的结果
         */
        _reset : function () {
            this.localSearch.clearResults();
            this.transitRoute.clearResults();
            this.drivingRoute.clearResults();
            this._closeCircleBound();
            this._hideAutoComplete();
        },

        /**
         * 清除地址选择页结果
         */
        _clearAddress: function() {
            if (this.lsAddress) {
                this.lsAddress.clearResults();
            }
            if (this.dom.panel) {
                this.dom.panel.address.style.display = "none";
            }
        },

        /**
          * IE6下处理PNG半透明
          * @param {Object} infoWin
          */
        _mendIE6 : function(infoWin){
            if(!baidu.browser.ie || baidu.browser.ie > 6){
                return;
            }
            var popImg = this.container.getElementsByTagName("IMG");
            for(var i = 0; i < popImg.length; i++) {
                if (popImg[i].src.indexOf('.png') < 0) {
                    continue;
                }
                popImg[i].style.cssText += ';FILTER: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='+ popImg[i].src +',sizingMethod=crop)'
                popImg[i].src = "http://api.map.baidu.com/images/blank.gif";
            }
        }
    });

    //用来存储创建出来的实例
    var guid = 0;
    BMapLib.SearchInfoWindow.instance = [];

})();