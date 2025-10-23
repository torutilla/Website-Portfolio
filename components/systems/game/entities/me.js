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
            destinationSize: {x: 64, y: 64},
            sourceSize: {x: 32 * 3, y: 32 * 3},
            totalFrames: npcs.me.idle.totalFrames,
        });
        super(options);
        this.speed = 1.3;
        this.collision_shape.position.x = 520;
        this.collision_shape.shape.width = this.sprite_option.dWidth - 30;
        this.collision_shape.collisionBlocking = false;
        this.offset = new Vector2(-15, 0);
        this.flipX = true;
    }
    
    physicsProcess(delta){
        this.position = this.collision_shape.position.add(this.offset);
    }

}