export default class InputManager {
  keyEvent = {
    keyUp: {},
    keyDown: {},
    currentlyDownKey: {},
    mouseClicked: {},
  };

  constructor() {
    this.keyEvent = {
      keyUp: {},
      keyDown: {},
      currentlyDownKey: {},
      mouseClicked: {},
    };
  }

  canvas = document.getElementById("myCanvas");
  click = this.canvas?.addEventListener(
    "mousedown",
    (event) => {
      event.preventDefault();
      let x = event.offsetX;
      let y = event.offsetY;
      this.keyEvent.mouseClicked = { x: x, y: y };
    },
    true
  );

  releaseClick = this.canvas?.addEventListener(
    "mouseup",
    (event) => {
      event.preventDefault();
      this.resetMouseEvent()
    },
    true
  );
  resetMouseEvent() {
    this.keyEvent.mouseClicked = {};
  }

  getKey(input?: string) {
    if (input) {
      if (this.keyEvent.currentlyDownKey[input] == input) {
        return true;
      }
      return false;
    } else {
      return false;
    }
  }

  handle() {
    window.addEventListener("keydown", (event) => {
      if (!this.getKey(event.key)) {
        this.keyEvent.keyDown[event.key] = event.key;
        this.keyEvent.currentlyDownKey[event.key] = event.key;
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keyEvent.keyUp[event.key] = event.key;
      delete this.keyEvent.currentlyDownKey[event.key];
    });
  }
}
