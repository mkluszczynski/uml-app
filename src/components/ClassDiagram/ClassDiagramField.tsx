import { Field } from "@src/types/Field";
import { toUpperSnakeCase } from "@src/utils/string";
import { convertVisibilityToUML } from "@src/utils/UML";

export type ClassDiagramFieldProps = {
  field: Field;
} & React.ComponentProps<"div">;

export function ClassDiagramField(props: ClassDiagramFieldProps) {
  console.log(props.field);
  let name = props.field.name;
  if (props.field.isStatic) {
    name = toUpperSnakeCase(name);
  }

  return (
    <p {...props}>{`${convertVisibilityToUML(
      props.field.visibility
    )} ${name}: ${props.field.type}`}</p>
  );
}
