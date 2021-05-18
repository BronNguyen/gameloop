import { TextObject, GameObject } from "../GameObject";
import Game from "./Game";
import { GameConfig } from "../const/const";

export default class Renderder {
  game: Game;
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  context: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
    this.canvas.getContext("2d")
  );

  constructor(game: Game, gameconfig: GameConfig) {
    this.game = game;
    this.canvas.width = gameconfig.canvasWidth;
    this.canvas.height = gameconfig.canvasHeight;
    this.context.font = "30px CustomFont";
  }

  render() {
    this.clear();
    const scene = this.game.sceneManager.activatedScene;
    scene.gameObjects.map((obj) => this.renderObject(obj));
    scene.textObjects.map((text) => this.renderText(text));
  }

  renderObject(object: GameObject) {
    let objSx = 0;
    let objSy = 0;
    let objDw = 30;
    let objDh = 30;
    const img = object.getImage();
    if (!object.currentAnimation) {
      objSx = 0;
      objDw = object.width;
      objDh = object.height;
    } else {
      objSx =
        object.currentAnimation.frameWidth *
        object.currentAnimation.frameSet[object.currentAnimation.currentIndex];
      objDw = object.currentAnimation.frameWidth;
      objDh = object.currentAnimation.frameHeight;
      img.src = object.currentAnimation.sprite;
    }
    this.context.drawImage(
      img,
      objSx,
      objSy,
      objDw,
      objDh,
      object.relativePosX,
      object.relativePosY,
      objDw,
      objDh
    );
  }

  renderText(text: TextObject) {
    this.context.fillText(text.content, text.x, text.y);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
