import Vector2 from "./Util/Vector2";
import State from "./State";
import { DinoDown, DinoRun } from "./Animation/DinoAnimation";
import Enemy from "./GameObject/Enemy";

export default function Update(time, delta, state: State) {
  // diclaration
  const dino = state.dino;
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;
  // camera diclaration
  const camera = state.camera;
  const camOldPosX = camera.camPosX;
  const camOldPosY = camera.camPosY;
  state.speed+=.01;
  const velX = state.speed;
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
    // positioning
    const newCameraPosition = () => {
      const camX =
        camOldPosX +
        camera.cameraBody.ConsequentVelocity(state.gameWorld.gravity).x;
      return new Vector2(camX, camOldPosY);
    };

    const newDinoPosition = () => {
      const x =
        oldPosX +
        dinoBody.ConsequentVelocity(state.gameWorld.gravity).x;
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

    // input

    const inputKey = state.input.queue.pop();
    if (inputKey) {
      // state.input.RegisterKeyPress(<string>inputKey);
      if (inputKey == "ArrowUp") {
        DinoJump(state);
      }
      if (inputKey == "ArrowDown") {
        DinoDuck(state);
      }
      if (inputKey== " ") {
        console.log(state.enemies);
        console.log(dino.x,"dino x");
        console.log(dino.y,"dino y")
      }
    }

    //  enemies factory
    if (state.enemies.length < 1) {
      // state.enemies.push(new Enemy())
      const newEnemyProperties = state.spawningFactory.getRamdomEnemy();
      const newEnemyImg = new Image(30, 30);
      newEnemyImg.src = newEnemyProperties.image;
      const x =
        state.dino.x +
        state.gameWorld.canvas.width +
        state.gameWorld.canvas.width * Math.random();
      let y;
      if (!newEnemyProperties.fly) {
        y = state.gameWorld.canvas.height - newEnemyProperties.h;
      } else {
        y = state.gameWorld.canvas.height * Math.random();
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

      const newEnemy = new Enemy(
        newEnemyImg,
        newEnemyProperties.w,
        newEnemyProperties.h,
        x,
        y
      );
      state.enemies.push(newEnemy);
    } else {
      state.enemies.map((e) => {
        if(e.x+e.width < state.camera.camPosX) {
          //  destroy enemy
        }
      });
    }
  }
}

function DinoJump(state: State) {
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
  if (currentAnimation.count == currentAnimation.frameRate) {
    currentAnimation.count = 0;
    currentAnimation.currentIndex == currentAnimation.frameSet.length
      ? (currentAnimation.currentIndex = 0)
      : (currentAnimation.currentIndex += 1);
  }
}
