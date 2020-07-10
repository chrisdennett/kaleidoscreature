import React from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "./hooks/useAnimationFrame";

const videoConstraints = {
  width: 1280,
  height: 960,
  facingMode: "user",
};

export const WebcamCapture = ({ numSegments = 6, useSplitSegments = true }) => {
  const canvasRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  useAnimationFrame(() => grabFrame());

  const grabFrame = () => {
    if (!canvasRef || !webcamRef) return;
    const frameCanvas = webcamRef.current.getCanvas();
    const screenCanvas = canvasRef.current;
    if (!frameCanvas || !screenCanvas) return;

    const coolCanvas = createKaleidoCanvas(
      frameCanvas,
      numSegments,
      useSplitSegments
    );
    screenCanvas.width = coolCanvas.width;
    screenCanvas.height = coolCanvas.height;

    const ctx = screenCanvas.getContext("2d");

    ctx.drawImage(coolCanvas, 0, 0);
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ display: "block" }} />

      <Webcam
        audio={false}
        width={videoConstraints.width}
        style={{ position: "fixed", left: -10000 }}
        ref={webcamRef}
        mirrored={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

function createKaleidoCanvas(img, numSegments, useSplitSegments) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = img.width;
  outCanvas.height = img.height;

  const angle = 360 / numSegments;
  const segHeight = videoConstraints.height / 2;

  const halfSideLength = segHeight * Math.tan(Math.PI / numSegments);
  const sideLength = halfSideLength * 2;

  const triCanvas = useSplitSegments
    ? drawSplitTriangleCanvas(img, sideLength, segHeight)
    : drawTriangleCanvas(img, sideLength, segHeight);

  const ctx = outCanvas.getContext("2d");
  // if half number of segments is an odd number the pointy bits
  // will stick out the sides so need to offset by the long triangle edge
  // otherwise offset by short triangle edge
  // const spokeLength = Math.sqrt(
  //   segHeight * segHeight + halfSideLength * halfSideLength
  // );
  const xOffset = 600; //(numSegments / 2) % 2 === 0 ? segHeight : spokeLength;

  for (let s = 0; s < numSegments; s++) {
    const isFlipped = s % 2 !== 0;
    drawSegment(ctx, triCanvas, s * angle, isFlipped, xOffset);
  }

  return outCanvas;
}

function drawTriangleCanvas(img, triW, triH) {
  const outCanvas = document.createElement("canvas");
  const halfTriWidth = triW / 2;

  // added size buffer to avoid gaps between triangles
  const buffer = 2;

  outCanvas.width = Math.ceil(triW + buffer);
  outCanvas.height = triH;

  const ctx = outCanvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(triW + buffer, 0);
  ctx.lineTo(halfTriWidth + buffer, triH);
  ctx.lineTo(halfTriWidth, triH);
  ctx.clip();

  // move image so centerX of webcam is in the centerX of triangle
  const imgX = (img.width - triW) / 2;
  ctx.drawImage(
    img,
    imgX,
    0,
    img.width,
    img.height,
    0,
    0,
    img.width,
    img.height
  );

  return outCanvas;
}

function drawSplitTriangleCanvas(img, triW, triH) {
  const halfCanvas = document.createElement("canvas");
  const outCanvas = document.createElement("canvas");

  // added size buffer to avoid gaps between triangles
  const buffer = 2;
  const halfTriWidth = triW / 2;

  halfCanvas.width = Math.ceil(halfTriWidth + buffer);
  halfCanvas.height = triH;
  outCanvas.width = Math.ceil(triW + buffer);
  outCanvas.height = triH;

  const ctx = halfCanvas.getContext("2d");
  ctx.beginPath();
  ctx.save();
  ctx.moveTo(0, 0);
  ctx.lineTo(halfTriWidth + buffer, 0);
  ctx.lineTo(halfTriWidth + buffer, triH);
  ctx.lineTo(halfTriWidth, triH);
  ctx.clip();
  // move image so centerX of webcam is in the centerX of triangle
  const imgX = (img.width - triW) / 2;
  ctx.drawImage(
    img,
    imgX,
    0,
    img.width,
    img.height,
    0,
    0,
    img.width,
    img.height
  );
  ctx.restore();

  const outCtx = outCanvas.getContext("2d");
  outCtx.drawImage(halfCanvas, 0, 0);
  outCtx.scale(-1, 1);
  outCtx.drawImage(halfCanvas, -(triW + buffer), 0);

  return outCanvas;
}

function drawSegment(ctx, img, rotation, flipped, spokeLength) {
  const x = img.width / 2;
  const y = img.height; // -1 removed slight gap between wedges
  let drawX = -x;
  const drawY = -y;

  ctx.save();
  ctx.translate(spokeLength, y);
  ctx.rotate(degToRad(rotation));
  if (flipped) {
    ctx.scale(-1, 1);
  }
  ctx.drawImage(img, drawX, drawY);
  ctx.restore();
}

function degToRad(d) {
  // Converts degrees to radians
  return d * 0.01745;
}
