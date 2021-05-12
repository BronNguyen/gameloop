import State from "./State";

export default function Render(state: State) {
  Clear(state);
  const context = state.gameWorld.context;
  // CAMERA: at the RENDER FUNCTION, we have the camera always follow the dinosaur, so we will draw at the screen (draw into camera screen)
  // the sprites with relative position from the camera!
  const dinoRelativePosX =
    state.camera.camPosX - state.dino.x - state.gameWorld.canvas.width / 3;
  state.dino.reDraw(context, dinoRelativePosX, null);
}

function Clear(state: State) {
  state.gameWorld.context.clearRect(
    0,
    0,
    state.gameWorld.canvas.width,
    state.gameWorld.canvas.height
  );
}
