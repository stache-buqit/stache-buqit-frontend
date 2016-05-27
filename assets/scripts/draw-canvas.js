'use strict';

// Prepares canvas based on size and dimension of image
const prepareCanvas = function(height, width) {
  let canvas = new fabric.Canvas('test-canvas');
  canvas.setDimensions({height, width});
  return canvas;
};

// Draws a mustache on a canvas based on input parameters
const drawMustache = function(canvas, width) {
  fabric.loadSVGFromURL("assets/images/mustache1.svg", function(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);

    obj
    .scaleToWidth(width)
    .setCoords();

    console.log(obj.height, obj.width);

    canvas.add(obj);

  });
};

// Canvas Fabric.js Test
const drawCanvas = function() {
  let canvas = prepareCanvas(600, 600);
  drawMustache(canvas, 200);
};

module.exports = drawCanvas;
