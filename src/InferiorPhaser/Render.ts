import GamePlay from "../Scene/GamePlay";
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
    const relatedPosOffset = state.dino.x - dinoRelativePosX;
    state.dino.reDraw(context, dinoRelativePosX, null);
    state.enemies.map((enemy) => {
      if (ShouldBeRendered(enemy, state)) {
        enemy.reDraw(context, enemy.x - relatedPosOffset, null);
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
    context.font = "30px CustomFont";
    context.fillText(
      state.scoreHandler.ScoreToText(Math.floor(state.score)),
      820,
      50
    );
    if (state.allowHiScore)
      context.fillText(
        "HI:" + state.scoreHandler.ScoreToText(Math.floor(state.hiScore)),
        550,
        50
      );
  } else {
    if (state.gameOver) {
      const context = state.gameWorld.context;
      const gameOverImg = new Image(380, 21);
      const rePlayImg = new Image(72, 64);
      gameOverImg.src = "./assets/game-over.png";
      rePlayImg.src = "./assets/restart.png";
      context.drawImage(
        gameOverImg,
        state.gameWorld.canvas.width / 2 - gameOverImg.width / 2,
        state.gameWorld.canvas.height / 2 - gameOverImg.height * 2
      );
      context.drawImage(
        rePlayImg,
        state.gameWorld.canvas.width / 2 - rePlayImg.width / 2,
        state.gameWorld.canvas.height / 2 + rePlayImg.height / 2
      );
      context.font = "30px CustomFont";
      context.fillText(
        "HI:" + state.scoreHandler.ScoreToText(Math.floor(state.hiScore)),
        550,
        50
      );
      state.gameWorld.canvas.addEventListener("mousedown", (e) => {
        state.RePlay();
      });
    }
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
