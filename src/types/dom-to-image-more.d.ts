declare module "dom-to-image-more" {
  interface Options {
    bgcolor?: string;
    width?: number;
    height?: number;
    style?: Partial<CSSStyleDeclaration>;
    filter?: (node: HTMLElement) => boolean;
    quality?: number;
    imagePlaceholder?: string;
    cacheBust?: boolean;
  }

  const domtoimage: {
    toSvg(node: Node, options?: Options): Promise<string>;
    toPng(node: Node, options?: Options): Promise<string>;
    toJpeg(node: Node, options?: Options): Promise<string>;
    toBlob(node: Node, options?: Options): Promise<Blob>;
    toPixelData(node: Node, options?: Options): Promise<Uint8ClampedArray>;
  };

  export default domtoimage;
}
