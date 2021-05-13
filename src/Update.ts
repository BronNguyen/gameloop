import Vector2 from "./Util/Vector2";
import State from "./State";
import { DinoDown, DinoRun } from "./Animation/DinoAnimation";

export default function Update(time, delta, state: State) {
  // dino diclaration
  const dino = state.dino;
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;
  // camera diclaration
  const camera = state.camera;
  const camOldPosX = camera.camPosX;
  const camOldPosY = camera.camPosY;

  const velX = Math.floor(time / 2000) + 1;
  dino.dinoBody.velocity.x = velX;
  camera.cameraBody.velocity.x = velX;

  if (state.isGameRunning) {
    dino.currentAnimation = DinoRun;
    // animationUpdate(dino.currentAnimation);
    if (dino.dinoBody.motivationY > 0) {
      dino.dinoBody.motivationY -= 1;
    } else {
      dino.dinoBody.velocity.y = 0;
    }

    const newCameraPosition = () => {
      const camX =
        camOldPosX +
        camera.cameraBody.ConsequentVelocity(state.gameWorld.gravity).x * delta;
      const camY =
        camOldPosY +
        camera.cameraBody.ConsequentVelocity(state.gameWorld.gravity).y * delta;

      return new Vector2(camX, camY);
    };

    const newDinoPosition = () => {
      const x =
        oldPosX +
        dinoBody.ConsequentVelocity(state.gameWorld.gravity).x * delta;
      let y =
        oldPosY +
        dinoBody.ConsequentVelocity(state.gameWorld.gravity).y * delta;

      // check if is GROUNDED, make him on the ground
      if (y > state.gameWorld.worldHeight - dino.height) {
        if(!dino.duck){
          y = state.gameWorld.worldHeight - dino.height;
        } else {
          y = 510;
        }
      }
      if (y < 0) {
        y = 0;
      }
      return new Vector2(x, y);
    };
    const newDinoPos = newDinoPosition();
    const newCamPos = newCameraPosition();
    dino.setPosition(newDinoPos.x, newDinoPos.y);
    camera.setPosition(newCamPos.x, newCamPos.y);

    const inputKey = state.input.queue.pop();
    if (inputKey) {
      // state.input.RegisterKeyPress(<string>inputKey);
      if (inputKey == "ArrowUp") {
        // if(Math.floor(time/500)%2==0){
        //   console.log(dino.y,"dino.y")
        //   console.log(state.gameWorld.canvas.height - dino.height,'state.gameWorld.canvas.height - dino.height')
        // }
        DinoJump(state);
      }
      if (inputKey == "ArrowDown") {
        if (state.dino.y < state.gameWorld.canvas.height - state.dino.height) {
          state.dino.dinoBody.setMotivationY(0);
        }
        if (!dino.duck){
          if(!state.input.currentlyDownKey) return;
          DinoDuck(state)
        } else {
          state.dino.duck = false;
        }
      }
    }
  }
}

function DinoJump(state:State) {
  if (state.dino.y < state.gameWorld.canvas.height - state.dino.height) return;
  state.dino.dinoBody.setVelocityY(2);
  state.dino.dinoBody.setMotivationY(12);
}

function DinoDuck(state:State) {
  state.dino.duck = true;
  state.dino.currentAnimation = DinoDown;
  animationUpdate(state.dino.currentAnimation);
  if (state.dino.y < state.gameWorld.canvas.height - state.dino.height) {
    return;
  }
  state.dino.y = 510;

}

function animationUpdate(currentAnimation) {
  currentAnimation.count += 1;
  if (currentAnimation.count == currentAnimation.frameRate){
    currentAnimation.count = 0;
    currentAnimation.currentIndex == currentAnimation.frameSet.length ? currentAnimation.currentIndex = 0: currentAnimation.currentIndex += 1
  }
}
