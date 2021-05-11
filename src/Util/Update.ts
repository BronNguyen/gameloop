import Vector2 from "./Vector2";
import GameWorld from "../GameWorld";
import { input } from "../DefineInput";
import { dino } from "../Dino";

export default function Update(time, delta) {
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;

  const newPosition = () => {
    const x = oldPosX + dinoBody.ConsequentVelocity().x * delta;
    let y = oldPosY + dinoBody.ConsequentVelocity().y * delta;
    if (y > GameWorld.canvas.height) {
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
    input.RegisterKeyPress(<string>inputKey);
  }
}
