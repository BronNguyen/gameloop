import MyAnimation from "../Util/Animation";

export const dinoIdle = new MyAnimation("./assets/dino-idle.png", 88, 92, 10, [0,]);

export const dinoHurt = new MyAnimation("./assets/dino-hurt.png", 80, 94, 10, [0,]);

export const dinoDown = new MyAnimation("./assets/dino-down.png",118,62,10,[0, 1]);

export const dinoRun = new MyAnimation("./assets/dino-run.png",88,94,10,[2, 3]);

export const dinoJump = new MyAnimation("./assets/dino-run.png",88,94,10,[1]);