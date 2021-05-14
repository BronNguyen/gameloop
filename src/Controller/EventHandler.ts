import State from "../InferiorPhaser/State";

export default class EventHandler {
    constructor() {}

    GameStart(state:State) {
        state.isGameRunning = false;
        state.gameOver = false;
        state.newGame = true;
    }

    GameOver(state:State) {
        state.gameOver = true;
        state.isGameRunning = false;
    }

    RePlay(state:State) {
        state.isGameRunning = true;
        state.gameOver = false;
        state.enemies = [];
        state.score = 0;
        state.speed = 10;
        state.allowHiScore = false;
        state.dino.x = 0;
        state.dino.y = 480;
        state.camera.camPosX = state.gameWorld.canvas.width/2;
        state.camera.camPosY = state.gameWorld.canvas.height/2
    }

    PrePlaying(state:State) {
        state.dino.x = 0;
        state.speed = 2;
    }
}