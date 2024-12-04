import { Class } from "./Class";

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

  parseClassCode() {
    const className = this.parseCodeClassName();
    const fields = this.parseCodeFields();
    const methods = this.parseCodeMethods();

    console.log("Class Name:", className);
    console.log("Fields:", fields);
    console.log("Methods:", methods);
  }

  editClass() {
    // Implement this method
    this.editedClass.updateFromCode(this.code);
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
