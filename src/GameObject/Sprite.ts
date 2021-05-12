export default class Sprite {

    width = 0;
    height = 0;
    x = 0;
    y = 0;
    protected image = new Image();
  
    constructor(w, h,image, x, y) {
      this.width = w;
      this.height = h;
      this.x = x;
      this.y = y;
      this.image = image;
    }
  
    reDraw(context: CanvasRenderingContext2D) {
      context.drawImage(this.image,this.x, this.y, this.width, this.height);
    }
  }
  