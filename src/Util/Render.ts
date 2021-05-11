import {dino} from "../Dino";
import GameWorld from "../GameWorld";
import Update from "./Update";


function Clear() {
    GameWorld.context.clearRect(0,0,GameWorld.canvas.width,GameWorld.canvas.height);
}

export default function Render() {
    Clear();
    const context = GameWorld.context;
    dino.reDraw(context);
}