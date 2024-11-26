import { useEffect, useRef, useState } from "react";
import { Separator } from "./Separator";

export type ClassDiagramProps = {} & React.ComponentProps<"div">;

export function ClassDiagram(props: ClassDiagramProps) {

  const elementRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  let clickX = 0;
  let clickY = 0;
  let offsetLeft = 0;
  let offsetTop = 0;

  const onMouseClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    clickX = e.clientX;
    clickY = e.clientY;
    elementRef.current?.addEventListener("mousemove", onMouseMove);
    elementRef.current?.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mouseup", closeDragElement);
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
    elementRef.current?.removeEventListener("mousemove", onMouseMove);
    elementRef.current?.removeEventListener("mouseup", closeDragElement);
  }

  return (
    <div {...props} className="flex flex-col border border-black absolute cursor-move" onMouseDown={onMouseClick} ref={elementRef}>
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
