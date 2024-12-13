import { UMLVisibilityTranslation } from "@src/const/UML";

export function convertVisibilityToUML(visibility: string): string {
  return UMLVisibilityTranslation[visibility] || "+";
}
