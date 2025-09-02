import Rect from "../../../math/rect.js";
import Vector2 from "../../../math/vector.js";
import Tilemap from "../objects/tilemap.js";

export default class Level{
    /**
     * @param {string} levelPath 
     */
    constructor( levelPath){
        this.levelPath = levelPath;
    }
    /**@param {CanvasRenderingContext2D} ctx  */

    async loadTiledMap(){
        const response = await fetch(this.levelPath);
        const data = await response.json();
        let mapData;
        let playerInitialPosition = Vector2.ZERO;
        for(let layer of data.layers){
            if(layer.data) mapData = layer.data;
            if(layer.objects && layer.name.toLowerCase() == "playerposition") {
                const x = layer.objects[0].x;
                const y = layer.objects[0].y;
                playerInitialPosition = new Vector2(x, y);
            }
        }
        return {
            height: data.height,
            width: data.width,
            data: mapData,
            playerposition: playerInitialPosition,
        };
    }
}