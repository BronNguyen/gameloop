import Sprite from "./Sprite";
import State, { GameStatus } from "./State";

export default function render( state: State) {
  const context =  state.gameWorld.context;
  // CAMERA: at the render FUNCTION, we have the camera always follow the Dinosaur, so we will draw at the screen (draw into camera screen)
  // the sprites with relative position from the camera!
  const dinoRelativePosX =
     state.camera.camPosX -  state.dino.x -  state.gameWorld.canvas.width / 2.5;
  //offset from the relatedPos to realPos
  const relatedPosOffset =  state.dino.x - dinoRelativePosX;
  context.font = "30px CustomFont";
  if ( state.gameStatus == "is running") {
    clear(state);
    //Draw Dino
    reDrawWithAnimation( state.dino, context, dinoRelativePosX, null);
    // reDraw( state.dino, context, DinoRelativePosX, null);
     state.enemies.map((enemy) => {
      if (shouldBeRendered(enemy, state)) {
        if (enemy.fly) {
          reDrawWithAnimation(enemy, context, enemy.x - relatedPosOffset, null);
        } else {
          reDraw(enemy, context, enemy.x - relatedPosOffset, null);
        }
      }
    });
    // ***draw bg section***
    const bg = new Image(2400, 26);
    bg.src =  state.background;
    //DRAW bg1:
    context.drawImage(
      bg,
       state.distance,
       state.gameWorld.canvas.height - 28,
       state.gameWorld.canvas.width,
      26
    );
    //DRAW bg2:
    context.drawImage(
      bg,
       state.distance +  state.gameWorld.canvas.width,
       state.gameWorld.canvas.height - 28,
       state.gameWorld.canvas.width,
      26
    );
     state.distance -=  state.dino.dinoBody.velocity.x;
    if (Math.abs( state.distance) >=  state.gameWorld.canvas.width)
       state.distance = 0;
    context.fillText(
       state.scoreHandler.scoreToText(Math.floor( state.score)),
      820,
      50
    );
    if ( state.allowHighScore)
      context.fillText(
        "HI:" +  state.scoreHandler.scoreToText(Math.floor( state.hiScore)),
        550,
        50
      );
  } else if ( state.gameStatus == "game over") {
    clear(state);
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
    context.fillText(
      "HI:" +  state.scoreHandler.scoreToText(Math.floor( state.hiScore)),
      550,
      50
    );
    context.fillText(
       state.scoreHandler.scoreToText(Math.floor( state.score)),
      820,
      50
    );
    reDrawWithAnimation( state.dino, context, dinoRelativePosX, null);
     state.gameWorld.canvas.addEventListener("mousedown", (e) => {
       state.eventHandler.rePlay(state);
    });
    if ( state.theKiller.fly) {
      reDrawWithAnimation(
         state.theKiller,
        context,
         state.theKiller.x - relatedPosOffset,
        null
      );
    } else {
      reDraw(
         state.theKiller,
        context,
         state.theKiller.x - relatedPosOffset,
        null
      );
    }
  } else if ( state.gameStatus == GameStatus.Ready) {
    context.fillText(
      "Press SpaceBar to begin running",
      30,
       state.gameWorld.canvas.height / 2
    );
    //Draw Dino
    reDrawWithAnimation( state.dino, context , dinoRelativePosX - 80, null);
  } else {
    clear(state);
    reDrawWithAnimation( state.dino,context,dinoRelativePosX - 80 +  state.departX,null);
  }
}

//clear function, use it to clear the canvas before the next frame rendering
function clear( state: State) {
   state.gameWorld.context.clearRect(
    0,
    0,
     state.gameWorld.canvas.width,
     state.gameWorld.canvas.height
  );
}

function reDraw(
  obj: Sprite,
  context: CanvasRenderingContext2D,
  relatedX: number | null,
  relatedY: number | null
) {
  const spriteImg = obj.getImage();
  const x = relatedX ? relatedX : obj.x;
  const y = relatedY ? relatedY : obj.y;
  context.drawImage(spriteImg, x, y, obj.width, obj.height);
}

function reDrawWithAnimation(
  obj: Sprite,
  context: CanvasRenderingContext2D,
  relatedX: number | null,
  relatedY: number | null
) {
  const img = new Image(30, 30);
  img.src = obj.currentAnimation.sprite;
  const x = relatedX ? relatedX : obj.x;
  const y = relatedY ? relatedY : obj.y;
  context.drawImage(
    img,
    obj.currentAnimation.frameWidth *
      obj.currentAnimation.frameSet[obj.currentAnimation.currentIndex],
    0,
    obj.currentAnimation.frameWidth,
    obj.currentAnimation.frameHeight,
    x,
    y,
    obj.currentAnimation.frameWidth,
    obj.currentAnimation.frameHeight
  );
}

function shouldBeRendered(spriteObj: Sprite,  state: State): Boolean {
  const camBorderRight =
     state.camera.camPosX +  state.gameWorld.canvas.width / 2;
  const camBorderLeft =  state.camera.camPosY -  state.gameWorld.canvas.width / 2;
  if (spriteObj.x < camBorderRight && spriteObj.x > camBorderLeft) return true;
  return false;
}
