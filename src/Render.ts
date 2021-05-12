import State from "./State";

export default function Render(state: State) {
  Clear(state);
  const context = state.gameWorld.context;

  // CAMERA: at the RENDER FUNCTION, we have the camera always follow the dinosaur, so we will draw at the screen (draw into camera screen)
  // the sprites with relative position from the camera!
  const dinoRelativePosX = state.camera.camPosX - state.dino.x - state.gameWorld.canvas.width / 2.5;
  state.dino.reDraw(context, dinoRelativePosX, null);
  // ***draw bg section***
  const bg = new Image(30,30)
  bg.src = state.background;
  //DRAW bg1:
  context.drawImage(bg,state.distance,state.gameWorld.canvas.height-28)
  //DRAW bg2:
  context.drawImage(bg,state.distance-state.gameWorld.canvas.width,state.gameWorld.canvas.height-28)
  state.distance -= state.dino.dinoBody.velocity.x;
  if (Math.abs(state.distance) >= (state.gameWorld.canvas.width))
    state.distance = 0;
}

function Clear(state: State) {
  state.gameWorld.context.clearRect(
    0,
    0,
    state.gameWorld.canvas.width,
    state.gameWorld.canvas.height
  );
}
