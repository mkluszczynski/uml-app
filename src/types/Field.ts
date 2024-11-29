// export type Field = {
//   visibility: "+" | "-" | "#";
//   name: string;
//   type: string;
// };

import { Visibility, VisibilityType } from "./Visibility";

export class Field {
  visibility: Visibility;
  name: string;
  type: string;

  constructor(visibility: VisibilityType, name: string, type: string) {
    this.visibility = new Visibility(visibility);
    this.name = name;
    this.type = type;
  }

  public toString(): string {
    return `${this.visibility.toString()} ${this.name}: ${this.type}`;
  }

  public toCode(): string {
    return `${this.visibility.toCode()} ${this.name}: ${this.type};`;
  }
}
