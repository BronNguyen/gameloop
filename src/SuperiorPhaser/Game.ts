import SceneManager, {sceneManager} from "./SceneManager";
import Renderer from "./Renderer";
import StepManager from "./stepManager";
import InputManager from "./InputManager";

export default class Game {
  renderer: Renderer;
  sceneManager: SceneManager;
  stepManager: StepManager;
  inputManager: InputManager;
  lastTime: number;
  // objects: Object

  constructor() {
    this.renderer = new Renderer(this);
    this.stepManager = new StepManager();
    this.sceneManager = sceneManager;
    this.inputManager = new InputManager();
    this.lastTime = window.performance.now();
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop() {
    const time = window.performance.now();
    const delta = time - this.lastTime;
    this.inputManager.handle();
    this.stepManager.update(time, delta);
    this.renderer.render();

    requestAnimationFrame(this.loop);
  }
}
