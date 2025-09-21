import Vector2 from "../math/vector.js";
import Collision from "./collision.js";

export default class Area2D {
    /**@param {Collision} collisionShape  */
    constructor(collisionShape){
        this.collisionShape = collisionShape;
        this.collisionShape.collisionBlocking = false;
    }

    debugDraw(ctx){
        this.collisionShape.debugDraw(ctx);
    }

}