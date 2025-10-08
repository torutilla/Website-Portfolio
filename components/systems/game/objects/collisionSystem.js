import Collision from "../../../collision/collision.js";
import SpatialGrid from "../../grid/spatialGrid.js";

export default class CollisionSystem{
    constructor(){
        this.staticGrid = new SpatialGrid(64);
        this.dynamicGrid = new SpatialGrid(64);
        /**@type {Set<Collision>} */
        this.staticShapes = new Set();
        /**@type {Set<Collision>} */
        this.dynamicShapes = new Set();
        this.areas = new Set();
    }
    addStatic(collision){
        this.staticGrid.update(collision);
        this.staticShapes.add(collision);
    }
    addDynamic(collision){
        this.dynamicGrid.update(collision);
        this.dynamicShapes.add(collision);
    }
    addArea(area) {
        this.dynamicGrid.add(area); 
        this.areas.add(area);
    }
    update(delta){
        for(let dyn of this.dynamicShapes){

            this.dynamicGrid.update(dyn);
            const nearbyShapes = [
                ...this.staticGrid.getNearby(dyn), 
                ...this.dynamicGrid.getNearby(dyn)
            ];
            for(let near of nearbyShapes){
                if (dyn === near) continue;

                if(dyn.collidesWith(near)){
                    dyn.onCollision(near);
                    near.onCollision(dyn);
                }
            }
        }
        
    }
}

export const CollisionSys = new CollisionSystem();