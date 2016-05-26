'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled

$(() => {
  $('#application-x-www-form-encoded').on('submit', function(e) {
    e.preventDefault(); // default is to rerender whatever comes back
    console.log(this);
    let formData = new FormData(this);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/uploads',
      processData: false, // so that jQuery doesn't transform the object into an encoded string
      contentType: false, // tells jQuery not to set a content type header
      data: formData
    }).done((data) => console.log(data))
    .fail((error) => console.error(error));
  });

  // Canvas Fabric.js Test
  let canvas = new fabric.Canvas('test-canvas');
  canvas.setDimensions({height: 500, width: 500});
  // 
  // // Draw a square
  // let rect = new fabric.Rect({
  //   left: 100,
  //   top: 100,
  //   fill: 'red',
  //   width: 20,
  //   height: 20
  // });
  //
  // canvas.add(rect);

  // Draw a mustache svg

  fabric.loadSVGFromURL("assets/images/mustache1.svg", function(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);

    obj.scaleToHeight(200)
      .set({
        left: canvas.width / 3,
        top: canvas.height / 3
      })
      .setCoords();

    canvas.add(obj);

  });



});
