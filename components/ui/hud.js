import Vector2 from "../math/vector.js";

export default class HUD{
    /**@type {Map<number, Vector2>} */
    static clickPos = {};
    /**@param {string} canvasId*/
    constructor(canvasId){
        /**@type {HTMLCanvasElement} */
        this.canvas = document.getElementById(canvasId);
        this.init();
    }

    init(){
        this.canvas.addEventListener('pointerdown',(event)=>{
            HUD.clickPos.set(event.pointerId, Vector2(event.offsetX, event.offsetY));
        });
        this.canvas.addEventListener('pointerup', (event)=> {
            HUD.clickPos.delete(event.pointerId);
        });
    }
    
}