export default class SpawningFactory {
  enemyType = [
    { image: "./assets/cactuses_big_1.png", fly: false, w: 50, h: 96 },
    { image: "./assets/cactuses_big_2.png", fly: false, w: 100, h: 96 },
    { image: "./assets/cactuses_big_3.png", fly: false, w: 150, h: 98 },
    { image: "./assets/cactuses_small_1.png", fly: false, w: 34, h: 70 },
    { image: "./assets/cactuses_small_2.png", fly: false, w: 68, h: 70 },
    { image: "./assets/cactuses_small_3.png", fly: false, w: 102, h: 70 },
    { image: "./assets/enemy-bird.png", fly: true, w: 92, h: 77 },
  ];

  constructor() {}

  public getRamdomEnemy() {
      const randomNumber = Math.floor(Math.random()*7);
      return this.enemyType[randomNumber]
  }
}
