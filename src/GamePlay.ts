import Update from "./Update";
import Render from "./Render";
import State from "./State";

export default function GamePlay() {
  let lastTime = window.performance.now();
  let state = new State();

  requestAnimationFrame(loop);
  function loop() {
    const time = window.performance.now();
    const delta = time - lastTime;

    Update(time, delta, state);

    Render(state);

    lastTime = time;

    requestAnimationFrame(loop);
  }
}
