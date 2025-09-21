import Vector2 from "../math/vector.js";
import Rect from "../math/rect.js";
import Collision from "./collision.js";
export default class RectCollisionShape extends Collision{
    /**
     * @param {Rect} rect
     */
    constructor(rect){
        super();
        this.rect = rect;
        this.position = new Vector2(rect.x, rect.y);
    }
    
    getAABB(){
        this.rect.x = this.position.x;
        this.rect.y = this.position.y;
        return this.rect;
    }
    /**@param {Vector2} pos  */
    updatePosition(pos){
        this.rect.x = pos.x;
        this.rect.y = pos.y;
        this.position = pos;
    }
    /**
     * @param {RectCollisionShape} obj 
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