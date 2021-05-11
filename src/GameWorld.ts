class GameWorld {
  context: CanvasRenderingContext2D;
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  gravity = .1 ;

  constructor() {
    this.canvas.width = 1000;
    this.canvas.height = 580;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }
}

export default new GameWorld();
