import { Class } from "./Class";

export class Editor {
  editedClass: Class;

  currentText: string = "";

  savedTextFields: string[] = [];
  savedTextMethods: string[] = [];

  constructor(editedClass: Class) {
    this.editedClass = editedClass;
    this.currentText = this.editedClass.toCode();
    this.currentTextFields = this.editedClass.fields.map((field) =>
      field.toCode()
    );
    this.currentTextMethods = this.editedClass.methods.map((method) =>
      method.toCode()
    );
  }

  public updateText(newText: string): void {
    this.currentText = newText;
  }

  public syncFields(): void {
    if(this.currentText.includes(this.savedTextFields))

}
