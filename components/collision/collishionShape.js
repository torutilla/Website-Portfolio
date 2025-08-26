import Vector2 from "../math/vector.js";

export default class CollisionShape{
    constructor(position, size){
        this.position = position;
        this.size = size;   
    }
    collidesWith(obj){
        return (
            this.position.x < obj.position.x + obj.size.x &&
            this.position.x + this.size.x > obj.position.x &&
            this.position.y < obj.position.y + obj.size.y &&
            this.position.y + this.size.y > obj.position.y
        );
    }
}