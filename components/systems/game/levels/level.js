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

    async loadTiledMap() {
        const response = await fetch(this.levelPath);
        const data = await response.json();
    
        let mapData;
        let overlayTiles;
        let background;
        let decorations;
        let npcs;
        let objects;
        let playerInitialPosition = Vector2.ZERO;
        let texts = [];
    
        for (let layer of data.layers) {
            const layerName = layer.name.toLowerCase();
    
            switch (layerName) {
                case "overlaytiles":
                    if (layer.data) overlayTiles = layer.data;
                    break;
    
                case "background":
                    if (layer.data) background = layer.data;
                    break;
    
                case "decorations":
                    if (layer.data) decorations = layer.data;
                    break;
    
                case "tiles":
                    if (layer.data) mapData = layer.data;
                    break;

                case "npc":
                    if (layer.objects) {
                        npcs = layer.objects;
                    }
                    break;
    
                case "objects":
                    if (layer.objects){
                        objects = layer.objects;  
                    } 
                    break;
    
                case "playerposition":
                    if (layer.objects && layer.objects.length > 0) {
                        const { x, y } = layer.objects[0];
                        playerInitialPosition = new Vector2(x, y);
                    }
                    break;
    
                case "texts":
                    if (layer.objects) {
                        for (let textObj of layer.objects) {
                            texts.push(textObj);
                        }
                    }
                    break;
            }
        }
    
        return {
            height: data.height,
            width: data.width,
            data: mapData,
            playerposition: playerInitialPosition,
            texts,
            overlaydata: overlayTiles,
            deco: decorations,
            bg: background,
            npc: npcs,
            gameObjects: objects,
        };
    }
    
}