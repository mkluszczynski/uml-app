export type Method = {
  visibility: string;
  name: string;
  returnType: string;
  parameters: MethodParameter[];
  isStatic: boolean;
};

export type MethodParameter = {
  name: string;
  type: string;
};
