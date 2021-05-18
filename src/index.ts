import GameplayScene from "./Scene/GamePlayScene";
import { GameConfig } from "./const/const";
import Game from "./SuperiorPhaser/Game";


const gameConfig:GameConfig = {
    canvasWidth: 1000,
    canvasHeight: 580,
    scenes: [GameplayScene],
}
const app = new Game(gameConfig);
app.start();