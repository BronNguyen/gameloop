import { Key } from "../const/KeyInput";
import Game from "../SuperiorPhaser/Game";

export default class KeyboardInput {

  keyEvent = {
    keyUp: {},
    keyDown: {},
    currentlyDownKey: {},
  };

  constructor(game: Game) {
    this.keyEvent = {
      keyUp: {},
      keyDown: {},
      currentlyDownKey: {},
    };

    game.inputManager.keyboard.addEventListener(Key.UP, (event) => {
      if (!this.keyPressed(event.type)) {
        this.keyEvent.keyDown[event.type] = event.type;
        this.keyEvent.currentlyDownKey[event.type] = event.type;
      }
    });
    game.inputManager.keyboard.addEventListener(Key.DOWN, (event) => {
      if (!this.keyPressed(event.type)) {
        this.keyEvent.keyDown[event.type] = event.type;
        this.keyEvent.currentlyDownKey[event.type] = event.type;
      }
    });
    game.inputManager.keyboard.addEventListener(Key.SPACE, (event) => {
      if (!this.keyPressed(event.type)) {
        this.keyEvent.keyDown[event.type] = event.type;
        this.keyEvent.currentlyDownKey[event.type] = event.type;
      }
    });
    game.inputManager.keyboard.addEventListener("Down-up", (event) => {
      this.keyEvent.keyUp[Key.DOWN] = Key.DOWN;
      this.keyEvent.currentlyDownKey[Key.DOWN] = null;
    });
    game.inputManager.keyboard.addEventListener("Up-up", (event) => {
      this.keyEvent.keyUp[Key.UP] = Key.UP;
      this.keyEvent.currentlyDownKey[Key.UP] = null;
    });
    game.inputManager.keyboard.addEventListener("Space-up", (event) => {
      this.keyEvent.keyUp[Key.SPACE] = Key.SPACE;
      this.keyEvent.currentlyDownKey[Key.SPACE] = null;
    });
  }

  keyPressed(input?: string) {
    if (input) {
      if (this.keyEvent.currentlyDownKey[input] == input) {
        return true;
      }
      return false;
    }
  }
}
