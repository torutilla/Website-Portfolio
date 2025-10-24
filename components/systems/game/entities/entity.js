import Vector2 from "../../../math/vector.js";
import SpriteImage from "../../../options/sprite_options.js";
import Sprite from "../../../type/sprite.js";
import Physics from "../../physics/physics.js";
import Rect from "../../../math/rect.js";
import Area2D from "../../../collision/area2d.js";
import CircleCollisionShape from "../../../collision/circleCollisionShape.js";
import RectCollisionShape from "../../../collision/rectCollisionShape.js";
import CollisionSystem from "../objects/collisionSystem.js";

export default class Entity extends Sprite {
    /** @param {SpriteImage} sprite_option */
    constructor(sprite_option) {
        super(sprite_option);
        this.id = crypto.randomUUID();
        this.center_point = new Vector2(this.sprite_option.sWidth / 2, this.sprite_option.sHeight/ 2);
        this.physics = new Physics(this, 800);
        this.collision_shape = new RectCollisionShape(
            new Rect(0, 250, this.sprite_option.dWidth - 10, this.sprite_option.dHeight - 5));
        this.collision_shape.attachOwner(this);
        CollisionSystem.addDynamic(this.collision_shape);
        this.position = this.collision_shape.position;
        this.isGrounded = true;
        /**@type {null|Area2D} */
        this.area = null;
        console.log("Entity Collision Shape ID:", this.collision_shape.id);
    }

    async init(){
        
    }
    
    process(delta) {
        // console.info(`Delta Time: ${deltaTime}`);
        if(this.sprite_option.totalFrames != 1){
            this.updateFrame(delta);
        }
    }
    physicsProcess(delta){}

    updateAnimation(){}

    onCollision(other){
        if(other instanceof RectCollisionShape) this.#onRectCollision(other);
        if(other instanceof CircleCollisionShape) this.#onCircleCollision(other);
    }
    /** @param {RectCollisionShape} other */
    #onRectCollision(other){
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
    /**@param {CircleCollisionShape} other  */
    #onCircleCollision(other){
        const a  = this.collision_shape.shape;
        const b = other.shape;
        const closestX = Math.max(a.x, Math.min(b.center.x, a.x + a.width));
        const closestY = Math.max(a.y, Math.min(b.center.y, a.y + a.height));

        const dx = b.center.x - closestX;
        const dy = b.center.y - closestY;

        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        const overlap = b.radius - dist;

        if(overlap > 0){}
    }
}