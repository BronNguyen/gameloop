import { BirdAnimation } from "../Animation/Animations";
import GameObject from "./GameObject";

export default class Enemy extends GameObject {
  fly = false;
  constructor(scene,image, w, h, x, y, fly) {
    super(scene,image, w, h, x, y);
    this.fly = fly;
    if (this.fly) this.currentAnimation = BirdAnimation;
  }
}
