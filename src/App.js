import React from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";

export default function App() {
  const [numSegments, setNumSegments] = React.useState(12);

  const increaseSegments = () => setNumSegments(numSegments + 2);
  const decreaseSegments = () => setNumSegments(numSegments - 2);

  return (
    <div className="App">
      <div>
        <button onClick={decreaseSegments}>-</button>
        <button onClick={increaseSegments}>+</button>
        {numSegments}
      </div>
      <WebcamCapture numSegments={numSegments} />
    </div>
  );
}
