import SceneManager from  "./SceneManager";
import Game from "./Game"
import { TextObject , GameObject } from "GameObject";

export default class Scene {
    game: Game
    gameObjects: GameObject[] = [];
    textObjects: TextObject[] = [];
    name: string;


    constructor(sceneManager: SceneManager, name) {
      this.name = name;
      this.game = sceneManager.game;
      sceneManager.add(this)
    }
    preload?(): void{}
    create() {}
    update(time,delta) {}
  }
