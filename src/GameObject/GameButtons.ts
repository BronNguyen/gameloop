import GameObject from "./GameObject";

export default class GameButton extends GameObject {
  constructor(scene, image, w, h, x, y) {
    super(scene, image, w, h, x, y);
  }

  update(time, delta) {}

  beClicked() {
    if (this.checkMousePosition()) {
      return true;
    }
  }

  checkMousePosition() {
    const myleft = this.x;
    const myright = this.x + this.width;
    const mytop = this.y;
    const mybottom = this.y + this.height;
    const mouse = <{ x: number; y: number }>(
      this.currentScene.game.inputManager.keyEvent.mouseClicked
    );
    if (mouse.y == undefined) {
      return false;
    }
    if (
      mybottom < mouse.y ||
      mytop > mouse.y ||
      myright < mouse.x ||
      myleft > mouse.x
    ) {
      return false;
    }
    return true;
  }
}
