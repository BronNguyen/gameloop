import SceneManager from "./SceneManager";
import Renderer from "./Renderer";
import StepManager from "./StepManager";
import InputManager from "./InputManager";
import { GameConfig } from "../const/GameConfig";

export default class Game {
  renderer: Renderer;
  sceneManager: SceneManager;
  stepManager: StepManager;
  inputManager: InputManager;
  lastTime: number;
  gameConfig: GameConfig;

  constructor(gameConfig:GameConfig) {
    this.gameConfig = gameConfig;
    this.lastTime = window.performance.now();
    this.inputManager = new InputManager();
    this.renderer = new Renderer(this,gameConfig);
    this.sceneManager = new SceneManager(this,gameConfig);
    this.stepManager = new StepManager(this);
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop = () => {
    const time = window.performance.now();
    const delta = time - this.lastTime;
    this.inputManager.handle();
    this.stepManager.update(time, delta);
    this.renderer.render();
    this.lastTime = time;
    requestAnimationFrame(this.loop);
  }
}
