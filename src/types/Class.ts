import { Field } from "./Field";
import { Method } from "./Method";

// export type Class = {
//   name: string;
//   fields: Field[];
//   methods: Method[];
//   isAbstract: boolean;
// };

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
}
