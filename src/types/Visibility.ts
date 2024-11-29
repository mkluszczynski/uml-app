// export type Visibility = "public" | "private" | "protected";
export type VisibilityType = "public" | "private" | "protected";

export class Visibility {
  value: "public" | "private" | "protected";

  constructor(value: "public" | "private" | "protected") {
    this.value = value;
  }

  toString(): string {
    return this.convertToUMLVisibility();
  }

  toCode(): string {
    return this.value;
  }

  private convertToUMLVisibility(): "+" | "-" | "#" {
    switch (this.value) {
      case "public":
        return "+";
      case "private":
        return "-";
      case "protected":
        return "#";
    }
  }
}
