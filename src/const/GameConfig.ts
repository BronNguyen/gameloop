import Scene from "../SuperiorPhaser/Scene";

export interface GameConfig {
    canvasWidth: number;
    canvasHeight: number;
    scenes: [typeof Scene];
}