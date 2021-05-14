export default class DefineInput {
  queue: string[] = [];
  currentlyDownKey: string | undefined;
  constructor() {}

  input = window.addEventListener("keydown", (event) => {
    if (this.registerKeyPress(event.key)) this.queue.push(event.key), true;
    this.currentlyDownKey = event.key;
  });

  releasedInput = window.addEventListener("keyup", (event) => {
    if (this.registerKeyPress(event.key)) {
      (this.currentlyDownKey = undefined), true;
    }
  });

  registerKeyPress(input: string) {
    if (input == " " || "ArrowUp" || "ArrowDown" || "ArrowRight" || "ArrowLeft")
      return true;
  }
}
