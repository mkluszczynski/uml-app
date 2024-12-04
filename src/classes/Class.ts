import { Field } from "./Field";
import { Method } from "./Method";

export class Class {
  name: string;
  fields: Field[];
  methods: Method[];
  isAbstract: boolean;

  constructor(
    name: string,
    fields: Field[],
    methods: Method[],
    isAbstract: boolean
  ) {
    this.name = name;
    this.fields = fields;
    this.methods = methods;
    this.isAbstract = isAbstract;
  }

  public toCode(): string {
    return `class ${this.name} ${
      this.isAbstract ? "abstract" : ""
    } {\n${this.fields
      .map((field) => `  ${field.toCode()}`)
      .join("\n")}\n\n${this.methods
      .map((method) => `  ${method.toCode()}`)
      .join("\n")}\n}`;
  }

  public updateFromCode(code: string): void {
    const classNameMatch = code.match(/class\s+(\w+)/);
    this.name = classNameMatch ? classNameMatch[1] : "";

    const fieldPattern = /(?:public|private|protected)?\s+(\w+):\s+(\w+);/g;
    const fields: Field[] = [];
    let fieldMatch;

    while ((fieldMatch = fieldPattern.exec(code)) !== null) {
      const field = Field.fromCode(fieldMatch[0]);
      if (field) fields.push(field);
    }

    this.fields = fields;

    const methodPattern =
      /(?:public|private|protected)?\s+(\w+)\(([^)]*)\):\s+(\w+);/g;
    const methods: Method[] = [];
    let methodMatch;

    while ((methodMatch = methodPattern.exec(code)) !== null) {
      const args = methodMatch[2]
        .split(",")
        .map((arg) => arg.trim())
        .map((arg) => {
          const [type, name] = arg.split(" ");
          return { type, name };
        });

      const method = Method.fromCode(
        `${methodMatch[1]}(${args}): ${methodMatch[3]}`
      );
      if (method) methods.push(method);
    }

    this.methods = methods;
    console.log("Updated Class:", this);
  }

  public static fromCode(code: string): Class {
    const classNameMatch = code.match(/class\s+(\w+)/);
    const className = classNameMatch ? classNameMatch[1] : "";

    const fieldPattern = /(?:public|private|protected)?\s+(\w+):\s+(\w+);/g;
    const fields: Field[] = [];
    let fieldMatch;

    while ((fieldMatch = fieldPattern.exec(code)) !== null) {
      const field = Field.fromCode(fieldMatch[0]);
      if (field) fields.push(field);
    }

    const methodPattern =
      /(?:public|private|protected)?\s+(\w+)\(([^)]*)\):\s+(\w+);/g;
    const methods: Method[] = [];
    let methodMatch;

    while ((methodMatch = methodPattern.exec(code)) !== null) {
      const args = methodMatch[2]
        .split(",")
        .map((arg) => arg.trim())
        .map((arg) => {
          const [type, name] = arg.split(" ");
          return { type, name };
        });

      const method = Method.fromCode(
        `${methodMatch[1]}(${args}): ${methodMatch[3]}`
      );
      if (method) methods.push(method);
    }

    return new Class(className, fields, methods, false);
  }
}
