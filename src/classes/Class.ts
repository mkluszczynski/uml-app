import React from "react";
import { Field } from "./Field";
import { Method } from "./Method";
import { ReactiveClass } from "@lib/classes/ReactiveClass";

export class Class extends ReactiveClass {
  public name: string;
  public fields: Field[];
  public methods: Method[];
  public isAbstract: boolean;

  constructor(
    name: string,
    fields: Field[],
    methods: Method[],
    isAbstract: boolean
  ) {
    super();
    this.name = name;
    this.fields = fields;
    this.methods = methods;
    this.isAbstract = isAbstract;
  }

  public setName(name: string) {
    this.name = name;
    this.notify();
  }

  public setFields(fields: Field[]) {
    this.fields = fields;
    this.notify();
  }

  public setMethods(methods: Method[]) {
    this.methods = methods;
    this.notify();
    console.log("Methods", this.methods);
  }

  public toCode(): string {
    this.notify();
    return `class ${this.name} ${
      this.isAbstract ? "abstract" : ""
    } {\n${this.fields
      .map((field) => `  ${field.toCode()}`)
      .join("\n")}\n\n${this.methods
      .map((method) => `  ${method.toCode()}`)
      .join("\n")}\n}`;
  }
}
