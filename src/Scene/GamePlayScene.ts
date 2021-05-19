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
import { Key } from "../const/KeyInput";

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
  gameOverButton: GameObject;
  gameOverText: GameObject;
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

    this.gameOverText = new GameObject(
      this,
      new Image(30, 30),
      380,
      21,
      this.game.gameConfig.canvasWidth / 2 - 190,
      this.game.gameConfig.canvasHeight / 2 - 80
    );

    this.gameOverButton = new GameObject(
      this,
      new Image(30, 30),
      144,
      128,
      this.game.gameConfig.canvasWidth / 2 - 72,
      this.game.gameConfig.canvasHeight / 2 - 20
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
    this.gameOverText.getImage().src = "./assets/game-over.png";
    this.gameOverButton.getImage().src = "./assets/restart.png";
    this.gameObjects.push(this.dino);
    this.backgroundObjects.push(this.background1, this.background2);
    this.camera.follow(this.dino);
    // this.game.renderer.canvas.click()
  }

  update(time: number, delta: number) {
    if (this.gameStatus == GameStatus.IsRunning) {
      this.handleGameRunning(time, delta);
    } else if (this.gameStatus == GameStatus.Ready) {
      this.handleGameReady();
    } else if (this.gameStatus == GameStatus.GameOver) {
      this.handleGameOver();
    } else {
      this.dino.currentAnimation?.countFrame();
    }
  }

  handleGameRunning(time, delta) {
    this.distance -= this.dino.velocity.x;
    if (Math.abs(this.distance) >= this.game.gameConfig.canvasWidth) {
      this.distance = 0;
    }
    this.background1.x = this.distance;
    this.background2.x = this.game.gameConfig.canvasWidth + this.distance;
    this.gameObjects.map((obj) => obj.update(time, delta));
    if (this.enemies.length < 1) {
      this.initiateEnemies();
    } else {
      this.destroyEnemy();
    }
    this.camera.follow(this.dino);
    this.gameObjects.map((obj) => obj.setRelativePosision(this.camera));
    this.raisingScore();
  }

  raisingScore() {
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
    else{
      this.allowHighScore = false;
    }

    if (
      this.allowHighScore &&
      !this.renderChecking(this.hiScoreText, this.textObjects)
    )
      this.textObjects.push(this.hiScoreText);
  }

  initiateEnemies() {
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

  destroyEnemy() {
    this.enemies.map((enemy) => {
      if (enemy.x < this.camera.x - 100) {
        this.enemies = [];
        this.gameObjects = this.gameObjects.filter((obj) => obj == this.dino);
      }
      if (this.dino.collisionWith(enemy)) {
        this.dino.die();
        this.gameStatus = GameStatus.GameOver;
      }
    });
  }

  handleGameReady() {
    this.dino.setRelativePosision(this.camera);
    this.textObjects.push(
      (this.beginText = new TextObject(
        this.game.gameConfig.canvasWidth / 2 - 480,
        this.game.gameConfig.canvasHeight / 2,
        "Press Space Bar to begin running"
      ))
    );
    if (this.game.inputManager.getKey(Key.SPACE)) {
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
  }

  handleGameOver() {
    if (!this.renderChecking(this.hiScoreText, this.textObjects))
      this.textObjects.push(this.hiScoreText);

    if (!this.renderChecking(this.gameOverText, this.backgroundObjects))
      this.backgroundObjects.push(this.gameOverText);

    if (!this.renderChecking(this.gameOverButton, this.backgroundObjects))
      this.backgroundObjects.push(this.gameOverButton);

    if (this.game.inputManager.getKey(Key.SPACE)) {
      this.backgroundObjects.pop();
      this.backgroundObjects.pop();
      this.textObjects.pop();
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
  }

  renderChecking(renderObject, renderObjectArray) {
    if (renderObjectArray.filter((obj) => obj == renderObject).length > 0)
      return true;
    return false;
  }
}
