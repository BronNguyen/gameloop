import SceneManager from  "./SceneManager";
import Game from "./Game"
import GameObject, { TextObject } from "GameObject/GameObject";

export default class Scene {
    game!: Game
    gameObjects: GameObject[] = [];
    textObjects: TextObject[] = [];
    name: string;


    constructor(sceneManager: SceneManager, name) {
      this.name = name;
      sceneManager.add(this)
    }
    preload?(): void{}
    create() {}
    update(time,delta) {}
  }
