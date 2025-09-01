import Rect from "../../../math/rect.js";
import Vector2 from "../../../math/vector.js";
export default class Tilemap{
    /**
     * @param {string} imageSource  
     * @param {Vector2} tileSize
     * @param {Rect} imageRect 
    */
    constructor(imageSource, tileSize, imageRect){
        const img = new Image();
        img.src = imageSource;
        this.image = img;
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
            position.x * this.tileSize.x,
            position.y * this.tileSize.y,
            this.tileSize.x,
            this.tileSize.y,
            this.imageRect.x,
            this.imageRect.y,
            this.imageRect.width,
            this.imageRect.height
        );
        ctx.restore();
    }
    getRowCount(){
        return this.image.width / this.tileSize.x;
    }
    getColumnCount(){
        return this.image.height / this.tileSize.y;
    }
}