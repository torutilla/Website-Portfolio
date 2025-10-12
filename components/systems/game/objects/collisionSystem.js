import Area2D from "../../../collision/area2d.js";
import Collision from "../../../collision/collision.js";
import SpatialGrid from "../../grid/spatialGrid.js";

export default class CollisionSystem {
    static staticGrid;
    static dynamicGrid;
    static staticShapes = new Set();
    static dynamicShapes = new Set();
    /**@type {Set<Area2D>} */
    static areas = new Set();

    static init() {
        if (!this.staticGrid) {
            this.staticGrid = new SpatialGrid(64);
            this.dynamicGrid = new SpatialGrid(64);
        }
    }
    /**
     * @param {Collision} collision
     */
    static addStatic(collision) {
        this.staticGrid.update(collision);
        this.staticShapes.add(collision);
    }

    /**
     * @param {Collision} collision
     */
    static addDynamic(collision) {
        this.dynamicGrid.update(collision);
        this.dynamicShapes.add(collision);
    }

    /**
     * @param {Collision} area
     */
    static addArea(area) {
        this.dynamicGrid.add(area);
        this.areas.add(area);
    }

    static update() {
        for (let dyn of this.dynamicShapes) {
            this.dynamicGrid.update(dyn);
            const nearbyShapes = [
                ...this.staticGrid.getNearby(dyn),
                ...this.dynamicGrid.getNearby(dyn),
            ];
            // console.log(nearbyShapes);

            for (let near of nearbyShapes) {
                if (dyn.id !== near.id && dyn.collidesWith(near)) {
                    dyn.owner?.onCollision(near);
                    near.owner?.onCollision(dyn);
                }
            }
        }
        for(let area of this.areas){
            
        }
    }
}

