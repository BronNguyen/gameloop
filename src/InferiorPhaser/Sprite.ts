import MyAnimation from "../Util/Animation";

export default class Sprite {
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  currentAnimation!: MyAnimation;
  protected image = new Image();

  constructor(image,w, h,  x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.image = image;
  }
  getImage(){
    return this.image;
  }
}
