import Camera2D from "../camera/camera.js";

export class Parallax{
    constructor() {
        this.repeat = true;
        this.layers = null;
    }

    createCanvas(image){
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        return canvas;
    }
    
    /**
     * @param {Camera2D} camera
     * @param {CanvasRenderingContext2D} ctx 
      */
    draw(ctx, camera){
        for(let layer of this.layers){
            const offset = (-camera.x * layer.speed) % layer.buffer.width;
            const imgWidth = layer.buffer.width;
            let x = offset;

            if (x > 0) x -= imgWidth;
            
            while (x < ctx.canvas.width) {
                ctx.drawImage(layer.buffer, Math.round(x), -30);
                x += imgWidth;
            }
        }
    }
}