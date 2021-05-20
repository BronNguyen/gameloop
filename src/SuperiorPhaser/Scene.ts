import SceneManager from  "./SceneManager";
import Game from "./Game"
import { TextObject , GameObject, GameButton } from "GameObject";
import KeyboardInput from "../Controller/KeyboardInput";

export default class Scene {
    game: Game
    gameObjects: GameObject[] = [];
    backgroundObjects: GameObject[] = [];
    textObjects: TextObject[] = [];
    gameButtonObjects: GameButton[] = [];
    name: string;
    keyboardInput: KeyboardInput;


    constructor(sceneManager: SceneManager, name) {
      this.name = name;
      this.game = sceneManager.game;
      this.keyboardInput = new KeyboardInput(this.game);
      sceneManager.add(this)
    }
    preload?(): void{}
    create() {}
    update(time,delta) {}
  }
