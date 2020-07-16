import React, { useState } from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [showControls, setShowControls] = useState(false);
  const [numSegments, setNumSegments] = useState(6);
  const [polyHeight, setPolyHeight] = useLocalStorage("polyH", 400);
  const [yOffset, setYOffset] = useLocalStorage("yOffset", 0);
  const [xOffset, setXOffset] = useLocalStorage("xOffset", 0);
  const [useSplitSegments, setUseSplitSegments] = useState(true);

  const incr = useSplitSegments ? 1 : 2;

  const increaseSegments = () => updateNumSegments(numSegments + incr);
  const decreaseSegments = () => updateNumSegments(numSegments - incr);

  const updateNumSegments = (value) => {
    let newValue = value >= 3 ? value : 3;

    setNumSegments(newValue);
  };

  const toggleUseSplitSegments = () => {
    let newValue = !useSplitSegments;

    // if going to a non-split setting don't allow an odd number of segments
    if (newValue === false && numSegments % 2 !== 0) {
      setNumSegments(numSegments + 1);
    }

    setUseSplitSegments(newValue);
  };

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
          <button onClick={decreaseSegments}>-</button>
          <button onClick={increaseSegments}>+</button>
          {numSegments}
          <button onClick={toggleUseSplitSegments}>
            toggle split segments
          </button>
          {useSplitSegments ? "True" : "False"}
          <div>
            <input
              type="range"
              min="100"
              max="1000"
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
        numSegments={numSegments}
        useSplitSegments={useSplitSegments}
        polyHeight={polyHeight}
        yOffset={yOffset}
        xOffset={xOffset}
      />
    </div>
  );
}
