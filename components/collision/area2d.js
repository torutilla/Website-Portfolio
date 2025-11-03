import EventBus from "../systems/event/eventBus.js";
import CollisionSystem from "../systems/game/objects/collisionSystem.js";
import Collision from "./collision.js";

export default class Area2D extends EventBus {
    /**@param {Collision} shape */
    constructor(shape) {
        super();
        this.collisionShape = shape;
        this.overlaps = new Set();
        CollisionSystem.addArea(this);
        this.entered = false;
        
    }
    
    checkOverlap(shapes){
        const currentOverlap = new Set();
        
        for(let shape of shapes){

            if(this.collidesWith(shape) && this.get_owner() != shape.owner){
                currentOverlap.add(shape.owner);
    
                if(!this.overlaps.has(shape.owner) && !this.entered){
                    this.emit('body_entered', shape.owner);
                    this.entered = true;
                }
            }
        }
        
        for(let overlap of this.overlaps){
            if(!currentOverlap.has(overlap)){
                this.emit('body_exited', overlap);
                this.entered = false;
            }
        }

        this.overlaps =  currentOverlap;
    }

    getAABB() {
        return this.collisionShape.getAABB();
    }

    collidesWith(other) {
        return this.collisionShape.collidesWith(other);
    }

    updatePosition(pos) {
        this.collisionShape.updatePosition(pos);
    }

    debugDraw(ctx) {
        this.collisionShape.debugDraw(ctx);
    }

    attach_owner(owner){
        this.collisionShape.attachOwner(owner);
    }

    get_owner(){
        return this.collisionShape.owner;
    }
    
    get_collision_id(){
        return this.collisionShape.id;
    }
}
