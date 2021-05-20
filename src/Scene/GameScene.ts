import Scene from "../SuperiorPhaser/Scene";
import {
  Camera,
  TextObject,
  Dino,
  SpawningFactory,
  Enemy,
  GameObject,
  GameButton,
} from "../GameObject";
import { scoreHandler } from "../Util/ScoreHandler";
import SceneManager from "SuperiorPhaser/SceneManager";
import { GameStatus } from "../const/GameStatus";
import { Key } from "../const/KeyInput";

export default class GameScene extends Scene {
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
  gameOverButton: GameButton;
  upButton: GameButton;
  downButton: GameButton;
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

    this.gameOverButton = new GameButton(
      this,
      new Image(30, 30),
      144,
      128,
      this.game.gameConfig.canvasWidth / 2 - 72,
      this.game.gameConfig.canvasHeight / 2 - 20
    );

    this.upButton = new GameButton(this, new Image(30, 30), 100, 100, 100, 100);

    this.downButton = new GameButton(
      this,
      new Image(30, 30),
      100,
      100,
      this.game.gameConfig.canvasWidth - 200,
      100
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
    this.upButton.getImage().src = "./assets/up-arrow.png";
    this.downButton.getImage().src = "./assets/down-arrow.png";
    this.gameObjects.push(this.dino);
    this.backgroundObjects.push(this.background1, this.background2);
    this.gameButtonObjects.push(this.upButton, this.downButton);
    this.camera.follow(this.dino);
    // this.game.renderer.canvas.click()
    // this.game.inputManager.addListener("keyup", this.handleFly)
  }

  handleKeyup(key) {
    if (key === Key.SPACE) {
      // this.jump()
    }
  }

  update(time: number, delta: number) {
    if (this.gameStatus == GameStatus.IsRunning) {
      this.handleGameRunning(time, delta);
    } else if (this.gameStatus == GameStatus.Ready) {
      this.handleGameReady();
    } else if (this.gameStatus == GameStatus.GameOver) {
      this.handleGameOver(time, delta);
    } else {
      this.dino.currentAnimation?.countFrame();
    }
  }

  handleGameRunning(time, delta) {


    // this.game.inputManager.eventTarget.dispatchEvent(this.game.inputManager.event)

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
    this.handleButton();
  }

  handleButton() {
    if(this.upButton.beClicked()){
      this.dino.jump();
    }
    if(this.downButton.beClicked()) {
      this.dino.duck();
    }
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
    } else {
      this.allowHighScore = false;
    }

    if (
      this.allowHighScore &&
      !this.inArray(this.hiScoreText, this.textObjects)
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

  handleGameOver(time, delta) {
    this.gameButtonObjects.map((btn) => btn.update(time, delta));
    if (!this.inArray(this.hiScoreText, this.textObjects))
      this.textObjects.push(this.hiScoreText);

    if (!this.inArray(this.gameOverText, this.backgroundObjects))
      this.backgroundObjects.push(this.gameOverText);

    this.gameButtonObjects.pop();
    this.gameButtonObjects.pop();

    if (!this.inArray(this.gameOverButton, this.gameButtonObjects))
      this.gameButtonObjects.push(this.gameOverButton);

    if (
      this.game.inputManager.getKey(Key.SPACE) ||
      this.gameOverButton.beClicked()
    ) {
      //remove the gameobject from rendering group, so they wont be rendered
      this.backgroundObjects.pop();
      this.gameButtonObjects.pop();
      this.textObjects.pop();

      if (!this.inArray(this.upButton, this.gameButtonObjects))
        this.gameButtonObjects.push(this.upButton);

      if (!this.inArray(this.downButton, this.gameButtonObjects))
        this.gameButtonObjects.push(this.downButton);

      //set the game to inital state
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

  inArray(renderObject, renderObjectArray) {
    //check if the object is already rendered or not
    if (renderObjectArray.filter((obj) => obj == renderObject).length > 0)
      return true;
    return false;
  }
}
