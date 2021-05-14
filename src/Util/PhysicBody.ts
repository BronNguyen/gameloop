import Vector2 from "./Vector2";

export default class PhysicsBody {
    mass = 1;
    takeOffTime = 0;
    //motivation tells that how much frames the dino can keep his velocity
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

    GravityForce (gravity) {
        return this.mass * gravity;
    }

    FallingVelocity(gravity) {
        return this.takeOffTime * gravity;
    }

    ConsequentVelocity (gravity) {
        const velX = this.velocity.x;
        const VelY = this.velocity.y - this.FallingVelocity(gravity) ;
        return new Vector2(velX,VelY);
    }
}