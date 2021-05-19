export default class InputManager {
  keyEvent = {
    keyUp: {},
    keyDown: {},
    currentlyDownKey: {},
  };

  constructor() {
    this.keyEvent = {
      keyUp: {},
      keyDown: {},
      currentlyDownKey: {},
    };
  }

  canvas = document.getElementById("myCanvas");
  click = this.canvas?.addEventListener(
    "mousedown",
    (event) => {
      event.preventDefault();
      let x = event.offsetX;
      let y = event.offsetY;
    },
    true
  );

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
