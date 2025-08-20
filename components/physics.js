import Vector2 from "./math/vector.js"
class Physics {
    constructor(entity, gravity){
        this.entity = entity;
        this.velocity = Vector2.ZERO;
        this.gravity = gravity;
    }
    
}