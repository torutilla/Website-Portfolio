export default class Collision{
    constructor(){
        this.id = crypto.randomUUID();
    }
    /**@param {Collision} other  */
    collidesWith(other){ 
        throw new Error('Not Implemented'); 
    }
    /**@param {CanvasRenderingContext2D} ctx  */
    debugDraw(ctx){ 
        throw new Error('Not Implemented'); 
    }
}