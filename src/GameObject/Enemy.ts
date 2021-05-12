import PhysicsBody from "../Util/PhysicBody";
import Sprite from "./Sprite";

export default class Enemy extends Sprite {

  body = new PhysicsBody(0);
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  protected image = new Image(30,30);

  constructor(w, h,image, x, y) {
    super(w, h,image, x, y);
  }
}
