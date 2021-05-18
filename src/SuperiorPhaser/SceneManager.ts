import Scene from "./Scene";
import Game from "./Game";

export default class SceneManager {
  scenes: Scene[] = [];
  activeScene!: Scene;
  game: Game;

  constructor(game: Game) {
    this.create();
    this.game = game;
  }

  add(scene) {
    this.scenes.push(scene);
  }

  switchScene(scene: Scene) {
    this.activeScene = scene;
  }
//make the first scene activated
  create() {
    if(!this.activeScene) this.switchScene(this.scenes[0]);
    console.log(this.scenes);
    this.activeScene.create();
  }
  update(time, delta) {
    this.activeScene.update(time, delta);
  }
}
