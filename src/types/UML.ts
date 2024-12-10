//uni ing

import { MethodParameter } from "./Method";

export type UMLVisibility = "+" | "-" | "#";

export type UMLField = {
  name: string;
  type: string;
  visibility: UMLVisibility;
  isStatic: boolean;
};

export type UMLMethod = {
  visibility: UMLVisibility;
  name: string;
  returnType: string;
  parameters: MethodParameter[];
  isStatic: boolean;
};
