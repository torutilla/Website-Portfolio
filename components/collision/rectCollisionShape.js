import Vector2 from "../math/vector.js";
import Rect from "../math/rect.js";
import Collision from "./collision.js";
import CircleCollisionShape from "./circleCollisionShape.js"; 

export default class RectCollisionShape extends Collision{
    /**
     * @param {Rect} shape
     */
    constructor(shape){
        super();
        this.shape = shape;
        this.position = new Vector2(shape.x, shape.y);
    }
    
    getAABB(){
        this.shape.x = this.position.x;
        this.shape.y = this.position.y;
        return this.shape;
    }
    /**@param {Vector2} pos  */
    updatePosition(pos){
        this.shape.x = pos.x;
        this.shape.y = pos.y;
        this.position = pos;
    }
    /**
     * @param {Collision} obj 
     * @returns boolean
     */
    collidesWith(obj){
        super.collidesWith(obj);
        if(obj instanceof RectCollisionShape){
            return obj.shape.intersects(this.shape);
        }else if(obj instanceof CircleCollisionShape){
            return obj.shape.instersectsRect(this.shape);
        }
        return false;
    }
    /** @param {CanvasRenderingContext2D} ctx */
    debugDraw(ctx){
        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = 1;
        ctx.strokeRect(this.position.x, this.position.y, this.shape.width, this.shape.height);
        ctx.restore();
    }

    
}