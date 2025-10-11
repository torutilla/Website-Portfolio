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
        let overlayTiles;
        let decorations;
        let playerInitialPosition = Vector2.ZERO;
        let texts = [];
        for(let layer of data.layers){
            if(layer.data && layer.name.toLowerCase() == "overlaytiles") overlayTiles = layer.data;
            if(layer.data && layer.name.toLowerCase() == "decorations") decorations = layer.data;
            if(layer.data && layer.name.toLowerCase() == "tiles") mapData = layer.data;
            if(layer.objects && layer.name.toLowerCase() == "playerposition") {
                const x = layer.objects[0].x;
                const y = layer.objects[0].y;
                playerInitialPosition = new Vector2(x, y);
            }
            if(layer.objects && layer.name.toLowerCase() == "texts"){
                for(let textObjects of layer.objects){
                    texts.push(textObjects);
                }
            }
        }
        return {
            height: data.height,
            width: data.width,
            data: mapData,
            playerposition: playerInitialPosition,
            texts: texts,
            overlaydata: overlayTiles,
            deco: decorations,
        };
    }
}