'use strict';
const appData = require('./app-data');

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
const centroid = function(points) {
  return {
    x: points.reduce( (prev, curr) => prev + curr.x, 0 ) / points.length,
    y: points.reduce( (prev, curr) => prev + curr.y, 0 ) / points.length
  };
};

// Returns the angle of the line between two points
const getAngle = function(pointA, pointB) {
  let slope = (pointA.y - pointB.y)/(pointA.x - pointB.x);
  console.log(slope);
  let degrees = Math.atan(slope) * (180 / Math.PI);
  console.log(degrees);
  return degrees;
};

// Converts facial detection data into parameters for placing mustache
const paramsFromFacePoints = function(facePoints) {
  console.log(facePoints);
  let width = distanceBtwPoints(facePoints.mouthLeft, facePoints.mouthRight) * 1.5;
  console.log(width);
  let center = centroid([facePoints.mouthLeft, facePoints.mouthRight, facePoints.noseLeftAlarOutTip, facePoints.noseRightAlarOutTip]);
  let angle = getAngle(facePoints.mouthLeft, facePoints.mouthRight);

  let params = {
    width,
    xPos: center.x,
    yPos: center.y,
    angle,
  };
  return params;
};

// Draws a mustache on a canvas based on input parameters
const drawMustache = function(canvas, params, scaleFactor) {
  fabric.loadSVGFromURL("assets/images/mustache1.svg", function(objects, options) {
    let obj = fabric.util.groupSVGElements(objects, options);
    console.log(params);
    params = paramsFromFacePoints(params);
    obj
    .scaleToWidth(params.width * scaleFactor)
    .set({
      originX: 'center',
      originY: 'center',
      left: params.xPos * scaleFactor,
      top: params.yPos * scaleFactor,
      angle: params.angle
    })
    .setCoords();

    canvas.add(obj);

  });
};

// Canvas Fabric.js Test
const drawCanvas = function(faceJSON) {
  let photoHeight = appData.image.height;
  let photoWidth = appData.image.width;
  let canvasWidth = appData.canvasWidth;
  let canvasHeight = photoHeight * canvasWidth / photoWidth;
  let scaleFactor = canvasWidth / photoWidth;
  console.log("PHOTO: ", photoHeight, photoWidth, "CANVAS: ", canvasHeight, canvasWidth, "SCALE: ", scaleFactor);
  let canvas = prepareCanvas(canvasHeight, canvasWidth);
  for (let i = 0; i < faceJSON.length; i++) {
    drawMustache(canvas, faceJSON[i].faceLandmarks, scaleFactor);
  }
};

module.exports = drawCanvas;
