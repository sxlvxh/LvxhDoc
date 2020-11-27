var CHCCONTENT={
	    todyTaril:"../chccourtscheduling/countStartTrial.action",//获取今日庭审
	    todyCase:"../chccasetypesum/list.action",//获取今日案件
	    mapData:"../chctrialcourtsum/getSum.action",//获取地图上的数据
	    caseData:"../chccaselist/grid.action",//获取所有案件案件详情
	    roomNode:"../chcdataroomsearch/search.action",//获取所有的设备
	    videoUrl:"../chclivevideoinfolist/grid.action",//视频信息
	    timeTrial:"../chccourtschedulinglist/list.action ",//庭审信息接口
	    playback:"../chchistoryvideolist/list.action",//庭审点播回放URL
	    allTrail:"../chccourtscheduling/countCaseStatus.action",//所有庭审
	    HOMEPAGEECHRATS:[ {
			att : "court-session",
			name : "今日庭审",
			firstlist : "正在开庭",
			secondlist : "等待开庭",
			thirdlist : "庭审总数",
			id:1, 
			numberr:[],
			firstnumber:"firstnumber",
			secondnumber:"secondnumber",
			thirdnumber:"thirdnumber",
			ids : [ {
				id : "incourt"
			} ]
		}, {
			att : "court-session",
			name : "监控视频",
			firstlist : "在线数",
			secondlist : "总接数",
			Jnumber:[],
			firstnumber:"Jfirstnumber",
			secondnumber:"Jsecondnumber",
			id:2,
			ids : [ {
				id : "onlinerate"
			} ]
		}, {
			att : "court-session",
			name : "庭审状态",
			firstlist : "已审理",
			id:3,
			secondlist : "未审理",
			firstnumber:"Tfirstnumber",
			secondnumber:"Tsecondnumber",
			numberr:[],
			ids : [ {
				id : "hearing"
			}]
		}, {
			att : "court-session",
			name : "移动视频",
			id:4,
			ids : [ {
				id : "soldier"
			}, {
				id : "vehicle"
			} ]
		}, {
			att : "enlarge-all",
			name : "案件分类",
			id:5,
			ids : [ {
				id : "main"
			} ]
		}, {
			att : "enlarge-all",
			name : "视频会议",
			id:6,
			ids : [ {
				id : "meetingnow"
			} ]
		}, {
			att : "enlarge-all",
			name : "区域分类",
			id:7,
			ids : [ {
				id : "region"
			} ]
		}, {
			att : "enlarge-all",
			name : "综合视频",
			id:8,
			ids : [ {
				id : "main1"
			} ]
		}, ],
		 MAPLIST:  [    "79,150,17,214,182,276,249,218",
						"415,84,397,141,575,169,612,109",
						"383,174,383,199,443,207,446,181",
						"457,219,468,272,533,293,614,332,700,317,623,215",
						"238,287,321,345,445,344,477,301,417,228",
						"493,320,450,391,504,393,542,397,593,424,635,408,548,312",
						"624,347,715,439,768,345,732,319",
						"330,378,367,461,415,476,406,525,498,522,498,496,436,462,417,444,430,404,381,383",
						"447,458,455,497,504,476,516,461,506,429,489,421",
						"523,455,559,506,585,479,604,453,541,419",
						"644,404,640,426,589,446,561,473,574,492,622,486,632,482,666,486,704,464,721,456,736,460,764,468,774,424,711,443,656,404",
						"502,498,562,556,591,530,531,484",
						"585,505,609,617,665,581,716,537,711,487,689,492",
						"710,569,619,573,622,581,642,571,661,570,670,571,667,591,687,589,676,565,689,556,",
						"487,542,464,575,433,590,434,610,499,613,557,644,596,618,558,546",
						"780,468,735,483,730,501,763,529,766,534,755,553,706,558,684,656,754,672,790,615,820,598,830,566,823,516,793,492,784,472",
						"640,616,699,620,691,700,625,653"],
		 SEV : [ {img:"/images/恩施土家族苗族自治州.png",Fname:50,Tname:1000,id:0,endCode:"2358"},{img: "/images/十堰市.png",Fname:50,Tname:21,id:1,endCode:"2273"},
			        {img: "/images/神农架.png",Fname:50,Tname:32,id:2,endCode:"A320104"},{img: "/images/襄阳市.png",Fname:50,Tname:12,id:3,endCode:"2309"} ,
			        {img: "/images/宜昌市.png",Fname:50,Tname:43,id:4,endCode:"2293"},{img:"/images/荆门市.png",Fname:50,Tname:23,id:5,endCode:"2325"} ,
			        {img:"/images/随州市.png",Fname:50,Tname:45,id:6,endCode:"2372"},{img:"/images/荆州市.png",Fname:50,Tname:67,id:7,endCode:"2283"} ,
			        {img:"/images/潜江市.png",Fname:50,Tname:12,id:8,endCode:"A320110"},  {img:"/images/天门市.png",Fname:50,Tname:88,id:9,endCode:"A320111"}, 
			        {img:"/images/孝感市.png",Fname:50,Tname:32,id:10,endCode:"2343"}, {img: "/images/仙桃市.png",Fname:50,Tname:1000,id:11,endCode:"A320113"},
			        {img: "/images/武汉市.png",Fname:50,Tname:31,id:12,endCode:"2251"},    {img:  "/images/鄂州市.png",Fname:50,Tname:767,id:13,endCode:"2321"},
			        {img:  "/images/咸宁市.png", Fname:50,Tname:45,id:14,endCode:"2351"}, {img:  "/images/黄冈市.png",Fname:50,Tname:7897,id:15,endCode:"2332"},
			        {img:  "/images/黄石市.png",Fname:50,Tname:7897,id:16,endCode:"2266"}
			        ]
}

function eachrtsB(divId,data){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById(divId));
	/*var Mname;
	var Qname;
	var Xname;
	if(data.civil==0&&data.other==0&&data.penal==0){
		 Mname="民事类(0)";
		 Qname="其他类(0)";
		 Xname="刑事类(0)";
	}else{
		 Mname="民事类";
		 Qname="其他类";
		 Xname="刑事类";
	}*/
	
	var names=[]
	$.each(data,function(e,h){
			names.push({'name':h.caseTypeName,'value':h.num})
		})
		if(data==''){
			$("#"+divId).append($("<img/>").attr({src:$.getPrefixImgUrl("deepblue","/images/cha.png")}).addClass("caseChose"))
			.append($("<div/>").html("暂无案件").css({"text-align":"center","color":"#698dcc"}).addClass("caseTi"))
			
		}	
	option = {
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b} : {c} ({d}%)"
		},
		
		series : [ {
			name : '访问来源',
			type : 'pie',
			radius : 50,
			center : [ '50%', '53%' ],
			color : [ '#FFB70D', '#F56165', '#0E72FD' ],
			data :names.sort(function(a, b) {
				return a.value - b.value;
			}),
			roseType : 'radius',
			label : {
				normal : {}
			},
			labelLine : {
				normal : {
					smooth : 0.2,
					length : 8,
					length2 : 10
				}
			},
			itemStyle : {
				normal : {

					shadowBlur : 200,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			},

			animationType : 'scale',
			animationEasing : 'elasticOut',
			animationDelay : function(idx) {
				return Math.random() * 200;
			}
		} ]
	};
	
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
}
function todyTrial(divId,data){
	var waitCourt
	var startCourt
	var Fcolor
	var Ccoloor
	var Tcolor
	if(CHCCONTENT.HOMEPAGEECHRATS[0].numberr[0]== undefined){
		console.log("接口出错")
		waitCourt=0
		startCourt=0
	}else{
		waitCourt=CHCCONTENT.HOMEPAGEECHRATS[0].numberr[0].waitCourt
		startCourt=CHCCONTENT.HOMEPAGEECHRATS[0].numberr[0].startCourt
	}
	
	if(waitCourt==0&&startCourt==0){
		waitCourt=''
		    Fcolor='rgba(64, 110, 178, .42)'
		    Ccoloor='rgba(64, 110, 178, .42)'
		    Tcolor='rgba(64, 110, 178, .42)'
		}else{
			 Fcolor='#0dfffb'
		     Ccoloor='#0e70fd'
		     Tcolor= '#0e32fe'
		}
	var myChart = echarts.init(document.getElementById(divId));
	option = {
		title:{
	        text:"开庭中",
	        x:'center',
	        y:'center',
	        top:'40',
	        textStyle:{
	            fontSize:'14',
	            color:'#0dcafc',
	            
	        }
	    },
	    graphic: [
		            { //环形图中间添加文字
		                 type: 'text', //通过不同top值可以设置上下显示
		                 left: 'center',
		                 top: '55%',
		                 style: {
		                     text: startCourt,
		                     textAlign: 'center',
		                     fill: '#0dcafc', //文字的颜色
		                     width: 30,
		                     height: 30,
		                     fontSize: 24,
		                }
		             }
		          ],  
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)",
	        position: 'right'
		},
		series : [ {
			name : '今日庭审',
			type : 'pie',
			radius : [35,53],
			center : [ '50%', '50%' ],
			color : [ 'rgba(64, 110, 178, .42)', '#0dcafc' ],
			avoidLabelOverlap : false,
			label : {
				normal : {
					show : false,
					position : 'center',
					color : [ '#fff' ],
				},
				emphasis : {
					show : false,
					textStyle : {
						fontSize : '14',
						fontWeight : 'bold'
					}
				}
			},
			labelLine : {
				normal : {
					show : false,
				}
			},
			data : [ {
				value :waitCourt,
				name : '等待开庭'
			}, {
				value :startCourt,
				name : '开庭中',
				itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: Fcolor},
                                {offset: 0.5, color: Ccoloor},
                                {offset: 1, color: Tcolor}
                            ]
                        )
                    }
                }
				
			} ]
		} ]
	};

	myChart.setOption(option);
}

function Jvideo(dId,data){
	var myChart = echarts.init(document.getElementById('onlinerate'));
	var ZXL=(data.online/data.total).toFixed(2)
	option = {
		 title:{
		        text:"在线率",
		        x:'center',
		        y:'center',
		        top:'40',
		        textStyle:{
		            fontSize:'14',
		            color:'#e7109f',
		            
		        }
		    },
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} "
		},
	  graphic: [
	            { //环形图中间添加文字
	                 type: 'text', //通过不同top值可以设置上下显示
	                 left: 'center',
	                 top: '55%',
	                 style: {
	                     text: ZXL*100+"%",
	                     textAlign: 'center',
	                     fill: '#e7109f', //文字的颜色
	                     width: 30,
	                     height: 30,
	                     fontSize: 14,
	                }
	             }
	          ],
		series : [ {
			name : '监控视频',
			type : 'pie',
			radius : [35,53],
			avoidLabelOverlap : false,
			color : [ 'rgba(64, 110, 178, .42)', "#e7109f" ],
			label : {
				normal : {
					show : false,
					position : 'center',
					color : [ '#fff' ],
				},
				emphasis : {
					show : false,
					textStyle : {
						fontSize : '14',
						fontWeight : 'bold'
					}
				}
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : [ {
				value : data.total,
				name : '总接数'
			},{
				value : data.online,
				name : '在线数',
				itemStyle:{
					 normal: {//颜色渐变
	                     color: new echarts.graphic.LinearGradient(
	                         0, 0, 0, 1,
	                         [
	                             {offset: 0, color: '#F408A7'},
	                             {offset: 0.5, color: '#CB2BB0'},
	                             {offset: 1, color: '#F00CA4'}
	                         ]
	                     )
	                 }
				}
				
			} ]
		} ]
	};

	myChart.setOption(option);
}
function Tstate(dId,data){
	var stopCourt
	var pauseCourt
	var Allnumber=data
	var Fcolor
	var Ccoloor
	var Tcolor
	if(Allnumber== undefined){
		console.log("接口出错")
		stopCourt=0
		pauseCourt=0
	}else{
		stopCourt=data.closeStatus
		pauseCourt=data.openStatus
		
	}
	if(stopCourt==0&&pauseCourt==0){
		pauseCourt=''
	    Fcolor='rgba(64, 110, 178, .42)'
	    Ccoloor='rgba(64, 110, 178, .42)'
	    Tcolor='rgba(64, 110, 178, .42)'
	}else{
		 Fcolor='#0dfffb'
	     Ccoloor='#0e70fd'
	     Tcolor= '#0e32fe'
	}
	var myChart = echarts.init(document.getElementById(dId));

	option = {
		title:{
	        text:"已审理",
	        x:'center',
	        y:'center',
	        top:'40',
	        textStyle:{
	            fontSize:'14',
	            color:'#0dcafc',
	            
	        }
	    },
	    graphic: [
		            { //环形图中间添加文字
		                 type: 'text', //通过不同top值可以设置上下显示
		                 left: 'center',
		                 top: '55%',
		                 style: {
		                     text: stopCourt,
		                     textAlign: 'center',
		                     fill: '#0dcafc', //文字的颜色
		                     width: 30,
		                     height: 30,
		                     fontSize: 24,
		                }
		             }
		          ], 
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)",
			position: 'right'
		},
		series : [ {
			name : '庭审状态',
			type : 'pie',
			radius : [35,53],
			color : [ 'rgba(64, 110, 178, .42)', '#0dcafc' ],
			avoidLabelOverlap : false,
			label : {
				normal : {
					show : false,
					position : 'center',
					color : [ '#fff' ],
				},
				emphasis : {
					show : false,
					textStyle : {
						fontSize : '14',
						fontWeight : 'bold'
					}
				}
			},
			labelLine : {
				normal : {
					show : false,
				}
			},
			data : [ {
				value : pauseCourt,
				name : '未审理'
			}, {
				value :stopCourt,
				name : ' 已审理',
				itemStyle: {
					 normal: {//颜色渐变
	                        color: new echarts.graphic.LinearGradient(
	                                0, 0, 0, 1,
	                                [
	                                    {offset: 0, color: Fcolor},
	                                    {offset: 0.5, color:  Ccoloor},
	                                    {offset: 1, color: Tcolor}
	                                ]
	                            )
	                    }
                }
			} ]
		} ]
	};

	myChart.setOption(option);
}

function mobileVideo(){
	var myChart = echarts.init(document.getElementById('soldier'));

	option = {
			title:{
		        text:"车载在线",
		        x:'center',
		        y:'center',
		        top:'40',
		        textStyle:{
		            fontSize:'14',
		            color:'#0dcafc',
		            
		        }
		    },
    graphic: [
	            { //环形图中间添加文字
	                 type: 'text', //通过不同top值可以设置上下显示
	                 left: 'center',
	                 top: '55%',
	                 style: {
	                     text: 100+"/"+200,
	                     textAlign: 'center',
	                     fill: '#0dcafc', //文字的颜色
	                     width: 30,
	                     height: 30,
	                     fontSize: 24,
	                }
	             }
	          ], 
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		series : [ {
			name : '车载在线',
			type : 'pie',
			radius : [35,53],
			avoidLabelOverlap : false,
			color : [ 'rgba(64, 110, 178, .42)', '#0dcafc' ],
			label : {
				normal : {
					show : false,
					position : 'center',
					color : [ '#fff' ],
				},
				emphasis : {
					show : false,
					textStyle : {
						fontSize : '14',
						fontWeight : 'bold'
					}
				}
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : [ {
				value : 100,
				name : '车载离线'
			}, {
				value : 100,
				name : ' 车载在线',
				itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#0e32fe'},
                                {offset: 0.5, color: '#0e70fd'},
                                {offset: 1, color: '#0dfffb'}
                            ]
                        )
                    }
                }
			} ]
		} ]
	};

	myChart.setOption(option);
}


function mobileVideo2(){
	var myChart = echarts.init(document
			.getElementById('vehicle'));

	option = {
			title:{
		        text:"单兵在线",
		        x:'center',
		        y:'center',
		        top:'40',
		        textStyle:{
		            fontSize:'14',
		            color:'#fbc90d',
		            
		        }
		    },
		    graphic: [
			            { //环形图中间添加文字
			                 type: 'text', //通过不同top值可以设置上下显示
			                 left: 'center',
			                 top: '55%',
			                 style: {
			                     text: 200+"/"+400,
			                     textAlign: 'center',
			                     fill: '#fbc90d', //文字的颜色
			                     width: 30,
			                     height: 30,
			                     fontSize: 24,
			                }
			             }
			          ], 
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		series : [ {
			name : '单兵在线',
			type : 'pie',
			radius : [35,53],
			avoidLabelOverlap : false,
			color : [ 'rgba(64, 110, 178, .42)', '#fbc90d' ],
			label : {
				normal : {
					show : false,
					position : 'center',
					color : [ '#fff' ],
				},
				emphasis : {
					show : false,
					textStyle : {
						fontSize : '12',
						fontWeight : 'bold'
					}
				}
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : [ {
				value : 200,
				name : '单兵离线'
			}, {
				value : 200,
				name : '单兵在线 ',
				itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#FFDB0D'},
                                {offset: 0.5, color: '#FFCB0D'},
                                {offset: 1, color: '#FF8A0D'}
                            ]
                        )
                    }
                }
			} ]
		} ]
	};

	myChart.setOption(option);
}
function videoMeeting(){
	var myChart = echarts.init(document
			.getElementById('meetingnow'));
	option = {
			
			title:{
		        text:"正在会议",
		        x:'center',
		        y:'center',
		        top:'40',
		        textStyle:{
		            fontSize:'14',
		            color:'#0dcafc',
		            
		        }
		    },
		    graphic: [
			            { //环形图中间添加文字
			                 type: 'text', //通过不同top值可以设置上下显示
			                 left: 'center',
			                 top: '55%',
			                 style: {
			                     text: 7,
			                     textAlign: 'center',
			                     fill: '#0dcafc', //文字的颜色
			                     width: 30,
			                     height: 30,
			                     fontSize: 24,
			                }
			             }
			          ], 
		tooltip : {
			trigger : 'item',
			formatter : "{a} <br/>{b}: {c} ({d}%)"
		},
		series : [ {
			name : '视频会议',
			type : 'pie',
			radius : [35,52],
			avoidLabelOverlap : false,
			color : [ 'rgba(64, 110, 178, .42)', '#0dcafc' ],
			label : {
				normal : {
					show : false,
					position : 'center',
					color : [ '#fff' ],
				},
				emphasis : {
					show : false,
					textStyle : {
						fontSize : '14',
						fontWeight : 'bold'
					}
				}
			},
			labelLine : {
				normal : {
					show : false
				}
			},
			data : [ {
				value : 13,
				name : '暂停会议'
			}, {
				value : 7,
				name : '正在会议 ',
				itemStyle: {
                    normal: {//颜色渐变
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#0e32fe'},
                                {offset: 0.5, color: '#0e70fd'},
                                {offset: 1, color: '#0dfffb'}
                            ]
                        )
                    }
                }
			} ]
		} ]
	};

	myChart.setOption(option);
}
function regClassinfo(){
	var myChart = echarts.init(document
			.getElementById('region'));

	option = {
		xAxis : {
			type : 'category',
			boundaryGap : false,
			data : [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri',
					'Sat', 'Sun' ],
					axisLine: {
                        lineStyle: {
                            color: '#fff',
                            width: 1, //这里是为了突出显示加上的  
                        }
                    },
		},
		yAxis : {
			type : 'value',
			axisLine: {
                lineStyle: {
                    color: '#fff',
                    width: 1, //这里是为了突出显示加上的  
                }
            },
		},
		grid : {
			left : '4%',
			top : "5%",
			right : '5%',
			bottom : '3%',
			containLabel : true
		},
		series : [ {
			data : [ 820, 932, 901, 934, 1290, 1330, 1320 ],
			type : 'line',
			areaStyle : {
				color : '#0EDEFF',
			},
			  itemStyle : {  
                  normal : {  
                	  color:'#fff',  
                      lineStyle:{  
                          color:'#0EDEFF'  
                      }  
                  }  
              }, 
		} ]
	};
	myChart.setOption(option);
}

function comVideo(){
	var myChart = echarts.init(document.getElementById('main1'));

	options = {
			 color: ['#3398DB'],
			    tooltip: {
			        trigger: 'axis',
			        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
			            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis: [
			        {
			            type: 'category',
			            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			            axisTick: {
			                alignWithLabel: true
			            },
			            axisLine: {
			                lineStyle: {
			                    color: '#fff',
			                    width: 1, //这里是为了突出显示加上的  
			                }
			            },
			        }
			    ],
			    yAxis: [
			        {
			            type: 'value',
			            axisLine: {
			                lineStyle: {
			                    color: '#fff',
			                    width: 1, //这里是为了突出显示加上的  
			                }
			            },
			        }
			        
			    ],
			    grid : {
					left : '4%',
					top : "5%",
					right : '5%',
					bottom : '3%',
					containLabel : true
				},
			    series: [
			        {
			            name: '直接访问',
			            type: 'bar',
			            barWidth: '60%',
			            data: [10, 52, 200, 334, 390, 330, 220]
			        }
			    ]
	};
	myChart.setOption(options);
}