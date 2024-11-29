import { Class } from "src/types/Class";
import { Separator } from "./Separator";
import { Draggable } from "@lib/Draggable";
import { Position } from "src/types/Position";

export type ClassDiagramProps = {
  class: Class;
  position: Position;
} & React.ComponentProps<"div">;

export function ClassDiagram(props: ClassDiagramProps) {
  return (
    <Draggable className="absolute cursor-grab" position={props.position}>
      <div className="flex flex-col border border-black select-none bg-white">
        <div className="p-1 bg-blue-400">{props.class.name}</div>
        <div>
          <div className="p-1">
            {props.class.fields.map((field, index) => (
              <p key={index}>
                {field.visibility} {field.name}: {field.type}
              </p>
            ))}
          </div>
          <Separator />
          <div className="p-1">
            {props.class.methods.map((method, index) => (
              <p key={index}>
                {method.visibility} {method.name}(): {method.returnType}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
