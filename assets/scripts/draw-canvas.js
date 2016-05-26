'use strict';

// Prepares canvas based on size and dimension of image
const prepareCanvas = function(height, width) {
  let canvas = new fabric.Canvas('test-canvas');
  canvas.setDimensions({height, width});
  return canvas;
};

// Canvas Fabric.js Test
const drawCanvas = function() {
  let canvas = prepareCanvas(600, 600);

  fabric.loadSVGFromURL("assets/images/mustache1.svg", function(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);

    obj.scaleToWidth(100).set({
        // height: 200,
        // width: 200,
        // angle: 90,
        // left: canvas.width / 3,
        // top: canvas.height / 3,
    })
    .setCoords();

    console.log(obj.height, obj.width);

    canvas.add(obj);

  });

};

module.exports = drawCanvas;
