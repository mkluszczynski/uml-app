import { Field } from "./Field";
import { Method } from "./Method";

export type Class = {
  name: string;
  fields: Field[];
  methods: Method[];
  isAbstract: boolean;
};
