export default class Camera {
  width;
  height;
  x;
  y;

  constructor(w, h, x, y) {
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
  }

  follow(gameObject) {
    const camX = gameObject.x - 100;
    const camY =  0;
    this.x = camX;
    this.y = camY;
  }
}