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

  canvas = document.getElementById("myCanvas");
  click = this.canvas?.addEventListener("click", (event)=>{
    let x = event.pageX -
  },false)

  handle() {
    this.queue.foreach(events => forEach(eventListener) {
      listener()
    }
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
