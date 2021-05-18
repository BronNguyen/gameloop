import Scene from "../SuperiorPhaser/Scene";
import {
  Camera,
  TextObject,
  Dino,
  SpawningFactory,
  Enemy,
  GameObject,
} from "../GameObject";
import { scoreHandler } from "../Util/ScoreHandler";
import SceneManager from "SuperiorPhaser/SceneManager";
import { GameStatus } from "../const/GameStatus";

export default class GameplayScene extends Scene {
  dino: Dino;
  enemies: Enemy[] = [];
  camera: Camera;
  spawningFactory: SpawningFactory;
  gameStatus = GameStatus.Ready;
  score = 0;
  hiScore = 0;
  scoreText: TextObject;
  hiScoreText: TextObject;
  beginText?: TextObject;
  allowHighScore = false;
  background1: GameObject;
  background2: GameObject;
  distance = 0;

  constructor(sceneManager: SceneManager, name: string) {
    super(sceneManager, name);
    this.dino = new Dino(this, new Image(30, 30), 100, 100, 0, 480);
    this.background1 = new GameObject(
      this,
      new Image(30, 30),
      this.game.gameConfig.canvasWidth,
      26,
      this.distance,
      this.game.gameConfig.canvasHeight - 28
    );
    this.background2 = new GameObject(
      this,
      new Image(30, 30),
      this.game.gameConfig.canvasWidth,
      26,
      this.game.gameConfig.canvasWidth + this.distance,
      this.game.gameConfig.canvasHeight - 28
    );
    this.camera = new Camera(100, 100, 0, 0);
    this.spawningFactory = new SpawningFactory();
    this.scoreText = new TextObject(
      820,
      50,
      scoreHandler.scoreToText(this.score)
    );
    this.hiScoreText = new TextObject(
      550,
      50,
      "HI " + scoreHandler.scoreToText(this.hiScore)
    );
  }

  create() {
    this.background1.getImage().src = "./assets/ground.png";
    this.background2.getImage().src = "./assets/ground.png";
    this.gameObjects.push(this.dino);
    this.backgroundObjects.push(this.background1, this.background2);
    this.camera.follow(this.dino);
    this.name = "GamePlayScene";
  }

  update(time, delta) {
    if (this.gameStatus == GameStatus.IsRunning) {
      this.distance -= this.dino.velocity.x;
      if (Math.abs(this.distance) >= this.game.gameConfig.canvasWidth) {
        this.distance = 0;
      }
      this.background1.x = this.distance;
      this.background2.x = this.game.gameConfig.canvasWidth + this.distance;
      this.gameObjects.map((obj) => obj.update(time, delta));
      this.score += 0.25;
      this.scoreText.content = scoreHandler.scoreToText(Math.floor(this.score));
      this.hiScoreText.content =
        "HI " + scoreHandler.scoreToText(Math.floor(this.hiScore));
      if (this.score % 100 === 0) {
        this.dino.roar();
      }
      if (this.hiScore < this.score) {
        this.hiScore = this.score;
        this.allowHighScore = true;
      }
      !this.allowHighScore
        ? (this.hiScoreText.y = 1000)
        : (this.hiScoreText.y = 50);
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
      } else {
        this.enemies.map((enemy) => {
          if (enemy.x < this.camera.x - 100) {
            this.enemies = [];
            this.gameObjects = this.gameObjects.filter(
              (obj) => obj == this.dino
            );
          }
          if (this.dino.collisionWith(enemy)) {
            this.dino.die();
            this.gameStatus = GameStatus.GameOver;
          }
        });
      }
      this.camera.follow(this.dino);
      this.gameObjects.map((obj) => obj.setRelativePosision(this.camera));
    } else if (this.gameStatus == GameStatus.Ready) {
      this.dino.setRelativePosision(this.camera);
      this.textObjects.push(
        (this.beginText = new TextObject(
          this.game.gameConfig.canvasWidth / 2 - 480,
          this.game.gameConfig.canvasHeight / 2,
          "Press Space Bar to begin running"
        ))
      );
      if (this.game.inputManager.queue.pop() == " ") {
        //start game
        this.gameStatus = GameStatus.Start;
        this.dino.changeAnimation("start");
        window.setTimeout(() => {
          this.gameStatus = GameStatus.IsRunning;
          this.textObjects = [];
          this.textObjects.push(
            (this.scoreText = new TextObject(
              820,
              50,
              scoreHandler.scoreToText(this.score)
            )),
            (this.hiScoreText = new TextObject(
              550,
              50,
              "HI " + scoreHandler.scoreToText(this.hiScore)
            ))
          );
        }, 500);
      }
    } else if (this.gameStatus == GameStatus.GameOver) {
      this.allowHighScore = true;
      if (this.game.inputManager.queue.pop() == " ") {
        this.gameStatus = GameStatus.IsRunning;
        this.enemies = [];
        this.gameObjects = this.gameObjects.filter((obj) => obj == this.dino);
        this.score = 0;
        this.dino.velocity.x = 10;
        this.allowHighScore = false;
        this.dino.x = 0;
        this.dino.y = 480;
        this.dino.velocity.y = 0;
      }
    } else {
      this.dino.currentAnimation?.countFrame();
    }
  }
}
