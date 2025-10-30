import EventBus from "../systems/event/eventBus.js";
import CollisionSystem from "../systems/game/objects/collisionSystem.js";
import Collision from "./collision.js";

export default class Area2D extends EventBus {
    /**@param {Collision} shape */
    constructor(shape) {
        super();
        this.collisionShape = shape;
        this.overlaps = new Map();
        CollisionSystem.addArea(this);
    }

    getOverlaps(){
        return this.overlaps;
    }

    addOverlap(overlap){
        if(!this.overlaps.has(this.id)) {
            this.emit('body_entered', overlap);
            this.overlaps.set(this.id, new Set())
        }
        this.overlaps.get(this.id).add(overlap.id);
    }

    removeOverlap(overlap){
        this.overlaps.delete(overlap);
        this.emit('body_exited', overlap);
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
