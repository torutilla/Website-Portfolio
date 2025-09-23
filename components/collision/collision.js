import Vector2 from "../math/vector.js";

export default class Collision{
    constructor(){
        this.position = Vector2.ZERO;
        this.collisionBlocking = true;
        this.id = crypto.randomUUID();
    }
    getAABB(){ throw new Error('Not Implemented'); }
    updatePosition(pos){}
    /**@param {Collision} other  */
    collidesWith(other){ 
        throw new Error('Not Implemented'); 
    }
    /**@param {CanvasRenderingContext2D} ctx  */
    debugDraw(ctx){ 
        throw new Error('Not Implemented'); 
    }
}