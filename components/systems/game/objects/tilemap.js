import Rect from "../../../math/rect.js";
import Vector2 from "../../../math/vector.js"; 
import ImageLoader from "../../../type/imageLoader.js";
export default class Tilemap{
    /**
     * @param {string} imageSource  
     * @param {Vector2} tileSize
     * @param {Rect} imageRect 
    */
    constructor(imageSource, tileSize, imageRect){
        this.image = null;
        this.imageSource = imageSource;
        this.tileSize = tileSize;
        this.imageRect = imageRect;
        this.rows = 0;
        this.columns = 0;
    }

    async ensureLoaded() {
        const img = await ImageLoader.load(this.imageSource);
        this.image = img;
        this.rows = this.getRowCount();
        this.columns = this.getColumnCount();
        if(this.image.complete && this.image.naturalHeight != 0){
            console.log('Image loaded');
            return;
        }
    }

    /** 
     * @param {CanvasRenderingContext2D} ctx 
     * @param {number} tileId
     * @param {Vector2} position
     */
    drawTile(ctx, tileId, position){
        const coords = this.getCoordinatesFromId(tileId);
        ctx.save();
        ctx.drawImage(
            this.image, 
            coords.x * this.tileSize.x,
            coords.y * this.tileSize.y,
            this.tileSize.x,
            this.tileSize.y,
            position.x * this.tileSize.x,
            position.y * this.tileSize.y,
            this.tileSize.x,
            this.tileSize.y,
        );
        ctx.restore();
    }
    getRowCount(){
        return this.image.height / this.tileSize.x;
    }
    getColumnCount(){
        return this.image.width / this.tileSize.y;
    }

    getCoordinatesFromId(id) {
        const row = Math.floor(id / this.columns);
        const col = id % this.columns;
        return new Vector2(col, row);
    }
}