import Vector2 from "./Util/Vector2";
import State from "./State";

export default function Update(time, delta, state: State) {
  const dino = state.dino;
  const camera = state.camera;
  const dinoBody = dino.dinoBody;
  const oldPosX = dino.x;
  const oldPosY = dino.y;
  const camOldPosX = camera.camPosX;
  const camOldPosY = camera.camPosY;
  const velX = Math.floor(time / 2000) + 1;
  dino.dinoBody.velocity.x = velX;
  camera.cameraBody.velocity.x = velX;

  if (state.isGameRunning) {
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

      if (y > state.gameWorld.worldHeight - dino.height) {
        y = state.gameWorld.worldHeight - dino.height;
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
      state.input.RegisterKeyPress(<string>inputKey);
      if (inputKey == "ArrowUp") {
        // if(Math.floor(time/500)%2==0){
        //   console.log(dino.y,"dino.y")
        //   console.log(state.gameWorld.canvas.height - dino.height,'state.gameWorld.canvas.height - dino.height')
        // }
        if (dino.y < state.gameWorld.canvas.height - dino.height) return;
        dino.dinoBody.setVelocityY(2);
        dino.dinoBody.setMotivationY(12);
      }
    }
  }
}
