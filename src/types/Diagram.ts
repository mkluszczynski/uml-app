import { Interface } from "@src/classes/Interface";
import { Class } from "../classes/Class";
import { Position } from "./Position";

export type Diagram = {
  position: Position;
};

export type ClassDiagram = {
  class: Class;
} & Diagram;

export type InterfaceDiagram = {
  interface: Interface;
} & Diagram;
