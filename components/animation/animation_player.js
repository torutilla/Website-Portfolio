import EventBus from "../systems/event/eventBus.js";
import Sprite from "../type/sprite.js";
export default class AnimationPlayer extends EventBus {
    /**
     * @param {Sprite} sprite
     * @param {Object} options
     * @param {boolean} options.loop
     * @param {boolean} options.autoPlay
     */
    constructor(sprite, { loop = true, autoPlay = true } = {}) {
        super();
        this.sprite = sprite;
        this.loop = loop;
        this.playing = autoPlay;
    }

    play() {
        this.playing = true;
    }

    pause() {
        this.playing = false;
    }

    stop() {
        this.playing = false;
        this.sprite.currentFrame = 0;
        this.sprite.frameTimer = 0;
    }

    /**
     * @param {number} delta 
     */
    update(delta) {
        if (!this.playing) return;
        this.sprite.updateFrame(delta);
        
        if (!this.loop && this.sprite.currentFrame === this.sprite.sprite_option.totalFrames - 1) {
            this.playing = false;
            this.emit('animation_finished');
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Vector2} position 
     */
    draw(ctx, position) {
        this.sprite.draw(ctx, position);
    }
}
