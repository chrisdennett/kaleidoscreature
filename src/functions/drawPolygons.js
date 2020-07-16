import { drawSplitTriangleCanvas, drawTriangleCanvas } from "./drawTriangles";

export function drawPolygonCanvas(img, numSegments, useSplitSegments) {
  const outCanvas = document.createElement("canvas");

  const angle = 360 / numSegments;
  const segHeight = img.height;

  const halfSideLength = segHeight * Math.tan(Math.PI / numSegments);
  const sideLength = halfSideLength * 2;

  const triCanvas = useSplitSegments
    ? drawSplitTriangleCanvas(img, sideLength, segHeight)
    : drawTriangleCanvas(img, sideLength, segHeight);

  const ctx = outCanvas.getContext("2d");
  // if half number of segments is an odd number the pointy bits
  // will stick out the sides so need to offset by the long triangle edge
  // otherwise offset by short triangle edge
  const spokeLength = Math.sqrt(
    segHeight * segHeight + halfSideLength * halfSideLength
  );
  const halfWidth = (numSegments / 2) % 2 === 0 ? segHeight : spokeLength;
  const width = halfWidth * 2;

  outCanvas.width = width;
  outCanvas.height = segHeight * 2;

  for (let s = 0; s < numSegments; s++) {
    const isFlipped = s % 2 !== 0;
    drawSegment(ctx, triCanvas, s * angle, isFlipped, halfWidth);
  }

  return outCanvas;
}

function drawSegment(ctx, img, rotation, flipped, centerX) {
  const x = img.width / 2;
  const y = img.height; // -1 removed slight gap between wedges
  let drawX = -x;
  const drawY = -y;

  ctx.save();
  ctx.translate(centerX, y);
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
