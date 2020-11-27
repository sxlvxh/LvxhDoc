/**.-------------------------------------------------------------------------------------------------------------------
 * |  Github: https://github.com/Tinywan
 * |  Blog: http://www.cnblogs.com/Tinywan
 * |--------------------------------------------------------------------------------------------------------------------
 * |  Author: Tinywan(ShaoBo Wan)
 * |  DateTime: 2018/3/24 22:14
 * |  Mail: Overcome.wan@Gmail.com
 * '------------------------------------------------------------------------------------------------------------------*/

'use strict';

// Set up media stream constant and parameters.

// In this codelab, you will be streaming video only: "video: true".
// Audio will not be streamed because it is set to "audio: false" by default.
const mediaStreamConstraints = {
  video: true,
};

// Set up to exchange only video.
const offerOptions = {
  offerToReceiveVideo: 1,
};

// Define initial start time of the call (defined as connection between peers).
let startTime = null;

// Define peer connections, streams and video elements.
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

let localStream;
let remoteStream;
var loacldescription;

let localPeerConnection;
let remotePeerConnection;

var  remoteUser = ''; // 远端用户
var  localUser = ''; // 本地登录用户


const CLIENT_RTC_EVENT = 'CLIENT_RTC_EVENT';
const SERVER_RTC_EVENT = 'SERVER_RTC_EVENT';

const CLIENT_USER_EVENT = 'CLIENT_USER_EVENT';
const SERVER_USER_EVENT = 'SERVER_USER_EVENT';

const CLIENT_USER_EVENT_LOGIN = 'CLIENT_USER_EVENT_LOGIN'; // 登录

const SERVER_USER_EVENT_UPDATE_USERS = 'SERVER_USER_EVENT_UPDATE_USERS';

const SIGNALING_OFFER = 'SIGNALING_OFFER';
const SIGNALING_ANSWER = 'SIGNALING_ANSWER';
const SIGNALING_CANDIDATE = 'SIGNALING_CANDIDATE';


function WSocket(){
	this.msgQueue = [];
}

var wSocket = new WSocket();
const iceConfig = {"iceServers": [
        {url: 'stun:139.196.76.46:8091'}/*,
        {url: 'turn:139.196.76.46:8091', username: 'test', credential: '123456'}*/
    ]};
WSocket.prototype.init = function(){ 
	var _this = this;
	try{
        //var userList = [{userName:'jff'}, {userName:'jff2'}];
       // updateUserList(userList);
		_this.receiveQueueExec();
		if(typeof(_this.ws) == "object"){
			_this.ws.destory();
		}
		//var platParams = JSON.parse(localStorage.getItem("platParams"));
		//var loginUser = platParams.loing_user;
		var url = "ws://192.168.2.132:8089/ws";
		//var loginName = loginUser.userCode;
		
		if(_this.loginName){
			loginName = _this.loginName;
		}
		var eventFunc = ["contact","talking","meeting"];
		var opt = {
			url:url,
			loginName:localUser, 
			loginSuccess:function(ws){
				//setStatus('Ready for call');
				//createPC();
			},			
			receive:function(msg){
				_this.msgQueue.push(msg);
				
			},
			procClosed:function(){
			   
			},
			procError:function(){
			  
			},
			log:true
		};
		_this.ws = new NETTY_WS(opt);
	}catch(e){
		alert(e);
	}
 }
  WSocket.prototype.receiveQueueExec = function(){
	var _this = this;
	clearInterval(_this.receiveMsgExecTimer);
	
	_this.receiveMsgExecTimer = setInterval(function(){
		if(_this.msgQueue.length > 0){
			var msg = _this.msgQueue.shift();
                
			if(msg.msgType == "kickout"){
				console.log("====被踢出====")
			}else if(msg.msgType == "chat"){
				$.each(eventFunc,function(i,n){
					if(_this.ws[n]){
						_this.ws[n](msg);
					}
				})
			}else if(msg.msgType == "notice"){
				var cont = JSON2.parse(msg.content); 
				if(cont.type){  
					_this.ws[cont.type](msg);  //addFriend 
				}
			}else if(msg.msgType == "CLIENT_RTC_EVENT"){//rtc时间
				//alert(111);
				var cont = JSON.parse(msg.content); 
                //console.log(JSON.stringify(msg));
                
               //  const {type} = msg;

                 var type = cont.type;
				 console.log(cont);
                switch(type) {
                    case SIGNALING_OFFER:
					console.log(1);
                       remotePeerConnection = new RTCPeerConnection(null);
					  trace('Created remote peer connection object remotePeerConnection.');

					  remotePeerConnection.addEventListener('icecandidate', handleConnection);
					  remotePeerConnection.addEventListener(
						'iceconnectionstatechange', handleConnectionChange);
					  remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);
					  remotePeerConnection.setRemoteDescription(new RTCSessionDescription(cont.payload.sdp))
					  
					  remotePeerConnection.createAnswer()
						.then(createdAnswer)
						.catch(setSessionDescriptionError);
	
					  
                        break;
                    case SIGNALING_ANSWER:
					console.log(2);
                        //handleReceiveAnswer(cont);
						remotePeerConnection.setRemoteDescription(new RTCSessionDescription(cont.payload.sdp))
                        break;
                    case SIGNALING_CANDIDATE:
					console.log(3);
                        //handleReceiveCandidate(cont);
						 remotePeerConnection.addIceCandidate(new RTCIceCandidate({
							sdpMLineIndex: cont.payload.mlineindex,
							candidate: cont.payload.candidate
						  }),function () {
							console.log("addIceCandidate OK")
						}, function (t) {
							console.log("addIceCandidate error:" + JSON.stringify(t))
						})
						  
                        break;
                }
			}
		}
		
	}, 10);
 }
 

    // 连接服务器并建立信令通道
function connect() {
	localUser = document.getElementById("key").value;
	remoteUser = document.getElementById("key1").value;
	wSocket.init();
}
function sendRTCEvent(msg) {   
    var u = [];
	u.push(remoteUser);
     var setContent = {
        msgType : CLIENT_RTC_EVENT,
        src : localUser,
        content : JSON.stringify(msg),
        targets : u
      };
      wSocket.ws.sendMsg(setContent);
}

// Define MediaStreams callbacks.

// Sets the MediaStream as the video element src.
function gotLocalMediaStream(mediaStream) {
	console.log(mediaStream);
  localVideo.srcObject = mediaStream;
  localStream = mediaStream;
  trace('Received local stream.');
  callButton.disabled = false;  // Enable call button.
  
  trace('Starting call.');
  startTime = window.performance.now();

  // Get local media stream tracks.
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    trace(`Using video device: ${videoTracks[0].label}.`);
  }
  if (audioTracks.length > 0) {
    trace(`Using audio device: ${audioTracks[0].label}.`);
  }

  const servers = null;  // Allows for RTC server configuration.

  // Create peer connections and add behavior.
  localPeerConnection = new RTCPeerConnection(servers);
  trace('Created local peer connection object localPeerConnection.');

  localPeerConnection.addEventListener('icecandidate', handleConnection);
  localPeerConnection.addEventListener(
    'iceconnectionstatechange', handleConnectionChange);

  

  
	
}

// Handles error by logging a message to the console.
function handleLocalMediaStreamError(error) {
  trace(`navigator.getUserMedia error: ${error.toString()}.`);
}

// Handles remote MediaStream success by adding it as the remoteVideo src.
function gotRemoteMediaStream(event) {
	console.log(11);
  const mediaStream = event.stream;
  remoteVideo.srcObject = mediaStream;
  remoteStream = mediaStream;
  
    const videoTracks = remoteStream.getVideoTracks();
  const audioTracks = remoteStream.getAudioTracks();
  
  if (videoTracks.length > 0) {
    trace(`Using video device: ${videoTracks[0].label}.`);
  }
  if (audioTracks.length > 0) {
    trace(`Using audio device: ${audioTracks[0].label}.`);
  }
  trace('Remote peer connection received remote stream.');
}


// Add behavior for video streams.

// Logs a message with the id and size of a video element.
function logVideoLoaded(event) {
  const video = event.target;
  trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
        `videoHeight: ${video.videoHeight}px.`);
}

// Logs a message with the id and size of a video element.
// This event is fired when video begins streaming.
function logResizedVideo(event) {
  logVideoLoaded(event);

  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    startTime = null;
    trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
  }
}

localVideo.addEventListener('loadedmetadata', logVideoLoaded);
remoteVideo.addEventListener('loadedmetadata', logVideoLoaded);
remoteVideo.addEventListener('onresize', logResizedVideo);


// Define RTC peer connection behavior.

// Connects with new peer candidate.
function handleConnection(event) {
console.log(" ========================== ");
  const peerConnection = event.target;
  const iceCandidate = event.candidate;
   if (iceCandidate) {
	   sendRTCEvent({
            type: SIGNALING_CANDIDATE,            
            payload: {
                from: localUser,
                target: remoteUser,
                mlineindex: iceCandidate.sdpMLineIndex,
                candidate: iceCandidate.candidate
            }
        });	
   }
	/*
  if (iceCandidate) {
    const newIceCandidate = new RTCIceCandidate(iceCandidate);
     sendRTCEvent({
            type: SIGNALING_CANDIDATE,            
            payload: {
                from: localUser,
                target: remoteUser,
                mlineindex: iceCandidate.sdpMLineIndex,
                candidate: iceCandidate.candidate
            }
        });	

	const otherPeer = getOtherPeer(peerConnection);

    otherPeer.addIceCandidate(newIceCandidate)
      .then(() => {
        handleConnectionSuccess(peerConnection);
      }).catch((error) => {
        handleConnectionFailure(peerConnection, error);
      });

    trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
          `${event.candidate.candidate}.`);
		  */
  //}
}

// Logs that the connection succeeded.
function handleConnectionSuccess(peerConnection) {
  trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
};

// Logs that the connection failed.
function handleConnectionFailure(peerConnection, error) {
  trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n`+
        `${error.toString()}.`);
}

// Logs changes to the connection state.
function handleConnectionChange(event) {
  const peerConnection = event.target;
  console.log('ICE state change event: ', event);
  trace(`${getPeerName(peerConnection)} ICE state: ` +
        `${peerConnection.iceConnectionState}.`);
}

// Logs error when setting session description fails.
function setSessionDescriptionError(error) {
  trace(`Failed to create session description: ${error.toString()}.`);
}

// Logs success when setting session description.
function setDescriptionSuccess(peerConnection, functionName) {
  const peerName = getPeerName(peerConnection);
  trace(`${peerName} ${functionName} complete.`);
}

// Logs success when localDescription is set.
function setLocalDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setLocalDescription');
}

// Logs success when remoteDescription is set.
function setRemoteDescriptionSuccess(peerConnection) {
  setDescriptionSuccess(peerConnection, 'setRemoteDescription');
}

// Logs offer creation and sets peer connection session descriptions.
function createdOffer(description) {
  trace(`Offer from localPeerConnection:\n${description.sdp}`);

  trace('localPeerConnection setLocalDescription start.');
  loacldescription = description;
  localPeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(localPeerConnection);
    }).catch(setSessionDescriptionError);
	
	sendRTCEvent({
        type: SIGNALING_OFFER,
        payload: {
            sdp: description,
            from: localUser,
            target: remoteUser
        }
    });
/**
  trace('remotePeerConnection setRemoteDescription start.');
  remotePeerConnection.setRemoteDescription(description)
    .then(() => {
      setRemoteDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('remotePeerConnection createAnswer start.');
  remotePeerConnection.createAnswer()
    .then(createdAnswer)
    .catch(setSessionDescriptionError); */
}

// Logs answer to offer creation and sets peer connection session descriptions.
function createdAnswer(description) {
  trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

  trace('remotePeerConnection setLocalDescription start.');
  remotePeerConnection.setLocalDescription(description)
    .then(() => {
      setLocalDescriptionSuccess(remotePeerConnection);
    }).catch(setSessionDescriptionError);

  trace('localPeerConnection setRemoteDescription start.');
  sendRTCEvent({
        type: SIGNALING_ANSWER,
        payload: {
            sdp: description,
            from: localUser,
            target: remoteUser
        }
    });
	
	
	
}


// Define and add behavior to buttons.

// Define action buttons.
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

// Set up initial action buttons status: disable call and hangup.
callButton.disabled = true;
hangupButton.disabled = true;


// Handles start button action: creates local MediaStream.
function startAction() {
  startButton.disabled = true;
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
  trace('Requesting local stream.');
  
  
  
  
}

// Handles call button action: creates peer connection.
function callAction() {
  callButton.disabled = true;
  hangupButton.disabled = false;

  trace('localPeerConnection createOffer start.');
  
  // Add local stream to connection and create offer to connect.
  localPeerConnection.addStream(localStream);
  trace('Added local stream to localPeerConnection.');
  
  localPeerConnection.createOffer(offerOptions)
    .then(createdOffer).catch(setSessionDescriptionError);
	
	
  //localPeerConnection.createOffer(offerOptions)
 //   .then(createdOffer).catch(setSessionDescriptionError);
	
}

// Handles hangup action: ends up call, closes connections and resets peers.
function hangupAction() {
  localPeerConnection.close();
  remotePeerConnection.close();
  localPeerConnection = null;
  remotePeerConnection = null;
  hangupButton.disabled = true;
  callButton.disabled = false;
  trace('Ending call.');
}

// Add click event handlers for buttons.
startButton.addEventListener('click', startAction);
callButton.addEventListener('click', callAction);
hangupButton.addEventListener('click', hangupAction);


// Define helper functions.

// Gets the "other" peer connection.
function getOtherPeer(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      remotePeerConnection : localPeerConnection;
}

// Gets the name of a certain peer connection.
function getPeerName(peerConnection) {
  return (peerConnection === localPeerConnection) ?
      'localPeerConnection' : 'remotePeerConnection';
}

// Logs an action (text) and the time when it happened on the console.
function trace(text) {
  text = text.trim();
  const now = (window.performance.now() / 1000).toFixed(3);

  console.log(now, text);
}

