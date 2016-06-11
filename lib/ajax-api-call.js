'use strict';

const appData = require('../assets/scripts/app-data.js');
const drawCanvas = require('../assets/scripts/draw-canvas.js');
const faceApiCall =  function (data) {
  let img = new Image();
  img.onload = function() {
    appData.image.width = this.width;
    appData.image.height = this.height;
    console.log(appData.image);
  };
  img.src = data;
  $.ajax({
  method: 'POST',
  url: 'https://api.projectoxford.ai/face/v1.0/detect?returnFacelandmarks=true',
  data: `{\"url\": \"${data}\"}`,
  headers: {
   'Content-Type': 'application/json',
   'Ocp-Apim-Subscription-Key': 'd487f4fe54ca4889b5dbbd8bbb72b596'
  }
  }).done((data) => {
    //  appData.faceData = data;
    console.log(data);
    drawCanvas(data);
  })
  .fail((error) => console.error(error));
};

module.exports = faceApiCall;
