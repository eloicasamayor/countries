import { useControls } from "react-zoom-pan-pinch";

type MapControlsProps = {
  isMaxScale: boolean;
  isMinScale: boolean;
  onZoomWithButtons: Function;
};

export const MapControls = ({
  isMaxScale,
  isMinScale,
  onZoomWithButtons,
}: MapControlsProps) => {
  const { zoomIn, zoomOut /* resetTransform */ } = useControls();
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
