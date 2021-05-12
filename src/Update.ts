import Vector2 from "./Util/Vector2";
import GameWorld from "./GameWorld";
import { input } from "./DefineInput";
import { dino } from "./GameObject/Dino";
import SuperConsoleLog from "./Util/SuperConsoleLog";

export default function Update(time, delta, isGameRunning) {
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x+10;
  const oldPosY = dino.y;

  if (isGameRunning) {
    if (dino.dinoBody.motivationY > 0) {
      dino.dinoBody.motivationY -= 1;
    } else {
      dino.dinoBody.velocity.y = 0;
    }
    const newPosition = () => {
      const x = oldPosX + dinoBody.ConsequentVelocity().x * delta;
      let y = oldPosY + dinoBody.ConsequentVelocity().y * delta;

      if (y > GameWorld.worldHeight- dino.height) {
        y = GameWorld.worldHeight - dino.height;
      }
      if (y < 0) {
        y = 0;
      }
      return new Vector2(x, y);
    };
    const newPos = newPosition();
    dino.setPosition(newPos.x, newPos.y);
    const inputKey = input.queue.pop();
    if (inputKey) {
      input.RegisterKeyPress(<string>inputKey);
      if (inputKey == "ArrowUp") {
        if (dino.y < GameWorld.canvas.height - dino.height) return;
        dino.dinoBody.setVelocityY(2);
        dino.dinoBody.setMotivationY(12);
      }
    }
  }
}
