import { Key } from "../const/KeyInput";

export default class InputManager {
  keyboard: EventTarget;
  eventQueue: KeyboardEvent[];
  canvas: HTMLCanvasElement;

  mouseClicked: {};
  arrowUp_Down: Event;
  arrowDown_Down: Event;
  Space_Down: Event;
  arrowUp_Up: Event;
  Space_Up: Event;
  arrowDown_Up: Event;

  constructor() {
    this.mouseClicked = {};
    this.eventQueue = [];

    this.canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

    this.arrowUp_Down = new Event(Key.UP);
    this.arrowDown_Down = new Event(Key.DOWN);
    this.Space_Down = new Event(Key.SPACE);

    this.arrowUp_Up = new Event("Up-up");
    this.arrowDown_Up = new Event("Down-up");
    this.Space_Up = new Event("Space-up");

    this.keyboard = new EventTarget();

    window.addEventListener("keydown", (e) => {
      this.eventQueue.push(e);
    });

    window.addEventListener("keyup", (e) => {
      this.eventQueue.push(e);
    });

    this.canvas.addEventListener(
      "mousedown",
      (event) => {
        event.preventDefault();
        let x = event.offsetX;
        let y = event.offsetY;
        this.mouseClicked = { x: x, y: y };
      },
      true
    );

    this.canvas.addEventListener(
      "mouseup",
      (event) => {
        event.preventDefault();
        this.resetMouseEvent();
      },
      true
    );
  }

  resetMouseEvent() {
    this.mouseClicked = {};
  }

  getClick() {
    if (Object.keys(this.mouseClicked).length > 0) {
      return true;
    }
    return false;
  }

  handle() {
    this.eventQueue.forEach((e) => {
      if (e.key == Key.UP && e.type == "keyup") {
        this.keyboard.dispatchEvent(this.arrowUp_Up);
      }
      if (e.key == Key.DOWN && e.type == "keyup") {
        this.keyboard.dispatchEvent(this.arrowDown_Up);
      }
      if (e.key == Key.SPACE && e.type == "keyup") {
        this.keyboard.dispatchEvent(this.Space_Up);
      }
      if (e.key == Key.UP && e.type == "keydown") {
        this.keyboard.dispatchEvent(this.arrowUp_Down);
      }
      if (e.key == Key.DOWN && e.type == "keydown") {
        this.keyboard.dispatchEvent(this.arrowDown_Down);
      }
      if (e.key == Key.SPACE && e.type == "keydown") {
        this.keyboard.dispatchEvent(this.Space_Down);
      }
    });
    this.eventQueue = [];
  }
}
