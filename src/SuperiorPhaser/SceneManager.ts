import Game from "./Game";
import Scene from "./Scene";

export default class SceneManager {
    // game!: Game
    scenes: Scene[] = [];

    add(scene) {
      this.scenes.push(scene)
    }
    update(time, delta) {
      this.scenes.forEach(scene=>scene.update(time, delta))
    }
  }

  export const sceneManager = new SceneManager();
