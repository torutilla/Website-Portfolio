import Vector2 from "../math/vector.js";
import SpriteImage from "../options/sprite_options.js";

export default class Sprite{
    /**
     * @param {SpriteImage} sprite_option 
     */
    constructor(sprite_option){
        this.sprite_option = sprite_option;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.flipX = false;
        this.speed = 1;
    }
    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Vector2} position 
     */
    draw(ctx, position) {
        ctx.save();
        if(this.flipX){
            ctx.translate(position.x + this.sprite_option.dWidth, position.y);
            ctx.scale(-1, 1);
        }else{
            ctx.translate(position.x, position.y);
        }

        ctx.drawImage(
            this.sprite_option.image,
            this.currentFrame * this.sprite_option.sWidth, 
            this.sprite_option.sy, 
            this.sprite_option.sWidth, 
            this.sprite_option.sHeight, 
            0,
            0,
            this.sprite_option.dWidth, 
            this.sprite_option.dHeight  
        );

        ctx.restore();
    }
    updateFrame(delta){
        this.frameTimer += delta / this.speed;
        // console.info(`Frame Timer: ${this.frameTimer}`);
        if(this.frameTimer >= this.sprite_option.frameInterval){
            this.currentFrame = (this.currentFrame + 1) % this.sprite_option.totalFrames;
            this.frameTimer = 0;
        }
    }
    
}