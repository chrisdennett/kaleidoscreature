import React from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";

export default function App() {
  const [numSegments, setNumSegments] = React.useState(6);
  const [useSplitSegments, setUseSplitSegments] = React.useState(true);

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

  return (
    <div className="App">
      <div style={{ position: "fixed" }}>
        <button onClick={decreaseSegments}>-</button>
        <button onClick={increaseSegments}>+</button>
        {numSegments}
        <button onClick={toggleUseSplitSegments}>toggle split segments</button>
        {useSplitSegments ? "True" : "False"}
      </div>
      <WebcamCapture
        numSegments={numSegments}
        useSplitSegments={useSplitSegments}
      />
    </div>
  );
}
