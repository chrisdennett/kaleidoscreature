import React, { useState, useEffect } from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useKeyPress } from "./hooks/useKeyPress";

const maxPolyHeight = 960;
const minPolyHeight = 300;

export default function App() {
  const [showControls, setShowControls] = useState(false);
  const [polyHeight, setPolyHeight] = useLocalStorage("polyH", 400);
  const [yOffset, setYOffset] = useLocalStorage("yOffset", 0);
  const [xOffset, setXOffset] = useLocalStorage("xOffset", 0);
  const footPress = useKeyPress("h");

  useEffect(() => {
    if (footPress) {
      const polyHeightRounded = Math.round(polyHeight / 100) * 100;
      const newHeight =
        polyHeightRounded + 100 > maxPolyHeight
          ? minPolyHeight
          : polyHeightRounded + 100;

      setPolyHeight(newHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [footPress]);

  const onCanvasClick = () => {
    setShowControls(!showControls);
  };

  const onPolyHeightSliderChange = (e) => {
    setPolyHeight(e.target.value);
  };

  const onYOffsetSliderChange = (e) => {
    setYOffset(parseInt(e.target.value));
  };

  const onXOffsetSliderChange = (e) => {
    setXOffset(parseInt(e.target.value));
  };

  return (
    <div>
      {showControls && (
        <div style={{ position: "fixed" }}>
          <div>
            <input
              type="range"
              min={minPolyHeight}
              max={maxPolyHeight}
              step="2"
              value={polyHeight}
              onChange={onPolyHeightSliderChange}
            />
            {polyHeight}
          </div>
          <div>
            <input
              type="range"
              min="0"
              max={polyHeight * 2}
              step="1"
              value={yOffset}
              onChange={onYOffsetSliderChange}
            />
            {yOffset}
          </div>
          <div>
            <input
              type="range"
              min="0"
              max={polyHeight * 2}
              step="1"
              value={xOffset}
              onChange={onXOffsetSliderChange}
            />
            {xOffset}
          </div>
        </div>
      )}

      <WebcamCapture
        onClick={onCanvasClick}
        numSegments={6}
        useSplitSegments={true}
        polyHeight={polyHeight}
        yOffset={yOffset}
        xOffset={xOffset}
      />
    </div>
  );
}
