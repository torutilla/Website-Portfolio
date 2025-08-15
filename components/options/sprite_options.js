export default class SpriteOptions{
    constructor({image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, frameInterval = 50, 
        totalFrames, frameWidth, repeat = true}){
            this.image = image;
            this.sx = sx;
            this.sy = sy;
            this.sWidth = sWidth;
            this.sHeight = sHeight;
            this.dx = dx;
            this.dy = dy;
            this.dWidth = dWidth;
            this.dHeight = dHeight;
            this.frameInterval = frameInterval;
            this.totalFrames = totalFrames;
            this.frameWidth = frameWidth;
            this.repeat = repeat;
        }
}