import { Separator } from "../Separator";
import { Draggable } from "@lib/components/Draggable";
import { Position } from "src/types/Position";
import { useReactiveClass } from "../../hooks/useReactiveClass";
import { InterfaceDiagramField } from "./InterfaceDiagramField";
import { InterfaceDiagramMethod } from "./InterfaceDiagramMethod";
import { Interface } from "@src/classes/Interface";

export type InterfaceDiagramProps = {
  interface: Interface;
  position: Position;
} & React.ComponentProps<"div">;

export function InterfaceDiagram(props: InterfaceDiagramProps) {
  useReactiveClass(props.interface);

  return (
    <Draggable position={props.position}>
      <div className="flex flex-col border border-black select-none bg-white">
        <div className="p-1 bg-blue-400">{`<< ${props.interface.getName()} >>`}</div>
        <div>
          <div className="p-1">
            {props.interface.getFields().map((field, index) => (
              <InterfaceDiagramField key={index} field={field} />
            ))}
          </div>
          <Separator />
          <div className="p-1">
            {props.interface.getMethods().map((method, index) => (
              <InterfaceDiagramMethod key={index} method={method} />
            ))}
          </div>
        </div>
      </div>
    </Draggable>
  );
}
