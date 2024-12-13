import { Class as Interface } from "src/classes/Class";
import { Separator } from "./Separator";
import { Draggable } from "@lib/components/Draggable";
import { Position } from "src/types/Position";
import { useReactiveClass } from "../hooks/useReactiveClass";
import { toUpperSnakeCase } from "../utils/string";
import { convertVisibilityToUML } from "../utils/UML";

export type InterfaceDiagramProps = {
  interface: Interface;
  position: Position;
} & React.ComponentProps<"div">;

export function InterfaceDiagram(props: InterfaceDiagramProps) {
  useReactiveClass(props.interface);

  return (
    <Draggable position={props.position}>
      <div className="flex flex-col border border-black select-none bg-white">
        <div className="p-1 bg-blue-400">{props.interface.getName()}</div>
        <div>
          <div className="p-1">
            {props.interface.getFields().map((field, index) => {
              return (
                <p
                  key={index}
                >{`${field.visibility} ${field.name}: ${field.type}`}</p>
              );
            })}
          </div>
          <Separator />
          <div className="p-1">
            {props.interface.getMethods().map((method, index) => {
              if (method.isStatic)
                return (
                  <p key={index}>{`${convertVisibilityToUML(
                    method.visibility
                  )} ${toUpperSnakeCase(method.name)} (${method.parameters
                    .map((p) => `${p.name}: ${p.type}`)
                    .join(", ")}): ${method.returnType}`}</p>
                );
              return (
                <p key={index}>{`${method.visibility} ${
                  method.name
                } (${method.parameters
                  .map((p) => `${p.name}: ${p.type}`)
                  .join(", ")}): ${method.returnType}`}</p>
              );
            })}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
