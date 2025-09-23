import Circle from "../math/circle.js";
import Rect from "../math/rect.js";
import Collision from "./collision.js";
import RectCollisionShape from "./rectCollisionShape.js";
export default class CircleCollisionShape extends Collision{
    /**@param {Circle} circle  */
    constructor(circle){
        super();
        this.circle = circle;
    }
    getAABB(){
        return new Rect(
            this.circle.center.x - this.circle.radius, 
            this.circle.center.y - this.circle.radius, 
            this.circle.radius * 2, this.circle.radius * 2
        );
    }
    /** @param {Collision} other  */
    collidesWith(other){
        if (other instanceof RectCollisionShape) return this.circle.instersectsRect(other.rect);
        if(other instanceof CircleCollisionShape) return this.circle.intersectsCircle(other.circle);
    }
    updatePosition(pos){
        this.circle.center = pos;
    }

    debugDraw(ctx){
        this.circle.draw(ctx);
    }
}