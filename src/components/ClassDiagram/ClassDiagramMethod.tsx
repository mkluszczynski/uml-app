import { Method } from "@src/types/Method";
import { toUpperSnakeCase } from "@src/utils/string";
import { convertVisibilityToUML } from "@src/utils/UML";

export type ClassDiagramMethodProps = {
  method: Method;
} & React.ComponentProps<"div">;

export function ClassDiagramMethod(props: ClassDiagramMethodProps) {
  let name = props.method.name;
  if (props.method.isStatic) name = toUpperSnakeCase(name);

  return (
    <p {...props}>{`${convertVisibilityToUML(
      props.method.visibility
    )} ${name} (${props.method.parameters
      .map((p) => `${p.name}: ${p.type}`)
      .join(", ")}): ${props.method.returnType}`}</p>
  );
}
