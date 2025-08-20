import Vector2 from "./math/vector.js"
export default class Physics {
    constructor(entity, gravity){
        this.entity = entity;
        this.velocity = Vector2.ZERO;
        this.gravity = gravity;
    }
    
}