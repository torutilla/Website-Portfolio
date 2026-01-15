import SpriteImage from "../../../options/sprite_options.js";
import Sprite from "../../../type/sprite.js";
import Vector2 from "../../../math/vector.js";

export default class GameObject extends Sprite{
/**
 * @param {SpriteImage} sprite_options 
 */
    constructor(sprite_options){
        super(sprite_options);
        this.position =  Vector2.ZERO;
    }

    process(delta) {
        // console.info(`Delta Time: ${deltaTime}`);
        if(this.sprite_option.totalFrames != 1){
            this.updateFrame(delta);
        }
    }
}