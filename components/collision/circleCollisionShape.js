import Circle from "../math/circle.js";
import Collision from "./collision.js";
export default class CircleCollisionShape extends Collision{
    /**@param {Circle} circle  */
    constructor(circle){
        this.circle = circle;
    }

    /** @param {Collision} other  */
    collidesWith(other){
        if(other instanceof CircleCollisionShape) this.circle.intersectsCircle(other.circle)
    }

    debugDraw(ctx){
        this.circle.draw(ctx);
    }

    getAABB(){
        throw new Error('No bounding box in a circle');
    }
}