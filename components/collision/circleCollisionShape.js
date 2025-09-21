import Circle from "../math/circle.js";
import Collision from "./collision.js";
import RectCollisionShape from "./rectCollisionShape.js";
export default class CircleCollisionShape extends Collision{
    /**@param {Circle} circle  */
    constructor(circle){
        super();
        this.circle = circle;
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