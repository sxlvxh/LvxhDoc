/**==============================================================*/
function HY_PLAYER_WS(opts){	
       
		this.wsserverurl = opts.wsserver;
		this.rtspurl = opts.rtspurl;
		this.queue = [];
		this.mediaplayer = opts.mediaplayer;
		this.needsend = false;
		this.openws = this.openws.bind(this);
		this.stop = this.stop.bind(this);
		this.loadvideo = this.loadvideo.bind(this);
		this.onUpdateEnd = this.onUpdateEnd.bind(this);
		this.onCanPlay = this.onCanPlay.bind(this);
		this.onMediaSourceOpen = this.onMediaSourceOpen.bind(this);
		this.onUpdateEnd = this.onUpdateEnd.bind(this);
		this.openws();
};
HY_PLAYER_WS.prototype.openws = function() {
	    console.log(" HY_PLAYER_WS.prototype.openws ");
        this.websocket = new WebSocket(this.wsserverurl); 
        this.websocket.onopen =  this.onOpen.bind(this); 
        this.websocket.onclose = this.onClose.bind(this); 
        this.websocket.onmessage = this.onMessage.bind(this); 
        this.websocket.onerror = this.onError.bind(this); 
      
    }  ;
	
HY_PLAYER_WS.prototype.onOpen = function(evt) { 
		this.websocket.binaryType="arraybuffer";
        console.log("CONNECTED"); 
		var sendurl = {"id":2,"url":this.rtspurl};
	
		this.doSend(JSON.stringify(sendurl)); 
    };
	
HY_PLAYER_WS.prototype.onClose= function(evt) { 
        console.log("DISCONNECTED"); 
		this.websocket.close();
    } ;
	
HY_PLAYER_WS.prototype.onMessage= function(evt) { 
        //console.log(evt);
		if(typeof(evt.data) == "string")            //服务器传过来的可能是字符串，判断是不是
        {
            var str = evt.data;
			console.log(str);
			var json = JSON.parse(str);
			if(json.id == 1)
			{
					var mimestr = json.open;//strs[0];
					this.playurl(mimestr);
			}
        }
        else
        {
			var result = new Uint8Array(evt.data);
			this.queue.push(result);
			if (this.needsend == true)
			{
				this.loadvideo();
			}
        }
    };
HY_PLAYER_WS.prototype.onError= function(evt) { 
        console.log('ERROR:'+ evt.data); 
		this.stop();
    } ; 
  
HY_PLAYER_WS.prototype.doSend= function(message) { 
        console.log("SENT: " + message);  
        this.websocket.send(message); 
    };
	
HY_PLAYER_WS.prototype.playurl= function(mimestr){
	    var _this = this;
		this.supportstr = 'video/mp4; codecs=\"' + mimestr + '\"'; 
		console.log("call playurl:", this.supportstr);
		if (MediaSource.isTypeSupported(this.supportstr)) {
			this.mediaSource = new MediaSource;
			this.mediaSource.addEventListener('sourceopen',this.onMediaSourceOpen);
			this.mediaplayer.src = URL.createObjectURL(this.mediaSource);
			this.mediaplayer.addEventListener("canplay", this.onCanPlay);
			var video = this.mediaplayer;
			video.addEventListener('loadstart', function(e) {
		      console.log('提示视频的元数据已加载');
		      console.log(e);
		    });
		
		    // 2、durationchange：时长变化。当指定的音频/视频的时长数据发生变化时触发，加载后，时长由 NaN 变为音频/视频的实际时长
		    video.addEventListener('durationchange', function(e) {
		      console.log('提示视频的时长已改变');
		      console.log(e);
		     
		    });
		
		    // 3、loadedmetadata ：元数据加载。当指定的音频/视频的元数据已加载时触发，元数据包括：时长、尺寸（仅视频）以及文本轨道
		    video.addEventListener('loadedmetadata', function(e) {
		      console.log('提示视频的元数据已加载');
		      console.log(e);
		    });
		
		    // 4、loadeddata：视频下载监听。当当前帧的数据已加载，但没有足够的数据来播放指定音频/视频的下一帧时触发
		    video.addEventListener('loadeddata', function(e) {
		      console.log('提示当前帧的数据是可用的');
		      console.log(e);
		    });
		
		    // 5、progress：浏览器下载监听。当浏览器正在下载指定的音频/视频时触发
		    video.addEventListener('progress', function(e) {
		     
		    });
		
		    // 6、canplay：可播放监听。当浏览器能够开始播放指定的音频/视频时触发
		    video.addEventListener('canplay', function(e) {
		      console.log('提示该视频已准备好开始播放');
		      console.log(e);
		    });
		
		    // 7、canplaythrough：可流畅播放。当浏览器预计能够在不停下来进行缓冲的情况下持续播放指定的音频/视频时触发
		    video.addEventListener('canplaythrough', function(e) {
		      console.log('提示视频能够不停顿地一直播放');
		      console.log(e);
		    });
		
		    // 8、play：播放监听
		    video.addEventListener('play', function(e) {
		      console.log('提示该视频正在播放中');
		      console.log(e);
		    });
		
		    // 9、pause：暂停监听
		    video.addEventListener('pause', function(e) {
		      console.log('暂停播放');
		      console.log(e);
		      video.play();
		    });
		
		    // 10、seeking：查找开始。当用户开始移动/跳跃到音频/视频中新的位置时触发
		    video.addEventListener('seeking', function(e) {
		      console.log('开始移动进度条');
		      console.log(e);
		    });
		
		    // 11、seeked：查找结束。当用户已经移动/跳跃到视频中新的位置时触发
		    video.addEventListener('seeked', function(e) {
		      console.log('进度条已经移动到了新的位置');
		      console.log(e);
		    });
		
		    // 12、waiting：视频加载等待。当视频由于需要缓冲下一帧而停止，等待时触发
		    video.addEventListener('waiting', function(e) {
		      console.log('视频加载等待');
		      console.log(e);
		    });
		
		    // 13、playing：当视频在已因缓冲而暂停或停止后已就绪时触发
		    video.addEventListener('playing', function(e) {
		      console.log('playing');
		      console.log(e);
		    });
		
		    // 14、timeupdate：目前的播放位置已更改时，播放时间更新
		    video.addEventListener('timeupdate', function(e) {
		   
		    	
		    });
		
		    // 15、ended：播放结束
		    video.addEventListener('ended', function(e) {
		      console.log('视频播放完了');
		      console.log(e);
		    });
		
		    // 16、error：播放错误
		    video.addEventListener('error', function(e) {
		      console.log('视频出错了');
		      console.log(e);
		    });
		
		    // 17、volumechange：当音量更改时
		    video.addEventListener('volumechange', function(e) {
		    	console.log('==音量调节==='+video.volume);
		      console.log('volumechange');		    
		    });
		
		    // 18、stalled：当浏览器尝试获取媒体数据，但数据不可用时
		    video.addEventListener('stalled', function(e) {
		      console.log('stalled');
		      console.log(e);
		    });
		
		    // 19、ratechange：当视频的播放速度已更改时
		    video.addEventListener('ratechange', function(e) {
		      console.log('ratechange');
		      console.log(e);
		    });
    
		}else{
			console.log("Unsupported MIME type or codec: ", + this.supportstr);
		}
	};
	
HY_PLAYER_WS.prototype.onCanPlay= function(){
		this.mediaplayer.play();
	};
	
HY_PLAYER_WS.prototype.onMediaSourceOpen= function(e){
		this.mediaSource.removeEventListener('sourceopen', this.onMediaSourceOpen);
		console.log("sourceopen" + this.supportstr);
		this.sourceBuffer = this.mediaSource.addSourceBuffer(this.supportstr);
		this.loadvideo();
		this.sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
	};
	
HY_PLAYER_WS.prototype.onUpdateEnd= function(e){
		this.sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
		this.loadvideo();
	};
	
HY_PLAYER_WS.prototype.stop= function(){		
		this.mediaplayer.pause();
		if(this.sourceBuffer){
			this.sourceBuffer.abort();
		}
		if(this.mediaSource){
			this.mediaSource.endOfStream();
		}
	};
HY_PLAYER_WS.prototype.loadvideo= function(){
		if (this.queue && this.queue.length){
			if (!this.sourceBuffer.updating){
				this.needsend = false;
			
				var newBuffer = this.queue.shift();				
				this.sourceBuffer.appendBuffer(newBuffer);
				
				try{
					if(this.sourceBuffer.buffered.length > 0)
					{
						var t = this.sourceBuffer.buffered.end(0);
					    var s = this.mediaplayer.currentTime;
					    if(t - s > 5)
					    {
					    	this.websocket.close();					    	
					    	this.openws();
					    }
					}
				}catch(e){
				  console.log(e);
				}
				newBuffer = null;
			}else{
				this.needsend = true;
			}		
		}else{
			this.needsend = true;
		}
};