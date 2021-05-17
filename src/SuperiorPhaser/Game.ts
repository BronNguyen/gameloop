import SceneManager from "./SceneManager";
import Renderer from "./Renderer";
import StepManager from "./stepManager";
import InputManager from "./InputManager";

export default class Game {
  renderer: Renderer;
  sceneManager: SceneManager;
  stepManager: StepManager;
  inputManager: InputManager;
  lastTime: number;

  constructor() {
    this.lastTime = window.performance.now();
    this.renderer = new Renderer(this);
    this.sceneManager = new SceneManager();
    this.stepManager = new StepManager(this);
    this.inputManager = new InputManager();
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop() {
    const time = window.performance.now();
    const delta = time - this.lastTime;
    // this.inputManager.handle();
    this.stepManager.update(time, delta);
    this.renderer.render();

    requestAnimationFrame(this.loop);
  }
}
