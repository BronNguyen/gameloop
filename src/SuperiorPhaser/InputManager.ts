import { Key } from "../const/KeyInput";

export default class InputManager {
  keyboard: EventTarget;
  listeners: EventListener[];
  canvas: HTMLCanvasElement;

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
    this.canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

    this.listeners = <EventListener[]>[];

    const keyUpEvent = new Event(Key.UP);
    const keyDownEvent = new Event(Key.DOWN);
    const keySpaceEvent = new Event(Key.SPACE);

    this.keyboard = new EventTarget();


    this.keyboard.addEventListener(Key.DOWN, handleKeyDown);

    window.addEventListener("keydown", (e) => {
      if (!this.getKey(e.key)) {
        this.keyEvent.keyDown[e.key] = e.key;
        this.keyEvent.currentlyDownKey[e.key] = e.key;
      }
      if(e.key == Key.UP) {
        this.keyboard.dispatchEvent(keyUpEvent);
      }
      if(e.key == Key.DOWN) {
        this.keyboard.dispatchEvent(keyDownEvent);
      }
      if(e.key == Key.SPACE) {
        this.keyboard.dispatchEvent(keySpaceEvent);
      }
    });

    window.addEventListener("keyup", (event) => {
      this.keyEvent.keyUp[event.key] = event.key;
      delete this.keyEvent.currentlyDownKey[event.key];
    });

    this.canvas.addEventListener(
      "mousedown",
      (event) => {
        event.preventDefault();
        let x = event.offsetX;
        let y = event.offsetY;
        this.keyEvent.mouseClicked = { x: x, y: y };
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
    this.keyEvent.mouseClicked = {};
  }

  getClick() {
    if (Object.keys(this.keyEvent.mouseClicked).length > 0) {
      return true;
    }
  }

  getKey(input?: string) {
    if (input) {
      if (this.keyEvent.currentlyDownKey[input] == input) {
        return true;
      }
      return false;
    }
  }

  handle() {
    if (this.getKey(Key.DOWN)) {
      this.listeners.forEach((ev) => {
        console.log(ev);
      });
    }
  }
}

function keyDownFn(event) {
  return event;
}

function handleKeyDown(event) {
  console.log(event,"hey")
}