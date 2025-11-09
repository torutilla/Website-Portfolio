import Vector2 from "../math/vector.js";

export default class Collision{
    constructor(){
        this.owner = null;
        this.shape = null;
        this.position = Vector2.ZERO;
        this.collisionBlocking = true;
        this.id = crypto.randomUUID();
    }
    getAABB(){ throw new Error('Not Implemented'); }
    updatePosition(pos){}
    /**@param {Collision} other  */
    collidesWith(other){ 
        if(this.collisionBlocking == false) return false;
    }
    /**@param {CanvasRenderingContext2D} ctx  */
    debugDraw(ctx){ 
        throw new Error('Not Implemented'); 
    }
    attachOwner(owner) {
        this.owner = owner;
    }

    update(){}
    
}