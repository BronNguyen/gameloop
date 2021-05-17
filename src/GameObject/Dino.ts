import {
  dinoIdle,
  dinoDown,
  dinoHurt,
  dinoJump as dinoHop,
  dinoRun,
} from "../SuperiorPhaser/Animations";
import Vector2 from "Util/Vector2";
import GameObject from "./GameObject";

export enum DinoStatus {
  Run = "run",
  Jump = "jump",
  Die = "die",
  Duck = "duck",
}

export default class Dino extends GameObject {
  protected image = new Image(30, 30);
  status = DinoStatus.Run;
  takeOffTime = 0;
  velocity = new Vector2(0, 0);

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

  update(time, delta): void {
    this.velocity.x += 0.01;
    if (
      1
      // this.status == DinoStatus.Run todo???
    ) {
      this.status == DinoStatus.Jump
        ? (this.takeOffTime += delta)
        : (this.takeOffTime = 0);
    }
    const isJumping = this.y < 510;
    const isGrounded = this.y == 510;
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
  changeAnimation() {
    if (this.status == DinoStatus.Duck) {
      this.currentAnimation = dinoDown;
    } else if (this.status == DinoStatus.Jump) {
      this.currentAnimation = dinoHop;
    } else if (this.status == DinoStatus.Die) {
      this.currentAnimation = dinoHurt;
    } else {
      this.currentAnimation = dinoRun;
    }
  }
}

