import Vector2 from "../../../math/vector.js";
import SpriteImage from "../../../options/sprite_options.js";
import Sprite from "../../../type/sprite.js";
import Physics from "../../physics/physics.js";
import CollisionShape from "../../../collision/collishionShape.js";

let counter = 0;
export default class Entity extends Sprite {
    /** @param {SpriteImage} sprite_option */
    constructor(sprite_option) {
        super(sprite_option);
        this.id = `Entity_${counter++}`;
        this.center_point = new Vector2(this.sprite_option.sWidth / 2, this.sprite_option.sHeight/ 2);
        this.physics = new Physics(this, 800);
        this.collision_shape = new CollisionShape(
            new Vector2(250, 250), 
            new Vector2(
                this.sprite_option.dWidth - 20, 
                this.sprite_option.dHeight - 10
            ));
        this.position = this.collision_shape.position;
        this.isGrounded = true;
    }
    
    process(delta) {
        // console.info(`Delta Time: ${deltaTime}`);
        this.updateFrame(delta);
    }
    physicsProces(delta){}

    updateAnimation(){}
    /**
     * @param {CollisionShape} other 
     */
    onCollision(other){
        const a = this.collision_shape;
        const b = other;
        const dx = (a.position.x + a.size.x / 2) - (b.position.x + b.size.x / 2);
        const dy = (a.position.y + a.size.y / 2) - (b.position.y + b.size.y / 2);
        const overlapX = (a.size.x / 2 + b.size.x / 2) - Math.abs(dx);
        const overlapY = (a.size.y / 2 + b.size.y / 2) - Math.abs(dy);

        if(overlapX > 0 && overlapY > 0){
            if(overlapX < overlapY){
                a.position.x += dx > 0? overlapX : -overlapX
                this.physics.velocity.x = 0;
            }else{
                if(dy > 0){
                    a.position.y += overlapY; 
                }else{
                    a.position.y -= overlapY;
                    this.isGrounded = true;
                }
                this.physics.velocity.y = 0;
            }
        } 
    }
}