import MyAnimation from "../Util/Animation";

export const DinoIdle: MyAnimation = {
  sprite: "./assets/dino-idle.png",
  frameWidth: 88,
  frameHeight: 92,
  frameRate: 10,
  frameSet: [0]
};

export const DinoHurt: MyAnimation = {
    sprite: "./assets/dino-hurt.png",
    frameWidth: 80,
    frameHeight: 94,
    frameRate: 10,
    frameSet: [0]
  };

  export const DinoDuck: MyAnimation = {
    sprite: "./assets/dino-down.png",
    frameWidth: 118,
    frameHeight: 62,
    frameRate: 10,
    frameSet: [0,1]
  };

  export const DinoRun: MyAnimation = {
    sprite: "./assets/dino-run.png",
    frameWidth: 88,
    frameHeight: 94,
    frameRate: 10,
    frameSet: [2,3]
  };
