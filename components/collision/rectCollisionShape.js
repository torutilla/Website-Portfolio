import Vector2 from "../math/vector.js";
import Rect from "../math/rect.js";
import Collision from "./collision.js";
import CircleCollisionShape from "./CircleCollisionShape.js"; 
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

    onCollision(other){
        if(other instanceof RectCollisionShape) this.#onRectCollision(other);
        if(other instanceof CircleCollisionShape) this.#onCircleCollision(other);
    }
    /**
     * @param {RectCollisionShape} other 
     */
    #onRectCollision(other){
        const a = this;
        const b = other;
        const dx = (a.position.x + a.shape.width / 2) - (b.position.x + b.shape.width / 2);
        const dy = (a.position.y + a.shape.height / 2) - (b.position.y + b.shape.height / 2);
        const overlapX = (a.shape.width / 2 + b.shape.width / 2) - Math.abs(dx);
        const overlapY = (a.shape.height / 2 + b.shape.height / 2) - Math.abs(dy);

        if(overlapX > 0 && overlapY > 0){
            if(overlapX < overlapY){
                a.position.x += dx > 0? overlapX : -overlapX
                this.physics.velocity.x = 0;
            }else{
                if(dy > 0){
                    a.position.y += overlapY; 
                }else{
                    a.position.y -= overlapY;
                    this.isGrounded = true;
                }
                this.physics.velocity.y = 0;
            }
        } 
    }
    /**@param {CircleCollisionShape} other  */
    #onCircleCollision(other){
        const closestX = Math.max(this.rect.x, Math.min(other.shape.center.x, this.rect.x + this.rect.width));
        const closestY = Math.max(this.rect.y, Math.min(other.shape.center.y, this.rect.y + this.rect.height));

        const dx = other.shape.center.x - closestX;
        const dy = other.shape.center.y - closestY;

        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        const overlap = other.shape.radius - dist;

        if(overlap > 0){
            
        }
    }
}