import ElementOverlay from "./element-overlay";
import { getElementBounds } from "./utils";

type ElementCallback = (el: HTMLElement) => void;
type ElementPickerOptions = {
  parentElement?: Node;
  useShadowDOM?: boolean;
  onClick?: ElementCallback;
  onHover?: ElementCallback;
};

export default class ElementPicker {
  private overlay: ElementOverlay;
  private active: boolean;
  private options?: ElementPickerOptions;
  private target?: HTMLElement;
  private mouseX?: number;
  private mouseY?: number;
  private tickReq?: number;

  constructor() {
    this.active = false;
    this.overlay = new ElementOverlay();
  }

  start(options: ElementPickerOptions): boolean {
    if (this.active) {
      return false;
    }

    this.active = true;
    this.options = options;
    document.addEventListener("mousemove", this.handleMouseMove, true);
    document.addEventListener("click", this.handleClick, true);

    this.overlay.addToDOM(
      options.parentElement ?? document.body,
      options.useShadowDOM ?? true
    );

    this.tick();

    return true;
  }

  stop() {
    this.active = false;
    this.options = undefined;
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
    if (this.target && this.options?.onClick) {
      this.options.onClick(this.target);
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

        if (this.options?.onHover) {
          this.options.onHover(newTarget);
        }
      }
    }

    this.tickReq = window.requestAnimationFrame(this.tick);
  };
}
