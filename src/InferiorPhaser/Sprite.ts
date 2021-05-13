export default class Sprite {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  protected image = new Image();

  constructor(image,w, h,  x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  reDraw(context: CanvasRenderingContext2D, relatedX: number | null, relatedY: number | null) {
    const spriteImg = this.image;
    const x = relatedX? relatedX: this.x;
    const y = relatedY? relatedY: this.y;
    context.drawImage(spriteImg, x, y, this.width, this.height);
  }
}
