import Game from "./SuperiorPhaser/Game";
import GamePlay from "./Scene/GamePlay";


const app = new Game();
app.start();
const gamePlayScene = new GamePlay();
gamePlayScene.conductGamePlay(gamePlayScene.state);