import { dinoRun } from "../Animation/DinoAnimation";
import State, { GameStatus } from "../InferiorPhaser/State";

export default class EventHandler {
    constructor() {}

    setGameStatus( state: State,status: GameStatus) {
        switch (status) {
            case GameStatus.Ready:
                 state.gameStatus = GameStatus.Ready;
                break;
            case GameStatus.Start:
                 state.gameStatus = GameStatus.Start;
                break;
            case GameStatus.IsRunning:
                 state.gameStatus = GameStatus.IsRunning;
                break;
            case GameStatus.GameOver:
                 state.gameStatus = GameStatus.GameOver;
                break;
        }
    }

    rePlay( state: State) {
        this.setGameStatus(state,GameStatus.IsRunning);
         state.enemies = [];
         state.score = 0;
         state.speed = 10;
         state.allowHighScore = false;
         state.dino.x = 0;
         state.dino.y = 480;
         state.dino.dinoBody.velocity.y = 0;
         state.camera.camPosX =  state.gameWorld.canvas.width/2;
         state.camera.camPosY =  state.gameWorld.canvas.height/2
    }

    startGame( state: State) {
        this.setGameStatus(state,GameStatus.Start);
         state.dino.currentAnimation = dinoRun;
        window.setTimeout(()=>{
            this.setGameStatus(state,GameStatus.IsRunning)
        },2000);
    }
}