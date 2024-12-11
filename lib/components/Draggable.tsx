import { useEffect, useRef } from "react";
import { Position } from "src/types/Position";

export type DraggableProps = {
  position?: Position;
  headerref?: React.RefObject<HTMLDivElement>;
} & React.ComponentProps<"div">;

export function Draggable(props: DraggableProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const mainRef = props.headerref || elementRef;

  let startX = props.position?.x || 0;
  let startY = props.position?.y || 0;

  let clickX = 0;
  let clickY = 0;
  let offsetLeft = 0;
  let offsetTop = 0;

  const onMouseDown = (e: MouseEvent) => {
    clickX = e.clientX;
    clickY = e.clientY;

    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", onMouseMove);

    changeCursorToGrabbing();
  };

  const onMouseMove = (e: MouseEvent) => {
    offsetLeft = clickX - e.clientX;
    offsetTop = clickY - e.clientY;
    clickX = e.clientX;
    clickY = e.clientY;

    elementRef.current?.style.setProperty(
      "left",
      `${elementRef.current?.offsetLeft - offsetLeft}px`
    );
    elementRef.current?.style.setProperty(
      "top",
      `${elementRef.current?.offsetTop - offsetTop}px`
    );
  };

  const closeDragElement = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", closeDragElement);

    changeCursorToGrab();
  };

  const changeCursorToGrabbing = () => {
    mainRef.current?.style.setProperty("cursor", "grabbing");
  };

  const changeCursorToGrab = () => {
    mainRef.current?.style.setProperty("cursor", "grab");
  };

  useEffect(() => {
    mainRef.current?.addEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div
      ref={elementRef}
      style={{ left: startX, top: startY }}
      className="absolute cursor-grab"
      {...props}
    ></div>
  );
}
