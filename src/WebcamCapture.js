import React from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "./hooks/useAnimationFrame";

const videoConstraints = {
  width: 1280,
  height: 960,
  facingMode: "user",
};

export const WebcamCapture = () => {
  const canvasRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  useAnimationFrame(() => grabFrame());

  const grabFrame = () => {
    if (!canvasRef || !webcamRef) return;
    const frameCanvas = webcamRef.current.getCanvas();
    const screenCanvas = canvasRef.current;
    if (!frameCanvas || !screenCanvas) return;

    const coolCanvas = createCoolCanvas(frameCanvas);
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

function createCoolCanvas(img) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = img.width;
  outCanvas.height = img.height;

  const triCanvas = drawTriangleCanvas(img, 400, 900);

  const ctx = outCanvas.getContext("2d");
  ctx.drawImage(triCanvas, 0, 0);
  ctx.drawImage(triCanvas, 400, 0);
  ctx.drawImage(triCanvas, 800, 0);

  return outCanvas;
}

function drawTriangleCanvas(img, triW, triH) {
  const outCanvas = document.createElement("canvas");
  outCanvas.width = triW;
  outCanvas.height = triH;

  const halfTriWidth = triW / 2;
  const halfImgWidth = img.width / 2;

  const ctx = outCanvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(triW, 0);
  ctx.lineTo(halfTriWidth, triH);
  ctx.clip();

  // move image so centerX of webcam is in the centerX of triangle
  const imgX = (img.width - triW) / 2;

  //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
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

function drawTriangle(ctx, img) {
  ctx.save();
  // ctx.translate(img.width / 2, img.height)
  // ctx.rotate(degToRad(0));
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(img.width, 0);
  ctx.lineTo(img.width / 2, img.height);
  ctx.clip();
  //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
  ctx.restore();
}

function degToRad(d) {
  // Converts degrees to radians
  return d * 0.01745;
}
