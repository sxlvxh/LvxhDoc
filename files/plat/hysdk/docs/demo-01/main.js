/**.-------------------------------------------------------------------------------------------------------------------
 * |  Github: https://github.com/Tinywan
 * |  Blog: http://www.cnblogs.com/Tinywan
 * |--------------------------------------------------------------------------------------------------------------------
 * |  Author: Tinywan(ShaoBo Wan)
 * |  DateTime: 2018/3/24 22:14
 * |  Mail: Overcome.wan@Gmail.com
 * '------------------------------------------------------------------------------------------------------------------*/
'use strict';

var constraints = {
  video: true
};

var video = document.querySelector('video');

function handleSuccess(stream) {
  video.srcObject = stream;
  var options = {
      audioBitsPerSecond : 128000,
      videoBitsPerSecond : 2500000,
      mimeType : 'video/webm\;codecs=h264'
    }
    var mediaRecorder = new MediaRecorder(stream,options);
	mediaRecorder.start();
}

function handleError(error) {
  console.error('getUserMedia error: ', error);
}

navigator.mediaDevices.getUserMedia(constraints).
  then(handleSuccess).catch(handleError);