import Vector2 from "../Util/Vector2";
import State, { GameStatus } from "./State";
import {
  dinoDown,
  dinoHurt,
  dinoJump as dinoHop,
  dinoRun,
} from "../Animation/DinoAnimation";
import Enemy from "../GameObject/Enemy";
import * as gameSound from "../Sound/Sound";
import Dino, { DinoStatus } from "..//GameObject/Dino";

export default function  update(time, delta,  state: State) {
  // diclaration
  const dino =  state.dino;
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;
  // camera diclaration
  const camera =  state.camera;
  camera.cameraFollow(dino, state);
  //speed calculation
   state.speed += 0.01;
  dino.dinoBody.velocity.x =  state.speed;
  if ( state.gameStatus == GameStatus.IsRunning) {
    dino.status ==  DinoStatus.Jump
      ? (dinoBody.takeOffTime += delta)
      : (dinoBody.takeOffTime = 0);
    //Animation handling
    const isJumping =
       state.dino.y <  state.gameWorld.canvas.height -  state.dino.height;
    const isGrounded =
      Math.abs(
         state.dino.y -  state.gameWorld.canvas.height -  state.dino.height
      ) -
        200 <
      15;
    changeAnimation(dino);
     state.animationController.countFrame(dino.currentAnimation);
    //  enemy update
     state.enemies.map((e) => {
      if (e.fly)  state.animationController.countFrame(e.currentAnimation);
    });
    //score update
     state.score += 0.25;
    if ( state.score % 100 === 0) {
      gameSound.reachSound.playSound();
    }
    if ( state.hiScore <  state.score) {
       state.hiScore =  state.score;
       state.allowHighScore = true;
    }
    // positioning
    const newdinoPosition = () => {
      const x = oldPosX + dinoBody.velocity.x;
      let y =
        oldPosY -
        (dinoBody.consequentVelocity( state.gameWorld.gravity).y * delta) / 1000;
      // check if is GROUNDED, make him on the ground
      if (isGrounded && dino.status ==  DinoStatus.Duck) y = 510;
      if (y > 480 && y != 510) {
        y = 480;
      }
      return new Vector2(x, y);
    };
    const newdinoPos = newdinoPosition();
    dino.setPosition(newdinoPos.x, newdinoPos.y);
    // input
    const inputKey =  state.input.queue.pop();
    if (inputKey) {
      if (inputKey == "ArrowUp" || " ") {
        dinoJump(state);
      }
      if (inputKey == "ArrowDown") {
        //check if dino is jumping, then make him fall down quickly, if he's grounded, check if his State is ducking, do nothin
        // else if he is not ducking, make him duck like a duck
        if (isJumping) {
          dinoBody.takeOffTime *= 2;
        }
        if (isGrounded) {
          if (dino.status !=  DinoStatus.Duck) {
            dinoDuck(state);
          }
        }
      }
    }

    if (! state.input.currentlyDownKey && !isJumping) {
      dinoRunAgain(state);
    }
    //  enemies factory
    if ( state.enemies.length < 1) {
      //  state.enemies.push(new Enemy())
      const newEnemyProperties =  state.spawningFactory.getRamdomEnemy();
      const newEnemyImg = new Image(30, 30);
      newEnemyImg.src = newEnemyProperties.image;
      const x =
         state.dino.x +
         state.gameWorld.canvas.width +
         state.gameWorld.canvas.width * Math.random();
      let y;
      if (!newEnemyProperties.fly) {
        y =  state.gameWorld.canvas.height - newEnemyProperties.h;
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
          gameSound.hitSound.playSound();
          dino.status =  DinoStatus.Die;
          changeAnimation(dino);
           state.theKiller = e;
           state.eventHandler.setGameStatus(state,GameStatus.GameOver);
        }
        if (
          e.x + e.width <
           state.camera.camPosX -  state.gameWorld.canvas.width / 1.5
        ) {
           state.enemies = [];
        }
      });
    }
  } else if( state.gameStatus == GameStatus.GameOver) {
    const restartKey =  state.input.queue.pop();
    if (restartKey == " ") {
       state.eventHandler.rePlay(state);
    }
  } else if( state.gameStatus == GameStatus.Ready) {
    const restartKey =  state.input.queue.pop();
    if (restartKey == " ") {
       state.eventHandler.startGame(state);
    }
  } else {
     state.animationController.countFrame(dino.currentAnimation);
     state.departX +=3/5;
  }
}

function dinoJump( state: State) {
  if ( state.dino.status ==  DinoStatus.Jump) return;
  gameSound.jumpSound.playSound();
   state.dino.status =  DinoStatus.Jump;
   state.dino.dinoBody.setVelocityY(2200);
}

function dinoDuck( state: State) {
   state.dino.status =  DinoStatus.Duck;
   state.dino.y = 510;
}

function dinoRunAgain( state: State) {
   state.dino.status =  DinoStatus.Run;
   state.dino.y = 480;
}

function changeAnimation(dino : Dino) {
  if (dino.status ==  DinoStatus.Duck) {
    dino.currentAnimation = dinoDown;
  } else if (dino.status ==  DinoStatus.Jump) {
    dino.currentAnimation = dinoHop;
  } else if (dino.status ==  DinoStatus.Die) {
    dino.currentAnimation = dinoHurt;
  } else {
    dino.currentAnimation = dinoRun;
  }
}
