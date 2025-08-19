export default class SpriteImage{
    constructor({image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, frameInterval = 50, 
        totalFrames, repeat = true}){
            const img = new Image();
            img.src = image;
            this.image = img;
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
           
            this.repeat = repeat;
        }
}