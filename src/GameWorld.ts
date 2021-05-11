class GameWorld {
  context: CanvasRenderingContext2D;
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");

  constructor() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
  }
}

export default new GameWorld();
