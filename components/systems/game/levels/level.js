import Rect from "../../../math/rect.js";
import Vector2 from "../../../math/vector.js";
import Tilemap from "../objects/tilemap.js";

export default class Level{
    constructor(){
        this.tilemap = new Tilemap(
            '../../../../assets/Terrain/Terrain (16x16).png', 
            new Vector2(16,16), 
            new Rect(0, 0, 16, 16),
        );
        this.levelPath = '';
    }
    /**@param {CanvasRenderingContext2D} ctx  */
    draw(ctx){
        const rows = this.tilemap.getRowCount();
        const cols = this.tilemap.getColumnCount();
        this.tilemap.drawTile(ctx, new Vector2(0, 0));
    }

    async loadMap(){
        const response = await fetch(this.levelPath);
        const data = await response.json();

        const mapHeight = data.height;
        const mapWidth = data.width;
        let mapData;
        let playerInitialPosition;
        for(let layer of data.layers){
            if(layer.data) mapData = layer.data;
            if(layer.objects) {
                const x = layer.objects[0].x;
                const y = layer.objects[0].y;
                playerInitialPosition = new Vector2(x, y);
            }
        }
    }
}