import Dino from "../GameObject/Dino";
import Camera from "../GameObject/Camera";
import GameWorld from "../Util/GameWorld";
import DefineInput from "../Util/DefineInput";
import Enemy from "../GameObject/Enemy";
import SpawningFactory from "../GameObject/SpawningFactory";

export default class State {
    dino: Dino;
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
    isGameRunning;

    constructor() {
        this.dino = new Dino(new Image(30,30),100, 100, 0, 550);
        this.gameWorld = new GameWorld()
        this.camera = new Camera(this.gameWorld.canvas.width, this.gameWorld.canvas.height, this.gameWorld.canvas.width/2,this.gameWorld.canvas.height/2);
        this.speed = 10;
        this.input = new DefineInput();
        this.isGameRunning = true;
        this.background = "./assets/ground.png";
        this.spawningFactory = new SpawningFactory();
        // new Sprite(new Image(30,30),this.gameWorld.canvas.width,26,this.gameWorld.canvas.width/2,this.gameWorld.canvas.height+13);
    }
}