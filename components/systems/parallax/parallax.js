import Camera2D from "../camera/camera.js";

export class Parallax{
    constructor() {
        this.repeat = true;
        this.layers = null;
    }
    /**
     * @param {Camera2D} camera
     * @param {CanvasRenderingContext2D} ctx 
      */
    draw(ctx, camera){
        for(let layer of this.layers){
            const offset = -camera.x * layer.speed;
            const imgWidth = layer.image.width;
            let x = offset % imgWidth;
            if (x > 0) x -= imgWidth;
            
            while (x < ctx.canvas.width) {
                ctx.drawImage(layer.image, x, 0);
                x += imgWidth;
            }
        }
    }
}