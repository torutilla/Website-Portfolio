import Collision from "./collision.js";

export default class Area2D {
    /**@param {Collision} collisionShape  */
    constructor(collisionShape){
        this.id = crypto.randomUUID();
        this.collisionShape = collisionShape;
        this.collisionShape.collisionBlocking = false;
        /**@type {Entity[]} */
        this.bodies = [];
        /**@type {Area2D[]} */
        this.areas = [];
    }

    debugDraw(ctx){
        this.collisionShape.debugDraw(ctx);
    }

    /**@param {Area2D} area  */
    areaEntered(area){
        if(!this.areas.some(a => a.id == area.id)){
            this.areas.push(area);
        }
    }
    areaExited(){}
    /**@param {Entity} body  */
    bodyEntered(body){}
    bodyExited(){}

}