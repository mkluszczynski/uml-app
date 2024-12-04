import { Parameter } from "src/types/Parameter";
import { Visibility, VisibilityType } from "./Visibility";

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

  static fromString(methodString: string): Method {
    const [visibility, name, params, returnType] = methodString.split(" ");
    const parameters = params
      .substring(1, params.length - 1)
      .split(",")
      .map((param) => {
        const [type, name] = param.split(":");
        return { type, name };
      });

    return new Method(
      visibility as VisibilityType,
      name,
      returnType,
      parameters
    );
  }

  static fromCode(methodCode: string): Method | null {
    console.log(methodCode);
    const methodPattern =
      /(?:public|private|protected)?\s+(\w+)\(([^)]*)\):\s+(\w+);/;
    const methodMatch = methodCode.match(methodPattern);

    if (!methodMatch) {
      return null;
    }

    const [, visibility, params, returnType] = methodMatch;
    const parameters = params.split(",").map((param) => {
      const [type, name] = param.split(":");
      return { type: type.trim(), name: name.trim() };
    });

    return new Method(visibility as VisibilityType, "", returnType, parameters);
  }
}
