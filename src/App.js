import React from "react";
import "./styles.css";
import { WebcamCapture } from "./WebcamCapture";

export default function App() {
  const [imgSrc, setImgSrc] = React.useState(null);

  const onCapture = (img) => {
    setImgSrc(img);
  };

  return (
    <div className="App">
      {imgSrc && <img src={imgSrc} alt={"web cam capture"} />}

      <WebcamCapture onCapture={onCapture} />
    </div>
  );
}
