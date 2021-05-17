import GameObject, { TextObject } from "../GameObject/GameObject";
import Scene from "./Scene";
import Game from "./Game";

export default class Renderder {
  game: Game;
  canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
  context: CanvasRenderingContext2D = <CanvasRenderingContext2D>(
    this.canvas.getContext("2d")
  );

  constructor(game: Game) {
    this.game = game;
    this.canvas.width = 1000;
    this.canvas.height = 580;
    this.context.font = "30px CustomFont";
  }

  render() {
    const scene = this.game.sceneManager.activeScene;
    scene.gameObjects.map((obj) => this.renderObject(obj));
    scene.textObjects.map((text) => this.renderText(text));
  }

  renderObject(object: GameObject) {
    let objSx = 0;
    let objSy = 0;
    let objDw = 30; //scaling W
    let objDh = 30; //scaling H
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
    }
    this.context.drawImage(
      object.getImage(),
      objSx,
      objSy,
      objDw,
      objDw,
      object.relativePosX,
      object.relativePosY,
      objDw,
      objDh
    );
  }

  renderText(text: TextObject) {
    this.context.fillText(text.content, text.x, text.y);
  }
}
