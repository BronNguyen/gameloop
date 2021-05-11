class DefineInput {
  queue: string[] = [];
  constructor() {}

  input = window.addEventListener(
    "keydown",
    (event) => this.queue.push(event.key),
    true
  );

  RegisterKeyPress(input: string) {
    if (input == " ") {
      this.spacePressed();
    }
    if (input == "ArrowUp") {
      this.upPressed();
    }
    if (input == "ArrowDown") {
      this.downPressed();
    }
    if (input == "ArrowRight") {
      this.rightPressed();
    }
    if (input == "ArrowLeft") {
      this.leftPressed();
    }
  }

  spacePressed() {
    console.log("space is pressed");
  }

  upPressed() {
    console.log("up is pressed");
  }

  downPressed() {
    console.log("down is pressed");
  }

  leftPressed() {
    console.log("left is pressed");
  }

  rightPressed() {
    console.log("right is pressed");
  }

  queueExecute = (queue: string[]) => {
    queue.map((key)=> {
      this.RegisterKeyPress(key);
    })
  };
}
export const input = new DefineInput();