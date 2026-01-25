export default class UIRenderer{
    constructor(){
        this.drawables = new Set();
        this.updatables = new Set();
    }
    add(drawable){
        this.drawables.add(drawable);
    }
    draw(){
        for(let drawable of this.drawables){
            drawable.draw();
        }
    }
    update(){
        for(let updatable of this.updatables){
            updatable.update();
        }
    }
    
}