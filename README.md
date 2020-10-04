# pick-dom-element

A JavaScript library (written in TypeScript) for interactively picking DOM elements.

![Demo GIF](https://user-images.githubusercontent.com/110275/95014911-02d42d80-0642-11eb-856e-301b00f8fbf9.gif)

## Usage

Create an instance of the `ElementPicker` class, and call its `start()` method to start picking. Provide an `onHover` or `onClick` callback to get the picked element(s). Call `stop()` to stop picking and remove the overlay from the DOM.

```javascript
import { ElementPicker } from "pick-dom-element";

const picker = new ElementPicker();
picker.start(document.body, {
  onHover: (el) => console.log(`Hover: ${el}`),
  onClick: (el) => {
    picker.stop();
    console.log(`Picked: ${el}`);
  },
});
```

See the [example](example/) directory for a more complete example of how to use the library.
