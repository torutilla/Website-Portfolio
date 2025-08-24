export default class Sprite{
    constructor(sprite_option){
        this.sprite_option = sprite_option;
        this.currentFrame = 0;
        this.frameTimer = 0;
    }
    draw(ctx, position) {
        ctx.drawImage(
        this.sprite_option.image,
        this.currentFrame * this.sprite_option.sWidth, 
        this.sprite_option.sy, 
        this.sprite_option.sWidth, 
        this.sprite_option.sHeight, 
        position.x,
        position.y,
        this.sprite_option.dWidth, 
        this.sprite_option.dHeight  
    );
    }
    updateFrame(delta){
        this.frameTimer += delta;
        // console.info(`Frame Timer: ${this.frameTimer}`);
        if(this.frameTimer >= this.sprite_option.frameInterval){
            this.currentFrame = (this.currentFrame + 1) % this.sprite_option.totalFrames;
            this.frameTimer = 0;
        }
    }
    
}