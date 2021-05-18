import Game from "./Game";

export default class StepManager {
    game: Game;
    constructor(game: Game) {
        this.game = game;
    }

    update(time: number, delta: number) {
        this.game.sceneManager.update(time, delta);
    }
}