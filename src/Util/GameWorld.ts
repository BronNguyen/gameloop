export default class GameWorld {
  context: CanvasRenderingContext2D;
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  gravity = .125 ;
  worldWidth;
  worldHeight;
    static context: any;
    static canvas: any;

  constructor() {
    this.canvas.width = 1000;
    this.canvas.height = 580;
    this.worldWidth = Number.MAX_SAFE_INTEGER;
    this.worldHeight = this.canvas.height;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }
}
