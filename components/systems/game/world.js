import Vector2 from "../../math/vector.js";
import SpatialGrid from "../grid/spatialGrid.js";
export default class World {
    /**
     * @param {string} canvasId 
     * @param {Vector2} size 
     */
    constructor(canvasId, size){
        this.world = document.getElementById(canvasId);
        /** @type {CanvasRenderingContext2D} */
        this.ctx = this.world.getContext('2d');
        this.world.width = size.x;
        this.world.height = size.y;
        this.spatialGrid = new SpatialGrid(64);
        this.entities = [];
        
    }
    addEntity(entity){
        this.entities.push(entity);
    }
    clear(){
        this.ctx.clearRect(0, 0, this.world.width, this.world.height);
    }
    draw(){
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
        }
    }
    update(deltaTime) {
        for (let entity of this.entities) {
            this.spatialGrid.update(entity.collision_shape);    
            if (entity.process) entity.process(deltaTime);
        }
    }
    physicsUpdate(delta){
        for (let entity of this.entities) {
            if (entity.physicsProcess) entity.physicsProcess(delta);
            
        }
    }

}