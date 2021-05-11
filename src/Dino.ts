import PhysicsBody from "./Util/PhysicBody";

class Dino {

  dinoBody = new PhysicsBody(6);
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  private image = new Image(30,30);

  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.image.src = "./assets/dino-idle.png"
  }

  reDraw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image,this.x, this.y, this.width, this.height);
  }

  public setPosition(x,y) {
    this.x = x;
    this.y = y;
  }
}

export const dino = new Dino(30,30,0,550);
