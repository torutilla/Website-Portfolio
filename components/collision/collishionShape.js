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
        this.collisionBlocking = true;
    }
    
    getAABB(){
        this.rect.x = this.position.x;
        this.rect.y = this.position.y;
        return this.rect;
    }

    /**
     * @param {CollisionShape} obj 
     * @returns boolean
     */
    collidesWith(obj){
        return (
            this.position.x < obj.position.x + obj.rect.width &&
            this.position.x + this.rect.width > obj.position.x &&
            this.position.y < obj.position.y + obj.rect.height &&
            this.position.y + this.rect.height > obj.position.y
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