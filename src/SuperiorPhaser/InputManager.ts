export default class InputManager {
  queue: string[] = [];
  currentlyDownKey: string | undefined;
//   left = false;
//   right = false;
//   up = false;
//   down = false;
//   space = true;

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

  handle() {
      // console.log("hello i do nothin!");
  }

  registerKeyPress(input: string) {
    if (input == " " || "ArrowUp" || "ArrowDown" || "ArrowRight" || "ArrowLeft")
    //   switch (input) {
    //     case " ":
    //       console.log("space");
    //       break;
    //     case "ArrowUp":
    //       console.log("up");
    //       break;
    //     case "ArrowDown":
    //       console.log("down");
    //       break;
    //     case "ArrowLeft":
    //       console.log("left");
    //       break;
    //     case "ArrowRight":
    //       console.log("right");
    //       break;
    //   }
    return true;
  }
}
