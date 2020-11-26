$(function(){
	var imgCanvas = document.getElementById("left-evidence-canvas");
	var cxt=imgCanvas.getContext("2d");
	var img=new Image()
	img.src="/evidence/1.jpg";
	cxt.drawImage(img,0,0);
});

