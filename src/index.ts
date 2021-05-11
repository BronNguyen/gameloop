// import GamePlay from "./GamePlay";

import {input} from './DefineInput';
import Update from './Util/Update';
import Render from './Util/Render';

let lastTime = window.performance.now();

export default requestAnimationFrame(loop)

function loop() {
  const time = window.performance.now();
  const delta = time - lastTime;

  // ProcessInput(input);

  Update(time, delta);

  Render();

  lastTime = time;

  requestAnimationFrame(loop)
}

// function ProcessInput(input) {
// }
