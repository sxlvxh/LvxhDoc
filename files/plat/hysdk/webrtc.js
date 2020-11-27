function H5sPlayerRTC(t) {
	this.ws,
	this.o,
	this.h,
	this.l = 0,
	this.u = 0,
	this.S = 0,
	this.v = !1,
	this.k = t,
	this.videoid = t.videoid,
	this.token = t.token,
	this.video = document.getElementById(this.videoid),
	this.s = this.video,
	this.N = null,
	this.agreenment = {
		optional: [{
				DtlsSrtpKeyAgreement: true
			}
		]
	},
	this.A = {
		mandatory: {
			offerToReceiveAudio: true,
			offerToReceiveVideo: true
		}
	},
	this.configuration = {
		B: []
	},
	this.D = [];
	var s = this.k.protocol + "//" + this.k.host + this.k.rootpath + "api/v1/GetImage?token=" + this.token + "&session=" + this.k.session;
	this.video.setAttribute("poster", s)
}
function createRTCSessionDescription(t) {
	return console.log("createRTCSessionDescription "),
	new RTCSessionDescription(t)
}
H5sPlayerRTC.prototype.G = function () {
	console.log("Try Reconnect...", this.v),
	!0 === this.v && (console.log("Reconnect..."), this.U(this.token), this.v = !1),
	console.log("Try Reconnect...", this.v)
}, H5sPlayerRTC.prototype.createWebsocket = function (t) {
	var s;
	console.log("H5SWebSocketClient");
	try {
		"http:" == this.k.protocol && (s = "undefined" != typeof MozWebSocket ? new MozWebSocket("ws://" + this.k.host + t) : new WebSocket("ws://" + this.k.host + t)),
		"https:" == this.k.protocol && (console.log(this.k.host), s = "undefined" != typeof MozWebSocket ? new MozWebSocket("wss://" + this.k.host + t) : new WebSocket("wss://" + this.k.host + t)),
		console.log(this.k.host)
	} catch (t) {
		return void alert("error")
	}
	return s
}, H5sPlayerRTC.prototype.j = function () {
	try {
		var t = {
			type: "keepalive"
		};
		this.ws.send(JSON.stringify(t))
	} catch (t) {
		console.log(t)
	}
}, H5sPlayerRTC.prototype.et = function (t) {
	if (t.candidate) {
		var s;
		console.log("onIceCandidate currentice", t.candidate),
		s = t.candidate,
		console.log("onIceCandidate currentice", s, JSON.stringify(s));
		var e = JSON.parse(JSON.stringify(s));
		e.type = "remoteice",
		console.log("onIceCandidate currentice new", e, JSON.stringify(e)),
		this.ws.send(JSON.stringify(e))
	} else
		console.log("End of candidates.")
}, H5sPlayerRTC.prototype.it = function (t) {
	var s;
	console.log("Remote track added:" + JSON.stringify(t)),
	s = t.ot ? t.ot[0] : t.stream;
	var video = this.video;
	video.src = URL.createObjectURL(s),
	video.play()
}, H5sPlayerRTC.prototype.nt = function () {
	console.log("createPeerConnection  config: " + JSON.stringify(this.configuration) + " option:" + JSON.stringify(this.agreenment));
	var rtcPeerConnection = new RTCPeerConnection(this.configuration, this.agreenment);
	var _this  = this;
	return rtcPeerConnection.onicecandidate = function (t) {
		_this.et.call(_this, t)
	},
	void 0 !== rtcPeerConnection.ht ? rtcPeerConnection.ht = function (t) {
		_this.it.call(_this, t)
	}
	 : rtcPeerConnection.onaddstream = function (t) {
		_this.it.call(_this, t)
	},
	rtcPeerConnection.oniceconnectionstatechange = function (t) {
		console.log("oniceconnectionstatechange  state: " + rtcPeerConnection.iceConnectionState)
	},
	console.log("Created RTCPeerConnnection with config: " + JSON.stringify(this.configuration) + "option:" + JSON.stringify(this.agreenment)),
	rtcPeerConnection
}, H5sPlayerRTC.prototype.ct = function (t) {
	console.log("ProcessRTCOffer", t);
	try {
		this.N = this.nt(),
		this.D.length = 0;
		var s = this;
		this.N.setRemoteDescription(createRTCSessionDescription(t)),
		this.N.createAnswer(this.A).then(function (t) {
			console.log("Create answer:" + JSON.stringify(t)),
			s.N.setLocalDescription(t, function () {
				console.log("ProcessRTCOffer createAnswer", t),
				s.ws.send(JSON.stringify(t))
			}, function () {})
		}, function (t) {
			alert("Create awnser error:" + JSON.stringify(t))
		})
	} catch (t) {
		this.disconnect(),
		alert("connect error: " + t)
	}
}, H5sPlayerRTC.prototype.rt = function (t) {
	console.log("ProcessRemoteIce", t);
	try {
		var s = new RTCIceCandidate({
				sdpMLineIndex: t.sdpMLineIndex,
				candidate: t.candidate
			});
		console.log("ProcessRemoteIce", s),
		console.log("Adding ICE candidate :" + JSON.stringify(s)),
		this.N.addIceCandidate(s, function () {
			console.log("addIceCandidate OK")
		}, function (t) {
			console.log("addIceCandidate error:" + JSON.stringify(t))
		})
	} catch (t) {
		alert("connect ProcessRemoteIce error: " + t)
	}
}, H5sPlayerRTC.prototype.q = function (t) {
	console.log("RTC received ", t.data);
	var s = JSON.parse(t.data);
	console.log("Get Message type ", s.type),
	"offer" === s.type && (console.log("Process Message type ", s.type), this.ct(s)),
	"remoteice" === s.type && (console.log("Process Message type ", s.type), this.rt(s))
}, H5sPlayerRTC.prototype.init = function (t) {
	this.s.autoplay = !0;
	var s = "api/v1/h5srtcapi";
	s = this.k.rootpath + s + "?token=" + t,
	console.log(s),
	this.ws = this.createWebsocket(s),
	console.log("setupWebSocket", this.ws),
	this.ws.binaryType = "arraybuffer",
	(this.ws.Y = this).ws.onmessage = this.q.bind(this),
	this.ws.onopen = function () {
		console.log("wsSocket.onopen", this.Y);
		var t = {
			type: "open"
		};
		this.Y.ws.send(JSON.stringify(t)),
		this.Y.h = setInterval(this.Y.j.bind(this.Y), 1e3)
	},
	this.ws.onclose = function () {
		console.log("wsSocket.onclose", this.Y),
		!0 === this.Y.p ? console.log("wsSocket.onclose disconnect") : this.Y.v = !0,
		this.Y._(this.Y)
	}
}, H5sPlayerRTC.prototype._ = function (t) {
	console.log("CleanupWebSocket", t),
	clearInterval(t.h),
	t.l = 0,
	t.u = 0,
	t.S = 0
}, H5sPlayerRTC.prototype.connect = function () {
	this.init(this.token),
	this.tt = setInterval(this.G.bind(this), 3e3)
}, H5sPlayerRTC.prototype.disconnect = function () {
	console.log("disconnect", this),
	this.p = !0,
	clearInterval(this.tt),
	null != this.ws && (this.ws.close(), this.ws = null),
	console.log("disconnect", this)
};