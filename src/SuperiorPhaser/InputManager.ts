export default class InputManager {
  queue: string[] = [];
  currentlyDownKey: string | undefined;

  constructor() {}

  input = window.addEventListener("keydown", (event) => {
    if (this.registerKeyPress(event.key)) {
      this.queue.push(event.key), true;
      this.currentlyDownKey = event.key;
    }
  });

  releasedInput = window.addEventListener("keyup", (event) => {
    if (this.registerKeyPress(event.key)) {
      (this.currentlyDownKey = undefined), true;
    }
  });

  handle() {
    // console.log("hello i do nothin!");
  }

  registerKeyPress(input: string) {
    if (
      input == " " ||
      input == "ArrowUp" ||
      input == "ArrowDown" ||
      input == "ArrowRight" ||
      input == "ArrowLeft"
    )
      return true;
      else return false;
  }
}
