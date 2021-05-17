import Scene from "../SuperiorPhaser/Scene";
import { Camera, TextObject, Dino } from "../GameObject";
import { scoreHandler } from "../Util/ScoreHandler";

export default class GameplayScene extends Scene {
  dino?: Dino;
  camera?: Camera;
  score = 0;
  hiScore = 0;
  scoreText?: TextObject;
  hiScoreText?: TextObject;
  speed = 10;

  create() {
    this.gameObjects.push(
      (this.dino = new Dino(new Image(30, 30), 100, 100, 0, 510))
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
    // this.gameWorld = new GameWorld()
    this.camera = new Camera(100, 100, 0, 0);
    this.speed = 10;
    this.name = "GamePlayScene";
    this.input = new DefineInput().createCursor;
    this.background = "./assets/ground.png";
    this.spawningFactory = new SpawningFactory();
    this.scoreHandler = new ScoreHandler();
    this.eventHandler = new EventHandler();
    this.animationController = new AnimationController();
  }

  update() {
    this.dino.update();
    this.camera?.follow(this.dino);
    this.birds.forEach(bird.update());
  }
}
