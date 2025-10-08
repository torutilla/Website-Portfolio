import Circle from "../math/circle.js";
import Rect from "../math/rect.js";
import Collision from "./collision.js";
import RectCollisionShape from "./rectCollisionShape.js";
export default class CircleCollisionShape extends Collision{
    /**@param {Circle} shape  */
    constructor(shape){
        super();
        this.shape = shape;
    }
    getAABB(){
        return new Rect(
            this.shape.center.x - this.shape.radius, 
            this.shape.center.y - this.shape.radius, 
            this.shape.radius * 2, this.shape.radius * 2
        );
    }
    /** @param {Collision} other  */
    collidesWith(other){
        if (other instanceof RectCollisionShape) return this.shape.instersectsRect(other.shape);
        if(other instanceof CircleCollisionShape) return this.shape.intersectsCircle(other.shape);
    }
    updatePosition(pos){
        this.shape.center = pos;
    }

    debugDraw(ctx){
        this.shape.draw(ctx);
    }
}