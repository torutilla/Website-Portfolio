import EventBus from "../systems/event/eventBus.js";
import {CollisionSys} from "../systems/game/objects/collisionSystem.js";
import Collision from "./collision.js";

export default class Area2D extends EventBus {
    /**@param {Collision} shape */
    constructor(shape) {
        super();
        this.collisionShape = shape;
        this.overlaps = new Set();
        CollisionSys.addArea(this);
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
}
