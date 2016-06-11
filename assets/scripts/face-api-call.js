'use strict';

const appData = require('./app-data.js');
const drawCanvas = require('./draw-canvas.js');
const faceApiCall =  function (url) {
  let img = new Image();
  img.onload = function() {
    appData.image.width = this.width;
    appData.image.height = this.height;
    console.log(appData.image);
  };
  img.src = url;
  $.ajax({
  method: 'POST',
  url: 'https://api.projectoxford.ai/face/v1.0/detect?returnFacelandmarks=true',
  data: `{\"url\": \"${url}\"}`,
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
