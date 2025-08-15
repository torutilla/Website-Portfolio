export default class AnimationPlayer {
    constructor({ sprite, ctx }) {
        this.sprite = sprite;
        this.ctx = ctx;
        this.lastTimestamp = 0;
        this.playAnimation = this.playAnimation.bind(this);
    }
    
    playAnimation(timestamp) {
        const deltaTime = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.sprite.play(deltaTime);
        this.sprite.draw(this.ctx);

        requestAnimationFrame(this.playAnimation);
    }
}
