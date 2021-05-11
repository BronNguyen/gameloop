import GameWorld from "../GameWorld";
import SuperConsoleLog from "./SuperConsoleLog";
import Vector2 from "./Vector2";

export default class PhysicsBody {
    mass = 0;
    //motivation tells that how much frames the dino can keep his velocity
    motivationY = 0;
    velocity = new Vector2(0,0);

    constructor(mass) {
        this.mass = mass;
    }

    setVelocity(x,y) {
        this.velocity =  new Vector2(x, y);
    }

    setVelocityX(x) {
        this.velocity =  new Vector2(x, this.velocity.y);
    }

    setVelocityY(y) {
        this.velocity =  new Vector2(this.velocity.x, y);
    }

    GravityForce() {
        return this.mass * GameWorld.gravity;
    }

    setMotivationY(number) {
        this.motivationY = number;
    }

    ConsequentVelocity () {
        const velX = this.velocity.x;
        const VelY = - this.velocity.y + this.GravityForce();
        return new Vector2(velX,VelY);
    }
}