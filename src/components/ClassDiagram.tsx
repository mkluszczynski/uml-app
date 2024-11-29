import { useEffect, useRef, useState } from "react";
import { Separator } from "./Separator";

export type ClassDiagramProps = {} & React.ComponentProps<"div">;

export function ClassDiagram(props: ClassDiagramProps) {

  const elementRef = useRef<HTMLDivElement>(null);

  let clickX = 0;
  let clickY = 0;
  let offsetLeft = 0;
  let offsetTop = 0;

  const onMouseDown = (e: React.MouseEvent<Element, MouseEvent>) => {
    clickX = e.clientX;
    clickY = e.clientY;

    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", onMouseMove);

    changeCursorToGrabbing();
  }

  const onMouseMove = (e: MouseEvent) => {
    if(elementRef.current){
      console.log(elementRef.current?.offsetLeft - e.clientX);
      console.log(elementRef.current?.offsetTop - e.clientY);
    }
    offsetLeft = clickX - e.clientX;
    offsetTop = clickY - e.clientY;
    clickX = e.clientX;
    clickY = e.clientY;

    elementRef.current?.style.setProperty("left", `${elementRef.current?.offsetLeft - offsetLeft}px`);
    elementRef.current?.style.setProperty("top", `${elementRef.current?.offsetTop - offsetTop}px`);
  }
  
  const closeDragElement = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", closeDragElement);

    changeCursorToGrab();
  }

  const changeCursorToGrabbing = () => {
    elementRef.current?.style.setProperty("cursor", "grabbing");
  }

  const changeCursorToGrab = () => {
    elementRef.current?.style.setProperty("cursor", "grab");
  }

  return (
    <div {...props} className="flex flex-col border border-black absolute cursor-grab select-none" onMouseDown={onMouseDown} ref={elementRef}>
      <div className="p-1 bg-blue-400">Class name</div>
      <div>
        <div className="p-1">
          <p>+ public field: string</p>
          <p>- private field: string</p>
          <p># protected field: string </p>
        </div>
        <Separator />
        <div className="p-1">
          <p>+ public method(): void</p>
          <p>- private method(): void</p>
          <p># protected method(): void</p>
        </div>
      </div>
    </div>
  );
}
