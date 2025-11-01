export default class CanvasHandler{

    /**@returns {HTMLCanvasElement} */
    createCanvas(){
        const canvas = document.createElement('canvas');
        this.resizeCanvas(canvas, {x: window.innerWidth, y: window.innerHeight})
        
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        return canvas;
    }

    getCanvas(id, size = {x: window.innerWidth, y: window.innerHeight}){
        const canvas = document.getElementById(id);
        this.resizeCanvas(canvas, size);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;

        return canvas;
    }

    resizeCanvas(canvas, size){
        canvas.width = size.x;
        canvas.height = size.y;
    }
}