import GameWorld from "./GameWorld";
import dinoBody from "./Util/PhysicBody";

export default class Dino {
  width;
  height;
  color;
  x;
  y;
  constructor(w, h, color, x, y) {
    this.width = w;
    this.height = h;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  fill() {
    const ctx = GameWorld.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
