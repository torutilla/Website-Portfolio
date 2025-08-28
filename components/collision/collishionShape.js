import Vector2 from "../math/vector.js";

export default class CollisionShape{
    /**
     * @param {Vector2} position 
     * @param {Vector2} size 
     */
    constructor(position, size){
        this.position = position;
        this.size = size;   
    }
    
    getAABB(){
        return {x: this.position.x, y: this.position.y, w: this.size.x, h: this.size.y};
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