import PhysicsBody from "../Util/PhysicBody";
import Sprite from "../InferiorPhaser/Sprite";
import { BirdAnimation } from "../Animation/BirdAnimation";

export default class Enemy extends Sprite {
  fly = false;
  body = new PhysicsBody(0);
  protected image = new Image(30,30);

  constructor(image, w, h, x, y, fly) {
    super(w, h,image, x, y);
    this.width = w;
    this.height = h;
    this.x = x;
    this.fly = fly;
    this.y = y;
    this.currentAnimation = BirdAnimation;
    this.image = image;
  }
}
