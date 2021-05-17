import { BirdAnimation } from "../SuperiorPhaser/Animations";
import GameObject from "./GameObject";

export default class Enemy extends GameObject {
  fly = false;
  constructor(image, w, h, x, y, fly) {
    super(image, w, h, x, y);
    this.fly = fly;
    if (this.fly) this.currentAnimation = BirdAnimation;
  }
}
