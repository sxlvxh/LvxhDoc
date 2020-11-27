$.fn.lxhCalender= function(format){
  var obj = $(this);
  $(this).bind("click",function()
   {
    lvxhCalPanel(obj,format);
   }
  );
  
};
var calParent; 
	var date = new Date();
	var myDate = {
		curYear   : 0,
		curMonth  : 0,
		curDate   : 0,
		curHour   : 0,
		curMinute : 0,
		curSecond : 0,
		format:"yyyy-mm-dd hh:ii:ss",
        months:['1',' 2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        weekDays:['日','一', '二', '三', '四', '五', '六'],
		activeTime:"calhour",
		isOpen:false,
		haveMouse:false,
		mouseOver:false		
  	}
	initMyDate(date);
	function initMyDate(date)
	{
	    myDate.curYear = date.getFullYear();
		myDate.curMonth = date.getMonth();
		myDate.curDate = date.getDate();
		myDate.curHour =  date.getHours();
		myDate.curMinute = date.getMinutes();
		myDate.curSecond = date.getSeconds();
	}
		
	function lvxhCalPanel(obj,format)
	{
	 
	    calParent = $(obj);
		myDate.format = format;
		initCalender();		
		$(".lvxhCalHead").append('<table style="width:100%;text-align:center"><tr><td><div class="prevYearCss"></div></td><td><div class="prevMonthCss"></div></td><td><div class="curYearMonthCss"></div></td><td><div class="nextMonthCss"></div></td><td><div class="nextYearCss"></div></td></tr></table>');
		$(".lvxhCalContent").append('<table style="width:100%;text-align:center"><thead id="calendarTH"></thead><tbody id="lvxhTBody"></tdoby></table>');
		for(var i=0;i<7;i++)
		{
		 $("#calendarTH").append('<th>'+myDate.weekDays[i]+'</th>');
		}
		initDate();
		headEvent();
		$(".todayBtn").click();
		
	}
	function headEvent()
	{
	 $(".prevYearCss").bind("click",function(event){
		prevYear();
		});
		$(".prevMonthCss").bind("click",function(event){
		prevMonth();
		});
		$(".nextMonthCss").bind("click",function(event){
		nextMonth();
		});
		$(".nextYearCss").bind("click",function(event){
		nextYear();
		});
	}
	function initCalender()
	{
		$(".lvxhCalPanel").remove();
		myDate.isOpen = false;
		var cp = $("<div class='lvxhCalPanel'></div>");
		$(calParent).after(cp);
		var off = $(calParent).offset();
		var width = $(calParent).width();
		cp.css({"width":width+42});
		$.hy_error(width);
		var height = $(calParent).height();
		$(calParent).next("div").offset(
		{
			top : off.top + height,
			left : off.left
		});
		$(".lvxhCalPanel").append('<div class="lvxhCalHead"></div>');
		$(".lvxhCalPanel").append('<div class="lvxhCalContent"></div>');
		$(".lvxhCalPanel").append('<div class="lvxhCalBtn"></div>');
		$(".lvxhCalBtn").append('<div class="lvxhCalBtnDiv time"><input type="text" id="calhour" name="calhour" class="calhour" maxlength="4"  max="9999"/>:<input id="calminute" name="calminute"  class="calminute" maxlength="2"/>:<input id="calsecond" name="calsecond"  class="calsecond" maxlength="2"/></div><div class="lvxhCalBtnDiv time" ><div class="timeUp" ></div><div class="timeDown"></div></div><div class="confirmBtn"><span>确定</span></div><div class="todayBtn"><span>今天</span></div><div class="cleanBtn"><span>清除</span></div>');
		/*$("input:first",$(".lvxhCalBtnDiv")).focus();*/
		initTime();
		bindEvent();
		$(".time",$(".lvxhCalBtn")).hide();
		
		var mformat = myDate.format;
		if(mformat.indexOf("hh") > 0)
		{
		 $(".time").show();
		}
		
		$(".lvxhCalPanel").append($("<iframe />").css({"width":width,
		"height":height,
		"position":"absolute",
		"z-index":"-2",
		"top":"0px",
		"left":"0px"
		}).addClass("iframe-border"));
		
			
	}
	function initTime()
	{
	    $(".calhour").val(myDate.curHour<10 ? '0'+myDate.curHour : myDate.curHour );
		$(".calminute").val(myDate.curMinute<10 ? '0'+myDate.curMinute : myDate.curMinute );
		$(".calsecond").val(myDate.curSecond<10 ? '0'+myDate.curSecond : myDate.curSecond );
		
	}
	function bindEvent()
	{
	  $(".todayBtn").bind("click",function(){
		 var today = new Date();
		 initMyDate(today);
		 initDate();
		 initTime();
		 //setDateTime();
		 
		});
		$(".confirmBtn").bind("click",function(){
		 var today = new Date();
		 myDate.curHour =$(".calhour").val()*1;
		 myDate.curMinute=$(".calminute").val()*1;
		 myDate.curSecond=$(".calsecond").val()*1;
		 //initMyDate(date);
		 setDateTime();
		 $(".lvxhCalPanel").remove();
		 
		});
		$(".cleanBtn").bind("click",function(){
			 $(calParent).removeAttr("title").val("");
			 $(".lvxhCalPanel").remove();
			 
			});
		$("input",$(".lvxhCalBtnDiv")).bind("click",function(){
		  myDate.activeTime = $(this).attr("id");
		  //alert(myDate.activeTime);
		});
		$(".timeUp").bind("click",function(){
			 var indx = $("#"+myDate.activeTime).val();
			 if(myDate.activeTime == "calhour" && indx >=22)
			 {
			  indx = 22;
			 }
			 else if(myDate.activeTime == "calminute" && indx >=58)
			 {
			  indx = 58;
			 }
			 else if(myDate.activeTime == "calsecond" && indx >=58)
			 {
			  indx = 58;
			 }
			 indx = indx*1+1;
			 if(indx < 10)
			 {
			  indx = "0" + indx;
			 }
			 
			 $("#"+myDate.activeTime).val(indx);
		});
		$(".timeDown").bind("click",function(){
			 var indx = $("#"+myDate.activeTime).val();
			 if(indx <= 1)
			 {
			  indx = 1;
			 }
			 indx = indx*1-1;
			 if(indx < 10)
			 {
			  indx = "0" + indx;
			 }
			 $("#"+myDate.activeTime).val(indx);
		});
		$(".calhour").bind("focusout",function(event){
		 var value = $(this).val();
		 if(!(value>=0 && value<24))
		 {
		   $(this).val("00");
		 }		 
		});
		$(".calminute").bind("focusout",function(event){
		 var value = $(this).val();
		 if(!(value>=0 && value<60))
		 {
		   $(this).val("00");
		 }		 
		});
		$(".calsecond").bind("focusout",function(event){
		 var value = $(this).val();
		 if(!(value>=0 && value<60))
		 {
		   $(this).val("00");
		 }		 
		});
		$(".lvxhCalPanel").bind("mouseover",function(){
			 myDate.haveMouse = false;
			
		});
		$(".lvxhCalPanel").bind("mouseout",function(){
			 myDate.haveMouse = true;
		});
		$("body").bind("mousedown",function(){
	  	 if(myDate.haveMouse)
		 {
		    
		    $(".lvxhCalPanel").remove();
			$("body").unbind("mousedown");
		 }
	    });
		
	}
	function prevYear()
	{	
	 
	 if(myDate.curYear <= 1970)
	 {
	   return;
	 }
	 else
	 {
	  myDate.curYear = myDate.curYear-1;
	  initDate();
	 }
	 
	}
	function nextYear()
	{ 
		myDate.curYear = myDate.curYear+1;
		initDate();
	}
	function prevMonth()
	{
	    if(myDate.curMonth == 0 )
		{
		 myDate.curMonth = 11;
		 myDate.curYear = myDate.curYear-1;
		 
		}
		else
		{
	     myDate.curMonth= myDate.curMonth-1;
		}
	    initDate();
	}
	function nextMonth()
	{
	   
	   if(myDate.curMonth == 11)
		{
		   myDate.curMonth = 0;
		   myDate.curYear = myDate.curYear+1;
		}
		else
		{
	     myDate.curMonth= myDate.curMonth+1;
		}
	   initDate();
	}
	function initDate()
	{
	    $("#lvxhTBody").empty();
		var ind = 1;
		var tempDate = new Date();
		tempDate.setMonth(myDate.curMonth);
		tempDate.setYear(myDate.curYear);
		tempDate.setDate(myDate.curDate);
		$(".curYearMonthCss").html('<span>'+myDate.curYear+'年&nbsp;'+(myDate.curMonth+1)+'月</span>');
		//alert(curYear + ":" + curMonth);
		var maxDate = new Date(myDate.curYear,myDate.curMonth+1,0).getDate();
		while(ind<=maxDate)
		{
		    var str = "<tr>"
			for(var i=0;i<7;i++)
			{
			  tempDate.setDate(ind);
			  
			  var tempDay = tempDate.getDay();
			  if(tempDay == i && ind <= maxDate)
			  {
			    str = str+'<td class="lvxhDateCss" date="'+ind+'"><span>'+ind+"<span></td>";
				ind++;
			  }
			  else
			  {
			    str = str+"<td></td>";
			  }
			  
			}
			str = str+"</tr>";
			$("#lvxhTBody").append(str);
		}
		$(".lvxhDateCss").bind("click",function(event){
			myDate.curDate = $(this).attr("date");
		
			$(".lvxhDateCss").removeClass("lvxhDateSelected");
			$(".lvxhDateCss").addClass("lvxhDateSelect");
			 $(this).removeClass("lvxhDateSelect");
			 $(this).addClass("lvxhDateSelected");
		
		})
		$(".lvxhDateCss").bind("dbclick",function(event){
			myDate.curDate = $(this).attr("date");
			$(".lvxhDateCss").removeClass("lvxhDateSelected");
			$(".lvxhDateCss").addClass("lvxhDateSelect");
			$(this).removeClass("lvxhDateSelect");
			$(this).addClass("lvxhDateSelected");
			$(".confirmBtn").click();
		
		})
		todayTimeActive();
	}
	
	function setDateTime()
	{
	     var dateTime = myDate.format
		 dateTime = dateTime.replace("yyyy",myDate.curYear);
		 dateTime = dateTime.replace("mm",myDate.curMonth<9 ? '0'+(myDate.curMonth+1) : (myDate.curMonth+1) );
		 dateTime = dateTime.replace("dd",myDate.curDate<10 ? '0'+myDate.curDate : myDate.curDate );
		 dateTime = dateTime.replace("hh",myDate.curHour<10 ? '0'+myDate.curHour : myDate.curHour );
		 dateTime = dateTime.replace("ii",myDate.curMinute<10 ? '0'+myDate.curMinute : myDate.curMinute );
		 dateTime = dateTime.replace("ss",myDate.curSecond<10 ? '0'+myDate.curSecond : myDate.curSecond );
		 $(calParent).attr("title", dateTime).val(dateTime);
	}
	function todayTimeActive()
	{
	  var tDate = new Date();
	  if(myDate.curYear == tDate.getFullYear()&& myDate.curMonth == tDate.getMonth() && myDate.curDate == tDate.getDate())
	  {
	    $(".lvxhDateCss").removeClass("lvxhDateSelected");
		$(".lvxhDateCss").addClass("lvxhDateSelect");
		$(".lvxhDateCss[date='"+tDate.getDate()+"']").removeClass("lvxhDateSelect");
		$(".lvxhDateCss[date='"+tDate.getDate()+"']").addClass("lvxhDateSelected");
	  }
		
	}