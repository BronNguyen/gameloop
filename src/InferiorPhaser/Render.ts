import Sprite from "./Sprite";
import State from "./State";

export default function Render(state: State) {
  if (state.isGameRunning) {
    Clear(state);
    const context = state.gameWorld.context;
    // CAMERA: at the RENDER FUNCTION, we have the camera always follow the dinosaur, so we will draw at the screen (draw into camera screen)
    // the sprites with relative position from the camera!

    const dinoRelativePosX =
      state.camera.camPosX - state.dino.x - state.gameWorld.canvas.width / 2.5;
    //offset from the relatedPos to realPos

    const relatedPosOffset = state.dino.x - dinoRelativePosX
    state.dino.reDraw(context, dinoRelativePosX, null);

    state.enemies.map((enemy) => {
      if (ShouldBeRendered(enemy, state)) {
        enemy.reDraw(context, enemy.x- relatedPosOffset, null);
      }
    });
    // ***draw bg section***
    const bg = new Image(30, 30);
    bg.src = state.background;
    //DRAW bg1:
    context.drawImage(bg, state.distance, state.gameWorld.canvas.height - 28);
    //DRAW bg2:
    context.drawImage(
      bg,
      state.distance - state.gameWorld.canvas.width,
      state.gameWorld.canvas.height - 28
    );
    state.distance -= state.dino.dinoBody.velocity.x;
    if (Math.abs(state.distance) >= state.gameWorld.canvas.width)
      state.distance = 0;
  }
}

//clear function, use it to clear the canvas before the next frame rendering
function Clear(state: State) {
  state.gameWorld.context.clearRect(
    0,
    0,
    state.gameWorld.canvas.width,
    state.gameWorld.canvas.height
  );
}

function ShouldBeRendered(spriteObj: Sprite, state: State): Boolean {
  const camBorderRight =
    state.camera.camPosX + state.gameWorld.canvas.width / 2;
  const camBorderLeft = state.camera.camPosY - state.gameWorld.canvas.width / 2;
  if (spriteObj.x < camBorderRight && spriteObj.x > camBorderLeft) return true;
  return false;
}
