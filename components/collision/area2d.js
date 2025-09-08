import CollisionShape from "./collishionShape.js";

export default class Area2D {
    /**@param {CollisionShape} collisionShape  */
    constructor(collisionShape){
        this.collisionShape = collisionShape;
    }
}