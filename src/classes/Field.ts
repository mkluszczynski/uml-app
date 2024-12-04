import { Visibility, VisibilityType } from "./Visibility";

export class Field {
  visibility: Visibility;
  name: string;
  type: string;

  constructor(visibility: VisibilityType, name: string, type: string) {
    this.visibility = new Visibility(visibility);
    this.name = name;
    this.type = type;
  }

  public toString(): string {
    return `${this.visibility.toString()} ${this.name}: ${this.type}`;
  }

  public toCode(): string {
    return `${this.visibility.toCode()} ${this.name}: ${this.type};`;
  }

  public static fromString(fieldString: string): Field {
    const [visibility, name, type] = fieldString.split(" ");
    return new Field(visibility as VisibilityType, name, type);
  }

  public static fromCode(fieldCode: string): Field | null {
    const fieldPattern = /(?:public|private|protected)?\s+(\w+):\s+(\w+);/;
    const fieldMatch = fieldCode.match(fieldPattern);

    if (!fieldMatch) {
      return null;
    }

    const [, visibility, name, type] = fieldMatch;
    return new Field(visibility as VisibilityType, name, type);
  }
}
