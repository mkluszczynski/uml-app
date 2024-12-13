import { ReactiveClass } from "@lib/classes/ReactiveClass";
import { InterfaceDeclaration, SourceFile } from "ts-morph";
import { Method } from "src/types/Method";
import { Field } from "@src/types/Field";

export class Interface extends ReactiveClass {
  private file: SourceFile;
  private interfaceDeclaration: InterfaceDeclaration | null;
  private interfaceName: string;

  constructor(name: string, file: SourceFile) {
    super();
    this.interfaceName = name;
    this.file = file;
    this.interfaceDeclaration = this.file.addInterface({
      name: name,
      methods: [],
      properties: [],
    });
  }

  getName(): string {
    return this.interfaceName;
  }

  getFields(): Field[] {
    if (!this.interfaceDeclaration) return [];
    return this.interfaceDeclaration.getProperties().map((prop) => {
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
    if (!this.interfaceDeclaration) return [];
    return this.interfaceDeclaration.getMethods().map((method) => {
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
    const node = this.file.insertText(0, code);
    const interfaceDeclaration = node.getInterface(this.getName());
    this.interfaceDeclaration = interfaceDeclaration || null;
    this.notify();
    console.log(
      "Interface",
      this.getName(),
      this.getFields(),
      this.getMethods()
    );
  }
}
