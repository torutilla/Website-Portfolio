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
import { backgroundClouds, backgroundTrees, terrainTilemap } from "../../tilemapConst.js";
import CollisionSystem from "./objects/collisionSystem.js";
import ImageLoader from "../../type/imageLoader.js";
import { Parallax } from "../parallax/parallax.js";
import { Me } from "./entities/me.js";
import CustomFont from "../../type/fonts.js";
import CanvasHandler from "../canvas/canvasHandler.js";

export default class World {
    /**
     * @param {string} canvasId 
     * @param {Vector2} size 
     */

    constructor(canvasId, size){
        this.canvasId = canvasId;
        this.canvasHandler = new CanvasHandler();

        this.background = this.canvasHandler.getCanvas('background-canvas');
        /** @type {CanvasRenderingContext2D} */ this.bg = this.background.getContext('2d');
        
        this.mapBackground = this.canvasHandler.createCanvas();
        this.mapBackgroundCtx = this.mapBackground.getContext('2d');

        this.mapBuffer = this.canvasHandler.createCanvas();
        this.mapBufferCtx = this.mapBuffer.getContext('2d');

        this.mapForeground = this.canvasHandler.createCanvas();
        this.mapForegroundCtx = this.mapForeground.getContext('2d');
        
        this.fontCanvas = this.canvasHandler.createCanvas();
        this.fontCtx = this.fontCanvas.getContext('2d');

        this.player = null;
        // this.fontCanvas.width = window.innerWidth;
        // this.fontCanvas.height = window.innerHeight;


        /**@type {HTMLCanvasElement} */
        this.world = this.canvasHandler.getCanvas(canvasId);
        /** @type {CanvasRenderingContext2D} */ this.ctx = this.world.getContext('2d');

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
        
        this.parallaxBackground = new Parallax()
        /**@type {CollisionShape[]} */ this.colliders = [];

        this.fontHandler = new CustomFont();
        this.fontLoaded = false;
        CollisionSystem.init();
    }

    async init(){
        
        this.level = new Level(
            '../../../assets/TiledMap/WebsitePortolioMap.tmj'
        );
        try {
            this.map = await this.level.loadTiledMap();
            await this.currentTilemap.ensureLoaded();
            await this.initializeBg();
            this.drawMap();
            this.player = this.entities.find(e => e instanceof Player);
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
        
        this.mapBackground.width = this.map.width * this.currentTilemap.tileSize.x;
        this.mapBackground.height = this.map.height * this.currentTilemap.tileSize.y; 

        this.mapBuffer.width = this.mapBackground.width;
        this.mapBuffer.height = this.mapBackground.width; 
        
        this.mapForeground.width = this.mapBackground.width;
        this.mapForeground.height = this.mapBackground.width; 

        for(let row = 0; row < this.map.height; row++){
            for(let col = 0; col < this.map.width; col++){
                const index = row * this.map.width + col;
                const tileId = this.map.data[index];
                const overlayTileId = this.map.overlaydata[index];
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
        for(let text of this.map.texts){
            this.fontHandler.draw(this.fontCtx, text);
        }
        const me = this.entities.find(e => e instanceof Me);
        if(me){
            const pos = this.map.npc.find(e => {
                if (e.type.toLowerCase() == "me") return e;
            });
            me.collision_shape.position = new Vector2(pos.x, pos.y);
        }
    }
    async initializeBg(){
        this.background.style.backgroundColor = '#36422A';
        const l1 = await ImageLoader.load(backgroundTrees.l1);
        const l2 = await ImageLoader.load(backgroundTrees.l2);
        const l3 = await ImageLoader.load(backgroundTrees.l3);
        const clouds = await ImageLoader.load(backgroundClouds);
        this.parallaxBackground.layers = [
            {image: clouds, speed: 0.15},
            {image: l1, speed: 0.25},
            {image: l2, speed: 0.35},
            {image: l3, speed: 0.5},
        ].map(layer=>({
            ...layer,
            buffer: this.parallaxBackground.createCanvas(layer.image)
        }));
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
        this.bg.clearRect(0, 0, this.background.width, this.background.height);
        
        if(this.parallaxBackground.layers) this.parallaxBackground.draw(this.bg, this.camera);
        
        // this.transformCanvas(this.mapBackground);
        // this.transformCanvas(this.mapForeground);
        this.camera.begin(this.ctx);
        if (this.mapLoaded){
            this.ctx.drawImage(this.mapBackground, 0, 0);
            this.ctx.drawImage(this.mapBuffer, 0, 0);
            this.ctx.drawImage(this.fontCanvas, 0, 0);
        } 

        if (this.player && this.map) {
            this.camera.focusOn(this.player);
            this.player.collision_shape.position = this.map.playerposition;
            
        }

        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
            if(GlobalSettings.debugMode && entity.area) entity.area.debugDraw(this.ctx);
            if (GlobalSettings.debugMode && entity.collision_shape){
                entity.collision_shape.debugDraw(this.ctx);
                CollisionSystem.dynamicGrid.debugDraw(this.ctx);
                CollisionSystem.staticGrid.debugDraw(this.ctx);
                // this.dynamicGrid.debugDraw(this.ctx);
                // this.staticGrid.debugDraw(this.ctx);
            } 
            // if (entity instanceof Player && this.map){
            //     this.camera.focusOn(entity);
            //     entity.collision_shape.position = this.map.playerposition;
            // } 
        }
        this.ctx.drawImage(this.mapForeground, 0, 0);
        this.camera.end(this.ctx);
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
            CollisionSystem.physicsUpdate();
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


    resizeWorld() {
        this.canvasHandler.resizeCanvas(
            this.world, 
            {x: window.innerWidth, y: window.innerHeight}
        );
        this.canvasHandler.resizeCanvas(
            this.background, 
            {x: window.innerWidth, y: window.innerHeight}
        );

        this.zoom = this.world.width < 1366 ? 1 : 1.5;
        this.camera.zoom = this.zoom;

        this.clear();
        this.draw();
    }
    
}