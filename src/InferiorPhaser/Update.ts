import Vector2 from "../Util/Vector2";
import State from "./State";
import {
  DinoDown,
  DinoHurt,
  DinoJump as DinoHop,
  DinoRun,
} from "../Animation/DinoAnimation";
import Enemy from "../GameObject/Enemy";
import * as gameSound from "../Sound/Sound";
import Dino, { DinoStatus } from "..//GameObject/Dino";

export default function Update(time, delta, state: State) {
  // diclaration
  const dino = state.dino;
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;
  // camera diclaration
  const camera = state.camera;
  camera.CameraFollow(dino,state);
  //speed calculation
  state.speed += 0.01;
  const velX = state.speed;
  dino.dinoBody.velocity.x = velX;
  if (state.isGameRunning) {
    //Animation handling
    const isJumping =
      state.dino.y < state.gameWorld.canvas.height - state.dino.height;
    const isGrounded =
      Math.abs(
        state.dino.y - state.gameWorld.canvas.height - state.dino.height
      ) -
        200 <
      15;
    ChangeAnimation(dino);
    state.animationController.CountFrame(dino.currentAnimation);
    state.enemies.map((e) => {
      if (e.fly) state.animationController.CountFrame(e.currentAnimation);
    });
    state.score += 0.25;
    if (state.score % 100 === 0) {
      gameSound.reachSound.PlaySound();
    }
    if (state.hiScore < state.score) {
      state.hiScore = state.score;
      state.allowHiScore = true;
    }
    // positioning
    const newDinoPosition = () => {
      const x =
        oldPosX + dinoBody.ConsequentVelocity(state.gameWorld.gravity).x;
      let y =
        oldPosY +
        dinoBody.ConsequentVelocity(state.gameWorld.gravity).y * delta;
      // CONCERN
      // check if is GROUNDED, make him on the ground
      if (isGrounded && dino.status == DinoStatus.Duck) y = 510;
      if (y > 480 && y != 510) {
        y = 480
      }
      return new Vector2(x, y);
    };
    const newDinoPos = newDinoPosition();
    dino.setPosition(newDinoPos.x, newDinoPos.y);
    // input
    const inputKey = state.input.queue.pop();
    if (inputKey) {
      // state.input.RegisterKeyPress(<string>inputKey);
      if (inputKey == "ArrowUp" || " ") {
        DinoJump(state);
      }
      if (inputKey == "ArrowDown") {
        //check if dino is jumping, then make him fall down quickly, if he's grounded, check if his state is ducking, do nothin
        // else if he is not ducking, make him duck like a duck
        if (isJumping) {
        }
        if (isGrounded) {
          if (dino.status != DinoStatus.Duck) {
            dino.status = DinoStatus.Duck;
            DinoDuck(state);
          }
        }
      }
    }

    if (!state.input.currentlyDownKey && !isJumping) {
      DinoRunAgain(state);
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
        y = 433 * Math.random();
      }

      const newEnemy = new Enemy(
        newEnemyImg,
        newEnemyProperties.w,
        newEnemyProperties.h,
        x,
        y,
        newEnemyProperties.fly
      );
      state.enemies.push(newEnemy);
    } else {
      state.enemies.map((e) => {
        if (dino.collisionWith(e)) {
          gameSound.hitSound.PlaySound();
          dino.status = DinoStatus.Die;
          ChangeAnimation(dino);
          state.eventHandler.GameOver(state);
        }
        if (
          e.x + e.width <
          state.camera.camPosX - state.gameWorld.canvas.width / 1.5
        ) {
          state.enemies = [];
        }
      });
    }
  } else {
    const restartKey = state.input.queue.pop();
    if (restartKey == " ") {
      state.eventHandler.RePlay(state);
    }
  }
}

function DinoJump(state: State) {
  if (state.dino.status == DinoStatus.Jump) return;
  gameSound.jumpSound.PlaySound();
  state.dino.status = DinoStatus.Jump
  state.dino.dinoBody.setVelocityY(1.5);
}

function DinoDuck(state: State) {
  if (state.dino.y < state.gameWorld.canvas.height - state.dino.height) return;
  state.dino.status = DinoStatus.Duck;
  state.dino.y = 510;
}

function DinoRunAgain(state: State) {
  state.dino.status = DinoStatus.Run;
  state.dino.y = 480;
}

function ChangeAnimation(dino: Dino) {
  if (dino.status == DinoStatus.Duck) {
    dino.currentAnimation = DinoDown;
  } else if (dino.status == DinoStatus.Jump) {
    dino.currentAnimation = DinoHop;
  } else if (dino.status == DinoStatus.Die) {
    dino.currentAnimation = DinoHurt;
  } else {
    dino.currentAnimation = DinoRun;
  }
}
