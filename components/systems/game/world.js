import Vector2 from "../../math/vector.js";
import SpatialGrid from "../grid/spatialGrid.js";
import Entity from "./entities/entity.js";
import GameObject from "./objects/object.js";
import Camera2D from "../camera/camera.js";
import Player from "../../player.js";
import Level from "./levels/level.js";
import Tilemap from "./objects/tilemap.js";
import Rect from "../../math/rect.js";
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
        this.zoom = 1.5;
        this.camera = new Camera2D(0, 0, 2, this.world);
        this.level = null;
        this.map = null;
        this.currentTilemap = new Tilemap(
            '../../../assets/Terrain/Terrain (16x16).png', 
            new Vector2(16,16), 
            new Rect(0, 0, 16, 16),
        );
    }

    async init(){
        this.level = new Level(
            '../../../assets/TiledMap/samp.tmj'
        );
        try {
            this.map = await this.level.loadTiledMap();
            await this.currentTilemap.ensureLoaded();
        } catch (error) {
            console.error(`Error loading map: ${error}`);
        } 
    }

    drawMap(){
        for(let row = 0; row < this.map.height; row++){
            for(let col = 0; col < this.map.width; col++){
                const index = row * this.map.width + col;
                const tileId = this.map.data[index];
                if (tileId === 0) continue;
                this.currentTilemap.drawTile(
                    this.ctx,
                    tileId - 1,                
                    new Vector2(col, row)      
                );
            }
        }
        
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
        this.camera.begin(this.ctx);
        if (this.map){
            this.drawMap();  
            
        } 
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
            if (entity instanceof Player && this.map){
                this.camera.focusOn(entity);
                // entity.collision_shape.position = this.map.playerposition;
            } 
            if (this.debugMode && entity.collision_shape) entity.collision_shape.debugDraw(this.ctx);
        }
        for(let object of this.world_objects){
            if(object.draw) object.draw(this.ctx, object.position);
            if (this.debugMode && object.collision_shape) object.collision_shape.debugDraw(this.ctx);
        }
        this.camera.end(this.ctx)
    }
    update(deltaTime) {
        for (let entity of this.entities) {
            if (entity.process) entity.process(deltaTime);
            
        }
        for(let object of this.world_objects){
            if(object.process) object.process(deltaTime);
            
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