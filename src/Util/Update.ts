import Vector2 from "./Vector2";
import GameWorld from "../GameWorld";
import { input } from "../DefineInput";
import { dino } from "../Dino";
import SuperConsoleLog from "./SuperConsoleLog";

export default function Update(time, delta) {
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;

  if(dino.dinoBody.motivationY > 0){
    dino.dinoBody.motivationY -= 1;
  } else {
    dino.dinoBody.velocity.y = 0;
  }
  const newPosition = () => {
    const x = oldPosX + dinoBody.ConsequentVelocity().x * delta;
    let y = oldPosY + dinoBody.ConsequentVelocity().y * delta;

    if (y > GameWorld.canvas.height- dino.height) {
      y = GameWorld.canvas.height - dino.height;
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
    input.RegisterKeyPress(<string>inputKey)
    if(inputKey == "ArrowUp") {
        dino.dinoBody.setVelocityY(3);
        dino.dinoBody.setMotivationY(3);
    }
  }
}
