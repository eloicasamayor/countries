import { useEffect } from "react";
import { useControls } from "react-zoom-pan-pinch";

type MapControlsProps = {
  isMaxScale: boolean;
  isMinScale: boolean;
  onZoomWithButtons: Function;
  zoomToElement: Function;
  selectedCountry: string;
  mapRef: React.RefObject<HTMLElement>;
};

export const MapControls = ({
  isMaxScale,
  isMinScale,
  onZoomWithButtons,
  zoomToElement,
  selectedCountry,
  mapRef,
}: MapControlsProps) => {
  const { zoomIn, zoomOut /* resetTransform */ } = useControls();
  useEffect(() => {
    if (!mapRef?.current) {
      return;
    }
    let countryPath;
    if (!selectedCountry) {
      countryPath = mapRef?.current;
    } else {
      countryPath = mapRef?.current?.querySelector(
        `[title="${selectedCountry}"]`
      );
    }

    zoomToElement(countryPath);
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
