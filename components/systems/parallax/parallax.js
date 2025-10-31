import Camera2D from "../camera/camera.js";

export class Parallax{
    constructor() {
        this.repeat = true;
        this.layers = null;
    }

    createCanvas(image){
        const canvas = document.createElement('canvas');
        canvas.width = image.width * 2;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(image, 0, 0);
        ctx.drawImage(image, image.width, 0);
        return canvas;
    }
    
    /**
     * @param {Camera2D} camera
     * @param {CanvasRenderingContext2D} ctx 
      */
    draw(ctx, camera){
        for(let layer of this.layers){
            const offset = (-camera.x * layer.speed) % layer.image.width;
            const imgWidth = layer.image.width;
            let x = offset;

            if (x > 0) x -= imgWidth;
            
            while (x < ctx.canvas.width) {
                let y = 0;
                while (y < ctx.canvas.height) {
                    ctx.drawImage(layer.image, Math.round(x), Math.round(y));
                    y += layer.image.height;
                }
                x += imgWidth;
            }
        }
    }
}