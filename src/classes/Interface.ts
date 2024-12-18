import { InterfaceDeclaration } from "ts-morph";
import { Method } from "src/types/Method";
import { Field } from "@src/types/Field";
import { DiagramSubject } from "./abstract/DiagramSubject";

export class Interface extends DiagramSubject<InterfaceDeclaration> {
  initDeclaration() {
    this.subjectDeclaration = this.file.addInterface({
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
        readonly: prop.isReadonly(),
        value: prop.getInitializer()?.getText() || "",
      };
    });
  }

  getMethods(): Method[] {
    if (!this.subjectDeclaration) return [];
    return this.subjectDeclaration.getMethods().map((method) => {
      return {
        visibility: "",
        name: method.getName(),
        returnType: method.getReturnType().getText(),
        parameters: method.getParameters().map((param) => {
          return {
            name: param.getName(),
            type: param.getType().getText(),
          };
        }),
      };
    });
  }

  getCode(): string {
    return this.file.getText();
  }

  updateFromCode(code: string) {
    const fileLength = this.file.getText().length;
    const node = this.file.replaceText([0, fileLength], code);
    const interfaceDeclaration = node.getInterface(this.getName());
    this.subjectDeclaration = interfaceDeclaration || null;
    this.notify();
    console.log(
      "Interface",
      this.getName(),
      this.getFields(),
      this.getMethods()
    );
  }
}
