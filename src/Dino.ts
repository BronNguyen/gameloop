import PhysicsBody from "./Util/PhysicBody";

class Dino {

  dinoBody = new PhysicsBody(6);
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

  reDraw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  public setPosition(x,y) {
    this.x = x;
    this.y = y;
  }
}

export const dino = new Dino(30,30,"red",0,550);
