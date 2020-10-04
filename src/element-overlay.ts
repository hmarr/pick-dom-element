import { BoundingBox } from "./utils";

export default class ElementOverlay {
  el: HTMLDivElement;

  constructor() {
    this.el = document.createElement("div");
    this.el.className = "_ext-element-overlay";
    this.el.style.background = "rgba(250, 240, 202, 0.2)";
    this.el.style.borderColor = "#F95738";
    this.el.style.borderStyle = "solid";
    this.el.style.borderRadius = "1px";
    this.el.style.borderWidth = "1px";
    this.el.style.boxSizing = "border-box";
    this.el.style.cursor = "crosshair";
    this.el.style.position = "absolute";
    this.el.style.zIndex = "2147483647";
  }

  addToDOM(parent: Node, useShadowDOM: boolean) {
    let container = parent;

    if (useShadowDOM) {
      const shadowContainer = document.createElement("div");
      shadowContainer.style.position = "absolute";
      shadowContainer.style.top = "0px";
      shadowContainer.style.left = "0px";

      parent.insertBefore(shadowContainer, parent.firstChild);
      container = shadowContainer.attachShadow({ mode: "open" });
    }

    container.appendChild(this.el);
  }

  removeFromDOM() {
    this.el.remove();
  }

  captureCursor() {
    this.el.style.pointerEvents = "auto";
  }

  ignoreCursor() {
    this.el.style.pointerEvents = "none";
  }

  setBounds({ x, y, width, height }: BoundingBox) {
    this.el.style.left = x + "px";
    this.el.style.top = y + "px";
    this.el.style.width = width + "px";
    this.el.style.height = height + "px";
  }
}
