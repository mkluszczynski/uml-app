import { Class } from "src/classes/Class";
import { Separator } from "../Separator";
import { Draggable } from "@lib/components/Draggable";
import { Position } from "src/types/Position";
import { useReactiveClass } from "../../hooks/useReactiveClass";
import { ClassDiagramField } from "./ClassDiagramField";
import { ClassDiagramMethod } from "./ClassDiagramMethod";

export type ClassDiagramProps = {
  class: Class;
  position: Position;
} & React.ComponentProps<"div">;

export function ClassDiagram(props: ClassDiagramProps) {
  useReactiveClass(props.class);

  return (
    <Draggable position={props.position}>
      <div className="flex flex-col border border-black select-none bg-white">
        <div className="p-1 bg-blue-400">{props.class.getName()}</div>
        <div>
          <div className="p-1">
            {props.class.getFields().map((field, index) => (
              <ClassDiagramField key={index} field={field} />
            ))}
          </div>
          <Separator />
          <div className="p-1">
            {props.class.getMethods().map((method, index) => (
              <ClassDiagramMethod key={index} method={method} />
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
