import Vector2 from "../../../math/vector.js";


export default class Level {
    /**
     * @param {string} levelPath
     */
    constructor(levelPath) {
        this.levelPath = levelPath;
    }

    /** @returns {Promise<Object>} */
    async loadTiledMap() {
        const response = await fetch(this.levelPath);
        const data = await response.json();
        if (!data) return null;

        const tilesets = this.parseTilesets(data.tilesets);

        let mapData = null;
        let overlayTiles = null;
        let collidables =null;
        let background = null;
        let undertile = null;
        let interactiveObjects = null;
        let npcs = [];
        let objects = [];
        let objectCollisions = [];
        let texts = [];
        let playerInitialPosition = Vector2.ZERO;

        for (const layer of data.layers) {
            const name = layer.name.toLowerCase();

            if (layer.data) {
                if (name === "tiles") mapData = layer.data;
                else if (name === "overlaytiles") overlayTiles = layer.data;
                else if (name === "background") background = layer.data;
                else if (name === "undertile") undertile = layer.data;
                else if (name === "collidables") collidables = layer.data;
            }

            if (layer.objects) {
                if (name === "npc") npcs = layer.objects;
                else if (name === "objects") objects = layer.objects;
                else if (name === "objectcollisions") objectCollisions = layer.objects;
                else if (name === "interactiveobjects") interactiveObjects = layer.objects;
                else if (name === "texts") texts.push(...layer.objects);
                else if (name === "playerposition" && layer.objects.length > 0) {
                    const { x, y } = layer.objects[0];
                    playerInitialPosition = new Vector2(x, y);
                }
            }
        }
        
        return {
            width: data.width,
            height: data.height,
            tilesets,
            tiles: mapData,
            interactiveObjects,
            overlayTiles,
            background,
            collidables,
            objectCollisions,
            undertile,
            playerPosition: playerInitialPosition,
            npcs,
            gameObjects: objects,
            texts
        };
    }

    /**
     * 
     * @param {Array} tiledTilesets
     */
    parseTilesets(tiledTilesets) {
        return tiledTilesets.map(ts => ({
            name: ts.name,
            firstGid: ts.firstgid,
            imageSource: this.normalizeImagePath(ts.image),
            tileSize: new Vector2(ts.tilewidth, ts.tileheight),
            columns: ts.columns,
            tileCount: ts.tilecount
        }));
    }

    normalizeImagePath(path) {
        return `/assets/TiledMap/${path.replace(/^src\//, "src/")}`;
    }
}
