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
import CollisionSystem from "./objects/collisionSystem.js";
import { Parallax } from "../parallax/parallax.js";
import CustomCanvasFont from "../../type/fonts.js";
import CanvasHandler from "../canvas/canvasHandler.js";
import UserInterfaceController from "../user_interface/uiController.js";
import Area2D from "../../collision/area2d.js";
import CircleCollisionShape from "../../collision/circleCollisionShape.js";
import Circle from "../../math/circle.js";
import RectCollisionShape from "../../collision/rectCollisionShape.js";
import SpriteImage from "../../options/sprite_options.js";
import ImageLoader from "../../type/imageLoader.js";
import AreaTitleHandler from "../../ui/areaTitle.js";
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
        
        this.mapUndertile = this.canvasHandler.createCanvas();
        this.mapUndertileCtx = this.mapUndertile.getContext('2d');
        
        this.mapBuffer = this.canvasHandler.createCanvas();
        this.mapBufferCtx = this.mapBuffer.getContext('2d');
        
        this.mapForeground = this.canvasHandler.createCanvas();
        this.mapForegroundCtx = this.mapForeground.getContext('2d');
        
        this.fontCanvas = this.canvasHandler.createCanvas();
        this.fontCtx = this.fontCanvas.getContext('2d');
        
        this.player = null;
        // this.fontCanvas.width = window.innerWidth;
        // this.fontCanvas.height = window.innerHeight;
        
        this.game = document.getElementById('game');
        this.game.appendChild(this.fontCanvas);
        
        /**@type {HTMLCanvasElement} */
        this.world = this.canvasHandler.getCanvas(canvasId);
        /** @type {CanvasRenderingContext2D} */ this.ctx = this.world.getContext('2d');
        
        this.world.width = size.x;
        this.world.height = size.y;
        
        this.staticGrid = new SpatialGrid(64);
        this.dynamicGrid = new SpatialGrid(64);
        
        /** @type {Entity[]} */ this.entities = [];
        /** @type {GameObject[]} */ this.world_objects = [];
        
        this.areaTitleHandler = new AreaTitleHandler();
        this.camera = new Camera2D(0, 0, this.zoom, this.world);
        
        this.level = null;
        this.map = null;
        
        this.currentTilemap = null;
        this.mapLoaded = false;
        this.collider = new Collider();
        
        this.ui = new UserInterfaceController('main-ui');
        this.parallaxBackground = new Parallax()
        /**@type {CollisionShape[]} */ this.colliders = [];
        
        this.fontLoaded = false;
        CollisionSystem.init();
        this.resizeWorld();
    }
    
    async init(){
        const levelSrc = "/assets/TiledMap/interactive-resume.tmj";
        this.level = new Level(levelSrc);
        try {
            this.map = await this.level.loadTiledMap();
            this.currentTilemap = new Tilemap(this.map.tilesets);
            this.addInteractiveObjects();
            await this.currentTilemap.ensureLoaded();
            
            this.drawMap();
            this.player = this.entities.find(e => e instanceof Player);
            this.mapLoaded = true;  
            const rects = this.collider.getRectFromTiles(this.map.tiles, this.map.width, this.map.height);
            for(let rect of rects){
                const tileset = this.currentTilemap.getTilesetFromGid(rect.gid);
                const ts = tileset.tileSize;

                const pixelRect = new Rect(
                    rect.x * ts.x,
                    rect.y * ts.y,
                    rect.width * ts.x,
                    rect.height * ts.y
                );
                const collision = new CollisionShape(pixelRect);
                CollisionSystem.addStatic(collision);
                this.colliders.push(collision);
                // console.log(this.staticGrid.cells);
            }
            for(let obj of this.map.objectCollisions){
                const rect = new Rect(obj.x, obj.y, obj.width, obj.height);
                const collision = new CollisionShape(rect);
                CollisionSystem.addStatic(collision);
                this.colliders.push(collision);
            }
        } catch (error) {
            console.error(`Error loading map: ${error.stack}`);
        } 
        for(let entity of this.entities){
            if(entity.init) await entity.init();
        }

    }

    drawMap(){
        // this.fontCanvas.width = this.map.width * this.currentTilemap.tileSize.x;
        // this.fontCanvas.height = this.map.height * this.currentTilemap.tileSize.y;
        const primaryTileset = this.currentTilemap.tilesets[0];
        const ts = primaryTileset.tileSize;
        
        this.mapBackground.width = this.map.width * ts.x;
        this.mapBackground.height = this.map.height * ts.y; 

        this.mapBuffer.width = this.mapBackground.width;
        this.mapBuffer.height = this.mapBackground.height; 

        this.mapUndertile.width = this.mapBackground.width;
        this.mapUndertile.height = this.mapBackground.height; 
        
        this.mapForeground.width = this.mapBackground.width;
        this.mapForeground.height = this.mapBackground.height; 

        for(let row = 0; row < this.map.height; row++){
            for(let col = 0; col < this.map.width; col++){
                const index = row * this.map.width + col;
                const tileId = this.map.tiles[index];
                const overlayTileId = this.map.overlayTiles[index];   
                const collidableId = this.map.collidables[index];  
                const backgroundId = this.map.background[index];
                const underTileId = this.map.undertile[index];
                if (backgroundId > 0) {
                    this.currentTilemap.drawTile(
                        this.mapBackgroundCtx,
                        backgroundId,
                        new Vector2(col, row)
                    ); 
                }
                if (underTileId > 0) {
                    this.currentTilemap.drawTile(
                        this.mapUndertileCtx,
                        underTileId,
                        new Vector2(col, row)
                    ); 
                }
                if (tileId > 0){
                    this.currentTilemap.drawTile(
                        this.mapBufferCtx,
                        tileId,                
                        new Vector2(col, row)      
                    );
                }
                if (collidableId > 0){
                    this.currentTilemap.drawTile(
                        this.mapBufferCtx,
                        collidableId,                
                        new Vector2(col, row)      
                    );
                }
                if(overlayTileId > 0){
                    this.currentTilemap.drawTile(
                        this.mapForegroundCtx,
                        overlayTileId,                
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
        
        this.fontCtx.clearRect(0, 0, this.fontCanvas.width, this.fontCanvas.height)
        this.camera.begin(this.fontCtx);
        this.camera.begin(this.ctx);
        if (this.mapLoaded){
            // this.ctx.drawImage(this.fontCanvas, 0, 0);
            this.ctx.drawImage(this.mapBackground, 0, 0);
            this.ctx.drawImage(this.mapUndertile, 0, 0);
            this.ctx.drawImage(this.mapBuffer, 0, 0);
            
        } 
        for(let entity of this.entities){
            if(entity.draw) entity.draw(this.ctx, entity.position); 
            if(GlobalSettings.debugMode && entity.area) entity.area.debugDraw(this.ctx);
            if (GlobalSettings.debugMode && entity.collision_shape){
                entity.collision_shape.debugDraw(this.ctx);
                CollisionSystem.dynamicGrid.debugDraw(this.ctx);
                CollisionSystem.staticGrid.debugDraw(this.ctx);
            } 
        }
        for(let object of this.world_objects){
            if(object.draw){ 
                object.draw(this.ctx, object.position);   
            }
        }
        this.ctx.drawImage(this.mapForeground, 0, 0);
        this.camera.end(this.ctx);
        this.camera.end(this.fontCtx);
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
        this.bg.clearRect(0, 0, this.background.width, this.background.height);
        if(this.parallaxBackground.layers) this.parallaxBackground.draw(this.bg, this.camera);
        
        if (this.player && this.map) {
            this.camera.focusOn(this.player);
            this.player.collision_shape.position = this.map.playerPosition;
        }
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

    addInteractiveObjects(){
        
        const objects = this.map.interactiveObjects.filter(obj=> obj.type =="interactive");
        const arrows = this.map.interactiveObjects.filter(obj => obj.type == "arrow");
        const areas = this.map.interactiveObjects.filter(obj => obj.type =="area");
        
        for(let indicator of arrows){
            const option = new SpriteImage({
                imageSource: "/assets/ui/exclamation-7x8.png", 
                sx: 0, sy: 0, 
                sourceSize: {x: 32, y: 32}, 
                destinationSize: {x: 16, y: 16}, 
                totalFrames: 6, frameInterval: 0.1});
            const obj = new GameObject(option);
            obj.position = new Vector2(indicator.x - option.dWidth /2, indicator.y - option.dHeight /2);
            this.addObject(obj);
        }
        for(let area of areas){
            const rect = new RectCollisionShape(new Rect(area.x, area.y, area.width, area.height))
            const ar = new Area2D(rect);
            ar.on('body_entered', ()=>this.areaTitleHandler.addTitleText(area.name));
            ar.on('body_exited', ()=> this.areaTitleHandler.removeText(area.name))
        }
        for(let obj of objects) {
            const uiType = obj.properties?.find(type=> type.name === "uiType");
            const circle = new CircleCollisionShape(new Circle(new Vector2(obj.x, obj.y), 30))
            const area = new Area2D(circle)
            const bodyEntered =()=>{ 
                console.log("entered in: ", obj.name, obj.x, obj.y);
                this.ui.add_interaction_button(area, ()=>{this.ui.showAreaUI(uiType.value)}, obj.name)

            }
            const bodyExited = ()=>{
                this.ui.remove_interaction_button(area);
            }
            area.on('body_entered', bodyEntered);
            area.on('body_exited', bodyExited);
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
        this.canvasHandler.resizeCanvas(
            this.fontCanvas, 
            {x: window.innerWidth, y: window.innerHeight}
        );


        this.zoom = this.world.width < 1366 ? 1 : 1.5;
        this.camera.zoom = this.zoom;

        this.clear();
        this.draw();
    }
    
}