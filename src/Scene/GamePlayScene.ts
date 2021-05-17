import Scene from "../SuperiorPhaser/Scene";
import { Camera, TextObject, Dino, SpawningFactory, Enemy } from "../GameObject";
import { scoreHandler } from "../Util/ScoreHandler";
import SceneManager from "SuperiorPhaser/SceneManager";

export default class GameplayScene extends Scene {
  dino?: Dino;
  enemies: Enemy[] = [];
  camera?: Camera;
  spawningFactory?: SpawningFactory
  score = 0;
  hiScore = 0;
  scoreText?: TextObject;
  hiScoreText?: TextObject;
  speed = 10;

  constructor(sceneManager: SceneManager, name: string) {
    super(sceneManager, name);
    this.create();
  }

  create() {
    this.gameObjects.push(
      (this.dino = new Dino(this,new Image(30, 30), 100, 100, 0, 510))
    );
    this.textObjects.push(
      new TextObject(
        this.game.renderer.canvas.width / 2 + 30,
        this.game.renderer.canvas.height / 2,
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
    this.camera = new Camera(100, 100, 0, 0);
    this.speed = 10;
    this.name = "GamePlayScene";
    this.spawningFactory = new SpawningFactory();
    this.input = new DefineInput().createCursor;
    this.background = "./assets/ground.png";
    this.spawningFactory = new SpawningFactory();
    this.scoreHandler = new ScoreHandler();
    this.eventHandler = new EventHandler();
    this.animationController = new AnimationController();
  }

  update(time,delta) {
    this.dino?.update(time,delta);
    if(this.enemies.length < 1) {
      const newEnemyProperty = this.spawningFactory?.getRamdomEnemy();
      const newEnemyImg = new Image(30,30);
      newEnemyImg.src = newEnemyProperty?.image;
      const enemy = new Enemy(this, new Image(30,30),newEnemyProperty?.w,newEnemyProperty?.h,newEnemyProperty.)
    }
    this.camera?.follow(this.dino);
    this.birds.forEach(bird.update());
  }
}
