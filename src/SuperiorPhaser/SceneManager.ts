import Scene from "./Scene";
import Game from "./Game";

export default class SceneManager {
    scenes: Scene[] = [];
    activeScene!: Scene;

    constructor(game: Game) {
      this.create();
    };

    add(scene) {
      this.scenes.push(scene)
    }

    switchScene(scene: Scene) {
      this.activeScene = scene;
    }

    create() {
      this.activeScene.create();
    }
    update(time, delta) {
      this.activeScene.update(time,delta);
    }
  }

