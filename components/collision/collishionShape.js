import Vector2 from "../math/vector.js";

let counter = 0;
export default class CollisionShape{
    /**
     * @param {Vector2} position 
     * @param {Vector2} size 
     */
    constructor(position, size){
        this.id = `CollisionShape_${counter++}`;
        this.position = position;
        this.size = size;   
    }
    
    getAABB(){
        return {x: this.position.x, y: this.position.y, w: this.size.x, h: this.size.y};
    }

    /**
     * 
     * @param {CollisionShape} obj 
     * @returns boolean
     */
    collidesWith(obj){
        const objAabb = obj.getAABB();
        return (
            this.position.x < objAabb.x + objAabb.w &&
            this.position.x + this.size.x > objAabb.x &&
            this.position.y < objAabb.y + objAabb.h &&
            this.position.y + this.size.y > objAabb.y
        );
    }
}