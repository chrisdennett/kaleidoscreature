import React from "react";
import Webcam from "react-webcam";
import { useAnimationFrame } from "./hooks/useAnimationFrame";
import { drawPolygonCanvas } from "./functions/drawPolygons";
import { drawTiledHexagonCanvas } from "./functions/drawTiledHexagons";

const videoConstraints = {
  width: 1024,
  height: 768,
  facingMode: "user",
};

export const WebcamCapture = ({
  numSegments = 6,
  polyHeight,
  yOffset,
  xOffset,
  useSplitSegments = true,
  onClick,
}) => {
  const canvasRef = React.useRef(null);
  const webcamRef = React.useRef(null);
  useAnimationFrame(() => grabFrame());

  const grabFrame = () => {
    if (!canvasRef || !webcamRef) return;
    const frameCanvas = webcamRef.current.getCanvas();
    const screenCanvas = canvasRef.current;
    if (!frameCanvas || !screenCanvas) return;

    const kaleidCanvas = drawPolygonCanvas(
      frameCanvas,
      numSegments,
      useSplitSegments
    );

    screenCanvas.width = window.innerWidth;
    screenCanvas.height = window.innerHeight;

    const rectCanvas = drawTiledHexagonCanvas(kaleidCanvas, polyHeight);

    // tile
    const totalHeight = yOffset + window.innerHeight;
    const totalWidth = xOffset + window.innerWidth;

    const ctx = screenCanvas.getContext("2d");
    const cols = Math.ceil(totalWidth / rectCanvas.width);
    const rows = Math.ceil(totalHeight / rectCanvas.height);

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        ctx.drawImage(
          rectCanvas,
          c * rectCanvas.width - 2 - xOffset,
          r * rectCanvas.height - 2 - yOffset
        );
      }
    }
  };

  return (
    <div onClick={onClick}>
      <canvas ref={canvasRef} style={{ display: "block" }} />

      {/* HIDDEN */}
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
