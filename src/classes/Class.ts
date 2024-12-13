import { ReactiveClass } from "@lib/classes/ReactiveClass";
import { ClassDeclaration, SourceFile } from "ts-morph";
import { Field } from "src/types/Field";
import { Method } from "src/types/Method";

export class Class extends ReactiveClass {
  private file: SourceFile;
  private classDeclaration: ClassDeclaration | null;
  private className: string;

  constructor(name: string, file: SourceFile) {
    super();
    this.className = name;
    this.file = file;
    this.classDeclaration = this.file.addClass({
      name: name,
      methods: [],
      properties: [],
    });
  }

  getName(): string {
    return this.className;
  }

  getFields(): Field[] {
    if (!this.classDeclaration) return [];
    return this.classDeclaration.getProperties().map((prop) => {
      return {
        name: prop.getName(),
        type: prop.getType().getText(),
        visibility: prop
          .getModifiers()
          .map((mod) => mod.getText())
          .join(" "),
        isStatic: prop.isStatic(),
        readonly: prop.isReadonly(),
        value: prop.getInitializer()?.getText() || "",
      };
    });
  }

  getMethods(): Method[] {
    if (!this.classDeclaration) return [];
    return this.classDeclaration.getMethods().map((method) => {
      return {
        visibility: method
          .getModifiers()
          .map((mod) => mod.getText())
          .join(" "),
        name: method.getName(),
        returnType: method.getReturnType().getText(),
        parameters: method.getParameters().map((param) => {
          return {
            name: param.getName(),
            type: param.getType().getText(),
          };
        }),
        isStatic: method.isStatic(),
      };
    });
  }

  getCode(): string {
    return this.file.getText();
  }

  updateFromCode(code: string) {
    const node = this.file.insertText(0, code);
    const classDeclaration = node.getClass(this.getName());
    this.classDeclaration = classDeclaration || null;
    this.notify();
    console.log("Class", this.getName(), this.getFields(), this.getMethods());
  }
}
