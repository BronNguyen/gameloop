import PhysicsBody from "../Util/PhysicBody";
import Enemy from "./Enemy";
import Sprite from "./Sprite";

class Dino extends Sprite{
  dinoBody = new PhysicsBody(6);
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  protected image = new Image(30, 30);

  constructor(image,w, h, x, y) {
    super(image,w, h, x, y);
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.image = image;
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

let dinoImg = new Image(30,30);
dinoImg.src = "./assets/dino-idle.png";
export const dino = new Dino(dinoImg,100, 100, 0, 550);
