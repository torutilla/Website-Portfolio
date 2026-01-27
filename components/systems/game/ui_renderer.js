class UIRenderer{
    /**@typedef {(delta:number)=>void} Updatable */
    constructor(){
        this.drawables = new Set();
        /**@type {Set<Updatable>} */
        this.updatables = new Set();
    }
    /**@param {()=> void} drawable  */
    addDrawable(drawable){
        this.drawables.add(drawable);
    }
    /**@param {Updatable} updatable  */
    addUpdatable(updatable){
        this.updatables.add(updatable);
    }
    draw(){
        for(let drawable of this.drawables){
            drawable();
        }
    }
    update(delta){
        for(let updatable of this.updatables){
            updatable(delta);
        }
    }
    
}
export const uiRenderer = new UIRenderer();