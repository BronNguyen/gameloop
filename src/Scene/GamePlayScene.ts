import Scene from "../SuperiorPhaser/Scene";
import {
  Camera,
  TextObject,
  Dino,
  SpawningFactory,
  Enemy,
} from "../GameObject";
import { scoreHandler } from "../Util/ScoreHandler";
import SceneManager from "SuperiorPhaser/SceneManager";

export default class GameplayScene extends Scene {
  dino: Dino;
  enemies: Enemy[] = [];
  camera: Camera;
  spawningFactory: SpawningFactory;
  score = 0;
  hiScore = 0;
  scoreText?: TextObject;
  hiScoreText?: TextObject;
  speed = 10;

  constructor(sceneManager: SceneManager, name: string) {
    super(sceneManager, name);
    this.dino = new Dino(this, new Image(30, 30), 100, 100, 0, 510);
    this.camera = new Camera(100, 100, 0, 0);
    this.spawningFactory = new SpawningFactory();
  }

  create() {
    this.gameObjects.push(this.dino);
    this.textObjects.push(
      new TextObject(
        this.game.gameConfig.canvasWidth / 2 - 480,
        this.game.gameConfig.canvasHeight / 2,
        "Press Space Bar to begin running"
      ),
      (this.scoreText = new TextObject(
        820,
        50,
        scoreHandler.scoreToText(this.score)
      )),
      (this.hiScoreText = new TextObject(
        550,
        50,
        scoreHandler.scoreToText(this.hiScore)
      ))
    );
    this.speed = 10;
    this.camera.follow(this.dino);
    this.name = "GamePlayScene";
    // this.input = new DefineInput().createCursor;
    // this.background = "./assets/ground.png";
    // this.scoreHandler = new ScoreHandler();
    // this.eventHandler = new EventHandler();
  }

  update(time, delta) {
    // this.dino.update(time,delta);
    this.gameObjects.map(obj=>obj.update(time,delta))
    if (this.enemies.length < 1) {
      const newEnemyProperty = this.spawningFactory.getRamdomEnemy();
      const newEnemyImg = new Image(30, 30);
      newEnemyImg.src = newEnemyProperty.image;
      const x =
        this.game.gameConfig.canvasWidth +
        this.game.gameConfig.canvasWidth * Math.random() +
        this.dino.x;
      let y;
      if (!newEnemyProperty.fly) {
        y = this.game.renderer.canvas.height - newEnemyProperty.h;
      } else {
        y = 433 * Math.random();
      }
      const enemy = new Enemy(
        this,
        newEnemyImg,
        newEnemyProperty?.w,
        newEnemyProperty?.h,
        x,
        y,
        newEnemyProperty.fly
      );
      this.enemies.push(enemy);
      this.gameObjects.push(enemy);
    }
    else {
      this.enemies.map(enemy => {
        if(enemy.x < this.camera.x -100) {
          this.enemies = [];
          this.gameObjects = this.gameObjects.filter(obj => obj == this.dino);
        }
      })
    }
    this.camera.follow(this.dino);
    this.gameObjects.map(obj=>obj.setRelativePosision(this.camera));
  }
}
