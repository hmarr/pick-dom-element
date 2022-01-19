export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementOverlayStyleOptions {
  background?: string;
  borderColor?: string;
  borderStyle?: string;
  borderRadius?: string;
  borderWidth?: string;
  boxSizing?: string;
  cursor?: string;
  position?: string;
  zIndex?: string;
};

export type ElementOverlayOptions = {
  className?: string;
  style?: ElementOverlayStyleOptions;
};

export const getElementBounds = (el: HTMLElement): BoundingBox => {
  const rect = el.getBoundingClientRect();
  return {
    x: window.pageXOffset + rect.left,
    y: window.pageYOffset + rect.top,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};
