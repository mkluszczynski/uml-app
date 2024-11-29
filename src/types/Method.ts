// export type Method = {
//   visibility: "+" | "-" | "#";
//   name: string;
//   returnType: string;
//   parameters: Parameter[];
// };

import { Visibility, VisibilityType } from "./Visibility";

export type Parameter = {
  name: string;
  type: string;
};

export class Method {
  visibility: Visibility;
  name: string;
  returnType: string;
  parameters: Parameter[];

  constructor(
    visibility: VisibilityType,
    name: string,
    returnType: string,
    parameters: Parameter[]
  ) {
    this.visibility = new Visibility(visibility);
    this.name = name;
    this.returnType = returnType;
    this.parameters = parameters;
  }

  toString(): string {
    return `${this.visibility.toString()} ${this.name}(${this.parameters
      .map((param) => `${param.name}: ${param.type}`)
      .join(", ")}): ${this.returnType}`;
  }

  toCode(): string {
    return `${this.visibility.toCode()} ${this.name}(${this.parameters
      .map((param) => `${param.name}: ${param.type}`)
      .join(", ")}): ${this.returnType};`;
  }
}
