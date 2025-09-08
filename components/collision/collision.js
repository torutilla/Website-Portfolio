export default class Collision{
    constructor(){}
    getAABB(){ 
        throw new Error('Not Implemented'); 
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