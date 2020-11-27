function API(opt)
{
	this.iframe = opt.iframe;
}
API.prototype.menu = function(data,pnode)
{
	var _this = this;
	pnode.empty();
	var ul = $("<ul/>");
	pnode.append(ul);
	$.each(data,function(i,n){
		var li = $("<li/>").attr(n);
		var span = $("<span class='menu-span'/>").html(n.name);
	   var u = $("<ul/>").attr(n).hide();		
		span.bind("click",function(){
			if(n.url)
			{
				_this.iframe.attr({"src":n.url});
				
			}
			u.toggle();
		});
	
		li.append(span).append(u);
		ul.append(li);
	});
	
	$.each($("li",pnode),function(i,n){
		$(n).appendTo($("ul[id='"+$(n).attr("pid")+"']"));
	});
}