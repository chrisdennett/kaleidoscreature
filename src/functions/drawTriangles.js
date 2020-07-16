export function drawTriangleCanvas(img, triW, triH) {
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

export function drawSplitTriangleCanvas(img, triW, triH) {
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
