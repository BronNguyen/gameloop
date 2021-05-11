import PhysicsBody from "./PhysicBody";
import Vector2 from "./Vector2";

export default function Update(time,delta) {
    let dinoBody = new PhysicsBody(12.3,5.2,6000)

    const newPosition = () => {
        const x = dinoBody.ConsequentVelocity().x * delta;
        const y = dinoBody.ConsequentVelocity().y* delta;

        return new Vector2(x,y);
    }
}