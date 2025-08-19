import Vector2 from "./math/vector.js"
class Physics{
    constructor(position, gravity){
        this.position = position;
        this.velocity = Vector2.ZERO;
        this.gravity = gravity;
    }
}