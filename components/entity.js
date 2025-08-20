import Vector2 from "./math/vector.js";
import Sprite from "./sprite.js";
export default class Entity extends Sprite {
    constructor(sprite_option) {
        super(sprite_option);
        this.center_point = new Vector2(this.sprite_option.sWidth / 2, this.sprite_option.sHeight/ 2);
        this.position = Vector2.ZERO;
    }
    
    process(delta) {
        // console.info(`Delta Time: ${deltaTime}`);
        this.updateFrame(delta);
    }
    physicsProces(delta){
        
    }
}