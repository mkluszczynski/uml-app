export type Method = {
  visibility: "+" | "-" | "#";
  name: string;
  returnType: string;
  parameters: Parameter[];
};

export type Parameter = {
  name: string;
  type: string;
};
