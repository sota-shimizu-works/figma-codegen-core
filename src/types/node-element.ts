export type NodeElement = BoxNode | TextNode | ImageNode | InstanceNode;

export type BaseNode = {
  name?: string;
  id?: string;
  props?: Record<string, string>;
  static?: boolean;
};

export type BoxNode = BaseNode & {
  type: "box";
  children: NodeElement[];
  style?: StyleProps;
};

export type TextNode = BaseNode & {
  type: "text";
  content: string;
  style?: StyleProps;
};

export type ImageNode = BaseNode & {
  type: "image";
  src: string;
};

export type InstanceNode = BaseNode & {
  type: "instance";
  componentName: string;
};

export type StyleProps = {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  lineHeight?: number;
  fontFamily?: string;
};
