import Dino from "./GameObject/Dino";
import Camera from "./GameObject/Camera";
import GameWorld from "./GameWorld";
import DefineInput from "./Util/DefineInput";

export default class State {
    dino: Dino;
    camera: Camera;
    gameWorld: GameWorld;
    input: DefineInput;
    isGameRunning;

    constructor() {
        this.dino = new Dino(new Image(30,30),100, 100, 0, 550);
        this.gameWorld = new GameWorld()
        this.camera = new Camera(this.gameWorld.canvas.width, this.gameWorld.canvas.height, this.gameWorld.canvas.width/2,this.gameWorld.canvas.height/2);
        this.input = new DefineInput();
        this.isGameRunning = true;
    }
}