import { useEffect } from "react";
import { ReactZoomPanPinchRef, useControls } from "react-zoom-pan-pinch";

type MapControlsProps = {
  isMaxScale: boolean;
  isMinScale: boolean;
  onZoomWithButtons: Function;
  zoomToElement: Function;
  selectedCountry: string;
  wrapperRef: React.Ref<ReactZoomPanPinchRef>;
};

export const MapControls = ({
  isMaxScale,
  isMinScale,
  onZoomWithButtons,
  zoomToElement,
  selectedCountry,
  wrapperRef,
}: MapControlsProps) => {
  const { zoomIn, zoomOut /* resetTransform */ } = useControls();
  useEffect(() => {
    const countryPath = wrapperRef?.current?.querySelector(
      `[title="${selectedCountry}"]`
    );
    zoomToElement(countryPath);
    //(node: HTMLElement | string, scale?: number, animationTime?: number, animationType?: keyof typeof animations) => void;
  }, [selectedCountry]);
  return (
    <div className="tools">
      <button
        disabled={isMaxScale}
        onClick={() => {
          zoomIn();
          onZoomWithButtons();
        }}
      >
        +
      </button>
      <button
        disabled={isMinScale}
        onClick={() => {
          zoomOut();
          onZoomWithButtons();
        }}
      >
        -
      </button>
      {/* <button onClick={() => resetTransform()}>x</button> */}
    </div>
  );
};
