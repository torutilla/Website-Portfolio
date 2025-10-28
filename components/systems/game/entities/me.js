import SpriteImage from "../../../options/sprite_options.js";
import Entity from "./entity.js";
import { npcs } from "../../../npcConst.js";
import Vector2 from "../../../math/vector.js";
export class Me extends Entity{
    /**
     * @param {SpriteImage} sprite_options 
     */
    constructor(){
        const options = new SpriteImage({
            imageSource: npcs.me.idle.src,
            sx: 0, sy: 0,
            destinationSize: {x: 84, y: 84},
            sourceSize: {x: 96, y: 96},
            totalFrames: npcs.me.idle.totalFrames,
            frameInterval: 0.05,
            offset: {x: 25, y: 12},
        });
        super(options);
        // this.collision_shape.position.x = 520;
        this.collision_shape.collisionBlocking = false;
        
        
    }
    
    physicsProcess(delta){
        this.position = this.collision_shape.position;
    }

}