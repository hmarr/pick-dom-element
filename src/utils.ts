export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getElementBounds = (el: HTMLElement): BoundingBox => {
  const rect = el.getBoundingClientRect();
  return {
    x: window.pageXOffset + rect.left,
    y: window.pageYOffset + rect.top,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
};
