# pick-dom-element

[![npm version](https://badge.fury.io/js/pick-dom-element.svg)](https://badge.fury.io/js/pick-dom-element)

A JavaScript library (written in TypeScript) for interactively picking DOM elements.

<p align="center">
  <img src="https://user-images.githubusercontent.com/110275/95014911-02d42d80-0642-11eb-856e-301b00f8fbf9.gif" width="500px" />
</p>

## Usage

Create an instance of the `ElementPicker` class, and call its `start()` method to start picking. Provide an `onHover` or `onClick` callback to get the picked element(s). Call `stop()` to stop picking and remove the overlay from the DOM.

```javascript
import { ElementPicker } from "pick-dom-element";

const style = { borderColor: "#0000ff" };
const picker = new ElementPicker({ style });
picker.start({
  onHover: (el) => console.log(`Hover: ${el}`),
  onClick: (el) => {
    picker.stop();
    console.log(`Picked: ${el}`);
  },
});
```

See the [example](example/) directory for a more complete example of how to use the library.
