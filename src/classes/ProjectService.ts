import { Project } from "ts-morph";
import { Class } from "./Class";
import { Interface } from "./Interface";

export class ProjectService {
  private project: Project;

  constructor() {
    this.project = new Project({ useInMemoryFileSystem: true });
  }

  createClass(name: string): Class {
    return new Class(name, this.project.createSourceFile(`${name}.ts`));
  }

  createInterface(name: string) {
    return new Interface(name, this.project.createSourceFile(`${name}.ts`));
  }
}
