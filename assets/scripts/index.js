'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
const appData = require('./app-data.js');
const faceApiCall = require('./face-api-call.js');
const drawCanvas = require('./draw-canvas');

$(() => {

  // Upload Image
  $('#application-x-www-form-encoded').on('submit', function(e) {
    e.preventDefault(); // default is to rerender whatever comes back
    // console.log(this);
    let formData = new FormData(this);
    console.log(formData);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/uploads',
      processData: false, // so that jQuery doesn't transform the object into an encoded string
      contentType: false, // tells jQuery not to set a content type header
      data: formData
    }).done((data) => {
      faceApiCall(data.upload.location);
      // console.log(appData.uploadResponse.upload.location);
    })
    .fail((error) => console.error(error));
  });


  // Direct URL Entry
  $('#direct-url-entry').on('submit', function(e) {
    e.preventDefault();
    let url = $('#url-input').val();
    console.log(url);
    faceApiCall(url);
    $('.test-canvas-background').css('background-image', `url(${url})`);
  });

});
