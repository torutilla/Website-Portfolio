
import Vector2 from "../../../math/vector.js"; 
import ImageLoader from "../../../type/imageLoader.js";
export default class Tilemap {
    /**
     * @param {{
     *   firstGid: number,
     *   imageSource: string,
     *   tileSize: Vector2
     * }[]} tilesets
     */
    constructor(tilesets) {
        this.tilesets = tilesets.map(ts => ({
            ...ts,
            image: null,
            rows: 0,
            columns: 0
        }));
    }

    async ensureLoaded() {
        for (const ts of this.tilesets) {
            ts.image = await ImageLoader.load(ts.imageSource);
            ts.columns = ts.image.width / ts.tileSize.x;
            ts.rows = ts.image.height / ts.tileSize.y;
        }

        this.tilesets.sort((a, b) => a.firstGid - b.firstGid);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} gid
     * @param {Vector2} position
     */
    drawTile(ctx, gid, position) {
        if (gid === 0) return; 

        const tileset = this.getTilesetFromGid(gid);
        if (!tileset) return;

        const localId = gid - tileset.firstGid;
        const coords = this.getCoordinatesFromId(localId, tileset.columns);

        ctx.drawImage(
            tileset.image,
            coords.x * tileset.tileSize.x,
            coords.y * tileset.tileSize.y,
            tileset.tileSize.x,
            tileset.tileSize.y,
            position.x * tileset.tileSize.x,
            position.y * tileset.tileSize.y,
            tileset.tileSize.x,
            tileset.tileSize.y
        );
    }

    /**
     * 
     * @param {number} gid
     */
    getTilesetFromGid(gid) {
        for (let i = this.tilesets.length - 1; i >= 0; i--) {
            if (gid >= this.tilesets[i].firstGid) {
                return this.tilesets[i];
            }
        }
        return null;
    }

    getCoordinatesFromId(id, columns) {
        const row = Math.floor(id / columns);
        const col = id % columns;
        return new Vector2(col, row);
    }
}
