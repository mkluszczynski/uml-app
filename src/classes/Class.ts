import { ClassDeclaration } from "ts-morph";
import { Field } from "src/types/Field";
import { Method } from "src/types/Method";
import { DiagramSubject } from "./abstract/DiagramSubject";

export class Class extends DiagramSubject<ClassDeclaration> {
  initDeclaration(): void {
    this.subjectDeclaration = this.file.addClass({
      name: this.getName(),
      methods: [],
      properties: [],
    });
  }

  getFields(): Field[] {
    if (!this.subjectDeclaration) return [];
    return this.subjectDeclaration.getProperties().map((prop) => {
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
    if (!this.subjectDeclaration) return [];
    return this.subjectDeclaration.getMethods().map((method) => {
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

  updateFromCode(code: string) {
    const fileLength = this.file.getText().length;
    const node = this.file.replaceText([0, fileLength], code);
    const classDeclaration = node.getClass(this.getName());
    this.subjectDeclaration = classDeclaration || null;
    this.notify();
    console.log("Class", this.getName(), this.getFields(), this.getMethods());
  }
}
