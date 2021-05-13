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
  state.speed += 0.01;
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
        oldPosX + dinoBody.ConsequentVelocity(state.gameWorld.gravity).x;
      let y =
        oldPosY +
        dinoBody.ConsequentVelocity(state.gameWorld.gravity).y * delta;

      // check if is GROUNDED, make him on the ground
      if (y > state.gameWorld.worldHeight - dino.height) {
        if (!dino.duck) {
          y = state.gameWorld.worldHeight - dino.height;
        } else {
          y = 520;
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
    const isJumping =
      state.dino.y < state.gameWorld.canvas.height - state.dino.height;
    // input

    const inputKey = state.input.queue.pop();
    if (inputKey) {
      // state.input.RegisterKeyPress(<string>inputKey);
      if (inputKey == "ArrowUp") {
        DinoJump(state);
      }
      if (inputKey == "ArrowDown") {
        //check if dino is jumping, then make him fall down quickly, if he's grounded, check if his state is ducking, do nothin
        // else if he is not ducking, make him duck like a duck
        if (isJumping) {
          state.dino.dinoBody.setMotivationY(0);
        } else {
          if (!dino.duck) {
            if (state.input.currentlyDownKey) {
              DinoDuck(state);
            } else {
              state.dino.duck = false;
              DinoRunAgain(state);
            }
          }
        }
      }
      if (inputKey == " ") {
        console.log(state.input.currentlyDownKey, "key is down");
        console.log(dino.x, "dino x");
        console.log(dino.y, "dino y");
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
        if(dino.collisionWith(e)) {
          state.isGameRunning = false;
        }
        if (e.x + e.width < state.camera.camPosX) {
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

function DinoDuck(state: State) {
  if (state.dino.y < state.gameWorld.canvas.height - state.dino.height) return;
  state.dino.duck = true;
  state.dino.currentAnimation = DinoDown;
  animationUpdate(state.dino.currentAnimation);
  state.dino.y = 520;
}

function DinoRunAgain(state: State) {
  state.dino.duck = false;
  state.dino.currentAnimation = DinoRun;
  animationUpdate(state.dino.currentAnimation);
  state.dino.y = 580;
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
