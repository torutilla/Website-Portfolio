import Collision from "./collision.js";

export default class Area2D {
    /**@param {Collision} collisionShape  */
    constructor(collisionShape){
        this.collisionShape = collisionShape;
        this.collisionShape.collisionBlocking = false;
    }
}