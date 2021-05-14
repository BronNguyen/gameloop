import PhysicsBody from "../Util/PhysicBody";
import Enemy from "./Enemy";
import Sprite from "../InferiorPhaser/Sprite";
import { DinoIdle } from "../Animation/DinoAnimation";

export enum DinoStatus {
  Run = "run",
  Jump = "jump",
  Die = "die",
  Duck = "duck"
}

export default class Dino extends Sprite {
  protected image = new Image(30, 30);
  dinoBody = new PhysicsBody(1);
  status = DinoStatus.Run;

  constructor(image, w, h, x, y) {
    super(image, w, h, x, y);
    this.image.src = "./assets/dino-idle.png";
    this.currentAnimation = DinoIdle;
  }

  public setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  public collisionWith(otherObj: Enemy) {
    const myleft = this.x;
    const myright = this.x + this.width;
    const mytop = this.y;
    const mybottom = this.y + this.height;
    const otherleft = otherObj.x;
    const otherright = otherObj.x + otherObj.width;
    const othertop = otherObj.y;
    const otherbottom = otherObj.y + otherObj.height;
    let crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  }
}
