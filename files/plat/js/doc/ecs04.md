# ECSC04文档  
	本文档适用于ECS业务服务器,web端开发使用。  
##  版本说明  
    C01  
##  注意事项  
    1、请求及返回结果都使用UTF-8字符集进行编码。 
    2、返回值中0为成功，其他均为失败。  
	3、sdk的所有方法均需要在登录成功，之后执行。
##  WEB开发API  
### 界面按钮配置  
### 1.地图一级按钮
```js
   {
    "img":"/bigScreen/ico_zhihui.png",
    "active_img":"/bigScreen/ico_zhihui_press.png",
    "buttonType":"initDeviceType",
    "initEvent":"",
    "active_default":"active",
    "isShowLeftDiv":true,
    "isShowBottomDiv":true,
    "isShowRightDiv":true,
    "rightPanel":{
        "rightWidth":"",
        "rightHeight":""
    },
    "isHasTitleTop":"-80"
    }
    img -- 默认图片(必填)
    active_img -- 高亮图片(必填)
    buttonType -- 按钮类型名称(必填)
    initEvent -- 地图一级按钮默认事件
    active_default -- 地图一级按钮默认高亮状态
    isShowLeftDiv -- 是否展开地图左半边按钮，默认不存在即不展开
    isShowBottomDiv  -- 是否展开地图下半边按钮，默认不存在即不展开
    isShowRightDiv  -- 是否展开地图右半边按钮，默认不存在即不展开
    rightPanel -- 是否需要自定义地图右侧panel的高度，若此属性不存在，右侧panel宽度默认270px，高度默认window的高度，若此属性存在，右侧panel宽度为(270px-rightPanel.rightWidth)，高度为（window的高度--rightPanel.rightHeight）
    isHasTitleTop -- 是否地图头部的标题
```
### 2.1.地图二级按钮（地图左）
```js
{
      "img":"/bigScreen/ico_zhihui.png",
      "active_img":"/bigScreen/ico_zhihui_press.png",
      "buttonType":"initTaskType",
      "active_default":"active"
    }
    img -- 默认图片(必填)
    active_img -- 高亮图片(必填)
    buttonType -- 按钮类型名称(必填)
    active_default -- 地图二级按钮默认高亮状态
```
 
### 2.2.1地图二级按钮（地图下--摄像头）
```js
    {
      "img":"/bigScreen/menuIcon/footer_shexiangtou.png",
      "active_img":"/bigScreen/menuIcon/footer_shexiangtou_press.png",
      "buttonType":"initDevicesType",
      "active_default":"active",
      "initEvent":"initStoreDevicesMarker",
      "openEvent":"showDevicesMarker",
      "closeEvent":"hideDevicesMarker",
      "url": [{
			"url": "../platroomnode/list.action",
			"postDynamicParam": [],
      }],
      "isClus":false,
      "maxZoom":"18",
       "dialog":{"width":450,"height":260},
      "mapParams":{
           "markerSave": [{
				"key": "id"
		   }],
		   "positionParam":{
		       "lng":"lng",
		       "lat":"lat"
		   },
		   "markerType": {
			   "pid": "elements",
			   "render": {
    				"0": "0",
    				"1": "1",
    				"2": "2",
    				"3": "3"
    			},
			    "initValue": "extendIndexc"
		   },
    		"markerStatus": {
    			"pid": "elements",
    			"render": {
    				"0": "gray",
    				"1": "active",
    				"2": "active",
    				"3": "active"
    			},
    			"initValue": "nState"
    		},
    		"markerSize": {
    			"width": "32",
    			"height": "32"
    		},
    		"markerLabelStyle": {
    			"color": "#fff",
    			"fontSize": "12px",
    			"padding": "2px 4px",
    			"fontFamily": "微软雅黑",
    		    "backgroundColor":"rgba(0,10,137,0.6)",
    		    "fontWeight":"bold",
    		    "border":"0px",
    		    "borderRadius":"2px",
    		    "maxWidth":"none",
    		    "background":"url(../theme/deepblue/images/fangkuang.png)",
    		    "backgroundRepeat":"no-repeat",
    			"background-size":"100% 100%",
    			"height":"26px"
    		},
    		"markderLabelTitle": {
    			"show": false,
    			"content": "roomNodeName"
    		},
    		"markerEvent": [{
    			"event": "click",
    			"eventFunc": "clickDeviceMarker"
    		}, {
    			"event": "dragging",
    			"eventFunc": "draggingDeviceMarker"
    		}],
    		"playParam": {
    		    "name":"roomNodeName",
    			"domainCode": "domainCode",
    			"devCode":"devCode",
    			"channelCode":"videoChannelCode",
    			"streamCode":"videoStreamCode"
    		}
        }
    }
    img -- 默认图片(必填)
    active_img -- 高亮图片(必填)
    buttonType -- 按钮类型名称(必填)
    active_default -- 地图下二级按钮默认高亮状态 
    openEvent:"showDevicesMarker", -- 地图下二级按钮显示marker
    closeEvent:"hideDevicesMarker", -- 地图下二级按钮隐藏marker
    initEvent  -- 地图二级按钮初始化方法
    "url": [{
		"url": "../platroomnode/list.action",  -- 接口
		"postDynamicParam": [],  -- 参数
    }]
    "isClus":false  -- 是否聚合状态
    "maxZoom":"18",  -- 若是聚合状态，自定义聚合级别
     "dialog":{"width":450,"height":260} -- 自定义弹框宽高
    "mapParams":{
          "markerSave": [{   -- 唯一key值
				"key": "id"
		   }],
		   "positionParam":{  -- 转化经纬度属性值
		       "lng":"lng",
		       "lat":"lat"
		   },
		   "markerType": {  -- 地图上marker的类型 
			   "pid": "elements",
			   "render": {
    				"0": "0",
    				"1": "1",
    				"2": "2",
    				"3": "3"
    			},
			    "initValue": "extendIndexc"  -- 根据指定属性判断marker类型
		   },
    		"markerStatus": {  -- 地图上marker的状态
    			"pid": "elements",
    			"render": {
    				"0": "gray",
    				"1": "active",
    				"2": "active",
    				"3": "active"
    			},
    			"initValue": "nState"  -- 根据指定属性判断marker状态
    		},
    		"markerSize": {  -- 地图上marker的大小
    			"width": "32",
    			"height": "32"
    		},
    		"markerLabelStyle": {  -- 地图上marker上面label的样式
    			"color": "#fff",
    			"fontSize": "12px",
    			"padding": "2px 4px",
    			"fontFamily": "微软雅黑",
    		    "backgroundColor":"rgba(0,10,137,0.6)",
    		    "fontWeight":"bold",
    		    "border":"0px",
    		    "borderRadius":"2px",
    		    "maxWidth":"none",
    		    "background":"url(../theme/deepblue/images/fangkuang.png)",
    		    "backgroundRepeat":"no-repeat",
    			"background-size":"100% 100%",
    			"height":"26px"
    		},
    		"markderLabelTitle": {  -- 地图上marker上面label的文字
    			"show": false,
    			"content": "roomNodeName"
    		},
    		"markerEvent": [{   -- 地图上marker的绑定事件
    			"event": "click",    -- 点击事件
    			"eventFunc": "clickMapMarker"
    		}, {
    			"event": "dragging",   -- 拖拽事件
    			"eventFunc": "draggingMapMarker"
    		}],
    		"markerDialog":{  -- 地图上marker弹框宽高
    		    "markerDialogWidth":"450px",
    			"markerDialogHeight":"260px"
    		},
    		"playParam": {  --地图上marker播放的参数
    		    "name":"roomNodeName",
    			"domainCode": "domainCode",
    			"devCode":"devCode",
    			"channelCode":"videoChannelCode",
    			"streamCode":"videoStreamCode"
    		}
    	}
```

### 2.3. 地图三级级按钮（地图下）（观摩）

```js
{
	"coustomFunc": "inspectVideo",
	"actionParam": {
		"name": "roomNodeName",
		"domainCode": "domainCode",
		"devCode": "devCode",
		"channelCode": "videoChannelCode",
		"streamCode": "videoStreamCode"
	}
}

    "coustomFunc": "inspectVideo", -- 地图三级按钮，观摩的自定义事件
	"actionParam": {  -- 地图三级按钮，观摩需要的参数
		"name": "roomNodeName",
		"domainCode": "domainCode",
		"devCode": "devCode",
		"channelCode": "videoChannelCode",
		"streamCode": "videoStreamCode"
	}
```
### 界面属性配置  
    需部署怀业流媒体服务授权版本服务器  
### 菜单管理配置  
### 百度地图菜单

```js
{
    "type":"baiduMap",
    "mapLngLat":{
       "lng":"xxx",
       "lat":"xxx"
    },
    "mapLevel":"17",
    "mapTopShow":true,
    "mapTopPosition":{
        "top":"100px",
        "left":"10px"
    },
    "controls":{
        "MapTypeControl":{
           "isShow":true,
           "offSet":{
              "x":90,
              "y":20
           }
       },
       "NavigationControl":{
           "isShow":true,
           "offSet":{
              "x":110,
              "y":50
           }
       },
       "ScaleControl":{
           "isShow":true,
           "offSet":{
              "x":170,
              "y":55
           }
       },
       "PanoramaControl":{
           "isShow":true,
           "offSet":{
              "x":50,
              "y":50
           }
       },
      "TrafficControl":{
          "isShow":true,
          "offSet":{
              "x":0,
              "y":0
           }
      },
      "searchControl":{
          "isShow":true,
          "offSet":{
              "x":20,
              "y":20
          }
      },
      "markerSearchControl":{
          "isShow":true,
          "offSet":{
              "x":20,
              "y":20
          }
      },
       "IndoorManager":{
    	   "isShow":true,
    	   "config":"config"
        }
    },
    "isFullScreen":true
}
    
    type -- 地图类型
    mapLngLat -- 地图指定中心点（默认走配置文件中的中心点）
    mapLevel -- 地图指定显示层级（默认走配置文件中的层级）
    mapTopShow  -- 是否显示地图头部标题+时间+天气
    mapTopPosition -- 地图上按钮相对地图的位置
    controls:{  -- 地图上安装的控件
       MapTypeControl  -- 地图类型控件
       NavigationControl -- 缩放平移控件
       ScaleControl  -- 比例尺控件
       PanoramaControl  -- 全景控件
       searchControl  -- 地图位置搜索框
       markerSearchControl  -- 地图marker搜索框
       IndoorManager -- 楼层控件
       "config":"config" -- 是否有楼层控件参数
    },
    isFullScreen -- 是否满屏
```   
##  JAVA开发API
    主流版本的 Chrome、Firefox、Edge、360极速浏览器 、Opera 浏览器、
	推荐浏览器及版本  Chrome(>=84.0.4147.125) 、Edge(>=84.0.522.63)、Firefox(>=79.0)  





