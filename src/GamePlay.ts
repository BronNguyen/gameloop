import Update from "./Update";
import Render from "./Render";

export default function GamePlay() {
  let lastTime = window.performance.now();

  requestAnimationFrame(loop);
  var isGameRunning = true;
  function loop() {
    const time = window.performance.now();
    const delta = time - lastTime;

    Update(time, delta, isGameRunning);

    Render();

    lastTime = time;

    requestAnimationFrame(loop);
  }
}
