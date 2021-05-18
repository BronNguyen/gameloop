import GameplayScene from "../Scene/GamePlayScene";
import Game from "./Game";

export default class StepManager {
    game: Game;
    constructor(game: Game) {
        this.game = game;
        // this.game.sceneManager.add(new PreloadScenee(game.sceneManager,"PreloadScene"))
        const newScene = new GameplayScene(game.sceneManager,"GamePlayScene");
        console.log(newScene);
        this.game.sceneManager.add(newScene)
        this.game.sceneManager.switchScene(this.game.sceneManager.scenes[0]);
    }

    update(time: number, delta: number) {
        this.game.sceneManager.update(time, delta);
    }
}