import { ElementPicker } from "pick-dom-element";

function main() {
  const status = document.getElementById("status");
  const startButton = document.getElementById("start");

  const setElement = (el) => {
    const tags = [];
    while (el.parentNode) {
      tags.push(el.tagName);
      el = el.parentNode;
    }
    status.innerText = tags
      .reverse()
      .map((t) => t.toLowerCase())
      .join(" > ");
  };

  const picker = new ElementPicker();
  const start = () => {
    startButton.disabled = true;
    picker.start(document.body, {
      onHover: setElement,
      onClick: () => {
        picker.stop();
        startButton.disabled = false;
      },
    });
  };

  startButton.addEventListener("click", start);
}

document.addEventListener("DOMContentLoaded", main);
