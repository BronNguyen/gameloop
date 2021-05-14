import Dino from "../GameObject/Dino";
import Camera from "../GameObject/Camera";
import GameWorld from "../Util/GameWorld";
import DefineInput from "../Util/DefineInput";
import Enemy from "../GameObject/Enemy";
import SpawningFactory from "../GameObject/SpawningFactory";
import ScoreHandler from "../Util/ScoreHandler";
import EventHandler from "../Controller/EventHandler";
import AnimationController from "../Controller/AnimationController";

export enum GameStatus {
    Start = "start",
    Ready = "is ready",
    IsRunning = "is running",
    GameOver = "game over",
}
export default class State {
    dino : Dino;
    //this recorded bg's image
    background: string;
    //this recorded how far bg has gone
    distance = 0;
    //enemy array
    enemies: Enemy[] = [];
    speed: number;
    camera: Camera;
    gameWorld: GameWorld;
    input: DefineInput;
    spawningFactory: SpawningFactory;
    hiScore = 0;
    score = 0;
    departX = 0;
    scoreHandler: ScoreHandler;
    eventHandler: EventHandler;
    allowHighScore =  false;
    animationController: AnimationController;
    theKiller!: Enemy;
    gameStatus = GameStatus.Ready;

    constructor() {
        this.dino = new Dino(new Image(30,30),100, 100, 0, 480);
        this.gameWorld = new GameWorld()
        this.camera = new Camera(this.gameWorld.canvas.width, this.gameWorld.canvas.height, this.gameWorld.canvas.width/2,this.gameWorld.canvas.height/2);
        this.speed = 20;
        this.input = new DefineInput();
        this.gameStatus = GameStatus.Ready;
        this.background = "./assets/ground.png";
        this.spawningFactory = new SpawningFactory();
        this.scoreHandler = new ScoreHandler();
        this.eventHandler = new EventHandler();
        this.animationController = new AnimationController();
    }
}