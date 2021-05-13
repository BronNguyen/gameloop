export default class DefineInput {
  queue: string[] = [];
  currentlyDownKey: string | undefined;
  constructor() {}

  input = window.addEventListener(
    "keydown",
    (event) => {
      this.queue.push(event.key),
    true;
  this.currentlyDownKey = event.key;
  }

  );

  releasedInput = window.addEventListener(
    "keyup",
    (event) => {
      this.currentlyDownKey = undefined;
    }
  );

  RegisterKeyPress(input: string) {
    if (input == " " || "ArrowUp" || "ArrowDown" || "ArrowRight" || "ArrowLeft")
      return input;
  }
}
