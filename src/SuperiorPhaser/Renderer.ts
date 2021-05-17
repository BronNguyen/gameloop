import Game from "./Game";
import GameObject from "../GameObject/GameObject";
import Scene from "./Scene";


export default class Renderder {
    // game: Game
     scene: Scene;

    constructor(game){
        this.game = game;
    }

    render() {
      this.game.getObjects().forEach(obj=>this.renderObject(obj))
    }

    renderObject(object: GameObject) {
      x,y
    }
  }
