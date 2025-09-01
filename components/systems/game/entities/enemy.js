import SpriteImage from "../../../options/sprite_options.js";
import Entity from "./entity.js";
import { enemies } from "../../../enemyConst.js";
import Vector2 from "../../../math/vector.js";
export class Enemy extends Entity{
    /**
     * @param {SpriteImage} sprite_options 
     */
    constructor(){
        const options = new SpriteImage({
            imageSource: enemies.masked_dude.idle.src,
            sx: 0, sy: 0,
            destinationSize: {x: 32, y: 32},
            sourceSize: {x: 32, y: 32},
            totalFrames: enemies.masked_dude.idle.totalFrames,
        });
        super(options);
        this.collision_shape.position.x = 320;
        this.offset = new Vector2(0, 0);
        this.position = this.collision_shape.position.add(this.offset);
    }

}