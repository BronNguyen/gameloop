import MyAnimation from "../Util/Animation";

export const DinoIdle = new MyAnimation("./assets/dino-idle.png", 88, 92, 10, [0,]);

export const DinoHurt = new MyAnimation("./assets/dino-hurt.png", 80, 94, 10, [0,]);

export const DinoDuck = new MyAnimation("./assets/dino-down.png",118,62,10,[0, 1]);

export const DinoRun = new MyAnimation("./assets/dino-run.png",88,94,10,[2, 3]);
