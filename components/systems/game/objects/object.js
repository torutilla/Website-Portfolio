import SpriteImage from "../../../options/sprite_options.js";
import Sprite from "../../../type/sprite.js";
import Vector2 from "../../../math/vector.js";
import CollisionShape from "../../../collision/rectCollisionShape.js";
export default class GameObject extends Sprite{
/**
 * @param {SpriteImage} sprite_options 
 */
    constructor(sprite_options){
        super(sprite_options);
        this.collision_shape = new CollisionShape(
            Vector2.ZERO, 
            Vector2,ZERO,
        );
        this.position = this.collision_shape.position;
    }
}