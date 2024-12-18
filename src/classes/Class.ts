import { ClassDeclaration } from "ts-morph";
import { Field } from "src/types/Field";
import { Method } from "src/types/Method";
import { DiagramSubject } from "./abstract/DiagramSubject";
import { removeDuplicates } from "@src/utils/array";

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

  getImplementations(): string[] {
    return (
      this.subjectDeclaration?.getImplements().map((i) => i.getText()) || []
    );
  }

  getExtends(): string | null {
    return this.subjectDeclaration?.getExtends()?.getText() || null;
  }

  getDependencies(): string[] {
    const returnedDependencies = this.getMethods()
      .filter(
        (m) => !["string", "number", "boolean", "void"].includes(m.returnType)
      )
      .map((m) => m.returnType);

    const parametersDependencies = this.getMethods()
      .map((m) => {
        return m.parameters.filter(
          (p) => !["string", "number", "boolean"].includes(p.type)
        );
      })
      .map((p) => p.map((p) => p.type))
      .flat();

    return removeDuplicates([
      ...returnedDependencies,
      ...parametersDependencies,
    ]);
  }

  getAssociations(): string[] {
    return this.getFields()
      .filter((f) => !["string", "number", "boolean"].includes(f.type))
      .map((f) => f.type);
  }

  updateFromCode(code: string) {
    const fileLength = this.file.getText().length;
    const node = this.file.replaceText([0, fileLength], code);
    const classDeclaration = node.getClass(this.getName());
    this.subjectDeclaration = classDeclaration || null;
    this.notify();

    console.log("Class", this.getName(), this.getFields(), this.getMethods());
    console.log("Implements", this.getImplementations());
    console.log("Extends", this.getExtends());
    console.log("Dependencies", this.getDependencies());
    console.log("Associations", this.getAssociations());
  }
}
