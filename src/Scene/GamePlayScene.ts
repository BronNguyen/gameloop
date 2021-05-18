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
import { GameStatus } from "../const/GameStatus";

export default class GameplayScene extends Scene {
  dino: Dino;
  enemies: Enemy[] = [];
  killer!: Enemy;
  camera: Camera;
  spawningFactory: SpawningFactory;
  gameStatus = GameStatus.Ready;
  score = 0;
  hiScore = 0;
  scoreText?: TextObject;
  hiScoreText?: TextObject;
  beginText?: TextObject;
  speed = 10;

  constructor(sceneManager: SceneManager, name: string) {
    super(sceneManager, name);
    this.dino = new Dino(this, new Image(30, 30), 100, 100, 0, 480);
    this.camera = new Camera(100, 100, 0, 0);
    this.spawningFactory = new SpawningFactory();
  }

  create() {
    this.gameObjects.push(this.dino);
    // this.textObjects.push(
    //   (this.scoreText = new TextObject(
    //     820,
    //     50,
    //     scoreHandler.scoreToText(this.score)
    //   )),
    //   (this.hiScoreText = new TextObject(
    //     550,
    //     50,
    //     scoreHandler.scoreToText(this.hiScore)
    //   ))
    // );
    this.speed = 10;
    this.camera.follow(this.dino);
    this.name = "GamePlayScene";
    // this.background = "./assets/ground.png";
    // this.scoreHandler = new ScoreHandler();
    // this.eventHandler = new EventHandler();
  }

  update(time, delta) {
    if (this.gameStatus == GameStatus.IsRunning) {
      this.gameObjects.map((obj) => obj.update(time, delta));
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
            this.killer = enemy;
            // state.eventHandler.setGameStatus(state, GameStatus.GameOver);
          }
        });
      }
      this.camera.follow(this.dino);
      this.gameObjects.map((obj) => obj.setRelativePosision(this.camera));
    }
    else if(this.gameStatus == GameStatus.Ready) {
      this.dino.setRelativePosision(this.camera);
      this.textObjects.push(
        this.beginText = new TextObject(
          this.game.gameConfig.canvasWidth / 2 - 480,
          this.game.gameConfig.canvasHeight / 2,
          "Press Space Bar to begin running"
        ))
      if(this.game.inputManager.queue.pop()== " "){
        //start game
        
      }
    }
    else if (this.gameStatus == GameStatus.GameOver) {
      //game over
    } else {
      //handle start
    }
  }
}
