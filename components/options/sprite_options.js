export default class SpriteImage{
    constructor({imageSource, sx, sy, sourceSize, destinationSize, frameInterval = 0.03, 
        totalFrames, repeat = true}){
            const img = new Image();
            img.src = imageSource;
            this.image = img;
            this.sx = sx;
            this.sy = sy;
            this.sWidth = sourceSize.x;
            this.sHeight = sourceSize.y;
            this.dWidth = destinationSize.x;
            this.dHeight = destinationSize.y;
            this.frameInterval = frameInterval;
            this.totalFrames = totalFrames;
            this.repeat = repeat;
        }
}