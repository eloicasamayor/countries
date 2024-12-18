import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import svg from "../assets/world.svg";
export const ZoomWrapper = () => {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img src={svg} />
      </TransformComponent>
    </TransformWrapper>
  );
};
