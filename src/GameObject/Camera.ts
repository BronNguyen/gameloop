import PhysicsBody from "../Util/PhysicBody";

export default class Camera {
    camWidth;
    camHeight;
    camPosX;
    camPosY;
    cameraBody: PhysicsBody = new PhysicsBody(0);

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
}