import { dinoIdle } from "../SuperiorPhaser/Animations";
import MyAnimation from "Util/Animation";
import Vector2 from "Util/Vector2";

export default class GameObject {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  currentAnimation?: MyAnimation;
  protected image = new Image();

  constructor(image, w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.image = image;
  }
  getImage() {
    return this.image;
  }
}

export enum DinoStatus {
  Run = "run",
  Jump = "jump",
  Die = "die",
  Duck = "duck",
}

export class Dino extends GameObject {
  protected image = new Image(30, 30);
  status = DinoStatus.Run;
  takeOffTime = 0;
  velocity?: Vector2;

  constructor(image, w, h, x, y) {
    super(image, w, h, x, y);
    this.image.src = "./assets/dino-idle.png";
    this.currentAnimation = dinoIdle;
  }

  public setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  public setVelocity(x, y) {
    this.velocity = new Vector2(x, y);
  }

  fallingVelocity(gravity) {
    return this.takeOffTime * gravity;
  }

  consequentVelocity(gravity) {
    if (!this.velocity) return;
    const velX = this.velocity.x;
    const VelY = this.velocity.y - this.fallingVelocity(gravity);
    return new Vector2(velX, VelY);
  }
  public collisionWith(otherObj: GameObject) {
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

class Bird extends GameObject {}
