import GamePlay from "./Scene/GamePlay";

const gamePlayScene = new GamePlay();
gamePlayScene.ConductGamePlay(gamePlayScene.state);