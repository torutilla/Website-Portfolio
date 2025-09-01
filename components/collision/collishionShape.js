import Vector2 from "../math/vector.js";
import Rect from "../math/rect.js";
let counter = 0;
export default class CollisionShape{
    /**
     * @param {Rect} rect
     */
    constructor(rect){
        this.id = `CollisionShape_${counter++}`;
        this.rect = rect;
        this.position = new Vector2(rect.x, rect.y);
    }
    
    getAABB(){
        return this.rect;
    }

    /**
     * 
     * @param {CollisionShape} obj 
     * @returns boolean
     */
    collidesWith(obj){
        const objAabb = obj.getAABB();
        return (
            this.rect.x < objAabb.x + objAabb.width &&
            this.rect.x + this.rect.width > objAabb.x &&
            this.rect.y < objAabb.y + objAabb.height &&
            this.rect.y + this.rect.height > objAabb.y
        );
    }
    /** @param {CanvasRenderingContext2D} ctx */
    debugDraw(ctx){
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.position.x, this.position.y, this.rect.width, this.rect.height);
        ctx.restore();
    }
}