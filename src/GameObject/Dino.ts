import PhysicsBody from "../Util/PhysicBody";
import Enemy from "./Enemy";
import Sprite from "./Sprite";
import MyAnimation from "../Util/Animation";
import { DinoIdle } from "../Animation/DinoAnimation";

export default class Dino extends Sprite {

  protected image = new Image(30, 30);
  currentAnimation: MyAnimation;
  dinoBody = new PhysicsBody(8);
  duck = false;
  width = 0;
  height = 0;
  x = 0;
  y = 0;

  constructor(image, w, h, x, y) {
    super(image, w, h, x, y);
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
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

  reDrawWithAnimation(context: CanvasRenderingContext2D, relatedX: number | null, relatedY: number | null) {
    this.image.src = this.currentAnimation.sprite;
    const x = relatedX? relatedX: this.x;
    const y = relatedY? relatedY: this.y;
    context.drawImage(this.image,this.currentAnimation.frameWidth*this.currentAnimation.frameSet[this.currentAnimation.currentIndex],0, this.currentAnimation.frameWidth, this.currentAnimation.frameHeight, x, y,this.width,this.height);
  }
}