import Scene from "./Scene";
import Game from "./Game";
import { GameConfig } from "../const/const";

export default class SceneManager {
  scenes: Scene[] = [];
  activeScene!: Scene;
  game: Game;

  constructor(game: Game, gameConfig: GameConfig) {
    this.game = game;
    this.scenes = gameConfig.scenes.map(
      (sceneType) => new sceneType(this, sceneType.name)
    );
    this.create();
  }

  add(scene) {
    this.scenes.push(scene);
  }

  switchScene(scene: Scene) {
    this.activeScene = scene;
  }

  create() {
    if (!this.activeScene) this.switchScene(this.scenes[0]);
    this.activeScene.create();
  }
  update(time, delta) {
    this.activeScene.update(time, delta);
  }
}
