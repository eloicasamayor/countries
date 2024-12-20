import React, { useState, useEffect } from "react";
import { useControls, useTransformContext } from "react-zoom-pan-pinch";

export const MapControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  const context = useTransformContext();

  const [strokeWidth, setStrokeWidth] = useState(0.5);
  useEffect(() => {
    console.log("context", context.transformState);
  }, [context.transformState]);
  return (
    <div className="tools">
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
    </div>
  );
};
