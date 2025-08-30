import Vector2 from "../../math/vector.js";
import SpatialGrid from "../grid/spatialGrid.js";
import Entity from "./entities/entity.js";
import GameObject from "./objects/object.js";
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
        /** @type {Entity[]} */
        this.entities = [];
        /** @type {GameObject[]} */
        this.world_objects = [];
        this.debugMode = true;
        
    }
    addEntity(entity){
        this.entities.push(entity);
    }
    addObject(object){
        this.world_objects.push(object);
    }
    clear(){
        this.ctx.clearRect(0, 0, this.world.width, this.world.height);
    }
    draw(){
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
        }
        for(let object of this.world_objects){
            if(object.draw) object.draw(this.ctx, object.position);
        }
    }
    update(deltaTime) {
        for (let entity of this.entities) {
            if (entity.process) entity.process(deltaTime);
            if (this.debugMode && entity.collision_shape) entity.collision_shape.debugDraw(this.ctx);
        }
        for(let object of this.world_objects){
            if(object.process) object.process(deltaTime);
            if (this.debugMode && object.collision_shape) object.collision_shape.debugDraw(this.ctx);
        }
    }

    physicsUpdate(delta){
        for (let entity of this.entities) {
            if (entity.physicsProcess) entity.physicsProcess(delta);
            this.spatialGrid.update(entity.collision_shape);
            const nearbyEntities = this.spatialGrid.getNearby(entity.collision_shape);
            
            for(let nearby of nearbyEntities){
                
                if(nearby.id !== entity.collision_shape.id && nearby.collidesWith(entity.collision_shape)){
                    entity.onCollision(nearby);
                }
            }
            if (entity.updateAnimation) entity.updateAnimation();
        }
    }

}