import Update from "../InferiorPhaser/Update";
import Render from "../InferiorPhaser/Render";
import State from "../InferiorPhaser/State";

export default class GamePlay {
  lastTime:number;
  state:State;
  constructor() {
    this.lastTime = window.performance.now();
    this.state = new State();
  }

  ConductGamePlay(state:State) {
    const loop = () => {
      const time = window.performance.now();
      const delta = time - this.lastTime;

      Update(time, delta, state);

      Render(state);

      this.lastTime = time;

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
}