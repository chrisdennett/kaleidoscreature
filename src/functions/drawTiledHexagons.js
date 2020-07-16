export function drawTiledHexagonCanvas(sourceCanvas, polyHeight) {
  const outCanvas = document.createElement("canvas");
  const overlap = 0.75;

  const heightToWidthRatio = sourceCanvas.width / sourceCanvas.height;
  const polyWidth = polyHeight * heightToWidthRatio;

  // half a poly either side with a quarter overlap
  outCanvas.width = polyWidth * 1.5 - 2 * overlap;
  outCanvas.height = polyHeight - overlap;
  const ctx = outCanvas.getContext("2d");

  const polyHalfWidth = polyWidth / 2;
  const polyHalfHeight = polyHeight / 2;
  const polyQuarterWidth = polyHalfWidth / 2;

  const hOffset = polyHalfWidth - polyQuarterWidth;
  const vOffset = polyHalfHeight;

  // top left
  drawToCanvas(
    sourceCanvas,
    ctx,
    -polyHalfWidth,
    -polyHalfHeight,
    polyWidth,
    polyHeight
  );

  // bottom left
  drawToCanvas(
    sourceCanvas,
    ctx,
    -polyHalfWidth,
    polyHalfHeight - overlap,
    polyWidth,
    polyHeight
  );
  // middle
  drawToCanvas(sourceCanvas, ctx, hOffset - overlap, 0, polyWidth, polyHeight);
  // top right
  drawToCanvas(
    sourceCanvas,
    ctx,
    polyWidth - overlap * 2,
    -vOffset,
    polyWidth,
    polyHeight
  );
  // bottom right
  drawToCanvas(
    sourceCanvas,
    ctx,
    polyWidth - overlap * 2,
    vOffset - overlap,
    polyWidth,
    polyHeight
  );
  return outCanvas;
}

function drawToCanvas(sourceCanvas, ctx, x, y, w, h) {
  ctx.drawImage(
    sourceCanvas,
    0,
    0,
    sourceCanvas.width,
    sourceCanvas.height,
    x,
    y,
    w,
    h
  );
}
