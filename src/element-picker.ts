import ElementOverlay from "./element-overlay";
import { getElementBounds } from "./utils";

type ElementCallback = (el: HTMLElement) => void;
type ElementCallbacks = {
  onClick?: ElementCallback;
  onHover?: ElementCallback;
};

export default class ElementPicker {
  private overlay: ElementOverlay;
  private callbacks?: ElementCallbacks;
  private target?: HTMLElement;
  private mouseX?: number;
  private mouseY?: number;
  private tickReq?: number;

  constructor() {
    this.overlay = new ElementOverlay();
  }

  start(
    parent: Node,
    useShadowDOM: boolean,
    callbacks: ElementCallbacks
  ): boolean {
    if (this.callbacks) {
      return false;
    }

    this.callbacks = callbacks;
    document.addEventListener("mousemove", this.handleMouseMove, true);
    document.addEventListener("click", this.handleClick, true);

    this.overlay.addToDOM(parent, useShadowDOM);

    this.tick();

    return true;
  }

  stop() {
    this.callbacks = undefined;
    document.removeEventListener("mousemove", this.handleMouseMove, true);
    document.removeEventListener("click", this.handleClick, true);

    this.overlay.removeFromDOM();

    if (this.tickReq) {
      window.cancelAnimationFrame(this.tickReq);
    }
  }

  private handleMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  private handleClick = (event: MouseEvent) => {
    if (this.target && this.callbacks?.onClick) {
      this.callbacks.onClick(this.target);
    }
    event.preventDefault();
  };

  private tick = () => {
    if (this.mouseX && this.mouseY) {
      this.overlay.ignoreCursor();
      const elAtCursor = document.elementFromPoint(this.mouseX, this.mouseY);
      const newTarget = elAtCursor as HTMLElement;
      this.overlay.captureCursor();

      if (newTarget && newTarget !== this.target) {
        this.target = newTarget;

        const bounds = getElementBounds(newTarget);
        this.overlay.setBounds(bounds);

        if (this.callbacks?.onHover) {
          this.callbacks.onHover(newTarget);
        }
      }
    }

    this.tickReq = window.requestAnimationFrame(this.tick);
  };
}
