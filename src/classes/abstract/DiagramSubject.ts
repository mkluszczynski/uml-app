import { ReactiveClass } from "@lib/classes/ReactiveClass";
import { Field } from "@src/types/Field";
import { Method } from "@src/types/Method";
import { SourceFile } from "ts-morph";

export abstract class DiagramSubject<T> extends ReactiveClass {
  private subjectName: string;
  protected file: SourceFile;
  protected subjectDeclaration: T | null = null;

  constructor(name: string, file: SourceFile) {
    super();
    this.subjectName = name;
    this.file = file;
    this.initDeclaration();
  }

  abstract initDeclaration(): void;

  getName(): string {
    return this.subjectName;
  }

  getCode(): string {
    return this.file.getText();
  }

  abstract getFields(): Field[];
  abstract getMethods(): Method[];
  abstract updateFromCode(code: string): void;
}
