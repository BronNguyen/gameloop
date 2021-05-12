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

  constructor(w, h,image, x, y) {
    super(w, h,image, x, y);
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
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherObj.x;
    var otherright = otherObj.x + otherObj.width;
    var othertop = otherObj.y;
    var otherbottom = otherObj.y + otherObj.height;
    var crash = true;
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

export const dino = new Dino(100, 100,"./assets/dino-idle.png", 0, 550);
