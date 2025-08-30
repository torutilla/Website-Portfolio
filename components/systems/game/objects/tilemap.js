import Rect from "../../../math/rect.js";
import Vector2 from "../../../math/vector.js";
export default class Tilemap{
    /**
     * @param {HTMLImageElement} image  
     * @param {Vector2} tileSize
     * @param {Rect} imageRect 
    */
    constructor(image, tileSize, imageRect){
        this.image = image;
        this.tileSize = tileSize;
        this.imageRect = imageRect;
    }

    /** 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Vector2} position
     */
    drawTile(ctx, position){
        ctx.save();
        ctx.drawImage(
            this.image, 
            position.x,
            position.y,
            this.tileSize.x,
            this.tileSize.y,
            this.imageRect.x,
            this.imageRect.y,
            this.imageRect.width,
            this.imageRect.height
        );
        ctx.restore();
    }
}