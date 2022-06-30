import { ElementPicker } from "pick-dom-element";

function main() {
  const status = document.getElementById("status");
  const startButton = document.getElementById("start");
  const onlyEmphasisCheckbox = document.getElementById("only-emphasis");

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

  const picker = new ElementPicker({
    style: {
      background: "rgba(153, 235, 255, 0.5)",
      borderColor: "yellow"
    },
  });
  let onlyEmphasis = onlyEmphasisCheckbox.checked;
  onlyEmphasisCheckbox.onchange = (ev) => {
    onlyEmphasis = ev.target.checked;
  }
  const start = () => {
    startButton.disabled = true;
    picker.start({
      onHover: setElement,
      onClick: () => {
        picker.stop();
        startButton.disabled = false;
      },
      elementFilter: (el) => {
        if (!onlyEmphasis) {
          return true;
        }
        return ['I', 'B'].includes(el.tagName);
      }
    });
  };

  startButton.addEventListener("click", start);
}

document.addEventListener("DOMContentLoaded", main);
