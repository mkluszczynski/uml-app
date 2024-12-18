import { Method } from "@src/types/Method";

export type InterfaceDiagramMethodProps = {
  method: Method;
} & React.ComponentProps<"div">;
export function InterfaceDiagramMethod(props: InterfaceDiagramMethodProps) {
  return (
    <p {...props}>{`${props.method.visibility} ${
      props.method.name
    } (${props.method.parameters
      .map((p) => `${p.name}: ${p.type}`)
      .join(", ")}): ${props.method.returnType}`}</p>
  );
}
