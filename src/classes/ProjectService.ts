import { Project } from "ts-morph";
import { Class } from "./Class";

export class ProjectService {
  private project: Project;

  constructor() {
    this.project = new Project({ useInMemoryFileSystem: true });
  }

  createClass(name: string): Class {
    return new Class(name, this.project.createSourceFile(`${name}.ts`));
  }
}
