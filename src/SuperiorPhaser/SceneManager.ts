import Scene from "./Scene";
import Game from "./Game";
import { GameConfig } from "../const/GameConfig";

export default class SceneManager {
  scenes: Scene[] = [];
  activatedScene!: Scene;
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
    this.activatedScene = scene;
  }

  create() {
    if (!this.activatedScene) this.switchScene(this.scenes[0]);
    this.activatedScene.create();
  }

  update(time, delta) {
    this.activatedScene.update(time, delta);
  }
}
