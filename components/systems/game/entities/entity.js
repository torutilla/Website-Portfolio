import Vector2 from "../../../math/vector.js";
import SpriteImage from "../../../options/sprite_options.js";
import Sprite from "../../../type/sprite.js";
import Physics from "../../physics/physics.js";
import RectCollisionShape from "../../../collision/rectCollisionShape.js";
import Rect from "../../../math/rect.js";
import Area2D from "../../../collision/area2d.js";
import Collision from "../../../collision/collision.js";

export default class Entity extends Sprite {
    /** @param {SpriteImage} sprite_option */
    constructor(sprite_option) {
        super(sprite_option);
        this.id = crypto.randomUUID();
        this.center_point = new Vector2(this.sprite_option.sWidth / 2, this.sprite_option.sHeight/ 2);
        this.physics = new Physics(this, 800);
        this.collision_shape = new RectCollisionShape(
            new Rect(0, 250, this.sprite_option.dWidth - 20, this.sprite_option.dHeight - 5));
        this.position = this.collision_shape.position;
        this.isGrounded = true;
        /**@type {null|Area2D} */
        this.area = null;
        console.log("Entity Collision Shape ID:", this.collision_shape.id);
    }

    async init(){}
    
    process(delta) {
        // console.info(`Delta Time: ${deltaTime}`);
        if(this.sprite_option.totalFrames != 1){
            this.updateFrame(delta);
        }
    }
    physicsProces(delta){}

    updateAnimation(){}
    /**
     * @param {Collision} other 
     */
    onCollision(other){
        const a = this.collision_shape;
        const b = other;
        const dx = (a.position.x + a.shape.width / 2) - (b.position.x + b.shape.width / 2);
        const dy = (a.position.y + a.shape.height / 2) - (b.position.y + b.shape.height / 2);
        const overlapX = (a.shape.width / 2 + b.shape.width / 2) - Math.abs(dx);
        const overlapY = (a.shape.height / 2 + b.shape.height / 2) - Math.abs(dy);

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