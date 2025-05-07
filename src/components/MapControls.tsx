import { useEffect } from "react";
import { useControls } from "react-zoom-pan-pinch";
import { Button } from "./ui/button";

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
      countryPath = mapRef?.current?.querySelector(`[id="${selectedCountry}"]`);
    }

    zoomToElement(countryPath);
  }, [selectedCountry]);

  return (
    <div className="tools absolute z-30 bottom-0 right-0 flex flex-col mr-2 mb-2">
      <Button
        className="h-9 w-9"
        variant={"outline"}
        disabled={isMaxScale}
        onClick={() => {
          zoomIn();
          onZoomWithButtons();
        }}
      >
        +
      </Button>
      <Button
        className="h-9 w-9"
        variant={"outline"}
        disabled={isMinScale}
        onClick={() => {
          zoomOut();
          onZoomWithButtons();
        }}
      >
        -
      </Button>
      {/* <button onClick={() => resetTransform()}>x</button> */}
    </div>
  );
};
