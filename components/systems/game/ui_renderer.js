class UIRenderer{
    
    constructor(){
        this.drawables = new Set();
        this.updatables = new Set();
    }
    
    addDrawable(drawable){
        this.drawables.add(drawable);
    }
    
    addUpdatable(updatable){
        this.updatables.add(updatable);
    }
    draw(){
        for(let drawable of this.drawables){
            drawable.draw();
        }
    }
    update(delta){
        for(let updatable of this.updatables){
            updatable.update(delta);
        }
    }
    
}
export const uiRenderer = new UIRenderer();