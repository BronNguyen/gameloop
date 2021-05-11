// import GamePlay from "./GamePlay";

// import {input} from './DefineInput';
import Update from "./Update";
import Render from "./Render";

export default function GamePlay() {
  let lastTime = window.performance.now();

  requestAnimationFrame(loop);

  function loop() {
    const time = window.performance.now();
    const delta = time - lastTime;

    // ProcessInput(input);

    Update(time, delta);

    Render();

    lastTime = time;

    requestAnimationFrame(loop);
  }

  // function ProcessInput(input) {
  // }
}
