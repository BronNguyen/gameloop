class GameWorld {
  context: CanvasRenderingContext2D;
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  gravity = .1 ;
  worldWidth;
  worldHeight;

  constructor() {
    this.canvas.width = 1000;
    this.canvas.height = 580;
    this.worldWidth = Number.MAX_SAFE_INTEGER;
    this.worldHeight = this.canvas.height - 30;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }
}

export default new GameWorld();
