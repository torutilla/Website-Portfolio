import Vector2 from "../../math/vector.js";
import SpatialGrid from "../grid/spatialGrid.js";
import Entity from "./entities/entity.js";
import GameObject from "./objects/object.js";
import Camera2D from "../camera/camera.js";
import Player from "../../player.js";
import Level from "./levels/level.js";
import Tilemap from "./objects/tilemap.js";
import Rect from "../../math/rect.js";
import Collider from "../../collision/collider.js";
import CollisionShape from "../../collision/rectCollisionShape.js";
import GlobalSettings from "../../../globalSettings.js";
import { terrainTilemap } from "../../tilemapConst.js";
export default class World {
    /**
     * @param {string} canvasId 
     * @param {Vector2} size 
     */
    constructor(canvasId, size){
        this.world = document.getElementById(canvasId);
        /** @type {CanvasRenderingContext2D} */ this.ctx = this.world.getContext('2d');
        this.world.width = size.x;
        this.world.height = size.y;
        this.staticGrid = new SpatialGrid(64);
        this.dynamicGrid = new SpatialGrid(64);
        /** @type {Entity[]} */ this.entities = [];
        /** @type {GameObject[]} */ this.world_objects = [];
        this.zoom = size.x < 1366 ? 1.5 : 1.8;
        this.camera = new Camera2D(0, 0, this.zoom, this.world);
        this.level = null;
        this.map = null;
        this.currentTilemap = new Tilemap(
            terrainTilemap,
            new Vector2(16,16), 
            new Rect(0, 0, 16, 16),
        );
        this.collider = new Collider();
        
        /**@type {CollisionShape[]} */ this.colliders = [];
    }

    async init(){
        this.level = new Level(
            '../../../assets/TiledMap/WebsitePortolioMap.tmj'
        );
        try {
            this.map = await this.level.loadTiledMap();
            await this.currentTilemap.ensureLoaded();
            const rects = this.collider.getRectFromTiles(this.map.data, this.map.width, this.map.height);
            for(let rect of rects){
                const pixelRect = new Rect(
                    rect.x * this.currentTilemap.tileSize.x,
                    rect.y * this.currentTilemap.tileSize.y,
                    rect.width * this.currentTilemap.tileSize.x,
                    rect.height * this.currentTilemap.tileSize.y
                );
                const collision = new CollisionShape(pixelRect);
                this.staticGrid.update(collision);
                this.colliders.push(collision);
                console.log(this.staticGrid.cells);
            }
            for(let texts of this.map.texts){
                console.log(texts.name);
                this.ctx.font = '50px "Arial"';
                this.ctx.fillStyle =texts.properties.value;
                this.ctx.fillText(texts.name, texts.x, texts.y)
            }
        } catch (error) {
            console.error(`Error loading map: ${error}`);
        } 
        for(let entity of this.entities){
            if(entity.init) await entity.init();
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
        if (this.map) this.drawMap();  
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
            if (entity instanceof Player && this.map){
                this.camera.focusOn(entity);
                entity.collision_shape.position = this.map.playerposition;
            } 
            if(GlobalSettings.debugMode && entity.area) entity.area.debugDraw(this.ctx);
            if (GlobalSettings.debugMode && entity.collision_shape){
                entity.collision_shape.debugDraw(this.ctx);
                this.dynamicGrid.debugDraw(this.ctx);
                this.staticGrid.debugDraw(this.ctx);
            } 
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
            // if(entity.area) this.dynamicGrid.update(entity.area.collisionShape);
            if (entity.physicsProcess) entity.physicsProcess(delta);
            this.dynamicGrid.update(entity.collision_shape);

            const nearbyCollisionShapes = [
                ...this.staticGrid.getNearby(entity.collision_shape),
                ...this.dynamicGrid.getNearby(entity.collision_shape),
            ];

            for(let nearby of nearbyCollisionShapes){   
                if(nearby.id !== entity.collision_shape.id && nearby.collidesWith(entity.collision_shape)){
                    if(nearby.collisionBlocking){
                        entity.onCollision(nearby);
                        nearby.onCollision(entity.collision_shape);
                    }    
                }
            }
            
            if (entity.updateAnimation) entity.updateAnimation();
        }
    }

}