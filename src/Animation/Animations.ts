export default class MyAnimation {
  sprite: string;
  frameWidth: number;
  frameHeight: number;
  frameRate: number;
  frameSet: number[];
  count = 0;
  currentIndex = 0;

  constructor(s, fw, fh, fr, fs) {
    this.frameWidth = fw;
    this.sprite = s;
    this.frameHeight = fh;
    this.frameRate = fr;
    this.frameSet = fs;
  }

  countFrame() {
    this.count++;
    if (this.count >= this.frameRate) {
      this.changeFrame();
    }
  }

  changeFrame() {
    this.count = 0;
    this.currentIndex += 1;
    this.currentIndex >= this.frameSet.length ? (this.currentIndex = 0) : true;
  }
}

export const dinoIdle = new MyAnimation("./assets/dino-idle.png", 88, 92, 10, [
  0,
]);

export const dinoHurt = new MyAnimation("./assets/dino-hurt.png", 80, 94, 10, [
  0,
]);

export const dinoDown = new MyAnimation(
  "./assets/dino-down.png",
  118,
  62,
  10,
  [0, 1]
);

export const dinoRun = new MyAnimation(
  "./assets/dino-run.png",
  88,
  94,
  10,
  [2, 3]
);

export const dinoJump = new MyAnimation("./assets/dino-run.png", 88, 94, 10, [
  1,
]);

export const BirdAnimation = new MyAnimation(
  "./assets/enemy-bird.png",
  88,
  92,
  10,
  [0, 1]
);
