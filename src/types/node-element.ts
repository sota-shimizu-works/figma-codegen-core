export type BaseNode = {
  name?: string;
  id?: string;
  props?: Record<string, string>;
  static?: boolean;
};

export type StyleProps = {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  lineHeight?: number;
  fontFamily?: string;
  backgroundColor?: string;
  display?: string;
  flexDirection?: string;
  gridTemplateColumns?: string;
  gridRowGap?: number;
  gridColumnGap?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
};

export type FrameNode = BaseNode & {
  type: "frame";
  children?: NodeElement[];
  style?: StyleProps;
};

export type BoxNode = BaseNode & {
  type: "box";
  children?: NodeElement[];
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

export type NodeElement =
  | FrameNode
  | BoxNode
  | TextNode
  | ImageNode
  | InstanceNode;
