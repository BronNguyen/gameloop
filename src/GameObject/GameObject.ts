import Scene from "../SuperiorPhaser/Scene";
import MyAnimation from "../Animation/Animations";
import Camera from "./Camera";

export default class GameObject {
  protected currentScene: Scene;
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  relativePosX = 0;
  relativePosY = 0;
  currentAnimation?: MyAnimation;
  protected image = new Image();

  constructor(scene,image, w, h, x, y) {
    this.currentScene = scene;
    this.width = w;
    this.height = h;
    this.x = x;
    this.y = y;
    this.image = image;
  }

  getImage() {
    return this.image;
  }

  setRelativePosision(camera: Camera) {
    this.relativePosX = this.x - camera.x;
    this.relativePosY = this.y - camera.y;
  }

  update(time,delta) {
  }
}