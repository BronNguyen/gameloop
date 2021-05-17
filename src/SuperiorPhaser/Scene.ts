import {sceneManager} from  "./SceneManager";
import Game from "./Game"

export default class Scene {
    game!: Game


    constructor() {
      sceneManager.add(this)
    }

    update(time,delta) {}
  }
