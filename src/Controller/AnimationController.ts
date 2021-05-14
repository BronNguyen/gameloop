import MyAnimation from "Util/Animation";

export default class AnimationController {
  constructor() {}

  countFrame(anim: MyAnimation) {
    anim.count++;
    if (anim.count == anim.frameRate) {
      this.changeFrame(anim);
    }
  }

  changeFrame(anim: MyAnimation) {
    anim.count = 0;
    anim.currentIndex += 1;
    anim.currentIndex >= anim.frameSet.length ? (anim.currentIndex = 0) : true;
  }
}
