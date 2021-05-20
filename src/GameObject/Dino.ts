import {
  dinoIdle,
  dinoDown,
  dinoHurt,
  dinoJump as dinoHop,
  dinoRun,
} from "../Animation/Animations";
import Vector2 from "../Util/Vector2";
import GameObject from "./GameObject";
import * as gameSound from "../Sound/Sound";
import { DinoStatus } from "../const/DinoStatus";
import { Key } from "../const/KeyInput";
import KeyboardInput from "../Controller/KeyboardInput";

export default class Dino extends GameObject {
  status = DinoStatus.Run;
  takeOffTime = 0;
  gravity = 9.8;
  velocity = new Vector2(10, 0);
  keyboardInput: KeyboardInput;

  constructor(scene, image, w, h, x, y) {
    super(scene, image, w, h, x, y);
    this.keyboardInput = this.currentScene.keyboardInput;
  }

  create() {
    this.image.src = "./assets/dino-idle.png";
    this.currentAnimation = dinoIdle;
  }

  consequentVelocity(gravity) {
    const fallingVelocity = this.takeOffTime * gravity;
    if (!this.velocity) return new Vector2(0, 0);
    const velX = this.velocity.x;
    const VelY = this.velocity.y - fallingVelocity;
    return new Vector2(velX, VelY);
  }

  update(time, delta): void {
    this.changeAnimation();
    this.currentAnimation?.countFrame();
    this.y < 480
      ? (this.status = DinoStatus.Jump)
      : this.y == 514
      ? (this.status = DinoStatus.Duck)
      : (this.status = DinoStatus.Run);
    this.setPosition(delta);
    this.keyboardControl();
  }

  keyboardControl() {
    if (this.keyboardInput.keyPressed(Key.UP)) this.jump();
    if (this.keyboardInput.keyPressed(Key.SPACE)) this.jump();
    if (this.keyboardInput.keyPressed(Key.DOWN)) this.duck();
    if (!((this.keyboardInput.keyPressed(Key.UP))||(this.keyboardInput.keyPressed(Key.DOWN))||(this.keyboardInput.keyPressed(Key.SPACE))
    // || this.currentScene.game.inputManager.getClick()
    )
     && this.status != DinoStatus.Jump) {
      this.runAgain();
      return;
    }
  }

  setPosition(delta) {
    this.velocity.x += 0.01;
    if (this.status == DinoStatus.Jump) {
      this.takeOffTime += delta;
    } else {
      this.takeOffTime = 0;
    }
    //concern when to update velocity y = 0????
    const newX = this.x + this.velocity.x;
    let y = this.y - (this.consequentVelocity(this.gravity).y * delta) / 1000;
    //check if the dino's position is underground after updating y, so make it on ground;
    if (y > 480 && y != 514) y = 480;
    this.x = newX;

    if (this.y < y && y == 480) this.velocity.y = 0;
    this.y = y;
    // if (this.takeOffTime == 0) this.velocity.y = 0;
  }

  jump() {
    if (this.status == DinoStatus.Jump) return;
    gameSound.jumpSound.playSound();
    // this.status = DinoStatus.Jump;
    this.velocity.y = 2500;
  }

  duck() {
    if (this.status == DinoStatus.Jump) {
      this.takeOffTime *= 2;
    }
    if (this.y == 480) {
      if (this.status != DinoStatus.Duck) {
        this.y = 514;
      }
    }
  }

  runAgain() {
    this.y = 480;
  }

  die() {
    gameSound.hitSound.playSound();
    this.status = DinoStatus.Die;
    this.changeAnimation();
  }

  collisionWith(otherObj: GameObject) {
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

  roar() {
    gameSound.reachSound.playSound();
  }

  changeAnimation(param?) {
    if (this.status == DinoStatus.Duck) {
      this.currentAnimation = dinoDown;
    } else if (this.status == DinoStatus.Jump) {
      this.currentAnimation = dinoHop;
    } else if (this.status == DinoStatus.Die) {
      this.currentAnimation = dinoHurt;
    } else {
      this.currentAnimation = dinoRun;
    }
    if (param == "start") {
      this.currentAnimation = dinoRun;
    }
  }
}
