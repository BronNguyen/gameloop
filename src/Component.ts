import GameWorld from "./GameWorld";

export default class Component {
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
