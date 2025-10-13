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
import CollisionSystem from "./objects/collisionSystem.js";
export default class World {
    /**
     * @param {string} canvasId 
     * @param {Vector2} size 
     */
    constructor(canvasId, size){
        this.background = document.getElementById('background-canvas');
        /** @type {CanvasRenderingContext2D} */ this.bg = this.background.getContext('2d');
        this.bg.imageSmoothingEnabled = false;

        this.mapBackground = document.getElementById('game-background');
        this.mapBackgroundCtx = this.mapBackground.getContext('2d');
        this.mapBackgroundCtx.imageSmoothingEnabled = false;
        

        this.mapBuffer = document.createElement('canvas');
        this.mapBufferCtx = this.mapBuffer.getContext('2d');
        this.mapBufferCtx.imageSmoothingEnabled = false;

        this.mapForeground = document.getElementById('game-foreground');
        this.mapForegroundCtx = this.mapForeground.getContext('2d');
        this.mapForegroundCtx.imageSmoothingEnabled = false;
        

        this.world = document.getElementById(canvasId);
        /** @type {CanvasRenderingContext2D} */ this.ctx = this.world.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;

        this.world.width = size.x;
        this.world.height = size.y;

        this.staticGrid = new SpatialGrid(64);
        this.dynamicGrid = new SpatialGrid(64);

        /** @type {Entity[]} */ this.entities = [];
        /** @type {GameObject[]} */ this.world_objects = [];

        this.zoom = size.x < 1366 ? 1 : 1.5;
        this.camera = new Camera2D(0, 0, this.zoom, this.world);

        this.level = null;
        this.map = null;

        this.currentTilemap = new Tilemap(
            terrainTilemap.src,
            terrainTilemap.size, 
            terrainTilemap.rect,
        );
        this.mapLoaded = false;
        this.collider = new Collider();
        
        /**@type {CollisionShape[]} */ this.colliders = [];


        CollisionSystem.init();
    }

    async init(){
        
        this.level = new Level(
            '../../../assets/TiledMap/WebsitePortolioMap.tmj'
        );
        try {
            this.map = await this.level.loadTiledMap();
            await this.currentTilemap.ensureLoaded();
            this.initializeBg();
            this.drawMap();
            this.initializeFg();
            this.mapLoaded = true;  
            const rects = this.collider.getRectFromTiles(this.map.data, this.map.width, this.map.height);
            for(let rect of rects){
                const pixelRect = new Rect(
                    rect.x * this.currentTilemap.tileSize.x,
                    rect.y * this.currentTilemap.tileSize.y,
                    rect.width * this.currentTilemap.tileSize.x,
                    rect.height * this.currentTilemap.tileSize.y
                );
                const collision = new CollisionShape(pixelRect);
                CollisionSystem.addStatic(collision);
                this.colliders.push(collision);
                // console.log(this.staticGrid.cells);
            }
            
            
        } catch (error) {
            console.error(`Error loading map: ${error}`);
        } 
        for(let entity of this.entities){
            if(entity.init) await entity.init();
        }
    }

    drawMap(){
        this.changeCanvasSize(this.mapBackground);
        this.changeCanvasSize(this.mapBuffer);
        this.changeCanvasSize(this.mapForeground);
        this.changeCanvasStyle(this.mapForeground);

        for(let row = 0; row < this.map.height; row++){
            for(let col = 0; col < this.map.width; col++){
                const index = row * this.map.width + col;
                const tileId = this.map.data[index];
                const overlayTileId = this.map.overlaydata[index];
                if (tileId > 0){
                    this.currentTilemap.drawTile(
                        this.mapBufferCtx,
                        tileId - 1,                
                        new Vector2(col, row)      
                    );
                }
                if(overlayTileId > 0){
                    this.currentTilemap.drawTile(
                        this.mapBufferCtx,
                        overlayTileId - 1,                
                        new Vector2(col, row)      
                    );
                }
            }
        } 
        
    }
    initializeBg(){
        this.changeCanvasSize(this.background);
        this.bg.rect(0, 0, this.world.width * this.zoom, this.world.height * this.zoom);
        this.bg.fillStyle = "#85CDED";
        this.bg.fill();
    }

    initializeFg(){
        for(let row = 0; row < this.map.height; row++){
            for(let col = 0; col < this.map.width; col++){
                const index = row * this.map.width + col;
                const decorationsId = this.map.deco[index];
                const backgroundId = this.map.bg[index];
                if (backgroundId > 0) {
                    this.currentTilemap.drawTile(
                        this.mapBackgroundCtx,
                        backgroundId - 1,
                        new Vector2(col, row)
                    ); 
                }
                if (decorationsId > 0) {
                    this.currentTilemap.drawTile(
                        this.mapForegroundCtx,
                        decorationsId - 1,
                        new Vector2(col, row)
                    );
                }
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
        
        this.transformCanvas(this.mapBackground);
        this.transformCanvas(this.mapForeground);
        this.camera.begin(this.ctx);
        
        if (this.mapLoaded){
            this.ctx.drawImage(this.mapBuffer, 0, 0);
            for(let texts of this.map.texts){
                this.ctx.font = `${texts.properties[1].value}px "PixelFont"`;
                this.ctx.fillStyle = texts.properties[0].value;
                this.ctx.fillText(texts.name.toUpperCase(), texts.x, texts.y)
            }
        } 
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
            if (entity instanceof Player && this.map){
                this.camera.focusOn(entity);
                entity.collision_shape.position = this.map.playerposition;
            } 
            if(GlobalSettings.debugMode && entity.area) entity.area.debugDraw(this.ctx);
            if (GlobalSettings.debugMode && entity.collision_shape){
                entity.collision_shape.debugDraw(this.ctx);
                CollisionSystem.dynamicGrid.debugDraw(this.ctx);
                CollisionSystem.staticGrid.debugDraw(this.ctx);
                // this.dynamicGrid.debugDraw(this.ctx);
                // this.staticGrid.debugDraw(this.ctx);
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
            if (entity.physicsProcess) entity.physicsProcess(delta);
            CollisionSystem.update();
            // if(entity.area) this.dynamicGrid.update(entity.area.collisionShape);
            // this.dynamicGrid.update(entity.collision_shape);

            // const nearbyCollisionShapes = [
            //     ...this.staticGrid.getNearby(entity.collision_shape),
            //     ...this.dynamicGrid.getNearby(entity.collision_shape),
            // ];

            // for(let nearby of nearbyCollisionShapes){   
            //     if(nearby.id !== entity.collision_shape.id && nearby.collidesWith(entity.collision_shape)){
            //         if(nearby.collisionBlocking){
            //             entity.onCollision(nearby);
            //             nearby.owner?.onCollision(entity.collision_shape);
            //         }    
            //     }
            // }
            
            if (entity.updateAnimation) entity.updateAnimation();
        }
    }

    transformCanvas(canvas){
        canvas.style.transform = `translate(${-this.camera.x * this.camera.zoom}px, ${-this.camera.y * this.camera.zoom}px) scale(${this.camera.zoom})`;
        canvas.style.transformOrigin = 'top left';
    }

    /**@param {HTMLCanvasElement} canvas  */
    changeCanvasStyle(canvas){
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
    }

    changeCanvasSize(canvas){
        canvas.width = this.map.width * this.currentTilemap.tileSize.x;
        canvas.height = this.map.height * this.currentTilemap.tileSize.y; 
    }
}