const enablewebcam = document.querySelector(".btn");
const video = document.getElementById("webcam");
const invisible = document.querySelector('.sec-invisible')
let alarmAudio;


var model = undefined;
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
});


function getUserMediaSupported() {
  return (navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia);
}


function predictWebcam() {
  model.detect(video).then(function (predictions) {
    if (!alarmAudio) {
      alarmAudio = new Audio("Alarm.mp3");
      alarmAudio.loop = true;
    }
    for (let n = 0; n < predictions.length; n++) {
      if (predictions[n].score > 0.66) {
        if(predictions[n].class === "person"){
          alarmAudio.play();
        }

      }
    }
  
    window.requestAnimationFrame(predictWebcam);
  });
}



function enableCam(event) {
  if (!model) {
    return;
  }
  invisible.classList.add('sec-visible')
  
  const constraints = {
    video: true
  };
  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

if (getUserMediaSupported()) {
  enablewebcam.addEventListener('click', enableCam);
} else {
  console.warn('getUserMedia() is not supported by your browser');
}

function closed() {
  if (alarmAudio) {
    alarmAudio.pause();
  }
}

var model = true;

