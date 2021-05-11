class DefineInput {
  queue: string[] = [];
  constructor() {}

  input = window.addEventListener(
    "keydown",
    (event) => this.queue.push(event.key),
    true
  );

  RegisterKeyPress(input: string) {
    if (input == " " || "ArrowUp" || "ArrowDown" || "ArrowRight" || "ArrowLeft")
    return input;
  }

  queueExecute = (queue: string[]) => {
    queue.map((key)=> {
      this.RegisterKeyPress(key);
    })
  };
}
export const input = new DefineInput();