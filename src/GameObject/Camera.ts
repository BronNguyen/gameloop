import Sprite from "../InferiorPhaser/Sprite";
import State from "../InferiorPhaser/State";
export default class Camera {
  camWidth;
  camHeight;
  camPosX;
  camPosY;

  constructor(w, h, x, y) {
    this.camWidth = w;
    this.camHeight = h;
    this.camPosX = x;
    this.camPosY = y;
  }

  public setPosition(x, y) {
    this.camPosX = x;
    this.camPosY = y;
  }

  cameraFollow(gameObject: Sprite,  state: State){
    const camX = gameObject.x +  state.gameWorld.canvas.width/2;
    const camY =  state.gameWorld.canvas.height/2;
    this.setPosition(camX,camY);
  }
}
