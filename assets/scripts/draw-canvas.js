'use strict';

// Prepares canvas based on size and dimension of image
const prepareCanvas = function(height, width) {
  let canvas = new fabric.Canvas('test-canvas');
  canvas.setDimensions({height, width});
  return canvas;
};

// Returns the distance between two points
const distanceBtwPoints = function(pointA, pointB) {
  return Math.sqrt(Math.pow((pointA.x - pointB.x),2) + Math.pow((pointA.y - pointB.y),2));
};

// Returns the center of a quadrilateral
const centroid = function(pointA, pointB, pointC, pointD) {
  return {
    x: (pointA.x + pointB.x + pointC.x + pointD.x) / 4,
    y: (pointA.y + pointB.y + pointC.y + pointD.y) / 4
  };
};

// Converts facial detection data into parameters for placing mustache
const paramsFromFacePoints = function(facePoints) {
  console.log(facePoints);
  let width = distanceBtwPoints(facePoints.mouthLeft, facePoints.mouthRight) * 1.5;
  console.log(width);
  let center = centroid(facePoints.mouthLeft, facePoints.mouthRight, facePoints.noseLeftAlarOutTip, facePoints.noseRightAlarOutTip);

  let params = {
    width,
    xPos: center.x,
    yPos: center.y,
    // angle: 20,
  };
  return params;
};

// Draws a mustache on a canvas based on input parameters
const drawMustache = function(canvas, params) {
  fabric.loadSVGFromURL("assets/images/mustache1.svg", function(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);

    console.log(params);

    obj
    .scaleToWidth(params.width)
    .set({
      originX: 'center',
      originY: 'center',
      left: params.xPos,
      top: params.yPos,
      angle: params.angle
    })
    .setCoords();

    canvas.add(obj);

  });
};

// Canvas Fabric.js Test
const drawCanvas = function() {
  let canvas = prepareCanvas(600, 600);

  // Draw some face points
  let noseLeftAlarOutTip = new fabric.Circle({ originX: 'center', originY: 'center', left: 439, top: 205,  radius: 3, fill: 'cyan', x: 439, y: 205});
  let noseRightAlarOutTip = new fabric.Circle({ originX: 'center', originY: 'center', left: 467, top: 217,  radius: 3, fill: 'cyan', x: 467, y: 217 });
  let mouthLeft = new fabric.Circle({ originX: 'center', originY: 'center', left: 422, top: 218,  radius: 3, fill: 'cyan', x: 422, y: 218 });
  let mouthRight = new fabric.Circle({ originX: 'center', originY: 'center', left: 477, top: 240,  radius: 3, fill: 'cyan', x: 477, y: 240 });

  canvas.add(noseLeftAlarOutTip);
  canvas.add(noseRightAlarOutTip);
  canvas.add(mouthLeft);
  canvas.add(mouthRight);

  let facePoints = {
    noseLeftAlarOutTip: { x: 439, y: 205 },
    noseRightAlarOutTip: { x: 467, y: 217 },
    mouthLeft: { x: 422, y: 218 },
    mouthRight: { x: 477, y: 240 }
  };
  drawMustache(canvas, paramsFromFacePoints(facePoints));
};

module.exports = drawCanvas;
