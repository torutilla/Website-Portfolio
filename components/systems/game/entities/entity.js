import Vector2 from "../../../math/vector.js";
import SpriteImage from "../../../options/sprite_options.js";
import Sprite from "../../../type/sprite.js";
import Physics from "../../physics/physics.js";
export default class Entity extends Sprite {
    /**
     * @param {SpriteImage} sprite_option 
     */
    constructor(sprite_option) {
        super(sprite_option);
        this.center_point = new Vector2(this.sprite_option.sWidth / 2, this.sprite_option.sHeight/ 2);
        this.position = Vector2.ZERO;
        this.physics = new Physics(this, 800);
    }
    
    process(delta) {
        // console.info(`Delta Time: ${deltaTime}`);
        this.updateFrame(delta);
    }
    physicsProces(delta){}
}