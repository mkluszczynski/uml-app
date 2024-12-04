import { Class } from "./Class";
import { Field } from "./Field";
import { Method } from "./Method";

export class Editor {
  editedClass: Class;

  private classCode: string;

  constructor(editedClass: Class) {
    this.editedClass = editedClass;
    this.classCode = this.editedClass.toCode();
  }

  set code(code: string) {
    this.classCode = code;
  }

  get code() {
    return this.classCode;
  }

  get className() {
    return this.editedClass.name;
  }

  editClass() {
    const className: string = this.parseCodeClassName();
    const fieldsCode: string[] = this.parseCodeFields();
    const methodsCode: string[] = this.parseCodeMethods();

    const fieldClasses: Field[] = [];
    fieldsCode.forEach((field) => {
      const fieldClass = Field.fromCode(field);
      if (fieldClass) fieldClasses.push(fieldClass);
    });

    const methodClasses: Method[] = [];
    methodsCode.forEach((method) => {
      const methodClass = Method.fromCode(method);
      if (methodClass) methodClasses.push(methodClass);
    });

    this.editedClass.setName(className);
    this.editedClass.setFields(fieldClasses);
    this.editedClass.setMethods(methodClasses);

    console.log("Edited Class:", this.editedClass);
  }

  private parseCodeClassName(): string {
    const classNameMatch = this.classCode.match(/class\s+(\w+)/);
    return classNameMatch ? classNameMatch[1] : "";
  }

  private parseCodeFields(): string[] {
    const fieldPattern = /(?:public|private|protected)?\s+(\w+):\s+(\w+);/g;
    const fields: string[] = [];
    let fieldMatch;

    while ((fieldMatch = fieldPattern.exec(this.classCode)) !== null) {
      fields.push(fieldMatch[0]);
    }

    return fields;
  }

  private parseCodeMethods(): string[] {
    const methodPattern =
      /(?:public|private|protected)?\s+(\w+)\(([^)]*)\):\s+(\w+);/g;
    const methods: string[] = [];
    let methodMatch;

    while ((methodMatch = methodPattern.exec(this.classCode)) !== null) {
      methods.push(methodMatch[0]);
    }

    return methods;
  }
}
