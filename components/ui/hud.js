export default class HUD{
    /**@param {HTMLCanvasElement} canvas*/
    constructor(canvas){
        this.canvas = canvas;
        this.init();
    }

    init(){
        this.canvas.addEventListener('click',(event)=>{
            const x = event.offsetX;
            const y = event.offsetY;
        });
    }
    
}