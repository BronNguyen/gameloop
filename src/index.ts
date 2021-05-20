import GameScene from "./Scene/GameScene";
import { GameConfig } from "./const/const";
import Game from "./SuperiorPhaser/Game";


const gameConfig:GameConfig = {
    canvasWidth: 1000,
    canvasHeight: 580,
    scenes: [GameScene],
}
const app = new Game(gameConfig);
app.start();