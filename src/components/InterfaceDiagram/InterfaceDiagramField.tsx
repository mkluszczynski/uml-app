import { Field } from "@src/types/Field";
import React from "react";

export type InterfaceDiagramFieldProps = {
  field: Field;
} & React.ComponentProps<"div">;

export function InterfaceDiagramField(props: InterfaceDiagramFieldProps) {
  return (
    <p
      {...props}
    >{`${props.field.visibility} ${props.field.name}: ${props.field.type}`}</p>
  );
}
