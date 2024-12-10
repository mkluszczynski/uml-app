import { Class } from "src/classes/Class";
import { Separator } from "./Separator";
import { Draggable } from "@lib/Draggable";
import { Position } from "src/types/Position";
import { useReactiveClass } from "../hooks/useReactiveClass";

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
            {props.class.getUMLFields().map((field, index) => (
              <p
                key={index}
              >{`${field.visibility} ${field.name}: ${field.type}`}</p>
            ))}
          </div>
          <Separator />
          <div className="p-1">
            {props.class.getUMLMethods().map((method, index) => (
              <p key={index}>{`${method.visibility} ${
                method.name
              } (${method.parameters
                .map((p) => `${p.name}: ${p.type}`)
                .join(", ")}): ${method.returnType}`}</p>
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
