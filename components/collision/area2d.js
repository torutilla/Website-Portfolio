import RectCollisionShape from "./collishionShape.js";

export default class Area2D {
    /**@param {RectCollisionShape} collisionShape  */
    constructor(collisionShape){
        this.collisionShape = collisionShape;
    }
}